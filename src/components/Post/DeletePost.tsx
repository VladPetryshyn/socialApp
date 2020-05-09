import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../redux/data-reducer';
import {
	withStyles,
	DialogTitle,
	DialogActions,
	Dialog,
	Button,
} from '@material-ui/core';
import { Props } from './Props';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';

export const styles: any = {
	deleteButton: {
		top: '10%',
		left: '90%',
		position: 'absolute',
	},
};

const DeletePost: React.FC<Props> = ({ postId, deletePost, classes }) => {
	const [isOpen, setOpen] = useState(false);
	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};
	return (
		<>
			<Typography color="initial" variant="body1" onClick={toggleOpen}>
				Delete Post
			</Typography>
			<Dialog open={isOpen} onClose={toggleOpen} fullWidth maxWidth="sm">
				<DialogTitle>Confirm Deletion?</DialogTitle>
				<DialogActions>
					<Button onClick={toggleOpen} color="primary">
						CANCEL
					</Button>
					<Button
						onClick={() => {
							deletePost(postId);
							toggleOpen();
						}}
						color="secondary">
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
