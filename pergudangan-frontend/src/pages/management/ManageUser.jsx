import { useEffect, useState, Suspense } from "react";
import { useUrl } from '@/hooks/UrlProvider';
import { DataTableUser, DataTableError } from "@/components/MyDataTables";
import EditUserForm from "@/components/EditUserForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";
import MyBreadCrumb from "@/components/MyBreadCrumb";
import { SkeletonTable } from "@/components/skeleton/MySkeleton";
import { ErrorBoundary } from "react-error-boundary";

function ManageUser({ className }) {
    const urlHere = "/dashboard/management/user";
    const { setUrl } = useUrl();
    const [selectedUser, setSelectedUser] = useState(null);
    const {  userId } = useAuth();

    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
            try {
                await axiosInstance.delete(`/api/auth/${id}`);
                // Refresh data or handle delete logic
            } catch (error) {
                console.error('Gagal menghapus pengguna:', error);
            }
        }
    };

    return (<>
        <MyBreadCrumb
            items={[
                { type: "link", path: "/dashboard", label: "Dashboard" },
                { type: "link", path: "", label: "Management" },
                { type: "page", path: urlHere, label: "User" }]}
        />
        <div className={className}>
            <h1 className="text-3xl font-bold">User Management</h1>
            <ErrorBoundary fallback={<DataTableError />}>
                <Suspense fallback={<SkeletonTable loopCol={5} loopRow={8} height={8} />}>
                    <DataTableUser onEdit={handleEdit} onDelete={handleDelete} />
                </Suspense>
            </ErrorBoundary>
            {selectedUser && (
                <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>Update user details</DialogDescription>
                        </DialogHeader>
                        <EditUserForm user={selectedUser} onClose={() => setSelectedUser(null)} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    </>
    );
}

export default ManageUser;