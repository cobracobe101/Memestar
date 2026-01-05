import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Globe, Zap, ShieldCheck, Upload, Monitor, ExternalLink, Crown, Twitter, Send, Star, Clock, Flame } from 'lucide-react';
import { MemeCoin, PromotionStatus, AdPlacement } from './types';
import { generateMoonCatchphrase } from './services/geminiService';

const LOGO_IMG_URL = "https://storage.googleapis.com/cumulus-v1-prod-assets/output_fdfefc1d-1576-4be0-8334-972166663f73.png";
const LISTING_DURATION = 24 * 60 * 60 * 1000; // 24 Hours

const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const [imageError, setImageError] = useState(false);
  const height = size === 'sm' ? 'h-8' : size === 'md' ? 'h-12' : 'h-20';
  const fontSize = size === 'sm' ? 'text-xl' : size === 'md' ? 'text-3xl' : 'text-5xl';
  const subSize = size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs';

  return (
    <div className="flex items-center gap-3 select-none group">
      {!imageError ? (
        <img 
          src={LOGO_IMG_URL} 
          alt="Meme-Star Runner" 
          className={`${height} w-auto object-contain transition-transform duration-500 group-hover:scale-110`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex flex-col items-start leading-none uppercase">
          {/* Increased padding to pr-4 to ensure italic 'r' is never cut off */}
          <span className={`${fontSize} font-black italic tracking-tighter bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent pr-4 transition-all group-hover:tracking-tight`}>
            Meme-Star
          </span>
          <span className={`${subSize} font-bold tracking-[0.5em] text-cyan-400 group-hover:text-cyan-300 transition-colors`}>
            Runner
          </span>
        </div>
      )}
    </div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <Logo size="md" />
      <nav className="hidden md:flex gap-10 items-center">
        <a href="#promotions" className="text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-[0.2em]">Board Feed</a>
        <a href="#top-promos" className="text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-[0.2em]">Elite Access</a>
        <a href="mailto:support@memestarrunner.com" className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">Support</a>
      </nav>
    </div>
  </header>
);

const Hero = ({ onStartPromotion }: { onStartPromotion: (placement: AdPlacement) => void }) => (
  <section className="relative pt-32 pb-24 flex flex-col items-center text-center px-6 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.08)_0%,transparent_70%)] pointer-events-none"></div>
    
    <div className="max-w-5xl relative z-10">
      <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-white/10 px-4 py-2 rounded-full mb-10 shadow-xl">
        <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.25em]">Board Status: <span className="text-pink-500 animate-pulse">Hyper-Active</span></span>
      </div>

      <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6 leading-[0.8] transition-all">
        Meme-Star <br />
        <span className="text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">Runner</span>
      </h1>
      
      <h2 className="text-xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-12 max-w-4xl mx-auto leading-tight italic">
        The most <span className="text-cyan-400 underline decoration-pink-500 underline-offset-8">cost efficient</span> promotion <br className="hidden md:block" /> for your meme coin
      </h2>

      <p className="text-zinc-500 text-lg md:text-xl mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
        High-octane visibility. Zero friction. <br />
        Blast your project to the top for just <span className="text-white font-black">$1.00 BTC</span>.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
        <button 
          onClick={() => onStartPromotion('standard')}
          className="group relative bg-white text-black px-12 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-cyan-400 transition-all uppercase w-full sm:w-auto justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          Promote Token ($1) <Rocket className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </button>
        <button 
          onClick={() => onStartPromotion('edge')}
          className="bg-zinc-950 text-white border border-white/10 px-12 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-zinc-900 transition-all uppercase w-full sm:w-auto justify-center border-b-4 border-b-zinc-800 active:border-b-0 active:translate-y-1"
        >
          Sidebar Space <Monitor className="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
);

const getTimeLeft = (timestamp: number) => {
  const diff = timestamp + LISTING_DURATION - Date.now();
  if (diff <= 0) return 'Expired';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m left`;
};

const ListingsFeed = ({ coins }: { coins: MemeCoin[] }) => (
  <section id="promotions" className="py-24 border-t border-white/5">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center border border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
            <Star className="w-6 h-6 text-pink-500 fill-pink-500" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Live Board Feed</h2>
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900/40 rounded-full border border-white/5 backdrop-blur-sm">
           <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Active Runners:</span>
           <span className="text-[10px] font-black text-cyan-400 uppercase tabular-nums">{coins.filter(c => c.placement === 'standard').length}</span>
        </div>
      </div>

      <div className="space-y-5">
        {coins.filter(c => c.placement === 'standard').length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-zinc-900 rounded-[2.5rem] text-zinc-700 font-black uppercase tracking-[0.4em] text-xs">Waiting for incoming runners...</div>
        ) : (
          coins.filter(c => c.placement === 'standard').map((coin) => (
            <div key={coin.id} className="group flex flex-col sm:flex-row gap-8 items-center p-8 bg-zinc-900/10 border border-white/5 rounded-[2rem] hover:bg-zinc-900/30 transition-all hover:border-pink-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-lg border border-white/5 backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tabular-nums">
                      {getTimeLeft(coin.timestamp)}
                    </span>
                 </div>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-black border border-white/5 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl group-hover:scale-105 transition-transform">
                {coin.imageUrl ? <img src={coin.imageUrl} className="w-full h-full object-cover" /> : <span className="text-2xl font-black text-zinc-700">{coin.ticker[0]}</span>}
              </div>
              <div className="flex-grow text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-2">
                  <h4 className="font-black text-2xl uppercase text-white tracking-tight leading-none">{coin.name}</h4>
                  <span className="text-pink-500 font-black font-mono text-lg leading-none transition-colors group-hover:text-cyan-400">${coin.ticker}</span>
                </div>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-lg">{coin.description}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href={coin.website} target="_blank" className="p-4 bg-zinc-800/50 rounded-2xl text-zinc-400 hover:text-white transition-all border border-white/5 hover:bg-zinc-800"><Globe className="w-5 h-5" /></a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </section>
);

const PromotionModal = ({ isOpen, onClose, onFinish, initialPlacement = 'standard' }: { isOpen: boolean, onClose: () => void, onFinish: (coin: MemeCoin) => void, initialPlacement?: AdPlacement }) => {
  const [step, setStep] = useState<PromotionStatus>(PromotionStatus.IDLE);
  const [placement, setPlacement] = useState<AdPlacement>(initialPlacement);
  const [hasInitiatedPayment, setHasInitiatedPayment] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ name: '', ticker: '', website: '', description: '', imageUrl: '' });

  useEffect(() => { if (isOpen) { setPlacement(initialPlacement); setStep(PromotionStatus.IDLE); setHasInitiatedPayment(false); } }, [initialPlacement, isOpen]);
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(PromotionStatus.SUBMITTING);
    const generatedDescription = await generateMoonCatchphrase(formData.name, formData.ticker);
    const newCoin: MemeCoin = { id: Math.random().toString(36).substr(2, 9), name: formData.name, ticker: formData.ticker, contractAddress: '', website: formData.website, imageUrl: formData.imageUrl, description: formData.description || generatedDescription, timestamp: Date.now(), placement: placement };
    setTimeout(() => { onFinish(newCoin); setStep(PromotionStatus.SUCCESS); }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={onClose}></div>
      <div className="relative bg-zinc-950 w-full max-w-md border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(236,72,153,0.15)]">
        {step === PromotionStatus.IDLE && (
          <div className="p-12 text-center">
            <h2 className="text-3xl font-black uppercase mb-10 tracking-tighter text-white">Secure Listing</h2>
            <div className="flex bg-black p-2 rounded-2xl mb-10 border border-white/5 gap-2">
              <button onClick={() => setPlacement('standard')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${placement === 'standard' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-600'}`}>Standard ($1)</button>
              <button onClick={() => setPlacement('edge')} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${placement === 'edge' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-600'}`}>Sidebar ($15)</button>
            </div>
            <div className="mb-10 p-8 bg-zinc-900/30 rounded-3xl border border-white/5 flex flex-col items-center">
              <img width="220" src="https://www.blockonomics.co/img/pay_with_bitcoin_medium.png" className="hover:scale-105 hover:opacity-90 cursor-pointer transition-all rounded-xl mb-8 shadow-2xl" alt="Bitcoin" onClick={() => setHasInitiatedPayment(true)} />
              {hasInitiatedPayment && (
                <button onClick={() => setStep(PromotionStatus.SUBMITTING)} className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase transition-all hover:bg-cyan-400 shadow-xl">Confirm & Submit</button>
              )}
            </div>
            <button onClick={onClose} className="text-zinc-600 text-[10px] font-black uppercase hover:text-white transition-all tracking-[0.3em]">Abort Request</button>
          </div>
        )}
        {step === PromotionStatus.SUBMITTING && (
          <form onSubmit={handleSubmit} className="p-12 max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-black uppercase mb-10 tracking-tighter text-white text-center">Project Identity</h2>
            <div className="space-y-5 mb-10">
              <div className="flex justify-center mb-8">
                <div onClick={() => fileInputRef.current?.click()} className="w-28 h-28 rounded-[2rem] bg-black border-2 border-white/5 flex items-center justify-center cursor-pointer overflow-hidden hover:border-pink-500/50 transition-all shadow-inner">
                  {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <Upload className="text-zinc-800 w-10 h-10" />}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-600 uppercase ml-2">Project Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 focus:border-cyan-400/50 outline-none text-white text-sm font-bold shadow-inner" placeholder="e.g. MoonRunner" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-600 uppercase ml-2">Token Ticker</label>
                <input required value={formData.ticker} onChange={e => setFormData({...formData, ticker: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 focus:border-pink-500/50 outline-none text-pink-500 font-black uppercase text-sm tracking-widest shadow-inner" placeholder="$TICKER" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-600 uppercase ml-2">Official Link</label>
                <input required type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-black border border-white/5 rounded-2xl p-4 focus:border-white/20 outline-none text-white text-sm shadow-inner" placeholder="https://..." />
              </div>
            </div>
            <button type="submit" className="w-full py-5 bg-white text-black font-black text-xs uppercase rounded-2xl transition-all shadow-xl hover:bg-cyan-400">Launch to Feed</button>
          </form>
        )}
        {step === PromotionStatus.SUCCESS && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.2)] border border-pink-500/20"><ShieldCheck className="w-10 h-10" /></div>
            <h3 className="text-2xl font-black uppercase mb-4 text-white">Runner Active</h3>
            <p className="text-zinc-500 mb-12 text-sm font-medium leading-relaxed italic">Your project is now visible on the Meme-Star Board. Go get 'em!</p>
            <button onClick={onClose} className="w-full py-4 bg-white text-black font-black text-xs uppercase rounded-2xl hover:bg-cyan-400 transition-all shadow-xl">Back to Board</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [coins, setCoins] = useState<MemeCoin[]>(() => {
    const saved = localStorage.getItem('memestarrunner_listings');
    return saved ? JSON.parse(saved) : [];
  });
  const [modalState, setModalState] = useState<{ open: boolean, placement: AdPlacement }>({ open: false, placement: 'standard' });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const sweep = () => {
      const now = Date.now();
      setCoins(prev => {
        const filtered = prev.filter(coin => {
          if (coin.placement === 'elite') return true;
          return (now - coin.timestamp) < LISTING_DURATION;
        });
        
        if (JSON.stringify(filtered) !== localStorage.getItem('memestarrunner_listings')) {
          localStorage.setItem('memestarrunner_listings', JSON.stringify(filtered));
        }
        return filtered;
      });
      setTick(t => t + 1);
    };

    if (coins.length === 0) {
      setCoins([{ 
        id: 'top-1', 
        name: 'Meme-Star Runner', 
        ticker: 'RUNNER', 
        contractAddress: '', 
        website: '#', 
        description: 'The definitive high-octane dashboard for community-led promotions and project scaling.', 
        timestamp: Date.now(), 
        placement: 'elite', 
        imageUrl: LOGO_IMG_URL 
      }]);
    }

    const interval = setInterval(sweep, 60000);
    sweep();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('memestarrunner_listings', JSON.stringify(coins));
  }, [coins]);

  return (
    <div className="min-h-screen text-zinc-400 bg-transparent selection:bg-pink-500 selection:text-white pb-20">
      <Header />
      <main className="max-w-4xl mx-auto">
        <Hero onStartPromotion={(p) => setModalState({ open: true, placement: p })} />
        
        {/* Elite Section */}
        <section id="top-promos" className="py-24 border-t border-white/5 bg-zinc-950/20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02)_0%,transparent_50%)]"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="flex items-center justify-center mb-16 gap-4">
              <Crown className="w-8 h-8 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Elite Board</h2>
            </div>
            <div className="grid gap-8">
              {coins.filter(c => c.placement === 'elite').map(coin => (
                <div key={coin.id} className="relative group p-10 rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-xl transition-all hover:border-pink-500/40 overflow-hidden shadow-2xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/5 blur-[60px] rounded-full"></div>
                  <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-32 h-32 rounded-3xl bg-black border-2 border-white/5 overflow-hidden shrink-0 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {coin.imageUrl ? <img src={coin.imageUrl} className="w-full h-full object-cover" /> : <div className="text-4xl font-black text-zinc-800 uppercase">{coin.ticker[0]}</div>}
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-5 mb-4 justify-center md:justify-start">
                        <h4 className="font-black text-3xl uppercase text-white tracking-tighter">{coin.name}</h4>
                        <span className="text-pink-500 font-black font-mono text-xl tracking-tighter bg-pink-500/10 px-4 py-1 rounded-full border border-pink-500/20">${coin.ticker}</span>
                      </div>
                      <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8 italic opacity-80">"{coin.description}"</p>
                      <a href={coin.website} target="_blank" className="inline-flex items-center gap-3 bg-white text-black px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase hover:bg-cyan-400 transition-all shadow-xl">Explore Project <ExternalLink className="w-4 h-4" /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ListingsFeed coins={coins} />
        
        <section className="mt-24 px-6">
          <div className="bg-zinc-900/60 border-2 border-white/5 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-cyan-500/5"></div>
             <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-6 leading-tight tracking-tighter italic">Ready to <span className="text-pink-500">Run</span>?</h2>
                <p className="text-zinc-500 mb-12 text-lg max-w-sm mx-auto font-medium opacity-70">The community is waiting. Secure your placement for just $1.00 BTC today.</p>
                <button onClick={() => setModalState({ open: true, placement: 'standard' })} className="group relative bg-white text-black px-16 py-5 rounded-2xl font-black text-sm uppercase hover:bg-cyan-400 transition-all shadow-2xl hover:scale-105 active:scale-95 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                   PROMOTE NOW ($1)
                </button>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/60 text-center mt-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-10">
          <Logo size="md" />
          <div className="flex gap-14 text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em]">
             <a href="#" className="hover:text-cyan-400 transition-all flex items-center gap-3"><Twitter className="w-4 h-4" /> Twitter</a>
             <a href="#" className="hover:text-pink-400 transition-all flex items-center gap-3"><Send className="w-4 h-4" /> Telegram</a>
             <a href="mailto:support@memestarrunner.com" className="hover:text-white transition-all">Support</a>
          </div>
          <p className="text-[10px] text-zinc-800 font-black uppercase tracking-[1em] opacity-40">© 2025 MEME-STAR RUNNER - ESTABLISHED FOR THE ELITE</p>
        </div>
      </footer>

      <PromotionModal 
        isOpen={modalState.open} 
        onClose={() => setModalState({ ...modalState, open: false })} 
        onFinish={(c) => setCoins(prev => [c, ...prev])} 
        initialPlacement={modalState.placement} 
      />
    </div>
  );
}