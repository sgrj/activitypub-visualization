import React from 'react';

import './loading-indicator.css';

export default function LoadingIndictor() {
  return (
    <div className='loading-indicator-container'>
      <div className='loading-indicator'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
