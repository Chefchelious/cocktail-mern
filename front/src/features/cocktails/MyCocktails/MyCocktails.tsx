import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectCocktails, selectCocktailsLoading } from '../cocktailsSlice.ts';
import { fetchCocktails } from '../cocktailsThunk.ts';
import CocktailItem from '../components/CocktailItem.tsx';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';
import { selectUser } from '../../users/usersSlice.ts';
import { Button } from '@mui/material';
import './MyCocktails.css';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const loading = useAppSelector(selectCocktailsLoading);
  const user = useAppSelector(selectUser);
  const [publishFilter, setPublishFilter] = useState(true);

  useEffect(() => {
    dispatch(
      fetchCocktails({
        author: user && user.role === 'admin' ? '' : 'true',
        admin: user && user.role === 'admin' ? 'true' : '',
      }),
    );
  }, [dispatch, user]);

  const publishHandler = (filter: boolean) => setPublishFilter(filter);

  let content: React.ReactNode | null;

  if (loading) {
    content = <Spinner />;
  }

  if (!cocktails.length) {
    content = <h3>you have no publications yet</h3>;
  }

  if (cocktails.length) {
    content = (
      <>
        <div className="btns">
          <Button
            onClick={() => publishHandler(true)}
            variant={publishFilter ? 'contained' : 'text'}
            color="success"
          >
            Published
          </Button>
          <Button
            onClick={() => publishHandler(false)}
            variant={!publishFilter ? 'contained' : 'text'}
            color="warning"
          >
            Unpublished
          </Button>
        </div>
        <div className="cards">
          {cocktails
            .filter((c) => c.isPublished === publishFilter)
            .map((c) => (
              <CocktailItem key={c._id} cocktail={c} />
            ))}
        </div>
      </>
    );
  }

  return content;
};

export default MyCocktails;
