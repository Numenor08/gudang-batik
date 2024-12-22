import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";

function AddCategoryForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const handleAddCategory = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = { name, description };
            const response = await axiosInstance.post('/api/categories', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setSuccessMessage(response.data.message);
            setLoading(false);
            setName('');
            setDescription('');
        } catch (error) {
            console.error("Failed: ", error);
            setErrorMessage('Failed Adding Category. Please try again.');
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
                <Button disable={loading.toString()} type="submit">Add Category</Button>
            </div>
        </form>
    );
}

export default AddCategoryForm;