import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
