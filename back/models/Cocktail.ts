import mongoose from 'mongoose';
import { ICocktail } from '../types';

const Schema = mongoose.Schema;

const CocktailSchema = new Schema<ICocktail>({
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cocktailImage: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;
