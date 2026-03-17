import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import FoodData from "./pages/FoodData";
import Layout from "./components/Layout/Layout";
import KitchenLayout from "./components/Layout/KitchenLayout";

// Kitchen pages
import KitchenDashboard from "./pages/kitchen/KitchenDashboard";

import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                {/* Admin routes - dùng Layout cũ */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="food-data" element={<FoodData />} />
                </Route>

                {/* Kitchen routes - dùng KitchenLayout riêng */}
                <Route path="/kitchen" element={<KitchenLayout />}>
                    <Route index element={<KitchenDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
