import React, { useState } from 'react';

import './input.css';

import type { ILogEvent, IActivity } from './types';

const userRegex = /^https:\/\/([^/]+)\/users\/([^/]+)$/;

function userName(uri: string) {
  const match = uri.match(userRegex);

  if (match !== null) {
    return `${match[2]}@${match[1]}`;
  } else {
    return uri;
  }
}

function ActivityDetails({ activity }: { activity: IActivity }) {
  const internal = () => {
    switch (activity.type) {
      case 'Follow':
      case 'Like':
        return <div className='object'>{activity.object}</div>;
      case 'Note':
        return <div className='object'>{activity.content}</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='font-bold'>{activity.type}</div>
      {internal()}
    </div>
  );
}

function Activity({ activity, nested = false }: { activity: IActivity; nested?: boolean }) {
  if (!activity.type) {
    return null;
  }

  return (
    <div
      className={`p-0.5 rounded ${
        nested ? 'ml-1 rounded bg-gray-300 border-0 border-l-4 border-l-blue-300 border-solid' : ''
      }`}
    >
      {activity.actor && <div className='italic mb-1'>From {activity.actor}</div>}
      <ActivityDetails activity={activity} />
      {activity.object != null && typeof activity.object !== 'string' && (
        <Activity activity={activity.object} nested />
      )}
    </div>
  );
}

function LogEvent({ event }: { event: ILogEvent }) {
  const [showSource, setShowSource] = useState(false);

  return (
    <div
      className={`bg-white text-black flex flex-col p-1 m-1 rounded rounded-tl-none w-4/5 ${
        event.type == 'inbound' ? 'bg-white' : 'bg-[#d9fdd3] self-end'
      }`}
    >
      <Activity activity={event.data} />
      <div className='flex flex-row items-center justify-between mt-4'>
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

export default function ActivityPubVisualization({ logs }: { logs: Array<ILogEvent> }) {
  return (
    <div className='font-[sans-serif] text-[13px] flex flex-col'>
      {logs
        .filter((event) => event.type !== 'keep-alive')
        .map((event) => (
          <LogEvent key={event.data.id} event={event} />
        ))}
    </div>
  );
}
