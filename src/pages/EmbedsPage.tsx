import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Sparkles, Layers, FileCode } from 'lucide-react';

interface EmbedField {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

export const EmbedsPage: React.FC = () => {
  const [format, setFormat] = useState<'classic' | 'c2'>('classic');
  const [title, setTitle] = useState('Welcome to obsess');
  const [description, setDescription] = useState('The premier Discord bot for moderation, custom role enforcement, and server automation.');
  const [color, setColor] = useState('#ffffff');
  const [authorName, setAuthorName] = useState('obsess system');
  const [footerText, setFooterText] = useState('Protected by obsess');
  const [showBotPfp, setShowBotPfp] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [fields, setFields] = useState<EmbedField[]>([
    { id: '1', name: 'Prefix', value: '/ (Slash Commands)', inline: true },
    { id: '2', name: 'Security', value: 'Role Hierarchy Enforced', inline: true },
  ]);
  const [copied, setCopied] = useState<string | null>(null);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'Field Name', value: 'Field Value', inline: true },
    ]);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const updateField = (id: string, key: keyof EmbedField, val: any) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: val } : f)));
  };

  const handleReset = () => {
    setTitle('Welcome to obsess');
    setDescription('The premier Discord bot for moderation, custom role enforcement, and server automation.');
    setColor('#ffffff');
    setAuthorName('obsess system');
    setFooterText('Protected by obsess');
    setFields([
      { id: '1', name: 'Prefix', value: '/ (Slash Commands)', inline: true },
      { id: '2', name: 'Security', value: 'Role Hierarchy Enforced', inline: true },
    ]);
  };

  const generatedCommand = `/embed create title: "${title}" description: "${description}" color: "${color}" footer: "${footerText}"`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111] border border-[#222] text-xs font-mono text-[#aaa]">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>obsess message tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Embed & C2 Builder
        </h1>
        <p className="text-xs text-[#888] max-w-xl">
          Design interactive Discord embeds and components. Visual live preview updates immediately and generates the exact bot command.
        </p>
      </div>

      {/* Format Selector (appear.lol style) */}
      <div className="flex gap-2 p-1.5 rounded-xl bg-[#080808] border border-[#171717] w-fit">
        <button
          onClick={() => setFormat('classic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
            format === 'classic'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Classic Embed</span>
        </button>
        <button
          onClick={() => setFormat('c2')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
            format === 'c2'
              ? 'bg-white text-black font-semibold'
              : 'text-[#888] hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Components V2 (C2)</span>
        </button>
      </div>

      {/* Builder Layout: Left Controls, Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Controls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#080808] border border-[#171717] space-y-4">
            <div className="flex items-center justify-between border-b border-[#141414] pb-3">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Embed Properties
              </h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] font-mono text-[#777] hover:text-white transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white focus:outline-none focus:border-[#444]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white focus:outline-none focus:border-[#444]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a3a3a3] font-medium">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white focus:outline-none focus:border-[#444]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#a3a3a3] font-medium">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-8 h-8 rounded bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded bg-[#000] border border-[#222] text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#a3a3a3] font-medium">Footer Text</label>
                  <input
                    type="text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#000] border border-[#222] text-white focus:outline-none focus:border-[#444]"
                  />
                </div>
              </div>

              {/* Bot PFP & Thumbnail Toggles */}
              <div className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/bot-pfp.jpg"
                    alt="obsess avatar"
                    className="w-7 h-7 rounded-full object-cover border border-[#333]"
                  />
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white">obsess Bot PFP</div>
                    <div className="text-[10px] text-[#666]">Official bot avatar</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#888]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBotPfp}
                      onChange={(e) => setShowBotPfp(e.target.checked)}
                      className="rounded"
                    />
                    <span>Author Icon</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showThumbnail}
                      onChange={(e) => setShowThumbnail(e.target.checked)}
                      className="rounded"
                    />
                    <span>Embed Thumbnail</span>
                  </label>
                </div>
              </div>

              {/* Dynamic Fields */}
              <div className="pt-2 border-t border-[#141414] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Fields ({fields.length})</span>
                  <button
                    onClick={addField}
                    className="text-[11px] font-mono text-white hover:underline"
                  >
                    + Add Field
                  </button>
                </div>

                {fields.map((f) => (
                  <div key={f.id} className="p-3 rounded-lg bg-[#000] border border-[#1a1a1a] space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={f.name}
                        onChange={(e) => updateField(f.id, 'name', e.target.value)}
                        placeholder="Field Name"
                        className="px-2.5 py-1.5 rounded bg-[#080808] border border-[#262626] text-white text-xs"
                      />
                      <input
                        type="text"
                        value={f.value}
                        onChange={(e) => updateField(f.id, 'value', e.target.value)}
                        placeholder="Field Value"
                        className="px-2.5 py-1.5 rounded bg-[#080808] border border-[#262626] text-white text-xs"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#666]">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={f.inline}
                          onChange={(e) => updateField(f.id, 'inline', e.target.checked)}
                          className="rounded"
                        />
                        <span>Inline</span>
                      </label>
                      <button
                        onClick={() => removeField(f.id)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Discord Message Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-[#080808] border border-[#171717] space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#666]">
              Discord Client Preview
            </span>

            {/* Discord Message Mock */}
            <div className="p-5 rounded-xl bg-[#0c0c0c] border border-[#1c1c1c] space-y-3 font-sans">
              <div className="flex items-center gap-2.5">
                <img
                  src="/bot-pfp.jpg"
                  alt="obsess bot avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[#282828]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">obsess</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#5865F2] text-white font-medium">
                      BOT
                    </span>
                    <span className="text-[11px] text-[#555]">Today at 12:00 PM</span>
                  </div>
                </div>
              </div>

              {/* The Embed Box */}
              <div
                className="rounded-lg bg-[#050505] border border-[#181818] p-4 text-xs space-y-2.5 text-left relative overflow-hidden"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                {/* Embed Thumbnail if toggled */}
                {showThumbnail && (
                  <img
                    src="/bot-pfp.jpg"
                    alt="Thumbnail"
                    className="w-14 h-14 rounded-lg object-cover border border-[#222] float-right ml-3 mb-1"
                  />
                )}

                {authorName && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                    {showBotPfp && (
                      <img
                        src="/bot-pfp.jpg"
                        alt=""
                        className="w-4 h-4 rounded-full object-cover"
                      />
                    )}
                    <span>{authorName}</span>
                  </div>
                )}
                {title && (
                  <div className="text-sm font-bold text-white">
                    {title}
                  </div>
                )}
                {description && (
                  <p className="text-xs text-[#b5bac1] leading-relaxed">
                    {description}
                  </p>
                )}

                {/* Fields */}
                {fields.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {fields.map((f) => (
                      <div key={f.id} className={f.inline ? 'col-span-1' : 'col-span-2'}>
                        <div className="font-semibold text-white/80 text-[11px]">{f.name}</div>
                        <div className="text-[#a3a3a3] text-[11px]">{f.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {footerText && (
                  <div className="flex items-center gap-1.5 text-[10px] text-[#666] pt-2 border-t border-[#121212]">
                    {showBotPfp && (
                      <img
                        src="/bot-pfp.jpg"
                        alt=""
                        className="w-3.5 h-3.5 rounded-full object-cover"
                      />
                    )}
                    <span>{footerText}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Generated Command Output */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-mono text-[#666]">Generated Slash Command</span>
              <div className="p-3 rounded-lg bg-[#000] border border-[#1c1c1c] flex items-center justify-between gap-3 text-xs font-mono text-[#ededed] overflow-x-auto">
                <span className="truncate">{generatedCommand}</span>
                <button
                  onClick={() => copyToClipboard(generatedCommand, 'cmd')}
                  className="px-2.5 py-1 rounded bg-[#181818] hover:bg-[#222] text-white shrink-0 flex items-center gap-1"
                >
                  {copied === 'cmd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied === 'cmd' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
