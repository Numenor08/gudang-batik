import MyBreadCrumb from "@/components/MyBreadCrumb";
import { Outlet } from "react-router-dom";

function Management() {
    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "page", path: "/dashboard/management", label: "Management" }]}
            />
            <div className="m-8 flex flex-col gap-8"> <Outlet /> </div>
        </>
    )
}

export default Management