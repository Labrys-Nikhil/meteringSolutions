// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import { Provider } from 'react-redux';
// import {store} from './store/Store' // Ensure correct import path

// createRoot(document.getElementById('root')).render(
//     <Provider store={store}>
//         <App />
//     </Provider>
// );


import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import Store from './redux/store/Store'; // Ensure correct file name and path

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <App />
    </Provider>
);
