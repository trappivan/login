import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Provide a username"],
		unique: [true, "Username already taken"],
	},
	email: {
		type: String,
		required: [true, "Provide an email"],
		unique: [true, "Email already taken"],
	},
	password: {
		type: String,
		required: [true, "Provide a password"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: String,
	forgotPasswordTokenExpiration: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
