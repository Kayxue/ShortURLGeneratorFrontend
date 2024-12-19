"use client";
import { useEffect, useState } from "react";

interface ClickData {
    country: string;
    clicks: number;
}

const Analytics = () => {
    const [clickData, setClickData] = useState<ClickData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch("/api/analytics");
                if (!response.ok) throw new Error("Failed to fetch analytics");
                const data = await response.json();
                setClickData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">點擊分析</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="bg-white p-4 rounded-md shadow">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className="p-2">國家</th>
                            <th className="p-2">點擊數</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clickData.map((data, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2">{data.country}</td>
                                <td className="p-2">{data.clicks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Analytics;
