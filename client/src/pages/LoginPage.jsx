import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { loginValidator, registerValidator } from '@/lib/LoginFormValidator'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2, LoaderCircle } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/userContext'

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    const { setUser } = useUser()

    const form = useForm({
        resolver: zodResolver(isLogin ? loginValidator : registerValidator),
        mode: "onSubmit",
        defaultValues: isLogin
            ? { email: "", password: "" }
            : { username: "", email: "", password: "" },
    });

    const handleSubmit = async (values) => {
        setLoad(true)
        try {
            if(isLogin) {
                // LOGIN API HERE
                const req = await axios.post("/api/user/login",values)
                const response = req.data
                if(response.status){
                    navigate("/")
                    toast.success(response.message)
                    setUser(response.user)
                }
                else toast.error(response.message)
            }
            else {
                // REGISTER API HERE 
                const req = await axios.post("/api/user/register",values)
                const response = req.data
                if(response.status){
                    setIsLogin(true)
                    toast.success(response.message)
                }
                else toast.error(response.message)
            }
        } catch (error) {
            toast.error("Internal server error")
        }
        finally{
            setLoad(false)
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen bg-[#0D1B2A] relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] to-[#E0A800]/30 blur-2xl opacity-50"></div>

            <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center px-6 py-8">
                <div className="w-full max-w-md bg-[#1B263B] shadow-xl rounded-3xl p-8 border border-[#E0A800]/50">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
                        Welcome to <span className="text-[#E0A800]">shopEase</span>
                    </h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            {!isLogin && (
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your Username"
                                                    className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your Email"
                                                className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your Password"
                                                className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full bg-[#E0A800] text-gray-900 font-semibold py-3 rounded-xl text-lg shadow-md hover:bg-[#FFC107]">
                                { load ? (<LoaderCircle className='animate-spin'/>) : isLogin ? "Login" : "Register"}
                            </Button>

                            <p className="text-center text-white text-lg">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                <span onClick={() => setIsLogin(!isLogin)} className="text-[#E0A800] font-semibold hover:underline cursor-pointer">
                                    {isLogin ? "Register" : "Login"}
                                </span>
                            </p>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden md:flex items-center justify-center w-1/2 p-8">
                <img src="/shop_banner.svg" alt="ShopEase Login" className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain animate-fadeIn" />
            </div>
        </div>
    );
};

export default LoginPage;
