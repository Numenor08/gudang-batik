import { useEffect, Suspense } from "react";
import { useUrl } from '@/hooks/UrlProvider';
import { useAuth } from "@/hooks/AuthProvider";
import {DataTableBatik2} from "@/components/MyDataTables";
import {AddItemButton} from "@/components/AddItemButton";
import axiosInstance from "@/utils/axiosInstance";
import MyBreadCrumb from "@/components/MyBreadCrumb";
import { SkeletonTable } from "@/components/skeleton/MySkeleton";

function ManageItem({className}) {
    const urlHere = "/dashboard/management/item";
    const { setUrl } = useUrl();
    const { token } = useAuth();

    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            try {
                await axiosInstance.delete(`/api/batik/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
                <Suspense fallback={<SkeletonTable loopRow={25} loopCol={8} height={8} className="h-full w-full" />}>
                    <DataTableBatik2 onDelete={handleDelete} />
                </Suspense>
            </div>
        </div>
        </>
    );
}

export default ManageItem;