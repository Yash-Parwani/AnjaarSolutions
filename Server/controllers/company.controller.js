import mongoose from "mongoose";
import Company from "../mongodb/models/companies.js";
import User from "../mongodb/models/user.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
//setting cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllCompanies = async(req,res) =>{
  // getting params passed to url like pageSize , ordering , filtering ,etc
  const {_end,_start,name_like = " "} = req.query;

  const query ={};

  if(name_like !== ""){
    query.name = { $regex: name_like, $options:'i'};
  }

  try{
    //getting count of all comapanies , it will help for pagination

    const count = await Company.countDocuments({ query });



    //to get all documents in a collection we pass an empty object
    //.limit() is a method in mongoose to specify the maximum number of documents to return from a query
    //._end means to get data based on number of pages passed


     const companies = await Company
     .find(query)
     .limit(_end)
     .skip(_start)
     
    // passing total companies to help refine know total no of companies for pagination
     res.header('x-total-count',count);
     res.header('Access-Control-Expose-Headers','x-total-count');
     res.status(200).json(companies);
  }
  catch(error){
    res.status(500).json({message :error.message});
  }



};



const getCompanyDetail = async (req, res) => {
  // get the id from req of the company we want to look
  const { id } = req.params;

  // check if that company exists i.e koi chedchaani toh nahi kar raha
  // if company exists, than we populate the creator as well i.e who created the company listing i.e we go to users table and populate all the data of the user having that id in the current call . So companyExists will have both the company details and the user details(all of it)

  const companyExists = await Company.findOne({ _id: id }).populate("creator");

  if (companyExists) {
    // we return the response to frontend
    res.status(200).json(companyExists);
  } else {
    res.status(404).json({ message: "Company not Found" });
  }
};
const createCompany = async (req, res) => {
  try {
    // destructuring companies being sent from frontend
    const { name, address, phone, email, emailOfEnterer, date, logo } =
      req.body;

    /*Start a new session in mongoose . Why ?
    To maintain atomicity 
    i.e Create in a go only
  */

    const session = await mongoose.startSession();
    session.startTransaction();

    // fetch the user by email since we will be populating in his db as well. Binding session as well in the command to fetch user so as to do it in current session only

    const user = await User.findOne({ emailOfEnterer }).session(session);

    //if user doesnt exists, than throw error
    if (!user) {
      throw new Error("User not found");
    }

    //if user exists, get their logo and upload to cloudinary

    const photoUrl = await cloudinary.uploader.upload(logo);

    const newCompany = await Company.create({
      name,
      address,
      phone,
      email,
      emailOfEnterer,
      date,
      logo: photoUrl.url,
      creator: user._id,
    });
    //update property in user as well
    user.allCompanies.push(newCompany._id);

    // save the session
    await user.save({ session });

    //done with session
    await session.commitTransaction();

    res.status(200).json({ message: "Company Created Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in creating company ," + error.message });
  }
};
const updateCompany = async (req, res) => {
  try {
    // get id of company to update
    const { id } = req.params;
    // for update ,we need to get all properties of company from frontend
    const { name, address, email, phone, date, logo } = req.body;

    const logoUrl = await cloudinary.uploader.upload(logo);
    await Company.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
        address,
        email,
        phone,
        date,
        logo: logoUrl.url || logo, // if user doesnt submit new logo tha go with old one only
      }
    );
    res.status(200).json({ message: "Company Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteCompany = async (req, res) => {
  try {
    // get id of company to delete
    const { id } = req.params;

    //get that company from db, why not directly delete?
    //well we need to delete company from both ends , from company collection and the particular user document as well who created it, so we populate creator as well
    const companyToDelete = await Company.findById({ _id: id }).populate(
      "creator"
    );

    // check if companyExits
    if (!companyToDelete) throw new Error("Company not found");

    //create a session to maintain atomicity
    const session = await mongoose.startSession();
    session.startTransaction();
    // removing company from this session
    companyToDelete.deleteOne({ session });
    // getting company from user to delete
  
    companyToDelete.creator.allCompanies.pull(companyToDelete);
    // saving document in the current session itself
    await companyToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllCompanies,
  getCompanyDetail,
  createCompany,
  updateCompany,
  deleteCompany,
};
