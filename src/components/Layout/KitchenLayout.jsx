import React from "react";
import { Outlet } from "react-router-dom";
import KitchenSidebar from "./KitchenSidebar";

const KitchenLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-white">
            <KitchenSidebar />
            <div className="flex-1 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default KitchenLayout;
