import React, { Fragment } from 'react';
import {
	Grid,
	Typography,
	WithStyles,
	createStyles,
	withStyles
} from '@material-ui/core';
import CommentLikeButton from './CommentLikeButton';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { Comment } from '../../redux/data-reducer';
import { MenuItem } from '@material-ui/core';
import { ContextMenu } from '../ContextMenu';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import ChangeComment from '../ChangeComment';
interface Props extends WithStyles<typeof styles> {
	comment: Comment;
	isLast: boolean;
	handle: string;
	likeComment(commentId: string): void;
	unlikeComment(commentId: string): void;
	deleteComment(commentId: string): void;
	image: string;
}

const styles = createStyles({
	container: {
		padding: '0.5em 2em ',
		position: 'relative'
	},
	commentImage: {
		width: '100px',
		height: '100px',
		objectFit: 'cover',
		borderRadius: '50%'
	},
	commentData: {
		marginLeft: 20
	},
	invisibleSeparator: {
		border: 'none',
		margin: 4
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px solid grey',
		marginBottom: '1.5em'
	},
	buttons: {
		marginTop: 10
	},
	ellipsis: {
		position: 'absolute',
		right: '5%',
		top: '5%'
	}
});

export const CommentComponent: React.FC<Props> = ({
	classes,
	comment: {
		body,
		userHandle,
		userImage,
		commentId,
		createdAt,
		likeCount,
		isEdited
	},
	isLast,
	likeComment,
	unlikeComment,
	deleteComment,
	handle,
	image
}) => {
	const isOwner = handle === userHandle;
	return (
		<Fragment>
			<Grid item sm={12} className={classes.container}>
				<Grid container>
					<Grid item sm={2}>
						<img
							src={isOwner ? image : userImage}
							alt='comment'
							className={classes.commentImage}
						/>
					</Grid>
					<Grid item sm={9}>
						<div className={classes.commentData}>
							<Typography
								variant={'h5'}
								component={NavLink}
								to={`/users/${userHandle}`}
								color='primary'>
								{userHandle}
							</Typography>
							<Typography variant='body2' color='textSecondary'>
								{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
							</Typography>
							{isEdited && (
								<Typography variant='body2' color='secondary'>
									edited
								</Typography>
							)}
							<hr className={classes.invisibleSeparator} />
							<Typography variant='body1'>{body}</Typography>
							<div className={classes.buttons}>
								<CommentLikeButton
									commentId={commentId}
									likeComment={likeComment}
									unlikeComment={unlikeComment}
								/>
								{likeCount} likes
							</div>
							{isOwner && (
								<div className={classes.ellipsis}>
									<ContextMenu
										tip='Comment Menu'
										render={(closeMenu: () => void) => (
											<>
												<MenuItem
													onClick={() => {
														deleteComment(commentId);
														closeMenu();
													}}>
													<Typography
														color='initial'
														variant='body1'>
														Delete Comment
													</Typography>
												</MenuItem>
												<ChangeComment
													closeMenu={closeMenu}
													body={body}
													commentId={commentId}
												/>
											</>
										)}
									/>
								</div>
							)}
						</div>
					</Grid>
				</Grid>
			</Grid>
			{!isLast && <hr className={classes.visibleSeparator} />}
		</Fragment>
	);
};

const mapStateToProps = (state: AppState) => ({
	handle: state.user.credentials.handle,
	image: state.user.credentials.imageUrl
});

export default connect(mapStateToProps)(withStyles(styles)(CommentComponent));
