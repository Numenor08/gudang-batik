import { useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import axiosInstance from "@/utils/axiosInstance";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

function EditItemForm({ item, onClose }) {
    const [name, setName] = useState(item.name);
    const [category, setCategory] = useState(item.category_id);
    const [color, setColor] = useState(item.color);
    const [size, setSize] = useState(item.size);
    const [stock, setStock] = useState(item.stock);
    const [minStock, setMinStock] = useState(item.min_stock);
    const [img, setImg] = useState(item.img);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: Categories } = useSWR('/api/categories');
    const { mutate } = useSWR(`/api/batik/${item.id}`);

    const handleEditItem = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (minStock > stock) {
            setErrorMessage('Stok minimum tidak boleh lebih dari stok awal.');
            setLoading(false);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('category_id', Number(category));
            formData.append('color', color);
            formData.append('size', size);
            formData.append('stock', stock);
            formData.append('min_stock', minStock);
            if (img instanceof File) {
                formData.append('img', img);
            }
            console.log('Form data:', ...formData);

            // Optimistic UI update
            mutate(async (data) => {
                const updatedItem = {
                    ...data,
                    name,
                    category_id: Number(category),
                    color,
                    size,
                    stock,
                    min_stock: minStock,
                    img: img instanceof File ? URL.createObjectURL(img) : img,
                };
                await axiosInstance.put(`/api/batik/${item.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return updatedItem;
            }, false);

            setSuccessMessage('Item updated successfully.');
            setLoading(false);
            onClose();
        } catch (error) {
            console.error("Failed: ", error);
            setErrorMessage('Gagal mengedit barang. Coba lagi!');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleEditItem}>
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => startTransition(() => setName(e.target.value))} required />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={(value) => startTransition(() => setCategory(value))} required>
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
                    <Label htmlFor="color">Size</Label>
                    <Select id="color" value={size} onValueChange={(value) => startTransition(() => setSize(value))} required>
                        <SelectTrigger>
                            <span>{size || "Choose Size"}</span>
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
                    <Label htmlFor="size">Colour</Label>
                    <Input id="size" value={color} onChange={(e) => startTransition(() => setColor(e.target.value))} required />
                </div>
                <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" value={stock} onChange={(e) => startTransition(() => setStock(e.target.value))} required />
                </div>
                <div>
                    <Label htmlFor="min_stock">Minimum Stock</Label>
                    <Input id="min_stock" type="number" value={minStock} onChange={(e) => startTransition(() => setMinStock(e.target.value))} required />
                </div>
                <div>
                    <Label htmlFor="img">Image</Label>
                    <Input id="img" type="file" accept="image/*" onChange={(e) => startTransition(() => setImg(e.target.files[0]))} />
                </div>
                <Button disable={loading.toString()} type="submit">Edit Barang</Button>
            </div>
        </form>
    );
}

export default EditItemForm;