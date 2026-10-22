import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Lock } from 'lucide-react';
import { BOT_CONFIG } from '../config/bot';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  category: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');

  const faqData: FaqCategory[] = [
    {
      category: 'Getting Started',
      icon: <HelpCircle className="w-4 h-4 text-white" />,
      items: [
        {
          q: 'What is obsess?',
          a: 'obsess is a high-performance Discord moderation and server-management bot engineered for speed, strict role hierarchy safety, custom bot-side moderator permissions (/modrole), isolated jail enclosures, and detailed case logging.',
        },
        {
          q: 'How do I add obsess to my server?',
          a: 'Click the "Add to Discord" button in the top navigation or on the homepage. Select your server, grant the required Discord permissions, and ensure the obsess bot role is placed above the roles it needs to manage in Server Settings > Roles.',
        },
        {
          q: 'How much does obsess cost?',
          a: 'Core moderation, jail systems, role management, purge utilities, and server tools are completely free to use. There are no paywalls on essential server safety.',
        },
        {
          q: 'Where should I start after adding obsess to my server?',
          a: 'Run /help to confirm slash command registration. Then run /jailsetup to designate your jail channel and prisoner role, followed by /modrole list to configure granular moderation privileges for your moderator staff.',
        },
      ],
    },
    {
      category: 'Setup & Permissions',
      icon: <Shield className="w-4 h-4 text-white" />,
      items: [
        {
          q: 'What Discord permissions does obsess need?',
          a: 'For full functionality, obsess requires Manage Roles, Manage Channels, Ban Members, Kick Members, Moderate Members (Timeouts), Manage Messages, and View Audit Log. We recommend granting Administrator for seamless operation.',
        },
        {
          q: 'Why can’t obsess manage a specific role or member?',
          a: 'Discord enforces a strict role hierarchy rule: a bot can NEVER modify, assign, strip, or ban any member whose highest role is higher than or equal to the bot’s own highest role. Drag the obsess bot role to the top of your role hierarchy to resolve this.',
        },
        {
          q: 'Why did a moderation command fail with a permissions error?',
          a: 'obsess enforces dual authorization: first, the bot itself must possess native Discord permissions; second, the user running the command must either have Discord Administrator or have been granted custom bot permission via /modrole grant.',
        },
      ],
    },
    {
      category: 'Jail System & Role Management',
      icon: <Lock className="w-4 h-4 text-white" />,
      items: [
        {
          q: 'How does the jail system work?',
          a: 'When you run /jail on a user, obsess records all their current roles into its SQLite database (jail_members table), strips their roles, and assigns the isolated jail role. In the jail channel, they cannot speak elsewhere.',
        },
        {
          q: 'Will members get their original roles back when unjailed?',
          a: 'Yes! Running /unjail automatically retrieves their saved role list from the database, removes the jail role, and restores every role they previously held.',
        },
        {
          q: 'What is the difference between Discord permissions and /modrole?',
          a: 'Discord permissions grant raw server-wide access in Discord settings. /modrole permissions are bot-side authorization flags configured per server. Server owners can grant Jr. Mods the ability to /timeout or /jail without giving them dangerous server-wide permissions.',
        },
      ],
    },
  ];

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111] border border-[#222] text-xs font-mono text-[#aaa]">
          <HelpCircle className="w-3.5 h-3.5 text-white" />
          <span>Knowledge base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#888] max-w-xl">
          Everything you need to know about setting up obsess, managing bot permissions, configuring the jail system, and resolving role hierarchy conflicts.
        </p>
      </div>

      {/* Accordion Categories (appear.lol style) */}
      <div className="space-y-8">
        {faqData.map((cat, catIdx) => (
          <div key={cat.category} className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#171717] pb-2">
              {cat.icon}
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                {cat.category}
              </h2>
            </div>

            <div className="space-y-2">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = openIndex === key;

                return (
                  <div
                    key={item.q}
                    className="rounded-xl bg-[#080808] border border-[#171717] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(catIdx, itemIdx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-[#0d0d0d] transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#777] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#8e8e8e] leading-relaxed border-t border-[#121212]">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help callout */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-[#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Still have questions?
          </h3>
          <p className="text-xs text-[#888]">
            Join our official Discord community for 24/7 moderation support and bot assistance.
          </p>
        </div>
        <a
          href={BOT_CONFIG.supportServerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors shrink-0"
        >
          Join Support Server
        </a>
      </div>
    </div>
  );
};
