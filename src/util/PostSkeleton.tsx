import React from 'react'

import NoImg from "../assets/blank-profile-picture-973460_1280.png";
import { WithStyles, withStyles, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface Props extends WithStyles<typeof styles> {

}

const styles: any = {
     card: {
          display: "flex",
          marginBottom: 20,
          // position:""
     },
     cardContent: {
          width: "100%",
          flexDirection: 'column',
          padding: 25,
     },
     cover: {
          minWidth: 200,
          objectFit: "cover"
     },
     handle: {
          width: 60,
          height: 18,
          backgroundColor: "#862052",
          marginBottom: 7
     },
     date: {
          height: 14,
          width: 100,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          marginBottom: 10

     },
     fullLine: {
          height: 15,
          width: "90%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          marginBottom: 10
     },
     halfLine: {
          height: 15,
          width: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          marginBottom: 10
     }
}
export const PostSkeleton: React.FC<Props> = ({ classes }) => (
     <>
          {Array.from({ length: 5 }).map((_, idx) => {
               return <Card className={classes.card} key={idx} >
                    <CardMedia image={NoImg} title="User Image" className={classes.cover} />
                    <CardContent className={classes.cardContent}  >
                         <div className={classes.handle} />
                         <div className={classes.date} />
                         <div className={classes.fullLine} />
                         <div className={classes.fullLine} />
                         <div className={classes.halfLine} />
                    </CardContent>
               </Card>
          })}
     </>
)

export default withStyles(styles)(PostSkeleton);