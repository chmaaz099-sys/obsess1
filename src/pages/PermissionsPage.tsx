import React from 'react';
import { MOD_PERMISSIONS_LIST } from '../config/bot';
import {
  Server,
  KeyRound,
  Lock,
} from 'lucide-react';

export const PermissionsPage: React.FC = () => {
  const discordBotPerms = [
    {
      name: 'Manage Roles',
      reason: 'Required for /roleadd, /roleremove, /role create, /role strip, and the Jail system.',
      risk: 'High (Must be higher than managed roles)',
    },
    {
      name: 'Manage Channels',
      reason: 'Required for /channel lock, unlock, slowmode, hide, unhide, and creating #jail.',
      risk: 'Moderate',
    },
    {
      name: 'Ban Members',
      reason: 'Required for /mod ban, /mod softban, /mod unban, and /mod banid.',
      risk: 'High',
    },
    {
      name: 'Kick Members',
      reason: 'Required for /mod kick and /mod softban message cleanup.',
      risk: 'Moderate',
    },
    {
      name: 'Moderate Members (Timeout)',
      reason: 'Required for /mod timeout and /mod untimeout (up to 28 days).',
      risk: 'Low',
    },
    {
      name: 'Manage Messages',
      reason: 'Required for /messages purge and filtered purge algorithms.',
      risk: 'Low',
    },
    {
      name: 'Manage Nicknames',
      reason: 'Required for /member nickname changes.',
      risk: 'Low',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Header */}
      <div className="space-y-2 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Permissions
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
          Understanding the distinction between native Discord authorizations, bot-side permissions, and configuration authority.
        </p>
      </div>

      {/* The 3 Tiers of Authority */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1 */}
        <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-2 rounded bg-[#121212] border border-[#1f1f1f] text-white w-fit">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">1. Discord Native Permissions</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Permissions granted to the <strong>bot application</strong> itself upon joining (Manage Roles, Kick, Ban, Timeout). Required so Discord API does not reject requests.
            </p>
          </div>
          <div className="text-[10px] font-mono text-[#737373] bg-[#000] p-2 rounded border border-[#1a1a1a]">
            Target: obsess application
          </div>
        </div>

        {/* Tier 2 */}
        <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-2 rounded bg-[#121212] border border-[#1f1f1f] text-white w-fit">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">2. Bot-Side /modrole Permissions</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Custom permissions stored in the bot SQLite database. Allows moderators to trigger bot actions (like <code className="text-white">jail</code> or <code className="text-white">warn</code>) without giving them native Administrator.
            </p>
          </div>
          <div className="text-[10px] font-mono text-[#737373] bg-[#000] p-2 rounded border border-[#1a1a1a]">
            Target: Moderator roles in server
          </div>
        </div>

        {/* Tier 3 */}
        <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="p-2 rounded bg-[#121212] border border-[#1f1f1f] text-white w-fit">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">3. Configuration Authority</h3>
            <p className="text-xs text-[#888] leading-relaxed">
              Commands that configure the bot infrastructure (<code className="text-white">/modrole grant</code>, <code className="text-white">/jailsetup</code>) are strictly locked to the <strong>Server Owner</strong> or members with native <strong>Administrator</strong>.
            </p>
          </div>
          <div className="text-[10px] font-mono text-[#737373] bg-[#000] p-2 rounded border border-[#1a1a1a]">
            Target: Server Owner & Administrators
          </div>
        </div>
      </div>

      {/* Bot-Side 20 Permissions Grid */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#080808] border border-[#171717] space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white tracking-tight">
            The 20 /modrole Permission Nodes
          </h2>
          <p className="text-xs text-[#737373]">
            Defined in <code className="text-[#a3a3a3] font-mono">MOD_PERMISSIONS</code> in the bot source.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 font-mono text-xs">
          {MOD_PERMISSIONS_LIST.map((perm) => (
            <div
              key={perm}
              className="p-2.5 rounded bg-[#000] border border-[#171717] text-[#a3a3a3] hover:text-white transition-colors"
            >
              <div className="font-medium text-white">{perm}</div>
              <div className="text-[10px] text-[#555] truncate pt-0.5">/modrole grant</div>
            </div>
          ))}
        </div>
      </div>

      {/* Discord Native Permissions Table */}
      <div className="p-6 sm:p-8 rounded-xl bg-[#080808] border border-[#171717] space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Discord API Authorizations Granted to obsess
          </h2>
          <p className="text-xs text-[#737373]">
            Permissions requested during OAuth2 authorization:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1a1a1a] text-[#555] font-mono text-[10px]">
                <th className="py-2 px-2.5">Discord Permission</th>
                <th className="py-2 px-2.5">Why obsess Needs It</th>
                <th className="py-2 px-2.5">Sensitivity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]">
              {discordBotPerms.map((p) => (
                <tr key={p.name}>
                  <td className="py-2.5 px-2.5 font-medium text-white font-mono">{p.name}</td>
                  <td className="py-2.5 px-2.5 text-[#888]">{p.reason}</td>
                  <td className="py-2.5 px-2.5 text-[#666] font-mono text-[11px]">{p.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
