//modelling library for mongodb
import mongoose from "mongoose";

//connect to db


const connectDB = (url) =>{
    mongoose.set("strictQuery",true);

    mongoose.connect(url)
      .then(()=> console.log('MongoDB connected'))
      .catch((error) => console.log(error));
}


export default connectDB;