import React from 'react';

import { ActivityWorkshop } from '../index';

import userEntity from './user-entity.json';

import { useParams } from 'react-router-dom';

const follow = {
  '@context': 'https://www.w3.org/ns/activitystreams',
  id: 'https://localhost.jambor.dev/7a1cda8f-40d2-42d9-b89e-4c9c5bb654da',
  type: 'Follow',
  actor: 'https://localhost.jambor.dev/users/alice',
  object: 'https://activitypub.academy/users/alice',
};

export default function Workshop() {
  const { data } = useParams();

  const initialActivityJson = () => {
    if (data == 'initial-data') {
      return follow;
    } else {
      return null;
    }
  };

  const initialInboxUrl = () => {
    if (data == 'initial-data') {
      return 'https://activitypub.academy/users/alice/inbox';
    } else {
      return null;
    }
  };

  return (
    <ActivityWorkshop
      key={data}
      sendMethod={async ({ inboxUrl, activity }: { inboxUrl: string; activity: any }) =>
        fetch('http://localhost:3000/api/v1/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inbox_url: inboxUrl, activity }),
        })
      }
      initialActivityJson={initialActivityJson()}
      initialInboxUrl={initialInboxUrl()}
    />
  );
}
