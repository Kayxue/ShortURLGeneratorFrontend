"use client";
import { useEffect, useState } from "react";

interface ShortUrl {
    id: string;
    longUrl: string;
    shortUrl: string;
    createdAt: string;
}

const Dashboard = () => {
    const [urls, setUrls] = useState<ShortUrl[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await fetch("/api/urls");
                if (!response.ok) throw new Error("Failed to fetch URLs");
                const data = await response.json();
                setUrls(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        };
        fetchUrls();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/urls/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete URL");
            setUrls((prev) => prev.filter((url) => url.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">我的短網址</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="bg-white p-4 rounded-md shadow">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className="p-2">短網址</th>
                            <th className="p-2">長網址</th>
                            <th className="p-2">創建時間</th>
                            <th className="p-2">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url.id} className="border-t">
                                <td className="p-2 text-blue-600 underline">
                                    <a href={url.shortUrl} target="_blank">
                                        {url.shortUrl}
                                    </a>
                                </td>
                                <td className="p-2">{url.longUrl}</td>
                                <td className="p-2">{new Date(url.createdAt).toLocaleString()}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleDelete(url.id)}
                                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
