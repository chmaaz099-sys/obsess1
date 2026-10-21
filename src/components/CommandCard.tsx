import React, { useState } from 'react';
import type { BotCommand } from '../types';
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface CommandCardProps {
  command: BotCommand;
}

export const CommandCard: React.FC<CommandCardProps> = ({ command }) => {
  const [expanded, setExpanded] = useState(false);
  const [copiedSyntax, setCopiedSyntax] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);

  const copyToClipboard = (text: string, type: 'syntax' | 'example') => {
    navigator.clipboard.writeText(text);
    if (type === 'syntax') {
      setCopiedSyntax(true);
      setTimeout(() => setCopiedSyntax(false), 2000);
    } else {
      setCopiedExample(true);
      setTimeout(() => setCopiedExample(false), 2000);
    }
  };

  return (
    <div className="rounded-xl bg-[#080808] border border-[#171717] hover:border-[#2a2a2a] transition-colors overflow-hidden">
      {/* Header bar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-medium text-white text-sm tracking-tight flex items-center gap-1.5">
              <span>{command.syntax}</span>
            </span>

            <button
              onClick={() => copyToClipboard(command.syntax, 'syntax')}
              className="p-1 rounded text-[#555] hover:text-white transition-colors"
              title="Copy syntax"
              aria-label="Copy syntax"
            >
              {copiedSyntax ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Command type badge */}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#121212] text-[#737373] border border-[#1f1f1f]">
              {command.commandType === 'top-level' ? 'Top-level' : 'Grouped'}
            </span>

            {/* Permission Badge */}
            {command.requiredPermission && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#141414] text-[#a3a3a3] border border-[#242424]">
                perm: {command.requiredPermission}
              </span>
            )}

            {command.permissionType === 'discord-admin' && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#181818] text-[#e0e0e0] border border-[#2c2c2c]">
                Config Admin
              </span>
            )}
          </div>

          <p className="text-xs text-[#8e8e8e] leading-relaxed">
            {command.description}
          </p>
        </div>

        {/* Toggle Details Button */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-[#888] hover:text-white bg-[#101010] hover:bg-[#181818] border border-[#1e1e1e] transition-colors"
          >
            <span>{expanded ? 'Hide' : 'Parameters'}</span>
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-[#141414] bg-[#050505] space-y-3 text-xs">
          {/* Arguments */}
          <div>
            <div className="font-mono text-[#525252] uppercase tracking-wider text-[10px] font-medium mb-1.5">
              Parameters
            </div>
            {command.arguments && command.arguments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#141414] text-[#555] font-mono text-[10px]">
                      <th className="py-1 px-1.5">Name</th>
                      <th className="py-1 px-1.5">Type</th>
                      <th className="py-1 px-1.5">Requirement</th>
                      <th className="py-1 px-1.5">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#121212] font-mono">
                    {command.arguments.map((arg) => (
                      <tr key={arg.name}>
                        <td className="py-1.5 px-1.5 text-white font-medium">{arg.name}</td>
                        <td className="py-1.5 px-1.5 text-[#888] text-[11px]">{arg.type}</td>
                        <td className="py-1.5 px-1.5">
                          {arg.required ? (
                            <span className="text-[#bbb] font-sans text-[11px]">Required</span>
                          ) : (
                            <span className="text-[#555] font-sans text-[11px]">
                              Optional {arg.defaultValue ? `(${arg.defaultValue})` : ''}
                            </span>
                          )}
                        </td>
                        <td className="py-1.5 px-1.5 text-[#888] font-sans text-xs">
                          {arg.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-[#555] italic text-[11px]">No parameters required.</div>
            )}
          </div>

          {/* Example */}
          <div className="pt-2 border-t border-[#141414]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[#525252] uppercase tracking-wider text-[10px] font-medium">
                Example
              </span>
              <button
                onClick={() => copyToClipboard(command.example, 'example')}
                className="flex items-center gap-1 text-[11px] font-mono text-[#888] hover:text-white"
              >
                {copiedExample ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2 rounded bg-[#090909] border border-[#1a1a1a] text-[#d4d4d4] font-mono text-xs select-all">
              {command.example}
            </div>
          </div>

          {/* Implementation Note */}
          {command.notes && (
            <div className="pt-1.5 border-t border-[#141414] text-[#737373] text-[11px]">
              <span className="text-[#a3a3a3] font-medium">Note:</span> {command.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
