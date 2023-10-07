import React, { useEffect, useState } from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';

import LoadingIndicator from './loading-indicator';
import JsonViewer from './json-viewer';

import './input.css';
import './codemirror.css';

import 'codemirror/mode/javascript/javascript';

const sampleActivityJson = {
  '@context': {
    name: 'http://schema.org/name',
    description: 'http://schema.org/description',
    image: {
      '@id': 'http://schema.org/image',
      '@type': '@id',
    },
    geo: 'http://schema.org/geo',
    latitude: {
      '@id': 'http://schema.org/latitude',
      '@type': 'xsd:float',
    },
    longitude: {
      '@id': 'http://schema.org/longitude',
      '@type': 'xsd:float',
    },
    xsd: 'http://www.w3.org/2001/XMLSchema#',
  },
  name: 'The Empire State Building',
  description: 'The Empire State Building is a 102-story landmark in New York City.',
  image: 'http://www.civil.usherbrooke.ca/cours/gci215a/empire-state-building.jpg',
  geo: {
    latitude: '40.75',
    longitude: '73.98',
  },
};

export default function ActivityWorkshop({
  sendMethod,
  initialActivityJson = null,
  initialInboxUrl = '',
}: {
  sendMethod: () => Promise<Response>;
  initialActivityJson?: object;
  initialInboxUrl?: string;
}) {
  const [inboxUrl, setInboxUrl] = useState(initialInboxUrl);

  // const [activityJson, setActivityJson] = useState(JSON.stringify(initialActivityJson, null, 2));
  const [activityJson, setActivityJson] = useState(JSON.stringify(sampleActivityJson, null, 2));

  return (
    <div className='m-2 dark:text-white'>
      <div>
        <div className='my-1 font-medium'>Inbox url</div>
        <input
          className={[
            'w-full',
            'box-border',
            'p-2.5',
            'rounded',
            'outline-none',
            'border-solid',
            'text-base',
            'leading-[18px]',
            'dark:border-mastodon-gray-800',
            'border-mastodon-gray-500',
            'dark:bg-mastodon-gray-900',
            'bg-mastodon-gray-300',
            'dark:text-mastodon-gray-500',
            'text-mastodon-gray-900',
            'dark:placeholder:text-mastodon-gray-600',
          ].join(' ')}
          type='text'
          placeholder='e.g. https://activitypub.academy/users/alice/inbox'
          value={inboxUrl}
          onChange={(e) => {
            setInboxUrl(e.target.value);
          }}
        />
      </div>
      <div>
        <div className='my-1 font-medium'>Activity</div>

        <CodeMirror
          className='h-full w-full overflow-auto bg-blue-400'
          value={activityJson}
          onBeforeChange={(editor, data, value) => {
            setActivityJson(value);
          }}
          options={{
            mode: { name: 'javascript', json: true },
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: { completeSingle: false },
            lineNumbers: false,
            readOnly: false,
            inputStyle: 'textarea', // fix weird behavior on android
            autocorrect: false,
          }}
        />
      </div>
    </div>
  );
}
