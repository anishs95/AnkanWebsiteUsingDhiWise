const authenticate = require("../http-common").authenticate;

class AuthenticateService {

  authenticate(payload) {
    return authenticate.post("", payload);
  }
}

export default new AuthenticateService();
