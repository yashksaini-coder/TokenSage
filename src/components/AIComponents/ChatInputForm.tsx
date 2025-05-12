import React from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Atom, Cpu, Globe, Mic, Paperclip, SearchCheckIcon, AudioLines } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { modelOptions } from '@/services/shared'

export default function ChatInputForm() {
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center">
            <div className="flex flex-row items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold text-gray-300">What can I help with ?</h1>
            </div>
            <div className="w-full max-w-2xl">
                <div className="bg-zinc-700 rounded-2xl border border-gray-900 p-4 flex flex-col gap-2 shadow-lg">
                    <div className="flex flex-row gap-2 w-full">
                        <div className="flex-1 flex flex-col justify-center">
                            <Tabs defaultValue="Search" className="w-full">
                                <TabsContent value="Search" className="w-full">
                                    <Textarea
                                        placeholder="Ask about Web3..."
                                        className="w-full h-12 text-white px-4 py-2 outline-none rounded-xl resize-none border-2 border-green-500 bg-transparent focus:ring-0 focus:ring-offset-0 ring-0 transition"
                                        style={{ minHeight: 48, maxHeight: 120 }}
                                    />
                                </TabsContent>
                                <TabsContent value="Research" className="w-full">
                                    <Textarea
                                        placeholder="Search for Coin..."
                                        className="w-full h-12 text-white px-4 py-2 outline-none rounded-xl resize-none border-2 border-green-500 bg-transparent focus:ring-0 focus:ring-offset-0 ring-0 transition"
                                        style={{ minHeight: 48, maxHeight: 120 }}
                                    />
                                </TabsContent>
                                <TabsList className="mt-2 bg-accent w-fit rounded-lg px-1 py-0.5">
                                    <TabsTrigger value="Search" className="flex flex-row items-center gap-2 px-2 py-1 text-sm"><SearchCheckIcon className="w-4 h-4" />Search</TabsTrigger>
                                    <TabsTrigger value="Research" className="flex flex-row items-center gap-2 px-2 py-1 text-sm"><Atom className="w-4 h-4" />Research</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex flex-row items-end gap-2 ml-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="bg-accent text-foreground p-2 rounded-lg">
                                        <Cpu className="w-5 h-5 text-foreground" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {modelOptions.map((model, index) => (
                                        <DropdownMenuItem key={index}>
                                            <div className="mb-2">
                                                <h2>{model.name}</h2>
                                                <p className="text-xs text-gray-500">{model.description}</p>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="ghost" className="bg-accent text-foreground p-2 rounded-lg">
                                <Globe className="w-5 h-5 text-foreground" />
                            </Button>
                            <Button variant="ghost" className="bg-accent text-foreground p-2 rounded-lg">
                                <Paperclip className="w-5 h-5 text-foreground" />
                            </Button>
                            <Button variant="ghost" className="bg-accent text-foreground p-2 rounded-lg">
                                <Mic className="w-5 h-5 text-foreground" />
                            </Button>
                            <Button className="bg-accent text-foreground p-2 rounded-lg">
                                <AudioLines className="w-5 h-5 text-foreground" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
