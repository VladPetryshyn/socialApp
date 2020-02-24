import { WithStyles } from '@material-ui/core';
import { styles } from './DeletePost';
export interface Props extends WithStyles<typeof styles> {
     postId: string;
     deletePost(postId: string): void;
}
