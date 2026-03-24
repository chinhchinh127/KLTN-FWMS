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
import ServedDishes from "./ServedDishes/ServedDishes"; // import component Món ra

const SurplusDishes = () => {
    // State cho thanh điều hướng chính
    const [mainTab, setMainTab] = useState("served"); // "surplus" hoặc "served"

    // Các state cho phần Món dư
    const [activeTab, setActiveTab] = useState("all");
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(0);
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

    // Lọc theo tab con (Tất cả, Đang hoạt động, Đã đóng)
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
            const updatedDishes = dishes.map((dish) =>
                dish.id === selectedDish.id
                    ? { ...dish, prepared: quantity } // ← Đổi từ served thành prepared
                    : dish,
            );
            setDishes(updatedDishes);
            setSelectedDish({ ...selectedDish, prepared: quantity }); // ← Đổi từ served thành prepared
            alert(
                `Đã cập nhật số lượng đã ra cho món ${selectedDish.name}: ${quantity} phần`,
            );
        }
    };

    const handleAddNewReport = () => {
        alert("Thêm báo cáo mới");
    };

    const handleEditClick = (dish) => {
        // e.stopPropagation();
        setSelectedDish(dish);
        setQuantity(dish.prepared);
    };

    const handleRowClick = (dish) => {
        // Chỉ cho phép đổi món nếu đã có món đang được chọn
        setSelectedDish(dish);
        setQuantity(dish.prepared);
    };

    const handleCloseDetail = () => {
        setSelectedDish(null);
    };

    // Component nội dung Món dư (tách riêng để dễ quản lý)
    const SurplusContent = () => (
        <>
            {/* Tabs con (Tất cả, Đang hoạt động, Đã đóng) */}
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

            {/* Bảng món dư */}
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
                                CHUẨN BỊ
                            </th>
                            <th className="px-5 py-4 text-left font-semibold">
                                HAO HỤT
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
                                className={`border-b border-gray-100 hover:bg-gray-50 ${
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
                                    {dish.prepared} phần
                                </td>
                                <td className="px-5 py-4 text-sm text-red-500 font-medium">
                                    {dish.waste} phần
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

                {/* Pagination */}
                <div className="px-5 py-4 border-t border-gray-200 flex justify-between items-center bg-white">
                    <p className="text-sm text-[#8b8b8b]">
                        Hiển thị {startIndex + 1}-
                        {Math.min(startIndex + itemsPerPage, totalItems)} trên{" "}
                        {totalItems} món ăn
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                setCurrentPage((prev) => Math.max(1, prev - 1))
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
                                setCurrentPage((prev) =>
                                    Math.min(totalPages, prev + 1),
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

            {/* Nút Thêm báo cáo mới */}
            <div className="mt-5">
                <button
                    onClick={handleAddNewReport}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#10bc5d] text-white rounded-lg hover:bg-[#0c9c4a] text-sm font-medium"
                >
                    <PlusCircle size={18} />
                    <span>Thêm + báo cáo mới</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-[45px] leading-[55px] font-bold text-[#141c21] mb-2">
                    {mainTab === "surplus"
                        ? "Cập nhật số lượng món dư"
                        : "Cập nhật số lượng món ra"}
                </h2>
                <p className="text-[16px] leading-[26px] text-[#8b8b8b]">
                    {mainTab === "surplus"
                        ? "Danh sách chi tiết hàng ngày kết nối từ bảng thực đơn (dishes) và báo cáo (daily_detail)"
                        : "Danh sách món đã ra trong ngày, kết nối từ bảng thực đơn và báo cáo"}
                </p>
            </div>

            {/* Thanh điều hướng chính */}
            <div className="flex gap-6 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setMainTab("served")}
                    className={`pb-3 text-base font-semibold transition-colors ${
                        mainTab === "served"
                            ? "text-[#10bc5d] border-b-2 border-[#10bc5d]"
                            : "text-[#8b8b8b] hover:text-[#3d3d3d]"
                    }`}
                >
                    Món ra
                </button>
                <button
                    onClick={() => setMainTab("surplus")}
                    className={`pb-3 text-base font-semibold transition-colors ${
                        mainTab === "surplus"
                            ? "text-[#10bc5d] border-b-2 border-[#10bc5d]"
                            : "text-[#8b8b8b] hover:text-[#3d3d3d]"
                    }`}
                >
                    Món dư
                </button>
            </div>

            {/* Nội dung chính */}
            {mainTab === "surplus" ? (
                <div className="flex gap-8 items-start">
                    <div className="flex-1">
                        <SurplusContent />
                    </div>
                    {selectedDish && (
                        // Phần cột phải của món dư (giữ nguyên code cũ)
                        <div className="w-[420px] bg-white rounded-xl border border-gray-200 p-6 shadow-md -mt-20">
                            {/* Nút đóng */}
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={handleCloseDetail}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-[#141c21] mb-5 border-l-4 border-[#10bc5d] pl-3">
                                CHI TIẾT MÓN ĂN
                            </h3>

                            {/* Ảnh món ăn */}
                            <div className="flex justify-center mb-3">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#10bc5d]/20 shadow-md">
                                    <img
                                        src={selectedDish.image}
                                        alt={selectedDish.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Tên món, ID và giá */}
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

                            {/* DANH MỤC */}
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-[#3d3d3d] uppercase">
                                    DANH MỤC
                                </p>
                                <p className="text-base text-[#8b8b8b] mt-1">
                                    {selectedDish.category}
                                </p>
                            </div>

                            {/* NGUYÊN LIỆU TIÊU CHUẨN */}
                            <div className="mb-5">
                                <p className="text-sm font-semibold text-[#3d3d3d] uppercase mb-3">
                                    NGUYÊN LIỆU TIÊU CHUẨN
                                </p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    {selectedDish.ingredients.map(
                                        (item, idx) => (
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
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* CHI PHÍ HAO HỤT và DOANH THU DỰ KIẾN */}
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
                                        {formatPrice(
                                            selectedDish.expectedRevenue,
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* CẬP NHẬT LƯỢNG HAO HỤT */}
                            <div className="pt-2">
                                <p className="text-sm font-semibold text-[#3d3d3d] mb-2 uppercase">
                                    CẬP NHẬT LƯỢNG HAO HỤT
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-[#10bc5d] hover:bg-[#10bc5d] hover:text-white transition-all"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Math.max(
                                                    0,
                                                    Number(e.target.value),
                                                ),
                                            )
                                        }
                                        className="flex-1 h-10 px-3 border border-gray-300 rounded-xl text-center text-base focus:outline-none focus:ring-2 focus:ring-[#10bc5d]"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center text-[#10bc5d] hover:bg-[#10bc5d] hover:text-white transition-all"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Nút lưu báo cáo */}
                            <button
                                onClick={handleSaveReport}
                                className="w-full mt-6 bg-[#10bc5d] text-white py-3 rounded-xl font-semibold text-base hover:bg-[#0c9c4a] transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                <span>Lưu báo cáo hôm nay</span>
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <ServedDishes />
            )}
        </div>
    );
};

export default SurplusDishes;
