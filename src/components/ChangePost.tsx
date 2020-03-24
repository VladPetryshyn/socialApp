import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	createStyles,
	withStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { Errors, clearErrors } from '../redux/ui-reducer';
import TextField from '@material-ui/core/TextField';
import {
	Button,
	WithStyles,
	MenuItem,
	CircularProgress
} from '@material-ui/core';
import { changePostBody } from '../redux/data-reducer';
interface Props extends WithStyles<typeof styles> {
	errorsUi: Errors;
	loading: boolean;
	body: string;
	clearErrors(): void;
	changePostBody(postId: string, body: string): Promise<boolean>;
	postId: string;
}
interface Form {
	body: string;
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
	}
});

export const ChangePost: React.FC<Props> = ({
	errorsUi,
	loading,
	body,
	clearErrors,
	classes,
	postId,
	changePostBody
}) => {
	const [isOpen, setOpen] = useState(false);
	const { control, setError, handleSubmit, setValue } = useForm<Form>({
		defaultValues: {
			body
		}
	});
	useEffect(() => {
		if (errorsUi) {
			setError('body', errorsUi.body!);
		}
		if (!errorsUi && !loading) {
			clearErrors();
			setOpen(true);
		}
	}, [loading, errorsUi]);
	const handleOpen = () => {
		setValue('body', body);
		setOpen(true);
	};
	const handleClose = () => {
		clearErrors();
		setOpen(false);
	};
	const onSubmit = handleSubmit(({ body }) => {
		changePostBody(postId, body).then(res => {
			if (!res) {
				handleClose();
			}
		});
	});

	return (
		<>
			<MenuItem onClick={handleOpen}>
				<Typography variant='body1' color='initial'>
					Edit Post
				</Typography>
			</MenuItem>
			<Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
				<DialogTitle>Edit Post</DialogTitle>
				<DialogContent>
					<form onSubmit={onSubmit}>
						<Controller
							control={control}
							name='body'
							as={
								<TextField
									type='text'
									label='Post'
									multiline
									rows='3'
									placeholder='Edit here all you want to tell'
									fullWidth
									error={!!errorsUi!.body}
									helperText={errorsUi!.body!}
								/>
							}
						/>
						{loading ? (
							<CircularProgress size={30} className={classes.spinner} />
						) : (
							<Button
								type='submit'
								className={classes.submitButton}
								variant='outlined'
								color='primary'>
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
	loading: state.ui.loading,
	errorsUi: state.ui.errors
});

export default connect(mapStateToProps, { clearErrors, changePostBody })(
	withStyles(styles)(ChangePost)
);
