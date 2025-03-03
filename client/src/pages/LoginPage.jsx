import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { loginValidator, registerValidator } from '@/lib/LoginFormValidator'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

const LoginPage = () => {

    const [login, setLogin] = useState(false);

    const loginform = useForm({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const regForm = useForm({
        resolver: zodResolver(registerValidator),
        defaultValues : {
            username : "",
            email : "",
            password : ""
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen bg-[#0D1B2A] relative">

            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] to-[#E0A800]/30 blur-2xl opacity-50"></div>
            {/* login/ register */}
            {
                login ? 
                (<div className="relative z-10 w-full md:w-1/2 flex items-center justify-center px-6 py-8">
                    <div className="w-full max-w-md bg-[#1B263B] shadow-xl rounded-3xl p-8 border border-[#E0A800]/50">
    
                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
                            Welcome to <span className="text-[#E0A800]">shopEase</span>
                        </h1>
    
                        {/* Login Form */}
                        <Form {...loginform}>
                            <form onSubmit={loginform.handleSubmit(onSubmit)} className="space-y-6">
    
                                {/* Email Input */}
                                <FormField
                                    control={loginform.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your Email"
                                                    className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60 focus:border-[#E0A800] focus:ring-2 focus:ring-[#E0A800] transition-all"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
    
                                {/* Password Input */}
                                <FormField
                                    control={loginform.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter your Password"
                                                    className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60 focus:border-[#E0A800] focus:ring-2 focus:ring-[#E0A800] transition-all"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
    
                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#E0A800] text-gray-900 font-semibold py-3 rounded-xl text-lg shadow-md hover:bg-[#FFC107] transition-all duration-300"
                                >
                                    Login
                                </Button>
    
                                {/* Register Link */}
                                <p className="text-center text-white text-lg">
                                    Don't have an account?{" "}
                                    <span onClick={()=>setLogin(false)} className="text-[#E0A800] font-semibold hover:underline cursor-pointer">
                                        Register
                                    </span>
                                </p>
    
                            </form>
                        </Form>
                    </div>
                </div>) : 
                // register
                (<div className="relative z-10 w-full md:w-1/2 flex items-center justify-center px-6 py-8">
                <div className="w-full max-w-md bg-[#1B263B] shadow-xl rounded-3xl p-8 border border-[#E0A800]/50">

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
                        Welcome to <span className="text-[#E0A800]">shopEase</span>
                    </h1>

                    {/* Register Form */}
                    <Form {...regForm}>
                        <form onSubmit={regForm.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Username */}
                            <FormField
                                control={regForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your Username"
                                                className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60 focus:border-[#E0A800] focus:ring-2 focus:ring-[#E0A800] transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Input */}
                            <FormField
                                control={regForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your Email"
                                                className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60 focus:border-[#E0A800] focus:ring-2 focus:ring-[#E0A800] transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Input */}
                            <FormField
                                control={regForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your Password"
                                                className="w-full p-4 bg-[#0D1B2A] border border-[#E0A800]/40 rounded-xl text-white placeholder-white/60 focus:border-[#E0A800] focus:ring-2 focus:ring-[#E0A800] transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* reg Button */}
                            <Button
                                type="submit"
                                className="w-full bg-[#E0A800] text-gray-900 font-semibold py-3 rounded-xl text-lg shadow-md hover:bg-[#FFC107] transition-all duration-300"
                            >
                                Register
                            </Button>

                            {/* Register Link */}
                            <p className="text-center text-white text-lg">
                                Already have an account ?{" "}
                                <span onClick={()=>setLogin(true)} className="text-[#E0A800] font-semibold hover:underline cursor-pointer">
                                    Login
                                </span>
                            </p>

                        </form>
                    </Form>
                </div>
            </div>)
            }

            {/* Decorative Image */}
            <div className="hidden md:flex items-center justify-center w-1/2 p-8">
                <img
                    src="/shop_banner.svg"
                    alt="ShopEase Login"
                    className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain animate-fadeIn"
                />
            </div>
        </div>
    )
}

export default LoginPage
