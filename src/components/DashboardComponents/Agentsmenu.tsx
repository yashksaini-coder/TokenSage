'use client'

import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import { ChevronDown, Check, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const AGENT_ICON =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f916.png" // 🤖 emoji as fallback

export function AgentsDropdown() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<any | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('/api/agents')
        const data = await response.json()
        setAgents(data.message)
        setSelected(data.message?.[0] || null)
        setLoading(false)
      } catch (error) {
        setLoading(false)
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
    <div className="w-full mt-4" ref={dropdownRef}>
      <label className="block text-[11px] font-bold text-muted-foreground mb-1 pl-1 tracking-widest uppercase select-none">
        Agent
      </label>
      <div className="relative">
        <button
          className={`flex items-center w-full px-3 py-2.5 rounded-md bg-[#23272f] border border-[#23272f] text-foreground text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 transition justify-between shadow-sm hover:border-primary/60 ${open ? 'ring-2 ring-primary/30' : ''}`}
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
            <span className="font-mono tracking-wide text-base text-white" style={{ letterSpacing: 1 }}>
              {selected ? selected.name : loading ? "Loading..." : "Select Agent"}
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
            ) : (
              <ul className="max-h-72 overflow-y-auto divide-y divide-border">
                {agents.map((agent: any) => (
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
                <li>
                  <Link
                    href="/agents/new"
                    className="flex items-center w-full px-4 py-2 gap-3 text-left hover:bg-primary/10 transition text-foreground font-mono font-semibold tracking-wide"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border border-border">
                      <Plus className="w-4 h-4 text-primary" />
                    </span>
                    <span className="font-mono text-base" style={{ letterSpacing: 1 }}>Create Agent</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}