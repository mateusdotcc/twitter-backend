import { Router } from 'express';
import multer from 'multer';

import MulterConfig from '../config/multer';
import UserController from '../controllers/UserController';
import TweetController from '../controllers/TweetController';

const routes = Router();

routes.get('/users/:id', UserController.index);

routes.post(
  '/users',
  multer(MulterConfig).array('file', 2),
  UserController.store,
);
routes.put(
  '/users/:id',
  multer(MulterConfig).array('file', 2),
  UserController.update,
);

routes.post('/users/:id/tweet', TweetController.store);

export default routes;
