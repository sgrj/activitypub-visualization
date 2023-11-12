import React, { useState } from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';

import LoadingIndicator from './loading-indicator';

import './input.css';
import './codemirror.css';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/placeholder';

export default function WebFingerForge({
  onSubmit,
  initialValue,
}: {
  onSubmit: () => Promise<void>;
  initialValue: string;
}) {
  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);

  const send = async () => {
    setErrorMessage(null);

    try {
      JSON.parse(value);
    } catch (e) {
      setErrorMessage('Value must be a valid JSON object');
      return;
    }

    try {
      setLoading(true);
      await onSubmit();
    } catch (e) {
      setErrorMessage('Failed to send. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className='h-full m-2 dark:text-white flex flex-col'>
      <div className='my-2 flex flex-col h-full'>
        <div className='my-1'>
          <span className='font-medium'>WebFinger response</span>
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
            'border-mastodon-gray-500 dark:border-mastodon-gray-800',
          ].join(' ')}
          value={value}
          onBeforeChange={(editor, data, value) => {
            setValue(value);
            setErrorMessage(null);
          }}
          options={{
            mode: { name: 'javascript', json: true },
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: { completeSingle: false },
            lineNumbers: false,
            readOnly: false,
            inputStyle: 'textarea', // fix weird behavior on android
            autocorrect: false,
            placeholder: 'Insert the WebFinger response here.',
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
            {loading ? <LoadingIndicator small colorDefinition='white' /> : 'Save'}
          </div>
        </button>
        <div className='mx-4 dark:text-red-400 text-red-700'>{errorMessage}</div>
      </div>
    </div>
  );
}
