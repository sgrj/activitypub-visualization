import React, { useState } from 'react';

import { ActivityWorkshop } from '../index';

import { useParams } from 'react-router-dom';

const follow = {
  '@context': 'https://www.w3.org/ns/activitystreams',
  id: 'https://localhost.jambor.dev/7a1cda8f-40d2-42d9-b89e-4c9c5bb654da',
  type: 'Follow',
  actor: 'https://localhost.jambor.dev/users/alice',
  object: 'https://activitypub.academy/users/alice',
};

const defaultInboxUrl = 'https://activitypub.academy/users/alice/inbox';

export default function Workshop() {
  const { data } = useParams();

  const [activity, setActivity] = useState(
    data == 'initial-data' ? JSON.stringify(follow, null, 2) : ''
  );
  const [inboxUrl, setInboxUrl] = useState(data == 'initial-data' ? defaultInboxUrl : '');

  return (
    <ActivityWorkshop
      key={data}
      activity={activity}
      inboxUrl={inboxUrl}
      onActivityChange={(activity) => setActivity(activity)}
      onInboxUrlChange={(inboxUrl) => setInboxUrl(inboxUrl)}
      onSubmit={async () => {
        await fetch('http://localhost:3000/api/v1/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inbox_url: inboxUrl, activity: JSON.parse(activity) }),
        });
      }}
    />
  );
}
