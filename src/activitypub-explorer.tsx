import React, { useState } from 'react';

import LoadingIndicator from './loading-indicator';

import './input.css';

import ArrowLeftIcon from './images/arrow-left.svg';
import RefreshIcon from './images/refresh.svg';

function JsonViewer({ json, onLinkClick }: { json: object; onLinkClick: (url: string) => void }) {
  if (json == null) {
    return null;
  }

  const keyQuoteClass = 'dark:text-blue-300 text-blue-700';
  const punctuationClass = 'dark:text-blue-100 text-blue-900 pr-1';
  const keyClass = 'dark:text-blue-300 text-blue-700';

  const valueQuoteClass = 'dark:text-green-300 text-green-700';
  const valueStringClass = 'dark:text-green-300 text-green-700';
  const valueNumberClass = 'dark:text-green-300 text-green-700';
  const valueBooleanClass = 'dark:text-green-300 text-green-700';
  const valueNullClass = 'dark:text-green-300 text-green-700';

  const linkClass =
    'dark:text-green-300 text-green-700 hover:underline dark:hover:text-blue-300 hover:text-blue-700 cursor-pointer';

  function Value({ value }: { value: any }) {
    if (typeof value === 'string') {
      return (
        <>
          <span className={valueQuoteClass}>&quot;</span>
          {value.startsWith('https://') ? (
            <a className={linkClass} onClick={() => onLinkClick(value)}>
              {value}
            </a>
          ) : (
            <span className={valueStringClass}>{value}</span>
          )}
          <span className={valueQuoteClass}>&quot;</span>
        </>
      );
    } else if (typeof value === 'number') {
      return <span className={valueNumberClass}>{value}</span>;
    } else if (typeof value === 'boolean') {
      return <span className={valueBooleanClass}>{value.toString()}</span>;
    } else if (value === null) {
      return <span className={valueNullClass}>null</span>;
    } else if (Array.isArray(value)) {
      return (
        <>
          <span className={punctuationClass}>[</span>
          <div className='pl-4'>
            {value.map((v, i) => (
              <div key={i}>
                <Value value={v} />
                {i < value.length - 1 && <span className={punctuationClass}>,</span>}
              </div>
            ))}
          </div>
          <span className={punctuationClass}>]</span>
        </>
      );
    } else if (typeof value === 'object') {
      const entries = Object.entries(value);
      return (
        <>
          <span className={punctuationClass}>{'{'}</span>
          <div className='pl-4'>
            {entries.map(([key, value], i) => {
              return (
                <div key={key}>
                  <span className={keyQuoteClass}>&quot;</span>
                  <span className={keyClass}>{key}</span>
                  <span className={keyQuoteClass}>&quot;</span>
                  <span className={punctuationClass}>:</span>
                  <Value value={value} />
                  {i < entries.length - 1 && <span className={punctuationClass}>,</span>}
                </div>
              );
            })}
          </div>
          <span className={punctuationClass}>{'}'}</span>
        </>
      );
    }
    return null;
  }

  return <Value value={json} />;
}

export default function ActivityPubExplorer({ initialValue = null }: { initialValue?: any }) {
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
          placeholder='Enter an ActivityPub url like https://mastodon.social/users/crepels'
        />
      </div>
      {data.length > 0 && (
        <div className='font-mono dark:bg-[#282c37] bg-[#eff3f5] p-1 border-0 border-t border-solid dark:border-t-[#393f4f] border-t-[#c0cdd9]'>
          {loading ? (
            <LoadingIndicator />
          ) : validJson ? (
            <JsonViewer json={value} onLinkClick={(url) => fetchJsonLd(url)} />
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
