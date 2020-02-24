import { AppActions, LOADING_UI, SET_USER, CLEAR_ERRORS, SET_ERRORS, TOGGLE_AUTHENTICATION, toggleAuthentication, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONS_READ } from './actions';
import { Dispatch } from 'react';
import axios from 'axios';


export interface userCredentials {
     handle: string;
     imageUrl: string;
     createdAt: string;
     email: string;
     location: string;
     userId: string;
     website: string;
     bio: string;
}


export type Likes = Array<{
     postId: string;
     userHandle: string;
}>;
export interface User {
     credentials: userCredentials,
     likes: Likes
     notifications: NotificationsTypes
}

export type NotificationsTypes = Array<{
     createdAt: string;
     postId: string;
     read: boolean;
     recipient: string;
     sender: string;
     type: string;
     notificationId: string;
}>;


interface State extends User {
     loading: boolean;
     authenticated: boolean;
}



const initialState = {
     loading: false,
     authenticated: false,
     credentials: {
          handle: "",
          imageUrl: "",
          createdAt: "",
          email: "",
          location: "",
          userId: "",
          website: "",
          bio: "",
     },
     likes: [],
     notifications: []
}

export const userReducer = (state: State = initialState, action: AppActions) => {
     // return state;
     switch (action.type) {
          case TOGGLE_AUTHENTICATION:
               return {
                    ...state,
                    authenticated: action.payload
               }
          case SET_USER:
               return {
                    loading: false,
                    authenticated: true,
                    ...action.payload
               }
          case LOADING_USER:
               return {
                    ...state,
                    loading: true
               }
          case LIKE_POST:
               return {
                    ...state,
                    likes: [
                         ...state.likes,
                         {
                              userHandle: state.credentials.handle,
                              postId: action.payload.postId
                         }
                    ]
               }
          case UNLIKE_POST:
               return {
                    ...state,
                    likes: state.likes.filter(like => like.postId !== action.payload.postId)
               }
          case MARK_NOTIFICATIONS_READ:
               state.notifications.forEach((not) => (not.read = true));
               return {
                    ...state
               };
          default:
               return state;
     }
}
type AuthorizationData = {
     email: string,
     password: string,
     confirmPassword: string,
     handle: string
} | {
     email: string,
     password: string
}

const setAuthorization = (data: AuthorizationData, history: any, dispatch: Dispatch<AppActions>, route: string) => {
     dispatch({ type: LOADING_UI });
     axios.post(`/${route}`, data).then(res => {
          const UserIdToken = `Bearer ${res.data.token}`;
          localStorage.setItem("UserIdToken", UserIdToken);
          dispatch({ type: LOADING_UI });
          axios.defaults.headers.common["Authorization"] = UserIdToken;
          dispatch(getUserData());
          dispatch({ type: CLEAR_ERRORS });
          history.push("/");
     }).catch(err => {
          console.log(err);
          dispatch({ type: LOADING_UI });
          dispatch({ type: SET_ERRORS, payload: err.response.data });
     });
}


export const logOutUser = () => (dispatch: Dispatch<AppActions>) => {
     localStorage.removeItem("UserIdToken");
     delete axios.defaults.headers.common["Authorization"];
     dispatch(toggleAuthenticationAC(false));
};


export const loginUser = (userData: { email: string, password: string }, history: any) => (dispatch: Dispatch<AppActions>) => {
     setAuthorization(userData, history, dispatch, "login");
};


export const signUpUser = (newUserData: { email: string, password: string, confirmPassword: string, handle: string }, history: any) => (dispatch: Dispatch<AppActions>) => {
     setAuthorization(newUserData, history, dispatch, "signup");
}
export const getUserData: any = () => (dispatch: Dispatch<AppActions>) => {
     dispatch({ type: LOADING_USER });
     axios.get('/user').then(({ data }) => {
          dispatch({
               type: SET_USER,
               payload: data
          })
     }).catch(err => {
          console.log(`user-reducer getUserData action. Error:${err}`);
     })
}

export const toggleAuthenticationAC = (payload: boolean): toggleAuthentication => ({
     type: TOGGLE_AUTHENTICATION,
     payload
})
export const setPicture = (formData: FormData) => async (dispatch: Dispatch<AppActions>) => {
     dispatch({ type: LOADING_USER });
     try {
          const { data } = await axios.post("/user/image", formData);
          dispatch(getUserData());
     }
     catch (err) {
          console.log(`error in user-reducer, setPicture function error:${err}`);
     }
}

export interface EditDetails {
     bio: string;
     website: string;
     location: string
}

// TODO fix error while posting empty 
export const editDetails = (details: EditDetails) => async (dispatch: Dispatch<AppActions>) => {
     console.log(details);
     dispatch({ type: LOADING_USER });
     try {
          const { data } = await axios.post("/user", details);
          dispatch(getUserData());
     } catch (err) {
          console.log(`user-reducer editDetails Error:${err}`);
          console.log(`response:${err.response.data}`);
     }
}

export const markNotificationsRead = (notificationsIds: Array<string>) => async (dispatch: Dispatch<AppActions>) => {
     try {
          await axios.post("/notifications", notificationsIds);
          dispatch({ type: MARK_NOTIFICATIONS_READ })
     }
     catch (err) {
          console.log(err);
     }
}