import React, { useState } from 'react';

import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`h-full flex font-[Roboto] text-[13px] ${
        darkMode ? 'bg-[#191b22] dark' : 'bg-mastodon-gray-100'
      }`}
    >
      <div id='sidebar' className={`w-80 ${darkMode ? 'text-white' : 'text-black'}`}>
        <nav className='p-1'>
          <div onClick={() => setDarkMode(!darkMode)} className='cursor-pointer'>
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
            ].map((logName) => (
              <div key={logName} className='py-0.5'>
                <Link
                  className='text-blue-600 hover:text-blue-800 visited:text-blue-600'
                  to={`/log/${logName}`}
                >
                  {logName}
                </Link>
              </div>
            ))}
          </div>
          <div className='py-2 font-medium text-base'>ActivityPub Explorer</div>
          <div className='px-2'>
            {['empty', 'initial-data'].map((data) => (
              <div key={data} className='py-0.5'>
                <Link
                  className='text-blue-600 hover:text-blue-800 visited:text-blue-600'
                  to={`/explorer/${data}`}
                >
                  {data}
                </Link>
              </div>
            ))}
          </div>
          <div className='py-2'>
            <Link className='text-blue-600 hover:text-blue-800 visited:text-blue-600' to='/colors'>
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
