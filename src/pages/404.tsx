import React from "react";
import { NavLink } from "react-router-dom";
import Card from '@material-ui/core/Card';
import { CardContent, Grid } from "@material-ui/core";
interface Props { }
export const NotFound: React.FC<Props> = () => (
   <Grid container>
      <Grid item sm={4} xs={12}>
         <Card style={{ background: "#330417b6" }}>
            <CardContent>
               <h1>Page isn't found</h1>
               <p>
                  404 this page is not found <NavLink to="/" style={{ color: "red" }}>Home</NavLink>
               </p>
            </CardContent>
         </Card>
      </Grid>
   </Grid>
);
