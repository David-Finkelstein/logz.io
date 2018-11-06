import { createStore, combineReducers, applyMiddleware } from 'redux';
import allMiddleware from './middleware';
import allReducers from './reducers';

const middleware = applyMiddleware(...allMiddleware);
const reducer = combineReducers(allReducers);
const store = createStore(reducer, undefined, middleware);

export default store;
