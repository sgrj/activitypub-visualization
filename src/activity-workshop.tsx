import React, { useEffect, useState } from 'react';

import LoadingIndicator from './loading-indicator';
import JsonViewer from './json-viewer';

import './input.css';

export default function ActivityWorkshop({
  sendMethod,
  initialActivityJson = null,
  initialInboxUrl = '',
}: {
  sendMethod: () => Promise<Response>;
  initialActivityJson?: object;
  initialInboxUrl?: string;
}) {
  return (
    <div className='m-2 dark:text-white'>
      <div>
        <div className='my-1 font-medium'>Inbox url</div>
        <input
          // className='box-border w-full p-2.5 text-base rounded bg-mastodon-gray-900 border-mastodon-gray-700 border-solid'
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
        />
      </div>
      <div>
        <div className='my-1 font-medium'>Activity</div>
        <textarea
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
          placeholder='https://activitypub.academy/users/alice/inbox'
        />
      </div>
    </div>
  );
}
