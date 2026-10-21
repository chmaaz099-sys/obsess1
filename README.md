# obsess — Official Discord Bot Website

A premium, production-ready website for the **obsess** Discord moderation bot, built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons**.

---

## 🚀 Quick Start (Running Locally)

1. Open a terminal in this directory:
   ```bash
   cd "C:\Users\AL-MAKKAH\.gemini\antigravity\scratch\obsess-bot-website"
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`.

3. To build for production and test the build:
   ```bash
   npm run build
   npm run preview
   ```

---

## ⚙️ Configuration & Customization

All bot URLs, client IDs, and branding strings are centralized in [`src/config/bot.ts`](file:///C:/Users/AL-MAKKAH/.gemini/antigravity/scratch/obsess-bot-website/src/config/bot.ts) and can also be overridden using a `.env.local` file.

### Values to Replace Before Public Deployment:

| Variable | File Location | Purpose | Default / Placeholder |
| :--- | :--- | :--- | :--- |
| **Client ID** | `.env.local` / `src/config/bot.ts` | Your Discord Bot Application Client ID | `1562050707081662538` |
| **Bot Invite URL** | `.env.local` / `src/config/bot.ts` | OAuth2 URL to authorize the bot | Auto-generated with `permissions=8` |
| **Support Server** | `.env.local` / `src/config/bot.ts` | Discord invite link to your support community | `https://discord.gg/your-support-server` |
| **Telemetry API** | `.env.local` | Optional backend endpoint for live status polling | *(Empty by default for honest static mode)* |

See [`.env.example`](file:///C:/Users/AL-MAKKAH/.gemini/antigravity/scratch/obsess-bot-website/.env.example) for environment variable syntax.

---

## 📁 Project Architecture

- **`src/config/bot.ts`**: Single source of truth for bot metadata, client ID, invite URLs, and permissions list.
- **`src/data/commands.ts`**: Complete, source-verified command catalog documenting every top-level command, grouped subcommand, parameter type, and required permission.
- **`src/data/features.ts`**: In-depth explanations of the 10 core subsystems:
  1. Advanced Core Moderation
  2. Precision Role Management
  3. Autonomous Jail System (with `on_member_join` anti-evasion)
  4. Custom Moderator Permissions (`/modrole`)
  5. Channel Management & Lockdown
  6. Targeted Message Purging (filtered by bots, links, attachments, users, keywords)
  7. Audit Logs & Private Notes (SQLite persistence)
  8. Voice Channel Moderation
  9. Per-Server Appearance Cards (`/botappearance`)
  10. Privacy-First Architecture (Zero privileged Message Content Intent)
- **`src/components/`**:
  - `MockDiscord.tsx`: Interactive Discord interface simulator with tabs for `/jail`, `/modrole`, `/purge`, and `/modlogs`.
  - `BotStatusBadge.tsx`: Privacy-first status badge showing honest telemetry or static catalog mode.
  - `CommandCard.tsx`: Searchable command card with argument tables, syntax copy, and example snippets.
  - `RoleHierarchyVisual.tsx`: Visual ladder explaining Discord's role hierarchy limitations.
- **`src/pages/`**:
  - `HomePage.tsx` (`/`)
  - `CommandsPage.tsx` (`/commands`)
  - `FeaturesPage.tsx` (`/features`)
  - `SetupPage.tsx` (`/setup`)
  - `PermissionsPage.tsx` (`/permissions`)
  - `AboutPage.tsx` (`/about`)
  - `NotFoundPage.tsx` (`*`)

---

## 🔒 Security & Privacy Guarantees

- **No Bot Token in Frontend**: The bot token is never exposed to the browser.
- **No Fabricated Telemetry**: Does not pretend to have live WebSocket connections or fabricated member counters.
- **No Privileged Message Intent**: Operates purely via Discord's modern Application Command tree.
"# obsess1" 
