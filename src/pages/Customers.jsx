import React from "react";
import { Filter } from "lucide-react";

const Customers = () => {
    const customerData = [
        { date: "13/03/2026", quantity: 120, note: "Đặt bàn đồng" },
        { date: "14/03/2026", quantity: 95, note: "-" },
        { date: "15/03/2026", quantity: 110, note: "Tiệc sinh nhật" },
        { date: "16/03/2026", quantity: 80, note: "-" },
    ];

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
                        450
                    </span>
                    <span className="text-sm text-[#10BC5D] bg-green-50 px-4 py-2 rounded-full font-medium">
                        +5.2% so với tháng trước
                    </span>
                </div>
            </div>

            {/* Filter */}
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
                        {customerData.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="py-4 px-5 text-sm text-[#141C21]">
                                    {row.date}
                                </td>
                                <td className="py-4 px-5 text-sm text-[#141C21] font-medium">
                                    {row.quantity}
                                </td>
                                <td className="py-4 px-5 text-sm text-[#8B8B8B]">
                                    {row.note}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-[#8B8B8B]">
                    Hiển thị 4 trên 150 bản ghi
                </p>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-sm text-[#8B8B8B] hover:text-[#141C21] hover:bg-gray-100 rounded-lg">
                        Trước
                    </button>
                    <button className="w-8 h-8 bg-[#10BC5D] text-white rounded-lg text-sm">
                        1
                    </button>
                    <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm text-[#3D3D3D]">
                        2
                    </button>
                    <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm text-[#3D3D3D]">
                        3
                    </button>
                    <button className="px-3 py-1.5 text-sm text-[#8B8B8B] hover:text-[#141C21] hover:bg-gray-100 rounded-lg">
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Customers;
