import React from 'react' ;
import InputField from './FormFields/InputField' ;
import SelectField from './FormFields/SelectField' ;
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Typography , Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Education(props) {
  const {
    formField: {
      instituition ,
      passing_year ,
      qualification
    }
  } = props;
  const qualifications = [
    {
      value : '0',
      label : 'B.E'
    },
    {
      value : '1',
      label : 'B.Tech'
    },
    {
      value : '2',
      label : 'M.Tech'
    },
    {
      value : '3',
      label : 'B.SC '
    },
    {
      value : '4',
      label : 'M.SC '
    },
    {
      value : '5',
      label : 'BCA '
    },
    {
      value : '6',
      label : 'MCA '
    },
    {
      value : '7',
      label : 'BBA '
    },
    {
      value : '8',
      label : 'MBA'
    },
    {
      value : '9',
      label : 'Other'
    },
  ]
  return (
   <React.Fragment>
     <Typography variant ="h6" gutterBottom>
      Educational Details
     </Typography>
     <Grid container spacing ={3}>
      <Grid item xs={12} sm={6}>
          <InputField 
          name={instituition.name} 
          label={instituition.label} 
          fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
          <SelectField 
          name={qualification.name} 
          label={qualification.label} 
          data = {qualifications}
          fullWidth          
          />
      </Grid>
      <Grid item xs={12} sm={6}>
          <InputField 
          name={passing_year.name} 
          label={passing_year.label} 
          fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
          <InputField 
          name={passing_year.name} 
          label={passing_year.label} 
          fullWidth />
      </Grid>
     </Grid>
   </React.Fragment>
  )
}
