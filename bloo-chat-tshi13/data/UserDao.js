const User = require("../model/User");
const ApiError = require("../model/ApiError");
const { hashPassword } = require("../util/hashing");

class UserDao {
  async create({ uname, password }) { //create new username and password in database
    if (uname === undefined || uname === "") {
      throw new ApiError(400, "Every user must have a uname!");
    }

    if (password === undefined || password === "") {
      throw new ApiError(400, "Every user must have a password!");
    }

    const find_user = await User.findOne({ uname });
    if (find_user != null) {
      throw new ApiError(400, "Username already exists!")
    }

    const hash = await hashPassword(password); //hashpassword
    const user = await User.create({ uname, password: hash }); //store in database
    return user;
  }

  // returns user info with uname, null if no user matches the search query
  async readOne(uname) {
    const user = await User.findOne({ uname });
    return user;
  } 
}

module.exports = UserDao;
