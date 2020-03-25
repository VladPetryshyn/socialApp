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
import { connect } from 'react-redux';
import CommentComponent from './Comment';

interface Props {
	comments: Array<Comment>;
	likeComment(commentId: string): void;
	unlikeComment(commentId: string): void;
	deleteComment(commentId: string): void;
}

const Comments: React.FC<Props> = ({
	comments,
	unlikeComment,
	likeComment,
	deleteComment
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
				/>
			))}
		</Grid>
	);
};
export default connect(null, {
	likeComment,
	unlikeComment,
	deleteComment
})(Comments);
