// eslint-disable-line @typescript-eslint/no-unused-vars
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false); // 狀態：切換登入或註冊
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // 註冊需要的名稱
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async () => {
        setError(null);
        try {
            const response = await fetch(
                `https://shorturlprojectbackend.fly.dev/user/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                    credentials:"include"
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("登入成功", data);
            } else {
                setError("登入失敗，請檢查帳號或密碼！");
            }
        } catch (err) {
            setError("伺服器連接失敗，請稍後再試！");
        }
    };

    const handleRegister = async () => {
        setError(null);
        try {
            const response = await fetch(
                `https://shorturlprojectbackend.fly.dev/user/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password, name }),
                }
            );

            if (response.ok) {
                setIsRegister(false); // 註冊成功後切回登入
            } else {
                setError("註冊失敗，帳號可能已被使用！");
            }
        } catch (err) {
            setError("伺服器連接失敗，請稍後再試！");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
                <div className="mb-6 flex justify-center">
                    <button
                        onClick={() => setIsRegister(false)}
                        className={`px-4 py-2 ${
                            !isRegister
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        } rounded-l`}
                    >
                        登入
                    </button>
                    <button
                        onClick={() => setIsRegister(true)}
                        className={`px-4 py-2 ${
                            isRegister
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        } rounded-r`}
                    >
                        註冊
                    </button>
                </div>
                {isRegister ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            註冊
                        </h1>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="帳號"
                            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="密碼"
                            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="名稱"
                            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            onClick={handleRegister}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            註冊
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            登入
                        </h1>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="帳號"
                            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="密碼"
                            className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            onClick={handleLogin}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            登入
                        </button>
                    </div>
                )}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
