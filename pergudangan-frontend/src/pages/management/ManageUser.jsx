import { useEffect, useState, Suspense } from "react";
import { useUrl } from '@/hooks/UrlProvider';
import { DataTableUser } from "@/components/MyDataTables";
import EditUserForm from "@/components/EditUserForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";
import MyBreadCrumb from "@/components/MyBreadCrumb";

function ManageUser({className}) {
    const urlHere = "/dashboard/management/user";
    const { setUrl } = useUrl();
    const [selectedUser, setSelectedUser] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
            try {
                await axiosInstance.delete(`/api/auth/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
            <Suspense fallback={<div>Loading...</div>}>
                <DataTableUser onEdit={handleEdit} onDelete={handleDelete} />
            </Suspense>
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