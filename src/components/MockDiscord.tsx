import React, { useState } from 'react';
import {
  Hash,
  Volume2,
  Lock,
  Sparkles,
  KeyRound,
  FileText,
  CheckCircle2,
} from 'lucide-react';

export const MockDiscord: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jail' | 'modrole' | 'purge' | 'logs'>('jail');

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-[#1a1a1a] bg-[#080808] shadow-2xl font-sans text-left">
      {/* Discord Header Bar */}
      <div className="bg-[#0d0d0d] px-4 py-2.5 border-b border-[#171717] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#262626] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#262626] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#262626] inline-block" />
          </div>
          <div className="h-3 w-px bg-[#222222] mx-1" />
          <div className="flex items-center gap-1.5 text-[#a3a3a3] font-medium text-xs">
            <Hash className="w-3.5 h-3.5 text-[#525252]" />
            <span>
              {activeTab === 'jail' && 'jail-logs'}
              {activeTab === 'modrole' && 'staff-permissions'}
              {activeTab === 'purge' && 'general-chat'}
              {activeTab === 'logs' && 'mod-audit'}
            </span>
          </div>
        </div>

        {/* Interactive Scenario Tabs */}
        <div className="flex items-center gap-1 bg-[#050505] p-0.5 rounded-md border border-[#1a1a1a]">
          <button
            onClick={() => setActiveTab('jail')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              activeTab === 'jail'
                ? 'bg-[#1c1c1c] text-white border border-[#333333]'
                : 'text-[#666] hover:text-[#bbb]'
            }`}
          >
            /jail
          </button>
          <button
            onClick={() => setActiveTab('modrole')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              activeTab === 'modrole'
                ? 'bg-[#1c1c1c] text-white border border-[#333333]'
                : 'text-[#666] hover:text-[#bbb]'
            }`}
          >
            /modrole
          </button>
          <button
            onClick={() => setActiveTab('purge')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              activeTab === 'purge'
                ? 'bg-[#1c1c1c] text-white border border-[#333333]'
                : 'text-[#666] hover:text-[#bbb]'
            }`}
          >
            /purge
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
              activeTab === 'logs'
                ? 'bg-[#1c1c1c] text-white border border-[#333333]'
                : 'text-[#666] hover:text-[#bbb]'
            }`}
          >
            /modlogs
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[350px]">
        {/* Left Mock Sidebar */}
        <div className="hidden sm:flex flex-col w-48 bg-[#0a0a0a] p-3 border-r border-[#141414] space-y-3">
          <div className="text-[10px] font-mono text-[#525252] uppercase tracking-wider px-2">
            Text Channels
          </div>
          <div className="space-y-1 text-xs">
            <div
              className={`flex items-center gap-2 px-2 py-1.5 rounded ${
                activeTab === 'jail' ? 'bg-[#141414] text-white font-medium' : 'text-[#666] hover:bg-[#111]'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#888]" />
              <span>#jail</span>
            </div>
            <div
              className={`flex items-center gap-2 px-2 py-1.5 rounded ${
                activeTab === 'modrole' ? 'bg-[#141414] text-white font-medium' : 'text-[#666] hover:bg-[#111]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-[#888]" />
              <span>#mod-roles</span>
            </div>
            <div
              className={`flex items-center gap-2 px-2 py-1.5 rounded ${
                activeTab === 'purge' ? 'bg-[#141414] text-white font-medium' : 'text-[#666] hover:bg-[#111]'
              }`}
            >
              <Hash className="w-3.5 h-3.5 text-[#666]" />
              <span>#general</span>
            </div>
            <div
              className={`flex items-center gap-2 px-2 py-1.5 rounded ${
                activeTab === 'logs' ? 'bg-[#141414] text-white font-medium' : 'text-[#666] hover:bg-[#111]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#888]" />
              <span>#mod-logs</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#141414] text-[10px] font-mono text-[#525252] uppercase tracking-wider px-2">
            Voice
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-[#555]">
              <Volume2 className="w-3.5 h-3.5 text-[#444]" />
              <span>Staff Lounge</span>
            </div>
          </div>
        </div>

        {/* Discord Chat Area */}
        <div className="flex-1 bg-[#050505] p-5 space-y-5">
          {/* TAB 1: JAIL SYSTEM */}
          {activeTab === 'jail' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center text-white text-[11px] font-mono">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-white text-xs">HeadModerator</span>
                    <span className="text-[10px] text-[#555]">Today at 14:32</span>
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 bg-[#101010] px-2.5 py-1 rounded border border-[#222] text-xs font-mono text-[#d4d4d4]">
                    <span className="text-white font-semibold">/jail</span>
                    <span className="text-[#666]">member:</span>
                    <span className="text-white">@bad_actor</span>
                    <span className="text-[#666]">reason:</span>
                    <span className="text-[#a3a3a3]">Severe harassment in #general</span>
                  </div>
                </div>
              </div>

              {/* Bot Response Embed */}
              <div className="flex items-start gap-3 pl-2 border-l border-[#333]">
                <img
                  src="/bot-pfp.jpg"
                  alt="obsess"
                  className="w-8 h-8 rounded-full object-cover border border-[#262626]"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-xs lowercase">obsess</span>
                    <span className="bg-[#242424] text-[#a3a3a3] text-[9px] px-1 py-0.2 rounded font-mono uppercase">
                      BOT
                    </span>
                    <span className="text-[10px] text-[#555]">Today at 14:32</span>
                  </div>

                  <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-lg p-3 max-w-lg space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs">
                      <Lock className="w-3.5 h-3.5 text-[#a3a3a3]" />
                      <span>Member Jailed</span>
                    </div>
                    <p className="text-xs text-[#a3a3a3]">
                      ⛓️ <strong className="text-white">@bad_actor</strong> has been jailed by <span className="text-white">@HeadModerator</span>.
                    </p>
                    <div className="text-[11px] text-[#737373] space-y-1 pt-1.5 border-t border-[#1a1a1a]">
                      <div><strong>Reason:</strong> Severe harassment in #general</div>
                      <div><strong>Saved Roles (SQLite JSON):</strong> <code className="text-white font-mono text-[10px] bg-[#141414] px-1 py-0.5 rounded">@Member</code>, <code className="text-white font-mono text-[10px] bg-[#141414] px-1 py-0.5 rounded">@Regular</code> (2 saved)</div>
                      <div className="text-[11px] text-[#a3a3a3] flex items-center gap-1 pt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Anti-evasion listener active on rejoin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODROLE */}
          {activeTab === 'modrole' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center text-white text-[11px] font-mono">
                  O
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-white text-xs">ServerOwner</span>
                    <span className="text-[10px] text-[#555]">Today at 11:15</span>
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 bg-[#101010] px-2.5 py-1 rounded border border-[#222] text-xs font-mono text-[#d4d4d4]">
                    <span className="text-white font-semibold">/modrole grant</span>
                    <span className="text-[#666]">role:</span>
                    <span className="text-white">@Staff-Moderator</span>
                    <span className="text-[#666]">permission:</span>
                    <span className="text-white font-semibold">jail</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pl-2 border-l border-[#333]">
                <img
                  src="/bot-pfp.jpg"
                  alt="obsess"
                  className="w-8 h-8 rounded-full object-cover border border-[#262626]"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-xs lowercase">obsess</span>
                    <span className="bg-[#242424] text-[#a3a3a3] text-[9px] px-1 py-0.2 rounded font-mono uppercase">
                      BOT
                    </span>
                  </div>
                  <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-lg p-3 max-w-lg space-y-1">
                    <div className="text-xs text-[#ededed]">
                      Granted <code className="text-white font-mono bg-[#141414] px-1.5 py-0.5 rounded border border-[#262626]">jail</code> to <span className="font-semibold">@Staff-Moderator</span>.
                    </div>
                    <div className="text-[11px] text-[#737373]">
                      Mod permission recorded in SQLite. Staff holding this role can now invoke /jail without requiring Discord Administrator permissions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PURGE */}
          {activeTab === 'purge' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center text-white text-xs font-mono">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-white text-xs">TrialMod</span>
                    <span className="text-[10px] text-[#555]">Today at 16:05</span>
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 bg-[#101010] px-2.5 py-1 rounded border border-[#222] text-xs font-mono text-[#d4d4d4]">
                    <span className="text-white font-semibold">/messages purgebots</span>
                    <span className="text-[#666]">limit:</span>
                    <span className="text-white font-bold">30</span>
                    <span className="text-[#666]">reason:</span>
                    <span className="text-[#a3a3a3]">Clean bot spam</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pl-2 border-l border-[#333]">
                <img
                  src="/bot-pfp.jpg"
                  alt="obsess"
                  className="w-8 h-8 rounded-full object-cover border border-[#262626]"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-xs lowercase">obsess</span>
                    <span className="bg-[#242424] text-[#a3a3a3] text-[9px] px-1 py-0.2 rounded font-mono uppercase">
                      BOT
                    </span>
                  </div>
                  <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-lg p-3 max-w-lg space-y-1">
                    <div className="text-xs text-white flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#aaa]" />
                      <span>Deleted <strong>18</strong> matching bot message(s).</span>
                    </div>
                    <div className="text-[11px] text-[#737373]">
                      Filtered check: <code className="text-[#aaa] font-mono">msg.author.bot == True</code>. Human chatter remained untouched.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MODLOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center text-white text-xs font-mono">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-white text-xs">Supervisor</span>
                    <span className="text-[10px] text-[#555]">Today at 18:20</span>
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 bg-[#101010] px-2.5 py-1 rounded border border-[#222] text-xs font-mono text-[#d4d4d4]">
                    <span className="text-white font-semibold">/logs modlogs</span>
                    <span className="text-[#666]">limit:</span>
                    <span className="text-white font-bold">2</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pl-2 border-l border-[#333]">
                <img
                  src="/bot-pfp.jpg"
                  alt="obsess"
                  className="w-8 h-8 rounded-full object-cover border border-[#262626]"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-xs lowercase">obsess</span>
                    <span className="bg-[#242424] text-[#a3a3a3] text-[9px] px-1 py-0.2 rounded font-mono uppercase">
                      BOT
                    </span>
                  </div>
                  <div className="bg-[#0c0c0c] border border-[#1f1f1f] rounded-lg p-3 max-w-lg space-y-2.5">
                    <div className="text-[11px] font-mono font-medium text-white uppercase tracking-wider">
                      Recent Moderation Logs (SQLite)
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded bg-[#101010] border border-[#1c1c1c]">
                        <div className="font-medium text-white">
                          Jail • 2026-10-21 14:32:00
                        </div>
                        <div className="text-[#888] text-[11px]">
                          Moderator: <span className="text-white">@HeadModerator</span> • Target: <span className="text-white">@bad_actor</span>
                        </div>
                        <div className="text-[#666] text-[11px]">Reason: Severe harassment in #general</div>
                      </div>
                      <div className="p-2 rounded bg-[#101010] border border-[#1c1c1c]">
                        <div className="font-medium text-white">
                          Role Add • 2026-10-21 12:10:45
                        </div>
                        <div className="text-[#888] text-[11px]">
                          Moderator: <span className="text-white">@HeadModerator</span> • Target: <span className="text-white">@newbie</span>
                        </div>
                        <div className="text-[#666] text-[11px]">Reason: Verified in community</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
