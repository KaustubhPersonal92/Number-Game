import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import SignUpForm from './SignUpForm';
import {browserHistory, Link} from 'react-router';
import toastr from 'toastr';
import validateInput from '../common/validations/userValidation';


export class SignUPPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user:{
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {},
      saving: false
    };
    this.onChangeUserState = this.onChangeUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state.user);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onChangeUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  saveUser(event) {
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.actions.addUsers(this.state.user).then(response=>{
        if(response.data.status ==200) {
          this.redirect(response.data.message, "success");
        } else {
          this.redirect(response.data.message, "failed");
        }
      }) 
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
    }
  }

  redirect(message, status) {
    if(status ==='success') {
      toastr.success(message);
      browserHistory.push('/login');
    } else {
      toastr.error(message);
    }
  }
  render() {
    return (
      <div className="row">
          <div className="Absolute-Center is-Responsive">
            <div className="form-group text-center">
              <a>User Registartion</a>
            </div>
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <SignUpForm
                user={this.state.user}
                onChange={this.onChangeUserState}
                errors={this.state.errors}
                onSave={this.saveUser}
              />
            </div>
          </div>
      </div>
    );
  }
}

SignUPPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/*function mapStateToProps(state, ownProps) {
  userId = ownProps.params.id;
  
  let user = {
    firstname: '', 
    lastname: '', 
    email: '', 
    phone:'',
    timezone:'', 
    role_id: ''
  };

  return {
    user: user,
    role: userRoleFormattedForDropdown(state.UserRole),
    timezoneList: timezoneFormattedForDropdown(state.TimezoneList)
  }
}*/

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect("", mapDispatchToProps)(SignUPPage);
