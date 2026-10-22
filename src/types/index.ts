export type CommandCategory =
  | 'General and Utility'
  | 'Core Moderation'
  | 'Role Management'
  | 'Custom Moderator Permissions'
  | 'Jail System'
  | 'Channel Management'
  | 'Message Purging'
  | 'Moderation Logs and Cases'
  | 'Member and User Info'
  | 'Bot Appearance'
  | 'Voice Moderation'
  | 'AFK Management';

export type CommandType = 'top-level' | 'grouped-subcommand' | 'alias-subcommand';

export interface CommandArgument {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface BotCommand {
  id: string;
  name: string;
  group?: string;
  syntax: string;
  description: string;
  category: CommandCategory;
  commandType: CommandType;
  requiredPermission?: string;
  permissionType: 'bot-side' | 'discord-admin' | 'discord-native' | 'none';
  arguments?: CommandArgument[];
  example: string;
  notes?: string;
}

export interface BotConfig {
  botName: string;
  avatarUrl: string;
  brandTagline: string;
  brandDescription: string;
  clientId: string;
  inviteUrl: string;
  supportServerUrl: string;
  githubUrl?: string;
  docsUrl?: string;
  claimedCommandsCount: number;
  dbType: string;
  defaultThemeColorHex: string;
}

export interface BotStatus {
  status: 'online' | 'idle' | 'dnd' | 'unconfigured' | 'offline';
  label: string;
  latencyMs?: number;
  guildCount?: number;
  lastChecked?: string;
}
