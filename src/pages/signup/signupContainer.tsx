import React from 'react';
import SignUp from './signup';
import { connect } from 'react-redux';
import { signUpUser } from '../../redux/user-reducer';
import { signUpProps } from './props';
import { AppState } from '../../redux/root-reducer';

const Container: React.FC<signUpProps> = ({ signUpUser, errors, loading }) => (
	<SignUp signUpUser={signUpUser} errors={errors} loading={loading} />
);

const mapStateToProps = (state: AppState) => ({
	loading: state.ui.loading,
	errors: state.ui.errors
});

export default connect(mapStateToProps, { signUpUser })(Container);
