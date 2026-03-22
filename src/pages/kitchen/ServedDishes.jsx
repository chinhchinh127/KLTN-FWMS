import React, { useState } from "react";
import {
    Edit2,
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
    Save,
    PlusCircle,
    X,
} from "lucide-react";

const ServedDishes = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Dữ liệu mẫu cho món đã ra (có thể thay bằng API sau)
    const [dishes] = useState([
        {
            id: "KT001",
            name: "Cơm gà xôi mỡ",
            served: 35,
            price: 45000,
            status: "active",
            category: "Món chính",
            ingredients: [
                "Đùi gà (150g)",
                "Gạo tẻ (200g)",
                "Dưa leo",
                "Mỡ hành",
            ],
            wasteCost: 35 * 15000,
            expectedRevenue: 35 * 45000,
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=150",
        },
        {
            id: "KT002",
            name: "Salad dầu giấm",
            served: 25,
            price: 35000,
            status: "active",
            category: "Món phụ",
            ingredients: ["Xà lách", "Dầu giấm", "Cà chua", "Hành tây"],
            wasteCost: 25 * 10000,
            expectedRevenue: 25 * 35000,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150",
        },
        {
            id: "KT003",
            name: "Phở bò",
            served: 32,
            price: 55000,
            status: "active",
            category: "Món chính",
            ingredients: ["Bánh phở", "Thịt bò", "Hành lá", "Gia vị"],
            wasteCost: 32 * 20000,
            expectedRevenue: 32 * 55000,
            image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=150",
        },
        {
            id: "KT004",
            name: "Bún chả",
            served: 23,
            price: 50000,
            status: "closed",
            category: "Món chính",
            ingredients: ["Bún", "Chả", "Thịt nướng", "Nước chấm"],
            wasteCost: 23 * 18000,
            expectedRevenue: 23 * 50000,
            image: "https://images.unsplash.com/photo-1586582197622-48bb239c6231?w=150",
        },
        {
            id: "KT005",
            name: "Cơm tấm sườn",
            served: 35,
            price: 40000,
            status: "active",
            category: "Món chính",
            ingredients: ["Cơm tấm", "Sườn nướng", "Bì", "Chả trứng"],
            wasteCost: 35 * 12000,
            expectedRevenue: 35 * 40000,
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

    const formatPrice = (price) =>
        new Intl.NumberFormat("vi-VN").format(price) + "₫";

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(0, prev + delta));
    };

    const handleSaveReport = () => {
        if (selectedDish) {
            alert(
                `Đã cập nhật số lượng đã ra cho món ${selectedDish.name}: ${quantity} phần`,
            );
            // Có thể gọi API cập nhật tại đây
        }
    };

    const handleAddNewReport = () => {
        alert("Thêm báo cáo mới cho món ra");
    };

    const handleEditClick = (dish, e) => {
        e.stopPropagation();
        setSelectedDish(dish);
        setQuantity(dish.served);
    };

    const handleRowClick = (dish) => {
        // Chỉ cho phép đổi món nếu đã có món đang được chọn
        if (selectedDish) {
            setSelectedDish(dish);
            setQuantity(dish.served);
        }
    };

    const handleCloseDetail = () => {
        setSelectedDish(null);
    };

    return (
        <div className="flex gap-8 items-start">
            {/* Cột trái: Bảng món ra */}
            <div className="flex-1">
                {/* Tabs lọc */}
                <div className="flex gap-3 mb-5 border-b border-gray-200">
                    <button
                        onClick={() => {
                            setActiveTab("all");
                            setCurrentPage(1);
                        }}
                        className={`px-5 py-2.5 text-sm font-medium transition-all ${
                            activeTab === "all"
                                ? "text-[#10bc5d] border-b-2 border-[#10bc5d]"
                                : "text-[#8b8b8b] hover:text-[#3d3d3d]"
                        }`}
                    >
                        Tất cả ({dishes.length})
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("active");
                            setCurrentPage(1);
                        }}
                        className={`px-5 py-2.5 text-sm font-medium transition-all ${
                            activeTab === "active"
                                ? "text-[#10bc5d] border-b-2 border-[#10bc5d]"
                                : "text-[#8b8b8b] hover:text-[#3d3d3d]"
                        }`}
                    >
                        Đang hoạt động (
                        {dishes.filter((d) => d.status === "active").length})
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("closed");
                            setCurrentPage(1);
                        }}
                        className={`px-5 py-2.5 text-sm font-medium transition-all ${
                            activeTab === "closed"
                                ? "text-[#10bc5d] border-b-2 border-[#10bc5d]"
                                : "text-[#8b8b8b] hover:text-[#3d3d3d]"
                        }`}
                    >
                        Đã đóng (
                        {dishes.filter((d) => d.status === "closed").length})
                    </button>
                </div>

                {/* Bảng */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-[#8b8b8b] text-xs uppercase">
                                <th className="px-5 py-4 text-left font-semibold">
                                    MÃ ID
                                </th>
                                <th className="px-5 py-4 text-left font-semibold">
                                    TÊN MÓN
                                </th>
                                <th className="px-5 py-4 text-left font-semibold">
                                    ĐÃ RA
                                </th>
                                <th className="px-5 py-4 text-center font-semibold">
                                    HÀNH ĐỘNG
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDishes.map((dish) => (
                                <tr
                                    key={dish.id}
                                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                        selectedDish?.id === dish.id
                                            ? "bg-green-50"
                                            : ""
                                    }`}
                                    onClick={() => handleRowClick(dish)}
                                >
                                    <td className="px-5 py-4 text-sm font-bold text-[#10bc5d]">
                                        {dish.id}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div>
                                            <div className="font-semibold text-[#141c21] text-base">
                                                {dish.name}
                                            </div>
                                            <div className="text-xs text-[#8b8b8b] mt-0.5">
                                                {formatPrice(dish.price)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-[#3d3d3d]">
                                        {dish.served} phần
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <button
                                            onClick={(e) =>
                                                handleEditClick(dish, e)
                                            }
                                            className="text-[#10bc5d] hover:text-[#0c9c4a]"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Phân trang */}
                    <div className="px-5 py-4 border-t border-gray-200 flex justify-between items-center bg-white">
                        <p className="text-sm text-[#8b8b8b]">
                            Hiển thị {startIndex + 1}-
                            {Math.min(startIndex + itemsPerPage, totalItems)}{" "}
                            trên {totalItems} món
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={currentPage === 1}
                                className="p-1.5 text-[#8b8b8b] hover:text-[#3d3d3d] disabled:opacity-50"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 text-sm rounded ${
                                        currentPage === i + 1
                                            ? "text-white bg-[#10bc5d]"
                                            : "text-[#3d3d3d] hover:bg-gray-100"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="p-1.5 text-[#8b8b8b] hover:text-[#3d3d3d] disabled:opacity-50"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nút thêm báo cáo mới */}
                <div className="mt-5">
                    <button
                        onClick={handleAddNewReport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#10bc5d] text-white rounded-lg hover:bg-[#0c9c4a] text-sm font-medium"
                    >
                        <PlusCircle size={18} />
                        <span>Thêm + báo cáo mới</span>
                    </button>
                </div>
            </div>

            {/* Cột phải: Chi tiết món ăn (chỉ hiển thị khi có món được chọn) */}
            {selectedDish && (
                <div className="w-[420px] bg-white rounded-xl border border-gray-200 p-6 shadow-md -mt-20">
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={handleCloseDetail}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold text-[#141c21] mb-5 border-l-4 border-[#10bc5d] pl-3">
                        CHI TIẾT MÓN ĂN
                    </h3>

                    {/* Ảnh */}
                    <div className="flex justify-center mb-3">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#10bc5d]/20 shadow-md">
                            <img
                                src={selectedDish.image}
                                alt={selectedDish.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Tên, ID, giá */}
                    <div className="text-center mb-3">
                        <h4 className="text-xl font-bold text-[#141c21]">
                            {selectedDish.name}
                        </h4>
                        <div className="flex justify-center gap-4 mt-1">
                            <p className="text-sm text-[#8b8b8b]">
                                ID: {selectedDish.id}
                            </p>
                            <p className="text-sm font-semibold text-[#10bc5d]">
                                {formatPrice(selectedDish.price)}
                            </p>
                        </div>
                    </div>

                    {/* Danh mục */}
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-[#3d3d3d] uppercase">
                            DANH MỤC
                        </p>
                        <p className="text-base text-[#8b8b8b] mt-1">
                            {selectedDish.category}
                        </p>
                    </div>

                    {/* Nguyên liệu */}
                    <div className="mb-5">
                        <p className="text-sm font-semibold text-[#3d3d3d] uppercase mb-3">
                            NGUYÊN LIỆU TIÊU CHUẨN
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {selectedDish.ingredients.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-2"
                                >
                                    <span className="text-[#10bc5d] text-sm">
                                        •
                                    </span>
                                    <span className="text-sm text-[#8b8b8b]">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chi phí hao hụt & doanh thu dự kiến */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="bg-red-50 rounded-xl p-3">
                            <p className="text-xs font-semibold text-[#3d3d3d] mb-1 uppercase">
                                CHI PHÍ HAO HỤT
                            </p>
                            <p className="text-lg font-bold text-red-500">
                                {formatPrice(selectedDish.wasteCost)}
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3">
                            <p className="text-xs font-semibold text-[#3d3d3d] mb-1 uppercase">
                                DOANH THU DỰ KIẾN
                            </p>
                            <p className="text-lg font-bold text-green-500">
                                {formatPrice(selectedDish.expectedRevenue)}
                            </p>
                        </div>
                    </div>

                    {/* Cập nhật số lượng đã ra */}
                    <div className="pt-2">
                        <p className="text-sm font-semibold text-[#3d3d3d] mb-2 uppercase">
                            CẬP NHẬT SỐ LƯỢNG ĐÃ RA
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-[#10bc5d] hover:bg-[#10bc5d] hover:text-white"
                            >
                                <Minus size={18} />
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(0, Number(e.target.value)),
                                    )
                                }
                                className="flex-1 h-10 px-3 border border-gray-300 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-[#10bc5d]"
                            />
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-[#10bc5d] hover:bg-[#10bc5d] hover:text-white"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Nút lưu */}
                    <button
                        onClick={handleSaveReport}
                        className="w-full mt-6 bg-[#10bc5d] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        <span>Lưu báo cáo hôm nay</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ServedDishes;
