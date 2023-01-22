import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  images: {
    type: Array,
    required: false,
  },
});

export let User = mongoose.model('users', UserModel);
