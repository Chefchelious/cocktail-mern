import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { LoadingButton } from '@mui/lab';
import {
  selectDeleteCocktailLoading,
  selectFetchOneCocktailLoading,
  selectOneCocktail,
  selectPublishCocktailLoading,
} from '../cocktailsSlice.ts';
import { deleteCocktail, fetchOneCocktail, toggleCocktailPublished } from '../cocktailsThunk.ts';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import { apiUrl } from '../../../constants.ts';
import StarRating from '../../../components/UI/StarRating/StarRating.tsx';
import { selectUser } from '../../users/usersSlice.ts';
import './FullCocktailInfo.css';

const FullCocktailInfo = () => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector(selectOneCocktail);
  const loading = useAppSelector(selectFetchOneCocktailLoading);
  const user = useAppSelector(selectUser);
  const publishLoading = useAppSelector(selectPublishCocktailLoading);
  const deleteLoading = useAppSelector(selectDeleteCocktailLoading);

  useEffect(() => {
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  const publishCocktail = async () => {
    await dispatch(toggleCocktailPublished(id));
    navigate('/cocktails/my_cocktails');
  };

  const handleDeleteCocktail = async () => {
    if (window.confirm('Do you really want to delete this publication?')) {
      await dispatch(deleteCocktail(id));
      navigate('/cocktails/my_cocktails');
    }
  };

  let content: React.ReactNode | null = null;

  if (loading) {
    content = <Spinner />;
  }

  if (cocktail) {
    content = (
      <div className="cocktail">
        <div className="cocktail__left-col">
          <div className="cocktail__img-wrap">
            <img
              className="cocktail__img"
              src={apiUrl + '/' + cocktail.cocktailImage}
              alt={cocktail?.name}
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <StarRating />
          </div>
        </div>

        <div className="cocktail__right-col">
          <h3 className="cocktail__title">{cocktail.name}</h3>
          <p className="cocktail__rating">
            <strong>Rating -</strong> 4.5 (2 votes)
          </p>
          <span>
            <strong>Ingredients:</strong>
          </span>
          <ul className="ingredients-list">
            {cocktail.ingredients.map((ing, idx) => (
              <li className="ingredients-list__item" key={idx}>
                {ing.name} - ({ing.amount})
              </li>
            ))}
          </ul>
        </div>

        {user && user.role === 'admin' && (
          <div>
            <LoadingButton onClick={handleDeleteCocktail} color="secondary" loading={deleteLoading}>
              <span>remove</span>
            </LoadingButton>
            <LoadingButton onClick={publishCocktail} loading={publishLoading}>
              <span>{cocktail.isPublished ? 'unpublish' : 'publish'}</span>
            </LoadingButton>
          </div>
        )}

        <div className="cocktail__recipe">{cocktail.recipe}</div>
      </div>
    );
  }

  return content;
};

export default FullCocktailInfo;
