import React, { useState } from 'react';
import { SelectChangeEvent } from '@pankod/refine-mui';
import { useForm, useGetIdentity } from '@pankod/refine-core';
import { useNavigate } from '@pankod/refine-react-router-v6';

import { validateForm } from 'utils/validateForm';
import Form from 'components/common/Form';

const CreateProperty = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    propertyType: '',
    location: '',
    price: 0,
  });
  const [propertyImage, setPropertyImage] = useState({
    name: '',
    url: '',
  })
  const [loading, setLoading] = useState(false);

  const { onFinish } = useForm({
    resource: 'api/v1/properties',
    action: 'create'
  })

  const handleOnChange = (
    name: string, 
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    })
  }

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string)
      fileReader.readAsDataURL(readFile);
    })

    reader(file)
      .then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  }

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { hasError, errors } = validateForm(formValues);

    console.log("We're here")

    if(hasError) return alert(errors.message);
    if(!propertyImage.name) return alert('Please select an image');
    console.log("We're here 1")

    setLoading(true);
    
    console.log("We're here 2")

    await onFinish({
      ...formValues,
      photo: propertyImage.url,
      email: user.email,
    });
    console.log("We're her3")


    navigate('/properties');

    setLoading(false);
  }

  return (
    <Form
      type="Post"
      formValues={formValues}
      propertyImage={propertyImage}
      loading={loading}
      handleOnChange={handleOnChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default CreateProperty