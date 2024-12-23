import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { startTransition } from "react";
import useSWR, { mutate } from "swr";
import axiosInstance from "@/utils/axiosInstance";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

function AddItemForm() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [stock, setStock] = useState('');
    const [minStock, setMinStock] = useState('');
    const [img, setImg] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: Categories } = useSWR('/api/categories');

    const handleAddItem = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('category_id', Number(category));
            formData.append('color', color);
            formData.append('size', size);
            formData.append('stock', stock);
            formData.append('min_stock', minStock);
            formData.append('img', img);

            const response = await axiosInstance.post('/api/batik', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setSuccessMessage(response.data.message);
            setLoading(false);
            setName('');
            setCategory('');
            setColor('');
            setSize('');
            setStock('');
            setMinStock('');
            setImg(null);
            startTransition(() => {
                // Handle successful item addition
                // Refresh data or navigate to another page
                mutate('/api/batik', async (items) => {
                    const newItem = {
                        id: Date.now(), // Temporary ID
                        name,
                        category_id: Number(category),
                        color,
                        size,
                        stock,
                        min_stock: minStock,
                        img: URL.createObjectURL(img), // Temporary image URL
                    };
                    return [...items, newItem];
                }, false);
            })
        } catch (error) {
            console.error("Failed: ", error);
            setErrorMessage('Failed Adding Item. Please try again.');
        }
    };

    return (
        <form onSubmit={handleAddItem}>
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="name">Nama</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={category} onValueChange={(value) => setCategory(value)} required>
                        <SelectTrigger id="category">
                            <span>{category ? Categories.find(cat => cat.id === Number(category))?.name : "Pilih Kategori"}</span>
                        </SelectTrigger>
                        <SelectContent>
                            {Categories && Categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="color">Ukuran</Label>
                    <Select id="color" value={size} onValueChange={(value) => setSize(value)} required>
                        <SelectTrigger>
                            <span>{size || "Pilih Warna"}</span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="S">
                                S
                            </SelectItem>
                            <SelectItem value="M">
                                M
                            </SelectItem>
                            <SelectItem value="L">
                                L
                            </SelectItem>
                            <SelectItem value="XL">
                                XL
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="size">Warna</Label>
                    <Input id="size" value={color} onChange={(e) => setColor(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="stock">Stok</Label>
                    <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="min_stock">Stok Minimum</Label>
                    <Input id="min_stock" type="number" value={minStock} onChange={(e) => setMinStock(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="img">Gambar</Label>
                    <Input id="img" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} required />
                </div>
                <Button disable={loading.toString()} type="submit">Tambah Barang</Button>
            </div>
        </form>
    );
}

export default AddItemForm;
