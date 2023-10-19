import React from 'react';
import { apiUrl } from '../../../constants.ts';
import { ICocktail } from '../../../types';

interface IProps {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<IProps> = ({ cocktail }) => {
  return (
    <div className="card">
      <div className="card__img-wrapper">
        <img
          className="card__img"
          src={apiUrl + '/' + cocktail.cocktailImage}
          alt={cocktail.name}
        />
      </div>
      <div className="card__body">
        <h3 className="card__title">{cocktail.name}</h3>
      </div>
    </div>
  );
};

export default CocktailItem;
