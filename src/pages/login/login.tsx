import React from 'react';
import TextField from '@material-ui/core/TextField';
import {
	withStyles,
	WithStyles,
	Button,
	Grid,
	Typography,
	CircularProgress,
	createStyles,
} from '@material-ui/core';
import logo from '../../assets/icon.png';
import { NavLink, useHistory } from 'react-router-dom';
import s from './login.module.scss';
import { Errors } from '../../redux/ui-reducer';
import { DevTool } from 'react-hook-form-devtools';
import { useForm, Controller } from 'react-hook-form';
interface Props extends WithStyles<typeof styles> {
	loginUser(userData: { email: string; password: string }, history: any): void;
	loading: boolean;
	errors: Errors;
}

const styles = createStyles({
	header: {
		marginBottom: '1em',
	},
	button: {
		maxWidth: '15%',
		marginTop: '1em',
	},
	input: {
		width: '60%',
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
});

interface FormFields {
	email: string;
	password: string;
}

const Login: React.FC<Props> = ({ classes, loginUser, loading, errors }) => {
	let history = useHistory();
	const { control, handleSubmit } = useForm<FormFields>({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const onSubmit = handleSubmit((data) => {
		loginUser(data, history);
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
						Login
					</Typography>
					<form
						noValidate
						className={s.form}
						onSubmit={onSubmit}
						autoComplete={'off'}>
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
									type="email"
									className={classes.input}
									style={{ marginBottom: '1em' }}
									disabled={loading}
									helperText={errors!.email}
									id="Email"
									label="E-mail"
									variant="outlined"
									error={!!errors!.email || !!errors!.general}
									fullWidth
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
									className={classes.input}
									type="password"
									fullWidth
									error={!!errors!.password || !!errors!.general}
								/>
							}
							name="password"
							control={control}
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
								Login
							</Button>
						)}
						<small style={{ marginTop: '1em' }}>
							You first time on this site? go to{' '}
							<NavLink to={'/signup'}>
								{' '}
								<span style={{ color: 'red' }}>singup</span>{' '}
							</NavLink>{' '}
						</small>
					</form>
					<DevTool control={control} />
				</div>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Login);
