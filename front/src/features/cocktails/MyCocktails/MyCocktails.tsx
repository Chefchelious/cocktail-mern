import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectCocktails, selectCocktailsLoading } from '../cocktailsSlice.ts';
import { fetchCocktails } from '../cocktailsThunk.ts';
import CocktailItem from '../components/CocktailItem.tsx';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import { selectUser } from '../../users/usersSlice.ts';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(
      fetchCocktails({
        author: user && user.role === 'admin' ? '' : 'true',
        admin: user && user.role === 'admin' ? 'true' : '',
      }),
    );
  }, [dispatch, user]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="cards">
      {cocktails.map((c) => (
        <CocktailItem key={c._id} cocktail={c} />
      ))}
    </div>
  );
};

export default MyCocktails;
