import React from 'react';

import { ActivityPubExplorer } from '../index';

import userEntity from './user-entity.json';

import { useParams } from 'react-router-dom';

export default function Explorer() {
  const { data } = useParams();

  const initialActivityJson = () => {
    if (data == 'initial-data') {
      return userEntity;
    } else {
      return null;
    }
  };

  return (
    <ActivityPubExplorer
      key={data}
      fetchMethod={async (url) =>
        fetch('http://localhost:3000/api/v1/json_ld?' + new URLSearchParams({ url }).toString())
      }
      initialActivityJson={initialActivityJson()}
    />
  );
}
