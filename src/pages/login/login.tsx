import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles, Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import image from "../../assets/saniok.png";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import s from "./login.module.scss";
import axios from 'axios';
import { Errors } from '../../redux/ui-reducer';
interface Props extends WithStyles<typeof styles> {
   loginUser(userData: { email: string, password: string }, history: any): void,
   loading: boolean;
   errors: Errors
}

const styles = {
   header: {
      marginBottom: "1em"
   },
   button: {
      maxWidth: "15%",
      marginTop: "1em"
   },
   input: {
      width: "60%",
   },
   customError: {
      color: "red",
      fontSize: "0.8rem",
      marginBottom: "1em"
   }
}

interface State {
   email: string,
   password: string,
   loading: boolean,
}

const Login: React.FC<Props> = ({ classes, loginUser, loading, errors }) => {
   let history = useHistory();
   const [state, setState] = useState<State>({
      email: "",
      password: "",
      loading: false,
   });
   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      loginUser({ email: state.email, password: state.password }, history);
   };
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
         ...state,
         [e.target.name]: e.target.value
      })
   };
   return (
      <div className={s.wrapper}>
         <div className={s.formContainer}>
            <div>
               <NavLink to={"/"}>
                  <img src={image} alt="logo" style={{ cursor: "pointer", marginBottom: "16px" }} />
               </NavLink>
               <Typography variant="h3" className={classes.header}>
                  Login
            </Typography>
               <form noValidate className={s.form} onSubmit={onSubmit} autoComplete={"off"}  >
                  {!!errors!.general && <Typography variant={"body2"} className={classes.customError} >
                     {errors!.general}
                  </Typography>}
                  <TextField disabled={loading} helperText={errors!.email} id="Email" label="E-mail" variant="outlined" name="email" type="email" className={classes.input} style={{ marginBottom: "1em" }} fullWidth onChange={handleChange} error={!!errors!.email || !!errors!.general} />
                  <TextField disabled={loading} helperText={errors!.password} id="Password" label="Password" variant="outlined" name="password" type="password" className={classes.input} onChange={handleChange} value={state.password} fullWidth error={!!errors!.password || !!errors!.general} />


                  {loading ? <CircularProgress /> : <Button variant="outlined" type="submit" color="primary" className={classes.button}> Login</Button>}
                  <small style={{ marginTop: "1em" }}>You first time on this site? go to  <NavLink to={"/signup"}>  <span style={{ color: "red" }}>singup</span> </NavLink>  </small>
               </form>
            </div>
         </div>
      </div>
   );
};

export default withStyles(styles)(Login);