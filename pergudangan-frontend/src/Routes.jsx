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
import ManageItem from "@/pages/management/ManageItem";
import ManageTransaction from "@/pages/management/ManageTransaction";
import ManageSupplier from "@/pages/management/ManageSupplier";
import ManageUser from "@/pages/management/ManageUser";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="" element={"Login"}></Route>
                <Route path="register" element={"Register"}></Route>
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
    )
}

export default AppRoutes