import React from 'react';
// import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';

import App from './components/app/app';
import MarvelService from './services/marvel-service';
import './style/style.scss';

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

