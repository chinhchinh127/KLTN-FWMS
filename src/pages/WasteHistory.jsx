import React, { useEffect, useState } from "react";
import { getWasteHistory } from "../api/wasteApi";

// format tháng -> "Tháng 1 2026"
const formatMonthVN = (value) => {
    if (!value) return "";
    const [year, month] = value.split("-");
    return `Tháng ${parseInt(month)} ${year}`;
};

export default function WasteHistory() {
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getWasteHistory({ date, month });
            setData(res.data || []);
        } catch (err) {
            console.error(err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔥 Stats
    const totalWaste = data.reduce(
        (sum, item) => sum + (item.leftover || 0),
        0
    );

    const avgWastePercent =
        data.length > 0
            ? Math.round(
                  data.reduce(
                      (sum, item) => sum + (item.leftoverPercent || 0),
                      0
                  ) / data.length
              )
            : 0;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-2">
                Lịch sử món dư & lãng phí
            </h1>
            <p className="text-gray-500 mb-6">
                Theo dõi lượng món dư và phân tích bằng AI
            </p>

            {/* 🔥 Stats Cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Tổng lãng phí */}
                <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Tổng món dư trong kỳ
                        </p>
                        <h2 className="text-2xl font-bold mt-2">
                            {totalWaste} suất
                        </h2>
                        <p className="text-red-500 text-sm mt-1">
                            Dữ liệu thực tế
                        </p>
                    </div>

                    <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                        📊
                    </div>
                </div>

                {/* Tỉ lệ */}
                <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Tỉ lệ món dư trung bình
                        </p>
                        <h2 className="text-2xl font-bold mt-2">
                            {avgWastePercent}%
                        </h2>
                        <p className="text-green-500 text-sm mt-1">
                            AI đánh giá
                        </p>
                    </div>

                    <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                        📈
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-3 items-center">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setMonth("");
                    }}
                    className="border px-3 py-2 rounded-lg"
                />

                <div className="relative">
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => {
                            setMonth(e.target.value);
                            setDate("");
                        }}
                        className="border px-3 py-2 rounded-lg w-48 text-transparent"
                    />

                    <span className="absolute left-3 top-2 text-gray-700 pointer-events-none">
                        {month ? formatMonthVN(month) : "Chọn tháng"}
                    </span>
                </div>

                <button
                    onClick={fetchData}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Lọc dữ liệu
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3 text-left">NGÀY</th>
                            <th className="p-3 text-left">TÊN MÓN</th>
                            <th className="p-3 text-left">MÓN RA</th>
                            <th className="p-3 text-left">MÓN DÙNG</th>
                            <th className="p-3 text-left">MÓN DƯ</th>
                            <th className="p-3 text-left">TỈ LỆ DƯ</th>
                            <th className="p-3 text-left">AI</th>
                            <th className="p-3 text-left">NGUYÊN NHÂN</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center p-4">
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item) => (
                                <tr
                                    key={item.id}
                                    className={`border-t hover:bg-gray-50 ${
                                        item.aiLevel === "High"
                                            ? "bg-red-50"
                                            : ""
                                    }`}
                                >
                                    <td className="p-3">{item.date}</td>

                                    <td className="p-3 font-medium">
                                        {item.name}
                                    </td>

                                    <td className="p-3">
                                        {item.produced} suất
                                    </td>

                                    <td className="p-3">
                                        {item.used} suất
                                    </td>

                                    <td className="p-3 text-red-500 font-medium">
                                        {item.leftover} suất
                                    </td>

                                    <td className="p-3">
                                        {item.leftoverPercent}%
                                    </td>

                                    {/* AI */}
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 text-xs rounded ${
                                                item.aiLevel === "High"
                                                    ? "bg-red-100 text-red-600"
                                                    : item.aiLevel === "Medium"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-green-100 text-green-600"
                                            }`}
                                        >
                                            {item.aiLevel}
                                        </span>
                                    </td>

                                    {/* Nguyên nhân */}
                                    <td className="p-3 text-gray-600 text-sm">
                                        {item.aiReason}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center p-4 text-gray-400"
                                >
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="p-4 text-sm text-gray-500">
                    Hiển thị {data.length} bản ghi
                </div>
            </div>
        </div>
    );
}