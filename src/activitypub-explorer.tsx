import React, { useState } from 'react';

import LoadingIndicator from './loading-indicator';

import './input.css';

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
  const [searchString, setSearchString] = useState('https://mastodon.social/users/Gargron');

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

  const fetchJsonLd = async (url: string, resetData = false) => {
    const baseData = resetData ? [] : data;
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
      <div className='p-4'>
        <input
          className='w-full box-border p-2.5 rounded outline-none border-solid text-base leading-[18px] border-[#393f4f] bg-[#282c37] text-[#9baec8]'
          type='text'
          value={searchString}
          spellCheck={false}
          onChange={(event) => setSearchString(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              fetchJsonLd(searchString, true);
            }
          }}
          placeholder='Enter an ActivityPub url like https://mastodon.social/users/crepels'
        />
      </div>
      <div className='mx-2 mt-0 mb-4'>
        {url != null && (
          <div>
            <span className='font-semibold'>{loading ? 'Fetching' : 'Fetched'} data for </span>
            <span>{url}</span>
          </div>
        )}
        {status != null && (
          <div>
            <span className='font-semibold'>Response status </span>
            <span className='font-mono'>
              {status} {statusText}
            </span>
          </div>
        )}
        {data.length > 1 && (
          <div>
            <button onClick={() => setData(data.slice(0, data.length - 1))}>back</button>
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className='font-mono bg-[#282c37] p-1 border-0 border-t border-solid border-t-[#393f4f]'>
          {loading ? (
            <LoadingIndicator />
          ) : validJson ? (
            <JsonViewer json={value} onLinkClick={(url) => fetchJsonLd(url)} />
          ) : (
            <div>The response did not return valid JSON</div>
          )}
        </div>
      )}
    </div>
  );
}
