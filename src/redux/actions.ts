import { unlikePost, Post, Comment } from './data-reducer';
import { Errors } from './ui-reducer';
import { NotificationsTypes, commentLikes } from './user-reducer';
//! User

export const TOGGLE_AUTHENTICATION = "TOGGLE_AUTHENTICATION";
export const SET_USER = "SET_USER";
export const LOADING_USER = "LOADING_USER";

export const MARK_NOTIFICATIONS_READ = "MARK_NOTIFICATIONS_READ";

export interface toggleAuthentication {
     type: typeof TOGGLE_AUTHENTICATION
     payload: boolean;
}

export interface setUser {
     type: typeof SET_USER;
     payload: {
          credentials: {
               handle: string;
               imageUrl: string;
               createdAt: string;
               email: string;
               location: string;
               userId: string;
               website: string;
               bio: string;
          },
          likes: Array<{
               postId: string;
               userHandle: string;
          }>;
          commentLikes: commentLikes
          notifications: NotificationsTypes
     }
}

export interface markNotificationsRead {
     type: typeof MARK_NOTIFICATIONS_READ;
}

interface loadingUser {
     type: typeof LOADING_USER;
}

export type UserActions = toggleAuthentication | setUser | loadingUser | markNotificationsRead;

//! UI 
export const UI_STOP_LOADING = "UI_STOP_LOADING";

export const SET_ERRORS = "SET_ERRORS";
export const LOADING_UI = "LOADING_UI";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export interface loadingUi {
     type: typeof LOADING_UI;
}
export interface clearErrors {
     type: typeof CLEAR_ERRORS;
}
export interface setErrors {
     type: typeof SET_ERRORS;
     payload: {
          errors: Errors
     }
}
export interface stopLoading {
     type: typeof UI_STOP_LOADING;
}

export type uiActions = loadingUi | clearErrors | setErrors | stopLoading;
// ! Data 

export const LOADING_DATA = "LOADING_DATA";

export const SET_POSTS = "SET_POSTS";

export const SET_POST = "SET_POST";

export const LIKE_POST = "LIKE_POST";

export const UNLIKE_POST = "UNLIKE_POST";

export const DELETE_POST = "DELETE_POST";

export const ADD_POST = "ADD_POST";

export const SUBMIT_COMMENT = "SUBMIT_COMMENT";

export const LIKE_COMMENT = "LIKE_COMMENT";

export const UNLIKE_COMMENT = "UNLIKE_COMMENT";

export interface loadData {
     type: typeof LOADING_DATA
}
export interface setPosts {
     type: typeof SET_POSTS;
     payload: Array<Post>
}

export interface likePost {
     type: typeof LIKE_POST,
     payload: Post
}

export interface addPost {
     type: typeof ADD_POST,
     payload: Post
}

export interface unlikePost {
     type: typeof UNLIKE_POST,
     payload: Post
}

export interface deletePost {
     type: typeof DELETE_POST;
     payload: string;
}

export interface setPost {
     type: typeof SET_POST,
     post: Post
}

export interface submitComment {
     type: typeof SUBMIT_COMMENT;
     comment: Comment
}

export interface likeComment {
     type: typeof LIKE_COMMENT;
     payload: Comment
}

export interface unlikeComment {
     type: typeof UNLIKE_COMMENT
     payload: Comment
}

export type dataActions = loadData | setPosts | likePost | unlikePost | deletePost | addPost | setPost | submitComment | likeComment | unlikeComment;


export type AppActions = UserActions | uiActions | dataActions;