import React, { useState } from "react";
import {
    Edit2,
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
    Save,
    PlusCircle,
} from "lucide-react";

const SurplusDishes = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [dishes] = useState([
        {
            id: "KT001",
            name: "Cơm gà xôi mỡ",
            prepared: 50,
            waste: 15,
            price: 45000,
            status: "active",
            category: "Món chính",
            ingredients: [
                "Đùi gà (150g)",
                "Gạo tẻ (200g)",
                "Dưa leo",
                "Mỡ hành",
            ],
            wasteCost: 675000,
            expectedRevenue: 2250000,
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=150",
        },
        {
            id: "KT002",
            name: "Salad dầu giấm",
            prepared: 30,
            waste: 5,
            price: 35000,
            status: "active",
            category: "Món phụ",
            ingredients: ["Xà lách", "Dầu giấm", "Cà chua", "Hành tây"],
            wasteCost: 175000,
            expectedRevenue: 1050000,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150",
        },
        {
            id: "KT003",
            name: "Phở bò",
            prepared: 40,
            waste: 8,
            price: 55000,
            status: "active",
            category: "Món chính",
            ingredients: ["Bánh phở", "Thịt bò", "Hành lá", "Gia vị"],
            wasteCost: 440000,
            expectedRevenue: 2200000,
            image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=150",
        },
        {
            id: "KT004",
            name: "Bún chả",
            prepared: 35,
            waste: 12,
            price: 50000,
            status: "closed",
            category: "Món chính",
            ingredients: ["Bún", "Chả", "Thịt nướng", "Nước chấm"],
            wasteCost: 600000,
            expectedRevenue: 1750000,
            image: "https://images.unsplash.com/photo-1586582197622-48bb239c6231?w=150",
        },
        {
            id: "KT005",
            name: "Cơm tấm sườn",
            prepared: 45,
            waste: 10,
            price: 40000,
            status: "active",
            category: "Món chính",
            ingredients: ["Cơm tấm", "Sườn nướng", "Bì", "Chả trứng"],
            wasteCost: 400000,
            expectedRevenue: 1800000,
            image: "https://images.unsplash.com/photo-1594221708779-94832f9240b1?w=150",
        },
    ]);

    const filteredDishes = dishes.filter((dish) => {
        if (activeTab === "active") return dish.status === "active";
        if (activeTab === "closed") return dish.status === "closed";
        return true;
    });

    const totalItems = filteredDishes.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentDishes = filteredDishes.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "₫";
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(0, prev + delta));
    };

    const handleSaveReport = () => {
        if (selectedDish) {
            alert(
                `Đã cập nhật hao hụt cho món ${selectedDish.name}: ${quantity} phần`,
            );
        }
    };

    const handleAddNewReport = () => {
        alert("Thêm báo cáo mới");
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-[45px] leading-[55px] font-bold text-[#141c21] mb-2">
                    Cập nhật số lượng món dư
                </h2>
                <p className="text-[16px] leading-[26px] text-[#8b8b8b]">
                    Danh sách chi tiết hàng ngày kết nối từ bảng thực đơn
                    (dishes) và báo cáo (daily_detail)
                </p>
            </div>

            <div className="flex gap-6 items-start">
                {/* LEFT COLUMN */}
                <div className="flex-1">
                    {/* Tabs */}
                    <div className="flex gap-2 mb-4 border-b border-gray-200">
                        <button
                            onClick={() => {
                                setActiveTab("all");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === "all" ? "text-[#10bc5d] border-b-2 border-[#10bc5d]" : "text-[#8b8b8b] hover:text-[#3d3d3d]"}`}
                        >
                            Tất cả ({dishes.length})
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("active");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === "active" ? "text-[#10bc5d] border-b-2 border-[#10bc5d]" : "text-[#8b8b8b] hover:text-[#3d3d3d]"}`}
                        >
                            Đang hoạt động (
                            {dishes.filter((d) => d.status === "active").length}
                            )
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("closed");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === "closed" ? "text-[#10bc5d] border-b-2 border-[#10bc5d]" : "text-[#8b8b8b] hover:text-[#3d3d3d]"}`}
                        >
                            Đã đóng (
                            {dishes.filter((d) => d.status === "closed").length}
                            )
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr className="text-[#8b8b8b] text-xs uppercase">
                                    <th className="px-4 py-3 text-left font-semibold">
                                        MÃ ID
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold">
                                        TÊN MÓN
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold">
                                        CHUẨN BỊ
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold">
                                        HAO HỤT
                                    </th>
                                    <th className="px-4 py-3 text-center font-semibold">
                                        HÀNH ĐỘNG
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentDishes.map((dish) => (
                                    <tr
                                        key={dish.id}
                                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedDish?.id === dish.id ? "bg-green-50" : ""}`}
                                        onClick={() => {
                                            setSelectedDish(dish);
                                            setQuantity(dish.waste);
                                        }}
                                    >
                                        <td className="px-4 py-3 text-sm font-bold text-[#10bc5d]">
                                            {dish.id}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <div className="font-semibold text-[#141c21]">
                                                    {dish.name}
                                                </div>
                                                <div className="text-xs text-[#8b8b8b]">
                                                    {formatPrice(dish.price)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-[#3d3d3d]">
                                            {dish.prepared} phần
                                        </td>
                                        <td className="px-4 py-3 text-sm text-red-500 font-medium">
                                            {dish.waste} phần
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button className="text-[#10bc5d] hover:text-[#0c9c4a]">
                                                <Edit2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center bg-white">
                            <p className="text-xs text-[#8b8b8b]">
                                Hiển thị {startIndex + 1}-
                                {Math.min(
                                    startIndex + itemsPerPage,
                                    totalItems,
                                )}{" "}
                                trên {totalItems} món ăn
                            </p>
                            <div className="flex gap-1">
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(1, prev - 1),
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="p-1 text-[#8b8b8b] hover:text-[#3d3d3d] disabled:opacity-50"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-2 py-1 text-xs rounded ${currentPage === i + 1 ? "text-white bg-[#10bc5d]" : "text-[#3d3d3d] hover:bg-gray-100"}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(totalPages, prev + 1),
                                        )
                                    }
                                    disabled={currentPage === totalPages}
                                    className="p-1 text-[#8b8b8b] hover:text-[#3d3d3d] disabled:opacity-50"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Nút Thêm báo cáo mới */}
                    <div className="mt-4">
                        <button
                            onClick={handleAddNewReport}
                            className="flex items-center gap-2 px-4 py-2 bg-[#10bc5d] text-white rounded-lg hover:bg-[#0c9c4a]"
                        >
                            <PlusCircle size={18} />
                            <span>Thêm báo cáo mới</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN - CHI TIẾT MÓN ĂN - ĐƯA LÊN CAO */}
                {selectedDish && (
                    <div className="w-96 bg-white rounded-lg border border-gray-200 p-5 shadow-md">
                        <h3 className="text-lg font-bold text-[#141c21] mb-4 border-l-4 border-[#10bc5d] pl-3">
                            CHI TIẾT MÓN ĂN
                        </h3>

                        {/* Ảnh món ăn */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#10bc5d]/20 shadow-md">
                                <img
                                    src={selectedDish.image}
                                    alt={selectedDish.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Tên món, ID và giá */}
                        <div className="text-center mb-4">
                            <h4 className="text-lg font-bold text-[#141c21]">
                                {selectedDish.name}
                            </h4>
                            <div className="flex justify-center gap-3 mt-1">
                                <p className="text-xs text-[#8b8b8b]">
                                    ID: {selectedDish.id}
                                </p>
                                <p className="text-xs font-semibold text-[#10bc5d]">
                                    {formatPrice(selectedDish.price)}
                                </p>
                            </div>
                        </div>

                        {/* DANH MỤC */}
                        <div className="mb-3">
                            <p className="text-xs font-semibold text-[#3d3d3d] uppercase">
                                DANH MỤC
                            </p>
                            <p className="text-sm text-[#8b8b8b] mt-1">
                                {selectedDish.category}
                            </p>
                        </div>

                        {/* NGUYÊN LIỆU TIÊU CHUẨN */}
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-[#3d3d3d] uppercase mb-2">
                                NGUYÊN LIỆU TIÊU CHUẨN
                            </p>
                            <ul className="space-y-1">
                                {selectedDish.ingredients.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="text-sm text-[#8b8b8b] flex items-start gap-2"
                                    >
                                        <span className="text-[#10bc5d]">
                                            •
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CHI PHÍ HAO HỤT */}
                        <div className="mb-3 bg-red-50 rounded-lg p-3">
                            <p className="text-xs font-semibold text-[#3d3d3d] mb-1">
                                CHI PHÍ HAO HỤT
                            </p>
                            <p className="text-xl font-bold text-red-500">
                                {formatPrice(selectedDish.wasteCost)}
                            </p>
                        </div>

                        {/* DOANH THU DỰ KIẾN */}
                        <div className="mb-4 bg-green-50 rounded-lg p-3">
                            <p className="text-xs font-semibold text-[#3d3d3d] mb-1">
                                DOANH THU DỰ KIẾN
                            </p>
                            <p className="text-xl font-bold text-green-500">
                                {formatPrice(selectedDish.expectedRevenue)}
                            </p>
                        </div>

                        {/* CẬP NHẬT LƯỢNG HAO HỤT */}
                        <div className="pt-3">
                            <p className="text-xs font-semibold text-[#3d3d3d] mb-2 uppercase">
                                CẬP NHẬT LƯỢNG HAO HỤT
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-[#10bc5d] hover:bg-[#10bc5d] hover:text-white transition-all"
                                >
                                    <Minus size={16} />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(
                                            Math.max(0, Number(e.target.value)),
                                        )
                                    }
                                    className="flex-1 h-8 px-2 border border-gray-300 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#10bc5d]"
                                />
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-[#10bc5d] hover:bg-[#10bc5d] hover:text-white transition-all"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <p className="text-xs text-[#3d3d3d] mt-2 text-center font-medium">
                                {quantity} phần
                            </p>
                        </div>

                        {/* Nút lưu báo cáo */}
                        <button
                            onClick={handleSaveReport}
                            className="w-full mt-4 bg-[#10bc5d] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#0c9c4a] transition-all flex items-center justify-center gap-2"
                        >
                            <Save size={16} />
                            <span>Lưu báo cáo hôm nay</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurplusDishes;
