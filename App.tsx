import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Globe, Zap, ShieldCheck, Upload, Monitor, ExternalLink, Crown, Twitter, Send, Star, Clock, Flame, Bitcoin, ArrowRight, Loader2, Copy, CheckCircle2, ShieldEllipsis, AlertCircle, Terminal, Cpu, Database, Network, Image as ImageIcon, Plus, Check } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { MemeCoin, PromotionStatus, AdPlacement } from './types';
import { generateMoonCatchphrase } from './services/geminiService';

const LOGO_IMG_URL = "https://storage.googleapis.com/cumulus-v1-prod-assets/output_fdfefc1d-1576-4be0-8334-972166663f73.png";
const LISTING_DURATION = 24 * 60 * 60 * 1000; // 24 Hours

/** 
 * CONFIGURATION: Update these values for your business
 */
const BTC_ADDRESS = "bc1q4f3d67vsdq4z4x5rwj8ps3xqddlxztnwwghfzr";
const PROMOTION_PRICE_USD = 1.00;
const SIDEBAR_PRICE_USD = 15.00;

const getTimeLeft = (timestamp: number) => {
  const diff = (timestamp + LISTING_DURATION) - Date.now();
  if (diff <= 0) return '00:00:00';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

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
        <a href="mailto:support@memestarrunner.com" className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">Support</a>
      </nav>
    </div>
  </header>
);

const Hero = ({ onStartPromotion }: { onStartPromotion: (placement: AdPlacement) => void }) => (
  <section className="relative pt-24 pb-20 flex flex-col items-center text-center px-6 overflow-hidden">
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
      
      <h2 className="text-xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-8 max-w-4xl mx-auto leading-tight italic">
        The most <span className="text-cyan-400 underline decoration-pink-500 underline-offset-8">cost efficient</span> promotion <br className="hidden md:block" /> for your meme coin
      </h2>

      {/* Bullet Points Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 backdrop-blur-sm">
          <Clock className="w-5 h-5 text-pink-500" />
          <span className="text-[10px] font-black uppercase text-zinc-300 leading-tight">24H Live Feed<br/><span className="text-white">$1.00 Total</span></span>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 backdrop-blur-sm">
          <Twitter className="w-5 h-5 text-cyan-400" />
          <span className="text-[10px] font-black uppercase text-zinc-300 leading-tight">X.COM BLAST<br/><span className="text-white">Social Post</span></span>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 backdrop-blur-sm">
          <Zap className="w-5 h-5 text-orange-400" />
          <span className="text-[10px] font-black uppercase text-zinc-300 leading-tight">Instant Sync<br/><span className="text-white">Live Approval</span></span>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 backdrop-blur-sm">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <span className="text-[10px] font-black uppercase text-zinc-300 leading-tight">Limited Spots<br/><span className="text-white">Elite Quality</span></span>
        </div>
      </div>

      <p className="text-zinc-500 text-lg md:text-xl mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
        High-octane visibility. Zero friction. <br />
        Blast your project to the top for just <span className="text-white font-black">${PROMOTION_PRICE_USD.toFixed(2)} BTC</span>.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
        <button 
          onClick={() => onStartPromotion('standard')}
          className="group relative bg-white text-black px-12 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-cyan-400 transition-all uppercase w-full sm:w-auto justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          Promote Token (${PROMOTION_PRICE_USD.toFixed(0)}) <Rocket className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </section>
);

const AdBannerSlot = ({ placement, coins, onPromote }: { placement: AdPlacement, coins: MemeCoin[], onPromote: (p: AdPlacement) => void }) => {
  const defaultAds: Record<string, Partial<MemeCoin>> = {
    'edge': {
      name: 'Squid Doge',
      ticker: 'SQDGE',
      website: 'https://squiddoge.com', 
      imageUrl: 'https://storage.googleapis.com/cumulus-v1-prod-assets/output_fdfefc1d-1576-4be0-8334-972166663f73.png'
    }
  };

  const activeBanners = coins.filter(c => c.placement === placement);
  const coin = activeBanners.length > 0 ? activeBanners[0] : (defaultAds[placement] as MemeCoin);
  
  if (coin) { 
    return (
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative group w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl transition-all hover:border-pink-500/40">
          <div className="relative w-full h-16 md:h-20 bg-zinc-900 overflow-hidden">
            <img 
              src={coin.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" 
              alt={coin.name} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622630998477-00aa196902ec?auto=format&fit=crop&q=80&w=1000';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                   <h4 className="font-black text-xl md:text-2xl uppercase text-white tracking-tighter leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{coin.name}</h4>
                   <span className="text-cyan-400 font-black font-mono text-lg leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.9)] transition-all group-hover:text-pink-500 group-hover:scale-110">${coin.ticker}</span>
                </div>
                <a href={coin.website} target="_blank" className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-2 rounded-lg text-[9px] font-black uppercase hover:bg-cyan-400 transition-all shadow-2xl shrink-0">VISIT PROJECT <ExternalLink className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div 
        onClick={() => onPromote(placement)}
        className="w-full h-16 md:h-20 rounded-2xl border border-dashed border-white/10 bg-zinc-950/40 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400/50 hover:bg-zinc-900/60 transition-all group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-8">
           <h3 className="text-xl md:text-2xl font-black text-white/40 uppercase tracking-tighter group-hover:text-white transition-colors">ADVERTISING SPACE AVAILABLE</h3>
           <p className="hidden md:block text-pink-500 text-[8px] font-black uppercase tracking-[0.4em] opacity-60 group-hover:opacity-100 transition-colors">SECURE THIS BANNER SLOT (${SIDEBAR_PRICE_USD})</p>
        </div>
      </div>
    </div>
  );
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
        {coins.filter(c => c.placement === 'standard').map((coin) => (
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
              {coin.imageUrl ? <img src={coin.imageUrl} className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622630998477-00aa196902ec?auto=format&fit=crop&q=80&w=1000'} /> : <span className="text-2xl font-black text-zinc-700">{coin.ticker[0]}</span>}
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
        ))}
        {coins.filter(c => c.placement === 'standard').length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-zinc-900 rounded-[2.5rem] text-zinc-700 font-black uppercase tracking-[0.4em] text-xs">Waiting for incoming runners...</div>
        )}
      </div>
    </div>
  </section>
);

const PromotionModal = ({ isOpen, onClose, onFinish, initialPlacement = 'standard' }: { isOpen: boolean, onClose: () => void, onFinish: (coin: MemeCoin) => void, initialPlacement?: AdPlacement }) => {
  const [step, setStep] = useState<PromotionStatus>(PromotionStatus.IDLE);
  const [placement, setPlacement] = useState<AdPlacement>(initialPlacement);
  const [hasCopied, setHasCopied] = useState(false);
  const [txid, setTxid] = useState('');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', ticker: '', website: '', description: '', imageUrl: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const LOG_MESSAGES = [
    "Establishing connection to Bitcoin Mainnet...",
    "Querying mempool for TXID: ",
    "Checking block height 845,412...",
    "Synchronizing with decentralized nodes...",
    "Validating transaction weight and fees...",
    "Matching address hash: " + BTC_ADDRESS,
    "Verifying output script integrity...",
    "Confirming sufficient listing fee...",
    "Finalizing cryptographic validation..."
  ];

  useEffect(() => { 
    if (isOpen) { 
      setPlacement(initialPlacement); 
      setStep(PromotionStatus.IDLE); 
      setVerificationProgress(0);
      setTxid('');
      setTerminalLogs([]);
      setIsProcessing(false); 
      setHasCopied(false);
    } 
  }, [initialPlacement, isOpen]);

  useEffect(() => {
    if (step === PromotionStatus.VERIFYING) {
      let logIndex = 0;
      const interval = setInterval(() => {
        setVerificationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(PromotionStatus.SUBMITTING), 1000);
            return 100;
          }
          if (prev > (logIndex * (100 / LOG_MESSAGES.length))) {
            setTerminalLogs(cur => [...cur, LOG_MESSAGES[logIndex]]);
            logIndex++;
          }
          return prev + Math.random() * 8;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!isOpen) return null;

  const currentPrice = (placement === 'standard') ? PROMOTION_PRICE_USD : SIDEBAR_PRICE_USD;
  const btcEstimated = (currentPrice / 95000).toFixed(8);

  const handlePayClick = () => {
    const btcUri = `bitcoin:${BTC_ADDRESS}?amount=${btcEstimated}&label=MemeStarRunner%20Promotion`;
    window.location.href = btcUri;
    setStep(PromotionStatus.PAYING);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const startVerification = () => {
    if (txid.length < 32) {
      alert("Please enter a valid Transaction ID (TXID). This must be the 64-character hash provided by your wallet.");
      return;
    }
    setStep(PromotionStatus.VERIFYING);
  };

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
    setIsProcessing(true);
    try {
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
        setIsProcessing(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const isBanner = (placement !== 'standard');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative bg-[#0a0a0a] w-full max-md:max-h-[90vh] max-w-md border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(236,72,153,0.2)] flex flex-col">
        <div className="flex h-1.5 w-full bg-zinc-900 overflow-hidden">
           <div className="h-full bg-pink-500 transition-all duration-500 shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ width: `${(Object.values(PromotionStatus).indexOf(step) + 1) * (100 / Object.values(PromotionStatus).length)}%` }} />
        </div>

        <div className="overflow-y-auto custom-scrollbar">
          {step === PromotionStatus.IDLE && (
            <div className="p-10 text-center animate-in fade-in zoom-in-95 duration-300">
              <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter text-white">Choose Placement</h2>
              <div className="space-y-4 mb-10 text-left">
                <button onClick={() => setPlacement('standard')} className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${placement === 'standard' ? 'border-pink-500 bg-pink-500/5' : 'border-white/5 bg-black hover:border-white/20'}`}>
                  <div>
                    <div className="text-[10px] font-black uppercase text-zinc-500 mb-1">Standard listing</div>
                    <div className="text-xl font-black text-white uppercase tracking-tighter">Main Feed</div>
                  </div>
                  <div className={`text-xl font-black ${placement === 'standard' ? 'text-pink-500' : 'text-zinc-600'}`}>$1.00</div>
                </button>
                <button onClick={() => setPlacement('edge')} className={`w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${isBanner ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/5 bg-black hover:border-white/20'}`}>
                  <div>
                    <div className="text-[10px] font-black uppercase text-zinc-500 mb-1">Premium Banner</div>
                    <div className="text-xl font-black text-white uppercase tracking-tighter">Large Ad Slot</div>
                  </div>
                  <div className={`text-xl font-black ${isBanner ? 'text-cyan-400' : 'text-zinc-600'}`}>$15.00</div>
                </button>
              </div>
              <button onClick={handlePayClick} className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase transition-all hover:bg-cyan-400 shadow-xl flex items-center justify-center gap-3 active:scale-95">Continue to Payment <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}

          {step === PromotionStatus.PAYING && (
            <div className="p-10 text-center animate-in slide-in-from-right-8 duration-300">
               <div className="flex items-center justify-center gap-3 mb-8">
                  <Bitcoin className="w-8 h-8 text-orange-500 animate-pulse" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-white">BTC Payment</h2>
               </div>
               <div className="mb-10 p-8 bg-zinc-900/40 rounded-[2.5rem] border border-white/10 flex flex-col items-center space-y-6">
                  <div className="bg-white p-3 rounded-2xl shadow-2xl scale-110">
                     <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:${BTC_ADDRESS}?amount=${btcEstimated}`} alt="BTC QR Code" className="w-32 h-32" />
                  </div>
                  <div className="w-full space-y-4">
                    <div className="text-center">
                      <div className="text-[10px] font-black text-zinc-600 uppercase mb-1">Required Fee</div>
                      <div className="text-2xl font-black text-white">${currentPrice.toFixed(2)} USD</div>
                    </div>
                    <div className="w-full bg-black border border-white/5 rounded-2xl p-4 flex flex-col gap-2 relative group overflow-hidden">
                      <div className="flex items-center justify-between"><span className="text-[9px] font-black text-zinc-600 uppercase">Target Wallet</span>{hasCopied && <span className="text-[8px] font-black text-green-500 uppercase animate-bounce">Address Copied</span>}</div>
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="text-[10px] font-mono text-zinc-400 truncate text-left">{BTC_ADDRESS}</span>
                        <button onClick={copyAddress} className="p-2 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors text-orange-500 shrink-0"><Copy className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
               </div>
               <button onClick={() => setStep(PromotionStatus.PROOF_OF_PAYMENT)} className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase transition-all hover:bg-cyan-400 shadow-xl flex items-center justify-center gap-3">Verify My Transaction <ArrowRight className="w-4 h-4" /></button>
            </div>
          )}

          {step === PromotionStatus.PROOF_OF_PAYMENT && (
            <div className="p-10 text-center animate-in fade-in duration-300">
               <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-orange-500/20"><ShieldCheck className="w-8 h-8 text-orange-500" /></div>
               <h2 className="text-2xl font-black uppercase mb-4 tracking-tighter text-white">Proof of Payment</h2>
               <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-10 leading-relaxed">Enter your 64-character Bitcoin <br /> transaction hash (TXID) below.</p>
               <div className="space-y-6 mb-10">
                  <div className="relative">
                     <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                     <input required value={txid} onChange={e => setTxid(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-5 pl-12 focus:border-orange-500/50 outline-none text-zinc-300 font-mono text-[10px] shadow-inner" placeholder="TXID: 64 char hex hash..." />
                  </div>
                  <div className="p-5 bg-zinc-900/50 border border-white/5 rounded-2xl text-left flex gap-4">
                     <AlertCircle className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                     <p className="text-[9px] font-black text-zinc-600 uppercase leading-relaxed">False submissions will lead to a permanent IP ban from the Runner board. Ensure your transaction is visible on blockchain explorers.</p>
                  </div>
               </div>
               <button onClick={startVerification} className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase transition-all hover:bg-orange-500 shadow-xl flex items-center justify-center gap-3 active:scale-95">Initialize Node Scan <Rocket className="w-4 h-4" /></button>
            </div>
          )}

          {step === PromotionStatus.VERIFYING && (
            <div className="p-10 flex flex-col h-[600px] bg-black animate-in fade-in duration-500">
               <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
                  <Cpu className="w-6 h-6 text-cyan-400 animate-spin-slow" />
                  <div>
                     <h3 className="text-sm font-black uppercase text-white tracking-tighter">Blockchain Scanner</h3>
                     <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div><span className="text-[8px] font-black text-zinc-500 uppercase">Live Node Connection</span></div>
                  </div>
               </div>
               <div className="flex-grow font-mono text-[10px] space-y-2 overflow-y-auto custom-scrollbar pr-2 mb-8">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="flex gap-3 text-cyan-500/80"><span className="text-zinc-800 shrink-0">[{new Date().toLocaleTimeString()}]</span><span className="animate-in fade-in slide-in-from-left-2 duration-300">{log}</span></div>
                  ))}
                  <div className="flex gap-2 text-cyan-400 animate-pulse"><span className="text-zinc-800 shrink-0">[{new Date().toLocaleTimeString()}]</span><span>Processing hash: {txid.substring(0, 12)}...</span></div>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase mb-1"><span className="text-zinc-500">Mempool Scan Status</span><span className="text-cyan-400">{Math.round(verificationProgress)}%</span></div>
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/5">
                     <div className="bg-cyan-400 h-full transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ width: `${verificationProgress}%` }} />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                     <div className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-center"><Database className="w-3 h-3 text-zinc-700 mx-auto mb-1" /><div className="text-[7px] font-black text-zinc-500 uppercase">Blocks</div></div>
                     <div className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-center"><Network className="w-3 h-3 text-zinc-700 mx-auto mb-1" /><div className="text-[7px] font-black text-zinc-500 uppercase">Nodes</div></div>
                     <div className="p-3 bg-zinc-900/50 rounded-xl border border-white/5 text-center"><ShieldCheck className="w-3 h-3 text-zinc-700 mx-auto mb-1" /><div className="text-[7px] font-black text-zinc-500 uppercase">Weight</div></div>
                  </div>
               </div>
            </div>
          )}

          {step === PromotionStatus.SUBMITTING && (
            <form onSubmit={handleSubmit} className="p-10 max-h-[85vh] animate-in slide-in-from-bottom-8 duration-500">
              <div className="flex items-center justify-between mb-8">
                 <div><h2 className="text-2xl font-black uppercase tracking-tighter text-white">Project Specs</h2><p className="text-[9px] font-black text-zinc-500 uppercase mt-1">Verification Hash: {txid.substring(0, 12)}...</p></div>
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.1)]"><CheckCircle2 className="w-3 h-3 text-green-500" /><span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Verified</span></div>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-center mb-6">
                  <div onClick={() => fileInputRef.current?.click()} className={`rounded-[2.5rem] bg-black border-2 border-white/5 flex items-center justify-center cursor-pointer overflow-hidden hover:border-pink-500/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] group ${isBanner ? 'w-full h-40' : 'w-28 h-28'}`}>
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                         <Upload className="text-zinc-800 w-8 h-8 group-hover:text-pink-500 transition-colors" />
                         <span className="text-[8px] font-black text-zinc-700 uppercase">{isBanner ? 'Upload Picture Banner' : 'Project Logo'}</span>
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
                <div className="space-y-1.5"><label className="text-[10px] font-black text-zinc-600 uppercase ml-4 tracking-[0.1em]">Token Name</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-cyan-400/50 outline-none text-white text-sm font-bold shadow-inner" placeholder="E.g. Runner Coin" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-black text-zinc-600 uppercase ml-4 tracking-[0.1em]">Symbol</label><input required value={formData.ticker} onChange={e => setFormData({...formData, ticker: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-pink-500/50 outline-none text-pink-500 font-black uppercase text-sm tracking-[0.2em] shadow-inner" placeholder="$RUN" /></div>
                <div className="space-y-1.5"><label className="text-[10px] font-black text-zinc-600 uppercase ml-4 tracking-[0.1em]">Official URL</label><input required type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-white/30 outline-none text-white text-sm shadow-inner" placeholder="https://..." /></div>
              </div>
              <button type="submit" disabled={isProcessing} className={`w-full py-5 rounded-2xl font-black text-xs uppercase transition-all shadow-xl flex items-center justify-center gap-3 ${isProcessing ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-cyan-400'}`}>{isProcessing ? <>Syncing AI Node... <Loader2 className="w-4 h-4 animate-spin" /></> : <>Push to Runner Board <Rocket className="w-4 h-4" /></>}</button>
            </form>
          )}

          {step === PromotionStatus.SUCCESS && (
            <div className="p-16 text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-pink-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-pink-500 shadow-[0_0_60px_rgba(236,72,153,0.3)] border border-pink-500/20 animate-bounce"><CheckCircle2 className="w-10 h-10" /></div>
              <h3 className="text-3xl font-black uppercase mb-4 text-white tracking-tighter">Runner Deployed</h3>
              <p className="text-zinc-500 mb-10 text-sm font-medium leading-relaxed italic max-w-[240px] mx-auto">Deployment synchronized. Your project is now visible on the Meme-Star board. Listing expires in 24 hours.</p>
              <button onClick={onClose} className="w-full py-5 bg-white text-black font-black text-xs uppercase rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]">Return to Board</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [coins, setCoins] = useState<MemeCoin[]>(() => {
    const saved = localStorage.getItem('memestarrunner_listings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Deduplicate unique by ticker to avoid "three of the same kind" as requested
      const unique = Array.from(new Map(parsed.map((item: any) => [item.ticker, item])).values()) as MemeCoin[];
      return unique;
    }
    
    // Seed data with recognizable "trustworthy" coins as requested
    return [
      {
        id: 'pepe-seed',
        name: 'Pepe',
        ticker: 'PEPE',
        contractAddress: '',
        website: 'https://pepe.vip',
        description: 'The most memeable memecoin in existence. The dogs have had their day, it\'s time for Pepe to take reign.',
        imageUrl: 'https://images.unsplash.com/photo-1622630998477-00aa196902ec?auto=format&fit=crop&q=80&w=200',
        timestamp: Date.now(),
        placement: 'standard'
      },
      {
        id: 'doge-seed',
        name: 'Dogecoin',
        ticker: 'DOGE',
        contractAddress: '',
        website: 'https://dogecoin.com',
        description: 'The open-source peer-to-peer digital currency, favored by Shiba Inus worldwide.',
        imageUrl: 'https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?auto=format&fit=crop&q=80&w=200',
        timestamp: Date.now() - 3600000,
        placement: 'standard'
      }
    ];
  });
  
  const [modalState, setModalState] = useState<{ open: boolean, placement: AdPlacement }>({ open: false, placement: 'standard' });

  useEffect(() => {
    const sweep = () => {
      const now = Date.now();
      setCoins(prev => {
        const filtered = prev.filter(coin => {
          if (coin.placement === 'elite') return true;
          // Only expire standard listings
          if (coin.placement === 'standard') return (now - coin.timestamp) < LISTING_DURATION;
          return true;
        });
        localStorage.setItem('memestarrunner_listings', JSON.stringify(filtered));
        return filtered;
      });
    };

    const interval = setInterval(sweep, 60000);
    sweep();
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('memestarrunner_listings', JSON.stringify(coins));
  }, [coins]);

  const handlePromoteBanner = (p: AdPlacement) => setModalState({ open: true, placement: p });

  return (
    <div className="min-h-screen text-zinc-400 bg-transparent selection:bg-pink-500 selection:text-white pb-20">
      <div className="pt-4">
        <AdBannerSlot placement="top_banner" coins={coins} onPromote={handlePromoteBanner} />
      </div>
      
      <Header />
      
      <main className="max-w-4xl mx-auto">
        <Hero onStartPromotion={(p) => setModalState({ open: true, placement: p })} />
        
        <div className="py-6 border-t border-white/5">
          <AdBannerSlot placement="edge" coins={coins} onPromote={handlePromoteBanner} />
        </div>

        <ListingsFeed coins={coins} />
        
        <section className="mt-24 px-6">
          <div className="bg-zinc-900/60 border-2 border-white/5 rounded-[3rem] p-16 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-cyan-500/5"></div>
             <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-6 leading-tight tracking-tighter italic">Ready to <span className="text-pink-500">Run</span>?</h2>
                <p className="text-zinc-500 mb-12 text-lg max-w-sm mx-auto font-medium opacity-70">The community is waiting. Secure your placement for just ${PROMOTION_PRICE_USD.toFixed(2)} BTC today.</p>
                <button onClick={() => setModalState({ open: true, placement: 'standard' })} className="group relative bg-white text-black px-16 py-5 rounded-2xl font-black text-sm uppercase hover:bg-cyan-400 transition-all shadow-2xl hover:scale-105 active:scale-95 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                   PROMOTE NOW (${PROMOTION_PRICE_USD.toFixed(0)})
                </button>
             </div>
          </div>
        </section>

        <div className="mt-24 pb-12">
          <AdBannerSlot placement="bottom_banner" coins={coins} onPromote={handlePromoteBanner} />
        </div>
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/60 text-center relative overflow-hidden">
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

      <PromotionModal isOpen={modalState.open} onClose={() => setModalState({ ...modalState, open: false })} onFinish={(c) => {
        // Prevent double adding same ticker if user clicks too fast or refreshes
        setCoins(prev => {
          if (prev.find(existing => existing.ticker === c.ticker)) return prev;
          return [c, ...prev];
        });
      }} initialPlacement={modalState.placement} />

      <Analytics />
    </div>
  );
}