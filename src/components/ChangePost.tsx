import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	createStyles,
	withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { Errors, clearErrors } from '../redux/ui-reducer';
import TextField from '@material-ui/core/TextField';
import {
	Button,
	WithStyles,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import { changePostBody } from '../redux/data-reducer';
import { MyButton } from '../util/mybtn';
import { Close } from '@material-ui/icons';
interface StateProps {
	errorsUi: Errors;
	loading: boolean;
}

interface DispatchProps {
	clearErrors(): void;
	changePostBody(postId: string, body: string): Promise<boolean>;
}

interface OwnProps {
	body: string;
	postId: string;
	closeMenu(): void;
}

export type Props = WithStyles<typeof styles> &
	OwnProps &
	DispatchProps &
	StateProps;
interface Form {
	body: string;
}

const styles = createStyles({
	submitButton: {
		position: 'relative',
		marginTop: '1em',
		float: 'right',
	},
	spinner: {
		marginTop: '1em',
		float: 'right',
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
		top: '5%',
	},
});

export const ChangePost: React.FC<Props> = ({
	errorsUi,
	loading,
	body,
	clearErrors,
	classes,
	postId,
	changePostBody,
	closeMenu,
}) => {
	const [isOpen, setOpen] = useState(false);
	const { control, handleSubmit, setValue } = useForm<Form>({
		defaultValues: {
			body,
		},
	});
	useEffect(() => {
		if (!errorsUi && !loading) {
			clearErrors();
			setOpen(true);
		}
	}, [loading, errorsUi, clearErrors]);
	const handleOpen = () => {
		setValue('body', body);
		setOpen(true);
	};
	const handleClose = () => {
		clearErrors();
		setOpen(false);
	};
	const onSubmit = handleSubmit(({ body }) => {
		changePostBody(postId, body).then((res) => {
			if (!res) {
				handleClose();
				closeMenu();
			}
		});
	});

	return (
		<>
			<MenuItem onClick={handleOpen}>
				<Typography variant="body1" color="initial">
					Edit Post
				</Typography>
			</MenuItem>
			<Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
				<MyButton
					tip="Close"
					event={handleClose}
					className={classes.closeButton}>
					<Close />
				</MyButton>
				<DialogTitle>Edit Your Post</DialogTitle>
				<DialogContent>
					<form onSubmit={onSubmit}>
						<Controller
							control={control}
							name="body"
							as={
								<TextField
									type="text"
									label="Edit Your Post"
									multiline
									rows="3"
									placeholder="Edit Your Post"
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
								type="submit"
								className={classes.submitButton}
								variant="outlined"
								color="primary">
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
	errorsUi: state.ui.errors,
});

export default connect(mapStateToProps, { clearErrors, changePostBody })(
	withStyles(styles)(ChangePost)
);
