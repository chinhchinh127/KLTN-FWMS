import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 ml-72 overflow-auto">
                <main className="min-h-screen bg-gray-50">
                    <Outlet /> {/* THAY {children} BẰNG Outlet */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
