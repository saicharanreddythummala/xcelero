import mongoose from 'mongoose';

export default function createConnection() {
  mongoose.set('strictQuery', false);

  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to db');
    })
    .catch((err) => {
      console.log(err.message);
    });
}
