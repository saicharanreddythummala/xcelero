import { User } from '../model/userModel.js';
import fs from 'fs';
import { promisify } from 'util';
import { ObjectId } from 'mongodb';
import ErrorHandler from '../utils/errorHandler.js';

const unlinkAsync = promisify(fs.unlink);

//create user
const createUser = async (req, res, next) => {
  const { username, email, phone } = req.body;

  const imgs = req.files.map((file) => file.filename);
  try {
    const user = await User.create({
      username,
      email,
      phone,
      images: imgs,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

//get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

//get user by id
const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};


// upload more images -- user
const updateUser = async (req, res, next) => {
  const { id } = req.params;

  const imgs = req.files.map((file) => file.filename);

  try {
    await User.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $push: { images: { $each: imgs } } }
    );

    const user = await User.findOne({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

//delete image
const deleteImage = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.query;

  try {
    let user = await User.findOne({ _id: ObjectId(id) });

    await unlinkAsync(`public\\images\\${name}`);

    const imgs = user.images.filter((img) => img !== name);

    await User.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { images: imgs } }
    );

    user = await User.findOne({ _id: ObjectId(id) });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

//get all images
const getImages = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });

    res.send(user.images);
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

export {
  createUser,
  updateUser,
  deleteImage,
  getImages,
  getUsers,
  getUserById,
};
