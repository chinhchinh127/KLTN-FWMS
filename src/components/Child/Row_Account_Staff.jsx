import React, { useEffect, useState } from 'react'
import data from "../.././MockAPI/List_KitchenStaff.json"
export const Row_Account_Staff = () => {
    const [datastaff, setDatastaff] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [openform_changekitchen, setopenform_changekitchen] = useState(null);
    const [visibility_password, setVisibility_Password] = useState(null);
    useEffect(() => {
        setDatastaff(data);
    }, []);

    function handleDelete(id) {
        const isOk = window.confirm("Bạn chắc chắn muốn xóa nhân viên này!");
        if (isOk) {
            const newdatastaff = datastaff.filter(staff => staff.id !== id);
            setDatastaff(newdatastaff);
        }

    }
    // console.log(datastaff);

    return (
        <>
            <div className={`w-full gap-8 transition-all duration-300 flex relative`}>
                {/* Table Section */}
                <div className={`space-y-6 transition-all duration-300 ${selectedStaff == null ? "w-full" : "w-2/3"}`}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className={`text-left border-collapse w-full`}>
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-center">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Họ và tên</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vai trò</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trạng thái</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 ">

                                    {datastaff.map((staff) => (
                                        <tr key={staff.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group text-center">

                                            <td className="px-3 py-4 text-sm font-medium">
                                                {staff.id}
                                            </td>

                                            <td className="px-3 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                        {staff.name?.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col text-left">
                                                        <span className="text-sm font-bold">
                                                            {staff.name}
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {staff.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-3 py-4">
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold ">
                                                    {staff.role}
                                                </span>
                                            </td>

                                            <td className="px-3 py-4">
                                                <span className={` text-xs font-bold  ${staff.status == 1 ? "text-emerald-600" : "text-[#94A3B8]"}`}>
                                                    {staff.status == 1 ? (<span className='items-center flex gap-[5px] justify-center' ><i class="fa-solid fa-circle text-[8px] "></i> Đang hoạt động</span>) : (<span className='items-center flex gap-[5px] justify-center'><i class="fa-solid fa-lock text-[8px]"></i> Đã khóa</span>)}
                                                </span>
                                            </td>

                                            <td className='flex justify-center text-[24px] mt-[24%]'>
                                                {staff.status == 1 ? (<i class="fa-solid fa-toggle-on text-emerald-600 cursor-pointer"></i>) : (<i class="fa-solid fa-toggle-off text-[#94A3B8] cursor-pointer"></i>)}
                                            </td>

                                            <td className="px-3 py-4 text-right w-1">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button key={staff.id} onClick={() => setSelectedStaff(staff)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400" title="Xem thông tin">
                                                        <span className="material-symbols-outlined text-[20px] mt-[6px]">visibility</span>
                                                    </button>
                                                    <button onClick={() => setopenform_changekitchen(staff)} className="p-2 hover:bg-primary/10 rounded-lg text-primary" title="Chỉnh sửa">
                                                        <span className="material-symbols-outlined text-[20px] mt-[6px]">edit</span>
                                                    </button>
                                                    <button onClick={() => handleDelete(staff.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-500" title="Xóa">
                                                        <span className="material-symbols-outlined text-[20px] mt-[6px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {openform_changekitchen && (
                                        <div div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                                            <div className="bg-white dark:bg-slate-900 w-full max-w-[520px] rounded-xl shadow-2xl overflow-hidden">
                                                {/* Modal Header */}
                                                <div className="px-8 pt-8 pb-4">
                                                    <h5 className="font-arimo text-[24px] font-bold text-[#141C21] mb-1">Sửa thông tin tài khoản Bếp</h5>
                                                    <p className="text-muted-text text-sm font-nunito">Chỉnh sửa thông tin mới cho nhân viên bộ phận bếp của đơn vị.</p>
                                                </div>
                                                {/* Modal Body / Form */}
                                                <form className="px-8 pb-8 space-y-5">
                                                    {/* Full Name */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="label-style">Họ tên</label>
                                                        <input defaultValue={openform_changekitchen.name} className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito" placeholder="Nhập họ và tên đầy đủ" type="text" />

                                                    </div>
                                                    {/* Email */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="label-style">Email</label>
                                                        <input defaultValue={openform_changekitchen.email} className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito" placeholder="example@domain.com" type="email" />
                                                    </div>
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="label-style">Số điện thoại</label>
                                                        <input defaultValue={openform_changekitchen.phonenumber} className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito" placeholder="0345651074" type="text" />
                                                    </div>
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="label-style">Địa chỉ</label>
                                                        <input defaultValue={openform_changekitchen.address} className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito" placeholder="123 Đường Nguyễn Huệ, Quận 1, TP.HCM" type="text" />
                                                    </div>
                                                    {/* Password */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="label-style">Mật khẩu</label>
                                                        <div className="relative">
                                                            <input defaultValue={openform_changekitchen.password} className="form-input w-full rounded-lg border-primary/20 bg-background-light px-4 py-3 text-secondary-text focus:border-primary focus:ring-primary/20 font-nunito pr-12" placeholder="Nhập mật khẩu" type={visibility_password ? "text" : "password"} />
                                                            <button onClick={() => setVisibility_Password(!visibility_password)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-primary transition-colors" type="button">
                                                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center justify-end gap-3 pt-4">
                                                        <button onClick={() => setopenform_changekitchen(false)} className="px-6 py-2.5 rounded-lg border border-primary/30 text-secondary-text font-nunito font-semibold hover:bg-primary/5 transition-all" type="button">
                                                            Hủy
                                                        </button>
                                                        <button className="px-8 py-2.5 rounded-lg bg-primary text-white font-nunito font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all" type="submit">
                                                            Lưu thay đổi
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-sm text-slate-500">Đang hiển thị 1-3 của 24 nhân viên</span>
                            <div className="flex gap-2">
                                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50" disabled>
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
                                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 font-bold text-sm">2</button>
                                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 font-bold text-sm">3</button>
                                <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800">
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Detail Section (Simulated Sidebar Info) */}
                {selectedStaff && (
                    <>
                        <div className={`transition-all duration-300 ease-in-out w-[30%] bg-white absolute right-0  dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 group p-6`}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Xem thông tin cá nhân</h3>
                                <button onClick={() => setopenform_changekitchen(true)} className="text-primary hover:underline text-sm font-bold">Chỉnh sửa</button>
                            </div>
                            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                                <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-black mb-4 border-4 border-white dark:border-slate-800 shadow-xl">
                                    {selectedStaff.name.charAt(0)}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{selectedStaff.name}</h4>
                                <p className="text-slate-500 font-medium">{selectedStaff.role}</p>
                                <div className="mt-4 flex gap-2">
                                    <span className={`px-3 py-1 ${selectedStaff.status == 1 ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-[#F1F5F9] dark:bg-emerald-900/30 text-[#475569] dark:text-emerald-400"} rounded-full text-xs font-bold`}>{selectedStaff.status == 1 ? (<span className='items-center flex gap-[5px]' ><i class="fa-solid fa-circle text-[8px]"></i> Đang hoạt động</span>) : (<span className='items-center flex gap-[5px]'><i class="fa-solid fa-lock text-[10px]"></i> Đã khóa</span>)}</span>

                                    <span className={`px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold`}>KT00{selectedStaff.id}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Email</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{selectedStaff.email}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Số điện thoại</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{selectedStaff.phonenumber}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Ngày gia nhập</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">15/03/2023</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Địa chỉ</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium truncate">{selectedStaff.address}</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <button className="w-full py-3 border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-xl transition-colors">
                                    Xem doanh thu
                                </button>
                            </div>

                            <button onClick={() => setSelectedStaff(null)} className='absolute top-0 right-[-16px] group-hover:opacity-100 opacity-0 transition-all duration-300 group-hover:translate-y-[-14.5px]  rounded-[50%]'><i class="fa-solid fa-circle-xmark text-red-500 text-3xl"></i></button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
