import React from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ChatInputForm() {
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-10">
                <div className="flex items-center gap-6">
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <div className="p-2 w-full border rounded-2xl">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Web3 Perplexity</h1>
                        <input type="text" placeholder="Ask anything..." className="w-full text-gray-900 p-4 outline-none rounded-2xl border" />
                        <div>
                            <Tabs defaultValue="account" className="w-[400px]">
                                <TabsList>
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="password">Password</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account">Make changes to your account here.</TabsContent>
                                <TabsContent value="password">Change your password here.</TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInputForm
