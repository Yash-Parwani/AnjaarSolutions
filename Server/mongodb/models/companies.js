import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    emailOfEnterer: { type: String, required: true },
    date: { type: String, required: true },
    logo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

})


const companyModel = mongoose.model('Company',CompanySchema);


export default companyModel;