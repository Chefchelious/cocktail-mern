import React, { useEffect } from 'react';
import CocktailItem from './components/CocktailItem.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectCocktails, selectCocktailsLoading } from './cocktailsSlice.ts';
import './Cocktails.css';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { fetchCocktails } from './cocktailsThunk.ts';

const CocktailList = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(fetchCocktails({ user: '', admin: '' }));
  }, [dispatch]);

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

export default CocktailList;
