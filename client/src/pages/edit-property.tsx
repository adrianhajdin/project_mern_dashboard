import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@pankod/refine-mui';
import { useOne, useUpdate } from '@pankod/refine-core';
import { useNavigate, useParams } from '@pankod/refine-react-router-v6';

import { hasChanged, validateForm } from 'utils/validateForm';
import Form from 'components/common/Form';

const EditProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // get property details
  const { data, isLoading, isError } = useOne({
    resource: 'api/v1/properties',
    id: id as string,
  });

  const property = data?.data ?? [];

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
  });
  const [loading, setLoading] = useState(false);

  const { mutateAsync: update } = useUpdate();

  // set as initial values
  useEffect(() => {
    if (id && !isLoading) {
      setFormValues({
        title: property?.title,
        description: property?.description,
        propertyType: property?.propertyType,
        location: property?.location,
        price: property?.price,
      });
    }
  }, [id, isLoading]);

  const handleOnChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { hasError, errors } = validateForm(formValues);
    const isChanged = hasChanged({
      title: property?.title,
      description: property?.description,
      propertyType: property?.propertyType,
      location: property?.location,
      price: property?.price,
    }, formValues);

    if (hasError || !isChanged) {
      if (errors.message) return alert(errors.message);

      if (!propertyImage.name) {
        return alert('You have to change something first!');
      }
    }

    setLoading(true);
    await update({
      resource: 'api/v1/properties',
      id: id as string,
      values: {
        ...formValues,
        photo: propertyImage.url || property?.photo,
      },
    });

    navigate(`/properties/show/${id}`);
    setLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Form
      type="Edit"
      formValues={formValues}
      propertyImage={propertyImage}
      loading={loading}
      handleOnChange={handleOnChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditProperty;
