const express = require("express");
const app = express();
const OtpAuth = require("../models/otpAuth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const otpGenerator = require("otp-generator");

const { sendSMS } = require("./smsController");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const cookieParser = require("cookie-parser");
app.use(cookieParser());


// route - http://localhost:5000/user/signin
const signIn = async (req, res) => {
  const Email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: Email }, async function (err, doc) {
    if (doc) {
      return res.status(400).send({
        msg: "This Email ID is already registered. Try Signing In instead!",
      });
    } else {
      try {
        const newUserLogin = new User({
          email: Email,
          password: password,
        });

        await newUserLogin.save();

        return res.status(200).send({ msg: "Sign-In successful!" });
      } catch (error) {
        console.log("Error:", error);
        return res.status(500).send({ msg: "Internal Server Error" });
      }
    }
  });
};


// route - http://localhost:5000/user/signin/verify
const verifyLogin = async (req, res) => {
    const Email = req.body.email;
    const Password = req.body.password;
  
    User.findOne({ email: Email }, async function (err, user) {
        if (!user) {
            return res.status(400).send({ msg: "Invalid email or password!" });
        } else {
            // Compare the plain-text password with the stored password
            if (user.password !== Password) {
                return res.status(400).send({ msg: "Invalid email or password!" });
            }
  
            const secret = JWT_SECRET;
            const payload = {
                email: req.body.email,
                password: req.body.password,
            };
            const token = jwt.sign(payload, secret);
            res.status(200).send({
                msg: "Sign-In successful!",
                user_id: token, // Include user_id in the response
            });
        }
    });
};


// route - http://localhost:5000/user/signup
const signUp = async (req, res) => {
    const Email = req.body.email;
    const Password = req.body.password;

    //validating whether user already exists or not
    User.findOne({ email: Email }, async function (err, doc) {
        if (doc) {
            return res.status(400).send({
                msg: "This Email ID is already registered. Try Signing In instead!",
            });
        } else {
            try {
                // Clearing otp auth table
                await OtpAuth.deleteMany({ email: Email, password: Password });

                // Generate OTP for new user
                const OTP = otpGenerator.generate(6, {
                    digits: true,
                    upperCaseAlphabets: false,
                    specialChars: false,
                    lowerCaseAlphabets: false,
                });

                const otp = {
                    email: Email,
                    password: Password,
                    otp: OTP,
                };

                console.log("Before hashing: ", otp);

                // Send OTP via SMS
                sendSMS(Email, Password, otp.otp);

                // Encrypting the OTP and then saving to Otp_table
                const salt = await bcrypt.genSalt(10);
                otp.otp = await bcrypt.hash(otp.otp, salt);

                const newUserLogin = new OtpAuth({
                    email: otp.email,
                    password: otp.password,
                    otp: otp.otp,
                });

                newUserLogin.save((error, success) => {
                    if (error) console.log(error);
                    else console.log("Saved::otp::ready for validation");
                });

                return res.status(200).send({ msg: "Otp sent successfully!" });
            } catch (error) {
                console.log("Error:", error);
                return res.status(500).send({ msg: "Internal Server Error" });
            }
        }
    });
};

// route - http://localhost:5000/user/signup/verify
const verifyOtp = async (req, res) => {
  const number = req.body.contactNumber;
  const inputOtp = req.body.otp;
  const Email = req.body.email;
  const name = req.body.username;
  const Password = req.body.password;

  try {
    const otpAuth = await OtpAuth.findOne({ email: Email, password: Password });
    if (!otpAuth) {
      return res.status(400).send("The OTP expired. Please try again!");
    }

    const generatedOtp = otpAuth.otp;
    const validUser = await bcrypt.compare(inputOtp, generatedOtp);

    if (validUser) {
      const secret = JWT_SECRET;
      const payload = {
        email: req.body.email,
        password: req.body.password,
      };
      const token = jwt.sign(payload, secret);

      const newUser = new User({
        user_token: token,
        username: name,
        password: Password,
        email: Email,
        contactNumber: number,
      });

      await newUser.save();

      await OtpAuth.deleteMany({ email: Email, password: Password });

      return res.status(200).send({
        msg: "Account creation successful! Redirecting to Dashboard.",
        user_id: token,
      });
    } else {
      return res
        .status(400)
        .send({ msg: "OTP does not match. Please try again!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  signIn,
  verifyLogin,
  signUp,
  verifyOtp,
};
