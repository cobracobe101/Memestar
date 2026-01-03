
import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Globe, Zap, ArrowRight, ShieldCheck, Upload, Monitor, ExternalLink, Crown, Mail, Star } from 'lucide-react';
import { MemeCoin, PromotionStatus, AdPlacement } from './types';
import { generateMoonCatchphrase } from './services/geminiService';

// --- Constants ---
// Updated to ensure logo points to the correct synthwave asset
const LOGO_URL = "https://storage.googleapis.com/cumulus-v1-prod-assets/output_fdfefc1d-1576-4be0-8334-972166663f73.png";

// --- Components ---

const EdgeBanner = ({ coin, onReserve }: { coin?: MemeCoin, onReserve: () => void }) => (
  <div className="max-w-4xl mx-auto px-4 mb-8">
    {coin ? (
      <div className="relative h-24 w-full rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl flex items-center justify-center overflow-hidden transition-all duration-500 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
        <div className="flex items-center w-full px-6 gap-6">
          <div className="h-14 w-14 rounded-xl bg-black border border-white/10 overflow-hidden shrink-0 shadow-lg flex items-center justify-center relative">
             {coin.imageUrl ? <img src={coin.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-white bg-zinc-800">{coin.ticker[0]}</div>}
          </div>
          <div className="flex-grow min-w-0 text-left">
            <div className="flex items-center gap-3 mb-1">
               <span className="text-[8px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-0.5 rounded tracking-widest uppercase shadow-sm">Featured Runner</span>
               <h4 className="font-bold text-lg uppercase truncate text-white">{coin.name}</h4>
               <span className="text-cyan-400 text-sm font-bold font-mono">${coin.ticker}</span>
            </div>
            <p className="text-zinc-400 text-xs font-medium truncate">{coin.description}</p>
          </div>
          <a href={coin.website} target="_blank" className="bg-white hover:bg-zinc-200 text-black px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap font-bold text-xs uppercase shadow-lg transform hover:scale-105 active:scale-95">
            Visit Site
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    ) : null}
  </div>
);

const SidebarAd = ({ 
  side, 
  coin, 
  onReserve 
}: { 
  side: 'left' | 'right', 
  coin?: MemeCoin, 
  onReserve: () => void 
}) => (
  <aside className={`hidden 2xl:flex flex-col fixed top-32 ${side === 'left' ? 'left-8' : 'right-8'} w-48 z-40 gap-6`}>
    {coin ? (
      <div className="bg-zinc-950/80 border border-white/5 rounded-2xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-500 hover:border-pink-500/30">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[9px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 uppercase tracking-[0.2em]">Partner Slot</span>
        </div>

        <div className="space-y-5">
          <div className="aspect-square rounded-2xl bg-black border border-white/5 overflow-hidden shadow-inner group transition-all flex items-center justify-center">
            {coin.imageUrl ? (
              <img src={coin.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-4xl text-zinc-800">{coin.ticker[0]}</div>
            )}
          </div>
          <div className="text-left">
            <h4 className="font-bold text-sm uppercase truncate text-white mb-0.5">{coin.name}</h4>
            <p className="text-cyan-400 text-xs font-bold font-mono">${coin.ticker}</p>
          </div>
          <p className="text-zinc-400 text-[10px] line-clamp-3 leading-relaxed font-medium">{coin.description}</p>
          <a 
            href={coin.website} 
            target="_blank" 
            className="block w-full py-2.5 bg-gradient-to-r from-zinc-900 to-black border border-white/5 text-zinc-300 text-[10px] font-bold text-center rounded-xl hover:text-white transition-all uppercase hover:border-pink-500/50"
          >
            Go to Website
          </a>
        </div>
      </div>
    ) : null}
  </aside>
);

const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const [imageError, setImageError] = useState(false);
  const containerClasses = size === 'sm' ? 'h-8' : size === 'md' ? 'h-14' : 'h-24';
  const textClasses = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-5xl';
  const subtextClasses = size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-lg';

  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={`relative ${containerClasses} flex items-center`}>
        {!imageError ? (
          <img 
            src={LOGO_URL} 
            alt="Meme-Star Runner Logo" 
            className="h-full object-contain drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-start">
            <span className={`script-font ${textClasses} leading-none text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-yellow-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]`}>
              MEME-STAR
            </span>
            <span className={`font-black ${subtextClasses} leading-none text-cyan-400 tracking-[0.3em] uppercase italic drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]`}>
              RUNNER
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
    <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">
      <Logo size="md" />
      <nav className="hidden md:flex gap-12 items-center">
        <a href="#promotions" className="text-[10px] font-bold text-zinc-400 hover:text-cyan-400 transition-all uppercase tracking-widest">Feed</a>
        <a href="mailto:support@memestarrunner.com" className="text-[10px] font-bold text-zinc-400 hover:text-pink-400 transition-all uppercase tracking-widest">Support</a>
      </nav>
    </div>
  </header>
);

const Hero = ({ onStartPromotion }: { onStartPromotion: (placement: AdPlacement) => void }) => (
  <section className="relative pt-12 pb-20 overflow-hidden flex flex-col items-center justify-center">
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <div className="mb-14 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-[120px] opacity-40 group-hover:opacity-70 transition duration-1000"></div>
          <div className="relative transform group-hover:scale-105 transition-transform duration-700">
             {/* Large Hero Logo */}
             <div className="h-48 md:h-64 flex items-center justify-center">
                <img src={LOGO_URL} alt="Meme-Star Runner Hero" className="h-full object-contain drop-shadow-[0_0_60px_rgba(236,72,153,0.4)]" />
             </div>
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-3 bg-zinc-900/40 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full mb-10 shadow-xl">
        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
        <span className="text-[10px] font-bold text-zinc-200 uppercase tracking-[0.2em]">Blast your project to the moon for <span className="text-cyan-400">$1.00 BTC</span></span>
      </div>

      <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[1]">
        <span className="bg-gradient-to-r from-white via-pink-100 to-cyan-100 bg-clip-text text-transparent">THE #1 DESTINATION</span> <br /> 
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">FOR MEME PROMOTIONS</span>
      </h1>

      <p className="text-zinc-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-medium italic">
        The ultimate dashboard for high-octane community coins.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button 
          onClick={() => onStartPromotion('standard')}
          className="relative group bg-white text-black px-14 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl w-full sm:w-auto transform active:scale-95 overflow-hidden"
        >
          PROMOTE YOUR MEME ($1) <Rocket className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onStartPromotion('edge')}
          className="bg-black/40 backdrop-blur-md text-white border border-white/10 px-14 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all w-full sm:w-auto transform active:scale-95 shadow-xl hover:border-pink-500/50"
        >
          RESERVE SIDEBAR SPACE <Monitor className="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
);

const TopPromotions = ({ coins }: { coins: MemeCoin[] }) => {
  const topCoins = coins.filter(c => c.placement === 'elite');

  return (
    <section id="top-promos" className="py-20 relative overflow-hidden bg-black/40 border-y border-white/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <Crown className="w-8 h-8 text-pink-500" />
              <h2 className="text-4xl font-extrabold tracking-tight uppercase bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">Top 7-Day Board</h2>
            </div>
            <p className="text-zinc-400 font-medium text-lg">Elite visibility for high-performing projects.</p>
          </div>
          <div className="flex items-center gap-4 bg-zinc-900/60 p-5 rounded-2xl border border-white/5 max-w-sm shadow-xl">
            <Mail className="w-6 h-6 text-cyan-400 shrink-0" />
            <p className="text-zinc-300 text-xs font-semibold leading-relaxed">
              Email us for weekly sponsorship slots: <a href="mailto:support@memestarrunner.com" className="text-pink-400 hover:text-pink-300 hover:underline underline-offset-4 font-bold transition-all">support@memestarrunner.com</a>.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          {topCoins.length === 0 ? (
            <div className="py-24 border border-dashed border-zinc-900 rounded-[2rem] flex items-center justify-center bg-zinc-950/20">
               <p className="text-zinc-700 text-base font-bold uppercase tracking-widest italic">Board expansion in progress...</p>
            </div>
          ) : (
            topCoins.map(coin => (
              <div key={coin.id} className="relative group p-12 rounded-[2.5rem] border border-white/10 bg-zinc-950/50 backdrop-blur-xl transition-all duration-300 hover:border-pink-500/50 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-[10px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Premium Slot</span>
                </div>
                <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                  <div className="w-32 h-32 rounded-[1.5rem] bg-black border border-white/5 overflow-hidden shrink-0 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    {coin.imageUrl ? <img src={coin.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-white text-4xl bg-zinc-900">{coin.ticker[0]}</div>}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-6 mb-5">
                      <h4 className="font-bold text-3xl uppercase text-white tracking-tighter">{coin.name}</h4>
                      <span className="text-cyan-400 text-xl font-black font-mono tracking-tight">${coin.ticker}</span>
                    </div>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-2xl font-medium">{coin.description}</p>
                    <a href={coin.website} target="_blank" className="inline-flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-2xl font-bold text-sm uppercase hover:bg-zinc-200 transition-all shadow-lg active:scale-95 transform hover:translate-x-1">
                      Website <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const ListingsFeed = ({ coins }: { coins: MemeCoin[] }) => (
  <section id="promotions" className="py-24 relative overflow-hidden bg-transparent">
    <div className="max-w-4xl mx-auto px-4 relative z-10 text-left">
      <div className="flex flex-col items-start gap-4 mb-14">
        <h2 className="text-3xl font-extrabold tracking-tight uppercase bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">Live Listing Stream</h2>
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900/50 px-5 py-2 rounded-full border border-white/5 flex items-center gap-3 backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></span>
            <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest">Connected to Board</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {coins.filter(c => c.placement === 'standard').length === 0 ? (
          <div className="py-32 text-center border border-dashed border-zinc-900 rounded-[2.5rem] bg-zinc-950/10">
            <p className="text-zinc-700 font-bold text-lg uppercase tracking-widest italic">Board is refreshing...</p>
          </div>
        ) : (
          coins.filter(c => c.placement === 'standard').map((coin) => (
            <div key={coin.id} className="group relative bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-[1.5rem] overflow-hidden hover:bg-zinc-900/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-cyan-500/30">
              <div className="p-8 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <div className="w-16 h-16 rounded-xl bg-black flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/5 shadow-inner group-hover:border-white/20 transition-colors">
                  {coin.imageUrl ? (
                    <img src={coin.imageUrl} alt={coin.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  ) : (
                    <span className="text-2xl font-bold text-zinc-700">{coin.ticker[0]}</span>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-xl leading-none uppercase truncate text-white">{coin.name} <span className="text-cyan-400 ml-4 text-sm font-bold font-mono">${coin.ticker}</span></h4>
                    <span className="text-[10px] font-mono text-zinc-600 shrink-0 font-bold uppercase tracking-tighter">{new Date(coin.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="text-zinc-400 text-sm font-medium line-clamp-1">
                    {coin.description}
                  </p>
                </div>
                <div className="flex gap-4 shrink-0 w-full sm:w-auto">
                  <a href={coin.website} target="_blank" className="flex-1 sm:flex-none bg-zinc-900/80 p-3 rounded-xl text-zinc-400 hover:text-cyan-400 transition-all border border-white/5 hover:border-cyan-500/50 shadow-sm flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </section>
);

const PromotionModal = ({ 
  isOpen, 
  onClose, 
  onFinish, 
  initialPlacement = 'standard' 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onFinish: (coin: MemeCoin) => void, 
  initialPlacement?: AdPlacement 
}) => {
  const [step, setStep] = useState<PromotionStatus>(PromotionStatus.IDLE);
  const [placement, setPlacement] = useState<AdPlacement>(initialPlacement);
  const [hasInitiatedPayment, setHasInitiatedPayment] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: '', ticker: '', website: '', description: '', imageUrl: ''
  });

  useEffect(() => { 
    if (isOpen) {
      setPlacement(initialPlacement);
      setStep(PromotionStatus.IDLE);
      setHasInitiatedPayment(false);
    }
  }, [initialPlacement, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinueAfterPayment = () => setStep(PromotionStatus.SUBMITTING);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(PromotionStatus.SUBMITTING);
    const generatedDescription = await generateMoonCatchphrase(formData.name, formData.ticker);
    
    const newCoin: MemeCoin = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      ticker: formData.ticker,
      contractAddress: '',
      website: formData.website,
      imageUrl: formData.imageUrl,
      description: formData.description || generatedDescription,
      timestamp: Date.now(),
      placement: placement
    };

    setTimeout(() => {
      onFinish(newCoin);
      setStep(PromotionStatus.SUCCESS);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative bg-zinc-950 w-full max-w-md border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        
        {step === PromotionStatus.IDLE && (
          <div className="p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight mb-8 bg-gradient-to-r from-white to-pink-200 bg-clip-text">Secure Board Placement</h2>
            <div className="flex bg-black p-2 rounded-2xl mb-12 border border-white/5 gap-2">
              <button onClick={() => setPlacement('standard')} className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-xl transition-all ${placement === 'standard' ? 'bg-white text-black shadow-lg' : 'text-zinc-600'}`}>Standard listing ($1)</button>
              <button onClick={() => setPlacement('edge')} className={`flex-1 py-3 text-[10px] font-bold uppercase rounded-xl transition-all ${placement === 'edge' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}>Sidebar Space ($15)</button>
            </div>
            
            <div className="bg-zinc-900/30 p-12 rounded-3xl text-center mb-12 border border-white/5 flex flex-col items-center">
              <div className="mb-12" onClick={() => setHasInitiatedPayment(true)}>
                <img width="220" src="https://www.blockonomics.co/img/pay_with_bitcoin_medium.png" className="hover:scale-105 cursor-pointer transition-transform shadow-2xl rounded-lg" alt="Payment" />
              </div>

              {hasInitiatedPayment && (
                <button 
                  onClick={handleContinueAfterPayment}
                  className="w-full py-5 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] shadow-xl transform active:scale-95"
                >
                  ENTER PROJECT DATA <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <button onClick={onClose} className="w-full text-zinc-600 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors">Abort request</button>
          </div>
        )}

        {step === PromotionStatus.SUBMITTING && (
          <form onSubmit={handleSubmit} className="p-10 max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white mb-8">Board Information</h2>
            <div className="flex flex-col items-center mb-10">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group transition-all shadow-xl hover:border-cyan-500/50"
              >
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-600 group-hover:text-cyan-400 transition-colors">
                    <Upload className="w-7 h-7 mb-2" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-center px-2">Logo</span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            <div className="space-y-6 mb-10">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">Project Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/5 rounded-xl p-4 focus:border-cyan-500/50 outline-none text-white text-sm font-bold transition-all" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">Ticker</label>
                <input required value={formData.ticker} onChange={e => setFormData({...formData, ticker: e.target.value})} className="w-full bg-black border border-white/5 rounded-xl p-4 focus:border-pink-500/50 outline-none text-cyan-400 text-sm font-black font-mono transition-all uppercase" placeholder="e.g. STAR" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">Website</label>
                <input required type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-black border border-white/5 rounded-xl p-4 focus:border-white/40 outline-none text-white text-sm transition-all" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2 tracking-widest">Brief Info</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/5 rounded-xl p-4 focus:border-white/40 outline-none h-24 resize-none text-zinc-300 text-sm font-medium transition-all" placeholder="Quick project summary..."></textarea>
              </div>
            </div>
            
            <button type="submit" className="w-full py-4 bg-white text-black font-extrabold text-lg rounded-xl transition-all shadow-2xl uppercase active:scale-95 transform hover:scale-[1.01]">
              CONFIRM LISTING
            </button>
          </form>
        )}

        {step === PromotionStatus.SUCCESS && (
          <div className="p-16 text-center">
            <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-10 text-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight mb-4">Board Placement Active</h3>
            <p className="text-zinc-500 mb-10 text-sm font-medium">Your project has been successfully added to the Meme-Star Runner Board.</p>
            <button onClick={onClose} className="px-12 py-4 bg-white text-black font-extrabold text-base rounded-xl transform active:scale-95 transition-all shadow-2xl">Return to Board</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [coins, setCoins] = useState<MemeCoin[]>([]);
  const [modalState, setModalState] = useState<{ open: boolean, placement: AdPlacement }>({ open: false, placement: 'standard' });

  useEffect(() => {
    // Initial data for the Runner Board
    setCoins([
      {
        id: 'top-1',
        name: 'Meme-Star Runner',
        ticker: 'RUNNER',
        contractAddress: '',
        website: '#',
        description: 'The ultimate synthwave destination for high-octane community project promotions.',
        timestamp: Date.now() - 3600000,
        placement: 'elite',
        imageUrl: LOGO_URL
      }
    ]);
  }, []);

  const handleFinishPromotion = (newCoin: MemeCoin) => {
    setCoins(prev => [newCoin, ...prev]);
  };

  const edgeCoins = coins.filter(c => c.placement === 'edge');

  return (
    <div className="min-h-screen selection:bg-pink-500 selection:text-white bg-transparent text-zinc-400 font-sans tracking-tight">
      <Header />
      
      {/* Sidebars */}
      <SidebarAd side="left" coin={edgeCoins[0]} onReserve={() => setModalState({ open: true, placement: 'edge' })} />
      <SidebarAd side="right" coin={edgeCoins[1]} onReserve={() => setModalState({ open: true, placement: 'edge' })} />

      <main className="max-w-4xl mx-auto px-4 relative">
        <Hero onStartPromotion={(placement) => setModalState({ open: true, placement })} />
        
        {/* Banner Ad Space */}
        <Edge