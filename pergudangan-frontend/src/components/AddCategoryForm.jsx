import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import useSWR, { mutate } from 'swr';

function AddCategoryForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { data: categories } = useSWR('/api/categories');

    const handleAddCategory = async (event) => {
        event.preventDefault();
        setLoading(true);
        const newCategory = { name, description };

        // Optimistically update the local data
        mutate('/api/categories', [...categories, newCategory], false);

        try {
            const response = await axiosInstance.post('/api/categories', newCategory);
            setSuccessMessage(response.data.message);
            setName('');
            setDescription('');
            // Revalidate the data after successful API call
            mutate('/api/categories');
        } catch (error) {
            console.error("Failed: ", error);
            setErrorMessage('Failed Adding Category. Please try again.');
            // Rollback the optimistic update
            mutate('/api/categories', categories, false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAddCategory}>
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
                <Button disabled={loading} type="submit">Add Category</Button>
            </div>
        </form>
    );
}

export default AddCategoryForm;