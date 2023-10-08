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
      sendMethod={async ({ inboxUrl, activity }: { inboxUrl: string; activity: string }) =>
        fetch('http://localhost:3000/api/v1/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inbox_url: inboxUrl, activity }),
        })
      }
      initialActivityJson={initialActivityJson()}
    />
  );
}
