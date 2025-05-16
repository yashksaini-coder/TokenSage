'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, Globe, Mic, Paperclip, SearchCheckIcon, AudioLines } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { modelOptions } from '@/services/shared'

// Define the message type
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatInputForm() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('Search');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Handle sending message
    const handleSend = async () => {
        if (!inputValue.trim()) return;
        const userMessage: ChatMessage = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setLoading(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: inputValue })
            });
            const data = await res.json();
            console.log(data);
            const assistantMessage: ChatMessage = { role: 'assistant', content: data.response || 'No response.' };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error fetching response.' }]);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle Enter to send (with Shift+Enter for newline)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen w-full items-center justify-center">
            <div className="flex flex-row items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold text-gray-300">What can I help with ?</h1>
            </div>
            <div className="w-full max-w-2xl">
                {/* Chat messages */}
                <div className="mb-4 max-h-72 overflow-y-auto bg-zinc-800 rounded-xl p-4">
                    {messages.length === 0 && (
                        <div className="text-gray-500 text-center">No messages yet.</div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-zinc-700 text-gray-100'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                <div className="bg-zinc-700 rounded-2xl border border-gray-900 p-4 flex flex-col gap-2 shadow-lg">
                    <div className="flex flex-row gap-2 w-full">
                        <div className="flex-1 flex flex-col justify-center">
                            <Tabs defaultValue={tab} onValueChange={setTab} className="w-full">
                                <TabsContent value="Search" className="w-full">
                                    <Textarea
                                        placeholder="Ask about Web3..."
                                        className="w-full h-12 text-white px-4 py-2 outline-none rounded-xl resize-none border-2 border-green-500 bg-transparent focus:ring-0 focus:ring-offset-0 ring-0 transition"
                                        style={{ minHeight: 48, maxHeight: 120 }}
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={loading}
                                    />
                                </TabsContent>
                                <TabsList className="mt-2 bg-accent w-fit rounded-lg px-1 py-0.5">
                                    <TabsTrigger value="Search" className="flex flex-row items-center gap-2 px-2 py-1 text-sm"><SearchCheckIcon className="w-4 h-4" />Search</TabsTrigger>
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
                            <Button className="bg-accent text-foreground p-2 rounded-lg" onClick={handleSend} disabled={loading}>
                                <AudioLines className="w-5 h-5 text-foreground" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
