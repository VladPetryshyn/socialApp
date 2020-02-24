import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles, Button, Typography, CircularProgress } from '@material-ui/core';
import image from "../../assets/saniok.png";
import { NavLink, useHistory, Redirect } from 'react-router-dom';
import s from "./signup.module.scss";
import {Errors} from "../../redux/ui-reducer";
interface Props extends WithStyles<typeof styles> {
   signUpUser(data: {
      email: string,
      password: string,
      confirmPassword: string,
      handle: string
   }, history: any): void;
   loading: boolean;
   errors: Errors;
}

const styles = {
   header: {
      marginBottom: "1em"
   },
   button: {
      maxWidth: "20%",
      marginTop: "1em"
   },
   input: {
      width: "60%",
      marginBottom: "1em"
   },
   customError: {
      color: "red",
      fontSize: "0.8rem",
      marginBottom: "1em"
   },
}

interface State {
   email: string,
   password: string,
   confirmPassword: string,
   handle: string,

}

const SignUp: React.FC<Props> = ({ classes, signUpUser, errors, loading }) => {
   let history = useHistory();
   const [state, setState] = useState<State>({
      email: "",
      password: "",
      confirmPassword: "",
      handle: '',

   });
   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      signUpUser({ ...state }, history);
   };
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
         ...state,
         [e.target.name]: e.target.value
      })
   };

   return (<div className={s.wrapper}>
      <div className={s.formContainer}>
         <div>
            <NavLink to={"/"}>
               <img src={image} alt="logo" style={{ cursor: "pointer", marginBottom: "16px" }} />
            </NavLink>
            <Typography variant="h3" className={classes.header}>
               Sign up
            </Typography>
            <form noValidate className={s.form} onSubmit={onSubmit} autoComplete={"off"}  >
               {!!errors!.general && <Typography variant={"body2"} className={classes.customError} >
                  {errors!.general}
               </Typography>}
               <TextField disabled={loading} helperText={errors!.email} id="Email" label="E-mail" variant="outlined" name="email" type="email" className={classes.input} style={{ marginBottom: "1em" }} fullWidth onChange={handleChange} error={!!errors!.email || !!errors!.general} />
               <TextField disabled={loading} helperText={errors!.password} id="Password" label="Password" variant="outlined" name="password" type="password" className={classes.input} onChange={handleChange} value={state.password} fullWidth error={!!errors!.password || !!errors!.general} />
               <TextField disabled={loading} helperText={errors!.confirmPassword} id="confirmPassword" label="Confirm Password" variant="outlined" name="confirmPassword" type="password" className={classes.input} onChange={handleChange} value={state.confirmPassword} fullWidth error={!!errors!.confirmPassword || !!errors!.general} />
               <TextField disabled={loading} helperText={errors!.handle} id="Handle" label="Handle" variant="outlined" name="handle" className={classes.input} onChange={handleChange} value={state.handle} fullWidth error={!!errors!.handle || !!errors!.general} />
               {loading ? <CircularProgress /> : <Button variant="outlined" type="submit" color="primary" className={classes.button}> Sign Up</Button>}
               <small style={{ marginTop: "1em" }}>Already have an account? go to  <NavLink to={"/login"}>  <span style={{ color: "red" }}>Login</span> </NavLink>  </small>
            </form>
         </div>
      </div>
   </div>
   );
};
export default withStyles(styles)(SignUp);