import React from 'react';
import { BOT_CONFIG } from '../config/bot';
import {
  ArrowUpRight,
  HelpCircle,
} from 'lucide-react';

export const SetupPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Invite obsess to your server',
      description:
        'Authorize obsess through the official Discord OAuth2 invitation URL. Make sure you possess the Manage Server or Administrator permission in your server.',
      action: (
        <a
          href={BOT_CONFIG.inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors"
        >
          <span>Open Invitation Link</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      ),
      tip: 'The OAuth2 link requests standard permissions needed for moderation (Manage Roles, Manage Channels, Kick, Ban, Moderate Members).',
    },
    {
      step: '02',
      title: 'Position the bot role in Discord hierarchy',
      description:
        'In Server Settings -> Roles, locate the "obsess" role. Drag it ABOVE any roles that the bot will be managing, assigning, or stripping.',
      tip: 'Discord rule: A bot cannot assign or remove any role that sits higher than its own highest role.',
    },
    {
      step: '03',
      title: 'Test commands with /help and /ping',
      description:
        'In any text channel, run /help and /ping to verify that the bot is responsive and that global application commands are synced.',
      code: '/help\n/ping',
      tip: 'Global slash commands take a few minutes to populate across all Discord client caches.',
    },
    {
      step: '04',
      title: 'Configure custom staff permissions (/modrole)',
      description:
        'Assign specific bot-side capabilities to your staff roles using /modrole grant without giving them native Administrator.',
      code: '/modrole grant role: @Moderator permission: warn\n/modrole grant role: @Moderator permission: timeout\n/modrole grant role: @Moderator permission: jail\n/modrole list',
      tip: 'Only the Server Owner or native Discord Administrators can run /modrole commands.',
    },
    {
      step: '05',
      title: 'Initialize the jail isolation system (/jailsetup)',
      description:
        'Run /jailsetup to provision the Jailed role, create the #jail channel, and lock down viewing permissions across other channels.',
      code: '/jailsetup',
      tip: 'You can pass an existing role or channel as optional arguments if preferred.',
    },
    {
      step: '06',
      title: 'Verify moderation logs',
      description:
        'Issue a test warning or timeout and query the recorded action using /logs modlogs.',
      code: '/mod warn member: @user reason: Test warning\n/logs modlogs limit: 5',
    },
  ];

  const faqs = [
    {
      q: 'Why am I getting "Discord denied this action" (Forbidden 403)?',
      a: 'The bot highest role is positioned below the role or member you are attempting to moderate. Move the obsess role higher in Server Settings -> Roles.',
    },
    {
      q: 'Why are slash commands not showing up immediately?',
      a: 'Discord synchronizes global commands asynchronously. While the bot registers commands upon login, client autocomplete can take up to an hour to refresh. Restarting Discord desktop usually speeds this up.',
    },
    {
      q: 'Does obsess require the privileged Message Content Intent?',
      a: 'No. obsess is purposefully built without the privileged Message Content Intent. Server chat content is never read, recorded, or intercepted.',
    },
    {
      q: 'Can moderators abuse /jail or /modrole?',
      a: '/modrole can only be invoked by the Server Owner or native Administrators. In addition, /jail enforces strict hierarchy checks and cannot moderate admins or the owner.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Header */}
      <div className="space-y-2 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Setup Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
          Step-by-step checklist to deploy obsess in your server.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-6">
        {steps.map((s) => (
          <div
            key={s.step}
            className="p-6 sm:p-7 rounded-xl bg-[#080808] border border-[#171717] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-base font-bold text-white bg-[#141414] border border-[#222] w-9 h-9 rounded flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {s.title}
                </h3>
              </div>
              {s.action && <div>{s.action}</div>}
            </div>

            <p className="text-xs text-[#8e8e8e] leading-relaxed pl-0 sm:pl-12">
              {s.description}
            </p>

            {s.code && (
              <div className="pl-0 sm:pl-12">
                <div className="p-3 rounded bg-[#000] border border-[#1a1a1a] text-[#ededed] font-mono text-xs whitespace-pre select-all">
                  {s.code}
                </div>
              </div>
            )}

            {s.tip && (
              <div className="pl-0 sm:pl-12 flex items-start gap-2 text-xs text-[#737373] bg-[#0c0c0c] p-2.5 rounded border border-[#1a1a1a]">
                <HelpCircle className="w-3.5 h-3.5 text-[#999] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#a3a3a3] font-medium">Tip:</strong> {s.tip}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Troubleshooting FAQ */}
      <div className="space-y-5 pt-4 border-t border-[#141414]">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-1.5">
              <h4 className="text-xs font-semibold text-white flex items-start gap-2">
                <span className="text-[#555] font-mono">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-[#737373] leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
