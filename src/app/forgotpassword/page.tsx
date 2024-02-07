"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ForgotPasswordPage = () => {
	const [userEmail, setUserEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [token, setToken] = useState("");

	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, [token]);

	useEffect(() => {}, [token]);

	const sendPasswordToken = async () => {
		try {
			const data = await axios.post("/api/users/forgotpassword", {
				userEmail: userEmail,
				emailType: "RESET",
			});
			console.log(data.data);
		} catch (error: any) {
			console.log(error.response);
		}
	};
	const submitPassword = async () => {
		try {
			const data = await axios.post("/api/users/changePassword", {
				newPassword,
				token,
			});
			console.log(data.data);
		} catch (error: any) {
			console.log(error.response);
		}
	};
	console.log(userEmail);
	return (
		<div>
			<h1>FORGOT PASSWORD</h1>
			{token.length > 0 ? (
				<>
					<label>NEW PASSWORD</label>
					<input
						type="text"
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="new password"
					/>
					<label>CONFIRM NEW PASSWORD</label>
					<input
						type="text"
						placeholder="confirm new password"
						onChange={(e) => setConfirmNewPassword(e.target.value)}
					/>
					<button onClick={submitPassword}>submit password</button>
				</>
			) : (
				<>
					<label>EMAIL</label>
					<input
						type="text"
						onChange={(e) => setUserEmail(e.target.value)}
						placeholder="email"
					/>
					<button onClick={sendPasswordToken}>submit</button>
				</>
			)}
		</div>
	);
};

export default ForgotPasswordPage;
