import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 ml-72 overflow-auto">
                <main className="min-h-screen bg-gray-50">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
