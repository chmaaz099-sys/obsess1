import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { BOT_CONFIG } from '../config/bot';
import { BotStatusBadge } from './BotStatusBadge';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#000000] border-t border-[#141414] pt-14 pb-12 text-[#737373] text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#141414]">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            {/* Just the plain text "obsess", no logo icon */}
            <Logo size="md" />
            <p className="text-xs text-[#737373] leading-relaxed">
              Minimal, security-focused Discord moderation. Role hierarchy enforcement, custom bot permissions, and isolated jail systems.
            </p>
            <div className="pt-1">
              <BotStatusBadge />
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
                <Link to="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/setup" className="hover:text-white transition-colors">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link to="/permissions" className="hover:text-white transition-colors">
                  Permissions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/staff" className="hover:text-white transition-colors font-medium">
                  Staff Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Subsystems */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] font-medium">
              Subsystems
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/features#feature-jail" className="hover:text-white transition-colors">
                  Jail Isolation
                </Link>
              </li>
              <li>
                <Link to="/features#feature-modrole" className="hover:text-white transition-colors">
                  /modrole Engine
                </Link>
              </li>
              <li>
                <Link to="/features#feature-roles" className="hover:text-white transition-colors">
                  Mass Role Actions
                </Link>
              </li>
              <li>
                <Link to="/features#feature-purging" className="hover:text-white transition-colors">
                  Filtered Purge
                </Link>
              </li>
              <li>
                <Link to="/features#feature-appearance" className="hover:text-white transition-colors">
                  Appearance Cards
                </Link>
              </li>
              <li>
                <Link to="/features#feature-privacy" className="hover:text-white transition-colors">
                  Zero Message Intent
                </Link>
              </li>
            </ul>
          </div>

          {/* Discord Actions */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#d4d4d4] font-medium">
              Links
            </h4>
            <div className="space-y-2">
              <a
                href={BOT_CONFIG.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-[#0a0a0a] hover:bg-[#121212] border border-[#1a1a1a] text-xs text-[#d4d4d4] hover:text-white transition-colors group"
              >
                <span>Authorize Bot</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-white transition-colors" />
              </a>

              <a
                href={BOT_CONFIG.supportServerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 rounded-md bg-[#0a0a0a] hover:bg-[#121212] border border-[#1a1a1a] text-xs text-[#d4d4d4] hover:text-white transition-colors group"
              >
                <span>Support Server</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#525252]">
          <p>© {new Date().getFullYear()} obsess. All rights reserved.</p>
          <p>discord.py & aiosqlite • Not affiliated with Discord Inc.</p>
        </div>
      </div>
    </footer>
  );
};
