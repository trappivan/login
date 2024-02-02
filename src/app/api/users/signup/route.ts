import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { username, email, password } = body;
		console.log(body);
		const user = await User.findOne({ email: email });
		if (user) {
			return NextResponse.json({
				status: 400,
				message: "Email already exists",
			});
		}
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		console.log(savedUser);
		return NextResponse.json({
			status: 201,
			message: "User created successfully",
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
