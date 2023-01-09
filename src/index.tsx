import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import ActivityPubVisualization from './activitypub-visualization';

import './input.css';

import type { ILogEvent } from './types';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);

import logs from './logs.json';

document.querySelector('body').style.margin = '0';

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
      <ActivityPubVisualization logs={logs as Array<ILogEvent>} />
    </div>
  );
}

ReactDOM.render(<Container />, elt);
