import React, { Fragment, useState } from 'react';
import {
	Grid,
	Typography,
	WithStyles,
	createStyles,
	withStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentLikeButton from './CommentLikeButton';
import { MyButton } from '../../util/mybtn';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { Comment } from '../../redux/data-reducer';
import { Menu, MenuItem } from '@material-ui/core';
interface Props extends WithStyles<typeof styles> {
	comment: Comment;
	isLast: boolean;
	handle: string;
	likeComment(commentId: string): void;
	unlikeComment(commentId: string): void;
	deleteComment(commentId: string): void;
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
	comment: { body, userHandle, userImage, commentId, createdAt, likeCount },
	isLast,
	likeComment,
	unlikeComment,
	deleteComment,
	handle
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const openMenu = (e: any) => {
		setAnchorEl(e.target as HTMLButtonElement);
	};
	const closeMenu = () => {
		setAnchorEl(null);
	};
	return (
		<Fragment>
			<Grid item sm={12} className={classes.container}>
				<Grid container>
					<Grid item sm={2}>
						<img
							src={userImage}
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
							{handle === userHandle && (
								<div className={classes.ellipsis}>
									<MyButton tip='Comment Menu' event={openMenu}>
										<MoreVertIcon />
									</MyButton>
									<Menu
										anchorEl={anchorEl}
										open={!!anchorEl}
										onClose={closeMenu}
										style={{ marginLeft: '25px', marginTop: '15px' }}>
										<MenuItem
											onClick={() => {
												deleteComment(commentId);
												closeMenu();
											}}>
											<Typography color='initial' variant='body1'>
												Delete Comment
											</Typography>
										</MenuItem>
									</Menu>
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

export default withStyles(styles)(CommentComponent);
