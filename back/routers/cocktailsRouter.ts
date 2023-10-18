import express from 'express';
import auth, { IRequestWithUser } from '../middlewares/auth';
import { imagesUpload } from '../multer';
import Cocktail from '../models/Cocktail';
import mongoose from 'mongoose';
import permit from '../middlewares/permit';

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

export default cocktailsRouter;