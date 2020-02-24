import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { Redirect } from 'react-router-dom';

interface Props {
     authenticated: boolean;
}

const mapStateToProps = (state: AppState) => ({
     authenticated: state.user.authenticated
})

export const withRedirect = <P extends {}>(Component: React.ComponentType<P>): React.FC<P & Props> => {
     const isAuth: React.FC<Props> = ({ authenticated, ...props }) => {
          return authenticated ? <Component {...props as P} /> : <Redirect to="login" />
     };
     return connect(
          mapStateToProps, {}
     )(isAuth);
}