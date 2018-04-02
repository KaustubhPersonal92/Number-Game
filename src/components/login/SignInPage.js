import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import SignInForm from './SignInForm';
import {browserHistory, Link} from 'react-router';
import toastr from 'toastr';
import validateInput from '../common/validations/signInValidation';


export class SignUPPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user:{
        email: '',
        password: ''
      },
      errors: {},
      saving: false
    };
    this.onChangeUserState = this.onChangeUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.userAuthenicate();
  }

  userAuthenicate() {
    if(localStorage.getItem("username")!=null) {
      browserHistory.push('/dashboard')
    } else {
      browserHistory.push('/login');
    }
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
      this.props.actions.signInUsers(this.state.user).then(response=>{
        if(response.data.status ==200) {
          localStorage.setItem("username",response.data.data.username);
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
      browserHistory.push('/dashboard');
    } else {
      toastr.error(message);
    }
  }
  render() {
    return (
      <div className="row">
          <div className="Absolute-Center is-Responsive">
            <div className="form-group text-center">
              <a>User Login</a>
            </div>
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <SignInForm
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
