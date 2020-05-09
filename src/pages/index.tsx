import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../components/Post/PostContainer';

import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { getPosts } from '../redux/data-reducer';
import PostSkeleton from '../util/PostSkeleton';

interface State {
	posts: [
		{
			body: string;
			createdAt: string;
			userHandle: string;
			userImage: string;
			likeCount: number;
			commentCount: number;
			postId: string;
		}
	];
}

interface Props {
	posts: any;
	getPosts(): void;
	loading: boolean;
}

export const Index: React.FC<Props> = ({ posts, getPosts, loading }) => {
	useEffect(() => {
		getPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const recentPostMarkup = !loading ? (
		posts!.map((post: any) => <Post post={post} key={post.postId} />)
	) : (
		<PostSkeleton />
	);
	return (
		<Grid container spacing={10}>
			<Grid item sm={8} xs={12}>
				{recentPostMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state: AppState) => {
	return {
		posts: state.data.posts,
		loading: state.data.loading,
	};
};

export default connect(mapStateToProps, { getPosts })(Index);
