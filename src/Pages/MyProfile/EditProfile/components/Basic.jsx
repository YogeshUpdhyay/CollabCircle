import React from 'react' ;
import InputField from './FormFields/InputField' ;
import SelectField from './FormFields/SelectField' ;
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Typography , Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleFileUpload } from 'formik-material-ui';
import {Field} from 'formik';
import '../EditProfile.css' ;
import FormModal from './FormModal/FormModal.js' ;



const useStyles = makeStyles((theme) => ({

  root: {
    width: 700,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },

    Field :{
      padding : theme.spacing(3,0,5)
    }
  },
}))

export default function Basic(props) {

  const classes = useStyles();
  
  const {
    formField: {                   
      Name,
      contactNo,
      gender,
      _states,
      skill,
      social_profile,
      resume
    },
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid
  } = props;

  const genders = [
    {
      value : 'undefined',
      label : 'Choose not to disclose'
    } ,
    {
      value : '1' ,
      label : 'Male'
    } ,
    {
      value : '2' ,
      label : 'Female'
    } ,
    {
      value : '3' ,
      label : 'Other'
    } 
  ] ;

 const indian_states = [

    {
    value : '0' ,
    label: "Andaman and Nicobar Islands"
    },
    {
      value : '1' , 
      label: "Andhra Pradesh"
    },
    {
      value : '2' , 
      label : "Arunachal Pradesh"
    },
    {
      value: '3',
      label: "Assam"
    },
    {
      value : '4',
      label: "Bihar"
    },
    {
      value: '4',
      label: "Chandigarh"
    },
    {
      value: '4',
      label : "Chhattisgarh"
    },
    {
      value: '5',
      label: "Dadra and Nagar Haveli"
    },
    {
      value: "6",
      label: "Daman and Diu"
    },
    {
      value: '7',
      label: "Delhi"
    },
    {
      value: '8',
      label : "Goa"
    },
    {
      value: '9',
      label : "Gujarat"
    },
    {
      value: '10',
      label: "Haryana"
    },
    {
      value : '9',
      label : "Himachal Pradesh"
    },
    {
      value: '10',
      label: "Jammu and Kashmir"
    },
    {
      value: '11',
      label: "Jharkhand"
    },
    {
      value : '12',
      label: "Karnataka"
    },
    {
      value: '13',
      label: "Kerala"
    },
    {
      value: '14',
      label: "Lakshadweep"
    },
    {
      value: '15',
      label: "Madhya Pradesh"
    },
    {
      value: '16',
      label: "Maharashtra"
    },
    {
      value: '17',
      label: "Manipur"
    },
    {
      value : '18',
      label : "Meghalaya"
    },
    {
      value : '19',
      label : "Mizoram"
    },
    {
      value: '20',
      label : "Nagaland"
    },
    {
      value : '21',
      label: "Odisha"
    },
    {
      value: '22',
      label: "Puducherry"
    },
    {
      value: '23',
      label: "Punjab"
    },
    {
      value : '24',
      label : "Rajasthan"
    },
    {
      value : '25',
      label : "Sikkim"
    },
    {
      value : '26',
      label : "Tamil Nadu"
    },
    {
      value : '27',
      label : "Telangana"
    },
    {
      value : '27',
      label: "Tripura"
    },
    {
      value: '28',
      label : "Uttar Pradesh"
    },
    {
      value : '29',
      label : "Uttarakhand"
    },
    {
      value : '30',
      label: "West Bengal"
    }
 ];
 const skills = [

   {
     value : '0',
     label : 'Java' 
   },
   {
    value : '1',
    label : 'JavaScript' 
   },
   {
     value : '2' ,
     label :'Python'
   },
   {
     value : '3',
     label : 'C++'
   }

 ];
  return (
   <React.Fragment>
     <Typography variant ="h6" gutterBottom>
      Basic Details
     </Typography>
     <Grid container spacing ={3}>
      <Grid item xs={12} sm={6}>
        <InputField name={Name.name} label={Name.label} fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
          <InputField name={contactNo.name} label={contactNo.label} fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectField 
          name={gender.name} 
          label={gender.label}
          data = {genders}
          fullWidth
        />    
      </Grid>
      <Grid item xs={12} sm={6}>
      <SelectField 
          name={_states.name} 
          label={_states.label}
          data = {indian_states}
          fullWidth
        />
      </Grid>

      <Grid item xs ={12} sm ={6} className = {classes.root}>
      <Autocomplete
        multiple
        options={skills}
        getOptionLabel={(option) => option.label}
        defaultValue={[skills[2]]}
        renderInput={(params) => (
          <InputField
            {...params}
            variant="standard"
            name={skill.name} 
            label={skill.label}
            data = {skills}
            fullWidth
            
          />
        )}
      />
      </Grid>

      <Grid item xs={12} sm={6}>
        <InputField
          name={social_profile.name}
          label={social_profile.label} 
          fullWidth />
      </Grid>

      <Grid item xs={12} sm ={6}  className = {classes.Field}>
      <Field 
        component={SimpleFileUpload} 
        name={resume.name}
        label={resume.label} 
        fullWidth       
      />;
      </Grid>
      
  


     </Grid>
    
   </React.Fragment>
  )
}

