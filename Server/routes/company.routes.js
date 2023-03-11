import express from 'express'

import {createCompany,deleteCompany,getAllCompanies,getCompanyDetail,updateCompany} from '../controllers/company.controller.js' // in react or next we were not supposed to provide the extensions like .js but here in nodejs we do need to provide them


const router = express.Router();


router.route('/').get(getAllCompanies);
router.route('/:id').get(getCompanyDetail);
router.route('/').post(createCompany);
router.route('/:id').patch(updateCompany);
router.route('/:id').delete(deleteCompany);


export default router;