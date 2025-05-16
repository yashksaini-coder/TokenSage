'use client'

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import Image from 'next/image'

const AGENT_ICON =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f916.png" // 🤖 emoji as fallback

interface Agent {
  id: string;
  name: string;
}

export function AgentsDropdown() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Agent | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents')
        if (!response.ok) {
          throw new Error('Failed to fetch agents')
        }
        const data = await response.json()
        setAgents(data.message)
        setSelected(data.message?.[0] || null)
        setLoading(false)
        setError(null)
      } catch (err) {
        setLoading(false)
        setError('Failed to load agents. Please try again later.')
        console.log(err);
      }
    }
    fetchAgents()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="w-full px-4 pt-1" ref={dropdownRef}>
      <label className="text-[10px] font-bold text-muted-foreground mb-[2px] pl-1 tracking-widest uppercase select-none leading-tight">
        Agent
      </label>
      <div className="relative">
        <button
          className={`flex items-center w-full px-2.5 py-1.5 rounded-md border border-[#23272f] text-foreground text-[15px] font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 transition justify-between shadow-sm hover:border-primary/60 ${open ? 'ring-2 ring-primary/30' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="agents-dropdown"
          type="button"
        >
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-border">
              <Image
                src={AGENT_ICON}
                alt="Agent"
                width={24}
                height={24}
                className="rounded-full"
                unoptimized
              />
            </span>
            <span className="font-mono tracking-wide text-[15px] text-white" style={{ letterSpacing: 1 }}>
              {selected ? selected.name : loading ? "Loading..." : error ? "Error loading agents" : "Select Agent"}
            </span>
          </span>
          <ChevronDown className={`ml-2 w-5 h-5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div
            id="agents-dropdown"
            className="absolute z-30 mt-2 w-full bg-[#181b20] border border-border rounded-lg shadow-xl overflow-hidden animate-in fade-in"
          >
            {loading ? (
              <div className="px-4 py-3 text-muted-foreground text-sm">Loading agents...</div>
            ) : error ? (
              <div className="px-4 py-3 text-red-500 text-sm">{error}</div>
            ) : (
              <ul className="max-h-72 overflow-y-auto divide-y divide-border">
                {agents.map((agent: Agent) => (
                  <li key={agent.id}>
                    <button
                      className={`flex items-center w-full px-4 py-2 gap-3 text-left transition text-foreground font-mono font-semibold tracking-wide
                        ${selected?.id === agent.id ? "bg-primary/10 text-primary" : "hover:bg-primary/5"}
                      `}
                      onClick={() => {
                        setSelected(agent)
                        setOpen(false)
                      }}
                    >
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-border">
                        <Image
                          src={AGENT_ICON}
                          alt={agent.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                          unoptimized
                        />
                      </span>
                      <span className="font-mono text-base" style={{ letterSpacing: 1 }}>{agent.name}</span>
                      {selected?.id === agent.id && (
                        <Check className="ml-auto w-4 h-4 text-primary" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}