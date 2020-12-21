import React from 'react' ;
import { Grid, Typography } from '@material-ui/core';
import DatePickerField from '../../EditProfile/components/FormFields/DatePickerField' ;
import InputField from './FormFields/InputField' ;




export default function Profession(props) {
  const {
    formField: {
     title,
     description,
     start_date,
     end_date
    }
  } = props;
  return (
   <React.Fragment>
     <Typography variant ="h6" gutterBottom>
      Professional Details
     </Typography>
     <Grid container spacing ={3}>
     <Grid item xs={12}  sm ={6}>
          <InputField 
          name={title.name} 
          label={title.label} 
          fullWidth />
      </Grid>
      <Grid item xs={12}  sm = {6}>
          <InputField 
          name={description.name} 
          label={description.label} 
          fullWidth />
      </Grid>
      <Grid item xs={12} sm ={6} >
      <DatePickerField
            name={start_date.name}
            label={start_date.label}
            format="MM/yy"
            views={['year', 'month']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
          />
      </Grid>
      <Grid item xs={12} sm ={6}>
      <DatePickerField
            name={end_date.name}
            label={end_date.label}
            format="MM/yy"
            views={['year', 'month']}
            minDate={new Date()}
            maxDate={new Date('2050/12/31')}
            fullWidth
          />
      </Grid>
      
     </Grid>
   </React.Fragment>
  )
}
