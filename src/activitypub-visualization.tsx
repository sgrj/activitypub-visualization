import React, { useState } from 'react';

import JsonViewer from './json-viewer';

import './input.css';

import type { ILogEvent, IActivity } from './types';

function ActivityDetails({ activity }: { activity: IActivity }) {
  const internal = () => {
    switch (activity.type) {
      case 'Follow':
      case 'Like':
        return <div className='object overflow-auto'>{activity.object}</div>;
      case 'Note':
        return <div className='object font-mono overflow-auto'>{activity.content}</div>;
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
      className={`overflow-hidden ${
        nested
          ? 'my-0 p-0.5 bg-light-dark-mastodon-light-gray dark:bg-dark-mastodon-light-gray border-0 border-l-4 border-l-mastodon-primary border-solid'
          : 'my-2 p-1 border border-solid border-light-mastodon-light-gray dark:border-dark-mastodon-light-gray'
      }`}
    >
      <ActivityDetails activity={activity} />
      {activity.object != null && typeof activity.object !== 'string' && (
        <Activity activity={activity.object} nested />
      )}
    </div>
  );
}

function LogEvent({
  event,
  showExplorerLink = false,
  onExplorerLinkClick,
}: {
  event: ILogEvent;
  showExplorerLink?: boolean;
  onExplorerLinkClick?: (json: any) => void;
}) {
  const [showSource, setShowSource] = useState(false);

  return (
    <div
      className={`bg-white text-black dark:bg-dark-mastodon-dark-gray dark:text-white flex flex-col p-1 m-1 rounded rounded-tl-none w-4/5 ${
        event.type == 'inbound' ? 'bg-white' : 'bg-white self-end'
      }`}
    >
      {event.data.actor && (
        <div>
          <span className='italic dark:text-gray-400 text-gray-600'>From</span>
          <span className='dark:text-gray-200 text-gray-800'> {event.data.actor}</span>
        </div>
      )}
      <div>
        <span className='italic dark:text-gray-400 text-gray-600'>Sent to</span>
        <span className='dark:text-gray-200 text-gray-800'> {event.path}</span>
      </div>
      <Activity activity={event.data} />
      <div className='flex flex-row items-start justify-between'>
        <div className='text-gray-600 dark:text-gray-400'>
          {new Date(event.timestamp).toLocaleTimeString()}
        </div>
        <div className='flex flex-col items-end'>
          <button
            className='border-0 p-0 bg-inherit underline hover:no-underline text-dark-mastodon-gray cursor-pointer'
            onClick={() => setShowSource(!showSource)}
          >
            {showSource ? 'hide' : 'show'} source
          </button>
          {showSource && showExplorerLink && (
            <a
              className='border-0 p-0 bg-inherit underline hover:no-underline text-dark-mastodon-gray cursor-pointer'
              onClick={() => onExplorerLinkClick(event.data)}
            >
              open in explorer
            </a>
          )}
        </div>
      </div>
      {showSource && (
        <div className='overflow-auto'>
          <JsonViewer json={event.data} clickableLinks={false} />
        </div>
      )}
    </div>
  );
}

export default function ActivityPubVisualization({
  logs,
  showExplorerLink = false,
  onExplorerLinkClick,
}: {
  logs: Array<ILogEvent>;
  showExplorerLink?: boolean;
  onExplorerLinkClick?: (json: any) => void;
}) {
  return (
    <div className='flex flex-col'>
      {logs
        .filter((event) => event.type !== 'keep-alive')
        .map((event) => (
          <LogEvent
            key={event.data.id}
            event={event}
            showExplorerLink={showExplorerLink}
            onExplorerLinkClick={onExplorerLinkClick}
          />
        ))}
    </div>
  );
}
