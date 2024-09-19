"use client"
import { Button } from '@/components/ui/button'
import { Form} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { toast } from "sonner"
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { InputController } from '@/components/custom/form.control/InputController'
import { userConfig } from '@/hooks/use-config'
import { useMounted } from '@/hooks/use-mounted'

const LoginFormSchema = z.object({
    email: z.string().min(1, {
        message: "Please enter email",
    }),
    password: z.string().min(1, {
        message: "Please enter password",
    }),
    collegeId: z.number().optional()
});

export default function SignInForm() {
    const router = useRouter();
    const isMounted = useMounted();

    const [user, setUser] = userConfig();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(isMounted && user.email){
            router.replace('/');    
        }
    },[router, user, isMounted]);

    const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
        setLoading(true);
        //* async loading simulation

        const collegeId = data.email !== "college1@example.com" ? 2 : 1;
        const final = {...data, collegeId}

        setUser({
            ...user,
            name:"Vishal",
            college:"KIT College of Engineering",
            email:final.email,
            collegeId: collegeId,
        })

        setTimeout(() => {
            // localStorage.setItem('user', JSON.stringify(final));
            toast("Login Success", {
                description: "Welcome to Webdesk",
            })
            router.push('/');
            setLoading(false);
        }, 2000);
    }

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "college1@example.com",
            password: "college1",
            collegeId: 1
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                      <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                        <p className="text-muted-foreground text-sm">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <InputController 
                                name="email"
                                label="Email"
                                type='email'
                            />
                        </div>
                        <div className="grid gap-2">
                            <InputController 
                                name="password"
                                label="Password"
                                type='password'
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            { loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/> }
                            { loading ? "Logging..." : "Loign" }
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?&nbsp;
                        <Link href="/sign-up" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </Form >
    )
}