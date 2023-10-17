import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link, Avatar, Box, Container, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { LoadingButton } from '@mui/lab';
import { RegisterMutation } from '../../types';
import { selectRegisterError, selectRegisterLoading } from './usersSlice.ts';
import { register } from './usersThunk.ts';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import './styles/Register.css';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    displayName: '',
    avatar: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch {
      // nothing
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
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

  return (
    <Container component="main" maxWidth="xs" className="form-wrapper">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="email"
                name="email"
                autoComplete="new-username"
                value={state.email}
                onChange={inputChangeHandler}
                error={!!getFieldError('username')}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={!!getFieldError('password')}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="displayName"
                label="display name"
                autoComplete="new-displayName"
                value={state.displayName}
                onChange={inputChangeHandler}
                error={!!getFieldError('displayName')}
                helperText={getFieldError('displayName')}
              />
            </Grid>

            <Grid item xs>
              <FileInput onChange={filesInputChangeHandler} name="avatar" label="avatar" />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
