import React from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../../constants.ts';
import { ICocktail } from '../../../types';

interface IProps {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<IProps> = ({ cocktail }) => {
  return (
    <Link to={`/cocktails/${cocktail._id}`} className="card" style={{ color: 'white' }}>
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
    </Link>
  );
};

export default CocktailItem;
