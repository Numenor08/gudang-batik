import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";

function EditCategoryForm({ category, onClose }) {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const handleEditCategory = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = { name, description };
            await axiosInstance.put(`/api/categories/${category.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setSuccessMessage('Category updated successfully.');
            setLoading(false);
            onClose();
        } catch (error) {
            console.error("Failed: ", error);
            setErrorMessage('Failed to edit category. Please try again.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleEditCategory}>
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <Button disable={loading.toString()} type="submit">Edit Category</Button>
            </div>
        </form>
    );
}

export default EditCategoryForm;