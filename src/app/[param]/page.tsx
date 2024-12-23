"use client";

import { redirect } from "next/navigation";
import React,{ useState, useEffect } from "react";

export default function Page({ params }: { params: Promise<{ param: string }> }) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isPasswordRequired, setIsPasswordRequired] = useState(false);

	const checkShortUrl = async () => {
		try {
			const response = await fetch(
				`https://shorturlprojectbackend.fly.dev/shorturl/${React.use(params).param}`,
				{
					method: "GET",
				}
			);
            console.log(response)
			if (response.status === 201) {
				const url = await response.text();
                window.location.href = url;// 無密碼保護，直接重定向
			} else if (response.status === 200) {
				setIsPasswordRequired(true); // 密碼保護
			} else if (response.status === 400) {
				setError("短網址不存在！");
			}
		} catch (err) {
			setError("無法連接到伺服器，請稍後再試！");
		}
	};

	const verifyPassword = async () => {
		setError(null); // 清除錯誤
		try {
			const response = await fetch(
				`https://shorturlprojectbackend.fly.dev/shorturl/${React.use(params).param}/password`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ password }), // 提交密碼
				}
			);

			if (response.status === 201) {
				const url = await response.text();
				window.location.href = url;// 密碼正確，重定向
			} else if (response.status === 400) {
				setError("密碼錯誤！");
			}
		} catch (err) {
			setError("無法連接到伺服器，請稍後再試！");
		}
	};

	useEffect(() => {
		checkShortUrl();
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			{isPasswordRequired ? (
				<div className="p-6 bg-white rounded shadow-md w-full max-w-md">
					<h1 className="text-xl font-bold mb-4">
						此短網址需要密碼保護
					</h1>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="請輸入密碼"
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4"
					/>
					<button
						onClick={verifyPassword}
						className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
					>
						提交密碼
					</button>
					{error && (
						<p className="text-red-600 mt-4 text-center">{error}</p>
					)}
				</div>
			) : error ? (
				<p className="text-red-600">{error}</p>
			) : (
				<p className="text-gray-500">正在加載...</p>
			)}
		</div>
	);
}
