import ErrorHandler from "../utils/errorHandler.js";

export const errorMiddleWare = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //invalid  _id error
    if(err.name==="CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400)
    }

  //duplicate key error
  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message,400);
  }

  res.status(err.statusCode).send({
    success: false,
    error: err.message,
  });
};
