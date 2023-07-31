const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounts = 10;
const jwt = require("jsonwebtoken");
require('dotenv').config()
const {
  validTitle,
  validName,
  validMobile,
  validemail,
  validPassword,
  isValidStreet,
  isValidPincode,
} = require("../validation/validation");

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Are ! All fields is mandatory" });

    const { title, name, phone, email, password, address } = data;

    if (address) {
      var { street, city, pincode } = address;
    }

    //validation
    if (!title)
      return res.status(400).send({ status: false, message: "title is required" });
    if (!name)
      return res.status(400).send({ status: false, message: "name is required" });
    if (!phone)
      return res.status(400).send({ status: false, message: "phone is required" });
    if (!email)
      return res.status(400).send({ status: false, message: "email is required" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    if (address) {
      if (typeof address != "object")
        return res
          .status(400)
          .send({ status: false, message: "address must be type object" });
    }

    const duplicateMobile = await userModel.findOne({ phone });
    if (duplicateMobile)
      return res
        .status(400)
        .send({ status: false, message: "phone number is already registred" });
    const duplicateEmail = await userModel.findOne({ email });
    if (duplicateEmail)
      return res
        .status(400)
        .send({ status: false, message: "Email is already registred" });

    //regex validation
    if (!validTitle(title))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid title" });
    if (!validName(name))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid Name" });
    if (!validMobile(phone))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid phone number" });
    if (!validemail(email))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid email" });
    if (!validPassword(password))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid password min len 8 & Max len 15" });

    if (address) {
      if (street) {
        if (!isValidStreet(street))
          return res
            .status(400)
            .send({ status: false, message: "Enter a valid street" });
      }

      if (city) {
        if (!validName(city)) {
          return res
            .status(400)
            .send({ status: false, message: "Enter a valid city" });
        }
      }

      if (pincode) {
        if (!isValidPincode(pincode)) {
          return res
            .status(400)
            .send({ status: false, message: "Enter a valid pincode" });
        }
      }
    }

    const salt = await bcrypt.genSalt(saltRounts);
    const HassPassword = await bcrypt.hash(password, salt);
    req.body["password"] = HassPassword;

    const dataStore = await userModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "UserCreate successfully", data: dataStore });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: err.message, msg: "server error" });
  }
};

const loginUser = async function (req, res) {
  try {
    email = req.body.email;
    password = req.body.password;

    //===============================================user email  id is requires===================================================//
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email id is required" });

    //=================================================Password is required ======================================================//
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    //==============================================checking the email id or password is exist or not ===========================//

    let getUser = await userModel
      .findOne({ email: email })
      .select({ password: 1 , name : 1});

    //================================================User not found==============================================================//
    if (!getUser)
      return res.status(404).send({ status: false, message: "User not found" });

    //========================================password matching by bcrypt.compare method password comeparing ==================================//
    const matchPassword = await bcrypt.compare(password, getUser.password);

    if (!matchPassword)
      return res
        .status(401)
        .send({ status: false, message: "Password is incorrect" });

    let Payload = {
      userId: getUser._id,
      EmailID: getUser.email,
      Batch: "lithium",
      Group: "40",
      Project: "project-booksManagementementGroup40",
    };

    const token = jwt.sign(Payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res
      .status(200)
      .send({
        message: "token is successfully generated",
        token: token,
        userId : getUser._id,
        username : getUser.name
      });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: error.message, msg: "server error" });
  }
};

module.exports = { registerUser, loginUser };

//done
