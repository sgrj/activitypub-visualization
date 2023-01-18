import React, { useState } from 'react';

import LoadingIndicator from './loading-indicator';

import './input.css';

// const jsonString =
// '{"@context":"https://www.w3.org/ns/activitystreams","id":"https://mastodon.social/users/Gargron/following?page=2","type":"OrderedCollectionPage","totalItems":340,"next":"https://mastodon.social/users/Gargron/following?page=3","prev":"https://mastodon.social/users/Gargron/following?page=1","partOf":"https://mastodon.social/users/Gargron/following","orderedItems":["https://oisaur.com/users/renchap","https://macaw.social/users/biz","https://mas.to/users/paulg","https://mastodon.social/users/JxckS","https://mastodon.social/users/tiffanycli","https://mastodon.ie/users/donieosullivan","https://hachyderm.io/users/schlink","https://mastodon.social/users/Prime","https://mastodon.social/users/fastmail","https://mastodon.social/users/Popehat","https://m.webtoo.ls/users/Akryum","https://mastodon.social/users/AbandonedAmerica"]}';

const jsonString =
  '{"@context":["https://www.w3.org/ns/activitystreams","https://w3id.org/security/v1",{"manuallyApprovesFollowers":"as:manuallyApprovesFollowers","toot":"http://joinmastodon.org/ns#","featured":{"@id":"toot:featured","@type":"@id"},"featuredTags":{"@id":"toot:featuredTags","@type":"@id"},"alsoKnownAs":{"@id":"as:alsoKnownAs","@type":"@id"},"movedTo":{"@id":"as:movedTo","@type":"@id"},"schema":"http://schema.org#","PropertyValue":"schema:PropertyValue","value":"schema:value","discoverable":"toot:discoverable","Device":"toot:Device","Ed25519Signature":"toot:Ed25519Signature","Ed25519Key":"toot:Ed25519Key","Curve25519Key":"toot:Curve25519Key","EncryptedMessage":"toot:EncryptedMessage","publicKeyBase64":"toot:publicKeyBase64","deviceId":"toot:deviceId","claim":{"@type":"@id","@id":"toot:claim"},"fingerprintKey":{"@type":"@id","@id":"toot:fingerprintKey"},"identityKey":{"@type":"@id","@id":"toot:identityKey"},"devices":{"@type":"@id","@id":"toot:devices"},"messageFranking":"toot:messageFranking","messageType":"toot:messageType","cipherText":"toot:cipherText","suspended":"toot:suspended","focalPoint":{"@container":"@list","@id":"toot:focalPoint"}}],"id":"https://mastodon.social/users/Gargron","type":"Person","following":"https://mastodon.social/users/Gargron/following","followers":"https://mastodon.social/users/Gargron/followers","inbox":"https://mastodon.social/users/Gargron/inbox","outbox":"https://mastodon.social/users/Gargron/outbox","featured":"https://mastodon.social/users/Gargron/collections/featured","featuredTags":"https://mastodon.social/users/Gargron/collections/tags","preferredUsername":"Gargron","name":"Eugen Rochko","summary":"test","url":"https://mastodon.social/@Gargron","manuallyApprovesFollowers":false,"discoverable":true,"published":"2016-03-16T00:00:00Z","devices":"https://mastodon.social/users/Gargron/collections/devices","alsoKnownAs":["https://tooting.ai/users/Gargron"],"publicKey":{"id":"https://mastodon.social/users/Gargron#main-key","owner":"https://mastodon.social/users/Gargron","publicKeyPem":"-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvXc4vkECU2/CeuSo1wtn\\nFoim94Ne1jBMYxTZ9wm2YTdJq1oiZKif06I2fOqDzY/4q/S9uccrE9Bkajv1dnkO\\nVm31QjWlhVpSKynVxEWjVBO5Ienue8gND0xvHIuXf87o61poqjEoepvsQFElA5ym\\novljWGSA/jpj7ozygUZhCXtaS2W5AD5tnBQUpcO0lhItYPYTjnmzcc4y2NbJV8hz\\n2s2G8qKv8fyimE23gY1XrPJg+cRF+g4PqFXujjlJ7MihD9oqtLGxbu7o1cifTn3x\\nBfIdPythWu5b4cujNsB3m3awJjVmx+MHQ9SugkSIYXV0Ina77cTNS0M2PYiH1PFR\\nTwIDAQAB\\n-----END PUBLIC KEY-----\\n"},"tag":[],"attachment":[{"type":"PropertyValue","name":"Patreon","value":"val"}],"endpoints":{"sharedInbox":"https://mastodon.social/inbox"},"icon":{"type":"Image","mediaType":"image/jpeg","url":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg"},"image":{"type":"Image","mediaType":"image/jpeg","url":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg"}}';

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

export default function ActivityPubExplorer() {
  const [subject, setSubject] = useState('https://mastodon.social/users/Gargron');

  // const [lastFetchedUrl, setLastFetchedUrl] = useState(null);
  // const [lastStatus, setLastStatus] = useState(null);
  const [lastFetchedUrl, setLastFetchedUrl] = useState('https://mastodon.social/users/crepels');
  const [lastStatus, setLastStatus] = useState(200);
  const [lastStatusText, setLastStatusText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validJson, setValidJson] = useState(true);

  // const [value, setValue] = useState(null);
  const [value, setValue] = useState(JSON.parse(jsonString));

  const fetchJsonLd = async (url: string) => {
    setLastFetchedUrl(url);
    setLastStatus(null);
    setValue(null);
    setLoading(true);
    setValidJson(true);

    const response = await fetch(
      'http://localhost:3000/api/v1/json_ld?' + new URLSearchParams({ url }).toString()
    );

    setLoading(false);
    setLastStatus(response.status);
    setLastStatusText(response.statusText);
    try {
      setValue(await response.json());
    } catch (e) {
      setValidJson(false);
    }
  };

  return (
    <div className='text-[#9baec8] bg-[#1f232b]'>
      <div className='p-4 pb-2'>
        <input
          className='w-full box-border p-2.5 rounded outline-none border-solid text-base leading-[18px] border-[#393f4f] bg-[#282c37] text-[#9baec8]'
          type='text'
          value={subject}
          spellCheck={false}
          onChange={(event) => setSubject(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              fetchJsonLd(subject);
            }
          }}
          placeholder='Enter an ActivityPub url like https://mastodon.social/users/crepels'
        />
      </div>
      <div className='m-2 mb-4'>
        {lastFetchedUrl != null && (
          <div>
            <span className='font-semibold'>{loading ? 'Fetching' : 'Fetched'} data for </span>
            <span>{lastFetchedUrl}</span>
          </div>
        )}
        {lastStatus != null && (
          <div>
            <span className='font-semibold'>Response status </span>
            <span className='font-mono'>
              {lastStatus} {lastStatusText}
            </span>
          </div>
        )}
      </div>
      <div className='font-mono bg-[#282c37] p-1 border-0 border-t border-solid border-t-[#393f4f]'>
        {loading ? (
          <LoadingIndicator />
        ) : validJson ? (
          <JsonViewer json={value} onLinkClick={(url) => fetchJsonLd(url)} />
        ) : (
          <div>The response did not return valid JSON</div>
        )}
      </div>
    </div>
  );
}