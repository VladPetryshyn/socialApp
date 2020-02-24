import React from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../../redux/user-reducer';
import { Errors } from '../../redux/ui-reducer';
import Login from "./login";
import { AppState } from '../../redux/root-reducer';
interface Props {
     loginUser(userData: { email: string, password: string }, history: any): void;
     loading: boolean;
     errors: Errors
}
const loginContainer: React.FC<Props> = ({ loginUser, loading, errors }) => (
     <Login loginUser={loginUser} loading={loading} errors={errors} />
)
 

const mapStateToProps = (state: AppState) => ({
     loading: state.ui.loading,
     errors: state.ui.errors
});

export default connect(mapStateToProps, { loginUser })(loginContainer);