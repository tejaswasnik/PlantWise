import express from "express";
const authRouter = express.Router();
import {
  registerController,
  loginController,
  logoutController,
  getMeController,
} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/user.validator.js";
/**
 * @access Public
 * @route POST /api/auth/register
 * @abstract This route is used to register a new user
 * @description This route is used to register a new user. It takes in the user's name, email, and password, and creates a new user in the database. If the user already exists, it returns an error. If the registration is successful, it returns a success message.
 */
authRouter.post("/register", registerValidator, registerController);

/*
 * @access Public
 * @route POST /api/auth/login
 * @abstract This route is used to login a user
 * @description This route is used to login a user. It takes in the user's email and password, and checks if the user exists in the database. If the user does not exist, it returns an error. If the user exists, it checks if the password is correct. If the password is incorrect, it returns an error. If the login is successful, it returns a success message along with a JWT token.
 */
authRouter.post("/login", loginValidator, loginController);

/**
 * @access Private
 * @route POST /api/auth/logout
 * @abstract Logout user
 */
authRouter.post("/logout", logoutController);

/**
 * @access Private
 * @route GET /api/auth/me
 * @abstract Get current user
 */
authRouter.get("/me", getMeController);

export default authRouter;