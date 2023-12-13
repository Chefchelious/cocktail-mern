import express from 'express';
import auth, { IRequestWithUser } from '../middlewares/auth';
import { imagesUpload } from '../multer';
import Cocktail from '../models/Cocktail';
import mongoose from 'mongoose';
import permit from '../middlewares/permit';
import User from '../models/User';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res) => {
  try {
    const token = req.get('Authorization');

    const user = await User.findOne({ token });

    if (user && req.query.author === 'true') {
      return res.send(await Cocktail.find({ author: user._id }, '-author -recipe -ingredients'));
    }

    if (user && req.query.admin === 'true' && user.role === 'admin') {
      return res.send(await Cocktail.find({}, '-author -recipe -ingredients'));
    }

    return res.send(
      await Cocktail.find({ isPublished: true }, '-author -recipe -ingredients -isPublished'),
    );
  } catch (e) {
    return res.sendStatus(500);
  }
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

cocktailsRouter.get('/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id).populate('author', 'displayName');

    if (!cocktail) {
      return res.status(404).send({ error: 'Not found' });
    }

    return res.send(cocktail);
  } catch (e) {
    return res.sendStatus(500);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).send({ error: 'Not found' });
    }

    await Cocktail.findByIdAndDelete(req.params.id);
    return res.status(200).send({ message: 'Success' });
  } catch (e) {
    return res.sendStatus(500);
  }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).send({ error: 'Not found' });
    }

    cocktail.isPublished = !cocktail.isPublished;
    await cocktail.save();

    return res.status(200).send(cocktail);
  } catch (e) {
    return res.sendStatus(500);
  }
});

cocktailsRouter.patch('/:id/toggleRating', auth, async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;
    const cocktail = await Cocktail.findOne({ _id: req.params.id });

    if (!cocktail) {
      return res.status(404).send({ error: 'Not found' });
    }

    const rating = parseFloat(req.body.rate);

    if (isNaN(rating) || rating < 0 || rating > 5) {
      return res.status(400).send({ error: 'Rating must be a number between 0 and 5' });
    }

    const userRatingIndex = cocktail.ratings.findIndex((rating) => rating.author.equals(user._id));

    if (userRatingIndex !== -1) {
      if (rating === 0) {
        cocktail.ratings.splice(userRatingIndex, 1);
      } else {
        cocktail.ratings[userRatingIndex].rate = rating;
      }
    } else if (rating > 0) {
      cocktail.ratings.push({ author: user._id, rate: rating });
    }

    await cocktail.save();
    return res.send(cocktail);
  } catch (e) {
    return next(e);
  }
});

export default cocktailsRouter;
