import React from 'react';
import ReactDOM from 'react-dom';

import ActivityPubVisualization from './activity-pub-visualization';

import './input.css';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);

ReactDOM.render(
  <div className='bg-black'>
    <ActivityPubVisualization />
  </div>,
  elt
);
