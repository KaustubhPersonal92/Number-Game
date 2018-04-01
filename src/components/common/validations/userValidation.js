import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {

  let errors = {};
  
  if (Validator.isNull(data.username)) {
    errors.username = 'Name is Required';
  }

  if (Validator.isNull(data.email)) {
    errors.email = 'Email is required';
  }
  else if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (Validator.isNull(data.password)) {
    errors.password = 'Password is required';
  }

  if (Validator.isNull(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password is required';
  }

  else if(data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Password and Confirm Password should be matched';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
