import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axiosInstance from "@/utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"

function RegisterPage({ className, ...props }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // Tambahkan state loading

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password || !email || !image || !role) {
            setErrorMessage('Semua field harus diisi.');
            return;
        }
        setLoading(true); // Set loading to true saat proses register dimulai
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('img', image);
            formData.append('role', role);
            
            const response = await axiosInstance.post(`/api/auth/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                navigate('/dashboard');
            } else {
                setErrorMessage(response.data.message || 'Registeration failed. Try again!');
            }
        } catch (error) {
            console.error('Register error:', error);
            setErrorMessage(error.response?.data?.message || 'Registeration failed. Try again!');
        } finally {
            setLoading(false); // Set loading to false setelah proses register selesai
        }
    };

    return (
        <main className={cn("flex flex-col justify-center items-center h-screen w-screen gap-6", className)} {...props}>
            <Card className="w-1/2 max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} method="post" encType="multipart/form-data">
                        {errorMessage && (
                            <div className="text-red-500 text-center mb-8">{errorMessage}</div>
                        )}
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Your username here"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Profile Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                            </div>
                            <Select onValueChange={(value) => setRole(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Choose your role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/" className="underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

export default RegisterPage;