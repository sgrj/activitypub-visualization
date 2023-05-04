import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '../input.css';
import '../font.css';

import Root from './root';
import Log from './log';
import Explorer from './explorer';
import Colors from './colors';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);
document.querySelector('body').style.margin = '0';

elt.style.height = '100%';
document.querySelector('body').style.height = '100%';
document.querySelector('html').style.height = '100%';

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
