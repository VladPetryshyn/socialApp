import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { withStyles, WithStyles, Dialog, DialogContent, CircularProgress, Grid, Typography } from '@material-ui/core';
import { AppState } from '../../redux/root-reducer';
import { Post, getPost } from '../../redux/data-reducer';
import { UiState, clearErrors } from '../../redux/ui-reducer';
import { MyButton } from '../../util/mybtn';
import { UnfoldMore, Close, Message } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from "./Comments";

import CommentForm from "./CommentForm"


const styles: any = {
     visibleSeparator: {
          width: "100%",
          borderBottom: "1px solid grey",
          marginBottom: "1.5em"
     },
     dialog: {
          minHeight: "350px"
     },
     expandButton: {
          position: "absolute",
          right: "4%"
     },
     invisibleSeparator: {
          border: "none",
          margin: 4
     },
     profileImage: {
          width: 200,
          height: 200,
          borderRadius: "50%",
          objectFit: "cover"
     },
     dialogContent: {
          overflowX: "hidden",
          padding: 20
     },
     closeButton: {
          position: "absolute",
          right: "5%",
          top: "5%"
     },
     progressContainer: {
          textAlign: "center",
          marginTop: 50,
          marginBottom: 50
     }
}


interface Props extends WithStyles<typeof styles> {
     postId: string;
     userHandle: string;
     post: Post;
     getPost(postId: string): void;
     ui: UiState,
     clearErrors(): void;
     openDialog?: boolean;
}

const PostDialog: React.FC<Props> = ({ getPost, postId, userHandle, post: { body, commentsCount, createdAt, likeCount, userImage, comments }, ui: { loading }, classes, clearErrors, openDialog }) => {
     const [state, setState] = useState({
          open: false,
          oldPath: "",
          newPath: ""
     });
     const handleOpen = () => {
          let oldPath = window.location.pathname;

          const newPath = `/users/${userHandle}/post/${postId}`

          if (oldPath === newPath) oldPath = `/users/${userHandle}`
          window.history.pushState(null, "", newPath);
          setState({ open: true, oldPath, newPath });
          getPost(postId);
     }
     const handleClose = () => {
          window.history.pushState(null, "", state.oldPath);
          setState({ oldPath: "", newPath: "", open: false });
          clearErrors();
     }
     useEffect(() => {
          if (openDialog) handleOpen();
     }, []);

     return (
          <>
               <MyButton event={handleOpen} tip="Open post" className={classes.expandButton}  >
                    <UnfoldMore color="primary" />
               </MyButton>
               <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth={"sm"} className={classes.dialog}    >
                    <MyButton tip="Close" event={handleClose} className={classes.closeButton} >
                         <Close />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}  >
                         {loading ?
                              <div className={classes.progressContainer}>
                                   <CircularProgress size={100} thickness={2} /> </div> : <Grid container spacing={10}>
                                   <Grid item sm={5}>
                                        <img src={userImage} alt='Profile' className={classes.profileImage} />
                                   </Grid>
                                   <Grid item sm={7}>
                                        <Typography component={NavLink} color={"primary"} variant="h2" to={`/users/${userHandle}`}>
                                             {userHandle}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant="body2" color="textSecondary">
                                             {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant="body1">
                                             {body}
                                        </Typography>
                                        <LikeButton postId={postId} /> <span>{likeCount} likes </span>
                                        <MyButton tip="Comment" className={classes.button}  >
                                             <Message color="primary" />
                                        </MyButton> <span>{commentsCount} comments </span>
                                   </Grid>
                                   <hr className={classes.visibleSeparator} />
                                   <CommentForm postId={postId} />
                                   <hr className={classes.invisibleSeparator} />
                                   <Comments comments={comments} />
                              </Grid>}
                    </DialogContent>
               </Dialog>
          </>
     );
}

const mapStateToProps = (state: AppState) => ({
     post: state.data.post,
     ui: state.ui
});


export default connect(mapStateToProps, { getPost, clearErrors })(withStyles(styles)(PostDialog));