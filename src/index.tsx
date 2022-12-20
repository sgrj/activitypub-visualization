import React from 'react';
import ReactDOM from 'react-dom';

import ActivityPubVisualization from './activity-pub-visualization';

import './input.css';

import type { ILogEvent } from './types';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);

import logs from './logs.json';

document.querySelector('body').style.margin = '0';

ReactDOM.render(
  <div className='bg-black dark'>
    <ActivityPubVisualization logs={logs as Array<ILogEvent>} />
  </div>,
  elt
);
