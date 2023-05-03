import React from 'react';
import ReactDOM from 'react-dom';

import ActivityPubVisualization from './activitypub-visualization';

import './input.css';
import './font.css';

import type { ILogEvent } from './types';

export function showActivityLog(logs: Array<ILogEvent>, elt: HTMLElement) {
  function Container() {
    return (
      <div className='h-full font-[Roboto] text-[13px] bg-mastodon-gray-100 dark:bg-[#191b22] leading-[normal]'>
        <ActivityPubVisualization logs={logs} />
      </div>
    );
  }

  ReactDOM.render(<Container />, elt);
}
