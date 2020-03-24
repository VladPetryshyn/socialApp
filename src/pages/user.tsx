/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AppState } from '../redux/root-reducer';
import { State as DataState, getUserData } from '../redux/data-reducer';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Post from '../components/Post/Post';
import StaticProfile from '../components/Profile/StaticProfile';
import PostSkeleton from '../util/PostSkeleton';
import Profile from '../components/Profile/Profile';
interface Props {
	data: DataState;
	getUserData(handle: string): void;
	userHandle: string;
}

export interface User {
	website?: string;
	handle?: string;
	userId?: string;
	email?: string;
	bio?: string;
	imageUrl?: string;
	createdAt?: string;
	location?: string;
}

export const User: React.FC<Props> = ({
	getUserData,
	data: { posts, loading },
	userHandle
}) => {
	const { handle, postId } = useParams();
	const [user, setUser] = useState<User>({});
	useEffect(() => {
		getUserData(handle as string);
		axios.get(`/user/${handle}`).then(({ data }) => {
			setUser(data.user);
		});
	}, []);
	const PostsMarkup = loading ? (
		<PostSkeleton />
	) : posts.length === 0 ? (
		<p>This user has no posts </p>
	) : postId === undefined ? (
		posts.map(post => <Post key={post.postId} post={post} />)
	) : (
		posts.map(post => {
			if (post.postId !== postId)
				return <Post key={post.postId} post={post} />;
			return <Post key={post.postId} post={post} openDialog />;
		})
	);
	return (
		<Grid container spacing={10}>
			<Grid item sm={8} xs={12}>
				{PostsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				{userHandle === handle ? (
					<Profile />
				) : (
					<StaticProfile user={user} loading={loading} />
				)}
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state: AppState) => ({
	data: state.data,
	userHandle: state.user.credentials.handle
});

export default connect(mapStateToProps, { getUserData })(User);
