import React from 'react' ;
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import formField from '../components/FormModal/FormModal.js' ;


export default function Basic(props) {
  const {
    formField: {
      firstName,
      lastName
    }
  } = props;

  return (
   <React.Fragment>
     <Typography variant ="h6" gutterBottom>
      Basic Details
     </Typography>
     <Grid container spacing ={3}>
      <Grid item xs={12} sm={6}>
          <TextField name={firstName.name} label={firstName.label} fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
          <TextField name={lastName.name} label={lastName.label} fullWidth />
      </Grid>
     </Grid>
   </React.Fragment>
  )
}
