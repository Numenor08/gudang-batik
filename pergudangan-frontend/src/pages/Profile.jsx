import MyBreadCrumb from "@/components/MyBreadCrumb";
import ProfileForm from "@/components/ProfileForm";

function Profile() {
    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "page", path: "/dashboard/profile", label: "Profile" }]}
            />
            <div className="m-8 flex flex-col gap-8">
                <ProfileForm />
            </div>
        </>
    )
}

export default Profile