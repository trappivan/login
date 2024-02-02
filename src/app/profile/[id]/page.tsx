import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = ({ params }: any) => {
	console.log(params.id);
	return (
		<div className="bg-white">
			ProfilePage
			<div>{params.id}</div>
		</div>
	);
};

export default ProfilePage;
