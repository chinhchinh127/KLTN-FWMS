import React from "react";
import { Outlet } from "react-router-dom";
import KitchenSidebar from "./KitchenSidebar";

const KitchenLayout = () => {
    return (
        <div className="flex h-screen bg-white">
            <KitchenSidebar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default KitchenLayout;
