const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts,tsx,js,jsx}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'dark-mastodon-gray': '#606984',
      'dark-mastodon-dark-gray': '#282c37',
      'dark-mastodon-light-gray': '#393f4f',
      'light-mastodon-light-gray': '#c0cdd9',
      'mastodon-primary': '#6364ff',
    },
  },
  plugins: [],
  darkMode: 'class',
};
