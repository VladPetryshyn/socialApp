import { AppActions, LOADING_UI, CLEAR_ERRORS, SET_ERRORS, clearErrors as ClearErrors, SET_POST, stopLoading as StopLoading, UI_STOP_LOADING } from './actions';

interface State {
     loading: boolean;
     errors: Errors
}

export type Errors = {
     email?: string;
     password?: string;
     handle?: string;
     confirmPassword?: string;
     general?: string;
     body?: string;
     comment?: string;
} | null;


const initialState = {
     loading: false,
     errors: {}
}

export type UiState = State;

export const uiReducer = (state: State = initialState, action: AppActions) => {
     switch (action.type) {
          case SET_ERRORS:
               return {
                    loading: false,
                    errors: { ...action.payload.errors }
               }
          case CLEAR_ERRORS:
               return {
                    ...state,
                    loading: false,
                    errors: {}
               }
          case LOADING_UI:
               return {
                    ...state,
                    loading: !state.loading
               }
          case UI_STOP_LOADING:
               return {
                    ...state,
                    loading: false
               }
          default:
               return state;
     }
}

export const clearErrors = (): ClearErrors => ({
     type: CLEAR_ERRORS
})
export const stopLoading = (): StopLoading => ({
     type: UI_STOP_LOADING
});