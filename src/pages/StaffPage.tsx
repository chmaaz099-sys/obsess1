import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { staffAuthService, PRIMARY_OWNER_ID } from '../services/staffAuth';
import type { StaffMember, StaffRole, StaffAuditLog } from '../services/staffAuth';
import { useAuth } from '../context/AuthContext';
import {
  UserCheck,
  UserPlus,
  Trash2,
  Copy,
  Check,
  Terminal,
  FileText,
  History,
  LogOut,
  Palette,
  Shield,
  Search,
  ArrowRight,
  Lock,
} from 'lucide-react';

export const StaffPage: React.FC = () => {
  const { currentUser, loginWithDiscord, logout, isVerifying } = useAuth();
  
  // Whitelist management state
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [newDiscordId, setNewDiscordId] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newRole, setNewRole] = useState<StaffRole>('Moderator');
  const [newNotes, setNewNotes] = useState('');
  const [whitelistMsg, setWhitelistMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Command generator state
  const [genCmdType, setGenCmdType] = useState<'modrole' | 'jail' | 'timeout' | 'purge' | 'banid'>('modrole');
  const [genRoleName, setGenRoleName] = useState('@Moderator');
  const [genPermission, setGenPermission] = useState('jail');
  const [genTarget, setGenTarget] = useState('@user');
  const [genReason, setGenReason] = useState('Violating community guidelines');
  const [genDuration, setGenDuration] = useState('60');
  const [genPurgeLimit, setGenPurgeLimit] = useState('25');
  const [genPurgeType, setGenPurgeType] = useState('purgebots');
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Template copy state
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Audit search & filter state
  const [auditLogs, setAuditLogs] = useState<StaffAuditLog[]>([]);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditFilter, setAuditFilter] = useState<string>('All');

  // Check if current user is owner (Frosty / 1094287436881862736)
  const isOwner = currentUser ? staffAuthService.isOwner(currentUser.discordId) : false;
  const isStaff = currentUser?.isStaff || isOwner;

  // Default active tab to 'whitelist' for the Owner
  const [activeTab, setActiveTab] = useState<
    'overview' | 'whitelist' | 'generator' | 'runbooks' | 'templates' | 'appearance' | 'audit'
  >('whitelist');

  useEffect(() => {
    setStaffList(staffAuthService.getStaffList());
    setAuditLogs(staffAuthService.getAuditLogs());
    if (isOwner) {
      setActiveTab('whitelist');
    }
  }, [currentUser, isOwner]);

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setWhitelistMsg(null);

    const res = staffAuthService.addStaffMember(
      {
        discordId: newDiscordId,
        displayName: newDisplayName || `Staff-${newDiscordId.slice(-4)}`,
        role: newRole,
        notes: newNotes,
      },
      currentUser
    );

    if (res.success) {
      setWhitelistMsg({ type: 'success', text: `Authorized Discord User ID ${newDiscordId} as ${newRole}. They can now log in!` });
      setStaffList(staffAuthService.getStaffList());
      setAuditLogs(staffAuthService.getAuditLogs());
      setNewDiscordId('');
      setNewDisplayName('');
      setNewNotes('');
    } else {
      setWhitelistMsg({ type: 'error', text: res.error || 'Failed to authorize user ID.' });
    }
  };

  const handleRemoveStaff = (targetId: string) => {
    if (!currentUser) return;
    if (confirm(`Revoke staff panel access for Discord ID ${targetId}?`)) {
      const res = staffAuthService.removeStaffMember(targetId, currentUser);
      if (res.success) {
        setStaffList(staffAuthService.getStaffList());
        setAuditLogs(staffAuthService.getAuditLogs());
        setWhitelistMsg({ type: 'success', text: `Revoked staff access for Discord ID ${targetId}.` });
      } else {
        setWhitelistMsg({ type: 'error', text: res.error || 'Failed to revoke access.' });
      }
    }
  };

  const getGeneratedCommand = (): string => {
    switch (genCmdType) {
      case 'modrole':
        return `/modrole grant role: ${genRoleName} permission: ${genPermission}`;
      case 'jail':
        return `/jail member: ${genTarget} reason: ${genReason}`;
      case 'timeout':
        return `/mod timeout member: ${genTarget} duration: ${genDuration} reason: ${genReason}`;
      case 'purge':
        return `/messages ${genPurgeType} limit: ${genPurgeLimit} reason: ${genReason}`;
      case 'banid':
        return `/mod banid text: ${genTarget.replace(/[^0-9]/g, '') || 'USER_ID'} reason: ${genReason}`;
      default:
        return '';
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    if (id === 'cmd') {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } else if (id.startsWith('id-')) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setCopiedTemplate(id);
      setTimeout(() => setCopiedTemplate(null), 2000);
    }
  };

  // Filtered audit logs
  const filteredAuditLogs = auditLogs.filter((log) => {
    if (auditFilter !== 'All' && log.action !== auditFilter) {
      return false;
    }
    if (auditSearch.trim() !== '') {
      const q = auditSearch.toLowerCase().trim();
      return (
        log.actorUsername.toLowerCase().includes(q) ||
        log.actorId.includes(q) ||
        log.actorDisplayName.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ==========================================
  // VIEW 1: NOT LOGGED IN
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#737373]">
              Portal Authentication
            </span>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Sign in with Discord
            </h1>
            <p className="text-xs text-[#888888] leading-relaxed max-w-sm mx-auto">
              Connect your Discord account to view your profile, manage authorized commands, or access staff moderation controls.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-5">
            {isVerifying ? (
              <div className="py-8 space-y-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#ededed] font-medium">Verifying Discord OAuth session...</p>
                <p className="text-[11px] text-[#666]">Connecting your Discord profile.</p>
              </div>
            ) : (
              <>
                {/* Primary Button */}
                <button
                  onClick={() => loginWithDiscord('/staff')}
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Login with Discord</span>
                </button>

                <div className="pt-3 border-t border-[#141414] space-y-1 text-[11px] text-[#666] text-center">
                  <p>Sign in is authenticated directly with Discord OAuth2.</p>
                  <p className="text-[10px] text-[#555]">
                    Root Owner: Frosty (<code className="text-[#888] font-mono">1094287436881862736</code>)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGGED IN AS REGULAR COMMUNITY MEMBER (NOT OWNER & NOT ON STAFF WHITELIST)
  // ==========================================
  if (!isStaff) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="w-full max-w-md p-7 rounded-2xl bg-[#080808] border border-[#171717] space-y-5 text-left">
          <div className="flex items-center gap-3 border-b border-[#141414] pb-4">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt=""
                className="w-10 h-10 rounded-full border border-[#2a2a2a] object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center text-white font-mono text-sm">
                {currentUser.username[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-semibold text-white">{currentUser.displayName}</div>
              <div className="text-xs text-[#737373] font-mono">@{currentUser.username} • ID: {currentUser.discordId}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141414] text-[#a3a3a3] border border-[#262626] text-xs font-mono">
              <Lock className="w-3.5 h-3.5 text-[#737373]" />
              <span>Staff Authorization Required</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Community Member Account
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              You are logged in with Discord. However, your User ID (<code className="text-white font-mono">{currentUser.discordId}</code>) is not currently on the staff whitelist.
            </p>
            <p className="text-xs text-[#666] leading-relaxed">
              If you are a server moderator, ask the bot owner Frosty (<code className="text-white font-mono">1094287436881862736</code>) to authorize your Discord ID in the staff whitelist.
            </p>
          </div>

          <div className="pt-2 border-t border-[#141414] flex items-center justify-between">
            <button
              onClick={() => logout()}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Sign Out
            </button>
            <a
              href="https://discord.gg/obsess"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white hover:underline flex items-center gap-1"
            >
              <span>Join Support Server</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: OWNER & STAFF DASHBOARD
  // ==========================================
  const isOwnerOrAdmin = isOwner || currentUser.role === 'Administrator';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* SPECIAL BOT OWNER BANNER FOR FROSTY */}
      {isOwner && (
        <div className="p-5 rounded-2xl bg-[#090909] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold flex items-center gap-1.5">
                <span>👑</span>
                <span>BOT OWNER PANEL</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-bold">
                ROOT AUTHORITY
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Welcome Frosty (@{currentUser.username || 'wenpathy'})
            </h2>
            <p className="text-xs text-[#888]">
              Verified Discord Owner ID: <code className="text-white font-mono">{PRIMARY_OWNER_ID}</code>. Use the whitelist below to authorize or remove staff members.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('whitelist')}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors"
            >
              + Whitelist People
            </button>
            <Link
              to="/owner"
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 transition-colors flex items-center gap-1.5"
            >
              <span>👑 Open Master Owner Panel</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Top Staff Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#141414] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#737373]">
              Staff Management Portal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] text-white border border-[#222]">
              {isOwner ? 'Bot Owner' : currentUser.role}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            obsess control panel
          </h1>
        </div>

        {/* User Session Bar */}
        <div className="flex items-center gap-3">
          {currentUser.avatarUrl && (
            <img
              src={currentUser.avatarUrl}
              alt=""
              className="w-8 h-8 rounded-full border border-[#2a2a2a] object-cover"
            />
          )}
          <div className="text-right text-xs">
            <div className="font-medium text-white flex items-center gap-1.5 justify-end">
              <span>{currentUser.displayName}</span>
              {currentUser.username && (
                <span className="text-[#666] font-mono text-[11px]">(@{currentUser.username})</span>
              )}
            </div>
            <div className="text-[10px] font-mono text-[#666]">ID: {currentUser.discordId}</div>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-[#888] hover:text-white bg-[#0e0e0e] hover:bg-[#171717] border border-[#1f1f1f] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Panel Navigation Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-[#141414] pb-3 text-xs">
        {isOwnerOrAdmin && (
          <button
            onClick={() => setActiveTab('whitelist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeTab === 'whitelist'
                ? 'bg-white text-black font-semibold'
                : 'text-[#888] hover:text-white hover:bg-[#111]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Whitelist People (Owner)</span>
            <span className="text-[10px] font-mono bg-[#222] text-white px-1.5 py-0.2 rounded">
              {staffList.length}
            </span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'generator'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Command Builder</span>
        </button>

        <button
          onClick={() => setActiveTab('runbooks')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'runbooks'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Incident Runbooks</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'templates'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Reason Templates</span>
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'appearance'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Card Designer</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'audit'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Audit Trail</span>
          <span className="text-[10px] font-mono bg-[#222] text-white px-1.5 py-0.2 rounded">
            {auditLogs.length}
          </span>
        </button>
      </div>

      {/* ========================================================
          TAB: WHITELIST PEOPLE (OWNER SPECIAL PANEL)
          ======================================================== */}
      {activeTab === 'whitelist' && isOwnerOrAdmin && (
        <div className="space-y-6">
          {/* Add Staff Form */}
          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-white" />
                <span>Whitelist Discord User ID</span>
              </h3>
              <p className="text-xs text-[#888]">
                Enter any person&apos;s Discord snowflake ID. Once added, logging in with Discord allows them to access the staff panel.
              </p>
            </div>

            <form onSubmit={handleAddStaff} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Discord User ID *</label>
                <input
                  type="text"
                  value={newDiscordId}
                  onChange={(e) => setNewDiscordId(e.target.value)}
                  placeholder="e.g. 987654321098765432"
                  className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono focus:outline-none focus:border-[#444]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Name / Nickname</label>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  placeholder="e.g. Moderator Alex"
                  className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white focus:outline-none focus:border-[#444]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Assigned Staff Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as StaffRole)}
                  className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white focus:outline-none focus:border-[#444]"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Senior Moderator">Senior Moderator</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Support">Support Staff</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Action</label>
                <button
                  type="submit"
                  className="w-full py-2 rounded font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors"
                >
                  Grant Staff Access
                </button>
              </div>
            </form>

            {whitelistMsg && (
              <div
                className={`p-2.5 rounded text-xs ${
                  whitelistMsg.type === 'success'
                    ? 'bg-[#0a140a] border border-[#153015] text-emerald-300'
                    : 'bg-[#140a0a] border border-[#301515] text-rose-300'
                }`}
              >
                {whitelistMsg.text}
              </div>
            )}
          </div>

          {/* Current Whitelisted People Table */}
          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Whitelisted Staff ({staffList.length})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#171717] text-[#555] font-mono text-[10px]">
                    <th className="py-2 px-2.5">Discord ID</th>
                    <th className="py-2 px-2.5">Display Name & Username</th>
                    <th className="py-2 px-2.5">Role</th>
                    <th className="py-2 px-2.5">Added Date</th>
                    <th className="py-2 px-2.5">Authorized By</th>
                    <th className="py-2 px-2.5 text-right">Revoke Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#121212]">
                  {staffList.map((m) => {
                    const isAccountOwner = m.discordId === PRIMARY_OWNER_ID || m.role === 'Owner';
                    return (
                      <tr key={m.discordId} className="hover:bg-[#0d0d0d]">
                        <td className="py-2.5 px-2.5 font-mono text-white">
                          <div className="flex items-center gap-1.5">
                            <span>{m.discordId}</span>
                            <button
                              onClick={() => copyToClipboard(m.discordId, `id-${m.discordId}`)}
                              className="text-[#555] hover:text-white"
                              title="Copy ID"
                            >
                              {copiedId === `id-${m.discordId}` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-2.5 px-2.5">
                          <div className="font-medium text-[#ededed] flex items-center gap-1.5">
                            <span>{m.displayName}</span>
                            {isAccountOwner && <span className="text-[10px] text-amber-400">👑</span>}
                          </div>
                          {m.username && (
                            <div className="text-[10px] font-mono text-[#666]">@{m.username}</div>
                          )}
                        </td>
                        <td className="py-2.5 px-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                              isAccountOwner
                                ? 'bg-white text-black font-semibold'
                                : m.role === 'Administrator'
                                ? 'bg-[#181818] text-[#e0e0e0] border border-[#2c2c2c]'
                                : 'bg-[#121212] text-[#888] border border-[#1f1f1f]'
                            }`}
                          >
                            {m.role}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 text-[#666] font-mono text-[11px]">{m.addedAt}</td>
                        <td className="py-2.5 px-2.5 text-[#666]">{m.addedBy}</td>
                        <td className="py-2.5 px-2.5 text-right">
                          {!isAccountOwner && m.discordId !== currentUser.discordId ? (
                            <button
                              onClick={() => handleRemoveStaff(m.discordId)}
                              className="p-1 rounded text-rose-400 hover:text-white hover:bg-rose-950/40 transition-colors"
                              title="Revoke access"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#444] italic">Root Owner</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: OVERVIEW
          ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#666]">Whitelisted Staff</span>
              <div className="text-2xl font-bold text-white font-mono">{staffList.length}</div>
              <p className="text-[11px] text-[#737373]">Active Discord user IDs on whitelist.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#666]">Command Tree</span>
              <div className="text-2xl font-bold text-white font-mono">150</div>
              <p className="text-[11px] text-[#737373]">Callable bot slash commands.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#666]">Database State</span>
              <div className="text-2xl font-bold text-white font-mono">aiosqlite</div>
              <p className="text-[11px] text-[#737373]">vanta.db local relational storage.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#666]">Your Status</span>
              <div className="text-2xl font-bold text-white font-mono">{isOwner ? 'Bot Owner' : currentUser.role}</div>
              <p className="text-[11px] text-[#737373]">Logged in as @{currentUser.username || 'wenpathy'}.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Emergency Action Shortcuts
            </h3>
            <p className="text-xs text-[#888]">
              Instant syntax copy for active server incidents:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded bg-[#000] border border-[#1a1a1a] space-y-1.5">
                <div className="text-white font-semibold">Lockdown Channel</div>
                <code className="text-[#a3a3a3] text-[11px] block">/channel lock reason: Raid</code>
                <button
                  onClick={() => copyToClipboard('/channel lock reason: Emergency raid containment', 'ov1')}
                  className="text-[11px] text-white hover:underline flex items-center gap-1 pt-1"
                >
                  {copiedTemplate === 'ov1' ? 'Copied!' : 'Copy command'}
                </button>
              </div>

              <div className="p-3 rounded bg-[#000] border border-[#1a1a1a] space-y-1.5">
                <div className="text-white font-semibold">Purge Bot Spam</div>
                <code className="text-[#a3a3a3] text-[11px] block">/messages purgebots limit: 50</code>
                <button
                  onClick={() => copyToClipboard('/messages purgebots limit: 50 reason: Bot spam wave', 'ov2')}
                  className="text-[11px] text-white hover:underline flex items-center gap-1 pt-1"
                >
                  {copiedTemplate === 'ov2' ? 'Copied!' : 'Copy command'}
                </button>
              </div>

              <div className="p-3 rounded bg-[#000] border border-[#1a1a1a] space-y-1.5">
                <div className="text-white font-semibold">Immediate Jail</div>
                <code className="text-[#a3a3a3] text-[11px] block">/jail member: @user reason: ...</code>
                <button
                  onClick={() => copyToClipboard('/jail member: @target reason: Severe guideline violation', 'ov3')}
                  className="text-[11px] text-white hover:underline flex items-center gap-1 pt-1"
                >
                  {copiedTemplate === 'ov3' ? 'Copied!' : 'Copy command'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: COMMAND BUILDER
          ======================================================== */}
      {activeTab === 'generator' && (
        <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Command Generator
            </h3>
            <p className="text-xs text-[#888]">
              Configure command arguments with exact syntax validation and copy straight to Discord.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {(['modrole', 'jail', 'timeout', 'purge', 'banid'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setGenCmdType(type)}
                className={`px-3 py-1.5 rounded font-mono transition-colors ${
                  genCmdType === type
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#121212] text-[#888] hover:text-white border border-[#222]'
                }`}
              >
                /{type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {genCmdType === 'modrole' && (
              <>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Target Role</label>
                  <input
                    type="text"
                    value={genRoleName}
                    onChange={(e) => setGenRoleName(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Bot-Side Permission Node</label>
                  <select
                    value={genPermission}
                    onChange={(e) => setGenPermission(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  >
                    {[
                      'warn', 'view_warnings', 'clear_warnings', 'ban', 'unban', 'kick',
                      'timeout', 'remove_timeout', 'purge', 'manage_channels', 'manage_nicknames',
                      'modlogs', 'say', 'poll', 'roleinfo', 'manage_roles', 'jail', 'voice_mod',
                      'manage_afk', 'notes',
                    ].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {genCmdType === 'jail' && (
              <>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Target Member</label>
                  <input
                    type="text"
                    value={genTarget}
                    onChange={(e) => setGenTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[#a3a3a3]">Reason</label>
                  <input
                    type="text"
                    value={genReason}
                    onChange={(e) => setGenReason(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white text-xs"
                  />
                </div>
              </>
            )}

            {genCmdType === 'timeout' && (
              <>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Target Member</label>
                  <input
                    type="text"
                    value={genTarget}
                    onChange={(e) => setGenTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={genDuration}
                    onChange={(e) => setGenDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Reason</label>
                  <input
                    type="text"
                    value={genReason}
                    onChange={(e) => setGenReason(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white text-xs"
                  />
                </div>
              </>
            )}

            {genCmdType === 'purge' && (
              <>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Filter Predicate</label>
                  <select
                    value={genPurgeType}
                    onChange={(e) => setGenPurgeType(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  >
                    <option value="purgebots">purgebots (Bot accounts only)</option>
                    <option value="purgelinks">purgelinks (HTTP/HTTPS links)</option>
                    <option value="purgeattachments">purgeattachments (Images/Files)</option>
                    <option value="purgeuser">purgeuser (Specific user)</option>
                    <option value="purgecontains">purgecontains (Query text)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Count Limit (1–100)</label>
                  <input
                    type="number"
                    value={genPurgeLimit}
                    onChange={(e) => setGenPurgeLimit(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Audit Reason</label>
                  <input
                    type="text"
                    value={genReason}
                    onChange={(e) => setGenReason(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white text-xs"
                  />
                </div>
              </>
            )}

            {genCmdType === 'banid' && (
              <>
                <div className="space-y-1">
                  <label className="text-[#a3a3a3]">Numeric Discord User ID</label>
                  <input
                    type="text"
                    value={genTarget}
                    onChange={(e) => setGenTarget(e.target.value)}
                    placeholder="e.g. 987654321098765432"
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[#a3a3a3]">Reason</label>
                  <input
                    type="text"
                    value={genReason}
                    onChange={(e) => setGenReason(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white text-xs"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#171717]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#737373]">
                Generated Slash Command
              </span>
              <button
                onClick={() => copyToClipboard(getGeneratedCommand(), 'cmd')}
                className="flex items-center gap-1 text-xs font-mono text-white hover:underline"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 rounded bg-[#000] border border-[#222] text-white font-mono text-xs select-all">
              {getGeneratedCommand()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: INCIDENT RUNBOOKS
          ======================================================== */}
      {activeTab === 'runbooks' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight">
              Protocol Alpha: Server Raid Containment
            </h3>
            <div className="space-y-3 text-xs text-[#888]">
              <div className="p-3 rounded bg-[#000] border border-[#1c1c1c] space-y-1">
                <span className="text-white font-semibold block">Step 1: Emergency Channel Blackout</span>
                <p>Run <code className="text-white font-mono">/channel lock reason: Raid containment</code> in active channels to immediately revoke Send Messages from @everyone.</p>
              </div>
              <div className="p-3 rounded bg-[#000] border border-[#1c1c1c] space-y-1">
                <span className="text-white font-semibold block">Step 2: Automated Chat Purge</span>
                <p>Run <code className="text-white font-mono">/messages purgebots limit: 100</code> or <code className="text-white font-mono">/messages purgelinks limit: 100</code> to wipe raid phishing and invite links.</p>
              </div>
              <div className="p-3 rounded bg-[#000] border border-[#1c1c1c] space-y-1">
                <span className="text-white font-semibold block">Step 3: Hackban Ringleaders</span>
                <p>Copy the numeric user IDs of raiders and run <code className="text-white font-mono">/mod banid text: [ID] reason: Raid account</code> to prevent them from rejoining.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight">
              Protocol Beta: Jail Disciplinary Procedure
            </h3>
            <div className="space-y-2 text-xs text-[#888]">
              <div>1. Run <code className="text-white font-mono">/jail member: @user reason: [Exact breach]</code>. All member roles are saved to SQLite and stripped.</div>
              <div>2. Prisoner is restricted to #jail. The bot anti-evasion listener watches <code className="text-white font-mono">on_member_join</code> in case they try to leave.</div>
              <div>3. Once disciplinary discussion concludes, run <code className="text-white font-mono">/unjail member: @user reason: Appeal approved</code> to restore previous roles.</div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: REASON TEMPLATES
          ======================================================== */}
      {activeTab === 'templates' && (
        <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white tracking-tight">
              Standard Moderation Reason Templates
            </h3>
            <p className="text-xs text-[#888]">
              Click any reason below to copy it formatted for use in slash command reasons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Harassment & Toxicity', text: 'Rule #1: Targetted harassment, personal attacks, or aggressive toxicity.' },
              { label: 'Spamming / Flooding', text: 'Rule #2: Excessive message spamming, character flooding, or emoji repetition.' },
              { label: 'Unauthorized Promotion', text: 'Rule #3: Unsolicited self-promotion or posting unapproved Discord invites.' },
              { label: 'NSFW Content', text: 'Rule #4: Posting inappropriate or sexually explicit content outside designated channels.' },
              { label: 'Staff Impersonation', text: 'Rule #5: Impersonating server moderators, administrators, or official bots.' },
              { label: 'Raid Participation', text: 'Rule #6: Participating in coordinated raiding, mass pinging, or griefing.' },
              { label: 'Severe Guideline Breach', text: 'Permanent Ban: Severe breach of Discord Terms of Service and Server Rules.' },
              { label: 'Cooldown Timeout', text: 'Disciplinary Cooldown: 60-minute timeout following verbal warnings.' },
            ].map((t) => (
              <div key={t.label} className="p-3 rounded bg-[#000] border border-[#1c1c1c] space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="font-semibold text-white block">{t.label}</span>
                  <p className="text-[#888] text-[11px] pt-1">{t.text}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(t.text, t.label)}
                  className="text-[11px] font-mono text-white hover:underline flex items-center gap-1 self-start pt-2"
                >
                  {copiedTemplate === t.label ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#666]" />
                      <span>Copy Reason</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: CARD DESIGNER
          ======================================================== */}
      {activeTab === 'appearance' && (
        <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white tracking-tight">
              Server Bot Appearance Card Configurator
            </h3>
            <p className="text-xs text-[#888]">
              Preview the embed identity card saved in SQLite <code className="text-[#d4d4d4] font-mono">guild_bot_appearance</code> table for /botappearance show.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#000] border border-[#1c1c1c] max-w-lg space-y-3 font-sans">
            <div className="border-l-4 border-white pl-3 space-y-1.5">
              <div className="text-xs font-bold text-white uppercase">
                obsess Server Identity Card
              </div>
              <p className="text-xs text-[#a3a3a3]">
                This is the custom embed appearance card configured for this server. (Does not modify bot global Discord account avatar/banner).
              </p>
              <div className="text-[11px] text-[#666] pt-1">
                Website: <span className="text-white underline">https://discord.gg/obsess</span>
              </div>
              <div className="text-[10px] text-[#555] pt-2 border-t border-[#1a1a1a]">
                Configured via /botappearance • Managed by Server Administrators
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB: AUDIT TRAIL
          ======================================================== */}
      {activeTab === 'audit' && (
        <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white tracking-tight">
                Website Access & Audit Trail
              </h3>
              <p className="text-xs text-[#888]">
                Real-time log of every user login, logout, usernames, and Discord User IDs.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              {['All', 'Login', 'Logout', 'Staff Added', 'Staff Removed'].map((action) => (
                <button
                  key={action}
                  onClick={() => setAuditFilter(action)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    auditFilter === action
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#121212] text-[#888] hover:text-white border border-[#222]'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#555] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Search by username, Discord ID, or details..."
              className="w-full pl-9 pr-3 py-2 rounded bg-[#000] border border-[#1f1f1f] text-white text-xs font-mono placeholder-[#555] focus:outline-none focus:border-[#444]"
            />
          </div>

          {/* Audit Logs List */}
          <div className="space-y-2 text-xs">
            {filteredAuditLogs.length > 0 ? (
              filteredAuditLogs.map((log) => {
                const getActionColor = () => {
                  switch (log.action) {
                    case 'Login':
                      return 'bg-[#121212] text-emerald-400 border-[#262626]';
                    case 'Logout':
                      return 'bg-[#121212] text-[#888] border-[#222]';
                    case 'Staff Added':
                      return 'bg-[#121212] text-blue-400 border-[#222]';
                    case 'Staff Removed':
                      return 'bg-[#121212] text-amber-400 border-[#222]';
                    default:
                      return 'bg-[#121212] text-white border-[#222]';
                  }
                };

                return (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-[#000] border border-[#171717] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-[#262626] transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getActionColor()}`}>
                          {log.action}
                        </span>

                        <span className="font-semibold text-white font-mono">
                          @{log.actorUsername}
                        </span>
                        <span className="text-[11px] font-mono text-[#737373] bg-[#0c0c0c] px-1.5 py-0.2 rounded border border-[#1c1c1c]">
                          ID: {log.actorId}
                        </span>
                        {log.actorDisplayName !== log.actorUsername && (
                          <span className="text-[11px] text-[#888]">({log.actorDisplayName})</span>
                        )}
                      </div>

                      <p className="text-xs text-[#a3a3a3] pl-0.5">{log.details}</p>
                    </div>

                    <div className="text-[11px] font-mono text-[#525252] shrink-0 self-start sm:self-center">
                      {log.timestamp}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-[#555] italic text-xs py-4 text-center">No audit log records match your filter.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
