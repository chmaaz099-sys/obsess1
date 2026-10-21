import React, { useState, useMemo } from 'react';
import { BOT_COMMANDS } from '../data/commands';
import { CommandCard } from '../components/CommandCard';
import {
  Search,
  X,
  RotateCcw,
} from 'lucide-react';

export const CommandsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPermissionFilter, setSelectedPermissionFilter] = useState<string>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');

  const categories = [
    'All',
    'Core Moderation',
    'Role Management',
    'Jail System',
    'Custom Moderator Permissions',
    'Channel Management',
    'Message Purging',
    'Moderation Logs and Cases',
    'Member and User Info',
    'Bot Appearance',
    'General and Utility',
    'AFK Management',
  ];

  const filteredCommands = useMemo(() => {
    return BOT_COMMANDS.filter((cmd) => {
      if (selectedCategory !== 'All' && cmd.category !== selectedCategory) {
        return false;
      }

      if (selectedTypeFilter !== 'All' && cmd.commandType !== selectedTypeFilter) {
        return false;
      }

      if (selectedPermissionFilter !== 'All') {
        if (selectedPermissionFilter === 'bot-side' && cmd.permissionType !== 'bot-side') return false;
        if (selectedPermissionFilter === 'discord-admin' && cmd.permissionType !== 'discord-admin') return false;
        if (selectedPermissionFilter === 'none' && cmd.permissionType !== 'none') return false;
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesSyntax = cmd.syntax.toLowerCase().includes(query);
        const matchesName = cmd.name.toLowerCase().includes(query);
        const matchesDesc = cmd.description.toLowerCase().includes(query);
        const matchesGroup = cmd.group ? cmd.group.toLowerCase().includes(query) : false;
        const matchesPerm = cmd.requiredPermission ? cmd.requiredPermission.toLowerCase().includes(query) : false;
        const matchesArg = cmd.arguments
          ? cmd.arguments.some((a) => a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query))
          : false;

        return matchesSyntax || matchesName || matchesDesc || matchesGroup || matchesPerm || matchesArg;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedPermissionFilter, selectedTypeFilter]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPermissionFilter('All');
    setSelectedTypeFilter('All');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedPermissionFilter !== 'All' ||
    selectedTypeFilter !== 'All';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-2 max-w-2xl text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Commands
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
          Search every slash command and subcommand implemented in obsess. Filter by category, permission tier, or command structure.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="p-5 rounded-xl bg-[#080808] border border-[#171717] space-y-5">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands, arguments, or permissions..."
            className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-[#000000] border border-[#1f1f1f] text-white placeholder-[#555] focus:outline-none focus:border-[#444] transition-colors text-xs font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-[#101010] text-[#737373] hover:text-[#ededed] hover:bg-[#181818] border border-[#1a1a1a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#141414] text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#666] font-mono text-[11px]">Permission:</span>
              <select
                value={selectedPermissionFilter}
                onChange={(e) => setSelectedPermissionFilter(e.target.value)}
                className="bg-[#000] border border-[#1f1f1f] text-[#a3a3a3] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#333]"
              >
                <option value="All">All</option>
                <option value="bot-side">Bot-Side (/modrole)</option>
                <option value="discord-admin">Config Admin</option>
                <option value="none">Public</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#666] font-mono text-[11px]">Structure:</span>
              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value)}
                className="bg-[#000] border border-[#1f1f1f] text-[#a3a3a3] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#333]"
              >
                <option value="All">All</option>
                <option value="top-level">Top-level</option>
                <option value="grouped-subcommand">Grouped</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#737373] font-mono text-xs">
              <strong className="text-white">{filteredCommands.length}</strong> of{' '}
              <strong className="text-white">{BOT_COMMANDS.length}</strong> commands
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-2 py-1 rounded text-[#888] hover:text-white bg-[#141414] border border-[#222] transition-colors font-mono text-xs"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Command List Output */}
      {filteredCommands.length > 0 ? (
        <div className="space-y-3">
          {filteredCommands.map((command) => (
            <CommandCard key={command.id} command={command} />
          ))}
        </div>
      ) : (
        <div className="text-center py-14 rounded-xl bg-[#080808] border border-[#171717] p-8 space-y-3">
          <p className="text-sm font-semibold text-white">No commands matched your filter</p>
          <p className="text-xs text-[#737373]">
            Adjust your search query or reset filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-3.5 py-1.5 rounded text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
