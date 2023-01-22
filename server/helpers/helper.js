import multer from 'multer';
import path from 'path';
import catchAsyncErr from '../middleware/catchAsyncErr.js';
import ErrorHandler from '../utils/errorHandler.js';

const fileStorage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadImage = catchAsyncErr(
  multer({
    storage: fileStorage,
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) {
        return cb(new ErrorHandler('Please upload an image file!'));
      }
      cb(undefined, true);
    },
  }).array('image', 10)
);

export { uploadImage };
