import React from 'react'
import { Likes } from '../../redux/user-reducer';
import { MyButton } from '../../util/mybtn';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import { likePost, unlikePost } from '../../redux/data-reducer';

interface Props {
     likes: Likes;
     postId: string;
     likePost(id: string): void;
     unlikePost(id: string): void;
}
const LikePost: React.FC<Props> = ({ likes, postId, likePost, unlikePost }) => (
     <>{likes.find(like => like.postId === postId) ?
          <MyButton tip="" event={() => {
               unlikePost(postId);
          }}   >
               <Favorite color="primary" />
          </MyButton> : <MyButton tip="" event={() => {
               likePost(postId);
          }}   >
               <FavoriteBorder color="primary" /> </MyButton>
     }
     </>
);

const mapStateToProps = (state: AppState) => ({
     likes: state.user.likes,
});


export default connect(mapStateToProps, { likePost, unlikePost })(LikePost); 