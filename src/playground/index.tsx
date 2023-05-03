import React from 'react';
import ReactDOM from 'react-dom';

import { ActivityPubExplorer } from '../index';

import Colors from './colors';

import '../input.css';
import '../font.css';

import userEntity from './user-entity.json';

import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Root from './root';

import Log from './log';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);
document.querySelector('body').style.margin = '0';

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
