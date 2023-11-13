import React from 'react';

import { Outlet, Link, useSearchParams } from 'react-router-dom';

export default function Root() {
  const [searchParams, setSearchParams] = useSearchParams();

  const darkMode = searchParams.get('dark-mode') == 'true';

  const linkStyle =
    'text-blue-500 hover:text-blue-800 dark:hover:text-blue-300 visited:text-blue-500';

  return (
    <div
      className={`h-full flex font-[Roboto] text-[13px] ${
        darkMode ? 'bg-[#191b22] dark' : 'bg-mastodon-gray-100'
      }`}
    >
      <div id='sidebar' className={`w-80 min-w-[20rem] ${darkMode ? 'text-white' : 'text-black'}`}>
        <nav className='p-1'>
          <div
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('dark-mode', (!darkMode).toString());
              setSearchParams(newSearchParams);
            }}
            className='cursor-pointer'
          >
            Switch to {darkMode ? 'light' : 'dark'} mode
          </div>
          <div className='py-2 font-medium text-base'>Activity Log</div>
          <div className='px-2'>
            {[
              'follow-create-like',
              'create-update-delete',
              'update-person',
              'move',
              'question-with-votes',
              'announce',
              'lemmy-announce',
              'lemmy-create',
              'dislike',
              'lock',
              'create-page',
              'create-with-html',
              'failed-follow',
            ].map((logName) => (
              <div key={logName} className='py-0.5'>
                <Link className={linkStyle} to={`/log/${logName}?${searchParams.toString()}`}>
                  {logName}
                </Link>
              </div>
            ))}
          </div>
          <div className='py-2 font-medium text-base'>ActivityPub Explorer</div>
          <div className='px-2'>
            {['empty', 'initial-data'].map((data) => (
              <div key={data} className='py-0.5'>
                <Link className={linkStyle} to={`/explorer/${data}?${searchParams.toString()}`}>
                  {data}
                </Link>
              </div>
            ))}
          </div>
          <div className='py-2 font-medium text-base'>Activity Workshop</div>
          <div className='px-2'>
            {['empty', 'initial-data'].map((data) => (
              <div key={data} className='py-0.5'>
                <Link className={linkStyle} to={`/workshop/${data}?${searchParams.toString()}`}>
                  {data}
                </Link>
              </div>
            ))}
          </div>
          <div className='py-2 font-medium text-base'>WebFinger Forge</div>
          <div className='px-2'>
            {['success', 'failing-save', 'failing-load'].map((data) => (
              <div key={data} className='py-0.5'>
                <Link className={linkStyle} to={`/webfinger/${data}?${searchParams.toString()}`}>
                  {data}
                </Link>
              </div>
            ))}
          </div>
          <div className='py-2'>
            <Link className={linkStyle} to={`/colors?${searchParams.toString()}`}>
              Tailwind colors
            </Link>
          </div>
        </nav>
      </div>
      <div id='detail' className='w-full max-w-[1000px]'>
        <Outlet />
      </div>
    </div>
  );
}
