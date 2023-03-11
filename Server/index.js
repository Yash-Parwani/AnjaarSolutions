import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors';

import connectDB from './mongodb/connect.js';


//importing routes

import userRouter from './routes/user.routes.js' // in react or next we were not supposed to provide the extensions like .js but here in nodejs we do need to provide them
import companyRouter from'./routes/company.routes.js'
//accessing .env variables
dotenv.config();

//initialzing server

const app = express();

//adding middleware to app
app.use(cors())
//can have a limit of only 50 mb of adding files from frontend
app.use(express.json({limit: '50mb'}));

app.get('/',(req,res) =>{
    res.send({message: 'Hello World!'});
})
//using routes

app.use('/api/v1/users',userRouter);
app.use('/api/v1/companies',companyRouter);

//starting our server

const startServer = async () =>{
    try{
        //connect to database...
        connectDB(process.env.MONGODB_URL);
        //once connected listen to 8080 port
        app.listen(8080,()=> console.log('Server started on port http://localhost:8080'));
    }
    catch(error){
        console.log(error);
    }
}


startServer();