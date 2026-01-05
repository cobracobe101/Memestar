
import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Globe, Zap, ArrowRight, ShieldCheck, Upload, Monitor, ExternalLink, Crown, Mail, Twitter, Send, Star, Clock } from 'lucide-react';
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
          className={`${height} w-auto object-contain transition-transform duration-500 group-hover:scale-105`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex flex-col items-start leading-none uppercase">
          {/* Added pr-2 to prevent the italic 'r' from being cut off */}
          <span className={`${fontSize} font-black italic tracking-tighter bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent pr-2`}>
            Meme-Star
          </span>
          <span className={`${subSize} font-bold tracking-[0.4em] text-cyan-400`}>
            Runner
          </span>
        </div>
      )}
    </div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <Logo size="md" />
      <nav className="hidden md:flex gap-8 items-center">
        <a href="#promotions" className="text-xs font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-wider">Board</a>
        <a href="#top-promos" className="text-xs font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-wider">Elite</a>
        <a href="mailto:support@memestarrunner.com" className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-zinc-200 transition-all">Support</a>
      </nav>
    </div>
  </header>
);

const Hero = ({ onStartPromotion }: { onStartPromotion: (placement: AdPlacement) => void }) => (
  <section className="relative py-24 flex flex-col items-center text-center px-6">
    <div className="max-w-5xl relative z-10">
      <div className="inline-flex items-center gap-2 bg-zinc-900/50 border border-white/10 px-4 py-2 rounded-full mb-8">
        <Zap className="w-3 h-3 text-pink-500 fill-pink-500" />
        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Board Status: <span className="text-pink-400">Hyper-Active</span></span>
      </div>

      <h1 className="text-4xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-4 leading-[0.85]">
        Meme-Star <br />
        <span className="text-pink-500">Runner</span>
      </h1>
      
      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-zinc-300 uppercase tracking-tight mb-12 max-w-4xl mx-auto leading-tight">
        The most <span className="text-white">cost efficient</span> promotion <br className="hidden md:block" /> for your meme coin
      </h2>

      <p className="text-zinc-500 text-base md:text-lg mb-12 max-w-2xl mx-auto font-medium">
        Get your project in front of thousands for just <span className="text-white font-bold">$1.00 BTC</span>. Fast, simple, and effective visibility.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          onClick={() => onStartPromotion('standard')}
          className="bg-white text-black px-10 py-4 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zinc-200 transition-all uppercase w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Promote Token ($1) <Rocket className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onStartPromotion('edge')}
          className="bg-zinc-900 text-white border border-white/10 px-10 py-4 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zinc-800 transition-all uppercase w-full sm:w-auto justify-center"
        >
          Sidebar Space <Monitor className="w-4 h-4" />
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
  <section id="promotions" className="py-20">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-pink-500 fill-pink-500" />
          <h2 className="text-2xl font-black uppercase tracking-tight">Live Board Feed</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-lg border border-white/5">
           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Runners:</span>
           <span className="text-[10px] font-bold text-white uppercase">{coins.filter(c => c.placement === 'standard').length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {coins.filter(c => c.placement === 'standard').length === 0 ? (
          <div className="py-20 text-center border border-dashed border-zinc-800 rounded-3xl text-zinc-600 font-bold uppercase tracking-widest text-sm">Waiting for incoming runners...</div>
        ) : (
          coins.filter(c => c.placement === 'standard').map((coin) => (
            <div key={coin.id} className="group flex flex-col sm:flex-row gap-6 items-center p-6 bg-zinc-900/20 border border-white/5 rounded-2xl hover:bg-zinc-900/40 transition-all hover:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded-md border border-white/5">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tabular-nums">
                      {getTimeLeft(coin.timestamp)}
                    </span>
                 </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-black border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                {coin.imageUrl ? <img src={coin.imageUrl} className="w-full h-full object-cover" /> : <span className="font-bold text-zinc-700">{coin.ticker[0]}</span>}
              </div>
              <div className="flex-grow text-center sm:text-left pt-2 sm:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg uppercase text-white leading-none">{coin.name}</h4>
                  <span className="text-pink-500 font-bold font-mono text-sm leading-none">${coin.ticker}</span>
                </div>
                <p className="text-zinc-500 text-xs font-medium">{coin.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={coin.website} target="_blank" className="p-3 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all border border-white/5"><Globe className="w-4 h-4" /></a>
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-zinc-950 w-full max-w-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {step === PromotionStatus.IDLE && (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter">Secure Listing</h2>
            <div className="flex bg-black p-1.5 rounded-xl mb-8 border border-white/5 gap-1">
              <button onClick={() => setPlacement('standard')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${placement === 'standard' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}>Standard ($1)</button>
              <button onClick={() => setPlacement('edge')} className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${placement === 'edge' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}>Sidebar ($15)</button>
            </div>
            <div className="mb-8 p-6 bg-zinc-900/30 rounded-2xl border border-white/5 flex flex-col items-center">
              <img width="200" src="https://www.blockonomics.co/img/pay_with_bitcoin_medium.png" className="hover:opacity-80 cursor-pointer transition-all rounded-lg mb-6 shadow-xl" alt="Bitcoin" onClick={() => setHasInitiatedPayment(true)} />
              {hasInitiatedPayment && (
                <button onClick={() => setStep(PromotionStatus.SUBMITTING)} className="w-full py-4 bg-white text-black rounded-xl font-bold text-xs uppercase transition-all hover:bg-zinc-200 shadow-lg">Proceed to Submission</button>
              )}
            </div>
            <button onClick={onClose} className="text-zinc-600 text-[10px] font-bold uppercase hover:text-white transition-all">Abort Request</button>
          </div>
        )}
        {step === PromotionStatus.SUBMITTING && (
          <form onSubmit={handleSubmit} className="p-10 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-black uppercase mb-8 tracking-tighter">Project Identity</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-center mb-6">
                <div onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-2xl bg-black border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-pink-500/50 transition-all">
                  {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <Upload className="text-zinc-700 w-6 h-6" />}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/5 rounded-xl p-3.5 focus:border-pink-500/50 outline-none text-white text-sm font-bold" placeholder="Project Name" />
              <input required value={formData.ticker} onChange={e => setFormData({...formData, ticker: e.target.value})} className="w-full bg-black border border-white/5 rounded-xl p-3.5 focus:border-pink-500/50 outline-none text-pink-500 font-black uppercase text-sm tracking-widest" placeholder="Ticker (e.g. BTC)" />
              <input required type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-black border border-white/5 rounded-xl p-3.5 focus:border-white/20 outline-none text-white text-sm" placeholder="Website URL (https://...)" />
            </div>
            <button type="submit" className="w-full py-4 bg-white text-black font-bold text-xs uppercase rounded-xl transition-all shadow-xl hover:bg-zinc-200">Submit to Board</button>
          </form>
        )}
        {step === PromotionStatus.SUCCESS && (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 shadow-xl"><ShieldCheck className="w-8 h-8" /></div>
            <h3 className="text-xl font-black uppercase mb-2 text-white">Placement Active</h3>
            <p className="text-zinc-500 mb-8 text-xs font-medium">Your token is live on the Meme-Star Board. Good luck runner!</p>
            <button onClick={onClose} className="px-10 py-3 bg-white text-black font-bold text-xs uppercase rounded-xl hover:bg-zinc-200 transition-all shadow-xl">Back to Board</button>
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

  // Persistence and Cleanup Sweeper
  useEffect(() => {
    const sweep = () => {
      const now = Date.now();
      setCoins(prev => {
        const filtered = prev.filter(coin => {
          // Keep Elite listings forever (or handle separately if needed), but Standard/Edge clear in 24h
          if (coin.placement === 'elite') return true;
          return (now - coin.timestamp) < LISTING_DURATION;
        });
        
        // Save to local storage if it changed
        if (JSON.stringify(filtered) !== localStorage.getItem('memestarrunner_listings')) {
          localStorage.setItem('memestarrunner_listings', JSON.stringify(filtered));
        }
        return filtered;
      });
      setTick(t => t + 1); // Force a re-render for countdowns
    };

    // Initial load check
    if (coins.length === 0) {
      setCoins([{ 
        id: 'top-1', 
        name: 'Meme-Star Runner', 
        ticker: 'RUNNER', 
        contractAddress: '', 
        website: '#', 
        description: 'The ultimate synthwave destination for high-octane community project promotions.', 
        timestamp: Date.now(), 
        placement: 'elite', 
        imageUrl: LOGO_IMG_URL 
      }]);
    }

    const interval = setInterval(sweep, 60000); // Sweep every minute
    sweep(); // Run immediately

    return () => clearInterval(interval);
  }, []);

  // Save whenever coins change
  useEffect(() => {
    localStorage.setItem('memestarrunner_listings', JSON.stringify(coins));
  }, [coins]);

  return (
    <div className="min-h-screen text-zinc-400 bg-transparent selection:bg-pink-500 selection:text-white pb-20">
      <Header />
      <main className="max-w-4xl mx-auto">
        <Hero onStartPromotion={(p) => setModalState({ open: true, placement: p })} />
        
        {/* Elite Section */}
        <section id="top-promos" className="py-20 border-t border-white/5 bg-zinc-900/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Elite Board</h2>
              </div>
            </div>
            <div className="grid gap-6">
              {coins.filter(c => c.placement === 'elite').map(coin => (
                <div key={coin.id} className="relative group p-8 rounded-2xl border border-white/10 bg-zinc-900/30 backdrop-blur-sm transition-all hover:border-pink-500/30 overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-24 h-24 rounded-2xl bg-black border border-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                      {coin.imageUrl ? <img src={coin.imageUrl} className="w-full h-full object-cover" /> : <div className="text-3xl font-black text-zinc-800 uppercase">{coin.ticker[0]}</div>}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="font-bold text-2xl uppercase text-white tracking-tight">{coin.name}</h4>
                        <span className="text-pink-500 font-black font-mono tracking-tighter">${coin.ticker}</span>
                      </div>
                      <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-6 italic">"{coin.description}"</p>
                      <a href={coin.website} target="_blank" className="inline-flex items-center gap-2 bg-zinc-800 text-zinc-200 px-6 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-zinc-700 transition-all">Visit Project <ExternalLink className="w-4 h-4" /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ListingsFeed coins={coins} />
        
        <section className="mt-20 px-6">
          <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <h2 className="text-3xl font-black text-white uppercase mb-4 leading-tight tracking-tighter">Ready to <span className="text-pink-500">Run</span>?</h2>
                <p className="text-zinc-500 mb-8 text-sm max-w-sm mx-auto font-medium italic">Reach our professional community for just $1.00 BTC per project.</p>
                <button onClick={() => setModalState({ open: true, placement: 'standard' })} className="bg-white text-black px-12 py-4 rounded-xl font-black text-sm uppercase hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 active:scale-95">PROMOTE NOW ($1)</button>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-black/40 text-center mt-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-8">
          <Logo size="md" />
          <div className="flex gap-10 text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
             <a href="#" className="hover:text-cyan-400 transition-all flex items-center gap-2"><Twitter className="w-3 h-3" /> Twitter</a>
             <a href="#" className="hover:text-pink-400 transition-all flex items-center gap-2"><Send className="w-3 h-3" /> Telegram</a>
             <a href="mailto:support@memestarrunner.com" className="hover:text-white transition-all">Support</a>
          </div>
          <p className="text-[9px] text-zinc-800 font-bold uppercase tracking-[0.5em]">© 2025 MEME-STAR RUNNER - ALL RIGHTS RESERVED</p>
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
