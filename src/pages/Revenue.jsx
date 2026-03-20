import React, { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

import {
    getRevenueStats,
    getRevenueChart,
    getTransactions,
} from "../api/revenueApi.js";

const Revenue = () => {
    // ✅ set default để không bị undefined
    const [stats, setStats] = useState({
        today: 0,
        month: 0,
        growth: 0,
    });

    const [chartData, setChartData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // gọi API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, chartRes, transRes] = await Promise.all([
                    getRevenueStats(),
                    getRevenueChart(),
                    getTransactions(),
                ]);

                setStats(statsRes.data || {});
                setChartData(chartRes.data || []);
                setTransactions(transRes.data || []);
            } catch (err) {
                console.error("Lỗi load dữ liệu:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 👉 format tiền (fix undefined)
    const formatMoney = (num) => {
        if (!num) return "0 VNĐ";
        return num.toLocaleString("vi-VN") + " VNĐ";
    };

    // 👉 tránh crash khi chartData rỗng
    const maxValue =
        chartData.length > 0
            ? Math.max(...chartData.map((d) => d.value))
            : 0;

    if (loading) {
        return <div className="p-8">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Thống kê doanh thu
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Báo cáo chi tiết hiệu suất kinh doanh
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <select className="border rounded-lg px-3 py-2 text-sm">
                        <option>Tháng 03, 2026</option>
                    </select>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
                        Xem thống kê
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Hôm nay</p>
                    <h2 className="text-2xl font-bold mt-1">
                        {formatMoney(stats.today)}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">Tháng này</p>
                    <h2 className="text-2xl font-bold mt-1">
                        {formatMoney(stats.month)}
                    </h2>
                </div>

                <div className="bg-green-500 text-white p-5 rounded-xl shadow">
                    <p className="text-sm">Tăng trưởng</p>
                    <h2 className="text-2xl font-bold mt-1">
                        +{stats.growth || 0}%
                    </h2>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h3 className="text-gray-700 font-semibold mb-4">
                    Biểu đồ doanh thu
                </h3>

                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <Tooltip />

                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        entry.value === maxValue
                                            ? "#10BC5D"
                                            : "#10BC5D33"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="font-semibold text-gray-700">
                        Chi tiết giao dịch
                    </h3>
                </div>

                <table className="w-full">
                    <thead className="bg-gray-50 text-sm text-gray-500">
                        <tr>
                            <th className="text-left p-4">Ngày giao dịch</th>
                            <th className="text-left p-4">Danh mục</th>
                            <th className="text-left p-4">Số tiền</th>
                            <th className="text-left p-4">Trạng thái</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4 font-semibold">
                                        {formatMoney(item.amount)}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${
                                                item.status === "success"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {item.status === "success"
                                                ? "Thành công"
                                                : "Đang xử lý"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center p-6 text-gray-400"
                                >
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center p-4 text-sm text-gray-500">
                    <span>Hiển thị {transactions.length} giao dịch</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-500 text-white rounded">
                            1
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Revenue;