const express = require("express");
const { body } = require("express-validator/check");
const isAuth = require("../middleware/is-auth");
const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

//localhost:8080/auth/signup
http: router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
    body("phone").trim().isLength({ min: 10 }),
  ],
  authController.signup
);

//localhost:8080/auth/login
http: router.post("/login", authController.login);

//localhost:8080/auth/me
http: router.get("/me", isAuth, authController.getUser);

module.exports = router;
