import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import {browserHistory, Link} from 'react-router';

const SignInForm = ({user, label, onSave, onChange, saving, errors}) => {
    return (
        <div>       
            <TextInput
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={onChange}
                error={errors.email}
                iconClass ="glyphicon"
                iconClass2="glyphicon-user"
                spanClass="input-group-addon"

            />
            <TextInput
                name="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={onChange}
                error={errors.password}
                type="password"
                iconClass ="glyphicon"
                iconClass2="glyphicon-lock"
                spanClass="input-group-addon"
            />
            <div className="wrapper">
                <input  
                    type="submit" 
                    disabled={saving} 
                    value={saving ? 'Loging...' : 'Login'}
                    className="btn btn-primary"
                    onClick={onSave}
                />
            </div>
        </div>
  );
};

SignInForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default SignInForm;
