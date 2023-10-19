import React, { useState } from 'react';
import { ICocktailMutation, IIngredient, TCocktailMutation } from '../../../types';
import { Button, Container, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { useNavigate } from 'react-router-dom';
import { selectCreateCocktailLoading } from '../cocktailsSlice.ts';
import { createCocktail } from '../cocktailsThunk.ts';

const CocktailForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateCocktailLoading);

  const [state, setState] = useState<TCocktailMutation>({
    name: '',
    recipe: '',
    cocktailImage: null,
  });

  const [ingredients, setIngredients] = useState<IIngredient[]>([{ name: '', amount: '' }]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: ICocktailMutation = {
      ...state,
      ingredients,
    };

    try {
      await dispatch(createCocktail(data));
      navigate('/');
    } catch (e) {
      alert('Invalid field');
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const addNewField = () => {
    setIngredients((prevState) => [...prevState, { name: '', amount: '' }]);
  };

  const deleteField = (index: number) => {
    setIngredients((prevState) => prevState.filter((_, idx) => idx !== index));
  };

  const handleIngChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name as keyof IIngredient] = e.target.value;
    setIngredients(newIngredients);
  };

  return (
    <Container component="main" maxWidth="lg" className="form-wrapper">
      <form autoComplete="off" onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="name"
              label="name"
              value={state.name}
              onChange={inputChangeHandler}
              name="name"
              size="small"
              required
            />
          </Grid>

          {ingredients.map((ing, idx) => (
            <Grid
              key={idx}
              container
              item
              xs
              direction="row"
              justifyContent="space-between"
              gap="5px"
            >
              <Grid item>
                <TextField
                  label="ingredient name"
                  value={ing.name}
                  onChange={(e) => handleIngChange(e, idx)}
                  name="name"
                  size="small"
                  required
                />
              </Grid>

              <Grid item xs>
                <TextField
                  label="amount"
                  value={ing.amount}
                  onChange={(e) => handleIngChange(e, idx)}
                  name="amount"
                  size="small"
                  required
                />
              </Grid>

              {idx ? (
                <Grid item>
                  <Button onClick={() => deleteField(idx)} color="error">
                    remove
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          ))}

          {ingredients.length === 10 ? null : (
            <Grid item>
              <Button onClick={addNewField} color="secondary">
                add
              </Button>
            </Grid>
          )}

          <Grid item xs>
            <TextField
              multiline
              rows={3}
              id="recipe"
              label="recipe"
              value={state.recipe}
              onChange={inputChangeHandler}
              name="recipe"
              required
            />
          </Grid>

          <Grid item xs>
            <FileInput onChange={filesInputChangeHandler} name="cocktailImage" label="image" />
          </Grid>

          <Grid item xs>
            <LoadingButton
              type="submit"
              size="small"
              endIcon={<SendIcon />}
              loadingPosition="end"
              variant="contained"
              loading={loading}
            >
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CocktailForm;
