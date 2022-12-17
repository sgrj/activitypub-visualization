import React, { useState } from 'react';

import './input.css';

const userRegex = /^https:\/\/([^/]+)\/users\/([^/]+)$/;

function userName(uri) {
  const match = uri.match(userRegex);

  if (match !== null) {
    return `${match[2]}@${match[1]}`;
  } else {
    return uri;
  }
}

function ActivityDetails({ activity }) {
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
      <ActivityDetails activity={activity} />
      {activity.object && <Activity activity={activity.object} nested />}
    </div>
  );
}

function LogEvent({ event }) {
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

export default function ActivityPubVisualization({ logs }) {
  return (
    <div className='activity-log flex flex-col'>
      {logs
        .filter((x) => x.type !== 'keep-alive')
        .map((x) => (
          <LogEvent event={x} />
        ))}
    </div>
  );
}
