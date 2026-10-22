import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { staffAuthService, PRIMARY_OWNER_ID } from '../services/staffAuth';
import type { StaffMember, StaffRole, StaffAuditLog } from '../services/staffAuth';
import { useAuth } from '../context/AuthContext';
import { BOT_CONFIG } from '../config/bot';
import {
  Crown,
  Shield,
  ShieldAlert,
  UserPlus,
  Trash2,
  Copy,
  Check,
  Search,
  ArrowRight,
  ExternalLink,
  History,
  Database,
  Sliders,
  Users,
  LogOut,
} from 'lucide-react';

export const OwnerPage: React.FC = () => {
  const { currentUser, loginWithDiscord, logout, isVerifying } = useAuth();

  // Active tab in the Owner Panel
  const [activeTab, setActiveTab] = useState<'whitelist' | 'config' | 'database' | 'audit'>('whitelist');

  // Whitelist state
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [newDiscordId, setNewDiscordId] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newRole, setNewRole] = useState<StaffRole>('Moderator');
  const [newNotes, setNewNotes] = useState('');
  const [whitelistMsg, setWhitelistMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Audit state
  const [auditLogs, setAuditLogs] = useState<StaffAuditLog[]>([]);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditFilter, setAuditFilter] = useState<string>('All');

  // Verification that current user is the owner
  const isOwner = currentUser ? staffAuthService.isOwner(currentUser.discordId) : false;

  useEffect(() => {
    setStaffList(staffAuthService.getStaffList());
    setAuditLogs(staffAuthService.getAuditLogs());
  }, [currentUser]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setWhitelistMsg(null);

    const res = staffAuthService.addStaffMember(
      {
        discordId: newDiscordId.trim(),
        displayName: newDisplayName.trim() || `Staff-${newDiscordId.slice(-4)}`,
        role: newRole,
        notes: newNotes.trim() || undefined,
      },
      currentUser
    );

    if (res.success) {
      setWhitelistMsg({
        type: 'success',
        text: `Successfully whitelisted Discord User ID ${newDiscordId} as ${newRole}. They can now sign in with Discord and access the staff panel!`,
      });
      setStaffList(staffAuthService.getStaffList());
      setAuditLogs(staffAuthService.getAuditLogs());
      setNewDiscordId('');
      setNewDisplayName('');
      setNewNotes('');
    } else {
      setWhitelistMsg({ type: 'error', text: res.error || 'Failed to authorize Discord ID.' });
    }
  };

  const handleRemoveStaff = (targetId: string) => {
    if (!currentUser) return;
    if (confirm(`Revoke staff panel authorization for Discord ID ${targetId}?`)) {
      const res = staffAuthService.removeStaffMember(targetId, currentUser);
      if (res.success) {
        setStaffList(staffAuthService.getStaffList());
        setAuditLogs(staffAuthService.getAuditLogs());
        setWhitelistMsg({ type: 'success', text: `Revoked authorization for Discord ID ${targetId}.` });
      } else {
        setWhitelistMsg({ type: 'error', text: res.error || 'Failed to revoke authorization.' });
      }
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111] border border-[#222] text-xs font-mono text-amber-400">
              <Crown className="w-3.5 h-3.5" />
              <span>Owner Command Center</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Sign in to Owner Panel
            </h1>
            <p className="text-xs text-[#888888] leading-relaxed max-w-sm mx-auto">
              This panel provides root owner authority to whitelist Discord User IDs and manage bot infrastructure.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            {isVerifying ? (
              <div className="py-8 space-y-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#ededed] font-medium">Verifying Discord OAuth session...</p>
              </div>
            ) : (
              <>
                <button
                  onClick={() => loginWithDiscord('/owner')}
                  className="w-full py-3 px-4 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Login with Discord</span>
                </button>

                <div className="pt-2 border-t border-[#141414] text-[11px] text-[#666] text-left">
                  Configured Owner ID: <code className="text-white font-mono">{PRIMARY_OWNER_ID}</code> (Frosty).
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGGED IN AS NON-OWNER (ACCESS DENIED)
  // ==========================================
  if (!isOwner) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="w-full max-w-md p-7 rounded-2xl bg-[#080808] border border-[#2a1313] space-y-5 text-left">
          <div className="flex items-center gap-3 border-b border-[#181010] pb-4">
            <div className="w-10 h-10 rounded-full bg-[#1f0e0e] border border-[#401a1a] flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white">{currentUser.displayName}</div>
              <div className="text-xs text-[#737373] font-mono">@{currentUser.username} • ID: {currentUser.discordId}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1a0e0e] text-rose-300 border border-[#381616] text-xs font-mono">
              <span>Owner Access Restricted</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Root Authority Required
            </h2>
            <p className="text-xs text-[#888] leading-relaxed">
              This special panel is strictly restricted to the bot owner Frosty (<code className="text-white font-mono">{PRIMARY_OWNER_ID}</code>).
            </p>
            <p className="text-xs text-[#666] leading-relaxed">
              Your account has the role <strong className="text-white">{currentUser.role}</strong>. If you are an authorized moderator, use the Staff Moderation Portal.
            </p>
          </div>

          <div className="pt-3 border-t border-[#181010] flex items-center justify-between">
            <button
              onClick={() => logout()}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium"
            >
              Sign Out
            </button>
            <Link
              to="/staff"
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors flex items-center gap-1"
            >
              <span>Go to Staff Panel</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: AUTHENTICATED OWNER (FROSTY)
  // ==========================================
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Top Owner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c0c0c] to-[#050505] border border-[#222222] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-300" />
              <span>SPECIAL BOT OWNER PANEL</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-bold">
              ROOT AUTHORITY
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome, Frosty (@{currentUser.username || 'wenpathy'})
          </h1>
          <p className="text-xs text-[#888888] max-w-2xl leading-relaxed">
            You hold master ownership over obsess. Use this panel to authorize Discord User IDs for the staff panel, inspect bot infrastructure, view database schemas, and monitor user logins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/staff"
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#ededed] bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Staff Moderation Tools</span>
          </Link>
          <button
            onClick={() => logout()}
            className="px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:text-white bg-[#140b0b] hover:bg-rose-950/40 border border-[#2b1212] transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Owner KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#666] flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>Primary Owner ID</span>
          </div>
          <div className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <span>{PRIMARY_OWNER_ID}</span>
            <button
              onClick={() => copyToClipboard(PRIMARY_OWNER_ID, 'owner-id')}
              className="text-[#666] hover:text-white"
            >
              {copiedId === 'owner-id' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <div className="text-[10px] text-[#555]">Frosty / @wenpathy</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#666] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Whitelisted Staff</span>
          </div>
          <div className="text-xl font-bold text-white">{staffList.length}</div>
          <div className="text-[10px] text-[#555]">Authorized Discord Users</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#666] flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Application Client ID</span>
          </div>
          <div className="text-sm font-bold font-mono text-white flex items-center gap-2">
            <span>{BOT_CONFIG.clientId}</span>
            <button
              onClick={() => copyToClipboard(BOT_CONFIG.clientId, 'client-id')}
              className="text-[#666] hover:text-white"
            >
              {copiedId === 'client-id' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <div className="text-[10px] text-[#555]">obsess Discord Bot</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase text-[#666] flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Trail Entries</span>
          </div>
          <div className="text-xl font-bold text-white">{auditLogs.length}</div>
          <div className="text-[10px] text-[#555]">Logins, logouts & actions</div>
        </div>
      </div>

      {/* Owner Navigation Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-[#141414] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('whitelist')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'whitelist'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Whitelist & Staff Roles</span>
          <span className="text-[10px] font-mono bg-[#222] text-white px-1.5 py-0.2 rounded">
            {staffList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'config'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Bot Configuration</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
            activeTab === 'database'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white hover:bg-[#111]'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Bot Database Architecture</span>
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
          <span>Audit Trail & Logins</span>
          <span className="text-[10px] font-mono bg-[#222] text-white px-1.5 py-0.2 rounded">
            {auditLogs.length}
          </span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: WHITELIST & STAFF ROLES
          ======================================================== */}
      {activeTab === 'whitelist' && (
        <div className="space-y-6">
          {/* Whitelist Addition Form */}
          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-amber-300" />
                <span>Authorize New Staff Member (By Discord User ID)</span>
              </h3>
              <p className="text-xs text-[#888]">
                Add any person&apos;s Discord snowflake ID below. As soon as you add them, they will be able to log in with their Discord account and access the staff panel according to their assigned role.
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
                  <option value="Administrator">Administrator (Full Bot Admin)</option>
                  <option value="Senior Moderator">Senior Moderator (Jail, Ban, Purge)</option>
                  <option value="Moderator">Moderator (Warn, Mute, Timeout)</option>
                  <option value="Support">Support Staff (Ticket & Info)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Action</label>
                <button
                  type="submit"
                  className="w-full py-2 rounded font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors"
                >
                  Whitelist User ID
                </button>
              </div>
            </form>

            {whitelistMsg && (
              <div
                className={`p-3 rounded text-xs leading-relaxed ${
                  whitelistMsg.type === 'success'
                    ? 'bg-[#0a140a] border border-[#153015] text-emerald-300'
                    : 'bg-[#140a0a] border border-[#301515] text-rose-300'
                }`}
              >
                {whitelistMsg.text}
              </div>
            )}
          </div>

          {/* Active Whitelisted Members Table */}
          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Authorized Whitelist ({staffList.length} members)
                </h3>
                <p className="text-[11px] text-[#666]">
                  These Discord users are authorized to access the staff portal.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#171717] text-[#555] font-mono text-[10px]">
                    <th className="py-2.5 px-3">Discord ID</th>
                    <th className="py-2.5 px-3">Display Name & Username</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Added Date</th>
                    <th className="py-2.5 px-3">Authorized By</th>
                    <th className="py-2.5 px-3 text-right">Revoke Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#121212]">
                  {staffList.map((m) => {
                    const isAccountOwner = m.discordId === PRIMARY_OWNER_ID || m.role === 'Owner';
                    return (
                      <tr key={m.discordId} className="hover:bg-[#0d0d0d] transition-colors">
                        <td className="py-3 px-3 font-mono text-white">
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
                        <td className="py-3 px-3">
                          <div className="font-medium text-[#ededed] flex items-center gap-1.5">
                            <span>{m.displayName}</span>
                            {isAccountOwner && <span className="text-[11px] text-amber-300">👑</span>}
                          </div>
                          {m.username && (
                            <div className="text-[10px] font-mono text-[#666]">@{m.username}</div>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                              isAccountOwner
                                ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                                : m.role === 'Administrator'
                                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                                : m.role === 'Senior Moderator'
                                ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                                : 'bg-[#181818] text-[#aaa] border border-[#262626]'
                            }`}
                          >
                            {m.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-[#777]">{m.addedAt}</td>
                        <td className="py-3 px-3 font-mono text-[11px] text-[#777]">{m.addedBy}</td>
                        <td className="py-3 px-3 text-right">
                          {isAccountOwner ? (
                            <span className="text-[10px] font-mono text-amber-400/60 uppercase">Permanent</span>
                          ) : (
                            <button
                              onClick={() => handleRemoveStaff(m.discordId)}
                              className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-[#1f0d0d] transition-colors"
                              title="Revoke access"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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
          TAB 2: BOT CONFIGURATION & SETTINGS
          ======================================================== */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Sliders className="w-4 h-4 text-white" />
              <span>Core Application Settings</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-lg bg-[#000] border border-[#1a1a1a] flex items-center gap-4">
                <img
                  src="/bot-pfp.jpg"
                  alt="obsess bot avatar"
                  className="w-14 h-14 rounded-2xl object-cover border border-[#2a2a2a]"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">obsess</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#5865F2] text-white font-semibold">BOT</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#888]">ID: {BOT_CONFIG.clientId}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">● Active Production Avatar</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#666]">Discord Application Client ID</div>
                <div className="font-mono text-white text-sm flex items-center justify-between">
                  <span>{BOT_CONFIG.clientId}</span>
                  <button
                    onClick={() => copyToClipboard(BOT_CONFIG.clientId, 'cfg-id')}
                    className="text-[#666] hover:text-white"
                  >
                    {copiedId === 'cfg-id' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#666]">Bot OAuth2 Invitation Link</div>
                <div className="font-mono text-white text-[11px] truncate">{BOT_CONFIG.inviteUrl}</div>
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={BOT_CONFIG.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-[#161616] hover:bg-[#222] text-[#ededed] text-[11px] flex items-center gap-1"
                  >
                    <span>Test Invite</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => copyToClipboard(BOT_CONFIG.inviteUrl, 'cfg-invite')}
                    className="px-2.5 py-1 rounded bg-[#161616] hover:bg-[#222] text-[#ededed] text-[11px]"
                  >
                    {copiedId === 'cfg-invite' ? 'Copied' : 'Copy Link'}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#666]">Official Support Discord</div>
                <div className="font-mono text-white text-sm">{BOT_CONFIG.supportServerUrl}</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-300" />
              <span>Root Owner Identity</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#666]">Primary Owner Snowflake</div>
                <div className="font-mono text-amber-300 text-sm">{PRIMARY_OWNER_ID}</div>
                <div className="text-[10px] text-[#666]">Hardcoded root authority for Frosty / @wenpathy</div>
              </div>

              <div className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#666]">Source of Truth</div>
                <div className="font-mono text-white text-xs">obsess_bot(2).py (Python Discord.py Source)</div>
                <div className="text-[10px] text-[#666]">150 callable commands documented and registered</div>
              </div>

              <div className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#666]">OAuth2 Grant Type</div>
                <div className="font-mono text-white text-xs">Implicit Grant (response_type=token, scope=identify)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: DATABASE ARCHITECTURE
          ======================================================== */}
      {activeTab === 'database' && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-2">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Database className="w-4 h-4 text-white" />
              <span>Bot SQLite Database Schema (From obsess_bot(2).py)</span>
            </h3>
            <p className="text-xs text-[#888]">
              This schema reflects the database tables created and queried in the bot source code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-2">
              <div className="font-mono font-bold text-white flex items-center justify-between">
                <span>TABLE: modroles</span>
                <span className="text-[10px] text-purple-400 font-normal">Permissions</span>
              </div>
              <p className="text-[11px] text-[#888]">Stores custom bot-side moderation permission grants per role.</p>
              <div className="p-2.5 rounded bg-[#000] font-mono text-[10px] text-[#aaa] space-y-0.5">
                <div>• guild_id INTEGER</div>
                <div>• role_id INTEGER</div>
                <div>• permission TEXT (e.g. jail, ban, mute)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-2">
              <div className="font-mono font-bold text-white flex items-center justify-between">
                <span>TABLE: jail_setup</span>
                <span className="text-[10px] text-amber-400 font-normal">Jail System</span>
              </div>
              <p className="text-[11px] text-[#888]">Configures the designated jail role and channel per server.</p>
              <div className="p-2.5 rounded bg-[#000] font-mono text-[10px] text-[#aaa] space-y-0.5">
                <div>• guild_id INTEGER PRIMARY KEY</div>
                <div>• jail_role_id INTEGER</div>
                <div>• jail_channel_id INTEGER</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-2">
              <div className="font-mono font-bold text-white flex items-center justify-between">
                <span>TABLE: jail_members</span>
                <span className="text-[10px] text-amber-400 font-normal">Saved Roles</span>
              </div>
              <p className="text-[11px] text-[#888]">Preserves stripped roles to restore them upon unjailing.</p>
              <div className="p-2.5 rounded bg-[#000] font-mono text-[10px] text-[#aaa] space-y-0.5">
                <div>• guild_id INTEGER</div>
                <div>• user_id INTEGER</div>
                <div>• saved_roles TEXT (JSON array of role IDs)</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-2">
              <div className="font-mono font-bold text-white flex items-center justify-between">
                <span>TABLE: cases</span>
                <span className="text-[10px] text-blue-400 font-normal">Moderation Logs</span>
              </div>
              <p className="text-[11px] text-[#888]">Records every disciplinary action taken by staff.</p>
              <div className="p-2.5 rounded bg-[#000] font-mono text-[10px] text-[#aaa] space-y-0.5">
                <div>• case_id INTEGER</div>
                <div>• guild_id INTEGER</div>
                <div>• target_id INTEGER</div>
                <div>• moderator_id INTEGER</div>
                <div>• action TEXT, reason TEXT, timestamp TEXT</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-2">
              <div className="font-mono font-bold text-white flex items-center justify-between">
                <span>TABLE: botappearance</span>
                <span className="text-[10px] text-emerald-400 font-normal">Appearance</span>
              </div>
              <p className="text-[11px] text-[#888]">Per-server appearance card customizations stored in SQLite.</p>
              <div className="p-2.5 rounded bg-[#000] font-mono text-[10px] text-[#aaa] space-y-0.5">
                <div>• guild_id INTEGER PRIMARY KEY</div>
                <div>• custom_name TEXT</div>
                <div>• avatar_url TEXT, banner_url TEXT</div>
                <div>• embed_color TEXT</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-2">
              <div className="font-mono font-bold text-white flex items-center justify-between">
                <span>TABLE: afk_users</span>
                <span className="text-[10px] text-[#888] font-normal">AFK Status</span>
              </div>
              <p className="text-[11px] text-[#888]">Stores AFK states from manual AFK slash commands.</p>
              <div className="p-2.5 rounded bg-[#000] font-mono text-[10px] text-[#aaa] space-y-0.5">
                <div>• user_id INTEGER PRIMARY KEY</div>
                <div>• reason TEXT</div>
                <div>• timestamp TEXT</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: AUDIT TRAIL & LOGINS
          ======================================================== */}
      {activeTab === 'audit' && (
        <div className="p-6 rounded-xl bg-[#080808] border border-[#171717] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <History className="w-4 h-4 text-white" />
                <span>Global Audit & Security Trail</span>
              </h3>
              <p className="text-xs text-[#888]">
                Every single login, logout, whitelist addition, and removal is recorded with usernames and Discord IDs.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#555] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  placeholder="Search user or ID..."
                  className="pl-8 pr-3 py-1.5 rounded bg-[#000] border border-[#222] text-white text-xs focus:outline-none focus:border-[#444] w-40 sm:w-52"
                />
              </div>

              <select
                value={auditFilter}
                onChange={(e) => setAuditFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded bg-[#000] border border-[#222] text-white text-xs focus:outline-none focus:border-[#444]"
              >
                <option value="All">All Actions</option>
                <option value="Login">Logins</option>
                <option value="Logout">Logouts</option>
                <option value="Staff Added">Staff Added</option>
                <option value="Staff Removed">Staff Removed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#171717] text-[#555] font-mono text-[10px]">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Actor (@Username & ID)</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#121212]">
                {filteredAuditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[#666] font-mono text-xs">
                      No audit log entries recorded yet.
                    </td>
                  </tr>
                ) : (
                  filteredAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#0d0d0d] transition-colors">
                      <td className="py-3 px-3 font-mono text-[11px] text-[#777] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            log.action === 'Login'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : log.action === 'Logout'
                              ? 'bg-[#181818] text-[#888] border border-[#262626]'
                              : log.action === 'Staff Added'
                              ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-white">{log.actorDisplayName}</div>
                        <div className="text-[10px] font-mono text-[#666]">
                          @{log.actorUsername} • {log.actorId}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#aaa]">
                        {log.details}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
