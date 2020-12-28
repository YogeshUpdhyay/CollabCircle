export default {
  formId: 'EditProfile',
  formField: {

    Name: {
      name: 'Name',
      label: 'Name',
      requiredErrorMsg: 'First name is required'
    },

    contactNo: {
      name: 'contactNo',
      label: 'Contact No',
      requiredErrorMsg: 'Required'
    },
    
    gender:{
      name : 'gender' ,
      label : 'Gender' ,
      requiredErrorMsg :'Required'
    },

    _states :{
      name : '_states' ,
      label : 'State' ,
      requiredErrorMsg :'Mention the state'
    },

    skill :{
      name : 'skill' ,
      label : 'Skills' ,
      requiredErrorMsg :'Mention your skills for stronger profile'
    },

    social_profile :{
      name : 'social_profile' ,
      label : 'Social Profile Links (Eg: LinkedIn)' ,
      requiredErrorMsg :'Mention your Social Media Profile a for stronger profile'
    },
    resume :{
      name : 'resume' ,
      label : 'Upload Resume' ,
      requiredErrorMsg :'Upload your resume'
    },
    instituition : {
      name : 'instituition' ,
      label : 'Instituition' ,
      requiredErrorMsg :'Required'
    },
    qualification : {
      name : 'qualification' ,
      label : 'Qualification' ,
      requiredErrorMsg :'Required'
    },
    passing_year : {
      name : 'passing_year' ,
      label : 'Passing Year' ,
      requiredErrorMsg :'Required'
    },
    cgpa: {
      name : 'cgpa' ,
      label : 'CGPA / Percentage' ,
      requiredErrorMsg :'Required'
    },
    title :{
      name : 'title',
      label : 'Title of the Project' ,
      requiredErrorMsg :'Required'
    },
    description : {
      name : 'description',
      label : 'Description of the Project' ,
      requiredErrorMsg :'Required'
      
    },
    start_date :{
      name: 'start_date',
      label: 'Start Date',
      requiredErrorMsg: 'Start date is required',
      invalidErrorMsg: 'Start date is not valid'
    },
    end_date :{
      name: 'end_date',
      label: 'End Date',
      requiredErrorMsg: 'End date is required',
      invalidErrorMsg: 'End date is not valid'
    }
  }
};