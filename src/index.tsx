import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import ActivityPubExplorer from './activitypub-explorer';

import './input.css';

import type { ILogEvent } from './types';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);

import logs from './logs.json';

document.querySelector('body').style.margin = '0';

const jsonString =
  '{"@context":["https://www.w3.org/ns/activitystreams","https://w3id.org/security/v1",{"manuallyApprovesFollowers":"as:manuallyApprovesFollowers","toot":"http://joinmastodon.org/ns#","featured":{"@id":"toot:featured","@type":"@id"},"featuredTags":{"@id":"toot:featuredTags","@type":"@id"},"alsoKnownAs":{"@id":"as:alsoKnownAs","@type":"@id"},"movedTo":{"@id":"as:movedTo","@type":"@id"},"schema":"http://schema.org#","PropertyValue":"schema:PropertyValue","value":"schema:value","discoverable":"toot:discoverable","Device":"toot:Device","Ed25519Signature":"toot:Ed25519Signature","Ed25519Key":"toot:Ed25519Key","Curve25519Key":"toot:Curve25519Key","EncryptedMessage":"toot:EncryptedMessage","publicKeyBase64":"toot:publicKeyBase64","deviceId":"toot:deviceId","claim":{"@type":"@id","@id":"toot:claim"},"fingerprintKey":{"@type":"@id","@id":"toot:fingerprintKey"},"identityKey":{"@type":"@id","@id":"toot:identityKey"},"devices":{"@type":"@id","@id":"toot:devices"},"messageFranking":"toot:messageFranking","messageType":"toot:messageType","cipherText":"toot:cipherText","suspended":"toot:suspended","focalPoint":{"@container":"@list","@id":"toot:focalPoint"}}],"id":"https://mastodon.social/users/Gargron","type":"Person","following":"https://mastodon.social/users/Gargron/following","followers":"https://mastodon.social/users/Gargron/followers","inbox":"https://mastodon.social/users/Gargron/inbox","outbox":"https://mastodon.social/users/Gargron/outbox","featured":"https://mastodon.social/users/Gargron/collections/featured","featuredTags":"https://mastodon.social/users/Gargron/collections/tags","preferredUsername":"Gargron","name":"Eugen Rochko","summary":"test","url":"https://mastodon.social/@Gargron","manuallyApprovesFollowers":false,"discoverable":true,"published":"2016-03-16T00:00:00Z","devices":"https://mastodon.social/users/Gargron/collections/devices","alsoKnownAs":["https://tooting.ai/users/Gargron"],"publicKey":{"id":"https://mastodon.social/users/Gargron#main-key","owner":"https://mastodon.social/users/Gargron","publicKeyPem":"-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvXc4vkECU2/CeuSo1wtn\\nFoim94Ne1jBMYxTZ9wm2YTdJq1oiZKif06I2fOqDzY/4q/S9uccrE9Bkajv1dnkO\\nVm31QjWlhVpSKynVxEWjVBO5Ienue8gND0xvHIuXf87o61poqjEoepvsQFElA5ym\\novljWGSA/jpj7ozygUZhCXtaS2W5AD5tnBQUpcO0lhItYPYTjnmzcc4y2NbJV8hz\\n2s2G8qKv8fyimE23gY1XrPJg+cRF+g4PqFXujjlJ7MihD9oqtLGxbu7o1cifTn3x\\nBfIdPythWu5b4cujNsB3m3awJjVmx+MHQ9SugkSIYXV0Ina77cTNS0M2PYiH1PFR\\nTwIDAQAB\\n-----END PUBLIC KEY-----\\n"},"tag":[],"attachment":[{"type":"PropertyValue","name":"Patreon","value":"val"}],"endpoints":{"sharedInbox":"https://mastodon.social/inbox"},"icon":{"type":"Image","mediaType":"image/jpeg","url":"https://files.mastodon.social/accounts/avatars/000/000/001/original/dc4286ceb8fab734.jpg"},"image":{"type":"Image","mediaType":"image/jpeg","url":"https://files.mastodon.social/accounts/headers/000/000/001/original/3b91c9965d00888b.jpeg"}}';

function Container() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`font-[sans-serif] text-[13px] ${darkMode ? 'bg-black dark' : 'bg-[#eff3f5]'}`}>
      <div
        onClick={() => setDarkMode(!darkMode)}
        className={`${darkMode ? 'text-white' : 'text-black'} cursor-pointer`}
      >
        Switch to {darkMode ? 'light' : 'dark'} mode
      </div>
      {<ActivityPubExplorer initialValue={JSON.parse(jsonString)} />}
      {
        // <ActivityPubExplorer />
      }
    </div>
  );
}

ReactDOM.render(<Container />, elt);
