import axios from 'axios';

class UserApi {

  static addUserApi(user) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:3061/api/site/addUser", user).then(function(response) {
        console.log(response)
        if(response.data.status == 200) {
          resolve(response);
        }
        else {
          resolve(response);
        }
      })
    });
  }

  static signInApi(user) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:3061/api/site/login", user).then(function(response) {
        if(response.data.status == 200) {
          resolve(response);
        }
        else {
          resolve(response);
        }
      })
    });
  }

  static sendResultApi(userResult, username, email) {
    var data ={
      "username": username,
      "result": userResult, 
      "email": email
    }
    console.log("data--", data)
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:3061/api/site/sendEmail", data).then(function(response) {
        if(response.data.status == 200) {
          resolve(response);
        }
        else {
          resolve(response);
        }
      })
    });
  }
  
}

export default UserApi;
