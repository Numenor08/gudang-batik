import { useEffect, useState, Suspense } from "react";
import { UrlContext, useUrl } from '@/hooks/UrlProvider';
import { DataTableDistributor, DataTableError } from "@/components/MyDataTables";
import AddSupplierDistriForm from "@/components/AddSupplierDistriForm";
import EditSupplierDistriForm from "@/components/EditSupplierDistriForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";
import MyBreadCrumb from "@/components/MyBreadCrumb";
import { SkeletonTable } from "@/components/skeleton/MySkeleton";
import { ErrorBoundary } from "react-error-boundary";
import { supplierColumns } from "@/components/Columns";

function Distributor({ className }) {
    const urlHere = "/dashboard/distributor";
    const { setUrl } = useUrl(UrlContext);
    const [selectedDistributor, setSelectedDistributor] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    const handleEdit = (supplier) => {
        setSelectedDistributor(supplier);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            try {
                await axiosInstance.delete(`/api/distributors/${id}`, {
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
                    { type: "page", path: urlHere, label: "Distributor" }]}
            />
            <div className={className}>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mb-4">Add New Distributor</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adding New Distributor</DialogTitle>
                                <DialogDescription>Fill this form to add new distributor</DialogDescription>
                            </DialogHeader>
                            <AddSupplierDistriForm type="distributors" />
                        </DialogContent>
                    </Dialog>
                    <ErrorBoundary fallback={<DataTableError columns={supplierColumns}/>}>
                        <Suspense fallback={<SkeletonTable loopCol={7} loopRow={10} height={8} />}>
                            <DataTableDistributor onEdit={handleEdit} onDelete={handleDelete} />
                        </Suspense>
                    </ErrorBoundary>
                    {selectedDistributor && (
                        <Dialog open={!!selectedDistributor} onOpenChange={() => setSelectedDistributor(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Distributor</DialogTitle>
                                </DialogHeader>
                                <EditSupplierDistriForm type="distributors" supplier={selectedDistributor} onClose={() => setSelectedDistributor(null)} />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </>
    )
}

export default Distributor