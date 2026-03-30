import React from "react";
import {
  Bell,
  User,
  Info,
  Leaf,
  Droplet,
  Utensils,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// 🔥 Fake data chart
const wasteData = [
  { time: "08:00", actual: 8, safe: 10 },
  { time: "10:00", actual: 12, safe: 10 },
  { time: "12:00", actual: 9, safe: 10 },
  { time: "14:00", actual: 14, safe: 10 },
  { time: "16:00", actual: 11, safe: 10 },
  { time: "18:00", actual: 13, safe: 10 },
  { time: "20:00", actual: 15, safe: 10 },
];

const WasteAlert = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Cảnh báo lãng phí
        </h1>
        <div className="flex items-center space-x-4">
          <Bell className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={18} className="text-gray-500" />
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-red-500 p-4 rounded-2xl">
            <Info className="text-white" size={28} />
          </div>

          <div>
            <p className="text-red-500 font-semibold text-sm uppercase">
              Cảnh báo lãng phí
            </p>

            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-black text-gray-800">
                14.2%
              </span>
              <span className="text-red-500 text-sm">
                ↑ Vượt ngưỡng cho phép
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-1">
              Hệ thống ghi nhận sự gia tăng thực phẩm dư thừa trong 4 giờ qua.
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl">
            Xem chi tiết
          </button>
          <button className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl">
            Bỏ qua
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Tổng số thức ăn dư thùa"
          value="42.5 kg"
          badge="+8% vs hôm qua"
          badgeColor="bg-red-50 text-red-500"
        />
        <StatCard
          title="Tỉ lệ tiết kiệm"
          value="8.3%"
          badge="Đang cải thiện"
          badgeColor="bg-green-50 text-green-500"
        />
        <StatCard
          title="Số lượng món cần tối ưu"
          value="12 món"
          badge="Ưu tiên cao"
          badgeColor="bg-orange-50 text-orange-500"
        />
        
      </div>

      {/* Chart + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Xu hướng lãng phí theo giờ
              </h3>
              <p className="text-gray-400 text-xs">
                So sánh thực tế và ngưỡng an toàn (10%)
              </p>
            </div>

            <div className="flex space-x-4 text-xs">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Thực tế
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                Ngưỡng an toàn
              </span>
            </div>
          </div>

          {/* 🔥 Chart thật */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                  }}
                />

                {/* Ngưỡng */}
                <Line
                  type="monotone"
                  dataKey="safe"
                  stroke="#cbd5e1"
                  strokeDasharray="5 5"
                  dot={false}
                />

                {/* Thực tế */}
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ef4444", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}

                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detail */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg mb-6">
            Chi tiết vượt mức
          </h3>

          <div className="space-y-4">
            <ItemDetail icon={<Utensils size={18} />} label="Thịt bò Úc" value="15.5%" />
            <ItemDetail icon={<Leaf size={18} />} label="Xà lách thủy canh" value="12.1%" />
            <ItemDetail icon={<Droplet size={18} />} label="Trứng gà ta" value="10.8%" />
            <ItemDetail icon={<Droplet size={18} />} label="Sữa tươi nguyên chất" value="10.2%" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const StatCard = ({ title, value, badge, badgeColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border">
    <p className="text-gray-400 text-xs mb-2">{title}</p>
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{value}</h2>
      <span className={`px-3 py-1 rounded-full text-xs ${badgeColor}`}>
        {badge}
      </span>
    </div>
  </div>
);

const ItemDetail = ({ icon, label, value }) => (
  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100">
    <div className="flex items-center space-x-3">
      <div className="bg-green-50 p-2 rounded-lg text-green-600">
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </div>
    <span className="text-red-500 font-semibold text-sm">
      {value}
    </span>
  </div>
);

export default WasteAlert;