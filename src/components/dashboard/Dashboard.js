import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import {browserHistory, Link} from 'react-router';
import toastr from 'toastr';
import validateInput from '../common/validations/signInValidation';
import NumberForm from './NumberForm';
import NumberList from './NumberList';

export class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInputs:{
        arraySize: '',
        arrayType: '',
        arrayValue: ''
      },
      userArray:[],
      errors: {}
    };
    this.onChangeUserState = this.onChangeUserState.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.createArray = this.createArray.bind(this);
    this.logout = this.logout.bind(this);
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
    let user = this.state.userInputs;
    user[field] = event.target.value;
    return this.setState({userInputs: user});
  }

  saveUser(event) {
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.actions.signInUsers(this.state.user).then(response=>{
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
      browserHistory.push('/dashboard');
    } else {
      toastr.error(message);
    }
  }

  createArray() {
    if(this.state.userInputs.arrayType =='single') {
      var length = parseInt(this.state.userInputs.arraySize); // user defined length
      let userArray= this.state.userArray;
      for(var i = 0; i < length; i++) {
        userArray[i] = prompt('Enter values ' + (i+1));
      }
      userArray.sort();
      this.setState({userArray});
    }
    var username = localStorage.getItem("username");
    console.log(username)
    this.props.actions.sendResultToUser(this.state.userArray, username).then(response=>{
      if(response.data.status ==200) {
        this.redirect(response.data.message, "success");
      } else {
        this.redirect(response.data.message, "failed");
      }
    }).catch(error => {
      toastr.error(error);
    });
  }

  redirect(message, status) {
    if(status ==='success') {
      toastr.success(message);
    } else {
      toastr.error(message);
    }
  }

  logout() {
    localStorage.clear("username");
    browserHistory.push('/login');

  }
  render() {
    return (
      <div>
        <div className="navbar-wrapper">
          <div className="container">
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>                        
                  </button>
                  <a className="navbar-brand" href="#">Welcome {localStorage.getItem("username")}</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#"></a></li>
                    <li><a onClick={this.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="Absolute-Center is-Responsive">
            <div className="col-sm-12 col-md-10 col-md-offset-1">
              <NumberForm
                onChange={this.onChangeUserState}
                userInput={this.state.userInputs}
                createArray= {this.createArray}
              />
            </div>
          </div>
        </div>
        <div className="container"> 
          <NumberList
            numberList={this.state.userArray}
          />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
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

export default connect("", mapDispatchToProps)(Dashboard);
