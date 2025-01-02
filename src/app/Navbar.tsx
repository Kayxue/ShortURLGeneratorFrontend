"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 管理登入狀態
    const [username, setUsername] = useState(""); // 儲存用戶名

    const handleLogout = () => {
        // 模擬登出邏輯
        setIsLoggedIn(false);
        setUsername("");
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
                    <Link href="/dashboard" className="hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/analytics" className="hover:underline">
                        Analytics
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
