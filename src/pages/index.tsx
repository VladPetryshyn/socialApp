import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Post from '../components/Post/PostContainer';

import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { getPosts, Post as PostType } from '../redux/data-reducer';
import PostSkeleton from '../util/PostSkeleton';

interface StateProps {
	posts: Array<PostType>;
	loading: boolean;
}

interface DispatchProps {
	getPosts(): void;
}

type Props = StateProps & DispatchProps;

export const Index: React.FC<Props> = ({ posts, getPosts, loading }) => {
	useEffect(() => {
		getPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const recentPostMarkup = !loading ? (
		posts!.map((post) => <Post post={post} key={post.postId} />)
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

const mapStateToProps = (state: AppState): StateProps => ({
	posts: state.data.posts,
	loading: state.data.loading,
});

export default connect<StateProps, DispatchProps, {}, AppState>(
	mapStateToProps,
	{ getPosts }
)(Index);
