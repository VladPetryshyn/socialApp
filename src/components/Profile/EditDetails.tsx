import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import { editDetails, EditDetails, userCredentials } from '../../redux/user-reducer';
import { withStyles, WithStyles, Tooltip, IconButton, Dialog, DialogTitle, TextField, DialogActions, DialogContent, Button } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { Edit } from '@material-ui/icons';
import { MyButton } from './../../util/mybtn';

interface Props extends WithStyles<typeof styles> {
     editDetails(details: EditDetails): void;
     credentials: userCredentials
}

const styles: any = (theme: any) => ({
     button: {

          position: 'relative',
          float: "right"
     },
     textField: {
          margin: '10px auto 10px auto'
     }
})

interface State extends EditDetails {
     open: boolean;
}



const EditDetailsComponent: React.FC<Props> = ({ credentials: { bio, location, website }, classes, editDetails }) => {
     const [state, setState] = useState<State>({
          bio: "",
          location: "",
          website: "",
          open: false
     });

     useEffect(() => {
          mapUserDetailsToState();
     }, []);
     const toggleOpen = () => {
          setState(prev => ({
               ...prev,
               open: !prev.open
          }))
     }
     const mapUserDetailsToState = () => {
          setState({
               bio,
               location,
               website,
               open: false
          });
     }
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setState({
               ...state,
               [e.target.name]: e.target.value
          })
     };

     const handleSubmit = () => {
          const userDetails = {
               bio: state.bio,
               location: state.location,
               website: state.website
          }
          console.log(userDetails);
          editDetails(userDetails);
          toggleOpen();
     }
     return (
          <>
               <MyButton tip="Edit details" event={toggleOpen} className={classes.button} >
                    <Edit color="primary" />
               </MyButton>
               <Dialog open={state.open} onClose={toggleOpen} fullWidth maxWidth="sm"   >
                    <DialogTitle>
                         Edit Details
               </DialogTitle>
                    <DialogContent>
                         <form>
                              <TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder="tell in brief about yourself" className={classes.textField}
                                   value={state.bio} onChange={handleChange} fullWidth />
                              <TextField name="location" type="text" label="Location" placeholder="where are you now?" className={classes.textField}
                                   value={state.location} onChange={handleChange} fullWidth />
                              <TextField name="website" type="text" label="Website" placeholder="your website link" className={classes.textField}
                                   value={state.website} onChange={handleChange} fullWidth />

                         </form>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={toggleOpen} color="primary">
                              Cancel
               </Button>
                         <Button onClick={handleSubmit} color="primary">
                              Save
               </Button>
                    </DialogActions>
               </Dialog>
          </>
     );
}

const mapStateToProps = (state: AppState) => ({
     credentials: state.user.credentials
});


export default connect(mapStateToProps, { editDetails })(withStyles(styles)(EditDetailsComponent));