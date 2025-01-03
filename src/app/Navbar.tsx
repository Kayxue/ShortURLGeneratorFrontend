/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false); // 管理登入狀態
	const [username, setUsername] = useState(""); // 儲存用戶名

	const checkLogin = async () => {
		try {
			const response = await fetch("https://shorturlprojectbackend.fly.dev/user/profile", {
				credentials: "include",
			});
			if (!response.ok) setIsLoggedIn(false);
			else setIsLoggedIn(true);
			const name = (await response.json()).name;
			setUsername(name);
		} catch (err) {
			setIsLoggedIn(false);
		}
	};

	useEffect(() => {
		checkLogin();
	},[]);

	const handleLogout = async () => {
		const response = await fetch("https://shorturlprojectbackend.fly.dev/user/logout", {
			credentials: "include",
		});
		// 模擬登出邏輯
		if (response.ok) {
			setIsLoggedIn(false);
			setUsername("");
		}
	};

	return (
		<nav className="bg-blue-600 text-white p-4">
			<ul className="flex space-x-4 ms-auto">
				<li>
					<Link href="/" className="hover:underline">
						Home
					</Link>
				</li>
				<li>
					<a
						href="https://1drv.ms/p/c/838befa8c41b5c8d/EbfsoqIYviBGh2v93_eafmUBXbIbpQ3pEhV2rFsL9uqt9g?e=zZtP95"
						className="hover:underline"
					>
						Slides
					</a>
				</li>
				{!isLoggedIn ? (
					<>
						<li>
							<Link href="/login" className="hover:underline">
								Login
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link href="/profile" className="hover:underline">
								Profile
							</Link>
						</li>
						<li>Welcome, {username}</li>
						<li>
							<button
								onClick={handleLogout}
								className="hover:underline"
							>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
