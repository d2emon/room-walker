import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import * as reducers from './store/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk),
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

registerServiceWorker();
