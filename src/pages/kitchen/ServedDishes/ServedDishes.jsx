import React, { useState } from "react";
import DishFilterTabs from "./DishFilterTabs";
import DishDetailPanel from "./DishDetailPanel";

const ServedDishes = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddForm, setShowAddForm] = useState(false);
    const itemsPerPage = 5;

    const [dishes, setDishes] = useState([
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

    const handleSaveReport = () => {
        if (selectedDish) {
            setDishes(
                dishes.map((dish) =>
                    dish.id === selectedDish.id
                        ? { ...dish, served: quantity }
                        : dish,
                ),
            );
            setSelectedDish({ ...selectedDish, served: quantity });
            alert(
                `Đã cập nhật số lượng cho món ${selectedDish.name}: ${quantity} phần`,
            );
        }
    };

    const handleAddNewDish = (newDish) => {
        const newId = `KT${String(dishes.length + 1).padStart(3, "0")}`;
        setDishes([
            ...dishes,
            {
                ...newDish,
                id: newId,
                wasteCost: newDish.served * 10000,
                expectedRevenue: newDish.served * newDish.price,
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150",
                ingredients: [],
            },
        ]);
        setShowAddForm(false);
        alert(`Đã thêm món ${newDish.name} thành công!`);
    };

    const handleRowClick = (dish) => {
        setSelectedDish(dish);
        setQuantity(dish.served);
    };

    return (
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
                />

                <DishDetailPanel
                    isTable={true}
                    dishes={currentDishes}
                    selectedDish={selectedDish}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    startIndex={startIndex}
                    endIndex={Math.min(startIndex + itemsPerPage, totalItems)}
                    totalItems={totalItems}
                    onRowClick={handleRowClick}
                    onEditClick={handleRowClick}
                    onPageChange={setCurrentPage}
                    formatPrice={formatPrice}
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
                />
            )}

            {showAddForm && (
                <DishDetailPanel
                    isModal={true}
                    onAdd={handleAddNewDish}
                    onClose={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
};

export default ServedDishes;
