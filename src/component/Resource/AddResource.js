import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import ResourceForm from './ResourceForm';

const AddResource = () => {
  return (
    <div>
      <Header title="Add Resource" />
      <ResourceForm />
    </div>
  );
};

export default AddResource;
