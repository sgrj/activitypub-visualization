import React from 'react';

import './loading-indicator.css';

export default function LoadingIndictor({
  small = false,
  colorDefinition,
}: {
  small?: boolean;
  colorDefinition?: string;
}) {
  const colorClass = colorDefinition ? `bg-${colorDefinition}` : 'bg-slate-600 dark:bg-slate-400';
  return (
    <div className='activitypub-loading-indicator-container'>
      <div className={`activitypub-loading-indicator ${small && 'small'}`}>
        <div className={colorClass}></div>
        <div className={colorClass}></div>
        <div className={colorClass}></div>
        <div className={colorClass}></div>
      </div>
    </div>
  );
}
