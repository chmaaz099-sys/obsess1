export interface FeatureDetail {
  id: string;
  title: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  keyCapabilities: string[];
  safetyChecks: string[];
  codeHighlight?: string;
  commandsUsed: string[];
  iconName: string;
}

export const BOT_FEATURES: FeatureDetail[] = [
  {
    id: 'feature-moderation',
    title: 'Advanced Core Moderation',
    badge: 'Security & Integrity',
    shortDescription:
      'Robust warning systems, timeouts up to 28 days, permanent bans, softbans for message deletion, and hackbans by numeric ID.',
    fullDescription:
      'obsess implements strict hierarchical moderation checks before executing any punitive action. It verifies that the targeted member is not the server owner, does not possess Discord Administrator permissions, is not above the moderator in the role ladder, and is not above the bot itself. Every warning and ban is timestamped in SQLite with moderator attribution.',
    keyCapabilities: [
      'Configurable timeouts up to 40,320 minutes (28 days max Discord API limit)',
      'Softban support: bans and immediately unbans to wipe 24 hours of chatter while ejecting the offender',
      'Hackban / Ban by numeric ID (/mod banid) to blacklist malicious actors before they join',
      'Full warning management: warn, count warnings, delete single warning by ID, or edit warning reasons',
    ],
    safetyChecks: [
      'Self-moderation prevention (moderator cannot warn/ban themselves)',
      'Owner protection (server owner is strictly exempt from moderation)',
      'Administrator immunity (members with Discord Administrator cannot be moderated)',
      'Strict role hierarchy (moderator and bot highest role must both exceed target)',
    ],
    commandsUsed: ['/mod warn', '/mod ban', '/mod kick', '/mod timeout', '/mod softban', '/mod banid'],
    iconName: 'ShieldAlert',
  },
  {
    id: 'feature-roles',
    title: 'Precision Role Management',
    badge: 'Automation & Control',
    shortDescription:
      'Atomic role assignments, mass operations for humans or bots, role stripping, and dynamic creation with custom hex palettes.',
    fullDescription:
      'Managing hundreds of member roles is seamless with obsess. Server staff can create hoisted or mentionable roles with custom hex colors, rename roles, mass-assign roles to all human members while skipping bot accounts, or mass-remove temporary roles. In security emergencies, /role strip cleans all roles below the bot in one atomic operation.',
    keyCapabilities: [
      'Mass assignment (/role all) targeting all verified humans without touching bots',
      'Dedicated bot role assignment (/role bots) for integration categorization',
      'Atomic /role strip: immediately wipes all removable roles from a compromised member',
      'Dynamic hex color customization and hoisting toggles directly via slash commands',
    ],
    safetyChecks: [
      'Cannot assign or modify the default @everyone role',
      'Managed integration roles (bots/boosts) are automatically preserved',
      'Actor and bot role hierarchy validations are enforced before role operations',
    ],
    commandsUsed: ['/role create', '/role all', '/role removeall', '/role strip', '/role color', '/roleadd'],
    iconName: 'UserCheck',
  },
  {
    id: 'feature-jail',
    title: 'Autonomous Jail System',
    badge: 'Isolation & Anti-Evasion',
    shortDescription:
      'Isolated detention workflow with automatic #jail channel configuration, role preservation in SQLite, and anti-evasion rejoin listeners.',
    fullDescription:
      'The obsess Jail System is built for disciplinary isolation. Running /jail strips all removable roles from a member, stores their role IDs in SQLite as serialized JSON, assigns the Jailed role, and confines them to the isolated #jail channel. Upon /unjail, the exact role set is restored automatically. An anti-evasion event listener (on_member_join) guarantees that if a prisoner leaves and rejoins, their jail role is immediately reapplied.',
    keyCapabilities: [
      'Automated provisioning (/jailsetup): auto-creates the "Jailed" role and #jail channel with comprehensive channel permission overrides across the entire server',
      'Stateful role preservation: captures exact role IDs before incarceration and cleanly restores them upon release',
      'Anti-evasion protection: active on_member_join listener detects prisoners attempting to evade isolation by rejoining',
      'Diagnostic inspection: /jailinfo exposes who jailed the user, incarceration timestamp, reason, and saved roles',
    ],
    safetyChecks: [
      'Server owner, administrators, and higher-ranked roles cannot be jailed',
      'Managed roles and default @everyone are protected from deletion',
      'Stale jail database records can be safely flushed with /jailclear without altering roles',
    ],
    commandsUsed: ['/jailsetup', '/jail', '/unjail', '/jaillist', '/jailinfo', '/jailclear'],
    iconName: 'Lock',
  },
  {
    id: 'feature-modrole',
    title: 'Custom Moderator Permissions',
    badge: 'Least Privilege',
    shortDescription:
      'Grant specific bot moderation powers to custom staff roles without giving them dangerous native Discord guild permissions.',
    fullDescription:
      'Traditional Discord bot setups require giving moderators native permissions like Manage Server or Administrator, exposing the guild to rogue staff. With obsess, server owners use /modrole grant to issue granular bot-side permissions (e.g. jail, timeout, purge, modlogs) to designated staff roles. Staff only receive the right to trigger the bot commands, while the bot performs the action safely.',
    keyCapabilities: [
      '20 fine-grained permission choices including warn, ban, timeout, jail, purge, modlogs, and notes',
      'Zero elevation: staff roles do not receive native Discord Administrator or Manage Guild rights',
      'Complete transparency: /modrole list gives a unified overview of all role permission bindings',
      'Admin-locked: only the Server Owner or native Discord Administrators can modify modrole grants',
    ],
    safetyChecks: [
      'Role hierarchy verification: bot role must sit higher than the role being granted permissions',
      'Managed and default roles cannot be configured with modrole grants',
    ],
    commandsUsed: ['/modrole grant', '/modrole revoke', '/modrole list'],
    iconName: 'KeyRound',
  },
  {
    id: 'feature-channels',
    title: 'Channel Management & Lockdown',
    badge: 'Raid Defense',
    shortDescription:
      'Instant channel lockdown, emergency hiding, granular slowmode up to 6 hours, and announcement broadcasts.',
    fullDescription:
      'When chat velocity spikes or server raids occur, staff can immediately restrict discussion using /channel lock or hide the channel entirely with /channel hide. Channel slowmode can be dialed anywhere from 1 second to 21,600 seconds (6 hours) to cool down heated arguments.',
    keyCapabilities: [
      'Instant lock and unlock overriding @everyone Send Messages and Send Messages in Threads',
      'Channel hide/unhide toggles for stealth maintenance and emergency blackout',
      'Flexible slowmode configuration supporting delays up to 6 hours',
      'Channel diagnostic lookups revealing channel creation timestamps and type metadata',
    ],
    safetyChecks: [
      'Requires bot-side manage_channels permission',
      'Validates channel type compatibility (text, forum, voice)',
    ],
    commandsUsed: ['/channel lock', '/channel unlock', '/channel slowmode', '/channel hide', '/channel announce'],
    iconName: 'Hash',
  },
  {
    id: 'feature-purging',
    title: 'Targeted Message Purging',
    badge: 'Clean Chat',
    shortDescription:
      'Filtered chat sanitation removing bot spam, suspicious links, attachments, specific user messages, or matched substrings.',
    fullDescription:
      'Standard Discord purge tools delete everything indiscriminately. obsess features targeted purging with custom predicates. Delete up to 100 messages filtering exclusively for bot spam (/messages purgebots), external links (/messages purgelinks), file attachments (/messages purgeattachments), a single user (/messages purgeuser), or banned keyword phrases (/messages purgecontains).',
    keyCapabilities: [
      'Bot purge filter to remove automated bot command clutter in active chat',
      'Link sanitizer targeting phishing and invitation links instantly',
      'Attachment stripper to clean large media files and image spam',
      'Substring search purge for targeted cleanup of raid phrases',
    ],
    safetyChecks: [
      'Capped at 100 messages per execution to comply with Discord API limits',
      'Requires bot-side purge permission',
    ],
    commandsUsed: ['/messages purge', '/messages purgebots', '/messages purgelinks', '/messages purgeattachments', '/messages purgeuser', '/messages purgecontains'],
    iconName: 'Sparkles',
  },
  {
    id: 'feature-logs',
    title: 'Audit Logs & Private Notes',
    badge: 'Accountability',
    shortDescription:
      'Permanent SQLite audit trail with automated fallback logging channel broadcasts and private moderator notes per user.',
    fullDescription:
      'Every single disciplinary action taken through obsess is committed to the SQLite mod_logs table, recording the moderator ID, target ID, action verb, reason, and ISO-8601 UTC timestamp. If a log channel is configured in guild_settings, real-time rich embeds are dispatched to the staff channel. In addition, staff can file confidential moderator notes on member profiles (/logs noteadd) that remain invisible to ordinary members.',
    keyCapabilities: [
      'Persistent SQLite log storage for historical review even after users leave the server',
      'Real-time automated logging to configured server log channels with target tags',
      'Confidential staff notes: attach private behavioral observations to any member',
      'Quick case lookup (/logs modlogs) with configurable fetch limits',
    ],
    safetyChecks: [
      'Moderation notes require the dedicated bot-side notes permission',
      'Logs cannot be manipulated by regular members',
    ],
    commandsUsed: ['/logs modlogs', '/logs noteadd', '/logs notelist', '/logs notedel'],
    iconName: 'FileText',
  },
  {
    id: 'feature-voice',
    title: 'Voice Channel Moderation',
    badge: 'Audio Moderation',
    shortDescription:
      'Server-wide voice moderation permissions for server muting, deafening, moving, and locking voice channels.',
    fullDescription:
      'obsess includes voice moderation capabilities via its registered voice_mod permission set. Staff can manage disruptive users in audio channels, enforce server mutes or deafens, and coordinate emergency moves during community events.',
    keyCapabilities: [
      'Voice moderation permission choice (voice_mod) in /modrole grant',
      'Enables staff to moderate voice channels without granting full Discord Administrator',
      'Integrated with Discord voice state intents for accurate presence tracking',
    ],
    safetyChecks: [
      'Bound by Discord voice channel permissions and role hierarchy',
    ],
    commandsUsed: ['/modrole grant (voice_mod)'],
    iconName: 'MicOff',
  },
  {
    id: 'feature-appearance',
    title: 'Per-Server Appearance Cards',
    badge: 'Guild Customization',
    shortDescription:
      'Custom server-specific bot preview cards with customized title, bio, accent colors, banners, and website links.',
    fullDescription:
      'Server administrators can customize the bot appearance card displayed in their server. Store a custom bio, card title, custom footer, hex accent color, and website URL in the guild_bot_appearance database table. Running /botappearance show displays this customized presentation card. (Source note: Discord does not permit a bot global user profile or avatar to differ per server; this customizes the server embed identity card).',
    keyCapabilities: [
      'Guild-specific title, bio, and custom footer in SQLite',
      'Dynamic hex accent color matching the server color scheme',
      'Custom website URL field pointing to your server community hub',
      'Instant reset (/botappearance reset) guarded by Discord Manage Server permission',
    ],
    safetyChecks: [
      'Restricted to members with native Discord Manage Server (Manage Guild) permission',
      'Does not attempt unsupported global Discord profile modifications',
    ],
    commandsUsed: ['/botappearance show', '/botappearance reset', '/botappearance info'],
    iconName: 'Palette',
  },
  {
    id: 'feature-privacy',
    title: 'Privacy-First Architecture',
    badge: 'Zero Message Snooping',
    shortDescription:
      'Operates with zero privileged Message Content Intent, ensuring staff messages and user conversations are never logged or read.',
    fullDescription:
      'Unlike intrusive bots that require Discord privileged Message Content Intent to read all user messages, obsess is architected from the ground up to respect member privacy. All interactions occur via Discord modern Application Command (Slash Command) tree. Because message content is never inspected by background listeners, chat-based automatic AFK detection and edit-sniping are intentionally disabled to preserve absolute security and data privacy.',
    keyCapabilities: [
      'No privileged Message Content Intent required for deployment',
      'Cannot snoop or store member chat conversations in databases',
      'DND bot status indicator for uninterrupted professional presence',
      'Lightweight SQLite database with zero external cloud dependencies',
    ],
    safetyChecks: [
      'Strict adherence to Discord Developer Terms of Service and Privacy Guidelines',
      'Audit logs record only moderator actions and provided reasons',
    ],
    commandsUsed: ['/help', '/ping'],
    iconName: 'ShieldCheck',
  },
];
