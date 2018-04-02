import UserApi from '../api/userApi';
import cookies from 'react-cookie';
import {createStore} from 'redux';
import toastr from 'toastr';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';


export function addUsers(user) {
	return function (dispatch, getState) {
    return UserApi.addUserApi(user).then(response => {
      return response;
    }).catch(error => {
      console.log(error)
    });
  };
}


export function signInUsers(userData) {
	return function (dispatch, getState) {
    return UserApi.signInApi(userData).then(response => {
      return response;
    }).catch(error => {
      console.log(error)
    });
  };
}

export function sendResultToUser(userResult, username, email) {
  return function (dispatch, getState) {
    return UserApi.sendResultApi(userResult, username, email).then(response => {
      return response;
    }).catch(error => {
      console.log(error)
    });
  };
}
