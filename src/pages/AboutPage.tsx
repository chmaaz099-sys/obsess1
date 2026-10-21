import React from 'react';
import {
  Shield,
  Lock,
  Zap,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Header */}
      <div className="space-y-2 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          About obsess
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
          obsess is an independent, security-first Discord moderation bot created to give server administrators total oversight without compromising privacy.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-2.5">
          <div className="p-2 rounded bg-[#121212] border border-[#1f1f1f] text-white w-fit">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Hierarchical Guardrails</h3>
          <p className="text-xs text-[#888] leading-relaxed">
            Every punitive action passes through mandatory checks. obsess refuses to moderate server owners, administrators, or members higher than the moderator.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-2.5">
          <div className="p-2 rounded bg-[#121212] border border-[#1f1f1f] text-white w-fit">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Zero Message Snooping</h3>
          <p className="text-xs text-[#888] leading-relaxed">
            By running without Discord privileged Message Content Intent, member chat messages are never read, indexed, or stored.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-2.5">
          <div className="p-2 rounded bg-[#121212] border border-[#1f1f1f] text-white w-fit">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Decoupled Permissions</h3>
          <p className="text-xs text-[#888] leading-relaxed">
            Using <code className="text-white">/modrole</code>, server owners delegate specific bot capabilities to staff without handing out full Administrator rights.
          </p>
        </div>
      </div>

      {/* Tech Specifications */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#080808] border border-[#171717] space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Implementation Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded bg-[#000] border border-[#171717] space-y-1">
            <span className="text-[#555] text-[10px]">Framework</span>
            <div className="text-white font-medium text-xs">discord.py 2.x</div>
            <p className="text-[#737373] text-[11px] font-sans">app_commands slash command tree.</p>
          </div>

          <div className="p-3.5 rounded bg-[#000] border border-[#171717] space-y-1">
            <span className="text-[#555] text-[10px]">Database</span>
            <div className="text-white font-medium text-xs">aiosqlite (Async SQLite)</div>
            <p className="text-[#737373] text-[11px] font-sans">Local relational database with zero external dependencies.</p>
          </div>

          <div className="p-3.5 rounded bg-[#000] border border-[#171717] space-y-1">
            <span className="text-[#555] text-[10px]">Theme Color</span>
            <div className="text-white font-medium text-xs">RGB (15, 15, 15)</div>
            <p className="text-[#737373] text-[11px] font-sans">Deep charcoal embeds designed for dark Discord.</p>
          </div>

          <div className="p-3.5 rounded bg-[#000] border border-[#171717] space-y-1">
            <span className="text-[#555] text-[10px]">Presence</span>
            <div className="text-white font-medium text-xs">Status.dnd</div>
            <p className="text-[#737373] text-[11px] font-sans">Do Not Disturb with activity "obsess | /help".</p>
          </div>

          <div className="p-3.5 rounded bg-[#000] border border-[#171717] space-y-1">
            <span className="text-[#555] text-[10px]">Sync Topology</span>
            <div className="text-white font-medium text-xs">Global Sync</div>
            <p className="text-[#737373] text-[11px] font-sans">Clears stale guild registrations to avoid duplicate commands.</p>
          </div>

          <div className="p-3.5 rounded bg-[#000] border border-[#171717] space-y-1">
            <span className="text-[#555] text-[10px]">Anti-Evasion</span>
            <div className="text-white font-medium text-xs">on_member_join</div>
            <p className="text-[#737373] text-[11px] font-sans">Re-applies jail role if user rejoins while jailed.</p>
          </div>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-2 text-xs text-[#737373] leading-relaxed">
        <h4 className="font-medium text-[#d4d4d4] text-[11px] uppercase tracking-wider">
          Compliance Notice
        </h4>
        <p>
          obsess operates in accordance with Discord Community Guidelines and Developer Terms of Service.
        </p>
        <p>
          This website is independent and not affiliated with or endorsed by Discord Inc.
        </p>
      </div>
    </div>
  );
};
