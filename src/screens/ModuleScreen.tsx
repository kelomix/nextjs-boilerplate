import { type ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

export function ModuleScreen({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-900 flex flex-col">
      <header className="sticky top-0 z-30 glass safe-top">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-white text-base">{title}</h1>
        </div>
      </header>
      <main className="flex-1 px-4 pb-8 pt-2 max-w-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
