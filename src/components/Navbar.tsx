import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { Icon } from '@material-ui/core';
import logo from '../assets/icon.png';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { MyButton } from '../util/mybtn';
import { Home } from '@material-ui/icons';
import AddPost from './AddPost';
import Notifications from './Notifications';
interface Props {
	authenticated: boolean;
}

const Navbar: React.FC<Props> = ({ authenticated }) => {
	return (
		<AppBar position="sticky">
			<Toolbar className="nav-container">
				<Icon>
					<NavLink to={authenticated ? '/' : '/login'}>
						<img src={logo} alt="logo" width={'100%'} height={'100%'} />
					</NavLink>
				</Icon>
				{authenticated ? (
					<>
						<AddPost />
						<NavLink to="/">
							<MyButton tip="Go to home page">
								<Home />
							</MyButton>
						</NavLink>
						<Notifications />
					</>
				) : (
					<>
						<Button color="inherit" component={NavLink} to="/login">
							Login
						</Button>
						<Button color="inherit" component={NavLink} to="/">
							Home
						</Button>
						<Button color="inherit" component={NavLink} to="/signup">
							SignUp
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = (state: AppState) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
