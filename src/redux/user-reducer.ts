import { AppActions, LOADING_UI, SET_USER, CLEAR_ERRORS, SET_ERRORS, TOGGLE_AUTHENTICATION, toggleAuthentication, LOADING_USER, LIKE_POST, UNLIKE_POST, MARK_NOTIFICATIONS_READ, UNLIKE_COMMENT, LIKE_COMMENT } from './actions';
import { Dispatch } from 'react';
import axios from 'axios';
import { ThunkType } from '../types/types';


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
export type commentLikes = Array<{
     commentId: string;
     userHandle: string
}>
export interface User {
     credentials: userCredentials,
     likes: Likes
     notifications: NotificationsTypes
     commentLikes: commentLikes
}

export type NotificationsTypes = Array<{
     createdAt: string;
     postId: string;
     read: boolean;
     recipient: string;
     sender: string;
     type: string;
     notificationId: string;
     postOwner: string
}>;


interface State extends User {
     loading: boolean;
     authenticated: boolean;
}



const initialState: State = {
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
     notifications: [],
     commentLikes: []
}

export const userReducer = (state: State = initialState, action: AppActions): State => {
     switch (action.type) {
          case TOGGLE_AUTHENTICATION:
               return {
                    ...state,
                    authenticated: action.payload
               }
          case SET_USER:
               console.log(action.payload.notifications);
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
          case LIKE_COMMENT:
               return {
                    ...state,
                    commentLikes: [
                         ...state.commentLikes,
                         {
                              userHandle: state.credentials.handle,
                              commentId: action.payload.commentId
                         }
                    ]
               }
          case UNLIKE_COMMENT:
               return {
                    ...state,
                    commentLikes: state.commentLikes.filter(like => like.commentId !== action.payload.commentId)
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
          dispatch(getUserData() as any);
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
export const getUserData = (): ThunkType<void> => (dispatch) => {
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
export const setPicture = (formData: FormData): ThunkType<Promise<void>> => async (dispatch) => {
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

export const editDetails = (details: EditDetails): ThunkType<Promise<void>> => async (dispatch) => {
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

export const markNotificationsRead = (notificationsIds: Array<string>): ThunkType<Promise<void>> => async (dispatch: Dispatch<AppActions>) => {
     try {
          await axios.post("/notifications", notificationsIds);
          dispatch({ type: MARK_NOTIFICATIONS_READ })
     }
     catch (err) {
          console.log(err);
     }
}