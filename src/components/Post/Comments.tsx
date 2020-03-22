import React, { Fragment } from 'react';
import {
	withStyles,
	WithStyles,
	Grid,
	Typography,
	createStyles
} from '@material-ui/core';
import {
	Comment,
	likeComment,
	unlikeComment,
	deleteComment
} from '../../redux/data-reducer';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import CommentLikeButton from './CommentLikeButton';
import { connect } from 'react-redux';
import { MyButton } from '../../util/mybtn';
import CommentComponent from './Comment';
import { AppState } from '../../redux/root-reducer';

interface Props {
	comments: Array<Comment>;
	handle: string;
	likeComment(commentId: string): void;
	unlikeComment(commentId: string): void;
	deleteComment(commentId: string): void;
}

const Comments: React.FC<Props> = ({
	comments,
	unlikeComment,
	likeComment,
	deleteComment,
	handle
}) => {
	return (
		<Grid container>
			{comments.map((comment, idx) => (
				<CommentComponent
					key={comment.commentId}
					comment={comment}
					likeComment={likeComment}
					unlikeComment={unlikeComment}
					isLast={idx === comments.length - 1}
					deleteComment={deleteComment}
					handle={handle}
				/>
			))}
		</Grid>
	);
};

const mapStateToProps = (state: AppState) => ({
	handle: state.user.credentials.handle
});

export default connect(mapStateToProps, {
	likeComment,
	unlikeComment,
	deleteComment
})(Comments);
