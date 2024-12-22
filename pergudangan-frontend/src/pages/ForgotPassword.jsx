import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function ForgotPassword({ className, ...props }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!username || !email || !newPassword || !confirmPassword) {
            setErrorMessage('All fields must be filled.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirm password do not match.');
            return;
        }
        setLoading(true);
        try {
            const req = {
                username,
                email,
                newPassword,
            };
            console.log(req);
            const response = await axiosInstance.post(`/api/auth/forgot-password`, req);
            const data = response.data;
            if (response.status === 200) {
                setErrorMessage('');
                setSuccessMessage('Password successfully changed. Please log in with your new password.');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setErrorMessage(data.message || 'Failed to change password, please try again.');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            setErrorMessage(error?.response?.data?.message || 'An error occurred, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={cn("flex flex-col justify-center items-center h-screen w-screen gap-6", className)} {...props}>
            <Card className="w-1/2 max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleForgotPassword} method="post">
                        {errorMessage && (
                            <div className="text-red-500 text-center mb-8">{errorMessage}</div>
                        )}
                        {successMessage && (
                            <div className="text-green-500 text-center mb-8">{successMessage}</div>
                        )}
                        <div className="flex flex-col gap-6">
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
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Your new password here"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your new password here"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}

export default ForgotPassword;