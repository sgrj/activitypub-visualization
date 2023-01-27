import React from 'react';

import './loading-indicator.css';

export default function LoadingIndictor() {
  return (
    <div className='activitypub-loading-indicator-container'>
      <div className='activitypub-loading-indicator'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
