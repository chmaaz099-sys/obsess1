import React from 'react';
import { Link } from 'react-router-dom';
import { BOT_CONFIG } from '../config/bot';
import { MockDiscord } from '../components/MockDiscord';
import { BotStatusBadge } from '../components/BotStatusBadge';
import { BOT_FEATURES } from '../data/features';
import {
  ShieldAlert,
  UserCheck,
  Lock,
  KeyRound,
  Hash,
  Sparkles,
  FileText,
  MicOff,
  Palette,
  ShieldCheck,
  ArrowUpRight,
  Terminal,
  Database,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  ShieldAlert,
  UserCheck,
  Lock,
  KeyRound,
  Hash,
  Sparkles,
  FileText,
  MicOff,
  Palette,
  ShieldCheck,
};

export const HomePage: React.FC = () => {
  return (
    <div className="w-full space-y-28 pb-20">
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative pt-16 sm:pt-24 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-7">
        {/* Top Status Badge */}
        <div className="inline-flex items-center gap-2">
          <BotStatusBadge />
        </div>

        {/* Hero Title - Just the clean text "obsess", no logo beside it */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-white font-sans lowercase select-none">
            {BOT_CONFIG.botName}
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-[#ededed] tracking-tight">
            {BOT_CONFIG.brandTagline}
          </p>

          <p className="text-sm sm:text-base text-[#888888] max-w-xl mx-auto leading-relaxed">
            {BOT_CONFIG.brandDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={BOT_CONFIG.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-md text-xs font-semibold text-black bg-white hover:bg-[#e2e2e2] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Add to Discord</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <Link
            to="/commands"
            className="px-4 py-2.5 rounded-md text-xs font-medium text-[#ededed] hover:text-white bg-[#0f0f0f] hover:bg-[#171717] border border-[#222222] transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-[#888]" />
            <span>View Commands</span>
          </Link>

          <a
            href={BOT_CONFIG.supportServerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-md text-xs font-medium text-[#888] hover:text-white bg-[#080808] hover:bg-[#121212] border border-[#1a1a1a] transition-colors"
          >
            <span>Support Server</span>
          </a>
        </div>

        {/* Mock Discord Interface */}
        <div className="pt-8">
          <MockDiscord />
        </div>
      </section>

      {/* ========================================================
          TRANSPARENT SYSTEM METRICS
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#080808] border border-[#171717] space-y-8">
          <div className="space-y-1.5 text-left">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#737373] font-semibold">
              Codebase Metrics
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Verified Technical Parameters
            </p>
            <p className="text-xs text-[#888]">
              Honest data derived directly from the Python source code. No fabricated counters or inflated statistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#000000] border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between text-[#666]">
                <span className="text-[11px] font-mono uppercase">Command Tree</span>
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">150</div>
              <p className="text-[11px] text-[#737373] leading-snug">
                Callable commands claimed in /help embed; verified against global application tree.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#000000] border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between text-[#666]">
                <span className="text-[11px] font-mono uppercase">Custom Permissions</span>
                <KeyRound className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">20</div>
              <p className="text-[11px] text-[#737373] leading-snug">
                Bot-side permission nodes configurable via /modrole without giving server Admin.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#000000] border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between text-[#666]">
                <span className="text-[11px] font-mono uppercase">Chat Privacy</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">0 Intent</div>
              <p className="text-[11px] text-[#737373] leading-snug">
                Zero privileged Message Content Intent. Server chat messages are never monitored.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#000000] border border-[#1a1a1a] space-y-1.5">
              <div className="flex items-center justify-between text-[#666]">
                <span className="text-[11px] font-mono uppercase">Database</span>
                <Database className="w-3.5 h-3.5" />
              </div>
              <div className="text-2xl font-bold text-white font-mono">SQLite</div>
              <p className="text-[11px] text-[#737373] leading-snug">
                Asynchronous storage with aiosqlite tracking warnings, mod_logs, and prisoners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10 CORE FEATURES
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#141414] pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#737373] font-semibold">
              Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineered for Server Control
            </h2>
            <p className="text-xs text-[#888] max-w-lg">
              Detailed moderation tools, clean role assignment, and zero accidental privilege escalations.
            </p>
          </div>

          <Link
            to="/features"
            className="text-xs font-medium text-[#ededed] hover:text-white transition-colors flex items-center gap-1"
          >
            <span>View all details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 10 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BOT_FEATURES.map((feat) => {
            const Icon = iconMap[feat.iconName] || ShieldAlert;
            return (
              <div
                key={feat.id}
                className="rounded-xl p-5 bg-[#080808] border border-[#171717] hover:border-[#2e2e2e] transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-[#141414] text-[#d4d4d4] border border-[#222]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#666] bg-[#000] px-2 py-0.5 rounded border border-[#1a1a1a]">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-[#888888] leading-relaxed">
                    {feat.shortDescription}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#141414]">
                  <div className="flex flex-wrap gap-1">
                    {feat.commandsUsed.slice(0, 3).map((cmd) => (
                      <code
                        key={cmd}
                        className="text-[10px] font-mono bg-[#111] text-[#b3b3b3] px-1.5 py-0.5 rounded border border-[#1f1f1f]"
                      >
                        {cmd}
                      </code>
                    ))}
                  </div>

                  <Link
                    to={`/features#${feat.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#a3a3a3] hover:text-white pt-1"
                  >
                    <span>Read details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          FAST SETUP CALLOUT
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-[#080808] border border-[#1a1a1a] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Ready to deploy obsess?
            </h2>
            <p className="text-xs sm:text-sm text-[#888] leading-relaxed">
              Add the bot to your server, position the role above your staff, and configure bot-side permissions with <code className="text-[#d4d4d4] font-mono">/modrole grant</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={BOT_CONFIG.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-md text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors"
            >
              Add to Discord
            </a>
            <Link
              to="/setup"
              className="px-4 py-2.5 rounded-md text-xs font-medium text-[#ededed] hover:text-white bg-[#141414] border border-[#222222] transition-colors"
            >
              Setup Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
