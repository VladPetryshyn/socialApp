import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
	withStyles,
	WithStyles,
	Button,
	Typography,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { DevTool } from 'react-hook-form-devtools';
import s from './signup.module.scss';
import { Errors } from '../../redux/ui-reducer';
import { useForm, Controller } from 'react-hook-form';
import logo from '../../assets/icon.png';
export interface Props extends WithStyles<typeof styles> {
	signUpUser(data: FormData, history: any): void;
	loading: boolean;
	errors: Errors;
}

export const styles = {
	header: {
		marginBottom: '1em',
	},
	button: {
		maxWidth: '20%',
		marginTop: '1em',
	},
	input: {
		width: '60%',
		marginBottom: '1em',
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginBottom: '1em',
	},
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
	},
};
export interface FormData {
	email: string;
	password: string;
	confirmPassword: string;
	handle: string;
}

const SignUp: React.FC<Props> = ({ classes, signUpUser, errors, loading }) => {
	let history = useHistory();
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
		},
	});
	const onSubmit = handleSubmit((data) => {
		signUpUser(data, history);
	});
	return (
		<Grid container justify="center" alignItems="center">
			<Grid item className={classes.wrapper}>
				<div className={s.formContainer}>
					<NavLink to={'/'}>
						<img
							src={logo}
							alt="logo"
							style={{
								cursor: 'pointer',
								marginBottom: '16px',
								width: 100,
								height: 100,
							}}
						/>
					</NavLink>
					<Typography variant="h3" className={classes.header}>
						Sign up
					</Typography>
					<form
						noValidate
						className={s.form}
						onSubmit={onSubmit}
						autoComplete={'off'}
						data-testid="signup-form">
						{!!errors!.general && (
							<Typography
								variant={'body2'}
								className={classes.customError}>
								{errors!.general}
							</Typography>
						)}
						<Controller
							as={
								<TextField
									disabled={loading}
									helperText={errors!.email}
									id="Email"
									label="E-mail"
									variant="outlined"
									type="email"
									className={classes.input}
									style={{ marginBottom: '1em' }}
									fullWidth
									error={!!errors!.email || !!errors!.general}
								/>
							}
							control={control}
							name="email"
						/>
						<Controller
							as={
								<TextField
									disabled={loading}
									helperText={errors!.password}
									id="Password"
									label="Password"
									variant="outlined"
									type="password"
									className={classes.input}
									fullWidth
									error={!!errors!.password || !!errors!.general}
								/>
							}
							control={control}
							name="password"
						/>
						<Controller
							as={
								<TextField
									disabled={loading}
									helperText={errors!.confirmPassword}
									id="confirmPassword"
									label="Confirm Password"
									variant="outlined"
									type="password"
									className={classes.input}
									fullWidth
									error={
										!!errors!.confirmPassword || !!errors!.general
									}
								/>
							}
							control={control}
							name="confirmPassword"
						/>
						<Controller
							as={
								<TextField
									disabled={loading}
									helperText={errors!.handle}
									id="Handle"
									label="Handle"
									variant="outlined"
									className={classes.input}
									fullWidth
									error={!!errors!.handle || !!errors!.general}
								/>
							}
							control={control}
							name="handle"
						/>
						{loading ? (
							<CircularProgress />
						) : (
							<Button
								variant="outlined"
								type="submit"
								color="primary"
								className={classes.button}>
								{' '}
								Sign Up
							</Button>
						)}
						<small style={{ marginTop: '1em' }}>
							Already have an account? go to{' '}
							<NavLink to={'/login'}>
								{' '}
								<span style={{ color: 'red' }}>Login</span>{' '}
							</NavLink>{' '}
						</small>
					</form>
					<DevTool control={control} />
				</div>
			</Grid>
		</Grid>
	);
};
export default withStyles(styles)(SignUp);
