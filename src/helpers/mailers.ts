import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		// create a hashed token
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);
		console.log("no helper", email, emailType, userId, hashedToken);
		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiration: Date.now() + 3600000,
			});
		}
		var transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.LOGIN_TRAPMAILER,
				pass: process.env.PASSWORD_TRAPMAILER,
			},
		});

		const mailOptions = {
			from: "ivanzao@gmail.com",
			to: email,
			subject:
				emailType === "VERIFY" ? "Verify your email" : "Reset your password",
			html: `<p>${
				emailType === "VERIFY" ? "Verify your email" : "Reset your password"
			} by clicking on the link below</p>
            <a href="${process.env.DOMAIN}/${
				emailType === "VERIFY" ? "verifyemail" : "forgotpassword"
			}?token=${hashedToken}">CLICK HERE</a> or copy and paste the link below in your browser <br> ${
				process.env.DOMAIN
			}/${
				emailType === "VERIFY" ? "verifyemail" : "forgotpassword"
			}?token=${hashedToken}`,
		};

		const mailResponse = await transport.sendMail(mailOptions);

		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
