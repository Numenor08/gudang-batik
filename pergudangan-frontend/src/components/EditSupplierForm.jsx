// src/components/EditSupplierForm.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";

function EditSupplierForm({ supplier, onClose }) {
    const [name, setName] = useState(supplier.name);
    const [contactPerson, setContactPerson] = useState(supplier.contact_person);
    const [phone, setPhone] = useState(supplier.phone);
    const [email, setEmail] = useState(supplier.email);
    const [address, setAddress] = useState(supplier.address);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const handleEditSupplier = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = {
                name,
                contact_person: contactPerson,
                phone,
                email,
                address,
            };
            await axiosInstance.put(`/api/suppliers/${supplier.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage('Supplier updated successfully.');
            setLoading(false);
            onClose();
        } catch (error) {
            console.error('Register error:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to add supplier. Please try again.');
            setErrorMessage('Failed to update supplier. Please try again.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleEditSupplier}>
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="name">Nama</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="contactPerson">Kontak</Label>
                    <Input id="contactPerson" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="address">Alamat</Label>
                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <Button disable={loading} type="submit">Edit Supplier</Button>
            </div>
        </form>
    );
}

export default EditSupplierForm;