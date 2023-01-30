import React from 'react';

function Color({ color, alt }: { color: string; alt: string }) {
  return (
    <div className='flex items-center p-0'>
      <div className={`bg-${color} w-12 h-6`} />
      <div className='pl-2'>{color}</div>
      <div className='pl-2'>{alt}</div>
    </div>
  );
}

export default function Colors() {
  return (
    <div className='bg-white'>
      <Color color='mastodon-gray-1000' alt='mastodon-gray-1000' />
      <Color color='mastodon-gray-900' alt='mastodon-gray-900' />
      <Color color='mastodon-gray-800' alt='mastodon-gray-800' />
      <Color color='mastodon-gray-700' alt='mastodon-gray-700' />
      <Color color='mastodon-gray-600' alt='mastodon-gray-600' />
      <Color color='mastodon-gray-500' alt='mastodon-gray-500' />
      <Color color='mastodon-gray-400' alt='mastodon-gray-400' />
      <Color color='mastodon-gray-300' alt='mastodon-gray-300' />
      <Color color='mastodon-gray-200' alt='mastodon-gray-200' />
      <Color color='mastodon-gray-100' alt='mastodon-gray-100' />
      <Color color='mastodon-primary' alt='' />

      <div className='bg-mastodon-gray-600' />
      <div className='bg-mastodon-gray-900' />
      <div className='bg-mastodon-gray-800' />
      <div className='bg-mastodon-gray-400' />
      <div className='bg-mastodon-primary' />
      <div className='bg-mastodon-gray-100' />
      <div className='bg-mastodon-gray-1000' />
      <div className='bg-mastodon-gray-700' />
      <div className='bg-mastodon-gray-500' />
      <div className='bg-mastodon-gray-300' />
      <div className='bg-mastodon-gray-200' />
    </div>
  );
}
