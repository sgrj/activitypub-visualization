import React, { useState } from 'react';

import DOMPurify from 'dompurify';

import JsonViewer from './json-viewer';

import './input.css';

import type { ILogEvent, IActivity } from './types';

function ActivityDetails({ activity }: { activity: IActivity }) {
  const internal = () => {
    switch (activity.type) {
      case 'Follow':
      case 'Like':
      case 'Dislike':
      case 'Block':
      case 'Announce':
      case 'Lock':
        return (
          typeof activity.object === 'string' && (
            <div className='object overflow-auto'>{activity.object}</div>
          )
        );
      case 'Note':
      case 'Question':
      case 'Page':
        return (
          <div
            className='object font-mono overflow-auto [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>p]:my-4 [&_a]:dark:text-mastodon-violet [&_a]:text-mastodon-blue [&_a]:no-underline'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(activity.name || activity.content, {
                ALLOWED_TAGS: ['p', 'a', 'br'],
              }),
            }}
          />
        );
      case 'Person':
        return <div className='object overflow-auto'>{activity.id}</div>;
      case 'Move':
        return (
          <div className='object overflow-auto'>
            <div>{activity.object}</div>
            <div className='italic'>to</div>
            <div>{activity.target}</div>
          </div>
        );
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
          ? 'my-0 p-0.5 bg-mastodon-gray-200 dark:bg-mastodon-gray-800 border-0 border-l-4 border-l-mastodon-primary border-solid'
          : 'my-2 p-1 border border-solid border-mastodon-gray-400 dark:border-mastodon-gray-800'
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
  clickableLinks = false,
  onLinkClick,
  showExplorerLink = false,
  onExplorerLinkClick,
  showWorkshopLink = false,
  onWorkshopLinkClick,
}: {
  event: ILogEvent;
  clickableLinks?: boolean;
  onLinkClick?: (url: string) => void;
  showExplorerLink?: boolean;
  onExplorerLinkClick?: (json: IActivity) => void;
  showWorkshopLink?: boolean;
  onWorkshopLinkClick?: (json: ILogEvent) => void;
}) {
  const [showSource, setShowSource] = useState(false);

  return (
    <div className={`w-4/5 ${event.type == 'inbound' ? '' : 'self-end'}`}>
      <div
        className={`bg-white text-black dark:bg-mastodon-gray-900 dark:text-white flex flex-col p-1 m-1 rounded rounded-tl-none  ${
          event.failure && 'border-red-600 dark:border-red-500 border-solid border'
        }`}
      >
        {event.data.actor && (
          <div>
            <span className='italic dark:text-gray-400 text-gray-600'>From</span>
            <span className='dark:text-gray-200 text-gray-800'> {event.sender}</span>
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
              className='border-0 p-0 bg-inherit underline hover:no-underline text-mastodon-gray-600 cursor-pointer'
              onClick={() => setShowSource(!showSource)}
            >
              {showSource ? 'hide' : 'show'} source
            </button>
            {showSource && showExplorerLink && (
              <a
                className='border-0 p-0 bg-inherit underline hover:no-underline text-mastodon-gray-600 cursor-pointer'
                onClick={() => onExplorerLinkClick(event.data)}
              >
                open in explorer
              </a>
            )}
            {showSource && showWorkshopLink && (
              <a
                className='border-0 p-0 bg-inherit underline hover:no-underline text-mastodon-gray-600 cursor-pointer'
                onClick={() => onWorkshopLinkClick(event)}
              >
                open in workshop
              </a>
            )}
          </div>
        </div>
        {showSource && (
          <JsonViewer json={event.data} clickableLinks={clickableLinks} onLinkClick={onLinkClick} />
        )}
      </div>
      {event.failure && (
        <div className='pl-1'>
          <span className='dark:text-red-500 text-red-600'>Sending failed</span>
          <span className='dark:text-gray-400 text-gray-600'> ({event.failure})</span>
        </div>
      )}
    </div>
  );
}

export default function ActivityPubVisualization({
  logs,
  clickableLinks = false,
  onLinkClick,
  showExplorerLink = false,
  onExplorerLinkClick,
  showWorkshopLink = false,
  onWorkshopLinkClick,
}: {
  logs: Array<ILogEvent>;
  clickableLinks?: boolean;
  onLinkClick?: (url: string) => void;
  showExplorerLink?: boolean;
  onExplorerLinkClick?: (json: IActivity) => void;
  showWorkshopLink?: boolean;
  onWorkshopLinkClick?: (json: ILogEvent) => void;
}) {
  return (
    <div className='flex flex-col'>
      {logs
        .filter((event) => event.type !== 'keep-alive')
        .map((event, i) => (
          <LogEvent
            key={i + event.data.id}
            event={event}
            clickableLinks={clickableLinks}
            onLinkClick={onLinkClick}
            showExplorerLink={showExplorerLink}
            onExplorerLinkClick={onExplorerLinkClick}
            showWorkshopLink={showWorkshopLink}
            onWorkshopLinkClick={onWorkshopLinkClick}
          />
        ))}
    </div>
  );
}
