import React from 'react'
import { connect } from 'react-redux';
import { deletePost } from '../../redux/data-reducer';
import { withStyles, DialogTitle, DialogActions, Dialog, Button } from '@material-ui/core';
import { Props } from './Props';
import { MyButton } from '../../util/mybtn';
import { DeleteOutline } from '@material-ui/icons';
import { useState } from 'react';


export const styles: any = {
     deleteButton: {
          top: "10%",
          left: "90%",
          position: "absolute"
     }
};


const DeletePost: React.FC<Props> = ({ postId, deletePost, classes }) => {
     const [isOpen, setOpen] = useState(false);
     const toggleOpen = () => {
          setOpen(prev => !prev);
     }
     return <>
          <MyButton tip="Delete Post" className={classes.deleteButton} event={toggleOpen}>
               <DeleteOutline color="secondary" />
          </MyButton>
          <Dialog open={isOpen} onClose={toggleOpen} fullWidth maxWidth="sm">
               <DialogTitle>
                    Confirm Deletion?
          </DialogTitle>
               <DialogActions>
                    <Button onClick={toggleOpen} color="primary"  >
                         CANCEL
          </Button>
                    <Button onClick={() => {
                         deletePost(postId);
                         toggleOpen();
                    }} color="secondary"   >
                         OK
          </Button>
               </DialogActions>
          </Dialog>
     </>
}


export default connect(null, { deletePost })(withStyles(styles)(DeletePost)); 