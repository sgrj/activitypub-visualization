import React from 'react';

function Color({ color }: { color: string }) {
  return (
    <div className='flex items-center p-0'>
      <div className={`bg-${color} w-12 h-6`} />
      <div className='pl-2'>{color}</div>
    </div>
  );
}

export default function Colors() {
  return (
    <div className='bg-white h-full'>
      <Color color='mastodon-gray-1000' />
      <Color color='mastodon-gray-900' />
      <Color color='mastodon-gray-800' />
      <Color color='mastodon-gray-700' />
      <Color color='mastodon-gray-600' />
      <Color color='mastodon-gray-500' />
      <Color color='mastodon-gray-400' />
      <Color color='mastodon-gray-300' />
      <Color color='mastodon-gray-200' />
      <Color color='mastodon-gray-100' />
      <Color color='mastodon-primary' />
    </div>
  );
}
