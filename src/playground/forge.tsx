import React from 'react';

import { WebFingerForge } from '../index';

import aliceWebFinger from './alice-web-finger.json';

import { useParams } from 'react-router-dom';

export default function Explorer() {
  const { data } = useParams();

  return (
    <WebFingerForge
      key={data}
      loadData={async () => {
        return new Promise((resolve, reject) =>
          setTimeout(
            () =>
              data === 'failing-load'
                ? reject(new Error('failed'))
                : resolve(JSON.stringify(aliceWebFinger, null, 2)),
            500
          )
        );
      }}
      onSubmit={async (value: string) => {
        return new Promise((resolve, reject) =>
          setTimeout(
            () => (data === 'failing-save' ? reject(new Error('failed')) : resolve(null)),
            500
          )
        );
      }}
    />
  );
}
