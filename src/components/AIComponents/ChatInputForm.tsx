import React from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Atom, Cpu, Globe, Mic, Paperclip, SearchCheckIcon, AudioLines } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
                <Image src="/logo.png" alt="logo" width={50} height={50} />
                <h1 className="text-2xl font-bold text-gray-300">Token Sage</h1>
            </div>
            <div className="flex justify-between items-end bg-gray-300 rounded-2xl border-gray-900 p-6 py-3 mb-30">
                <Tabs defaultValue="Search" className="w-[400px]">
                    <TabsContent value="Search"><input type="text" placeholder="Ask about Web3..." className="w-full text-black p-2 outline rounded-2xl border border-gray-900" />
                    </TabsContent>
                    <TabsContent value="Research"><input type="text" placeholder="Search for Coin..." className="w-full text-black p-2 outline rounded-2xl border border-gray-900" />
                    </TabsContent>
                    <TabsList className='bg-accent'>
                        <TabsTrigger value="Search" className='flex flex-row items-center gap-2'><SearchCheckIcon className='w-4 h-4' />Search</TabsTrigger>
                        <TabsTrigger value="Research" className='flex flex-row items-center gap-2'><Atom className='w-4 h-4' />Research</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className='flex flex-row items-center gap-2'>
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

