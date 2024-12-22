import { useEffect, useState, Suspense } from 'react';
import { useUrl } from '@/hooks/UrlProvider';
import MyBreadCrumb from "@/components/MyBreadCrumb";
import { DataTableCategory } from "@/components/MyDataTables";
import AddCategoryForm from "@/components/AddCategoryForm";
import EditCategoryForm from "@/components/EditCategoryForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";

const ManageCategory = ({ className }) => {
    const urlHere = "/dashboard/management/category";
    const { setUrl } = useUrl();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        setUrl(urlHere);
    }, [setUrl]);

    const handleEdit = (category) => {
        setSelectedCategory(category);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
            try {
                await axiosInstance.delete(`/api/categories/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Refresh data or handle delete logic
            } catch (error) {
                console.error('Gagal menghapus kategori:', error);
            }
        }
    };

    return (
        <>
            <MyBreadCrumb
                items={[
                    { type: "link", path: "/dashboard", label: "Dashboard" },
                    { type: "link", path: "", label: "Management" },
                    { type: "page", path: urlHere, label: "Category" }]}
            />
            <div className={className}>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mb-4">Add New Category</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adding New Category</DialogTitle>
                                <DialogDescription>Fill this form to add new category</DialogDescription>
                            </DialogHeader>
                            <AddCategoryForm />
                        </DialogContent>
                    </Dialog>
                    <Suspense fallback={<div>Loading...</div>}>
                        <DataTableCategory onEdit={handleEdit} onDelete={handleDelete} />
                    </Suspense>
                    {selectedCategory && (
                        <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Category</DialogTitle>
                                </DialogHeader>
                                <EditCategoryForm category={selectedCategory} onClose={() => setSelectedCategory(null)} />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </>
    );
}

export default ManageCategory;