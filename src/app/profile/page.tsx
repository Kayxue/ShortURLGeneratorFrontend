"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
    username: string;
    name: string;
}

interface UrlData {
    param: string;
    url: string;
    userId: string | null;
    password: string | null;
    expiredTime: string | null;
}

export default function ProfilePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 模擬登入狀態
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [dashboardData, setDashboardData] = useState<UrlData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading,setLoading]=useState<boolean>(true);

    const router = useRouter();

    // 獲取用戶資訊
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/user/profile",
                {
                    credentials:"include"
                }
            );
            if (!response.ok) throw new Error("無法獲取用戶資訊");
            const data = await response.json();
            setUserProfile(data);
            setIsLoggedIn(true);
        } catch (err) {
            setError("請先登入！");
            setIsLoggedIn(false);
        }
        setLoading(false)
    };

    // 獲取 Dashboard 數據
    const fetchDashboardData = async () => {
        try {
            const response = await fetch(
                "https://shorturlprojectbackend.fly.dev/shorturl/ix_XqiQs/info",
                {
                    credentials:"include"
                }
            );
            if (!response.ok) throw new Error("無法獲取 Dashboard 數據");
            const data = await response.json();
            setDashboardData([data]); // 將數據轉為陣列以便渲染
        } catch (err) {
            setError("無法加載短網址信息！");
        }
    };

    // 初始化加載數據
    useEffect(() => {
        fetchUserProfile();
        fetchDashboardData();
    }, []);

    return loading?<><p>Loading</p></>:(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-full max-w-4xl">
                {/* 用戶資訊 */}
                <h1 className="text-2xl font-bold mb-4">個人檔案</h1>
                {userProfile ? (
                    <div className="mb-6">
                        <p>用戶名稱：{userProfile.name}</p>
                        <p>用戶帳號：{userProfile.username}</p>
                    </div>
                ) : (
                    <p>正在加載用戶資訊...</p>
                )}

                {/* Dashboard 表格 */}
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                {dashboardData.length > 0 ? (
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">
                                    Param
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    URL
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    User ID
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Password
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Expired Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.map((item, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.param}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {item.url}
                                        </a>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.userId || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.password || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.expiredTime || "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>正在加載 Dashboard 數據...</p>
                )}
            </div>
        </div>
    );
}
