import MyBreadCrumb from "@/components/MyBreadCrumb";

function Profile() {
    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "page", path: "/dashboard/profile", label: "Profile" }]}
            />
            <div className="m-8 flex flex-col gap-8">Profile</div>
        </>
    )
}

export default Profile