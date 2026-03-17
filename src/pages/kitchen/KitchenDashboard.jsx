import React from "react";
import {
    Bell,
    Search,
    ChevronRight,
    AlertTriangle,
    Package,
    Lightbulb,
    Home,
    Menu,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Clock,
} from "lucide-react";

const KitchenDashboard = () => {
    return (
        <div className="flex h-screen bg-[#F5F7FA] font-['Nunito',sans-serif]">
            {/* Sidebar */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-[#8B8B8B]">
                                Bảng điều khiển
                            </span>
                            <ChevronRight
                                size={14}
                                className="text-[#8B8B8B]"
                            />
                            <span className="text-[#10BC5D]">Tổng quan</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B8B8B]"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="w-[300px] pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#10BC5D]"
                                />
                            </div>
                            <button className="relative p-2 hover:bg-gray-100 rounded-full">
                                <Bell size={20} className="text-[#3D3D3D]" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF4D4F] rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-[#10BC5D] to-green-600 rounded-2xl p-6 text-white mb-8">
                        <h2 className="text-2xl font-bold font-['Arimo',sans-serif] mb-2">
                            Chào buổi sáng, Nguyễn Văn A!
                        </h2>
                        <p className="text-white/90 text-sm max-w-xl">
                            Hãy kiểm tra các gợi ý AI để chuẩn bị nguyên liệu
                            tối ưu nhất.
                        </p>
                    </div>

                    {/* Waste Alerts */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-[#141C21] font-['Arimo',sans-serif]">
                                Cảnh báo lãng phí
                            </h3>
                            <button className="text-[#10BC5D] text-sm font-medium hover:underline">
                                Xem tất cả
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Alert 1 */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <div className="flex gap-3">
                                    <div className="bg-red-100 p-2 rounded-lg h-fit">
                                        <AlertTriangle
                                            size={20}
                                            className="text-red-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="font-bold text-[#141C21] text-sm">
                                                Lãng phí cao tại khu vực Sơ chế
                                            </h4>
                                            <div className="flex items-center text-xs text-[#8B8B8B]">
                                                <Clock
                                                    size={12}
                                                    className="mr-1"
                                                />
                                                10 phút
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#666] mt-1">
                                            Lượng vỏ rau củ bỏ đi vượt mức trung
                                            bình 15%. Cần kiểm tra kỹ thuật gọt
                                            vỏ của nhân viên mới.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Alert 2 */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <div className="flex gap-3">
                                    <div className="bg-orange-100 p-2 rounded-lg h-fit">
                                        <Package
                                            size={20}
                                            className="text-orange-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className="font-bold text-[#141C21] text-sm">
                                                Nguyên liệu sắp hết hạn
                                            </h4>
                                            <div className="flex items-center text-xs text-[#8B8B8B]">
                                                <Clock
                                                    size={12}
                                                    className="mr-1"
                                                />
                                                25 phút
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#666] mt-1">
                                            Cà chua và Hành tây sẽ hết hạn trong
                                            24 giờ tới. Hãy ưu tiên sử dụng cho
                                            các món soup hôm nay.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Suggestions */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[#10BC5D] font-bold text-lg">
                                ✨
                            </span>
                            <h3 className="text-lg font-bold text-[#141C21] font-['Arimo',sans-serif]">
                                Gợi ý AI
                            </h3>
                        </div>

                        <p className="text-sm text-[#8B8B8B] mb-4">
                            Dự báo chuẩn bị cho ngày hôm nay
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Gà */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h4 className="font-bold text-[#141C21] mb-2">
                                    Gà
                                </h4>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-bold text-[#141C21]">
                                        40
                                    </span>
                                    <span className="text-xs text-[#8B8B8B]">
                                        xuất
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="text-[#FFA940]">
                                        Dư thừa: 5
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                                    <div
                                        className="bg-[#10BC5D] h-1.5 rounded-full"
                                        style={{ width: "80%" }}
                                    ></div>
                                </div>
                            </div>

                            {/* Cơm trắng */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h4 className="font-bold text-[#141C21] mb-2">
                                    Cơm trắng
                                </h4>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-bold text-[#141C21]">
                                        100
                                    </span>
                                    <span className="text-xs text-[#8B8B8B]">
                                        xuất
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="text-[#FFA940]">
                                        Dư thừa: 10
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                                    <div
                                        className="bg-[#10BC5D] h-1.5 rounded-full"
                                        style={{ width: "90%" }}
                                    ></div>
                                </div>
                            </div>

                            {/* Sườn */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <h4 className="font-bold text-[#141C21] mb-2">
                                    Sườn
                                </h4>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-2xl font-bold text-[#141C21]">
                                        20
                                    </span>
                                    <span className="text-xs text-[#8B8B8B]">
                                        xuất
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="text-[#FFA940]">
                                        Dư thừa: 10
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                                    <div
                                        className="bg-[#10BC5D] h-1.5 rounded-full"
                                        style={{ width: "50%" }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Mẹo giảm lãng phí */}
                        <div className="mt-4 bg-[#F6FFED] border border-[#B7EB8F] rounded-xl p-4">
                            <div className="flex gap-3">
                                <div className="bg-[#10BC5D] p-2 rounded-lg h-fit">
                                    <Lightbulb
                                        size={20}
                                        className="text-white"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#141C21] text-sm mb-1">
                                        Mẹo giảm lãng phí
                                    </h4>
                                    <p className="text-sm text-[#3D3D3D]">
                                        Sử dụng lá súp lơ còn dư để làm món rau
                                        xào thập cẩm cho suất ăn nhân viên.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active, badge }) => {
    return (
        <a
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                    ? "bg-[#10BC5D] text-white"
                    : "text-[#3D3D3D] hover:bg-gray-100"
            }`}
        >
            <span className={active ? "text-white" : "text-[#8B8B8B]"}>
                {icon}
            </span>
            <span className="flex-1">{label}</span>
            {badge && (
                <span className="bg-[#FF4D4F] text-white text-xs px-1.5 rounded-full">
                    {badge}
                </span>
            )}
        </a>
    );
};

export default KitchenDashboard;
