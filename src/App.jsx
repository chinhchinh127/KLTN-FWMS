import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import KitchenLayout from './components/Layout/KitchenLayout'; // COMMENT

// Kitchen pages
import KitchenDashboard from './pages/kitchen/KitchenDashboard'; // COMMENT

// Admin/Main pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import FoodData from "./pages/FoodData";

function App() {
    return (
        <Router>
            <Routes>
                {/* Admin routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="food-data" element={<FoodData />} />
                </Route>

                {/* Tạm thời comment kitchen routes  */}
                <Route path="/kitchen" element={<KitchenLayout />}>
                    <Route index element={<KitchenDashboard />} />
                </Route>

                {/* Manager Routes */}
            </Routes>
        </Router>
    );
}

export default App;
