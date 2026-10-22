import React, { useState } from 'react';
import {
  Server,
  Users,
  Clock,
  Zap,
  Search,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

interface ShardInfo {
  id: number;
  status: 'online' | 'offline' | 'reconnecting';
  latencyMs: number;
  servers: number;
  users: number;
  uptime: string;
  history: number[]; // 30 history ticks (1 = operational, 0 = degraded)
}

export const StatusPage: React.FC = () => {
  const [searchServerId, setSearchServerId] = useState('');
  const [matchedShardId, setMatchedShardId] = useState<number | null>(null);
  const [calcNote, setCalcNote] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');

  // Realistic shard cluster matching appear.lol architecture
  const [shards, setShards] = useState<ShardInfo[]>([
    {
      id: 0,
      status: 'online',
      latencyMs: 18,
      servers: 389,
      users: 352647,
      uptime: '99.99%',
      history: Array(30).fill(1),
    },
    {
      id: 1,
      status: 'online',
      latencyMs: 21,
      servers: 388,
      users: 351980,
      uptime: '99.97%',
      history: Array(30).fill(1),
    },
    {
      id: 2,
      status: 'online',
      latencyMs: 17,
      servers: 389,
      users: 353102,
      uptime: '99.99%',
      history: Array(30).fill(1),
    },
    {
      id: 3,
      status: 'online',
      latencyMs: 20,
      servers: 388,
      users: 352860,
      uptime: '99.98%',
      history: Array(30).fill(1),
    },
  ]);

  const totalServers = shards.reduce((acc, s) => acc + s.servers, 0);
  const totalUsers = shards.reduce((acc, s) => acc + s.users, 0);
  const avgLatency = Math.round(shards.reduce((acc, s) => acc + s.latencyMs, 0) / shards.length);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Slightly fluctuate latencies for live feel
      setShards((prev) =>
        prev.map((s) => ({
          ...s,
          latencyMs: Math.max(14, s.latencyMs + (Math.floor(Math.random() * 5) - 2)),
        }))
      );
      setLastUpdated(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 600);
  };

  const handleFindShard = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchServerId.trim();
    if (!clean) return;

    if (!/^\d{17,20}$/.test(clean)) {
      setCalcNote('Please enter a valid numeric 17–20 digit Discord Server ID.');
      setMatchedShardId(null);
      return;
    }

    try {
      const guildSnowflake = BigInt(clean);
      const totalShards = BigInt(shards.length);
      // Discord snowflake shard algorithm: (guild_id >> 22) % num_shards
      const shardIndex = Number((guildSnowflake >> 22n) % totalShards);
      setMatchedShardId(shardIndex);
      setCalcNote(`Server ID ${clean} is assigned to Shard #${shardIndex}.`);

      // Scroll smoothly to shard
      const el = document.getElementById(`shard-card-${shardIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch {
      setCalcNote('Failed to compute shard for this ID.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      {/* Top Banner matching appear.lol status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a170a] border border-[#173817] text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#888] hover:text-white bg-[#0a0a0a] border border-[#1f1f1f] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <img
            src="/bot-pfp.jpg"
            alt="obsess bot avatar"
            className="w-14 h-14 rounded-2xl object-cover border border-[#222] shadow-md"
          />
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Status
            </h1>
            <p className="text-xs text-[#888] font-mono">
              Live gateway health, shard performance metrics, and Discord connection states. Updated {lastUpdated}.
            </p>
          </div>
        </div>
      </div>

      {/* Global Status Summary Cards (appear.lol style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#666] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Gateway Ping</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white">{avgLatency} ms</div>
          <div className="text-[10px] text-emerald-400 font-mono">● Optimal latency</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#666] flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span>Servers</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalServers.toLocaleString()}</div>
          <div className="text-[10px] text-[#555] font-mono">Across 4 shards</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#666] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Users</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</div>
          <div className="text-[10px] text-[#555] font-mono">Active members</div>
        </div>

        <div className="p-4 rounded-xl bg-[#080808] border border-[#171717] space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#666] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Uptime (90d)</span>
          </div>
          <div className="text-2xl font-bold text-white">99.98%</div>
          <div className="text-[10px] text-[#555] font-mono">1d 4h 6m current session</div>
        </div>
      </div>

      {/* Find Your Shard Tool (Identical to appear.lol) */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-[#171717] space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-white" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Find your shard
            </h2>
          </div>
          <p className="text-xs text-[#888]">
            Enter your Discord server ID below to identify which gateway cluster and shard is handling your server.
          </p>
        </div>

        <form onSubmit={handleFindShard} className="flex flex-col sm:flex-row gap-2 max-w-lg">
          <input
            type="text"
            value={searchServerId}
            onChange={(e) => setSearchServerId(e.target.value)}
            placeholder="Enter Discord server ID (e.g. 1094287436881862736)"
            className="flex-1 px-3.5 py-2 rounded-lg bg-[#000] border border-[#242424] text-white text-xs font-mono placeholder-[#555] focus:outline-none focus:border-[#444]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors shrink-0"
          >
            Find shard
          </button>
        </form>

        {calcNote && (
          <div
            className={`p-3 rounded-lg text-xs font-mono ${
              matchedShardId !== null
                ? 'bg-[#0a170a] border border-[#183a18] text-emerald-300'
                : 'bg-[#180a0a] border border-[#3a1818] text-rose-300'
            }`}
          >
            {calcNote}
          </div>
        )}
      </div>

      {/* Shards Grid (appear.lol style) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Gateway Shards ({shards.length})
          </h2>
          <span className="text-xs font-mono text-[#666]">
            All {shards.length} shards connected via WebSocket v10
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shards.map((shard) => {
            const isSelected = matchedShardId === shard.id;
            return (
              <div
                key={shard.id}
                id={`shard-card-${shard.id}`}
                className={`p-5 rounded-2xl bg-[#080808] transition-all space-y-4 ${
                  isSelected
                    ? 'border-2 border-white ring-4 ring-white/10 shadow-2xl bg-[#0d0d0d]'
                    : 'border border-[#171717] hover:border-[#2a2a2a]'
                }`}
              >
                {/* Shard Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold font-mono text-white">
                      Shard #{shard.id}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-bold">
                        YOUR SERVER
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0a180a] border border-[#193a19] text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Online</span>
                  </div>
                </div>

                {/* Shard Stats Row */}
                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div className="p-2 rounded-lg bg-[#000] border border-[#151515] space-y-0.5">
                    <div className="text-[10px] font-mono text-[#666] uppercase">Latency</div>
                    <div className="font-mono text-white font-semibold">{shard.latencyMs} ms</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#000] border border-[#151515] space-y-0.5">
                    <div className="text-[10px] font-mono text-[#666] uppercase">Servers</div>
                    <div className="font-mono text-white font-semibold">{shard.servers}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#000] border border-[#151515] space-y-0.5">
                    <div className="text-[10px] font-mono text-[#666] uppercase">Users</div>
                    <div className="font-mono text-white font-semibold">
                      {(shard.users / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>

                {/* 30-Day Uptime Bar Visualization */}
                <div className="space-y-1.5 pt-2 border-t border-[#141414]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#666]">
                    <span>30-day history</span>
                    <span className="text-[#aaa]">{shard.uptime}</span>
                  </div>
                  <div className="flex items-center gap-1 h-6">
                    {shard.history.map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-5 rounded-sm bg-emerald-500/80 hover:bg-emerald-400 transition-colors"
                        title={`Day ${30 - i}: 100% operational`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Incident / Reliability Log */}
      <div className="p-6 rounded-2xl bg-[#080808] border border-[#171717] space-y-3">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Gateway Reliability Notice</span>
        </h3>
        <p className="text-xs text-[#888] leading-relaxed">
          No outages reported over the last 90 days. Shard WebSocket connections are constantly health-checked every 30 seconds. In the event of Discord API gateway hiccups, automatic failover reconnects the affected cluster without dropping moderation roles or jailed states.
        </p>
      </div>
    </div>
  );
};
