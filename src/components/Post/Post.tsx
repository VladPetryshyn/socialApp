import React from 'react';
import {
	withStyles,
	WithStyles,
	MenuItem,
	createStyles
} from '@material-ui/core';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { MyButton } from '../../util/mybtn';
import { Message } from '@material-ui/icons';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';
import { ContextMenu } from '../ContextMenu';
import ChangePost from '../ChangePost';
const styles = createStyles({
	card: {
		display: 'flex',
		marginBottom: '1.2em',
		position: 'relative',
		background: '#330417b6'
	},
	content: {
		padding: 25
	},
	image: {
		minWidth: 200
	},
	button: {
		marginLeft: '1em'
	},
	buttons: {
		marginTop: 15
	},
	ellipsisButton: {
		top: '10%',
		left: '90%',
		position: 'absolute'
	}
});
interface Props extends WithStyles<typeof styles> {
	handle: string;
	image: string;
	post: {
		body: string;
		createdAt: string;
		userHandle: string;
		userImage: string;
		likeCount: number;
		commentsCount: number;
		postId: string;
	};
	openDialog?: boolean;
}

const Post: React.FC<Props> = ({
	post: {
		userImage,
		body,
		userHandle,
		createdAt,
		likeCount,
		postId,
		commentsCount
	},
	classes,
	handle,
	image,
	openDialog
}) => {
	dayjs.extend(relativeTime);

	const isOwner = () => userHandle === handle;
	const MySpan = (text: string) => (
		<span style={{ marginLeft: '0.5em' }}>{text}</span>
	);
	return (
		<Card className={classes.card}>
			<CardMedia
				image={isOwner() ? image : userImage}
				title='User Image'
				className={classes.image}
				style={{ objectFit: 'cover' }}
			/>
			<CardContent className={classes.content}>
				<Typography
					variant='h5'
					component={NavLink}
					to={`/users/${userHandle}`}
					color={'primary'}>
					{userHandle}
				</Typography>
				{isOwner() && (
					<div className={classes.ellipsisButton}>
						<ContextMenu
							tip='Post Menu'
							iconColor='primary'
							render={(closeMenu: () => void) => (
								<>
									<MenuItem>
										<DeletePost postId={postId} />
									</MenuItem>

									<ChangePost
										closeMenu={closeMenu}
										body={body}
										postId={postId}
									/>
								</>
							)}
						/>
					</div>
				)}
				<Typography variant='body2' color='textSecondary'>
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant='body1'>{body}</Typography>
				<div className={classes.buttons}>
					<LikeButton postId={postId} />
					{MySpan(`${likeCount} Likes`)}
					<MyButton tip='' className={classes.button}>
						<Message color='primary' />
					</MyButton>
					{MySpan(`${commentsCount} comments`)}
					<PostDialog
						postId={postId}
						userHandle={userHandle}
						openDialog={openDialog}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default withStyles(styles)(Post);
