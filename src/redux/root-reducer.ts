import { combineReducers, createStore, applyMiddleware, compose } from "redux";

import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from './actions';
import { userReducer } from './user-reducer';
import { uiReducer } from './ui-reducer';
import { dataReducer } from './data-reducer';

const middleware = [thunk as ThunkMiddleware<AppState, AppActions>];


const reducers = combineReducers({
     user: userReducer,
     ui: uiReducer,
     data: dataReducer
});

export type AppState = ReturnType<typeof reducers>;


// @ts-ignore: Unreachable code error
export default createStore(reducers, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
