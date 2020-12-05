import React from 'react' ;
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';



export default function Profession(props) {
  const {
    formField: {
      address3 ,
      address4
    }
  } = props;
  return (
   <React.Fragment>
     <Typography variant ="h6" gutterBottom>
      Professional Details
     </Typography>
     <Grid container spacing ={3}>
      <Grid item xs={12} sm={6}>
        <TextField name={address3.name} label={address3.label} fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField name={address4.name} label={address4.label} fullWidth />
      </Grid>
     </Grid>
   </React.Fragment>
  )
}
