import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { BOT_CONFIG } from '../config/bot';
import { useAuth } from '../context/AuthContext';
import { staffAuthService } from '../services/staffAuth';
import { Menu, X, ArrowUpRight, LogOut, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, loginWithDiscord, logout } = useAuth();
  const navigate = useNavigate();

  const isOwner = currentUser ? staffAuthService.isOwner(currentUser.discordId) : false;
  const isStaff = currentUser?.isStaff || isOwner;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Commands', path: '/commands' },
    { name: 'Features', path: '/features' },
    { name: 'Setup', path: '/setup' },
    { name: 'Permissions', path: '/permissions' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/90 border-b border-[#161616] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Just the clean text "obsess", no logo icon beside it */}
          <Link to="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-[#141414] border border-[#242424]'
                      : 'text-[#8e8e8e] hover:text-[#d1d1d1] hover:bg-[#0c0c0c]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Owner link visible in navbar if user is root owner */}
            {isOwner && (
              <NavLink
                to="/owner"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-300 bg-amber-400/10 border border-amber-400/30'
                      : 'text-amber-300/80 hover:text-amber-300 hover:bg-[#111] border border-amber-400/20'
                  }`
                }
              >
                <span>👑</span>
                <span>Owner Panel</span>
              </NavLink>
            )}

            {/* Staff link visible in navbar if user is staff or owner */}
            {isStaff && (
              <NavLink
                to="/staff"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'text-white bg-[#141414] border border-[#242424]'
                      : 'text-[#8e8e8e] hover:text-[#d1d1d1] hover:bg-[#0c0c0c]'
                  }`
                }
              >
                <Shield className="w-3 h-3 text-[#a3a3a3]" />
                <span>Staff Panel</span>
              </NavLink>
            )}
          </nav>

          {/* Right Action Buttons & Discord Auth */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={BOT_CONFIG.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md text-xs font-medium text-[#8e8e8e] hover:text-white bg-[#0a0a0a] hover:bg-[#121212] border border-[#1f1f1f] transition-colors flex items-center gap-1"
            >
              <span>Invite</span>
              <ArrowUpRight className="w-3 h-3 text-[#666]" />
            </a>

            {/* If NOT logged in: Show "Login with Discord" */}
            {!currentUser ? (
              <button
                onClick={() => loginWithDiscord()}
                className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Login with Discord</span>
              </button>
            ) : (
              /* If LOGGED IN: Show user profile avatar & dropdown */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full bg-[#0a0a0a] border border-[#222222] hover:border-[#383838] transition-colors"
                >
                  <span className="text-xs font-medium text-white max-w-[120px] truncate">
                    @{currentUser.username}
                  </span>
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt=""
                      className="w-6 h-6 rounded-full object-cover border border-[#333]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#1c1c1c] text-white text-[10px] font-mono flex items-center justify-center">
                      {currentUser.username[0]?.toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0a0a0a] border border-[#222222] p-2 text-xs shadow-2xl space-y-1">
                    <div className="p-2 border-b border-[#181818] space-y-0.5">
                      <div className="font-semibold text-white truncate">{currentUser.displayName}</div>
                      <div className="text-[11px] text-[#737373] font-mono truncate">@{currentUser.username}</div>
                      <div className="text-[10px] text-[#555] font-mono">ID: {currentUser.discordId}</div>
                      <div className="pt-1">
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#161616] text-[#a3a3a3] border border-[#262626]">
                          {currentUser.role}
                        </span>
                      </div>
                    </div>

                    {isOwner && (
                      <Link
                        to="/owner"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between w-full px-2.5 py-1.5 rounded text-amber-300 bg-amber-400/5 hover:bg-amber-400/10 border border-amber-400/20 transition-colors font-medium"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>👑</span>
                          <span>Owner Panel</span>
                        </span>
                        <span className="text-[9px] text-amber-300 font-mono font-bold">ROOT</span>
                      </Link>
                    )}

                    <Link
                      to="/staff"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between w-full px-2.5 py-1.5 rounded text-[#a3a3a3] hover:text-white hover:bg-[#141414] transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Staff Moderation</span>
                      </span>
                      {isStaff ? (
                        <span className="text-[9px] text-emerald-400 font-mono">Access</span>
                      ) : (
                        <span className="text-[9px] text-[#555] font-mono">Staff Only</span>
                      )}
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="flex items-center gap-1.5 w-full px-2.5 py-1.5 rounded text-rose-400 hover:text-rose-300 hover:bg-[#160a0a] transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-[#888] hover:text-white bg-[#0a0a0a] border border-[#1f1f1f]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#161616] bg-black px-4 pt-2 pb-5 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-[#141414] border border-[#242424]'
                    : 'text-[#888] hover:text-white hover:bg-[#0c0c0c]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {isOwner && (
            <NavLink
              to="/owner"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20"
            >
              👑 Owner Panel
            </NavLink>
          )}

          <NavLink
            to="/staff"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-[#888] hover:text-white hover:bg-[#0c0c0c]"
          >
            Staff Panel
          </NavLink>

          <div className="pt-3 mt-2 border-t border-[#161616] flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  loginWithDiscord();
                }}
                className="w-full py-2.5 rounded-md text-xs font-semibold text-black bg-white hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-2"
              >
                <span>Login with Discord</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 rounded-md text-xs font-medium text-rose-400 bg-[#160a0a] border border-[#3b1212]"
              >
                Sign Out (@{currentUser.username})
              </button>
            )}

            <a
              href={BOT_CONFIG.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 rounded-md text-xs font-medium text-[#888] hover:text-white bg-[#0a0a0a] border border-[#1f1f1f]"
            >
              Invite Bot
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
