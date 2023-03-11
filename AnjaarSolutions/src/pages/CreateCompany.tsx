//the useGetIdentity hook will help us to easily get all user related information like name, email , profile photo etc.
import { useGetIdentity } from '@pankod/refine-core'
import React, { useState } from 'react'

import { useForm,FieldValues } from '@pankod/refine-react-hook-form'

import Form from 'components/layout/common/Form'

const CreateCompany = () => {

 // getting the data of the user who is creating the data since we would like to know if user is authorized to add data or not
 const { data: user } = useGetIdentity();
 const [companyLogo, setCompanyLogo] = useState({ name: '', url: '' });


  // refine function for form
  const {refineCore : {onFinish , formLoading},register,handleSubmit} = useForm();
  
  const handleLogoChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setCompanyLogo({ name: file?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
   //if user does not upload property image, we will not submit form since image is mandatory
   if(!companyLogo.name) return alert('Please select an image');
    
   await onFinish({ ...data, logo: companyLogo.url, emailOfEnterer: user.email })
 };

 return (
   <Form 
     type="Create"
     register={register}
     onFinish={onFinish}
     formLoading={formLoading}
     handleSubmit={handleSubmit}
     handleLogoChange={handleLogoChange}
     onFinishHandler={onFinishHandler}
     logo={companyLogo}
   />
 )
}

export default CreateCompany