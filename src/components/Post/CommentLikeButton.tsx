import React from 'react'
import { commentLikes } from '../../redux/user-reducer';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { MyButton } from '../../util/mybtn';

interface Props {
     likes: commentLikes
     commentId: string
     likeComment(commentId: string): void;
     unlikeComment(commentId: string): void
}
export const CommentLikeButton: React.FC<Props> = ({ likes, commentId, likeComment, unlikeComment }) => {
     console.log(likes, commentId);
     return <>{likes.find(like => like.commentId === commentId) ?
          <MyButton tip="" event={() => {
               unlikeComment(commentId);
          }}   >
               <Favorite color="primary" />
          </MyButton> : <MyButton tip="" event={() => {
               likeComment(commentId);
          }}   >
               <FavoriteBorder color="primary" /> </MyButton>
     }
     </>
}

const mapStateToProps = (state: AppState) => ({
     likes: state.user.commentLikes
});


export default connect(mapStateToProps)(CommentLikeButton);