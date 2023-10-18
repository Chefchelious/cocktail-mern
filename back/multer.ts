import multer from 'multer';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import config from './config';

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    let dir: string = 'images/';
    if (_file.fieldname === 'avatar') {
      dir += 'avatars';
    }
    if (_file.fieldname === 'cocktailImage') {
      dir += 'cocktailImages';
    }
    // const dir = 'images/' + _file.fieldname;
    const destDir = path.join(config.publicPath, dir);
    await fs.mkdir(destDir, { recursive: true });
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    let fileName: string = '';

    if (file.fieldname === 'avatar') {
      fileName += 'avatars';
    }
    if (file.fieldname === 'cocktailImage') {
      fileName += 'cocktailImages';
    }

    const extension = path.extname(file.originalname);
    cb(null, `images/${fileName}/` + randomUUID() + extension);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
