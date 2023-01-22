import express from 'express';
import {
  createUser,
  deleteImage,
  getImages,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { uploadImage } from '../helpers/helper.js';

const route = express.Router();

route.get('/', getUsers);
route.get('/:id', getUserById);
route.get('/images', getImages);
route.post('/', uploadImage, createUser);
route.post('/:id', uploadImage, updateUser);

route.delete('/:id', deleteImage);

export const userRoute = route;
