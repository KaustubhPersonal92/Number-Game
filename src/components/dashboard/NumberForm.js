import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import {browserHistory, Link} from 'react-router';

const NumberForm = ({onChange, userInput, createArray}) => {
  return (
    <div>       
      <TextInput
        name="arraySize"
        placeholder="Enter Array size"
        labelName="Enter array size"
        value={userInput.arraySize}
        onChange={onChange}
        type="number"
      />
      <label>Select Array Type</label>
      <select onChange={onChange} name="arrayType" value={userInput.arrayType}>
        <option value="">Select array type</option>
        <option value="single">Single</option>
      </select>
      <br/>
      <br/>
      <input  
        type="submit" 
        value="Submit"
        className="btn btn-primary"
        onClick={createArray}
      />
    </div>
  );
};

NumberForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default NumberForm;
