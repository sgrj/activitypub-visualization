import React, { useEffect, useState } from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';

import LoadingIndicator from './loading-indicator';
import JsonViewer from './json-viewer';

import './input.css';
import './codemirror.css';

import 'codemirror/mode/javascript/javascript';

export default function ActivityWorkshop({
  sendMethod,
  initialActivityJson = null,
  initialInboxUrl = '',
}: {
  sendMethod: ({ inboxUrl, activity }: { inboxUrl: string; activity: string }) => Promise<Response>;
  initialActivityJson?: object;
  initialInboxUrl?: string;
}) {
  const [inboxUrl, setInboxUrl] = useState(initialInboxUrl);

  const [activityJson, setActivityJson] = useState(
    initialActivityJson == null ? '' : JSON.stringify(initialActivityJson, null, 2)
  );

  // const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('The activity must be a valid JSON object.');

  const [loading, setLoading] = useState(false);

  const send = async () => {
    setErrorMessage(null);
    let activity;
    try {
      activity = JSON.parse(activityJson);
    } catch (e) {
      setErrorMessage('The activity must be a valid JSON object.');
      return;
    }

    try {
      setLoading(true);
      await sendMethod({ inboxUrl, activity });
    } catch (e) {
      setErrorMessage('Failed to send. Please try again.');
    }
    setLoading(false);
  };

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
            'placeholder:italic',
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
          className='h-[94rem] max-h-[75vh] w-full overflow-auto rounded dark:border-mastodon-gray-800'
          value={activityJson}
          onBeforeChange={(editor, data, value) => {
            setErrorMessage(null);
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
      <div className='my-4 flex flex-row items-center'>
        <button
          className='font-[Roboto] text-base px-4 py-2 rounded bg-mastodon-primary text-white font-medium cursor-pointer'
          onClick={() => send()}
        >
          {loading ? <LoadingIndicator /> : 'Publish!'}
        </button>
        <div className='mx-4 dark:text-red-400 text-red-700'>{errorMessage}</div>
      </div>
    </div>
  );
}
