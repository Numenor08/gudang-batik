import { useEffect, useState, Suspense } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';
import { DataTableSupplier } from "@/components/MyDataTables";
import AddSupplierForm from "@/components/AddSupplierForm";
import EditSupplierForm from "@/components/EditSupplierForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";

function ManageSupplier() {
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
                    <AddSupplierForm />
                </DialogContent>
            </Dialog>
            <Suspense fallback={<div>Loading...</div>}>
                <DataTableSupplier onEdit={handleEdit} onDelete={handleDelete} />
            </Suspense>
            {selectedSupplier && (
                <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Supplier</DialogTitle>
                        </DialogHeader>
                        <EditSupplierForm supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

export default ManageSupplier;