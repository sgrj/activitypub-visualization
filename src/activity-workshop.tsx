import React, { useState } from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';

import LoadingIndicator from './loading-indicator';

import './input.css';
import './codemirror.css';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';

export default function ActivityWorkshop({
  activity,
  inboxUrl,
  onSubmit,
  onActivityChange,
  onInboxUrlChange,
}: {
  activity?: string;
  inboxUrl?: string;
  onSubmit: () => Promise<void>;
  onActivityChange: (activity: string) => void;
  onInboxUrlChange: (inboxUrl: string) => void;
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [activityErrorMessage, setActivityErrorMessage] = useState(null);
  const [inboxUrlErrorMessage, setInboxUrlErrorMessage] = useState(null);
  const [sentMessage, setSentMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const send = async () => {
    setErrorMessage(null);
    setSentMessage(null);

    try {
      const url = new URL(inboxUrl);
      if (url.protocol != 'https:') {
        throw new Error(`protocol must be https, was ${url.protocol}`);
      }
      if (url.host == '') {
        throw new Error(`host must be specified, was ${url.host}`);
      }
    } catch (e) {
      setInboxUrlErrorMessage('Must be a valid https URL');
      return;
    }

    try {
      JSON.parse(activity);
    } catch (e) {
      setActivityErrorMessage('Must be a valid JSON object');
      return;
    }

    try {
      setLoading(true);
      await onSubmit();
      setSentMessage('Activity added to outbound queue');
    } catch (e) {
      setErrorMessage('Failed to send. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className='h-full m-2 dark:text-white flex flex-col'>
      <div>
        <div
          className={`my-1 ${inboxUrlErrorMessage != null ? 'dark:text-red-400 text-red-700' : ''}`}
        >
          <span className='font-medium'>Inbox url</span>
          {inboxUrlErrorMessage && <span className='pl-2'>{inboxUrlErrorMessage}</span>}
        </div>
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
            inboxUrlErrorMessage != null
              ? 'dark:border-red-400 border-red-700'
              : 'border-mastodon-gray-500 dark:border-mastodon-gray-800',
            'dark:bg-mastodon-gray-900',
            'bg-mastodon-gray-300',
            'dark:text-mastodon-gray-500',
            'text-mastodon-gray-900',
            'placeholder:text-mastodon-gray-600',
            'dark:placeholder:text-mastodon-gray-600',
            'placeholder:italic',
          ].join(' ')}
          type='text'
          spellCheck='false'
          autoComplete='off'
          placeholder='For example https://activitypub.academy/users/alice/inbox'
          value={inboxUrl}
          onChange={(e) => {
            setInboxUrlErrorMessage(null);
            setErrorMessage(null);
            onInboxUrlChange(e.target.value);
          }}
        />
      </div>
      <div className='my-2 flex flex-col h-full'>
        <div
          className={`my-1 ${activityErrorMessage != null ? 'dark:text-red-400 text-red-700' : ''}`}
        >
          <span className='font-medium'>Activity</span>
          {activityErrorMessage && <span className='pl-2'>{activityErrorMessage}</span>}
        </div>
        <CodeMirror
          className={[
            'box-border',
            'min-h-[24rem]',
            'h-full',
            'w-full',
            'overflow-auto',
            'rounded',
            'border',
            'border-solid',
            activityErrorMessage != null
              ? 'dark:border-red-400 border-red-700'
              : 'border-mastodon-gray-500 dark:border-mastodon-gray-800',
          ].join(' ')}
          value={activity}
          onBeforeChange={(editor, data, value) => {
            setActivityErrorMessage(null);
            setErrorMessage(null);
            setSentMessage(null);
            onActivityChange(value);
          }}
          options={{
            mode: { name: 'javascript', json: true },
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: { completeSingle: false },
            lineNumbers: false,
            readOnly: false,
            inputStyle: 'textarea', // fix weird behavior on android
            autocorrect: false,
            placeholder:
              'Insert your activity JSON here. For example\n{\n  "@context":"https://www.w3.org/ns/activitystreams",\n  "id":"https://activitypub.academy/some-id",\n  "type":"Follow",\n  "actor":"https://activitypub.academy/users/bob",\n  "object":"https://activitypub.academy/users/alice"\n}\n',
          }}
        />
      </div>
      <div className='my-4 flex flex-row items-center'>
        <button
          className='font-[Roboto] text-base px-4 py-2 rounded bg-mastodon-primary text-white font-medium cursor-pointer disabled:bg-mastodon-gray-500 dark:disabled:bg-mastodon-gray-800 disabled:cursor-default border-0'
          onClick={() => send()}
          disabled={loading}
        >
          <div className='h-[24px] w-[60px] flex flex-row items-center justify-center'>
            {loading ? <LoadingIndicator small colorDefinition='white' /> : 'Publish!'}
          </div>
        </button>
        {errorMessage && <div className='mx-4 dark:text-red-400 text-red-700'>{errorMessage}</div>}
        {sentMessage && <div className='mx-4 dark:text-white'>{sentMessage}</div>}
      </div>
    </div>
  );
}
