import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/AuthProvider";
import useSWR, { mutate } from 'swr';
import axiosInstance from '@/utils/axiosInstance';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function ProfileForm() {
    const [imagePreview, setImagePreview] = useState(null);
    const [wantToEdit, setWantToEdit] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        img: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { userId } = useAuth();
    const { data: user } = useSWR(`/api/auth/${userId}`);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                role: user.role,
                img: user.img,
                password: '',
                confirmPassword: ''
            });
            setImagePreview(`${VITE_API_URL}/${user.img}`);
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, img: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const form = new FormData();
        form.append('username', formData.username);
        form.append('email', formData.email);
        form.append('role', formData.role);
        form.append('password', formData.password);
        if (formData.img instanceof File) {
            form.append('img', formData.img);
        }

        try {
            // Optimistically update the UI
            mutate(`/api/auth/${userId}`, { ...user, ...formData }, false);

            const response = await axiosInstance.put(`/api/auth/${userId}`, form);

            if (response.status !== 200) {
                throw new Error('Failed to update profile');
            }

            setSuccess('Profile updated successfully');
            // Revalidate the data
            mutate(`/api/auth/${userId}`);
        } catch (error) {
            setError(error.message);
            // Rollback the optimistic update
            mutate(`/api/auth/${userId}`);
        }
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditToggle = (checked) => {
        setWantToEdit(checked);
    };

    const confirmEdit = () => {
        handleSubmit();
        setIsDialogOpen(false);
    };

    const cancelEdit = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader className="pb-0">
                    <CardTitle className="text-2xl font-bold text-center">Profile</CardTitle>
                </CardHeader>
                <div className="border-b border-gray-200 w-full my-4" />
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left side - Profile Picture */}
                        <div className="w-full md:w-1/3 flex flex-col items-center justify-center space-y-6">
                            <Avatar className="w-56 h-56">
                                <AvatarImage src={imagePreview || ``} className="object-cover" alt="Profile picture" />
                                <AvatarFallback>
                                    <User className="w-28 h-28" />
                                </AvatarFallback>
                            </Avatar>
                            <Label htmlFor="picture" className={`transition-all duration-300 ease-in-out cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm ${!wantToEdit && 'opacity-50 cursor-not-allowed'}`}>
                                Upload Picture
                            </Label>
                            <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                                disabled={!wantToEdit}
                            />
                        </div>

                        {/* Right side - Form Fields */}
                        <div className="w-full md:w-2/3">
                            <form className="space-y-6">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="wantToEdit"
                                        checked={wantToEdit}
                                        onCheckedChange={handleEditToggle}
                                    />
                                    <Label htmlFor="wantToEdit">Want to edit?</Label>
                                </div>

                                {error && <p className="text-red-500">{error}</p>}
                                {success && <p className="text-green-500">{success}</p>}

                                <div>
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" value={formData.username} onChange={handleInputChange} placeholder="Enter your username" disabled={!wantToEdit} className={`transition-opacity duration-300 ease-in-out ${wantToEdit ? 'opacity-100' : 'opacity-50'}`} />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" disabled={!wantToEdit} className={`transition-opacity duration-300 ease-in-out ${wantToEdit ? 'opacity-100' : 'opacity-50'}`} />
                                </div>

                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <Input id="role" value={formData.role} disabled className="transition-opacity duration-300 ease-in-out" />
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" disabled={!wantToEdit} className={`transition-opacity duration-300 ease-in-out ${wantToEdit ? 'opacity-100' : 'opacity-50'}`} />
                                </div>

                                <div className={`transition-all duration-300 ease-in-out ${wantToEdit ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" />
                                </div>

                                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <AlertDialogTrigger asChild>
                                        <Button type="button" className="transition-all duration-300 ease-in-out w-full" disabled={!wantToEdit}>
                                            Save Changes
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Confirm Edit</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to save changes to your profile?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={cancelEdit}>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={confirmEdit}>Confirm</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </form>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}