import type { BotConfig } from '../types';

export const BOT_CONFIG: BotConfig = {
  botName: 'obsess',
  brandTagline: 'Moderation. Control. Simplicity.',
  brandDescription:
    'Take control of your Discord server with powerful moderation tools, advanced role management, channel controls, detailed moderation logs, and customizable server settings.',
  // Application Client ID
  clientId: import.meta.env.VITE_DISCORD_CLIENT_ID || '1562050707081662538',
  
  // Discord OAuth2 bot invitation URL
  get inviteUrl(): string {
    const customInvite = import.meta.env.VITE_DISCORD_BOT_INVITE;
    if (customInvite && customInvite !== '') {
      return customInvite;
    }
    return `https://discord.com/oauth2/authorize?client_id=${this.clientId}`;
  },

  // Support Server invite URL
  supportServerUrl:
    import.meta.env.VITE_SUPPORT_SERVER_URL || 'https://discord.gg/obsess',

  githubUrl: 'https://github.com/obsess-bot',
  docsUrl: '/setup',
  claimedCommandsCount: 150,
  dbType: 'SQLite (aiosqlite)',
  defaultThemeColorHex: '#0f0f0f',
};

// Mod permissions recognized by the bot's custom permission system
export const MOD_PERMISSIONS_LIST = [
  'warn',
  'view_warnings',
  'clear_warnings',
  'ban',
  'unban',
  'kick',
  'timeout',
  'remove_timeout',
  'purge',
  'manage_channels',
  'manage_nicknames',
  'modlogs',
  'say',
  'poll',
  'roleinfo',
  'manage_roles',
  'jail',
  'voice_mod',
  'manage_afk',
  'notes',
] as const;
