import { useState } from "react";

const ShortUrlPage = () => {
    const [longUrl, setLongUrl] = useState("");
    const [customShortUrl, setCustomShortUrl] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setError(null); // 清除錯誤
        try {
            const response = await fetch("/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    longUrl,
                    customShortUrl,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate short URL");
            }

            const data = await response.json();
            setGeneratedUrl(data.shortUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">短網址生成器</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        長網址
                    </label>
                    <input
                        type="text"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="輸入完整的 URL，例如：https://example.com"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        自訂短網址 (選填)
                    </label>
                    <input
                        type="text"
                        value={customShortUrl}
                        onChange={(e) => setCustomShortUrl(e.target.value)}
                        placeholder="輸入自訂短網址"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    生成短網址
                </button>
                {generatedUrl && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">生成的短網址：</p>
                        <a
                            href={generatedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {generatedUrl}
                        </a>
                    </div>
                )}
                {error && (
                    <div className="mt-4 text-center text-red-600">{error}</div>
                )}
            </div>
        </div>
    );
};

export default ShortUrlPage;
