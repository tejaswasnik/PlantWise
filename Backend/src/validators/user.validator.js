import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: "Validation failed",
			errors: errors.array(),
		});
	}

	next();
};

const registerValidator = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ max: 100 })
		.withMessage("Name must be 100 characters or fewer"),
	body("email")
		.trim()
		.isEmail()
		.withMessage("A valid email is required")
		.normalizeEmail(),
	body("password")
		.isString()
		.withMessage("Password must be a string")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 8 characters"),
	handleValidationErrors,
];

const loginValidator = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("A valid email is required")
		.normalizeEmail(),
	body("password")
		.isString()
		.withMessage("Password must be a string")
		.notEmpty()
		.withMessage("Password is required"),
	handleValidationErrors,
];

export { registerValidator, loginValidator };
