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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { modelOptions } from '@/services/shared'

export default function ChatInputForm() {
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center ">
            <div className="flex flex-row items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold text-gray-300">What can I help with ?</h1>
            </div>
            <div className="flex justify-between items-end bg-zinc-700 rounded-2xl border-gray-900 p-5 w-full max-w-2xl py-3 mb-30">
                <div className="flex-1 w-full">
                    <Tabs defaultValue="Search" className="w-full">
                        <TabsContent value="Search">
                            <Textarea placeholder="Ask about Web3..." className="w-full text-white p-2 outline-none rounded-2xl resize-none min-h-14 focus-within:ring-0 focus-within:ring-offset-0 ring-0" />
                        </TabsContent>
                        <TabsContent value="Research">
                            <Textarea placeholder="Search for Coin..." className="text-white p-2 w-full outline-none rounded-2xl resize-none min-h-12 focus-within:ring-0 focus-within:ring-offset-0 ring-0" />
                        </TabsContent>
                        <TabsList className='bg-accent'>
                            <TabsTrigger value="Search" className='flex flex-row items-center gap-2'><SearchCheckIcon className='w-4 h-4' />Search</TabsTrigger>
                            <TabsTrigger value="Research" className='flex flex-row items-center gap-2'><Atom className='w-4 h-4' />Research</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className='flex flex-row items-end gap-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger><Button variant='ghost' className='bg-accent text-foreground'>
                            <Cpu className='w-5 h-5 text-foreground' />
                        </Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator /> */}
                            {modelOptions.map((model, index) => (
                                <DropdownMenuItem key={index}>
                                    <div className='mb-2'>
                                        <h2>{model.name}</h2>
                                        <p className='text-xs text-gray-500'>{model.description}</p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Button variant='ghost' className='bg-accent text-foreground'>
                        <Globe className='w-5 h-5 text-foreground' />
                    </Button>
                    <Button variant='ghost' className='bg-accent text-foreground'>
                        <Paperclip className='w-5 h-5 text-foreground' />
                    </Button>
                    <Button variant='ghost' className='bg-accent text-foreground'>
                        <Mic className='w-5 h-5 text-foreground' />
                    </Button>
                    <Button className='bg-accent text-foreground'>
                        <AudioLines className='w-5 h-5 text-foreground' />
                    </Button>
                </div>
            </div>
        </div>

    )
}

