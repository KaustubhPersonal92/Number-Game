import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import {browserHistory, Link} from 'react-router';

const SignUpForm = ({user, label, onSave, onChange, saving, errors}) => {
    return (
        <div>      
            <TextInput
                name="username"
                placeholder="Name"
                value={user.username}
                onChange={onChange}
                error={errors.username}
                iconClass ="glyphicon"
                iconClass2="glyphicon-user"
                spanClass="input-group-addon"
            /> 
            <TextInput
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={onChange}
                error={errors.email}
                iconClass ="glyphicon"
                iconClass2="glyphicon-envelope"
                spanClass="input-group-addon"
            />
            <TextInput
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={onChange}
                error={errors.password}
                type="password"
                iconClass ="glyphicon"
                iconClass2="glyphicon-lock"
                spanClass="input-group-addon"
            />
            <TextInput
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword}
                type="password"
                iconClass ="glyphicon"
                iconClass2="glyphicon-lock"
                spanClass="input-group-addon"
            />
            <div className="wrapper">
                <input  
                    type="submit" 
                    disabled={saving} 
                    value={saving ? 'Saving...' : 'Save'}
                    className="btn btn-primary"
                    onClick={onSave}
                />
                <Link className="btn btn-border" to="/users">
                </Link>
            </div>
        </div>
  );
};

SignUpForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default SignUpForm;
