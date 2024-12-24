import MyBreadCrumb from "@/components/MyBreadCrumb";
import ProfileForm from "@/components/ProfileForm";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { SkeletonProfileForm } from "@/components/skeleton/MySkeleton";

function Profile() {
    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "page", path: "/dashboard/profile", label: "Profile" }]}
            />
            <div className="m-8 flex flex-col gap-8">
                <ErrorBoundary fallback={<SkeletonProfileForm message="Failed to fetch, please try again!" />}>
                    <Suspense fallback={<SkeletonProfileForm />}>
                        <ProfileForm />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default Profile;