import * as Yup from 'yup';
import FormModal from '../FormModal/FormModal' ;

const {

  formField: {
    Name,
    contactNo,
    gender,
    instituition,
    qualification,
    passing_year,
    cgpa,
    _states ,
    skill,
    social_profile,
    resume,
    title ,
    description,
    start_date,
    end_date
  }

} = FormModal;


export default[

  Yup.object().shape({

    [Name.name]: Yup.string().required(`${Name.requiredErrorMsg}`),
    [contactNo.name]: Yup.string().required(`${contactNo.requiredErrorMsg}`),
    [gender.name]: Yup.string().required(`${gender.requiredErrorMsg}`),
    [skill.name]: Yup.string().required(`${skill.requiredErrorMsg}`),
    [social_profile.name]: Yup.string().required(`${social_profile.requiredErrorMsg}`),
    [resume.name]: Yup.string().required(`${resume.requiredErrorMsg}`),
    [_states.name]: Yup.string().required(`${_states.requiredErrorMsg}`),
    [instituition.name]: Yup.string().required(`${instituition.requiredErrorMsg}`),
    [qualification.name]: Yup.string().required(`${qualification.requiredErrorMsg}`),
    [passing_year.name]: Yup.string().required(`${passing_year.requiredErrorMsg}`),
    [cgpa.name]: Yup.string().required(`${cgpa.requiredErrorMsg}`),
    [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
    [description.name]: Yup.string().required(`${description.requiredErrorMsg}`),
    
  })
];