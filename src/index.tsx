import React from 'react';
import ReactDOM from 'react-dom';

import './input.css';

const elt = document.createElement('div');
document.querySelector('body').appendChild(elt);

ReactDOM.render(<h1 className='text-3xl font-bold underline'>Hello World!</h1>, elt);
