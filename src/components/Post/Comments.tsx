import React, { Fragment } from 'react'
import { withStyles, WithStyles, Grid, Typography } from '@material-ui/core';
import { Comment, likeComment, unlikeComment } from '../../redux/data-reducer';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import CommentLikeButton from './CommentLikeButton';
import { connect } from 'react-redux';

interface Props extends WithStyles<typeof styles> {
     comments: Array<Comment>
     likeComment(commentId: string): void
     unlikeComment(commentId: string): void
}

const styles: any = {
     container: {
          padding: "0.5em 2em "
     },
     commentImage: {
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%"
     },
     commentData: {
          marginLeft: 20
     },
     invisibleSeparator: {
          border: "none",
          margin: 4
     },
     visibleSeparator: {
          width: "100%",
          borderBottom: "1px solid grey",
          marginBottom: "1.5em"
     },
     buttons: {
          marginTop: 10
     }
}



const Comments: React.FC<Props> = ({ comments, classes, unlikeComment, likeComment }) => {
     return (<Grid container>
          {comments.map(({ body, createdAt, userHandle, userImage, likeCount, commentId }, idx) => (
               <Fragment key={commentId}>
                    <Grid item sm={12} className={classes.container}  >
                         <Grid container>
                              <Grid item sm={2}>
                                   <img src={userImage} alt="comment" className={classes.commentImage} />
                              </Grid>
                              <Grid item sm={9}>
                                   <div className={classes.commentData}>
                                        <Typography variant={"h5"} component={NavLink} to={`/users/${userHandle}`} color="primary">
                                             {userHandle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary"   >
                                             {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant="body1"  >
                                             {body}
                                        </Typography>
                                        <div className={classes.buttons}>
                                             <CommentLikeButton commentId={commentId} likeComment={likeComment} unlikeComment={unlikeComment} />
                                             {likeCount} likes
                                        </div>
                                   </div>
                              </Grid>
                         </Grid>
                    </Grid>
                    {idx !== comments.length - 1 && <hr className={classes.visibleSeparator} />}
               </Fragment>
          ))}
     </Grid>);
}

export default connect(null, { likeComment, unlikeComment })(withStyles(styles)(Comments));