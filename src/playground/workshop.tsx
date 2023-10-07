import React from 'react';

import { ActivityWorkshop } from '../index';

import userEntity from './user-entity.json';

import { useParams } from 'react-router-dom';

export default function Workshop() {
  const { data } = useParams();

  const initialActivityJson = () => {
    if (data == 'initial-data') {
      return userEntity;
    } else {
      return null;
    }
  };

  return (
    <ActivityWorkshop
      key={data}
      sendMethod={async () => fetch('http://localhost:3000/api/v1/activity')}
      initialActivityJson={initialActivityJson()}
    />
  );
}
