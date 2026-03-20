import React, { useEffect, useState } from "react";
import { getWasteHistory } from "../api/wasteApi";

const getReasonColor = (reason) => {
    switch (reason) {
        case "Hết hạn":
            return "bg-red-100 text-red-500";
        case "Chế biến dư":
            return "bg-orange-100 text-orange-500";
        case "Sơ chế lỗi":
            return "bg-blue-100 text-blue-500";
        case "Hỏng hóc":
            return "bg-pink-100 text-pink-500";
        default:
            return "bg-gray-100 text-gray-500";
    }
};

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

    const fetchData = async () => {
        const res = await getWasteHistory({ date, month });
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Title */}
            <h1 className="text-2xl font-bold">
                Lịch sử lãng phí thực phẩm
            </h1>
            <p className="text-gray-500 mb-6">
                Theo dõi và phân tích dữ liệu lãng phí chi tiết trong nhà bếp.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <p className="text-gray-500 text-sm">Tổng lãng phí trong kỳ</p>
                    <h2 className="text-2xl font-bold mt-2">125.5 kg</h2>
                    <p className="text-red-500 text-sm mt-1">
                        ~ -5.2% so với kỳ trước
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <p className="text-gray-500 text-sm">Tỉ lệ giảm lãng phí</p>
                    <h2 className="text-2xl font-bold mt-2">12.8%</h2>
                    <p className="text-green-500 text-sm mt-1">
                        +2.4% cải thiện
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-3 items-center">
                {/* chọn ngày */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setMonth(""); // clear tháng
                    }}
                    className="border px-3 py-2 rounded-lg"
                />

                {/* chọn tháng custom */}
                <div className="relative">
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => {
                            setMonth(e.target.value);
                            setDate(""); // clear ngày
                        }}
                        className="border px-3 py-2 rounded-lg w-48 text-transparent"
                    />

                    {/* text hiển thị */}
                    <span className="absolute left-3 top-2 text-gray-700 pointer-events-none">
                        {month ? formatMonthVN(month) : "Chọn tháng"}
                    </span>
                </div>

                {/* lọc */}
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
                            <th className="text-left p-3">NGÀY</th>
                            <th className="text-left p-3">TÊN NGUYÊN LIỆU/MÓN ĂN</th>
                            <th className="text-left p-3">KHỐI LƯỢNG</th>
                            <th className="text-left p-3">LÝ DO</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-3">{item.date}</td>
                                    <td className="p-3 font-medium">{item.name}</td>
                                    <td className="p-3">{item.weight} kg</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-md text-xs ${getReasonColor(
                                                item.reason
                                            )}`}
                                        >
                                            {item.reason}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-400">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Footer */}
                <div className="flex justify-between items-center p-4 text-sm text-gray-500">
                    <span>Hiển thị {data.length} bản ghi</span>

                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded">{"<"}</button>
                        <button className="px-3 py-1 bg-green-500 text-white rounded">
                            1
                        </button>
                        <button className="px-3 py-1 border rounded">{">"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}