import FormModal from "../FormModal/FormModal";

const {
  formField: { firstName, lastName, address1, address2, address3 },
} = FormModal;

export default {
  [firstName.name]: "",
  [lastName.name]: "",
  [address1.name]: "",
  [address2.name]: "",
  [address3.name]: "",
};
