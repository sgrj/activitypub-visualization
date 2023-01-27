import React, { useEffect, useState } from 'react';

import LoadingIndicator from './loading-indicator';
import JsonViewer from './json-viewer';

import './input.css';

import ArrowLeftIcon from './images/arrow-left.svg';
import RefreshIcon from './images/refresh.svg';

export default function ActivityPubExplorer({
  initialValue = null,
  initialUrl = '',
}: {
  initialValue?: any;
  initialUrl?: string;
}) {
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

  const fetchJsonLd = async (url: string, baseData = data) => {
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

  const { url, status, statusText, value, validJson } = data[data.length - 1] || {};

  return (
    <div className='dark:text-[#9baec8] dark:bg-[#1f232b] bg-[#e6ebf0]'>
      <div className='p-4 flex items-center'>
        <button
          className={`w-6 h-6 p-0 m-2 bg-transparent border-0 ${
            data.length > 1
              ? 'dark:fill-dark-mastodon-gray fill-[#606984] cursor-pointer'
              : 'dark:fill-dark-mastodon-light-gray fill-light-mastodon-light-gray'
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
              ? 'dark:fill-dark-mastodon-gray fill-[#606984] cursor-pointer'
              : 'dark:fill-dark-mastodon-light-gray fill-light-mastodon-light-gray'
          }`}
          onClick={() => {
            if (url !== '') {
              fetchJsonLd(url, data.slice(0, data.length - 1));
            }
          }}
        >
          <RefreshIcon />
        </button>
        <input
          className='w-full box-border p-2.5 rounded outline-none border-solid text-base leading-[18px] dark:border-[#393f4f] border-[#c0cdd9] dark:bg-[#282c37] bg-[#d9e1e8] dark:text-[#9baec8] text-[#282c37]'
          type='text'
          value={searchString}
          spellCheck={false}
          onChange={(event) => setSearchString(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              fetchJsonLd(searchString);
            }
          }}
          placeholder=' an ActivityPub url like https://mastodon.social/users/crepels'
        />
      </div>
      {data.length > 0 && (
        <div className='p-1 border-0 border-t border-solid dark:border-t-[#393f4f] border-t-[#c0cdd9]'>
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
