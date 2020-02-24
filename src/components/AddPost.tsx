import React, { useState } from 'react'
import { withStyles, WithStyles, Dialog, DialogTitle, DialogContent, TextField, Button, CircularProgress } from '@material-ui/core';
import { AppState } from '../redux/root-reducer';
import { connect } from 'react-redux';
import { addPost } from '../redux/data-reducer';
import { UiState, Errors, clearErrors } from '../redux/ui-reducer';
import { MyButton } from '../util/mybtn';
import { Add, Close } from '@material-ui/icons';
import { useEffect } from 'react';


const styles: any = {
     button: {},
     submitButton: {
          position: "relative",
          marginTop: "1em",
          float: "right"
     },
     spinner: {
          marginTop: "1em",
          float: "right"
     },
     closeButton: {
          position: "absolute",
          left: "90%",
          top: "5%",
     }
};



interface Props extends WithStyles<typeof styles> {
     addPost(body: string): Promise<boolean>;
     ui: UiState;
     clearErrors(): void;
}

interface State {
     errors: Errors,
     open: boolean;
}


const AddPost: React.FC<Props> = ({ ui: { loading, errors }, classes, addPost, clearErrors }) => {
     const [state, setState] = useState<State>({
          open: false,
          errors: null
     });
     // const [open, setOpen] = useState(false);
     useEffect(() => {
          if (errors) {
               setState(prevState => ({
                    ...prevState,
                    errors
               }));
          }
          if (!errors && !loading) {
               setState({ open: false, errors: {} });
          }
     }, [errors, loading]);
     const [body, setBody] = useState("");
     const handleOpen = () => {
          setState(prevState => ({
               ...prevState,
               open: true
          }));
          setBody("");
     }
     const handleClose = () => {
          clearErrors();
          setState({ open: false, errors: {} });
     }
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          addPost(body).then(res => {
               if (!res) {
                    handleClose();
               }
          });
     }

     return (<>
          <MyButton event={handleOpen} tip="Add Post">
               <Add />
          </MyButton>
          <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
               <MyButton tip="Close" event={handleClose} className={classes.closeButton}>
                    <Close />
               </MyButton>
               <DialogTitle>
                    Add a new post
               </DialogTitle>
               <DialogContent>
                    <form onSubmit={handleSubmit}>
                         <TextField name="body" error={!!errors!.body} type="text" label="Post" multiline rows="3" placeholder="Type here all you want to tell" helperText={errors!.body} className={classes.textField} fullWidth onChange={e => {
                              setBody(e.target.value);
                         }} autoFocus />
                         {loading ? <CircularProgress size={30} className={classes.spinner} /> :
                              <Button type="submit" variant="outlined" color="primary" className={classes.submitButton} disabled={loading}>
                                   Add
                         </Button>
                         }
                    </form>
               </DialogContent>
          </Dialog>
     </>);
}


const mapStateToProps = (state: AppState) => ({
     ui: state.ui
})



export default connect(mapStateToProps, { addPost, clearErrors })(withStyles(styles)(AddPost))