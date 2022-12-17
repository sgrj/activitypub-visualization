import React, { useState } from 'react';

import './input.css';

const logs = [
  {
    timestamp: '2022-12-08T17:12:38Z',
    type: 'inbound',
    path: '/users/admin/inbox',
    data: {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://techhub.social/users/crepels#follows/410930/undo',
      type: 'Undo',
      actor: 'https://techhub.social/users/crepels',
      object: {
        id: 'https://techhub.social/bba308ce-f0e1-49af-9aa0-30d92e4ff71e',
        type: 'Follow',
        actor: 'https://techhub.social/users/crepels',
        object: 'https://localhost.jambor.dev/users/admin',
      },
    },
  },
  {
    timestamp: '2022-12-08T17:12:38Z',
    type: 'inbound',
    path: '/users/admin/inbox',
    data: {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://techhub.social/a5f25e0a-98d6-4e5c-baad-65318cd4d67d',
      type: 'Follow',
      actor: 'https://techhub.social/users/crepels',
      object: 'https://localhost.jambor.dev/users/admin',
    },
  },
  {
    timestamp: '2022-12-08T17:12:38Z',
    type: 'outbound',
    path: 'https://techhub.social/users/crepels/inbox',
    data: {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://localhost.jambor.dev/users/admin#accepts/follows/29',
      type: 'Accept',
      actor: 'https://localhost.jambor.dev/users/admin',
      object: {
        id: 'https://techhub.social/a5f25e0a-98d6-4e5c-baad-65318cd4d67d',
        type: 'Follow',
        actor: 'https://techhub.social/users/crepels',
        object: 'https://localhost.jambor.dev/users/admin',
      },
    },
  },
  {
    timestamp: '2022-12-08T17:12:38Z',
    type: 'inbound',
    path: '/inbox',
    data: {
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        {
          ostatus: 'http://ostatus.org#',
          atomUri: 'ostatus:atomUri',
          inReplyToAtomUri: 'ostatus:inReplyToAtomUri',
          conversation: 'ostatus:conversation',
          sensitive: 'as:sensitive',
          toot: 'http://joinmastodon.org/ns#',
          votersCount: 'toot:votersCount',
        },
      ],
      id: 'https://techhub.social/users/crepels/statuses/109473290785654613/activity',
      type: 'Create',
      actor: 'https://techhub.social/users/crepels',
      published: '2022-12-07T16:17:32Z',
      to: ['https://localhost.jambor.dev/users/admin'],
      cc: [],
      object: {
        id: 'https://techhub.social/users/crepels/statuses/109473290785654613',
        type: 'Note',
        summary: null,
        inReplyTo: null,
        published: '2022-12-07T16:17:32Z',
        url: 'https://techhub.social/@crepels/109473290785654613',
        attributedTo: 'https://techhub.social/users/crepels',
        to: ['https://localhost.jambor.dev/users/admin'],
        cc: [],
        sensitive: false,
        atomUri: 'https://techhub.social/users/crepels/statuses/109473290785654613',
        inReplyToAtomUri: null,
        conversation: 'tag:techhub.social,2022-12-07:objectId=5564498:objectType=Conversation',
        content:
          '<p><span class="h-card"><a href="https://localhost.jambor.dev/@admin" class="u-url mention">@<span>admin</span></a></span> test</p>',
        contentMap: {
          en: '<p><span class="h-card"><a href="https://localhost.jambor.dev/@admin" class="u-url mention">@<span>admin</span></a></span> test</p>',
        },
        attachment: [],
        tag: [
          {
            type: 'Mention',
            href: 'https://localhost.jambor.dev/users/admin',
            name: '@admin@localhost.jambor.dev',
          },
        ],
        replies: {
          id: 'https://techhub.social/users/crepels/statuses/109473290785654613/replies',
          type: 'Collection',
          first: {
            type: 'CollectionPage',
            next: 'https://techhub.social/users/crepels/statuses/109473290785654613/replies?only_other_accounts=true&page=true',
            partOf: 'https://techhub.social/users/crepels/statuses/109473290785654613/replies',
            items: [],
          },
        },
      },
    },
  },
  {
    timestamp: '2022-12-08T17:12:38Z',
    type: 'inbound',
    path: '/users/admin/inbox',
    data: {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://techhub.social/users/crepels#likes/263597',
      type: 'Like',
      actor: 'https://techhub.social/users/crepels',
      object: 'https://localhost.jambor.dev/users/admin/statuses/109461738015823934',
    },
  },
  {
    timestamp: '2022-12-08T17:12:38Z',
    type: 'inbound',
    path: '/users/admin/inbox',
    data: {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://techhub.social/users/crepels#likes/263597/undo',
      type: 'Undo',
      actor: 'https://techhub.social/users/crepels',
      object: {
        id: 'https://techhub.social/users/crepels#likes/263597',
        type: 'Like',
        actor: 'https://techhub.social/users/crepels',
        object: 'https://localhost.jambor.dev/users/admin/statuses/109461738015823934',
      },
    },
  },
];

const userRegex = /^https:\/\/([^/]+)\/users\/([^/]+)$/;

function userName(uri) {
  const match = uri.match(userRegex);

  if (match !== null) {
    return `${match[2]}@${match[1]}`;
  } else {
    return uri;
  }
}

function Type({ activity }) {
  switch (activity.type) {
    case 'Follow':
      return (
        <>
          <div className='font-bold'>Follow</div>
          <div className='object'>{activity.object}</div>
        </>
      );
    case 'Like':
      return (
        <>
          <div className='font-bold'>Like</div>
          <div className='object'>{activity.object}</div>
        </>
      );
    case 'Note':
      return (
        <>
          <div className='font-bold'>Note</div>
          <div className='object'>{activity.content}</div>
        </>
      );
    default:
      return <div className='font-bold'>{activity.type}</div>;
  }
}

function Activity({ activity, nested = false }) {
  if (!activity.type) {
    return null;
  }

  return (
    <div
      className={`p-0.5 rounded ${
        nested ? 'rounded bg-gray-300 border-0 border-l-4 border-l-blue-300 border-solid' : ''
      }`}
    >
      {activity.actor && <div className='italic mb-1'>From {userName(activity.actor)}</div>}
      <Type activity={activity} />
      {activity.object && <Activity activity={activity.object} nested />}
    </div>
  );
}

function Foo({ event }) {
  const [showSource, setShowSource] = useState(false);

  return (
    <div
      className={`bg-white text-black flex flex-col p-1 m-1 rounded rounded-tl-none w-4/5 ${
        event.type == 'inbound' ? 'bg-white' : 'bg-[#d9fdd3] self-end'
      }`}
    >
      <Activity activity={event.data} />
      <div className='flex flex-row items-center justify-between mt-8'>
        <div className='time'>{new Date(event.timestamp).toLocaleTimeString()}</div>
        <div className='text-gray-500 overflow-wrap: break-word'>Sent to {event.path}</div>
        <button
          className='border-0 p-0 bg-inherit text-blue-400 cursor-pointer'
          onClick={() => setShowSource(!showSource)}
        >
          {showSource ? 'hide' : 'show'} source
        </button>
      </div>
      {showSource && (
        <pre className='font-mono overflow-auto bg-gray-200'>
          {JSON.stringify(event.data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function ActivityPubVisualization() {
  return (
    <div className='activity-log flex flex-col'>
      {logs
        .filter((x) => x.type !== 'keep-alive')
        .map((x) => (
          <Foo event={x} />
        ))}
    </div>
  );
}
