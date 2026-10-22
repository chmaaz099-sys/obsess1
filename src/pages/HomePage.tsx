import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BOT_CONFIG } from '../config/bot';
import { MockDiscord } from '../components/MockDiscord';
import {
  ArrowRight,
  Activity,
  Server,
  Users,
  Shield,
  Lock,
  Terminal,
  Volume2,
  Play,
  Pause,
  ChevronDown,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrack = 'I Need A Doctor';

  const communities = [
    { initials: 'Se', name: 'Sezukie', members: '3.9K members' },
    { initials: 'Pe', name: 'Peaceful', members: '3.6K members' },
    { initials: 'Af', name: 'Afterlight', members: '3.5K members' },
    { initials: 'No', name: 'Northstar', members: '3.2K members' },
    { initials: 'Ve', name: 'Velvet', members: '2.8K members' },
    { initials: 'Lu', name: 'Lunar Club', members: '2.4K members' },
    { initials: 'Ec', name: 'Echo Room', members: '2.1K members' },
    { initials: 'Da', name: 'Daydream', members: '1.8K members' },
    { initials: 'St', name: 'Static', members: '1.5K members' },
  ];

  const socialLookups = [
    { name: 'Instagram', sub: 'Profiles', desc: 'Look up public accounts, bio, and follower stats.' },
    { name: 'TikTok', sub: 'Videos', desc: 'Search public profiles and trending clips.' },
    { name: 'Telegram', sub: 'Chats', desc: 'Search public channels, channels, and groups.' },
    { name: 'X / Twitter', sub: 'Posts', desc: 'Search public user feeds, tweets, and stats.' },
    { name: 'GitHub', sub: 'Repositories', desc: 'Look up developers, public repos, and stars.' },
    { name: 'Pinterest', sub: 'Boards', desc: 'Find aesthetic collections and pin inspirations.' },
    { name: 'Roblox', sub: 'Games', desc: 'Look up player profiles, badges, and games.' },
    { name: 'Spotify', sub: 'Music', desc: 'Inspect playlists, tracks, albums, and artists.' },
  ];

  return (
    <div className="w-full space-y-28 pb-20">
      {/* ========================================================
          HERO SECTION (Identical to appear.lol)
          ======================================================== */}
      <section className="relative pt-20 sm:pt-28 lg:pt-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
        {/* Subtle glow effect behind hero */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Bot Profile Picture Avatar with Subtle Glow */}
        <div className="relative inline-block mx-auto pt-2">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-white/20 via-white/5 to-white/20 rounded-full blur-md opacity-75" />
          <img
            src="/bot-pfp.jpg"
            alt="obsess bot avatar"
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white/20 shadow-2xl mx-auto"
          />
        </div>

        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0a0a] border border-[#1c1c1c] text-xs font-mono text-[#888]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Discord bot • server tools • automation</span>
        </div>

        {/* Hero Title: OBSESS (appear.lol typography) */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-white font-sans uppercase select-none">
            {BOT_CONFIG.botName}
          </h1>

          <p className="text-sm sm:text-base text-[#888888] max-w-xl mx-auto leading-relaxed">
            The all-in-one Discord bot for moderation, jail isolation, custom /modrole permissions, VoiceMaster, embeds, and server upkeep.
          </p>
        </div>

        {/* Stat Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-[#888]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080808] border border-[#171717]">
            <Users className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-bold">1,410,589</span>
            <span>users</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080808] border border-[#171717]">
            <Server className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-bold">1,554</span>
            <span>servers</span>
          </div>
          <Link
            to="/status"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#080808] border border-[#171717] hover:border-[#333] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 font-semibold">19ms latency</span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={BOT_CONFIG.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors flex items-center gap-2 shadow-lg hover:scale-[1.02] transform duration-150"
          >
            <span>Add to Discord</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <Link
            to="/commands"
            className="px-6 py-3 rounded-lg text-xs font-medium text-[#ededed] bg-[#0c0c0c] hover:bg-[#151515] border border-[#222222] transition-colors"
          >
            View Commands
          </Link>

          <Link
            to="/status"
            className="px-5 py-3 rounded-lg text-xs font-mono text-[#888] hover:text-white bg-[#080808] hover:bg-[#121212] border border-[#1c1c1c] transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Status</span>
          </Link>
        </div>

        {/* Scroll To Explore Indicator */}
        <div className="pt-10 flex flex-col items-center justify-center gap-2 text-[11px] font-mono text-[#555]">
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#666]" />
        </div>
      </section>

      {/* ========================================================
          TRUSTED BY COMMUNITIES (appear.lol style card wall)
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6 text-left">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#666]">
            Server Ecosystem
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Trusted by communities
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {communities.map((comm) => (
            <div
              key={comm.name}
              className="p-4 rounded-xl bg-[#080808] border border-[#171717] hover:border-[#2a2a2a] transition-all flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#121212] border border-[#222] flex items-center justify-center font-mono font-bold text-xs text-white">
                {comm.initials}
              </div>
              <div>
                <div className="font-semibold text-white text-xs sm:text-sm">{comm.name}</div>
                <div className="text-[11px] font-mono text-[#666]">{comm.members}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          BUILT FOR BUSY SERVERS: BENTO FEATURES (appear.lol style)
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 text-left">
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#666]">
            Engineered Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for busy servers
          </h2>
          <p className="text-xs text-[#888] max-w-xl leading-relaxed">
            A focused set of tools for moderation, jail isolation, VoiceMaster, custom modroles, embeds, and daily server upkeep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Card 1: Advanced Moderation & Jail Isolation */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#080808] border border-[#171717] space-y-4 hover:border-[#262626] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#242424] flex items-center justify-center text-white">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Jail Isolation & Safety Enclosures
              </h3>
              <p className="text-xs text-[#888] leading-relaxed">
                When a user is jailed via <code className="text-white font-mono">/jail</code>, obsess records their exact active roles in SQLite, strips their permissions, and isolates them to your designated jail channel. Upon <code className="text-white font-mono">/unjail</code>, every stripped role is restored automatically.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#000] border border-[#181818] font-mono text-[11px] text-[#aaa] space-y-1">
              <div>&gt; /jail member: @disruptive_user reason: Rule #1 infraction</div>
              <div className="text-emerald-400">&gt; Stripped 4 roles. Jailed in #jail-cell. Roles backed up to database.</div>
            </div>
          </div>

          {/* Card 2: Custom /modrole Engine */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#080808] border border-[#171717] space-y-4 hover:border-[#262626] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#242424] flex items-center justify-center text-white">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Granular /modrole System
              </h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Empower Jr. Moderators with commands like <code className="text-white font-mono">timeout</code> or <code className="text-white font-mono">jail</code> without giving them raw Discord server-wide administrator permissions.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#000] border border-[#181818] font-mono text-[11px] text-[#aaa]">
              <div>&gt; /modrole grant role: @TrialMod permission: jail</div>
              <div className="text-purple-300">&gt; Granted bot jail privilege to @TrialMod</div>
            </div>
          </div>

          {/* Card 3: VoiceMaster & Audio Channels */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#080808] border border-[#171717] space-y-4 hover:border-[#262626] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#242424] flex items-center justify-center text-white">
              <Volume2 className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                VoiceMaster & Room Controls
              </h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Automated dynamic temporary voice channels. Server members can lock, hide, rename, and set bitrate on their temporary rooms instantly.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#282828] text-xs font-mono text-white flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? 'Playing: ' + currentTrack : 'Preview Voice Wave'}</span>
              </button>
            </div>
          </div>

          {/* Card 4: Fast Purge & Message Filters */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#080808] border border-[#171717] space-y-4 hover:border-[#262626] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-[#242424] flex items-center justify-center text-white">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Specialized Message Purging
              </h3>
              <p className="text-xs text-[#888] leading-relaxed">
                Clean up channels without deleting human conversations. Clean strictly bot spam (<code className="text-white font-mono">/messages purgebots</code>), links (<code className="text-white font-mono">/messages purgelinks</code>), or specific user spam.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#000] border border-[#181818] font-mono text-[11px] text-[#aaa]">
              <div>&gt; /messages purgebots limit: 50</div>
              <div className="text-emerald-400">&gt; Purged 50 bot command replies in 0.4s</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SOCIAL LOOKUP & FEEDS GRID (appear.lol style)
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6 text-left">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#666]">
            Social Lookup Integrations
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Feeds, Media & Social Profiling
          </h2>
          <p className="text-xs text-[#888] max-w-xl">
            Quickly query public creator feeds, streams, code repositories, and user profiles right inside your Discord channels.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {socialLookups.map((s) => (
            <div
              key={s.name}
              className="p-4 rounded-xl bg-[#080808] border border-[#171717] hover:border-[#262626] transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{s.name}</span>
                <span className="text-[10px] font-mono text-[#666]">{s.sub}</span>
              </div>
              <p className="text-[11px] text-[#777] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE DISCORD PREVIEW
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 text-left">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#666]">
            Interactive Playground
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Test slash command execution
          </h2>
        </div>

        <MockDiscord />
      </section>

      {/* ========================================================
          READY TO ELEVATE (CTA BANNER from appear.lol)
          ======================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0c0c0c] to-[#040404] border border-[#222222] text-center space-y-6 shadow-2xl">
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to elevate your experience?
            </h2>
            <p className="text-xs sm:text-sm text-[#888] leading-relaxed">
              Join thousands of servers using obsess for seamless moderation, jail isolation, and server automation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BOT_CONFIG.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>Add to Discord</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/status"
              className="px-6 py-3 rounded-lg text-xs font-mono text-[#888] hover:text-white bg-[#0e0e0e] hover:bg-[#181818] border border-[#222] transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspect Status</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
