import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import JWT from 'jwt-decode';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import Navbar from './components/Navbar';
import Index from './pages';
import { NotFound } from './pages/404';
import Login from './pages/login/loginContainer';
import SignUp from './pages/signup/signupContainer';
import { getUserData, logOutUser, toggleAuthenticationAC } from './redux/user-reducer';
import User from './pages/user';



const theme: any = createMuiTheme({
   palette: {
      primary: {
         light: "#7d425e",
         main: "#862052",
         dark: "#60163a",
         contrastText: "#fff"
      },
      secondary: {
         light: "",
         main: "#7d425e",
         dark: "#64344b",
         contrastText: "#fff"
      },
   },
});

interface Props {
   toggleAuthenticationAC(payload: boolean): void;
   logOutUser(): void;
   getUserData(): void;
}

axios.defaults.baseURL =
   'https://europe-west1-socialapp-eb4e3.cloudfunctions.net/api';

const App: React.FC<Props> = ({ toggleAuthenticationAC, logOutUser, getUserData }) => {
   const token = localStorage.getItem("UserIdToken");
   useEffect(() => {
      if (token) {
         const decodedToken: any = JWT(token);

         if (decodedToken.exp * 1000 < Date.now()) {
            logOutUser();
         }
         else {
            toggleAuthenticationAC(true);
            axios.defaults.headers.common["Authorization"] = token;
            getUserData();
         }
      } else {
         logOutUser();
      }

   }, []);
   return (
      <MuiThemeProvider theme={theme}>
         <Navbar />
         <div className="container">
            <Switch>
               <AuthRoute component={SignUp} path="/signup" />
               <AuthRoute component={Login} path="/login" />
               <Route path="/" exact component={Index} />
               <Route path="/users/:handle" exact>
                  <User />
               </Route>
               <Route path="/users/:handle/post/:postId">
                  <User />
               </Route>
               <Route path="*">
                  <NotFound />
               </Route>
            </Switch>
         </div>
      </MuiThemeProvider>
   );
};

export default connect(null, { toggleAuthenticationAC, logOutUser, getUserData })(App);
