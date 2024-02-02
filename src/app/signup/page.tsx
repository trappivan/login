"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const router = useRouter();
	async function onSignup() {
		try {
			const response = await axios.post("/api/users/signup", user);
			console.log("Signup sucess 200", response.data);
			router.push("/login");
		} catch (error: any) {
			console.log(error);
			toast.error(error.message);
		}
	}

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.username.length > 0 &&
			user.password.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex justify-center align-center bg-white">
			<div className="flex w-1/2 flex-col border-2 border-solid border-green-500">
				<h1>LOGIN</h1>
				<label htmlFor="Username">Username</label>
				<input
					type="text"
					placeholder="username"
					onChange={(e) => {
						setUser({ ...user, username: e.target.value });
					}}
					value={user.username}
					className="border-red-900 border-1 border-solid"
				/>
				<label htmlFor="email">email</label>
				<input
					type="text"
					placeholder="email"
					onChange={(e) => {
						setUser({ ...user, email: e.target.value });
					}}
					value={user.email}
					className="border-red-900 border-1 border-solid"
				/>
				<label htmlFor="password">password</label>
				<input
					type="password"
					placeholder="password"
					onChange={(e) => {
						setUser({ ...user, password: e.target.value });
					}}
					value={user.password}
					className="border-red-900 border-1 border-solid"
				/>
				<button onClick={onSignup}>Sign Up</button>
				<Link href="/login"> GO TO LOGIN</Link>
			</div>
		</div>
	);
};

export default Page;
