import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { ActivityPubVisualization } from './index';

import './input.css';
import './font.css';

import type { ILogEvent } from './types';

declare global {
  interface Window {
    showActivityLog: any;
  }
}

export function showActivityLog(logs: Array<ILogEvent>, elt: any) {
  function Container() {
    return (
      <div className='h-full font-[Roboto] text-[13px] bg-mastodon-gray-100 dark:bg-[#191b22] leading-[normal]'>
        <ActivityPubVisualization logs={logs} />
      </div>
    );
  }

  ReactDOM.render(<Container />, elt);
}
