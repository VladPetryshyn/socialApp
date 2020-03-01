import { AppActions } from '../redux/actions';
import { Dispatch } from 'react';
import { AppState } from '../redux/root-reducer';
import { ThunkAction } from 'redux-thunk';


export type DispatchType = Dispatch<AppActions>

export type GetStateType = () => AppState

export type ThunkType<Return> = ThunkAction<Return, AppState, unknown, AppActions>