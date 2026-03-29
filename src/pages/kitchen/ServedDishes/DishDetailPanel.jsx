import React, { useState } from "react";
import {
    Edit2,
    Minus,
    Plus,
    Save,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const DishDetailPanel = ({
    isTable,
    isDetail,
    isModal,
    dishes,
    selectedDish,
    onRowClick,
    onEditClick,
    formatPrice,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    onPageChange,
    dish,
    quantity,
    onQuantityChange,
    onSave,
    onClose,
    onAdd,
}) => {
    // Modal thêm món
    if (isModal) {
        const [newDish, setNewDish] = useState({
            category: "",
            name: "",
            price: "",
            status: "active",
            served: 0,
        });

        const handlePriceChange = (e) => {
            const numericValue = e.target.value.replace(/[^\d]/g, "");
            setNewDish({
                ...newDish,
                price: numericValue === "" ? "" : parseInt(numericValue, 10),
            });
        };

        const displayPrice = () =>
            newDish.price
                ? new Intl.NumberFormat("vi-VN").format(newDish.price)
                : "";

        const handleServedChange = (e) => {
            const numericValue = e.target.value.replace(/[^\d]/g, "");
            setNewDish({
                ...newDish,
                served: numericValue === "" ? 0 : parseInt(numericValue, 10),
            });
        };

        const handleSubmit = () => {
            if (!newDish.name || !newDish.price)
                return alert("Vui lòng nhập đầy đủ thông tin!");
            onAdd(newDish);
        };

        return (
            <>
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-xl font-bold">
                                Thêm món ăn mới
                            </h3>
                            <button onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    DANH MỤC MÓN ĂN *
                                </label>
                                <select
                                    value={newDish.category}
                                    onChange={(e) =>
                                        setNewDish({
                                            ...newDish,
                                            category: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#10bc5d]"
                                >
                                    <option value="">Chọn danh mục...</option>
                                    {[
                                        "Món chính",
                                        "Món phụ",
                                        "Đồ uống",
                                        "Tráng miệng",
                                    ].map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    TÊN MÓN ĂN *
                                </label>
                                <input
                                    type="text"
                                    value={newDish.name}
                                    onChange={(e) =>
                                        setNewDish({
                                            ...newDish,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="VD: Phở Bò Đặc Biệt"
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#10bc5d]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    ĐƠN GIÁ (₫) *
                                </label>
                                <input
                                    type="text"
                                    value={displayPrice()}
                                    onChange={handlePriceChange}
                                    placeholder="VD: 85000"
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#10bc5d]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    SỐ PHẦN ĐÃ RA
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={newDish.served || ""}
                                    onChange={handleServedChange}
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#10bc5d]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    TRẠNG THÁI
                                </label>
                                <div className="flex gap-6">
                                    {["active", "closed"].map((status) => (
                                        <label
                                            key={status}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="radio"
                                                value={status}
                                                checked={
                                                    newDish.status === status
                                                }
                                                onChange={(e) =>
                                                    setNewDish({
                                                        ...newDish,
                                                        status: e.target.value,
                                                    })
                                                }
                                            />
                                            <span>
                                                {status === "active"
                                                    ? "Hoạt động"
                                                    : "Tạm dừng"}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 p-6 border-t">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 border rounded-lg hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2.5 bg-[#10bc5d] text-white rounded-lg hover:bg-[#0c9c4a]"
                            >
                                Thêm món ăn
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Bảng hiển thị
    if (isTable) {
        return (
            <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-[#8b8b8b] text-xs uppercase">
                            <th className="px-5 py-4 text-left">MÃ ID</th>
                            <th className="px-5 py-4 text-left">TÊN MÓN</th>
                            <th className="px-5 py-4 text-left">ĐÃ RA</th>
                            <th className="px-5 py-4 text-center">HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map((dish) => (
                            <tr
                                key={dish.id}
                                className={`border-b cursor-pointer hover:bg-gray-50 ${selectedDish?.id === dish.id ? "bg-green-50" : ""}`}
                                onClick={() => onRowClick(dish)}
                            >
                                <td className="px-5 py-4 text-sm font-bold text-[#10bc5d]">
                                    {dish.id}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="font-semibold">
                                        {dish.name}
                                    </div>
                                    <div className="text-xs text-[#8b8b8b]">
                                        {formatPrice(dish.price)}
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    {dish.served} phần
                                </td>
                                <td className="px-5 py-4 text-center">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditClick(dish);
                                        }}
                                        className="text-[#10bc5d]"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-5 py-4 border-t flex justify-between items-center">
                    <p className="text-sm text-[#8b8b8b]">
                        Hiển thị {startIndex + 1}-{endIndex} trên {totalItems}{" "}
                        món
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-1.5 disabled:opacity-50"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => onPageChange(i + 1)}
                                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-[#10bc5d] text-white" : "hover:bg-gray-100"}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-1.5 disabled:opacity-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Panel chi tiết
    if (isDetail) {
        const handleDetailServedChange = (e) => {
            const numericValue = e.target.value.replace(/[^\d]/g, "");
            if (numericValue === "") {
                onQuantityChange(-quantity);
            } else {
                const number = parseInt(numericValue, 10);
                if (!isNaN(number) && number >= 0)
                    onQuantityChange(number - quantity);
            }
        };

        return (
            <div className="w-[420px] bg-white rounded-xl border p-6 shadow-md -mt-20">
                <div className="flex justify-end mb-2">
                    <button onClick={onClose} className="text-gray-400">
                        <X size={20} />
                    </button>
                </div>
                <h3 className="text-xl font-bold mb-5 border-l-4 border-[#10bc5d] pl-3">
                    CHI TIẾT MÓN ĂN
                </h3>
                <div className="flex justify-center mb-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#10bc5d]/20 shadow-md">
                        <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="text-center mb-3">
                    <h4 className="text-xl font-bold">{dish.name}</h4>
                    <div className="flex justify-center gap-4 mt-1">
                        <p className="text-sm text-[#8b8b8b]">ID: {dish.id}</p>
                        <p className="text-sm font-semibold text-[#10bc5d]">
                            {formatPrice(dish.price)}
                        </p>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-semibold uppercase">DANH MỤC</p>
                    <p className="text-base text-[#8b8b8b] mt-1">
                        {dish.category}
                    </p>
                </div>
                <div className="mb-5">
                    <p className="text-sm font-semibold uppercase mb-3">
                        NGUYÊN LIỆU TIÊU CHUẨN
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {dish.ingredients.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <span className="text-[#10bc5d]">•</span>
                                <span className="text-sm text-[#8b8b8b]">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-red-50 rounded-xl p-3">
                        <p className="text-xs font-semibold uppercase">
                            CHI PHÍ HAO HỤT
                        </p>
                        <p className="text-lg font-bold text-red-500">
                            {formatPrice(dish.wasteCost)}
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-xs font-semibold uppercase">
                            DOANH THU DỰ KIẾN
                        </p>
                        <p className="text-lg font-bold text-green-500">
                            {formatPrice(dish.expectedRevenue)}
                        </p>
                    </div>
                </div>
                <div className="pt-2">
                    <p className="text-sm font-semibold uppercase mb-2">
                        CẬP NHẬT SỐ LƯỢNG ĐÃ RA
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onQuantityChange(-1)}
                            className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-[#10bc5d] hover:text-white"
                        >
                            <Minus size={18} />
                        </button>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={quantity || ""}
                            onChange={handleDetailServedChange}
                            className="flex-1 h-10 px-3 border rounded-xl text-center focus:ring-2 focus:ring-[#10bc5d]"
                        />
                        <button
                            onClick={() => onQuantityChange(1)}
                            className="w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-[#10bc5d] hover:text-white"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>
                <button
                    onClick={onSave}
                    className="w-full mt-6 bg-[#10bc5d] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                    <Save size={18} /> <span>Lưu báo cáo hôm nay</span>
                </button>
            </div>
        );
    }

    return null;
};

export default DishDetailPanel;
