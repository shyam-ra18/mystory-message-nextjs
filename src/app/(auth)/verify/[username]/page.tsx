'use client'

import { useToast } from '@/components/ui/use-toast'
import { verifyschemaValidation } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponses'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function VerifyAccount() {

    const router = useRouter()
    const params = useParams<{ username: string }>()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof verifyschemaValidation>>({
        resolver: zodResolver(verifyschemaValidation)
    })

    const onSubmit = async (data: z.infer<typeof verifyschemaValidation>) => {
        console.log(data)
        try {
            const response = await axios.post(`/api/verify-otp`, {
                username: params.username,
                code: data.code
            })

            if (response?.data.success) {
                toast({
                    title: "Success",
                    description: response.data.message
                })
            }
            router.replace(`signin`)
        } catch (error) {
            console.error("Error in verifying code", error)
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title: 'Code verification Failed',
                description: axiosError.response?.data.message,
                variant: 'destructive'
            })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md " >

                <div className="text-center" >
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6" >
                        Verify Your Account
                    </h1>
                    <p className="mb-4" >Enter verification code sent to your email</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default VerifyAccount