import React from 'react'
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import Post from "./Post";
import { likePost, unlikePost } from '../../redux/data-reducer';
import { Likes } from '../../redux/user-reducer';
interface Props {
     handle: string;
     image: string;
     post: {
          body: string;
          createdAt: string,
          userHandle: string,
          userImage: string,
          likeCount: number,
          commentsCount: number,
          postId: string
     };
     authenticated: boolean;
}
const PostContainer: React.FC<Props> = ({ handle, image, post, authenticated }) => (
     <Post handle={handle} image={image} post={post} authenticated={authenticated} />
)
const mapStateToProps = (state: AppState) => {
     return {
          handle: state.user.credentials.handle,
          image: state.user.credentials.imageUrl,
          likes: state.user.likes,
          authenticated: state.user.authenticated
     }
}

export default connect(mapStateToProps, { likePost, unlikePost })(PostContainer);
