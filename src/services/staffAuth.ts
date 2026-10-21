export type UserRole =
  | 'Owner'
  | 'Administrator'
  | 'Senior Moderator'
  | 'Moderator'
  | 'Support'
  | 'Community Member';

export type StaffRole = 'Owner' | 'Administrator' | 'Senior Moderator' | 'Moderator' | 'Support';

export interface StaffMember {
  discordId: string;
  displayName: string;
  username?: string;
  avatarUrl?: string;
  role: StaffRole;
  addedAt: string;
  addedBy: string;
  notes?: string;
}

export interface UserProfile {
  discordId: string;
  displayName: string;
  username: string;
  avatarUrl?: string;
  role: UserRole;
  isStaff: boolean;
  isOwner: boolean;
  addedAt?: string;
  addedBy?: string;
  notes?: string;
}

export type AuditActionType =
  | 'Login'
  | 'Logout'
  | 'Staff Added'
  | 'Staff Removed'
  | 'Owner Set';

export interface StaffAuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorUsername: string;
  actorDisplayName: string;
  action: AuditActionType;
  details: string;
}

const STORAGE_KEYS = {
  MEMBERS: 'obsess_staff_whitelist_v1',
  SESSION: 'obsess_user_session_v1',
  LOGS: 'obsess_staff_audit_logs_v1',
  OWNER_ID: 'obsess_owner_discord_id_v1',
};

// Initial default staff seed
const DEFAULT_STAFF: StaffMember[] = [
  {
    discordId: '1562050707081662538',
    displayName: 'Website Owner',
    username: 'obsess_owner',
    role: 'Owner',
    addedAt: '2026-10-21',
    addedBy: 'System Init',
    notes: 'Default root owner account.',
  },
];

export const staffAuthService = {
  // Get all registered staff members
  getStaffList(): StaffMember[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(DEFAULT_STAFF));
        return DEFAULT_STAFF;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_STAFF;
    }
  },

  // Save staff list
  saveStaffList(list: StaffMember[]): void {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(list));
  },

  // Get configured Owner Discord ID
  getOwnerId(): string {
    return localStorage.getItem(STORAGE_KEYS.OWNER_ID) || '1562050707081662538';
  },

  // Set/update the Owner Discord ID
  setOwnerId(discordId: string): void {
    const cleanId = discordId.trim();
    localStorage.setItem(STORAGE_KEYS.OWNER_ID, cleanId);

    const list = this.getStaffList();
    const existing = list.find((m) => m.discordId === cleanId);
    if (existing) {
      existing.role = 'Owner';
      this.saveStaffList(list);
    } else {
      list.unshift({
        discordId: cleanId,
        displayName: 'Website Owner',
        username: 'website_owner',
        role: 'Owner',
        addedAt: new Date().toISOString().split('T')[0],
        addedBy: 'Owner Claim',
        notes: 'Primary server owner.',
      });
      this.saveStaffList(list);
    }

    this.logAction({
      actorId: cleanId,
      actorUsername: 'website_owner',
      actorDisplayName: 'Website Owner',
      action: 'Owner Set',
      details: `Root owner Discord ID set to ${cleanId}`,
    });
  },

  // Generate Discord OAuth2 Authorization URL
  getDiscordOAuthUrl(returnPath: string = '/'): string {
    const clientId = '1562050707081662538';
    const redirectUri = encodeURIComponent(window.location.origin + returnPath);
    return `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&scope=identify&redirect_uri=${redirectUri}`;
  },

  // Extract access_token from URL hash after Discord redirect
  parseOAuthToken(): string | null {
    if (!window.location.hash) return null;
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
  },

  // Fetch user profile from Discord API using access_token
  async fetchDiscordProfile(accessToken: string): Promise<{
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
  }> {
    const res = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Discord OAuth error: HTTP ${res.status}`);
    }

    return res.json();
  },

  // Authenticate ANY Discord user (Community Member OR Staff)
  loginWithDiscordProfile(discordUser: {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
  }): { success: boolean; user: UserProfile } {
    const staffList = this.getStaffList();
    const ownerId = this.getOwnerId();

    const avatarUrl = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(discordUser.id.slice(-2)) % 5}.png`;

    const displayName = discordUser.global_name || discordUser.username;
    const isOwner = discordUser.id === ownerId;

    let matchedStaff = staffList.find((m) => m.discordId === discordUser.id);
    let role: UserRole = 'Community Member';
    let isStaff = false;

    if (isOwner) {
      role = 'Owner';
      isStaff = true;
      if (!matchedStaff) {
        matchedStaff = {
          discordId: discordUser.id,
          displayName,
          username: discordUser.username,
          avatarUrl,
          role: 'Owner',
          addedAt: new Date().toISOString().split('T')[0],
          addedBy: 'Owner Auto-Match',
        };
        staffList.unshift(matchedStaff);
      } else {
        matchedStaff.role = 'Owner';
        matchedStaff.displayName = displayName;
        matchedStaff.username = discordUser.username;
        matchedStaff.avatarUrl = avatarUrl;
      }
      this.saveStaffList(staffList);
    } else if (matchedStaff) {
      role = matchedStaff.role;
      isStaff = true;
      matchedStaff.displayName = displayName;
      matchedStaff.username = discordUser.username;
      matchedStaff.avatarUrl = avatarUrl;
      this.saveStaffList(staffList);
    }

    const profile: UserProfile = {
      discordId: discordUser.id,
      displayName,
      username: discordUser.username,
      avatarUrl,
      role,
      isStaff,
      isOwner,
    };

    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(profile));

    // Audit trail records every single user login with both username and user ID!
    this.logAction({
      actorId: profile.discordId,
      actorUsername: profile.username,
      actorDisplayName: profile.displayName,
      action: 'Login',
      details: `@${profile.username} (${profile.discordId}) logged in [Role: ${profile.role}]`,
    });

    return { success: true, user: profile };
  },

  // Manual fallback login with User ID for any user
  loginWithDiscordId(inputDiscordId: string, customUsername?: string): { success: boolean; user: UserProfile } {
    const cleanId = inputDiscordId.trim();
    if (!cleanId) {
      throw new Error('Please enter a valid numeric Discord User ID.');
    }

    const staffList = this.getStaffList();
    const ownerId = this.getOwnerId();

    const isOwner = cleanId === ownerId;
    const matchedStaff = staffList.find((m) => m.discordId === cleanId);

    let role: UserRole = 'Community Member';
    let isStaff = false;
    let displayName = customUsername || `User-${cleanId.slice(-4)}`;
    let username = customUsername ? customUsername.toLowerCase().replace(/\s+/g, '_') : `user_${cleanId.slice(-4)}`;

    if (isOwner) {
      role = 'Owner';
      isStaff = true;
      displayName = 'Website Owner';
      username = 'obsess_owner';
    } else if (matchedStaff) {
      role = matchedStaff.role;
      isStaff = true;
      displayName = matchedStaff.displayName;
      username = matchedStaff.username || username;
    }

    const profile: UserProfile = {
      discordId: cleanId,
      displayName,
      username,
      role,
      isStaff,
      isOwner,
    };

    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(profile));

    this.logAction({
      actorId: profile.discordId,
      actorUsername: profile.username,
      actorDisplayName: profile.displayName,
      action: 'Login',
      details: `@${profile.username} (${profile.discordId}) logged in [Role: ${profile.role}]`,
    });

    return { success: true, user: profile };
  },

  // Get currently active user session
  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  // Log out current user and record in audit log
  logout(): void {
    const current = this.getCurrentUser();
    if (current) {
      this.logAction({
        actorId: current.discordId,
        actorUsername: current.username,
        actorDisplayName: current.displayName,
        action: 'Logout',
        details: `@${current.username} (${current.discordId}) logged out`,
      });
    }
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  // Add new Discord User ID to staff whitelist (Owner / Admin only)
  addStaffMember(
    newMember: Omit<StaffMember, 'addedAt' | 'addedBy'>,
    actor: UserProfile
  ): { success: boolean; error?: string } {
    if (!actor.isOwner && actor.role !== 'Administrator') {
      return { success: false, error: 'Only the Website Owner or Administrators can add staff members.' };
    }

    const cleanId = newMember.discordId.trim();
    if (!/^\d{17,20}$/.test(cleanId)) {
      return { success: false, error: 'Discord User ID must be a numeric snowflake (17–20 digits).' };
    }

    const list = this.getStaffList();
    if (list.some((m) => m.discordId === cleanId)) {
      return { success: false, error: `Discord ID ${cleanId} is already authorized in the staff whitelist.` };
    }

    const created: StaffMember = {
      ...newMember,
      discordId: cleanId,
      username: newMember.username || newMember.displayName.toLowerCase().replace(/\s+/g, '_'),
      addedAt: new Date().toISOString().split('T')[0],
      addedBy: actor.displayName || actor.discordId,
    };

    list.push(created);
    this.saveStaffList(list);

    this.logAction({
      actorId: actor.discordId,
      actorUsername: actor.username,
      actorDisplayName: actor.displayName,
      action: 'Staff Added',
      details: `@${actor.username} (${actor.discordId}) authorized Discord ID ${created.discordId} (@${created.username}) as ${created.role}`,
    });

    return { success: true };
  },

  // Remove staff member by Discord User ID
  removeStaffMember(targetDiscordId: string, actor: UserProfile): { success: boolean; error?: string } {
    if (!actor.isOwner && actor.role !== 'Administrator') {
      return { success: false, error: 'Only the Website Owner or Administrators can revoke staff access.' };
    }

    if (targetDiscordId === actor.discordId) {
      return { success: false, error: 'You cannot revoke your own staff access.' };
    }

    const list = this.getStaffList();
    const target = list.find((m) => m.discordId === targetDiscordId);

    if (target?.role === 'Owner') {
      return { success: false, error: 'Cannot remove the Website Owner.' };
    }

    const updated = list.filter((m) => m.discordId !== targetDiscordId);
    this.saveStaffList(updated);

    this.logAction({
      actorId: actor.discordId,
      actorUsername: actor.username,
      actorDisplayName: actor.displayName,
      action: 'Staff Removed',
      details: `@${actor.username} (${actor.discordId}) revoked access for Discord ID ${targetDiscordId} (@${target?.username || 'Unknown'})`,
    });

    return { success: true };
  },

  // Audit Logs
  getAuditLogs(): StaffAuditLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  logAction(log: Omit<StaffAuditLog, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newEntry: StaffAuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleString(),
      ...log,
    };
    logs.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs.slice(0, 150)));
  },
};
