import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";

const KitchenSidebar = () => {
    return (
        <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="px-5 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="FWMS Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <div>
                        <h1 className="text-lg font-bold text-[#10BC5D]">
                            FWMS
                        </h1>
                        <p className="text-[10px] text-[#8B8B8B]">
                            KITCHEN STAFF
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
                {/* Dashboard - Mặc định active */}
                <NavLink
                    to="/kitchen"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                            isActive
                                ? "bg-[#10BC5D] text-white"
                                : "text-[#3D3D3D] hover:bg-gray-100"
                        }`
                    }
                >
                    <span className="material-symbols-outlined text-xl">
                        dashboard
                    </span>
                    <span className="text-sm font-medium">Bảng điều khiển</span>
                </NavLink>

                {/* Các menu khác nhưng để tạm thời chưa dùng đến */}
                <NavLink
                    to="/kitchen/inventory"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-[#8B8B8B] cursor-not-allowed opacity-50"
                >
                    <span className="material-symbols-outlined text-xl">
                        inventory
                    </span>
                    <span className="text-sm">Kho hàng</span>
                </NavLink>

                <NavLink
                    to="/kitchen/reports"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-[#8B8B8B] cursor-not-allowed opacity-50"
                >
                    <span className="material-symbols-outlined text-xl">
                        analytics
                    </span>
                    <span className="text-sm">Báo cáo</span>
                </NavLink>

                <NavLink
                    to="/kitchen/messages"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-[#8B8B8B] cursor-not-allowed opacity-50"
                >
                    <span className="material-symbols-outlined text-xl">
                        message
                    </span>
                    <span className="text-sm">Tin nhắn</span>
                </NavLink>
            </div>

            {/* User Info & Logout */}
            <div className="px-3 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#10BC5D] flex items-center justify-center text-white text-xs font-bold">
                        NV
                    </div>
                    <div>
                        <p className="text-xs font-medium text-[#141C21]">
                            Nguyễn Văn A
                        </p>
                        <p className="text-[10px] text-[#8B8B8B]">
                            Nhân viên bếp
                        </p>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-[#8B8B8B] hover:text-[#141C21] w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-xs">
                    <span className="material-symbols-outlined text-sm">
                        logout
                    </span>
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default KitchenSidebar;
