import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BOT_FEATURES } from '../data/features';
import { RoleHierarchyVisual } from '../components/RoleHierarchyVisual';
import {
  ShieldAlert,
  UserCheck,
  Lock,
  KeyRound,
  Hash,
  Sparkles,
  FileText,
  MicOff,
  Palette,
  ShieldCheck,
  Check,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  ShieldAlert,
  UserCheck,
  Lock,
  KeyRound,
  Hash,
  Sparkles,
  FileText,
  MicOff,
  Palette,
  ShieldCheck,
};

export const FeaturesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-2 max-w-2xl text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Features
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
          Detailed technical documentation of each subsystem implemented in obsess.
        </p>
      </div>

      {/* Role Hierarchy Visual */}
      <section className="space-y-4">
        <RoleHierarchyVisual />
      </section>

      {/* Features List */}
      <div className="space-y-10">
        {BOT_FEATURES.map((feature, idx) => {
          const Icon = iconMap[feature.iconName] || ShieldAlert;
          return (
            <section
              key={feature.id}
              id={feature.id}
              className="scroll-mt-24 p-6 sm:p-8 rounded-xl bg-[#080808] border border-[#171717] space-y-6 text-left"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-[#141414] pb-6">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#121212] border border-[#222] text-[#d4d4d4]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">
                        #{idx + 1} • {feature.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {feature.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#8e8e8e] leading-relaxed pt-1">
                    {feature.fullDescription}
                  </p>
                </div>

                {/* Commands Used */}
                <div className="p-3.5 rounded-lg bg-[#000] border border-[#171717] space-y-2 shrink-0 lg:w-64">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#525252] font-medium block">
                    Commands
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {feature.commandsUsed.map((cmd) => (
                      <code
                        key={cmd}
                        className="text-[11px] font-mono bg-[#0f0f0f] text-[#bbb] px-2 py-0.5 rounded border border-[#1c1c1c]"
                      >
                        {cmd}
                      </code>
                    ))}
                  </div>
                  <Link
                    to="/commands"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#888] hover:text-white pt-1.5"
                  >
                    <span>Command directory</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Capabilities & Safety */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Technical Capabilities</span>
                  </h4>
                  <ul className="space-y-2">
                    {feature.keyCapabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#888] leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-[#555] mt-1.5 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-[#888]" />
                    <span>Enforced Guardrails</span>
                  </h4>
                  <ul className="space-y-2">
                    {feature.safetyChecks.map((check, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#888] leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-[#555] mt-1.5 shrink-0" />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
