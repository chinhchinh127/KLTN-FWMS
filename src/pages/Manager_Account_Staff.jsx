import React, { useState } from "react";
import { Row_Account_Staff } from "../components/Child/Row_Account_Staff";

const Manager_Account_Staff = () => {
    const [openform_addkitchen, setopenform_setkitchen] = useState(null);
    const [visibility_password, setVisibility_password] = useState(null);
    return (
        <div>
            <meta charSet="utf-8" />
            <meta
                content="width=device-width, initial-scale=1.0"
                name="viewport"
            />
            <title>Quản lý tài khoản nhân viên</title>
            <link
                href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&family=Nunito:wght@400;600;700&family=Public+Sans:wght@400;500;600;700;900&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />
            <style
                dangerouslySetInnerHTML={{
                    __html: "\n        body { font-family: 'Nunito', sans-serif; }\n        h1, h2, h3, h4 { font-family: 'Arimo', sans-serif; }\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n    ",
                }}
            />
            <div className="flex min-h-screen pl-8">
                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
                        <div className="flex items-center flex-1">
                            <div className="relative max-w-md w-full">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    search
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm"
                                    placeholder="Tìm kiếm tài khoản..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                                <span className="material-symbols-outlined">
                                    notifications
                                </span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                            </button>
                            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <span className="material-symbols-outlined">
                                    help_outline
                                </span>
                            </button>
                        </div>
                    </header>

                    <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
                        {/* Page Title & Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    Quản lý tài khoản nhân viên
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">
                                    Danh sách tất cả nhân viên thuộc quyền quản
                                    lý của bạn
                                </p>
                            </div>
                            <button
                                onClick={() => setopenform_setkitchen(true)}
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all"
                            >
                                <span className="material-symbols-outlined">
                                    person_add
                                </span>
                                Thêm tài khoản Kitchen
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-slate-200 dark:border-slate-800">
                            <nav className="flex gap-8">
                                <button className="pb-4 px-1 border-b-2 border-primary text-primary font-bold text-sm">
                                    Tất cả (24)
                                </button>
                                <button className="pb-4 px-1 border-b-2 border-transparent text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-slate-700 dark:hover:text-slate-200">
                                    Đang hoạt động (18)
                                </button>
                                <button className="pb-4 px-1 border-b-2 border-transparent text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-slate-700 dark:hover:text-slate-200">
                                    Đã khóa (6)
                                </button>
                            </nav>
                        </div>
                        {/* List Kitchen Staff  */}
                        <Row_Account_Staff />
                        {/* List Kitchen Staff  */}
                    </div>
                    {/* form add kitchen */}
                    {openform_addkitchen && (
                        <div
                            div
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        >
                            <div className="bg-white dark:bg-slate-900 w-full max-w-[520px] rounded-xl shadow-2xl overflow-hidden">
                                {/* Modal Header */}
                                <div className="px-8 pt-8 pb-4">
                                    <h5 className="font-arimo text-[24px] font-bold text-[#141C21] mb-1">
                                        Thêm tài khoản Bếp
                                    </h5>
                                    <p className="text-muted-text text-sm font-nunito">
                                        Tạo tài khoản mới cho nhân viên bộ phận
                                        bếp của đơn vị.
                                    </p>
                                </div>
                                {/* Modal Body / Form */}
                                <form className="px-8 pb-8 space-y-5">
                                    {/* Full Name */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="label-style">
                                            Họ tên
                                        </label>
                                        <input
                                            className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito"
                                            placeholder="Nhập họ và tên đầy đủ"
                                            type="text"
                                        />
                                    </div>
                                    {/* Email */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="label-style">
                                            Email
                                        </label>
                                        <input
                                            className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito"
                                            placeholder="example@domain.com"
                                            type="email"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="label-style">
                                            Số điện thoại
                                        </label>
                                        <input
                                            className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito"
                                            placeholder="0345651074"
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="label-style">
                                            Địa chỉ
                                        </label>
                                        <input
                                            className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito"
                                            placeholder="123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
                                            type="text"
                                        />
                                    </div>
                                    {/* Password */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="label-style">
                                            Mật khẩu
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito pr-12"
                                                placeholder="Nhập mật khẩu"
                                                type={
                                                    visibility_password == true
                                                        ? "text"
                                                        : "password"
                                                }
                                            />
                                            <button
                                                onClick={() =>
                                                    setVisibility_password(!visibility_password)
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-primary transition-colors"
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    visibility
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-end gap-3 pt-4">
                                        <button
                                            onClick={() =>
                                                setopenform_setkitchen(false)
                                            }
                                            className="px-6 py-2.5 rounded-lg border border-primary/30 text-secondary-text font-nunito font-semibold hover:bg-primary/5 transition-all"
                                            type="button"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            className="px-8 py-2.5 rounded-lg bg-primary text-white font-nunito font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                            type="submit"
                                        >
                                            Tạo tài khoản
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            {/* Modal Mockup for 'Chỉnh sửa thông tin người dùng' - Hidden by default but structured for visualization */}
            <div
                div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden"
            >
                <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Chỉnh sửa tài khoản
                        </h3>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Họ và tên
                                </label>
                                <input
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary"
                                    type="text"
                                    defaultValue="Nguyễn Văn A"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Vai trò
                                </label>
                                <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary">
                                    <option selected>Kitchen Staff</option>
                                    <option>Kitchen Lead</option>
                                    <option>Inventory Manager</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                Email
                            </label>
                            <input
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-primary focus:border-primary"
                                type="email"
                                defaultValue="a.nguyen@kitchen.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                Trạng thái tài khoản
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        defaultChecked
                                        className="text-primary focus:ring-primary"
                                        name="status"
                                        type="radio"
                                    />
                                    <span className="text-sm">Hoạt động</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        className="text-primary focus:ring-primary"
                                        name="status"
                                        type="radio"
                                    />
                                    <span className="text-sm">
                                        Khóa tài khoản
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex gap-3 justify-end">
                        <button className="px-6 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:underline">
                            Hủy bỏ
                        </button>
                        <button className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manager_Account_Staff;
