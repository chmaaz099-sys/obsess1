import { useState, useEffect } from 'react';
import type { BotStatus } from '../types';
import { ShieldCheck } from 'lucide-react';

export const BotStatusBadge: React.FC = () => {
  const [status, setStatus] = useState<BotStatus>({
    status: 'unconfigured',
    label: 'Live telemetry not configured',
  });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const apiEndpoint = import.meta.env.VITE_BOT_STATUS_API;
    if (!apiEndpoint) {
      setStatus({
        status: 'unconfigured',
        label: 'Live telemetry not configured',
      });
      return;
    }

    const fetchStatus = async () => {
      try {
        const res = await fetch(apiEndpoint);
        if (res.ok) {
          const data = await res.json();
          setStatus({
            status: data.status || 'online',
            label: data.label || 'Bot Active',
            latencyMs: data.latency,
            guildCount: data.guilds,
            lastChecked: new Date().toLocaleTimeString(),
          });
        } else {
          setStatus({
            status: 'offline',
            label: 'Telemetry offline',
          });
        }
      } catch {
        setStatus({
          status: 'offline',
          label: 'Status unavailable',
        });
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0a0a0a] border border-[#1f1f1f] text-[11px] font-mono text-[#888] cursor-help hover:border-[#333] transition-colors"
      >
        <span className="relative flex h-1.5 w-1.5">
          {status.status === 'online' ? (
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          ) : (
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#666]"></span>
          )}
        </span>
        <span className="text-[#a3a3a3]">{status.label}</span>
      </div>

      {showTooltip && (
        <div className="absolute z-50 left-0 mt-2 w-64 p-3 bg-[#0a0a0a] border border-[#262626] rounded-lg text-xs text-[#a3a3a3] shadow-xl">
          <div className="flex items-center gap-1.5 font-medium text-white mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#ededed]" />
            <span>Honest Status Telemetry</span>
          </div>
          <p className="text-[11px] text-[#737373] leading-relaxed">
            obsess does not fabricate member counts, server totals, or uptime. Since no telemetry API is configured, the bot is running in static catalog mode.
          </p>
        </div>
      )}
    </div>
  );
};
