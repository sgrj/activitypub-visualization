import React from 'react';

import { WebFingerForge } from '../index';

import aliceWebFinger from './alice-web-finger.json';

import { useParams } from 'react-router-dom';

export default function Explorer() {
  const { data } = useParams();

  const fail = data === 'failure';

  return (
    <WebFingerForge
      key={data}
      onSubmit={async () => {
        return new Promise((resolve, reject) =>
          setTimeout(() => (fail ? reject(new Error('failed')) : resolve(null)), 500)
        );
      }}
      initialValue={JSON.stringify(aliceWebFinger, null, 2)}
    />
  );
}
