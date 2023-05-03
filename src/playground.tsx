import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { ActivityPubExplorer, ActivityPubVisualization } from './index';

import Colors from './colors';

import './input.css';
import './font.css';

import type { ILogEvent } from './types';

// import logs from './logs.json';
// import logs from './question-with-votes.json';
// import logs from './announce.json';
// import logs from './update-person.json';
// import logs from './move.json';
import logs from './create-update-delete.json';
import userEntity from './user-entity.json';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);
document.querySelector('body').style.margin = '0';

function Container() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`h-full font-[Roboto] text-[13px] ${
        darkMode ? 'bg-[#191b22] dark' : 'bg-mastodon-gray-100'
      }`}
    >
      <div
        onClick={() => setDarkMode(!darkMode)}
        className={`${darkMode ? 'text-white' : 'text-black'} cursor-pointer`}
      >
        Switch to {darkMode ? 'light' : 'dark'} mode
      </div>

      {
        // <ActivityPubVisualization
        //   logs={logs as Array<ILogEvent>}
        //   showExplorerLink={true}
        //   onExplorerLinkClick={(data) => console.log(data)}
        // />
      }
      {
        // <ActivityPubExplorer
        //   fetchMethod={async (url) =>
        //     fetch('http://localhost:3000/api/v1/json_ld?' + new URLSearchParams({ url }).toString())
        //   }
        //   initialActivityJson={userEntity}
        // />
      }
      {
        // <Colors />
      }
      {
        <ActivityPubExplorer
          fetchMethod={async (url) =>
            fetch('http://localhost:3000/api/v1/json_ld?' + new URLSearchParams({ url }).toString())
          }
        />
      }
    </div>
  );
}

ReactDOM.render(<Container />, elt);
