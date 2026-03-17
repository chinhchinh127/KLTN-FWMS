import React from "react";
import { Filter } from "lucide-react";

const FoodData = () => {
    const foodData = [
        {
            date: "13/03/2026",
            name: "Bông cải xanh xào",
            quantity: 150,
            waste: 5,
            percent: 20,
        },
        {
            date: "13/03/2026",
            name: "Cơm trắng",
            quantity: 300,
            waste: 10,
            percent: 15,
        },
        {
            date: "13/03/2026",
            name: "Thịt bò sốt vang",
            quantity: 120,
            waste: 2,
            percent: 10,
        },
        {
            date: "13/03/2026",
            name: "Cá hồi nướng",
            quantity: 100,
            waste: 1,
            percent: 5,
        },
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
                    Dữ liệu món ăn (Món ra & Món dư)
                </h2>
                <p className="text-base text-[#8B8B8B]">
                    Theo dõi và phân tích dữ liệu tiêu thụ từng món ăn trong nhà
                    bếp.
                </p>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <p className="text-sm text-[#8B8B8B] mb-2">
                    Trạng thái món ăn phục vụ
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-[#141C21]">
                            1,250
                        </span>
                        <span className="text-base text-[#141C21]">Món</span>
                    </div>
                    <span className="text-sm text-[#10BC5D] bg-green-50 px-4 py-2 rounded-full font-medium">
                        +5.2% so với kỳ trước
                    </span>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-base font-semibold text-[#141C21] mb-4">
                    Bộ lọc tìm kiếm
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#10BC5D]"
                    />
                    <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#10BC5D]">
                        <option>Loại món ăn</option>
                        <option>Khai vị</option>
                        <option>Món chính</option>
                        <option>Tráng miệng</option>
                    </select>
                    <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#10BC5D]">
                        <option>Chọn tháng</option>
                        <option>Tháng 1</option>
                        <option>Tháng 2</option>
                        <option>Tháng 3</option>
                    </select>
                    <button className="flex items-center justify-center gap-2 bg-[#10BC5D] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-600">
                        <Filter size={16} />
                        Lọc dữ liệu
                    </button>
                </div>
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
                                TÊN MÓN ĂN
                            </th>
                            <th className="text-left py-4 px-5 text-sm font-bold text-[#3D3D3D]">
                                SL RA
                            </th>
                            <th className="text-left py-4 px-5 text-sm font-bold text-[#3D3D3D]">
                                SL DƯ
                            </th>
                            <th className="text-left py-4 px-5 text-sm font-bold text-[#3D3D3D]">
                                % DƯ THỪA
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodData.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="py-4 px-5 text-sm text-[#141C21]">
                                    {row.date}
                                </td>
                                <td className="py-4 px-5 text-sm text-[#141C21]">
                                    {row.name}
                                </td>
                                <td className="py-4 px-5 text-sm text-[#141C21]">
                                    {row.quantity} suất
                                </td>
                                <td className="py-4 px-5 text-sm text-[#141C21]">
                                    {row.waste} suất
                                </td>
                                <td className="py-4 px-5 text-sm text-[#141C21] font-bold">
                                    {row.percent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-[#8B8B8B]">
                    Hiển thị 4 trên 200 bản ghi
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

export default FoodData;
