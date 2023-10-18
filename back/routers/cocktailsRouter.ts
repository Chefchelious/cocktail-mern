import express from 'express';
import auth, { IRequestWithUser } from '../middlewares/auth';
import { imagesUpload } from '../multer';
import Cocktail from '../models/Cocktail';
import mongoose from 'mongoose';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  return res.send({ message: 'all cocktails will be here' });
});

cocktailsRouter.post('/', auth, imagesUpload.single('cocktailImage'), async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;

    const cocktail = new Cocktail({
      author: user._id,
      name: req.body.name,
      recipe: req.body.recipe,
      cocktailImage: req.file?.filename,
      ingredients: req.body.ingredients,
    });

    await cocktail.save();
    return res.send(cocktail);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default cocktailsRouter;
