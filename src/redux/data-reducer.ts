import {
	AppActions,
	LOADING_DATA,
	SET_POSTS,
	LIKE_POST,
	UNLIKE_POST,
	DELETE_POST,
	LOADING_UI,
	ADD_POST,
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_POST,
	SUBMIT_COMMENT,
	LIKE_COMMENT,
	UNLIKE_COMMENT,
	DELETE_COMMENT
} from './actions';
import { Dispatch } from 'react';
import axios from 'axios';
import { stopLoading, clearErrors } from './ui-reducer';
import { CHANGE_POST_BODY, CHANGE_COMMENT_BODY } from './actions';
const initialState: State = {
	posts: [],
	post: {
		body: '',
		commentsCount: 0,
		createdAt: '',
		likeCount: 0,
		userHandle: '',
		userImage: '',
		postId: '',
		comments: []
	},
	loading: false
};
export interface Comment {
	body: string;
	createdAt: string;
	userHandle: string;
	userImage: string;
	likeCount: number;
	commentId: string;
	isEdited: boolean;
}

export interface Post {
	body: string;
	commentsCount: number;
	createdAt: string;
	likeCount: number;
	userHandle: string;
	userImage: string;
	postId: string;
	comments: Array<Comment>;
}
export interface State {
	posts: Array<Post>;
	post: Post;
	loading: boolean;
}

export const dataReducer = (
	state: State = initialState,
	action: AppActions
): State => {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case LIKE_POST:
		case UNLIKE_POST:
			let indexLU = state.posts.findIndex(
				post => post.postId === action.payload.postId
			);
			state.posts[indexLU] = action.payload;
			if (state.post.postId === action.payload.postId) {
				state.post = {
					...state.post,
					...action.payload
				};
			}

			return {
				...state,
				posts: state.posts.map(post => post)
			};
		case DELETE_POST:
			let indexD = state.posts.findIndex(
				post => post.postId === action.payload
			);
			state.posts.splice(indexD, 1);
			return {
				...state,
				posts: state.posts.map((post: any) => post)
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case SET_POST:
			return {
				...state,
				loading: false,
				post: action.post
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				posts: state.posts.map(post => {
					if (post.postId === state.post.postId) {
						return {
							...post,
							commentsCount: post.commentsCount + 1
						};
					}
					return post;
				}),
				post: {
					...state.post,
					commentsCount: state.post.commentsCount + 1,
					comments: [action.comment, ...state.post.comments] as Array<
						Comment
					>
				}
			};
		case LIKE_COMMENT:
		case UNLIKE_COMMENT:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.map(comment => {
						if (comment.commentId === action.payload.commentId) {
							return action.payload;
						}
						return comment;
					})
				}
			};
		case DELETE_COMMENT:
			return {
				...state,
				posts: state.posts.map(post => {
					if (post.postId === state.post.postId) {
						return {
							...post,
							commentsCount: post.commentsCount - 1
						};
					}
					return post;
				}),
				post: {
					...state.post,
					commentsCount: state.post.commentsCount - 1,
					comments: state.post.comments.filter(
						comment => comment.commentId !== action.commentId
					)
				}
			};
		case CHANGE_POST_BODY:
			return {
				...state,
				posts: state.posts.map(post => {
					if (post.postId === action.payload.postId) {
						return {
							...post,
							body: action.payload.body
						};
					}
					return post;
				})
			};
		case CHANGE_COMMENT_BODY:
			return {
				...state,
				post: {
					...state.post,
					comments: state.post.comments.map(comment => {
						if (comment.commentId === action.payload.commentId) {
							return {
								...comment,
								body: action.payload.body
							};
						}
						return comment;
					})
				}
			};
		default:
			return state;
	}
};

export const getPosts = () => async (dispatch: Dispatch<AppActions>) => {
	dispatch({ type: LOADING_DATA });
	try {
		const { data } = await axios.get('/posts');
		dispatch({ type: SET_POSTS, payload: data });
	} catch (err) {
		dispatch({ type: SET_POSTS, payload: [] });
		console.log(`data-reducer, getPosts Error:${err}`);
	}
};

export const likePost = (postId: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		const { data } = await axios.get(`/posts/${postId}/like`);
		dispatch({ type: LIKE_POST, payload: data });
	} catch (err) {
		console.log(`Error in data-reducer, likePost, Error:${err}`);
	}
};

export const addPost = (body: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	dispatch({ type: LOADING_UI });

	return axios
		.post('/post', { body })
		.then(({ data }) => {
			dispatch({
				type: ADD_POST,
				payload: data
			});
			dispatch({ type: CLEAR_ERRORS });
			return false;
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
			return true;
		});
};

export const unlikePost = (postId: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		const { data } = await axios.get(`/posts/${postId}/unlike`);
		dispatch({ type: UNLIKE_POST, payload: data });
	} catch (err) {
		console.log(`Error in data-reducer, unlikePost, Error:${err}`);
	}
};
export const deletePost = (postId: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		await axios.delete(`/posts/${postId}`);
		dispatch({ type: DELETE_POST, payload: postId });
	} catch (err) {
		console.log(`data-reducer deletePost, error:${err}`);
	}
};

export const getPost = (id: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	dispatch({ type: LOADING_UI });
	try {
		const { data } = await axios.get(`/posts/${id}`);
		dispatch({ type: SET_POST, post: data });
		dispatch(stopLoading());
	} catch (err) {
		console.log(err);
	}
};

export const addCommentAC = (postId: string, text: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		const { data } = await axios.post(`/posts/${postId}/comment`, {
			body: text
		});
		dispatch({ type: SUBMIT_COMMENT, comment: data });
		dispatch(clearErrors());
	} catch (err) {
		console.log(err.response.data);
		dispatch({ type: SET_ERRORS, payload: err.response.data });
	}
};

export const getUserData = (userHandle: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	dispatch({ type: LOADING_DATA });
	try {
		const { data } = await axios.get(`/user/${userHandle}`);
		dispatch({ type: SET_POSTS, payload: data.posts });
	} catch (err) {
		dispatch({ type: SET_POSTS, payload: [] });
	}
};

export const likeComment = (commentId: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		const { data } = await axios.get(`/comments/${commentId}/like`);
		dispatch({ type: LIKE_COMMENT, payload: data });
	} catch (err) {
		console.log(
			`This error was ocurated in likeComment action. Error:${err}`
		);
	}
};

export const unlikeComment = (commentId: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		const { data } = await axios.get(`comments/${commentId}/unlike`);
		dispatch({ type: UNLIKE_COMMENT, payload: data });
	} catch (err) {
		console.log(
			`This error was ocurated in unlikeComment action. Error:${err}`
		);
	}
};

export const deleteComment = (commentId: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		await axios.delete(`/comments/${commentId}`);
		dispatch({ type: DELETE_COMMENT, commentId });
	} catch (err) {
		console.log(err);
	}
};

export const changePostBody = (postId: string, body: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	dispatch({ type: LOADING_UI });
	try {
		await axios.put(`/posts/${postId}`, { body });
		dispatch({
			type: CHANGE_POST_BODY,
			payload: {
				postId,
				body
			}
		});
		dispatch(clearErrors());
		return false;
	} catch (err) {
		dispatch({ type: SET_ERRORS, payload: err.response.data });
		return true;
	}
};

export const changeCommentBody = (commentId: string, body: string) => async (
	dispatch: Dispatch<AppActions>
) => {
	try {
		await axios.put(`/comments/${commentId}`, {
			body
		});
		dispatch({
			type: CHANGE_COMMENT_BODY,
			payload: {
				commentId,
				body
			}
		});
		dispatch(clearErrors());
		return false;
	} catch (err) {
		dispatch({ type: SET_ERRORS, payload: err.response.data });
		return true;
	}
};
