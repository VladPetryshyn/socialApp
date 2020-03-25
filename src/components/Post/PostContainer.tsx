import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import PostComponent from './Post';
import { likePost, unlikePost, Post } from '../../redux/data-reducer';
interface Props {
	handle: string;
	image: string;
	post: Post;
	openDialog?: boolean;
}
const PostContainer: React.FC<Props> = ({
	handle,
	image,
	post,
	openDialog
}) => (
	<PostComponent
		handle={handle}
		image={image}
		post={post}
		openDialog={openDialog}
	/>
);
const mapStateToProps = (state: AppState) => {
	return {
		handle: state.user.credentials.handle,
		image: state.user.credentials.imageUrl,
		likes: state.user.likes
	};
};

export default connect(mapStateToProps, { likePost, unlikePost })(
	PostContainer
);
