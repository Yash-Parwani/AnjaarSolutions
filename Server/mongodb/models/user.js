import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{type : String, required:true},
    email:{type : String, required:true},
    avatar:{type : String, required:true},
    role:{type : String, required:true},
    allCompanies:[{type:mongoose.Schema.Types.ObjectId , ref:'Company'}],
})

// every user can have a list of companies so here we will have array of companies

// but in Company schema we will have only one user registering a particular company


const userModel = mongoose.model('User',UserSchema);


export default userModel;