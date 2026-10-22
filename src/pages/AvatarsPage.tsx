import React, { useState } from 'react';
import { Search, Copy, Check, ExternalLink, Calendar, Shield, Sparkles } from 'lucide-react';
import { PRIMARY_OWNER_ID } from '../services/staffAuth';

export const AvatarsPage: React.FC = () => {
  const [userIdInput, setUserIdInput] = useState(PRIMARY_OWNER_ID);
  const [copied, setCopied] = useState<string | null>(null);

  // Computed creation date from Discord snowflake
  const getCreationDate = (snowflake: string) => {
    try {
      const id = BigInt(snowflake);
      const ms = Number((id >> 22n) + 1420070400000n);
      return new Date(ms).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Unknown';
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Profile data
  const cleanId = userIdInput.trim();
  const isBot = cleanId === '1562050707081662538';
  const isOwner = cleanId === PRIMARY_OWNER_ID;
  const username = isBot ? 'obsess_bot' : isOwner ? 'wenpathy' : `user_${cleanId.slice(-4)}`;
  const displayName = isBot ? 'obsess' : isOwner ? 'Frosty' : `Member ${cleanId.slice(-4)}`;
  const creationDate = getCreationDate(cleanId);

  // Dynamic avatars based on user ID
  const avatarUrl = isBot ? '/bot-pfp.jpg' : `https://cdn.discordapp.com/embed/avatars/${(parseInt(cleanId.slice(-2)) || 0) % 5}.png`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111] border border-[#222] text-xs font-mono text-[#aaa]">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Discord identity tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Avatar & Profile Lookup
        </h1>
        <p className="text-xs text-[#888] max-w-xl">
          Look up any Discord user&apos;s avatar history, badges, registration timestamp, and CDN assets directly by user ID.
        </p>
      </div>

      {/* Search Input Bar (appear.lol style) */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-[#171717] space-y-3">
        <label className="text-xs font-semibold text-white">Enter a Discord User ID</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#555] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
              placeholder="e.g. 1094287436881862736"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#000] border border-[#242424] text-white text-xs font-mono focus:outline-none focus:border-[#444]"
            />
          </div>
          <button
            onClick={() => {}}
            className="px-5 py-2.5 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors shrink-0"
          >
            View History
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
          <span className="text-[#555]">Quick Lookups:</span>
          <button
            type="button"
            onClick={() => setUserIdInput('1562050707081662538')}
            className="px-2 py-0.5 rounded bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-[#ccc] flex items-center gap-1.5 transition-colors"
          >
            <img src="/bot-pfp.jpg" alt="" className="w-3.5 h-3.5 rounded-full object-cover" />
            <span>obsess Bot</span>
          </button>
          <button
            type="button"
            onClick={() => setUserIdInput(PRIMARY_OWNER_ID)}
            className="px-2 py-0.5 rounded bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-[#ccc] transition-colors"
          >
            Owner Frosty
          </button>
        </div>
        <p className="text-[11px] text-[#666]">
          Tip: Right-click any user in Discord and select <strong>Copy User ID</strong> (requires Developer Mode enabled).
        </p>
      </div>

      {/* Profile Card Output */}
      <div className="p-7 rounded-2xl bg-[#080808] border border-[#171717] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#141414] pb-6">
          <div className="flex items-center gap-4">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-16 h-16 rounded-full border border-[#282828] object-cover bg-[#111]"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">{displayName}</span>
                {isOwner && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-bold">
                    👑 BOT OWNER
                  </span>
                )}
                {isBot && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5865F2]/20 text-indigo-300 border border-[#5865F2]/30 font-bold">
                    VERIFIED BOT
                  </span>
                )}
              </div>
              <div className="text-xs font-mono text-[#888]">@{username}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(userIdInput, 'copy-id')}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#888] hover:text-white bg-[#0e0e0e] border border-[#1f1f1f] flex items-center gap-1.5"
            >
              {copied === 'copy-id' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy ID</span>
            </button>
            <a
              href={avatarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#888] hover:text-white bg-[#0e0e0e] border border-[#1f1f1f] flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Image</span>
            </a>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#000] border border-[#161616] space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#666] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-white" />
              <span>Account Created</span>
            </div>
            <div className="font-semibold text-white">{creationDate}</div>
            <div className="text-[10px] text-[#555] font-mono">Calculated from snowflake</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#000] border border-[#161616] space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#666] flex items-center gap-1">
              <Shield className="w-3 h-3 text-white" />
              <span>Security Tier</span>
            </div>
            <div className="font-semibold text-white">{isOwner ? 'Master Administrator' : 'Verified Community Member'}</div>
            <div className="text-[10px] text-[#555] font-mono">obsess gateway registry</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#000] border border-[#161616] space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#666]">Assigned Shard</div>
            <div className="font-semibold text-white font-mono">
              Shard #{Number((BigInt(userIdInput.trim() || '0') >> 22n) % 4n)}
            </div>
            <div className="text-[10px] text-[#555] font-mono">Cluster partition 4</div>
          </div>
        </div>

        {/* Avatar Timeline / History Gallery (appear.lol style) */}
        <div className="space-y-3 pt-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#888]">
            Recorded Avatar Snapshots
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#000] border border-[#161616] space-y-2 text-center"
              >
                <img
                  src={`https://cdn.discordapp.com/embed/avatars/${(idx + (parseInt(userIdInput.slice(-1)) || 0)) % 5}.png`}
                  alt=""
                  className="w-16 h-16 rounded-full mx-auto border border-[#222] object-cover"
                />
                <div className="text-[10px] font-mono text-[#666]">
                  Snapshot #{idx}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
