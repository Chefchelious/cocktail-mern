import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { LoadingButton } from '@mui/lab';
import {
  selectDeleteCocktailLoading,
  selectFetchOneCocktailLoading,
  selectOneCocktail,
  selectPublishCocktailLoading,
  // setCocktail,
} from '../cocktailsSlice.ts';
import { deleteCocktail, fetchOneCocktail, toggleCocktailPublished } from '../cocktailsThunk.ts';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import { apiUrl } from '../../../constants.ts';
import StarRating from '../../../components/UI/StarRating/StarRating.tsx';
import { selectUser } from '../../users/usersSlice.ts';
import { AnimatePresence, motion } from 'framer-motion';
import { IRating } from '../../../types';
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
    // dispatch(setCocktail());
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.2 },
    },
    hidden: { opacity: 0, x: -50 },
  };

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
    const userRating: IRating | undefined = cocktail.ratings.find(
      (rate) => rate.author === user?._id,
    );

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

          {user && (
            <div style={{ marginTop: '20px' }}>
              <StarRating rating={userRating ? userRating.rate : undefined} />
            </div>
          )}
        </div>

        <div className="cocktail__right-col">
          <h3 className="cocktail__title">{cocktail.name}</h3>
          <p className="cocktail__rating">
            <strong>Rating -</strong>{' '}
            {cocktail.ratings.length > 0
              ? (
                  cocktail.ratings.reduce((acc, value) => acc + value.rate, 0) /
                  cocktail.ratings.length
                ).toFixed(2)
              : 0}{' '}
            ({cocktail.ratings.length} votes)
          </p>
          <span>
            <strong>Ingredients:</strong>
          </span>
          <AnimatePresence>
            <motion.ul
              className="ingredients-list"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
            >
              {cocktail.ingredients.map((ing, idx) => (
                <motion.li className="ingredients-list__item" key={idx} variants={variants}>
                  {ing.name} - ({ing.amount})
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
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
