import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedLogin from "@/components/ProtectedLogin";
import Dashboard from "@/pages/Dashboard";
import Item from "@/pages/Item";
import Transaction from "@/pages/Transaction";
import Report from "@/pages/Report";
import Profile from "@/pages/Profile";
import Distributor from "@/components/Distributor";
import Supplier from "@/components/Supplier";
import ManageItem from "@management/ManageItem";
import ManageUser from "@management/ManageUser";
import ManageCategory from "@management/ManageCategory";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import { SWRConfig } from 'swr';
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";
import ForgotPassword from "@/pages/ForgotPassword";

function AppRoutes() {
    const { token } = useAuth();
    const fetcher = async (url) => {
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Error: ${error.response.statusText}`);
            } else if (error.request) {
                throw new Error("Error: No response received");
            } else {
                throw new Error(`Error: ${error.message}`);
            }
        }
    };
    return (
        <SWRConfig
            value={{
                fetcher: (url) => fetcher(url, token),
                suspense: true,
                refreshInterval: 5000,
            }}>
            <Router>
                <Routes>
                    <Route element={<ProtectedLogin />}>
                        <Route path="" element={<LoginPage />}></Route>
                        <Route path="register" element={<RegisterPage />}></Route>
                        <Route path="resetPassword" element={<ForgotPassword />}></Route>
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard/*" element={<Dashboard />}>
                            <Route path="" element={<Item />} />
                            <Route path="management/*">
                                <Route path="item" element={<ManageItem className="m-8 flex flex-col gap-8" />} />
                                <Route path="category" element={<ManageCategory className="m-8 flex flex-col gap-8" />} />
                                <Route path="user" element={<ManageUser className="m-8 flex flex-col gap-8" />} />
                            </Route>
                            <Route path="distributor" element={<Distributor className="m-8 flex flex-col gap-8" />} />
                            <Route path="supplier" element={<Supplier className="m-8 flex flex-col gap-8" />} />
                            <Route path="transaction" element={<Transaction />} />
                            <Route path="report" element={<Report />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </SWRConfig>
    )
}

export default AppRoutes