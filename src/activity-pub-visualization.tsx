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
      className={`my-2 p-0.5 ${
        nested
          ? 'my-0 bg-gray-200 border-0 border-l-4 border-l-[#6364ff] border-solid'
          : 'border border-solid border-gray-200 p-1'
      }`}
    >
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
        event.type == 'inbound' ? 'bg-white' : 'bg-white self-end'
      }`}
    >
      {event.data.actor && <div className='italic'>From {event.data.actor}</div>}
      <div className='italic overflow-wrap: break-word'>Sent to {event.path}</div>
      <Activity activity={event.data} />
      <div className='flex flex-row items-center justify-between'>
        <div className='time'>{new Date(event.timestamp).toLocaleTimeString()}</div>
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
