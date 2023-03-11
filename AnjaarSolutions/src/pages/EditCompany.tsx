import { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Form from 'components/layout/common/Form';

const EditCompany = () => {
  const { data: user } = useGetIdentity();
  const [logo, setLogo] = useState({ name: '', url: '' });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();

  const handleLogoChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setLogo({ name: file?.name, url: result }));
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!logo.name) return alert('Please upload a CompanyLogo');

    await onFinish({ ...data, logo: logo.url, emailOfEnterer: user.email });
  };

  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleLogoChange={handleLogoChange}
      onFinishHandler={onFinishHandler}
      logo={logo}
    />
  );
};

export default EditCompany;