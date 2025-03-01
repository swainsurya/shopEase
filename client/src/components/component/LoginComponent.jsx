import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginValidator } from '@/lib/LoginFormValidator'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'


const LoginComponent = ({ loginOpen }) => {

    const loginForm = useForm({
        resolver: zodResolver(loginValidator),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = () => {
        e.preventDefault()
        console.log(loginForm)
    }

    return (
        <>
            {loginOpen && (
                <Dialog open={true} onOpenChange={() => loginOpen=false} className="w-1/2 h-1/3">
                    <DialogContent className="flex flex-col items-center w-full">
                        <Tabs defaultValue="account" className="w-full flex flex-col">
                            <TabsList>
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">Register</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" defaultValue className="flex flex-col gap-3">
                                <Form {...loginForm}>
                                    <form onSubmit={loginForm.handleSubmit(onSubmit)} className='flex flex-col gap-4 p-6'>

                                        <FormField
                                            className="p-2 text-xl"
                                            control={loginForm.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email id" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            className="p-2 text-xl"
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="mt-8">Login</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                            <TabsContent value="register">
                                register
                            </TabsContent>
                        </Tabs>

                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default LoginComponent
