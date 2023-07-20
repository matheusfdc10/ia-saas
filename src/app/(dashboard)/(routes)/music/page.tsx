"use client"

import * as z from "zod"
import { Heading } from "@/components/Heading"
import { Music } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChatCompletionRequestMessage } from "openai"
import axios from "axios"
import { Empty } from "@/components/Empty"
import { Loader } from "@/components/Loader"
import Image from "next/image"
import { userProModal } from "@/hooks/useProModal"

const MusicPage = () => {
    const proModal = userProModal();
    const router = useRouter();
    const [music, setMusic] = useState<string>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit  = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined)

            const response = await axios.post("/api/music", values)

            setMusic(response.data.audio);

            form.reset();
        } catch(error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Gerar Música"
                description="Transforme seu prompt em música."
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <div className="h-full w-full p-6 sm:p-20 flex flex-col items-center justify-center">
                <Image
                    width="500"
                    height="300"
                    alt="Page Contruction"
                    src="/pageContruction.png"
                />
            </div>
            {/* <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Piano solo"
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                // type="submit"
                                disabled={isLoading}
                                className="col-span-12 lg:col-span-2 w-full"
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty label="No music generate."/>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                       Music will
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default MusicPage