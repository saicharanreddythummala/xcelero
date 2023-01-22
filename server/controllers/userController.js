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
const getUsers = async (req, res) => {
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
const getUserById = async (req, res) => {
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

//user can replace image
// const updateUser = async (req, res) => {
//   const { username } = req.body;
//   const { name } = req.params;
//   const { filename } = req.file;

//   try {
//     let user = await User.findOne({ username });

//     await unlinkAsync(`public\\images\\${name}`);

//     const imgs = user.images.filter((file) => file !== name);

//     imgs.push(filename);

//     await User.findOneAndUpdate({ username }, { $set: { images: imgs } });
//     user = await User.findOne({ username });

//     res.status(200).json({
//       success: true,
//       filename,
//     });
//   } catch (err) {
//     console.log(err.message);

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };

// upload more images -- user
const updateUser = async (req, res) => {
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
const deleteImage = async (req, res) => {
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
const getImages = async (req, res) => {
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
