"use client";
import { useState } from "react";
//import QRCode from "qrcode.react";

const QRCodeGenerator = () => {
    const [url, setUrl] = useState("");
    const [size, setSize] = useState(256);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [fgColor, setFgColor] = useState("#000000");

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">生成 QRCode</h1>
            <div className="bg-white p-4 rounded-md shadow max-w-lg">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        短網址
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="輸入短網址"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            背景顏色
                        </label>
                        <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-full h-10 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            前景顏色
                        </label>
                        <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="w-full h-10 border rounded-md"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        大小
                    </label>
                    <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                        min={64}
                        max={512}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>
                {url && (
                    <div className="mt-6 flex justify-center">
                        <QRCode value={url} size={size} bgColor={bgColor} fgColor={fgColor} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRCodeGenerator;
