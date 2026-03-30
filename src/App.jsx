import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Toaster } from "sonner";


import KitchenLayout from "./components/Layout/KitchenLayout"; // COMMENT

// Kitchen pages
import KitchenDashboard from "./pages/kitchen/KitchenDashboard"; // COMMENT

// Manager Pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import FoodData from "./pages/FoodData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Revenue from "./pages/Revenue";
import PrivateRoute from "./components/PrivateRoute";
import WasteHistory from "./pages/WasteHistory";
import Manager_Account_Staff from "./pages/Manager_Account_Staff";
import SurplusDishes from "./pages/kitchen/SurplusDishes";
import KitchenRoute from "./components/KitchenRoute";

//Admin Pages
import { AdminRoute } from "./components/AdminRoute";
import { LayoutAdmin } from "./components/Layout/LayoutAdmin";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";

function App() {
    return (
        <>
            <Toaster position="top-right" richColors />
            <Router basename="/KLTN-FWMS">
                <Routes>
                    {/* Manager Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/app"
                        element={
                            <PrivateRoute>
                                <Layout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="food-data" element={<FoodData />} />

                        <Route
                            path="accounts"
                            element={<Manager_Account_Staff />}
                        />
                        <Route path="revenue" element={<Revenue />} />
                        <Route path="waste-history" element={<WasteHistory />} />
                    </Route>

                    {/* Kitchen Routes */}
                    <Route path="/kitchen"
                        element={
                            <KitchenRoute>
                                <KitchenLayout />
                            </KitchenRoute>
                        }>
                        <Route index element={<KitchenDashboard />} />
                        <Route path="surplus-dishes" element={<SurplusDishes />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <LayoutAdmin />
                            </AdminRoute>}
                    >
                        <Route path="dashboard" element={<AdminDashboard/>} />
                    </Route>
                </Routes>

            </Router>
        </>
    );
}

export default App;
