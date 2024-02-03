"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
const ProfileButton = () => {
	const router = useRouter();
	const [data, setData] = useState("");

	async function Logout() {
		try {
			const response = await axios.get("/api/users/logout");

			toast.success("Logout sucessfully");

			router.push("/login");
		} catch (error: any) {
			console.log(error.message);

			toast.error(error.message);
		}
	}

	const getUserDetails = async () => {
		const res = await axios.get("/api/users/me");
		console.log(res.data);
		setData(res.data.data._id);
	};
	return (
		<div>
			<button onClick={Logout}>Logout</button>
			ProfileButton
			<h2>
				{data === "" ? (
					"nothing"
				) : (
					<Link href={`/profile/${data}`}>{data}</Link>
				)}
			</h2>
			<button onClick={getUserDetails}>GET USER DETAILS </button>
		</div>
	);
};

export default ProfileButton;
