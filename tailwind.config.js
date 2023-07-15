const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'mastodon-gray-1000': '#1f232b',
      'mastodon-gray-900': '#282c37',
      'mastodon-gray-800': '#393f4f',
      'mastodon-gray-700': '#444b5d',
      'mastodon-gray-600': '#606984',
      'mastodon-gray-500': '#9baec8',
      'mastodon-gray-400': '#c0cdd9',
      'mastodon-gray-300': '#d9e1e8',
      'mastodon-gray-200': '#e6ebf0',
      'mastodon-gray-100': '#eff3f5',
      'mastodon-blue': '#3a3bff',
      'mastodon-violet': '#8c8dff',
      'mastodon-primary': '#6364ff',
    },
  },
  plugins: [],
  darkMode: 'class',
};
