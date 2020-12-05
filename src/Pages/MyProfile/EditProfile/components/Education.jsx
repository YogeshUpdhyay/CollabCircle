import React from 'react' ;
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


export default function Education(props) {
  const {
    formField: {
      address1,
      address2
    }
  } = props;
  return (
   <React.Fragment>
     <Typography variant ="h6" gutterBottom>
      Educational Details
     </Typography>
     <Grid container spacing ={3}>
      <Grid item xs={12} sm={6}>
          <TextField name={address1.name} label={address1.label} fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
          <TextField name={address2.name} label={address2.label} fullWidth />
      </Grid>
     </Grid>
   </React.Fragment>
  )
}
