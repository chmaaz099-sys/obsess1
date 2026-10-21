import { Terminal, Home, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-12 h-12 rounded-lg bg-[#141414] border border-[#222] flex items-center justify-center mx-auto text-[#d4d4d4]">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-4xl font-bold font-mono text-white tracking-tight">404</h1>
          <h2 className="text-sm font-semibold text-white">Page Not Found</h2>
          <p className="text-xs text-[#737373] leading-relaxed">
            The page you requested could not be located in the obsess directory.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-black bg-white hover:bg-[#e0e0e0] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <Link
            to="/commands"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium text-[#d4d4d4] hover:text-white bg-[#111] border border-[#222] transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Commands</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
