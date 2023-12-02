import React from 'react';
import { createRoot } from 'react-dom/client';
// TODO: Move redux to store module
import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
// TODO: Move redux to store module
import thunk from 'redux-thunk';
import App from './containers/App';
// TODO: Change registerServiceWorker to reportWebVitals
import registerServiceWorker from './registerServiceWorker';
// TODO: Move redux to store module
import * as reducers from './store/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk),
);

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

registerServiceWorker();
