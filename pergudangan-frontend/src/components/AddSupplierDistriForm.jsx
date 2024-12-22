// src/components/AddSupplierForm.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";

function AddSupplierDistriForm({type}) {
    const [name, setName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [img, setImg] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const handleAddSupplier = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('contact_person', contactPerson);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('address', address);
            formData.append('img', img);
            console.log('formData:', ...formData);

            const response = await axiosInstance.post(`/api/${type}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setLoading(false);
            setName('');
            setContactPerson('');
            setPhone('');
            setEmail('');
            setAddress('');
        } catch (error) {
            console.error('Register error:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to add supplier. Please try again.');
            setSuccessMessage('');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAddSupplier}>
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input id="contactPerson" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="img">Image</Label>
                    <Input id="img" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} required />
                </div>
                <Button disable={loading.toString()} type="submit">Tambah Supplier</Button>
            </div>
        </form>
    );
}

export default AddSupplierDistriForm;