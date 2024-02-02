"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});
	const router = useRouter();

	async function onLogin() {
		try {
			const data = await axios.post("/api/users/login", user);
			console.log(data);
			toast.success("Login successful");
			if (data.data.status != 400) {
				router.push(`/profile/${"abcda"}`);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	}
	return (
		<div className="flex justify-center align-center bg-white">
			<div className="flex w-1/2 flex-col border-2 border-solid border-green-500">
				<h1>LOGIN</h1>

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
				<button onClick={onLogin}>Login</button>
				<Link href="/signup"> GO TO SIGNUP</Link>
			</div>
		</div>
	);
};

export default Page;
