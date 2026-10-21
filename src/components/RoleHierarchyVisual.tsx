import React from 'react';
import { ArrowDown, Check, AlertTriangle } from 'lucide-react';

export const RoleHierarchyVisual: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl bg-[#080808] border border-[#171717] p-6 sm:p-8 space-y-6 text-left">
      <div className="space-y-1 border-b border-[#141414] pb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Discord Role Hierarchy Safety Engine</h3>
        <p className="text-xs text-[#737373]">
          How obsess executes safety checks via <code className="text-[#d4d4d4] font-mono">check_target</code> & <code className="text-[#d4d4d4] font-mono">check_role_hierarchy</code>
        </p>
      </div>

      {/* Visual Role Ladder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#737373] font-semibold flex items-center justify-between">
            <span>Server Role Order</span>
            <span>Highest Authority</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            {/* Level 1: Server Owner */}
            <div className="p-2.5 rounded bg-[#101010] border border-[#222222] flex items-center justify-between text-white">
              <span>Server Owner</span>
              <span className="text-[9px] text-[#888] bg-[#1c1c1c] px-1.5 py-0.5 rounded">Immune</span>
            </div>

            <div className="flex justify-center text-[#444]">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* Level 2: obsess Bot Role */}
            <div className="p-2.5 rounded bg-[#1c1c1c] border border-[#383838] flex items-center justify-between text-white font-semibold">
              <span className="lowercase">obsess bot role</span>
              <span className="text-[9px] bg-white text-black px-1.5 py-0.5 rounded">
                Required Position
              </span>
            </div>

            <div className="flex justify-center text-[#444]">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* Level 3: Moderator Role */}
            <div className="p-2.5 rounded bg-[#0d0d0d] border border-[#1a1a1a] flex items-center justify-between text-[#d4d4d4]">
              <span>@Staff-Moderator</span>
              <span className="text-[9px] text-[#666]">Granted via /modrole</span>
            </div>

            <div className="flex justify-center text-[#444]">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* Level 4: Jailed Role */}
            <div className="p-2.5 rounded bg-[#0d0d0d] border border-[#1a1a1a] flex items-center justify-between text-[#888]">
              <span>@Jailed</span>
              <span className="text-[9px] text-[#666]">Isolation Role</span>
            </div>

            <div className="flex justify-center text-[#444]">
              <ArrowDown className="w-3 h-3" />
            </div>

            {/* Level 5: Regular Member */}
            <div className="p-2.5 rounded bg-[#0a0a0a] border border-[#171717] flex items-center justify-between text-[#666]">
              <span>@Regular Member</span>
              <span className="text-[9px] text-[#444]">Managed</span>
            </div>
          </div>
        </div>

        {/* Verification Rules */}
        <div className="space-y-2.5 flex flex-col justify-between">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#737373] font-semibold">
            Enforced Rules
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-[#000] border border-[#171717] space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-white">
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Bot Highest Role Rule</span>
              </div>
              <p className="text-[#737373] text-[11px] leading-relaxed">
                The bot role must be positioned above any role you want it to assign, remove, or strip. If the bot role is lower, Discord rejects the API request with Forbidden 403.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#000] border border-[#171717] space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-white">
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Moderator Immunity Checks</span>
              </div>
              <p className="text-[#737373] text-[11px] leading-relaxed">
                <code className="text-[#d4d4d4]">check_target()</code> prevents self-moderation, targetting the Server Owner, or targetting any member with native Administrator permissions.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#000] border border-[#171717] space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-[#d4d4d4]">
                <AlertTriangle className="w-3.5 h-3.5 text-[#888]" />
                <span>Managed Role Protection</span>
              </div>
              <p className="text-[#737373] text-[11px] leading-relaxed">
                Default @everyone and integration-managed roles (Nitro Booster, bot integrations) are safeguarded against accidental deletion or modification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
