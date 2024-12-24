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
import { useAuth } from "@/hooks/AuthProvider"
import axiosInstance from "@/utils/axiosInstance"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function LoginPage({ className, ...props }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { saveToken } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setErrorMessage('Username dan password tidak boleh kosong.');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                username,
                password,
            });
            const data = response.data;
            saveToken(data.accessToken);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <main className={cn("flex flex-col justify-center items-center h-screen w-screen gap-6", className)} {...props}>
            <Card className="w-1/2 max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} method="post">
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
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="/resetPassword"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

export default LoginPage;
