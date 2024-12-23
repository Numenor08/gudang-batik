import { useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { mutate } from "swr";

function EditUserForm({ user, onClose }) {
    const [id] = useState(user.id);
    const [username, setUsername] = useState(user.username);
    const [role, setRole] = useState(user.role.charAt(0).toUpperCase() + user.role.slice(1));
    const [email, setEmail] = useState(user.email);
    const [img, setFormImg] = useState(user.img);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEditUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('id', id);
        formData.append('username', username);
        formData.append('role', role.toLowerCase());
        formData.append('email', email);
        if (img instanceof File) {
            formData.append('img', img);
        }

        // Optimistic UI update
        const optimisticUser = { ...user, username, role: role.toLowerCase(), email, img };
        mutate(`/api/auth/${user.id}`, optimisticUser, false);

        try {
            await axiosInstance.put(`/api/auth/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            setSuccessMessage('User updated successfully.');
            setErrorMessage('');
            mutate(`/api/auth/${user.id}`); // Revalidate the data
            onClose();
        } catch (error) {
            console.error("Failed: ", error);
            setErrorMessage('Failed to update user.');
            setSuccessMessage('');
            mutate(`/api/auth/${user.id}`, user, false); // Rollback to the original user data
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleEditUser}>
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4 text-center">{errorMessage}</div>}
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="role">Role</Label>
                    <Select id="role" value={role} onValueChange={(value) => startTransition(() => setRole(value))} required>
                        <SelectTrigger>
                            <span>{role || "Choose Role"}</span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">
                                Admin
                            </SelectItem>
                            <SelectItem value="staff">
                                Staff
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="img">Image</Label>
                    <Input id="img" type="file" accept="image/*" onChange={(e) => setFormImg(e.target.files[0])} />
                </div>
                <Button disable={loading.toString()} type="submit">Update User</Button>
            </div>
        </form>
    );
}

export default EditUserForm;