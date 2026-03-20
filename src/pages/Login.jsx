import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        // ⚠️ Demo: kiểm tra đơn giản
        if (email && password) {
            localStorage.setItem("token", "123"); // giả lập đăng nhập

            navigate("/app"); // 👉 chuyển vào hệ thống
        } else {
            alert("Vui lòng nhập đầy đủ thông tin!");
        }
    };
    return (

        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
                <h1 className="font-semibold text-gray-700 text-lg">
                    🍃 Food Waste
                </h1>

                <p className="text-sm text-gray-500">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-green-600 font-medium hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </div>

            {/* Center Form */}
            <div className="flex justify-center items-center h-[80vh] px-4">

                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Chào mừng trở lại
                    </h1>

                    <p className="text-gray-500 mb-6">
                        Vui lòng đăng nhập vào tài khoản của bạn để tiếp tục.
                    </p>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Email hoặc Mã nhân viên
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@company.com hoặc NV-001"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4 relative">
                        <label className="block text-sm text-gray-600 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        {/* Toggle */}
                        <span
                            className="absolute right-3 top-9 cursor-pointer text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            👁
                        </span>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="mr-2" />
                            Ghi nhớ tôi
                        </label>

                        <a href="#" className="text-sm text-green-600 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Đăng nhập
                    </button>




                </div>
            </div>
        </div>
    );
}

export default Login;