import React, { useState, useEffect } from 'react';
import {
	MenuItem,
	Typography,
	Dialog,
	createStyles,
	WithStyles,
	withStyles,
	TextField,
	Button,
	DialogTitle,
	DialogContent
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { clearErrors, Errors } from '../redux/ui-reducer';
import { MyButton } from '../util/mybtn';
import { Close } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { changeCommentBody } from '../redux/data-reducer';

interface Props extends WithStyles<typeof styles> {
	body: string;
	clearErrors(): void;
	changeCommentBody(commentId: string, body: string): Promise<boolean>;
	errors: Errors;
	commentId: string;
	closeMenu(): void;
}

const styles = createStyles({
	submitButton: {
		position: 'relative',
		marginTop: '1em',
		float: 'right'
	},
	spinner: {
		marginTop: '1em',
		float: 'right'
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '5%'
	}
});

export const ChangeComment: React.FC<Props> = ({
	body,
	clearErrors,
	classes,
	errors,
	changeCommentBody,
	commentId,
	closeMenu
}) => {
	const [isOpen, setOpen] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const { setValue, handleSubmit, control } = useForm<{ body: string }>({
		defaultValues: {
			body
		}
	});
	const handleOpen = () => {
		setValue('body', body);
		setOpen(true);
	};
	const handleClose = () => {
		clearErrors();
		setOpen(false);
	};
	useEffect(() => {
		if (!errors) {
			clearErrors();
			setOpen(true);
		}
	}, [errors]);
	const onSubmit = handleSubmit(({ body }) => {
		setLoading(true);
		changeCommentBody(commentId, body).then(res => {
			if (!res) {
				handleClose();
				closeMenu();
			}
			setLoading(false);
		});
	});
	return (
		<>
			<MenuItem onClick={handleOpen}>
				<Typography variant='body1' color='initial'>
					Edit Comment
				</Typography>
			</MenuItem>
			<Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
				<MyButton
					tip='Close'
					event={handleClose}
					className={classes.closeButton}>
					<Close />
				</MyButton>
				<DialogTitle>Edit Your Comment</DialogTitle>
				<DialogContent>
					<form onSubmit={onSubmit}>
						<Controller
							control={control}
							as={
								<TextField
									error={!!errors!.body}
									helperText={errors!.body}
									placeholder='Edit Your Comment'
									type='text'
									label='Edit Your Comment'
									multiline
									rows='3'
									fullWidth
								/>
							}
							name='body'
						/>
						{isLoading ? (
							<CircularProgress size={30} className={classes.spinner} />
						) : (
							<Button
								type='submit'
								variant='outlined'
								color='primary'
								className={classes.submitButton}>
								Submit
							</Button>
						)}
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	errors: state.ui.errors
});

export default connect(mapStateToProps, { clearErrors, changeCommentBody })(
	withStyles(styles)(ChangeComment)
);
