import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Item from "@/pages/Item";
import Management from "@/pages/Management";
import Transaction from "@/pages/Transaction";
import Supplier from "@/pages/Supplier";
import Report from "@/pages/Report";
import Setting from "@/pages/Setting";
import Profile from "@/pages/Profile";
import ManageItem from "@management/ManageItem";
import ManageTransaction from "@management/ManageTransaction";
import ManageSupplier from "@management/ManageSupplier";
import ManageUser from "@management/ManageUser";
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
            const response = await axiosInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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
                refreshInterval: 10000,
            }}>
            <Router>
                <Routes>
                    <Route path="" element={<LoginPage />}></Route>
                    <Route path="register" element={<RegisterPage />}></Route>
                    <Route path="resetPassword" element={<ForgotPassword />}></Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard/*" element={<Dashboard />}>
                            <Route path="" element={<Item />} />
                            <Route path="management/*" element={<Management />}>
                                <Route path="item" element={<ManageItem />} />
                                <Route path="transaction" element={<ManageTransaction />} />
                                <Route path="supplier" element={<ManageSupplier />} />
                                <Route path="user" element={<ManageUser />} />
                            </Route>
                            <Route path="transaction" element={<Transaction />} />
                            <Route path="supplier" element={<Supplier />} />
                            <Route path="report" element={<Report />} />
                            <Route path="setting" element={<Setting />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </SWRConfig>
    )
}

export default AppRoutes