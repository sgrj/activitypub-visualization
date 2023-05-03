import React from 'react';
import ReactDOM from 'react-dom';

import { ActivityPubExplorer, ActivityPubVisualization } from './index';

import Colors from './colors';

import './input.css';
import './font.css';

import type { ILogEvent } from './types';

import logsFollowCreateLike from './logs.json';
import logsQuestionWithVotes from './question-with-votes.json';
import logsAnnounce from './announce.json';
import logsUpdatePerson from './update-person.json';
import logsMove from './move.json';
import logsCreateUpdateDelete from './create-update-delete.json';
import userEntity from './user-entity.json';

import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Root from './root';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);
document.querySelector('body').style.margin = '0';

function Log() {
  const { logName } = useParams();

  const logs = () => {
    if (logName == 'create-update-delete') {
      return logsCreateUpdateDelete;
    } else if (logName == 'move') {
      return logsMove;
    } else if (logName == 'update-person') {
      return logsUpdatePerson;
    } else if (logName == 'follow-create-like') {
      return logsFollowCreateLike;
    } else if (logName == 'question-with-votes') {
      return logsQuestionWithVotes;
    } else if (logName == 'announce') {
      return logsAnnounce;
    } else {
      return [];
    }
  };

  return (
    <ActivityPubVisualization
      logs={logs() as Array<ILogEvent>}
      showExplorerLink={true}
      onExplorerLinkClick={(data) => console.log(data)}
    />
  );
}

function Explorer() {
  const { data } = useParams();

  const initialActivityJson = () => {
    if (data == 'initial-data') {
      return userEntity;
    } else {
      return null;
    }
  };

  return (
    <ActivityPubExplorer
      fetchMethod={async (url) =>
        fetch('http://localhost:3000/api/v1/json_ld?' + new URLSearchParams({ url }).toString())
      }
      initialActivityJson={initialActivityJson()}
    />
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'log/:logName',
        element: <Log />,
      },
      {
        path: 'explorer/:data',
        element: <Explorer />,
      },
      {
        path: 'colors',
        element: <Colors />,
      },
    ],
  },
]);

ReactDOM.render(<RouterProvider router={router} />, elt);
