import user from '../mockDB/userModel';
import tokenizer from '../helper/jwt-token';

class UserController {
  static signup(req, res) {
    // creates a mock object
    const userEntry = {};
    let isExisting;

    // validate user input
    if (req.body.firstName !== '' && req.body.lastName !== '' && typeof req.body.email === 'string') {
      // check if user already exists
      user.forEach((userObj) => {
        if (userObj.email === req.body.email) {
          isExisting = true;
        }
      });

      if (!isExisting) {
        // set user entry object properties with values
        userEntry.id = user.length + 1;
        userEntry.firstName = req.body.firstName;
        userEntry.lastName = req.body.lastName;
        userEntry.password = req.body.password;
        userEntry.email = req.body.email;
        userEntry.role = req.body.role;

        // push to mock db
        user.push(userEntry);

        // generate token
        const tokenObj = {
          token: tokenizer(),
        };

        // send response to clientside
        return res.status(201).json({
          status: 201,
          data: tokenObj,
        });
      }
      // send response to clientside
      return res.status(400).json({
        status: 400,
        error: 'user exist already',
      });
    }
    // send response to clientside
    return res.status(400).json({
      status: 400,
      error: 'enter valid credentials',
    });
  }

  static login(req, res) {
    let isUserExisting;

    // validate user input
    if (req.body.email !== '' && req.body.password !== '' && typeof req.body.email === 'string') {
      const { email } = req.body;
      const { password } = req.body;

      // check if the user exists
      user.forEach((userObj) => {
        if (email === userObj.email && password === userObj.password) {
          isUserExisting = true;
        }
      });

      if (isUserExisting) {
        // generate token
        const tokenObj = {
          token: tokenizer(),
        };
        // send response to clientside
        return res.status(200).json({
          status: 200,
          data: tokenObj,
        });
      }
      // send response to clientside
      return res.status(404).json({
        status: 404,
        error: 'user does not exist',
      });
    }
    // send response to clientside
    return res.status(400).json({
      status: 400,
      error: 'enter valid credentials',
    });
  }
}

export default UserController;
