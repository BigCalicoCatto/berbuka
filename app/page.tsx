"use client";

import { useState, useEffect } from "react";

export default function BukaPuasaRandomizer() {
  const [input, setInput] = useState("Nasi Lemak\nSatay\nMurtabak\nRoti John\nNasi Kerabu\nIkan Bakar");
  const [result, setResult] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [nasihat, setNasihat] = useState("");

  const senaraiNasihat = [
    "Sabar itu separuh daripada iman. ✨",
    "Jangan membazir ketika berbuka ya!",
    "Senyum itu satu sedekah. 😊",
    "Berbuka dengan yang manis, tapi jangan manis sangat!",
    "Dah sedia nak Teraweh malam ni?",
    "Hargai penat lelah orang yang memasak. ❤️",
    "Be kind to every human you meet today."
  ];

  // Pick a random advice on page load
  useEffect(() => {
    setNasihat(senaraiNasihat[Math.floor(Math.random() * senaraiNasihat.length)]);
  }, []);

  const roll = () => {
    const items = input.split("\n").map(i => i.trim()).filter(i => i !== "");
    if (items.length < 2) return;
    
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(items[Math.floor(Math.random() * items.length)]);
      count++;
      if (count > 20) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-6 text-center sticky top-0 z-10">
        <h1 className="text-2xl font-black text-indigo-600">🌙 Nak Buka Apa?</h1>
        <p className="text-slate-400 text-sm italic">Pening fikir menu? Biar kami pilihkan!</p>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-8">
        
        {/* Input Section */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5">
          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
            List Menu Idamannn:
          </label>
          <textarea
            className="w-full h-32 p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 text-md resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={roll}
            disabled={isRolling}
            className="w-full mt-4 h-14 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all"
          >
            {isRolling ? "Tengah Pilih..." : "Tolong Pilihkan!"}
          </button>
        </section>

        {/* Result & Voting Section */}
        {result && (
          <div className="bg-white rounded-3xl p-8 text-center border-2 border-indigo-100 shadow-xl animate-in zoom-in duration-300">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              Keputusan Hari Ini:
            </p>
            <h2 className={`text-4xl font-black mb-6 ${isRolling ? 'opacity-50' : 'text-indigo-600'}`}>
              {result}
            </h2>
            
            {!isRolling && (
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => alert("Mantap! Selamat berbuka!")}
                  className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  👍 Suka!
                </button>
                <button 
                  onClick={roll}
                  className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  👎 Tak Nak
                </button>
              </div>
            )}
          </div>
        )}

        {/* Nasihat Box (The Random Box) */}
        <section className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 italic text-center">
          <p className="text-indigo-800 text-sm leading-relaxed">
            "{nasihat}"
          </p>
          <button 
            onClick={() => setNasihat(senaraiNasihat[Math.floor(Math.random() * senaraiNasihat.length)])}
            className="mt-3 text-[10px] text-indigo-400 uppercase font-bold tracking-tighter"
          >
            Tukar Nasihat Baru
          </button>
        </section>

      </main>

      <footer className="text-center text-slate-300 text-[10px] py-4">
        Build with ❤️ for Ramadan
      </footer>
    </div>
  );
}
