import React from 'react'
import { withStyles, WithStyles, Link, Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LocationOn, Public, CalendarToday } from '@material-ui/icons';
import dayjs from 'dayjs';
import { User } from '../../pages/user';
import ProfileSkeleton from '../../util/ProfileSkeleton';

interface Props extends WithStyles<any> {
     user: User;
     loading: boolean;
}

const styles: any = {
     paper: {
          padding: 20,
          background: "#330417b6"
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
const StaticProfile: React.FC<Props> = ({ classes, user: { handle, createdAt, imageUrl, bio, website, location }, loading, }) => {
     const profileMarkup = !loading ? <Paper className={classes.paper}>
          <div className={classes.profile}>
               <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
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
                    <CalendarToday color="primary" />
                    <span>With us from {dayjs(createdAt).format("MMM YYYY ")}</span>
               </div>
          </div>
     </Paper> : <ProfileSkeleton />;
     return (profileMarkup);
};



export default withStyles(styles)(StaticProfile);