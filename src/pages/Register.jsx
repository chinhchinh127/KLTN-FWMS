import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        storeName: "",
        address: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate đơn giản
        if (
            !form.name ||
            !form.phone ||
            !form.email ||
            !form.password ||
            !form.storeName ||
            !form.address
        ) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Lưu tạm user (demo)
        localStorage.setItem("user", JSON.stringify(form));

        alert("Đăng ký thành công!");

        // Quay về login
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
                <h1 className="font-semibold text-gray-700 text-lg">
                    🍃 Food Waste
                </h1>

                <p className="text-sm text-gray-500">
                    Đã có tài khoản?{" "}
                    <Link to="/" className="text-green-600 font-medium hover:underline">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>

            {/* Background */}
            <div className="relative h-56">
                <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDa1r5p50EHorOhlEa4-vTQ5IvgtfrbGHam2exNGCeifhLrvuHtkOPqdzoVIaW911WrysjV_XE9q2k4l3VcHesNAmuKQsRu8KI17NElGXvKNLRzCbWyvFeWg9wjDsd-HqytN1N5QYt_aAMhFjT3FSGCijzliFIojkDRqKxGr74dFbENbFsPKCk_WB7-Os6EA7dynW5tcsQQQkrsu0ghlZYua56wO9_1H4SgMzFHN93aYRqZ54Oedkgx0x7M-N5YZe30DMJ3IEh2C974')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-white/70"></div>
            </div>

            {/* Form */}
            <div className="relative z-10 flex justify-center -mt-24 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl"
                >
                    <h2 className="text-xl font-bold mb-2">
                        Đăng ký tài khoản quản lý
                    </h2>

                    <p className="text-gray-500 mb-6 text-sm">
                        Vui lòng điền đầy đủ thông tin bên dưới để bắt đầu tối ưu hóa thực phẩm.
                    </p>

                    {/* Thông tin cá nhân */}
                    <h3 className="font-semibold mb-3 text-green-600">
                        Thông tin cá nhân
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nhập họ và tên"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="email@vi-du.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Thông tin nhà hàng */}
                    <h3 className="font-semibold mb-3 text-green-600">
                        Thông tin nhà hàng - khách sạn
                    </h3>

                    <div className="space-y-4 mb-6">
                        <input
                            name="storeName"
                            value={form.storeName}
                            onChange={handleChange}
                            placeholder="Nhập tên nhà hàng hoặc khách sạn"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Số nhà, tên đường, quận/huyện, thành phố"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Xác nhận đăng ký
                    </button>

                    {/* Footer */}
                    <p className="text-center text-sm mt-4">
                        Quay lại trang{" "}
                        <Link to="/" className="text-green-600">
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;