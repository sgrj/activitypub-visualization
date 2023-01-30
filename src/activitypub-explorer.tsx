import React, { useEffect, useState } from 'react';

import LoadingIndicator from './loading-indicator';
import JsonViewer from './json-viewer';

import './input.css';

import ArrowLeftIcon from './images/arrow-left.svg';
import RefreshIcon from './images/refresh.svg';

const fullMentionRegex = /^@(?<username>[^@]+)@(?<domain>[^@]+)$/;

export default function ActivityPubExplorer({
  initialValue = null,
  initialUrl = '',
}: {
  initialValue?: any;
  initialUrl?: string;
}) {
  // We want to show an explanation box when the search field is focussed but empty.
  // Ideally, we would keep a ref on the input element and check its focused state.
  // But in the first render, the ref is null. If the user focuses the input element,
  // we would like to show the explanation box, but since focusing doesn't trigger a
  // re-render, the ref is still null and we cannot use it to check the focused state.
  // So instead, we keep track of the focused state manually, using onFocus and onBlur.
  const [focused, setFocused] = useState(false);

  const [searchString, setSearchString] = useState('');

  const [data, setData] = useState(
    initialValue != null
      ? [
          {
            url: '',
            status: null,
            statusText: null,
            value: initialValue,
            validJson: true,
          },
        ]
      : []
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialUrl != '') {
      fetchJsonLd(initialUrl);
    }
  }, []);

  const fetchJsonLd = async (urlOrFullMention: string, baseData = data) => {
    const match = urlOrFullMention.match(fullMentionRegex);

    const url =
      match != null
        ? `https://${match.groups.domain}/.well-known/webfinger?resource=acct:${match.groups.username}@${match.groups.domain}`
        : urlOrFullMention;

    setData([
      ...baseData,
      {
        url,
        status: null,
        statusText: null,
        value: null,
        validJson: false,
      },
    ]);
    setSearchString(url);

    setLoading(true);

    const response = await fetch(
      'http://localhost:3000/api/v1/json_ld?' + new URLSearchParams({ url }).toString()
    );

    setLoading(false);

    try {
      setData([
        ...baseData,
        {
          url,
          status: response.status,
          statusText: response.statusText,
          value: await response.json(),
          validJson: true,
        },
      ]);
    } catch (e) {
      setData([
        ...baseData,
        {
          url,
          status: response.status,
          statusText: response.statusText,
          value: null,
          validJson: false,
        },
      ]);
    }
  };

  const ExplanationBox = () => (
    <div className='relative'>
      <div className='absolute shadow-xl rounded p-2 text-mastodon-gray-700 left-[-200px] w-[400px] top-[10px] bg-white'>
        <div className='uppercase font-medium'>Examples</div>

        <div className='my-2'>
          Enter{' '}
          <span className='font-medium text-black'>https://mastodon.social/users/Gargron</span> to
          see the actor definition of @Gargron@mastodon.social.
        </div>
        <div className='my-2'>
          Enter{' '}
          <span className='font-medium text-black'>
            https://mastodon.social/users/crepels/followers
          </span>{' '}
          to see the followers collection of @crepels@mastodon.social.
        </div>
        <div className='mt-2'>
          Enter a full mention like{' '}
          <span className='font-medium text-black'>@crepels@mastodon.social</span>; it will be
          translated to the corresponding webfinger URL.
        </div>
      </div>
    </div>
  );

  const { url = '', status, statusText, value, validJson } = data[data.length - 1] || {};

  return (
    <div className='dark:text-mastodon-gray-500 dark:bg-mastodon-gray-1000 bg-mastodon-gray-200'>
      <div className='p-4 flex items-center'>
        <button
          className={`w-6 h-6 p-0 m-2 ml-0 bg-transparent border-0 ${
            data.length > 1
              ? 'fill-mastodon-gray-600 cursor-pointer'
              : 'dark:fill-mastodon-gray-800 fill-mastodon-gray-400'
          }`}
          onClick={() => {
            if (data.length > 1) {
              setSearchString(data[data.length - 2].url || '');
              setData(data.slice(0, data.length - 1));
            }
          }}
        >
          <ArrowLeftIcon />
        </button>
        <button
          className={`w-6 h-6 p-0 m-2 bg-transparent border-0 ${
            url !== ''
              ? 'fill-mastodon-gray-600 cursor-pointer'
              : 'dark:fill-mastodon-gray-800 fill-mastodon-gray-400'
          }`}
          onClick={() => {
            if (url !== '') {
              fetchJsonLd(url, data.slice(0, data.length - 1));
            }
          }}
        >
          <RefreshIcon />
        </button>
        <div className='flex flex-col items-center w-full'>
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
            ].join(' ')}
            type='text'
            value={searchString}
            spellCheck={false}
            onChange={(event) => setSearchString(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                fetchJsonLd(searchString);
              }
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder='Enter an ActivityPub URL'
          />
          {searchString === '' && focused && <ExplanationBox />}
        </div>
      </div>
      {data.length > 0 && (
        <div className='border-0 border-t border-solid dark:border-t-mastodon-gray-800 border-t-mastodon-gray-500'>
          {loading ? (
            <LoadingIndicator />
          ) : validJson ? (
            <JsonViewer
              json={value}
              clickableLinks={true}
              onLinkClick={(url) => fetchJsonLd(url)}
            />
          ) : (
            <div>
              The response did not return valid JSON (Response status {status} {statusText})
            </div>
          )}
        </div>
      )}
    </div>
  );
}
