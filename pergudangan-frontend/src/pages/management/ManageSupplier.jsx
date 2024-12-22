import { useEffect, useState, Suspense } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';
import { DataTableSupplier } from "@/components/MyDataTables";
import AddSupplierDistriForm from "@/components/AddSupplierDistriForm";
import EditSupplierDistriForm from "@/components/EditSupplierDistriForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";
import MyBreadCrumb from "@/components/MyBreadCrumb";
import { SkeletonTable } from "@/components/skeleton/MySkeleton";

function ManageSupplier({ className }) {
    const urlHere = "/dashboard/management/supplier";
    const { setUrl } = useUrl(UrlContext);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    const handleEdit = (supplier) => {
        setSelectedSupplier(supplier);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            try {
                await axiosInstance.delete(`/api/suppliers/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Refresh data or handle delete logic
            } catch (error) {
                console.error('Gagal menghapus barang:', error);
            }
        }
    };

    return (
        <>
        <MyBreadCrumb
            items={[
                { type: "link", path: "/dashboard", label: "Dashboard" },
                { type: "link", path: "", label: "Management" },
                { type: "page", path: urlHere, label: "Supplier" }]}
        />
        <div className={className}>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mb-4">Add New Supplier</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adding New Supplier</DialogTitle>
                            <DialogDescription>Fill this form to add new supplier</DialogDescription>
                        </DialogHeader>
                        <AddSupplierDistriForm type="suppliers" />
                    </DialogContent>
                </Dialog>
                <Suspense fallback={<SkeletonTable loopCol={7} loopRow={10} height={8} />}>
                    <DataTableSupplier onEdit={handleEdit} onDelete={handleDelete} />
                </Suspense>
                {selectedSupplier && (
                    <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Supplier</DialogTitle>
                            </DialogHeader>
                            <EditSupplierDistriForm type="suppliers" supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
            </>
    );
}

export default ManageSupplier;