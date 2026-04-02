import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";

const Customers = () => {
    // ===== STATE =====
    const [summary, setSummary] = useState({
        current_month_total: 0,
        previous_month_total: 0,
        percentage_change: 0,
    });

    const [customerData, setCustomerData] = useState([]);
    const [loadingSummary, setLoadingSummary] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);

    // ===== CALL API =====
    useEffect(() => {
        fetchSummary();
        fetchCustomers();
    }, []);

    // 👉 API 1: Stats
    const fetchSummary = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "https://wasteless-ai.onrender.com/api/consumption/sum-customer-as-last-month",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.success) {
                setSummary(data.data);
            }
        } catch (error) {
            console.error("Lỗi summary:", error);
        } finally {
            setLoadingSummary(false);
        }
    };

    // 👉 API 2: Table
    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                "https://wasteless-ai.onrender.com/api/consumption/list-customer-in-month",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.success) {
                setCustomerData(data.data);
            }
        } catch (error) {
            console.error("Lỗi table:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="mb-2">
                    <span className="text-sm text-[#8B8B8B] tracking-wider">
                        FWMS
                    </span>
                    <span className="text-sm text-[#8B8B8B] ml-1">
                        MANAGEMENT SYSTEM
                    </span>
                </div>
                <h2 className="text-3xl font-bold text-[#141C21] mb-2">
                    Quản lý số lượng khách hàng
                </h2>
                <p className="text-base text-[#8B8B8B]">
                    Theo dõi và phân tích dữ liệu số lượng khách hàng phục vụ.
                </p>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <p className="text-sm text-[#8B8B8B] mb-2">
                    Tổng số khách trong tháng
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-5xl font-bold text-[#141C21]">
                        {loadingSummary ? "..." : summary.current_month_total}
                    </span>

                    <span
                        className={`text-sm px-4 py-2 rounded-full font-medium ${
                            summary.percentage_change >= 0
                                ? "text-[#10BC5D] bg-green-50"
                                : "text-red-500 bg-red-50"
                        }`}
                    >
                        {summary.percentage_change}% so với tháng trước
                    </span>
                </div>
            </div>

            {/* Filter (chưa xử lý logic) */}
            <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-[#8B8B8B] font-medium">
                    Thời gian:
                </span>
                <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#10BC5D] w-36"
                />
                <button className="flex items-center gap-2 bg-[#10BC5D] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 ml-auto">
                    <Filter size={16} />
                    Lọc dữ liệu
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left py-4 px-5 text-sm font-bold text-[#3D3D3D]">
                                NGÀY
                            </th>
                            <th className="text-left py-4 px-5 text-sm font-bold text-[#3D3D3D]">
                                SỐ LƯỢNG KHÁCH
                            </th>
                            <th className="text-left py-4 px-5 text-sm font-bold text-[#3D3D3D]">
                                GHI CHÚ
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loadingTable ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : customerData.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            customerData.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="py-4 px-5 text-sm text-[#141C21]">
                                        {new Date(row.date).toLocaleDateString("vi-VN")}
                                    </td>

                                    <td className="py-4 px-5 text-sm text-[#141C21] font-medium">
                                        {row.quantity || row.customer_count}
                                    </td>

                                    <td className="py-4 px-5 text-sm text-[#8B8B8B]">
                                        {row.note || "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination (chưa xử lý thật) */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-[#8B8B8B]">
                    Hiển thị {customerData.length} bản ghi
                </p>
            </div>
        </div>
    );
};

export default Customers;