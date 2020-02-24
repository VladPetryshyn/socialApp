import React, { useState } from 'react'
import { WithStyles, withStyles, Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import { addCommentAC } from '../../redux/data-reducer';
import { UiState, } from '../../redux/ui-reducer';
import TextField from '@material-ui/core/TextField';

interface Props extends WithStyles<typeof styles> {
     ui: UiState,
     authenticated: boolean;
     postId: string;
     addCommentAC(postId: string, text: string): void;
}

const styles: any = {
     button: {
          marginTop: "1em"
     }
};

interface State {
     body: string;
     errors: null | {
          comment: string
     }
}

const CommentForm: React.FC<Props> = ({ classes, authenticated, addCommentAC, postId, ui: { errors } }) => {
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          addCommentAC(postId, state.body);
          setState(prevState => ({ ...prevState, body: "" }));
     }
     const [state, setState] = useState<State>({ errors: null, body: "" });
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setState({ ...state, body: e.target.value });
     }
     const commentFormMarkup = authenticated ? <Grid item sm={12} style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
               <TextField name="body" type="text" label="Comment" helperText={errors!.comment} error={!!errors!.comment} value={state.body} onChange={handleChange} fullWidth className={classes.textField} />
               <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Add
               </Button>
          </form>
          <hr className={classes.visibleSeparator} />
     </Grid> : null

     return commentFormMarkup;
}

const mapStateToProps = (state: AppState) => ({
     ui: state.ui,
     authenticated: state.user.authenticated
})



export default connect(mapStateToProps, { addCommentAC })(withStyles(styles)(CommentForm));