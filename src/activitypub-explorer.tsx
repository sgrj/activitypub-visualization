import React, { useState } from 'react';

import LoadingIndicator from './loading-indicator';

import './input.css';

import ArrowLeftIcon from './images/arrow-left.svg';
import RefreshIcon from './images/refresh.svg';

function JsonViewer({ json, onLinkClick }: { json: object; onLinkClick: (url: string) => void }) {
  if (json == null) {
    return null;
  }

  const keyQuoteClass = 'text-blue-300';
  const punctuationClass = 'text-blue-100 pr-1';
  const keyClass = 'text-blue-300';

  const valueQuoteClass = 'text-green-300';
  const valueStringClass = 'text-green-300';
  const valueNumberClass = 'text-green-300';
  const valueBooleanClass = 'text-green-300';
  const valueNullClass = 'text-green-300';

  const linkClass = 'text-green-300 hover:underline hover:text-blue-300 cursor-pointer';

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
            url: null,
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
    <div className='text-[#9baec8] bg-[#1f232b]'>
      <div className='p-4 flex items-center'>
        <button
          className={`w-6 h-6 p-0 m-2 bg-transparent border-0 ${
            data.length > 1
              ? 'fill-dark-mastodon-gray cursor-pointer'
              : 'fill-dark-mastodon-light-gray'
          }`}
          onClick={() => {
            if (data.length > 1) {
              console.log(`setting search string to ${data[data.length - 2].url}`);
              setSearchString(data[data.length - 2].url || '');
              setData(data.slice(0, data.length - 1));
            }
          }}
        >
          <ArrowLeftIcon />
        </button>
        <button
          className={`w-6 h-6 p-0 m-2 bg-transparent border-0 ${
            data.length > 0 && data[data.length - 1].url != null
              ? 'fill-dark-mastodon-gray cursor-pointer'
              : 'fill-dark-mastodon-light-gray'
          }`}
          onClick={() => {
            if (data.length > 0 && data[data.length - 1].url != null) {
              fetchJsonLd(data[data.length - 1].url, data.slice(0, data.length - 1));
            }
          }}
        >
          <RefreshIcon />
        </button>
        <input
          className='w-full box-border p-2.5 rounded outline-none border-solid text-base leading-[18px] border-[#393f4f] bg-[#282c37] text-[#9baec8]'
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
        <div className='font-mono bg-[#282c37] p-1 border-0 border-t border-solid border-t-[#393f4f]'>
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
