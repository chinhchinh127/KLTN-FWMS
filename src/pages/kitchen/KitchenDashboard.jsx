import React from "react";

const KitchenDashboard = () => {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#141C21] mb-1">
                    Bảng điều khiển nhà bếp
                </h2>
                <p className="text-sm text-[#8B8B8B]">
                    Theo dõi tình hình hoạt động và cảnh báo lãng phí.
                </p>
            </div>

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#10BC5D] to-green-600 rounded-xl p-5 text-white mb-6">
                <h3 className="text-lg font-bold mb-1">Chào Nguyễn Văn A!</h3>
                <p className="text-sm text-white/90">
                    Hôm nay bạn có 3 cảnh báo cần xử lý.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-[#8B8B8B] mb-2">
                        Lượng lãng phí hôm nay
                    </p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#141C21]">
                            12.5 kg
                        </span>
                        <span className="text-xs text-[#10BC5D] bg-green-50 px-2 py-1 rounded-full">
                            -5%
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-[#8B8B8B] mb-2">Điểm hiệu quả</p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#141C21]">
                            92/100
                        </span>
                        <span className="text-xs text-[#10BC5D] bg-green-50 px-2 py-1 rounded-full">
                            +2%
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <p className="text-xs text-[#8B8B8B] mb-2">
                        Công việc hoàn thành
                    </p>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#141C21]">
                            8/10
                        </span>
                        <span className="text-xs text-[#8B8B8B]">
                            Còn 2 việc
                        </span>
                    </div>
                </div>
            </div>

            {/* Waste Alerts */}
            <div className="mb-6">
                <h3 className="text-base font-bold text-[#141C21] mb-3">
                    Cảnh báo lãng phí
                </h3>

                <div className="space-y-3">
                    <div className="flex gap-3 p-3 bg-rose-50 border border-rose-100 rounded-lg">
                        <div className="bg-rose-500 text-white p-1.5 rounded-lg h-fit">
                            <span className="material-symbols-outlined text-sm">
                                warning
                            </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-rose-900 text-sm">
                                Lãng phí cao tại khu vực Sơ chế
                            </h4>
                            <p className="text-rose-700 text-xs mt-0.5">
                                Vượt 15% so với trung bình
                            </p>
                            <span className="text-xs text-rose-400 mt-1 block">
                                10 phút trước
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                        <div className="bg-amber-500 text-white p-1.5 rounded-lg h-fit">
                            <span className="material-symbols-outlined text-sm">
                                inventory
                            </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-amber-900 text-sm">
                                Nguyên liệu sắp hết hạn
                            </h4>
                            <p className="text-amber-700 text-xs mt-0.5">
                                Cà chua, Hành tây hết hạn trong 24h
                            </p>
                            <span className="text-xs text-amber-400 mt-1 block">
                                25 phút trước
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gợi ý AI */}
            <div>
                <h3 className="text-base font-bold text-[#141C21] mb-3">
                    Gợi ý AI
                </h3>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    {/* Hành tây */}
                    <div className="mb-3">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">Hành tây</span>
                            <span className="text-xs text-[#10BC5D] font-medium">
                                +15%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                            <div
                                className="bg-[#10BC5D] h-1.5 rounded-full"
                                style={{ width: "85%" }}
                            />
                        </div>
                        <p className="text-xs text-[#8B8B8B]">
                            Dự báo cần 12kg hôm nay
                        </p>
                    </div>

                    {/* Cơm trắng */}
                    <div className="mb-3">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">Cơm trắng</span>
                            <span className="text-xs text-rose-500 font-medium">
                                -8%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                            <div
                                className="bg-[#10BC5D] h-1.5 rounded-full"
                                style={{ width: "40%" }}
                            />
                        </div>
                        <p className="text-xs text-[#8B8B8B]">
                            Giảm lượng nấu để tránh lãng phí
                        </p>
                    </div>

                    {/* Mẹo */}
                    <div className="mt-3 p-3 bg-[#10BC5D]/5 rounded-lg border border-[#10BC5D]/20">
                        <div className="flex gap-2">
                            <span className="material-symbols-outlined text-[#10BC5D] text-sm">
                                lightbulb
                            </span>
                            <p className="text-xs text-[#3D3D3D]">
                                Dùng lá súp lơ làm rau xào cho nhân viên để giảm
                                lãng phí.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KitchenDashboard;
