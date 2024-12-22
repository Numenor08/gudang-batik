import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/AuthProvider";
import useSWR from "swr";

function AddTransactionForm({className}) {
    const { token } = useAuth();
    const [type, setType] = useState('In');
    const [quantity, setQuantity] = useState('');
    const [batik, setBatik] = useState('');
    const [supplierDistributor, setSupplierDistributor] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: suppliers } = useSWR('/api/suppliers');
    const { data: distributors } = useSWR('/api/distributors');
    const { data: batiks } = useSWR('/api/batik');

    const handleAddTransaction = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const lowerType = type.toLowerCase();
            const formData = {
                type: lowerType,
                quantity,
                batik_id: batik,
                supplier_id: lowerType === 'in' ? supplierDistributor : null,
                distributor_id: lowerType === 'out' ? supplierDistributor : null,
            };
            await axiosInstance.post('/api/transactions', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccessMessage('Transaction added successfully.');
            setErrorMessage('');
            setLoading(false);
            setType('In');
            setQuantity('');
            setBatik('');
            setSupplierDistributor('');
            setContactPerson('');
        } catch (error) {
            console.error('Failed to add transaction:', error);
            setErrorMessage('Failed to add transaction. Please try again.');
            setSuccessMessage('');
            setLoading(false);
        }
    };

    const handleSupplierDistributorChange = (value) => {
        setSupplierDistributor(value);
        const selected = [...(suppliers || []), ...(distributors || [])].find(item => item.id === Number(value));
        setContactPerson(selected ? selected.contact_person : '');
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Add New Transaction</CardTitle>
                <CardDescription>Fill this form to add a new transaction</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAddTransaction}>
                    {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
                    {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="type">Type</label>
                            <Select id="type" value={type} onValueChange={(value) => setType(value)} required>
                                <SelectTrigger>
                                    <span>{type}</span>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="In">In</SelectItem>
                                    <SelectItem value="Out">Out</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity</label>
                            <Input id="quantity" type="number" value={quantity} placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="batik">Batik</label>
                            <Select id="batik" value={batik} onValueChange={(value) => setBatik(value)} required>
                                <SelectTrigger>
                                    <span>{batik ? batiks.find(b => b.id === Number(batik))?.name : "Select Batik"}</span>
                                </SelectTrigger>
                                <SelectContent>
                                    {batiks && batiks.map((b) => (
                                        <SelectItem key={b.id} value={b.id}>
                                            {b.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="supplierDistributor">{type === 'In' ? 'Supplier' : 'Distributor'}</label>
                            <Select id="supplierDistributor" value={supplierDistributor} onValueChange={handleSupplierDistributorChange} required>
                                <SelectTrigger>
                                    <span>{supplierDistributor ? [...(suppliers || []), ...(distributors || [])].find(item => item.id === Number(supplierDistributor))?.name : `Select ${type === 'In' ? 'Supplier' : 'Distributor'}`}</span>
                                </SelectTrigger>
                                <SelectContent>
                                    {type === 'In' && suppliers && suppliers.map((sup) => (
                                        <SelectItem key={sup.id} value={sup.id}>
                                            {sup.name} (Supplier)
                                        </SelectItem>
                                    ))}
                                    {type === 'Out' && distributors && distributors.map((dist) => (
                                        <SelectItem key={dist.id} value={dist.id}>
                                            {dist.name} (Distributor)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="contactPerson">Contact Person</label>
                            <Input id="contactPerson" type="text" placeholder="Contact Person" value={contactPerson} readOnly />
                        </div>
                        <Button disable={loading.toString()} className='max-w-72' type="submit">Add Transaction</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default AddTransactionForm;