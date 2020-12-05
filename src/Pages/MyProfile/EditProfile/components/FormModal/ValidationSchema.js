import * as Yup from 'yup';
import FormModal from '../FormModal/FormModal' ;

const {
  formField: {

    firstName,
    lastName,
    address1,
    address2,
    address3,
    address4 
    
  }
} = FormModal;


export default[
  Yup.object().shape({

    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [address1.name]: Yup.string().required(`${address1.requiredErrorMsg}`),
    [address2.name]: Yup.string().required(`${address2.requiredErrorMsg}`),
    [address3.name]: Yup.string().required(`${address3.requiredErrorMsg}`),
    [address4.name]: Yup.string().required(`${address4.requiredErrorMsg}`),

  })
];