import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ChatWidget from "./components/ChatWidget";
import KitchenLayout from "./components/Layout/KitchenLayout"; // COMMENT
// Kitchen pages
import KitchenDashboard from "./pages/kitchen/KitchenDashboard"; // COMMENT
// Admin/Main pages
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import FoodData from "./pages/FoodData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Revenue from "./pages/Revenue";
import PrivateRoute from "./components/PrivateRoute";
import WasteHistory from "./pages/WasteHistory";
import Manager_Account_Staff from "./pages/Manager_Account_Staff";
import FoodManager from "./pages/foodManager";
import IngredientManager from "./pages/IngredientManager";
import SurplusDishes from "./pages/kitchen/SurplusDishes";
import ProfilePage from "./pages/kitchen/ProfilePage";
import SurplusReport from "./pages/kitchen/reports/SurplusReport";
import RevenueReport from "./pages/kitchen/reports/RevenueReport";
import WasteReport from "./pages/kitchen/reports/WasteReport";
import ReportExport from "./pages/kitchen/ReportExport";
import KitchenRoute from "./components/KitchenRoute";
import WasteAlert from "./components/WasteAlert";
import WasteReportPage from "./components/WasteReportPage";
function App() {
    return (
        <Router basename="/KLTN-FWMS">
            <Routes>
                {/* Admin routes */}
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
                    <Route path="foods" element={<FoodManager />} />
                    <Route path="ingredients" element={<IngredientManager />} />
                    <Route path="waste-report" element={<WasteAlert />} />
                    <Route path="waste-base" element={<WasteReportPage />} />
                    <Route
                        path="accounts"
                        element={<Manager_Account_Staff />}
                    />
                    <Route path="revenue" element={<Revenue />} />
                    <Route path="waste-history" element={<WasteHistory />} />
                </Route>

                {/* Tạm thời comment kitchen routes  */}
                <Route
                    path="/kitchen"
                    element={
                        <KitchenRoute>
                            <KitchenLayout />
                        </KitchenRoute>
                    }
                >
                    <Route index element={<KitchenDashboard />} />
                    <Route path="surplus-dishes" element={<SurplusDishes />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="waste-report" element={<WasteAlert />} />
                    <Route path="waste-base" element={<WasteReportPage />} />
                    
                </Route>
            </Routes>
        </Router>
    );
}
export default App;
