import User from '../mongodb/models/user.js';


const getAllUsers = async (req,res) =>{};
const createUser = async (req,res) => {
    try{
        // getting all data sent from frontend
   const {name,email,avatar} = req.body;

   // check if user already exists in db, if yes then no need to create data of user again

   const userExists = await User.findOne({email});

   if(userExists) return res.status(200).json(userExists);


   //if user doesnt exists

   const newUser = await User.create({
    name,
    email,
    avatar,
    role:"editor"
   })

   //return new user
   res.status(200).json(newUser);
    }
    catch(error){
      res.status(500).json({message: error.message});
    }
  


};
const getUserInfoByID = async (req,res) => {};


export {
    getAllUsers,
    getUserInfoByID,
    createUser
}