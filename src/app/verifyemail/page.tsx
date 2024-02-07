"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VerifyEmailPage = () => {
	const [token, setToken] = useState("");
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState(false);

	const verifyUserEmail = async () => {
		try {
			await axios.post("/api/users/verifyemail", { token });

			setVerified(true);
		} catch (error: any) {
			console.log(error.response);

			setError(true);
		}
	};
	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	useEffect(() => {
		if (token.length > 0) {
			verifyUserEmail();
		}
	}, [token]);
	return (
		<div className="flex justify-center align-center bg-white">
			<div className="flex w-1/2 flex-col border-2 border-solid border-green-500">
				<h1>VERIFY EMAIL</h1>
				<h2 className="">{token ? `${token}` : "No token"}</h2>
				{verified && (
					<div>
						<h1>Email verified</h1>
						<Link href="/login">Login page</Link>
					</div>
				)}
				{error && <h1>Something went wrong</h1>}
			</div>
		</div>
	);
};

export default VerifyEmailPage;
