import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './containers/App';
// TODO: Change registerServiceWorker to reportWebVitals
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// TODO: Change registerServiceWorker to reportWebVitals
registerServiceWorker();
