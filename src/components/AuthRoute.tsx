import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AppState } from '../redux/root-reducer';
import { connect } from 'react-redux';

interface Props {
     component: any,
     authenticated: boolean;
     path: string;
}
const AuthRoute: React.FC<Props> = ({ authenticated, component: Component, path }) => (
     <>
          {!authenticated ?
               <Route path={path} exact>
                    <Component />
               </Route> : <Redirect to="/" />}
     </>
);

const mapStateToProps = (state: AppState) => ({
     authenticated: state.user.authenticated
})


export default connect(mapStateToProps)(AuthRoute);