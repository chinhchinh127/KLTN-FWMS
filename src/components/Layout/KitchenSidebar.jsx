import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    BarChart3,
    MessageSquare,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    PlusCircle,
} from "lucide-react";
import logo from "../../assets/logo.svg";

const KitchenSidebar = () => {
    const location = useLocation();
    const [openMenus, setOpenMenus] = useState({
        kitchen: true,
    });

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const isKitchenActive = location.pathname.includes("/kitchen");

    return (
        <div className="w-[280px] bg-white h-screen border-r border-gray-200 flex flex-col flex-shrink-0">
            {/* Logo */}
            <div className="px-4 py-5 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="FWMS Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <div>
                        <h1 className="text-xl font-bold text-[#10BC5D] leading-tight">
                            FWMS
                        </h1>
                        <p className="text-[10px] text-[#8B8B8B] tracking-wider">
                            KITCHEN STAFF
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3">
                {/* Dashboard */}
                <NavLink
                    to="/kitchen"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                            isActive
                                ? "bg-[#10BC5D] text-white"
                                : "text-[#3D3D3D] hover:bg-gray-100"
                        }`
                    }
                >
                    <LayoutDashboard size={18} />
                    <span className="text-sm font-medium">Bảng điều khiển</span>
                </NavLink>

                {/* Kho hàng */}
                <NavLink
                    to="/kitchen/inventory"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                            isActive
                                ? "bg-[#10BC5D] text-white"
                                : "text-[#3D3D3D] hover:bg-gray-100"
                        }`
                    }
                >
                    <Package size={18} />
                    <span className="text-sm font-medium">Kho hàng</span>
                </NavLink>

                {/* Báo cáo lãng phí */}
                <NavLink
                    to="/kitchen/waste-report"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                            isActive
                                ? "bg-[#10BC5D] text-white"
                                : "text-[#3D3D3D] hover:bg-gray-100"
                        }`
                    }
                >
                    <BarChart3 size={18} />
                    <span className="text-sm font-medium">
                        Báo cáo lãng phí
                    </span>
                </NavLink>

                {/* Món dư */}
                <NavLink
                    to="/kitchen/surplus-dishes"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                            isActive
                                ? "bg-[#10BC5D] text-white"
                                : "text-[#3D3D3D] hover:bg-gray-100"
                        }`
                    }
                >
                    <PlusCircle size={18} />
                    <span className="text-sm font-medium">Món dư</span>
                </NavLink>

                {/* Tin nhắn */}
                <NavLink
                    to="/kitchen/messages"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                            isActive
                                ? "bg-[#10BC5D] text-white"
                                : "text-[#3D3D3D] hover:bg-gray-100"
                        }`
                    }
                >
                    <MessageSquare size={18} />
                    <span className="text-sm font-medium">Tin nhắn</span>
                </NavLink>

                {/* Cài đặt */}
                <NavLink
                    to="/kitchen/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                            isActive
                                ? "bg-[#10BC5D] text-white"
                                : "text-[#3D3D3D] hover:bg-gray-100"
                        }`
                    }
                >
                    <Settings size={18} />
                    <span className="text-sm font-medium">Cài đặt</span>
                </NavLink>
            </div>

            {/* User Info - Cố định dưới cùng */}
            <div className="px-3 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#10BC5D] flex items-center justify-center text-white text-sm font-bold">
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
                <button className="flex items-center gap-2 text-[#8B8B8B] hover:text-[#141C21] w-full px-3 py-1.5 rounded-lg hover:bg-gray-100 text-xs">
                    <LogOut size={14} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default KitchenSidebar;
