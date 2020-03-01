import React from 'react'
import { withStyles, WithStyles, Link, Typography, Button, } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root-reducer';
import { User, setPicture, logOutUser } from '../../redux/user-reducer';
import { Paper } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LocationOn, Public, CalendarToday, Edit, ExitToApp, Cake } from '@material-ui/icons';
import EditDetails from "./EditDetails";
import dayjs from 'dayjs';
import { MyButton } from '../../util/mybtn';
import ProfileSkeleton from '../../util/ProfileSkeleton';


interface Props extends WithStyles<any> {
     user: User;
     loading: boolean;
     authenticated: boolean;
     setPicture(formData: FormData): void;
     logOutUser(): void;
}

const styles: any = {
     paper: {
          padding: 20,
          background: "#330417b6",
     },
     profile: {
          '& .image-wrapper': {
               textAlign: 'center',
               position: 'relative',
               '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '75%'
               }
          },
          '& .profile-image': {
               width: 200,
               height: 200,
               objectFit: 'cover',
               maxWidth: '100%',
               borderRadius: '50%'
          },
          '& .profile-details': {
               textAlign: 'center',
               '& span, svg': {
                    verticalAlign: 'middle'
               },
               '& a': {
                    color: '#862052'
               }
          },
          '& hr': {
               border: 'none',
               margin: '0 0 10px 0'
          },
          '& svg.button': {
               '&:hover': {
                    cursor: 'pointer'
               }
          }
     },
     buttons: {
          textAlign: 'center',
          '& a': {
               margin: '20px 10px'
          }
     }
};

const Profile: React.FC<Props> = ({ classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, }, loading, authenticated, setPicture, logOutUser }) => {

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const image = e!.target!.files![0];
          const formData = new FormData();
          formData.append("image", image, image.name);
          console.log(formData);
          setPicture(formData);
     };
     const handleEditPicture = () => {
          const fileInput = document.getElementById("image-upload");
          if (fileInput) fileInput.click();
     };
     const logOut = () => {
          logOutUser();
     }
     const profileMarkup = !loading ? (authenticated ? <Paper className={classes.paper}>
          <div className={classes.profile}    >
               <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                    <input type="file" hidden={true} name="image" id="image-upload" onChange={handleChange} accept=".jpg,.jpeg"  />
                    <MyButton tip="Edit profile photo" event={handleEditPicture} className="button" >
                         <Edit color="primary" />
                    </MyButton>
               </div>
               <hr />
               <div className="profile-details">
                    <Link variant="h5" color="primary" component={NavLink} to={`/users/${handle}`}>
                         {handle}
                    </Link>

                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (<> <LocationOn color="primary" /> <span>{location}</span> <hr /></>)}
                    {website && (
                         <>
                              <Public color="primary" /> <a href={website} target="_blank" rel="noopener noreferrer" >{website}</a>
                              <hr />
                         </>
                    )}
                    <Cake color="primary" />
                    <span> Cake day: {dayjs(createdAt).format("MMM YYYY ")}</span>
               </div>
               <MyButton event={logOut} tip="Log out" >
                    <ExitToApp color={"primary"} />
               </MyButton>
               <EditDetails />
          </div>
     </Paper> : (<Paper className={classes.paper}>
          <Typography variant="body1" align="center">
               You aren't logined.
          </Typography>
          <div className={classes.buttons}>
               <Button variant="contained" color="primary" component={NavLink} to="/login" >
                    login
          </Button>
               <Button variant="contained" color="secondary" component={NavLink} to="/signup">
                    sign up
                    </Button>
          </div>

     </Paper>)) : <ProfileSkeleton />
     return (profileMarkup);
};


const mapStateToProps = (state: AppState) => ({
     user: state.user,
     loading: state.user.loading,
     authenticated: state.user.authenticated
});



export default connect(mapStateToProps, { setPicture, logOutUser })(withStyles(styles)(Profile));