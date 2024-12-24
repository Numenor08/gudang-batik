import { useEffect, Suspense } from "react";
import { useUrl } from '@/hooks/UrlProvider';
import {DataTableBatik2, DataTableError} from "@/components/MyDataTables";
import {AddItemButton} from "@/components/AddItemButton";
import axiosInstance from "@/utils/axiosInstance";
import MyBreadCrumb from "@/components/MyBreadCrumb";
import { SkeletonTable } from "@/components/skeleton/MySkeleton";
import { ErrorBoundary } from "react-error-boundary";
import { batikColumns } from "@/components/Columns";

function ManageItem({className}) {
    const urlHere = "/dashboard/management/item";
    const { setUrl } = useUrl();

    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            try {
                await axiosInstance.delete(`/api/batik/${id}`);
                // Refresh data or navigate to another page
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
                { type: "page", path: urlHere, label: "Item(Batik)" }]}
        />
        <div className={className}>
            <div>
                <AddItemButton />
                <ErrorBoundary fallback={<DataTableError columns={batikColumns}></DataTableError>}>
                    <Suspense fallback={<SkeletonTable loopRow={25} loopCol={8} height={8} className="h-full w-full" />}>
                        <DataTableBatik2 onDelete={handleDelete} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
        </>
    );
}

export default ManageItem;