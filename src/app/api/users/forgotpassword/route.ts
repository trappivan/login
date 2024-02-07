import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailers";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const req = await request.json();
		const { userEmail, emailType } = req;

		console.log(userEmail, emailType);

		const user = await User.findOne({ email: userEmail });

		console.log(user);

		if (!user) {
			return NextResponse.json(
				{ error: "User with the provided email does not exist" },
				{ status: 400 }
			);
		}

		await sendEmail({
			email: userEmail,
			emailType: emailType,
			userId: user._id,
		});

		return NextResponse.json({
			message: "Email sent successfully",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
