import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { MyReducer } from "./reducer";
import { watchFetchData, watchFetchDetail } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(MyReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchFetchData);
sagaMiddleware.run(watchFetchDetail);