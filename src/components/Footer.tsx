import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { BOT_CONFIG } from '../config/bot';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#141414] pt-14 pb-12 text-[#737373] text-xs text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#141414]">
          {/* Brand Info (appear.lol style) */}
          <div className="lg:col-span-2 space-y-3">
            <Logo size="md" />
            <p className="text-xs text-[#737373] leading-relaxed max-w-sm">
              The all-in-one Discord bot for moderation, custom role enforcement, voice rooms, social lookup, and server automation.
            </p>
            <div className="pt-2">
              <Link
                to="/status"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a170a] border border-[#173817] text-[11px] font-mono text-emerald-400 hover:border-[#225022] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational • 19ms</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] font-medium">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/commands" className="hover:text-white transition-colors">
                  Commands
                </Link>
              </li>
              <li>
                <Link to="/status" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Status</span>
                </Link>
              </li>
              <li>
                <Link to="/avatars" className="hover:text-white transition-colors">
                  Avatars
                </Link>
              </li>
              <li>
                <Link to="/embeds" className="hover:text-white transition-colors">
                  Embeds
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Subsystems & Tools */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] font-medium">
              Subsystems
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/features#feature-jail" className="hover:text-white transition-colors">
                  Jail System
                </Link>
              </li>
              <li>
                <Link to="/features#feature-modrole" className="hover:text-white transition-colors">
                  /modrole Engine
                </Link>
              </li>
              <li>
                <Link to="/features#feature-roles" className="hover:text-white transition-colors">
                  Role Management
                </Link>
              </li>
              <li>
                <Link to="/features#feature-purging" className="hover:text-white transition-colors">
                  Message Purging
                </Link>
              </li>
              <li>
                <Link to="/features#feature-appearance" className="hover:text-white transition-colors">
                  Appearance Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Management & Legal */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] font-medium">
              Management
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/owner" className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>👑 Owner Panel</span>
                </Link>
              </li>
              <li>
                <Link to="/staff" className="hover:text-white transition-colors">
                  Staff Portal
                </Link>
              </li>
              <li>
                <a
                  href={BOT_CONFIG.supportServerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Support Discord</span>
                  <ArrowUpRight className="w-3 h-3 text-[#555]" />
                </a>
              </li>
              <li>
                <a
                  href={BOT_CONFIG.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Invite obsess</span>
                  <ArrowUpRight className="w-3 h-3 text-[#555]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555]">
          <div>
            © {new Date().getFullYear()} {BOT_CONFIG.botName}. All rights reserved. Not affiliated with Discord Inc.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/faq" className="hover:text-[#888] transition-colors">FAQ</Link>
            <Link to="/status" className="hover:text-[#888] transition-colors">Status</Link>
            <Link to="/owner" className="hover:text-[#888] transition-colors">Owner</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
