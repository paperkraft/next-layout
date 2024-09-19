/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUp() {
    // const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        if(localStorage){
            if(localStorage.getItem('user')){
                // router.replace('/home');
            }
        }
    },[]);

    // const form = useForm({
    //     defaultValues:{
    //         email:"college2@example.com"
    //     }
    // });

    const onSubmit = async () => {
        setLoading(true);
        const final = {
            email:"college2@example.com",
            collegeId:2
        }
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify(final));
            toast("Register Success", {
                className: "bg-green-500",
                description: "Welcome to Webdesk",
            })
            // router.replace('/');
            setLoading(false);
        }, 2000);
    }

    return(
        <>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
                    <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="First Name" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                        Already have an account?&nbsp;
                        <Link href="/sign-in" className="underline">
                            Sign in
                        </Link>
                        </div>
                </div>
                <p className="px-8 text-center text-sm text-muted-foreground">By clicking continue, you agree to our&nbsp; 
                    <a className="underline underline-offset-4 hover:text-primary" href="#">Terms of Service</a> and&nbsp; 
                    <a className="underline underline-offset-4 hover:text-primary" href="#">Privacy Policy</a>.
                </p>
            </div>
        </>
    )
}