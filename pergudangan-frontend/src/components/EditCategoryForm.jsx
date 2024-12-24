import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { mutate } from 'swr';

function EditCategoryForm({ category, onClose }) {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEditCategory = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = { name, description };
        
        // Optimistically update the category data
        mutate(`/api/categories/${category.id}`, { ...category, ...formData }, false);

        try {
            await axiosInstance.put(`/api/categories/${category.id}`, formData);
            setSuccessMessage('Category updated successfully.');
            mutate(`/api/categories/${category.id}`);
            onClose();
        } catch (error) {
            console.error("Failed: ", error);
            setErrorMessage('Failed to edit category. Please try again.');
            // Revert the optimistic update
            mutate(`/api/categories/${category.id}`);
        } finally {
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