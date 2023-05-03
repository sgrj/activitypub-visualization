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
      <div id='sidebar'>
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`${darkMode ? 'text-white' : 'text-black'} cursor-pointer`}
        >
          Switch to {darkMode ? 'light' : 'dark'} mode
        </div>
        <nav>
          Activity Log
          <ul>
            <li>
              <Link to='/log/follow-create-like'>follow-create-like</Link>
            </li>
            <li>
              <Link to='/log/create-update-delete'>create-update-delete</Link>
            </li>
            <li>
              <Link to='/log/update-person'>update-person</Link>
            </li>
            <li>
              <Link to='/log/move'>move</Link>
            </li>
            <li>
              <Link to='/log/question-with-votes'>question-with-votes</Link>
            </li>
            <li>
              <Link to='/log/announce'>announce</Link>
            </li>
          </ul>
          ActivityPub Explorer
          <ul>
            <li>
              <Link to='/explorer/empty'>empty state</Link>
            </li>
            <li>
              <Link to='/explorer/initial-data'>with initial data</Link>
            </li>
          </ul>
          <Link to='/colors'>Tailwind colors</Link>
        </nav>
      </div>
      <div id='detail' className='w-full max-w-[1000px]'>
        <Outlet />
      </div>
    </div>
  );
}
