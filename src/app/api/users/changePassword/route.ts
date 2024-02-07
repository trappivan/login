import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		console.log("reqBody", reqBody);
		const { newPassword, token } = reqBody;
		console.log(newPassword, token);
		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiration: { $gt: Date.now() },
		});
		console.log(user);
		if (!user) {
			return NextResponse.json(
				{ error: "Token is invalid or has expired" },
				{ status: 400 }
			);
		}

		const validPassword = await bcryptjs.compare(newPassword, user.password);
		console.log("validPassword ", validPassword);
		if (validPassword) {
			return NextResponse.json({
				error: "Password cannot be the same as the old password",
				status: 400,
			});
		}
		user.password = await bcryptjs.hash(newPassword, 10);
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiration = undefined;

		await user.save();

		return NextResponse.json({
			message: "Password changed successfully",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
