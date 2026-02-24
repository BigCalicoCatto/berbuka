"use client";

import { useState, useEffect } from "react";

export default function MobileRandomizer() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    const list = input.split("\n").map(i => i.trim()).filter(i => i !== "");
    setItems(list);
  }, [input]);

  const roll = () => {
    if (items.length < 2) return;
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(items[Math.floor(Math.random() * items.length)]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 60);
  };

  return (
    // bg-slate-50 gives it that "premium app" background
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      
      {/* 1. App Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center tracking-tight">
          ✨ <span className="text-indigo-600">Random</span>Picker
        </h1>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-6">
        
        {/* 2. Input Card */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5">
          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block ml-1">
            Your Options
          </label>
          <textarea
            className="w-full h-48 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-lg transition-all resize-none"
            placeholder="Enter items...&#10;Pizza&#10;Sushi"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={roll}
            disabled={items.length < 2 || isRolling}
            className="w-full mt-4 h-14 bg-indigo-600 active:bg-indigo-800 disabled:bg-slate-200 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            {isRolling ? "Rolling..." : "Pick Winner"}
          </button>
        </section>

        {/* 3. Result Display (UX: Contrast) */}
        {result && (
          <div className="bg-indigo-600 rounded-3xl p-8 text-center text-white shadow-2xl shadow-indigo-200 animate-in fade-in zoom-in duration-300">
            <p className="text-indigo-200 text-sm font-medium mb-1 uppercase tracking-widest">
              The choice is:
            </p>
            <h2 className="text-4xl font-black">{result}</h2>
            {!isRolling && (
               <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="mt-4 text-xs bg-indigo-500/50 hover:bg-indigo-500 px-3 py-1 rounded-full transition-colors"
               >
                 Copy Result
               </button>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
