import React, { useState, useEffect, useCallback } from "react";
import DishFilterTabs from "./DishFilterTabs";
import DishDetailPanel from "./DishDetailPanel";
import { kitchenDishAPI } from "../../../services/kitchenApi";
import { jwtDecode } from "jwt-decode";
import { Calendar, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ServedDishes = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [brandId, setBrandId] = useState(null);
    const [allMasterDishes, setAllMasterDishes] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const itemsPerPage = 5;

    // Lấy brandID từ token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.brandID) {
                    setBrandId(decoded.brandID);
                } else {
                    setError("Không tìm thấy thông tin brand trong token");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setError("Lỗi xác thực, vui lòng đăng nhập lại");
                setLoading(false);
            }
        } else {
            setError("Vui lòng đăng nhập để tiếp tục");
            setLoading(false);
        }
    }, []);

    // Fetch tất cả món ăn từ API mới
    const fetchAllMasterDishes = useCallback(async () => {
        try {
            const response = await kitchenDishAPI.getAllDishes();
            console.log("All master dishes response:", response);

            if (response.success && response.data) {
                const formattedDishes = response.data.map((dish) => ({
                    id: dish.id,
                    name: dish.name,
                }));
                setAllMasterDishes(formattedDishes);
                console.log("Formatted master dishes:", formattedDishes);
            }
        } catch (error) {
            console.error("Error fetching all master dishes:", error);
            toast.error("Không thể tải danh sách món ăn");
        }
    }, []);

    // Format ngày tháng
    const formatDate = (date) => {
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    // Fetch dishes với ngày được chọn
    const fetchDishes = useCallback(async () => {
        if (!brandId) return;
        setLoading(true);
        setError(null);
        try {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            const response = await kitchenDishAPI.getDishesOutput(
                brandId,
                formattedDate,
            );
            console.log("API Response:", response);

            if (response.success && response.data) {
                const formattedDishes = response.data.map((item) => ({
                    id: item.id,
                    dailyDetailId: item.id,
                    name: item.dish?.name || "Unknown",
                    served: item.quantity_prepared || 0,
                    price: item.dish?.price || 0,
                    status: item.quantity_wasted > 0 ? "closed" : "active",
                    category: item.dish?.category || "Món chính",
                    ingredients: item.dish?.ingredients || [],
                    revenue_cost: parseFloat(item.revenue_cost) || 0,
                    waste_cost: parseFloat(item.waste_cost) || 0,
                    image:
                        item.dish?.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150",
                    quantity_prepared: item.quantity_prepared,
                    quantity_wasted: item.quantity_wasted,
                    dishId: item.dish?.id,
                }));
                console.log("Formatted dishes with costs:", formattedDishes);
                setDishes(formattedDishes);
                setLastUpdated(new Date());
            } else {
                setError(response.message || "Không thể tải dữ liệu");
            }
        } catch (err) {
            console.error("Error fetching dishes:", err);
            setError(
                err.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu",
            );
        } finally {
            setLoading(false);
        }
    }, [brandId, selectedDate]);

    // Fetch master dishes khi component mount
    useEffect(() => {
        fetchAllMasterDishes();
    }, [fetchAllMasterDishes]);

    // Fetch khi brandId hoặc selectedDate thay đổi
    useEffect(() => {
        if (brandId) {
            fetchDishes();
        }
    }, [brandId, selectedDate, fetchDishes]);

    // Auto refresh mỗi 30 giây
    useEffect(() => {
        const interval = setInterval(() => {
            if (brandId && !loading) {
                fetchDishes();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [brandId, loading, fetchDishes]);

    // Thay đổi ngày
    const handleDateChange = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
        setCurrentPage(1);
        setSelectedDish(null);
    };

    const handleRefresh = () => {
        fetchDishes();
        toast.success("Đã làm mới dữ liệu", {
            duration: 2000,
        });
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat("vi-VN").format(price) + "₫";

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

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(0, prev + delta));
    };

    const handleSaveReport = async () => {
        if (selectedDish) {
            const toastId = toast.loading("Đang cập nhật số lượng...");
            try {
                const updateData = {
                    quantity_prepared: quantity,
                    quantity_wasted: selectedDish.quantity_wasted || 0,
                };

                const response = await kitchenDishAPI.updateDishesOutput(
                    selectedDish.dailyDetailId,
                    updateData,
                );

                if (response.success) {
                    await fetchDishes();
                    setSelectedDish(null);
                    setLastUpdated(new Date());
                    toast.success(
                        `Đã cập nhật số lượng cho món ${selectedDish.name}: ${quantity} phần`,
                        { id: toastId, duration: 3000 },
                    );
                } else {
                    throw new Error(response.message || "Cập nhật thất bại");
                }
            } catch (error) {
                console.error("Error updating dish:", error);
                toast.error(
                    error.response?.data?.message ||
                        "Có lỗi xảy ra khi cập nhật số lượng",
                    { id: toastId, duration: 4000 },
                );
            }
        }
    };

    const handleAddNewDish = async (newDishData) => {
        const toastId = toast.loading("Đang thêm món...");
        try {
            console.log("=== BẮT ĐẦU THÊM MÓN ===");
            console.log("newDishData:", newDishData);

            if (!newDishData.name || !newDishData.quantity_prepared) {
                console.error("Thiếu dữ liệu:", newDishData);
                toast.error("Vui lòng nhập đầy đủ thông tin", { id: toastId });
                return;
            }

            const existingDailyDish = dishes.find(
                (d) => d.name.toLowerCase() === newDishData.name.toLowerCase(),
            );

            if (existingDailyDish) {
                const updatedQuantity =
                    existingDailyDish.served + newDishData.quantity_prepared;
                const updateData = {
                    quantity_prepared: updatedQuantity,
                    quantity_wasted: existingDailyDish.quantity_wasted || 0,
                };
                await kitchenDishAPI.updateDishesOutput(
                    existingDailyDish.dailyDetailId,
                    updateData,
                );
                await fetchDishes();
                toast.success(
                    `Đã cập nhật món ${existingDailyDish.name}: +${newDishData.quantity_prepared} phần`,
                    { id: toastId, duration: 3000 },
                );
                setShowAddForm(false);
                return;
            }

            const existingMasterDish = allMasterDishes.find(
                (d) => d.name.toLowerCase() === newDishData.name.toLowerCase(),
            );

            if (!existingMasterDish) {
                toast.error(
                    `❌ Món "${newDishData.name}" không có trong hệ thống. Vui lòng chỉ thêm món từ danh sách đã có.`,
                    { id: toastId, duration: 4000 },
                );
                return;
            }

            const requestData = {
                dishes_id: existingMasterDish.id,
                quantity_prepared: Number(newDishData.quantity_prepared),
            };

            const response = await kitchenDishAPI.createDishesDaily(
                brandId,
                requestData,
            );

            if (response.success) {
                await fetchDishes();
                toast.success(`✅ Đã thêm món ${newDishData.name} thành công`, {
                    id: toastId,
                    duration: 3000,
                });
                setShowAddForm(false);
            } else {
                throw new Error(response.message || "Thêm món thất bại");
            }
        } catch (error) {
            console.error("LỖI CHI TIẾT:", error);

            let errorMessage = "Có lỗi xảy ra khi thêm món";
            let errorTitle = "Lỗi";

            if (error.response?.data) {
                const errorData = error.response.data;

                // Kiểm tra nếu là lỗi không đủ nguyên liệu
                if (
                    errorData.errors &&
                    errorData.errors.includes("Not enough ingredient")
                ) {
                    errorTitle = "⚠️ KHÔNG ĐỦ NGUYÊN LIỆU";

                    // Parse chi tiết lỗi nguyên liệu
                    const match = errorData.errors.match(
                        /Not enough ingredient: (.*?)\. Required: ([\d.]+), Available: ([\d.]+)/,
                    );
                    if (match) {
                        const ingredient = match[1].trim();
                        const required = parseFloat(match[2]);
                        const available = parseFloat(match[3]);

                        errorMessage =
                            `📦 Nguyên liệu: ${ingredient}\n` +
                            `📊 Yêu cầu: ${required.toLocaleString()} đơn vị\n` +
                            `📉 Tồn kho: ${available.toLocaleString()} đơn vị\n` +
                            `❗ Thiếu: ${(required - available).toLocaleString()} đơn vị\n\n` +
                            `💡 Vui lòng giảm số lượng món hoặc bổ sung nguyên liệu.`;
                    } else {
                        errorMessage = errorData.errors;
                    }
                }
                // Các lỗi khác
                else if (errorData.message) {
                    errorMessage = errorData.message;
                    if (errorData.errors) {
                        errorMessage += `\n${errorData.errors}`;
                    }
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            // Hiển thị toast với title và message rõ ràng
            toast.error(
                <div className="space-y-2">
                    <div className="font-bold text-red-600">{errorTitle}</div>
                    <div className="whitespace-pre-line text-sm">
                        {errorMessage}
                    </div>
                </div>,
                {
                    id: toastId,
                    duration: 8000, // Lâu hơn để đọc lỗi
                    closeButton: true,
                },
            );
            throw error;
        }
    };

    const handleRowClick = (dish) => {
        console.log("Row clicked - dish data:", dish);
        setSelectedDish(dish);
        setQuantity(dish.served);
    };

    if (loading && dishes.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Đang tải dữ liệu...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header với ngày tháng và refresh */}
            <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-[#10bc5d]" size={20} />
                        <span className="font-semibold">Ngày:</span>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-medium px-4">
                                {formatDate(selectedDate)}
                            </span>
                        </div>
                    </div>
                    {selectedDate.toDateString() ===
                        new Date().toDateString() && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Hôm nay
                        </span>
                    )}
                    {selectedDate.toDateString() <
                        new Date().toDateString() && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            Ngày cũ
                        </span>
                    )}
                </div>
                <button
                    onClick={handleRefresh}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Làm mới dữ liệu"
                >
                    <RefreshCw size={18} className="text-gray-600" />
                </button>
            </div>

            <div className="flex gap-8 items-start">
                <div className="flex-1">
                    <DishFilterTabs
                        activeTab={activeTab}
                        onTabChange={(tab) => {
                            setActiveTab(tab);
                            setCurrentPage(1);
                        }}
                        totalAll={dishes.length}
                        totalActive={
                            dishes.filter((d) => d.status === "active").length
                        }
                        totalClosed={
                            dishes.filter((d) => d.status === "closed").length
                        }
                        onAddNew={() => setShowAddForm(true)}
                        disabled={
                            selectedDate.toDateString() !==
                            new Date().toDateString()
                        }
                    />
                    <DishDetailPanel
                        isTable={true}
                        dishes={currentDishes}
                        selectedDish={selectedDish}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        startIndex={startIndex}
                        endIndex={Math.min(
                            startIndex + itemsPerPage,
                            totalItems,
                        )}
                        totalItems={totalItems}
                        onRowClick={handleRowClick}
                        onEditClick={handleRowClick}
                        onPageChange={setCurrentPage}
                        formatPrice={formatPrice}
                        isReadOnly={
                            selectedDate.toDateString() !==
                            new Date().toDateString()
                        }
                    />
                </div>
                {selectedDish && (
                    <DishDetailPanel
                        isDetail={true}
                        dish={selectedDish}
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                        onSave={handleSaveReport}
                        onClose={() => setSelectedDish(null)}
                        formatPrice={formatPrice}
                        isReadOnly={
                            selectedDate.toDateString() !==
                            new Date().toDateString()
                        }
                    />
                )}

                {showAddForm && (
                    <DishDetailPanel
                        isModal={true}
                        onAdd={handleAddNewDish}
                        onClose={() => setShowAddForm(false)}
                        existingDishes={dishes}
                        selectedDate={selectedDate}
                        allMasterDishes={allMasterDishes}
                    />
                )}
            </div>
        </div>
    );
};

export default ServedDishes;
