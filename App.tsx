
import React, { useState, useEffect } from 'react';
import { Rocket, Twitter, MessageCircle, Newspaper, Globe, Star, Zap, ChevronRight, CheckCircle2, Bitcoin, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { MemeCoin, PromotionStatus } from './types';
import { generateMoonCatchphrase } from './services/geminiService';

// --- Components ---

const Header = () => (
  <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-2 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <span className="pixel-font text-xs font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          STAR RUNNER
        </span>
      </div>
      <nav className="hidden md:flex gap-10 items-center">
        <a href="#how-it-works" className="text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-[0.4em] hover:tracking-[0.5em]">Protocol</a>
        <a href="#featured" className="text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-[0.4em] hover:tracking-[0.5em]">Runners</a>
        <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:border-purple-500/50">
          Subscribe Alpha
        </button>
      </nav>
    </div>
  </header>
);

const MemeStarLogo = () => {
  const [imgError, setImgError] = useState(false);
  const logoUrl = "https://storage.googleapis.com/cumulus-v1-prod-assets/output_fdfefc1d-1576-4be0-8334-972166663f73.png";

  return (
    <div className="relative flex flex-col items-center justify-center py-16 logo-bounce">
      {!imgError ? (
        <img 
          src={logoUrl} 
          alt="Meme Star Runner Logo" 
          className="w-full max-w-2xl drop-shadow-[0_0_80px_rgba(168,85,247,0.6)] relative z-20"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="relative flex flex-col items-center select-none scale-75 md:scale-100">
          <div className="absolute -top-20 w-80 h-80 rounded-full retro-sun blur-[2px] opacity-90"></div>
          <div className="relative z-10 text-center">
            <h2 className="marker-font text-8xl md:text-[10rem] italic leading-none mb-[-2.5rem] md:mb-[-4rem] text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-purple-800 drop-shadow-[0_0_30px_rgba(236,72,153,1)] rotate-[-4deg]">
              Meme-Star
            </h2>
            <h3 className="italic font-black text-7xl md:text-[9rem] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-blue-400 to-blue-700 drop-shadow-[0_0_40px_rgba(6,182,212,1)] skew-x-[-15deg]">
              RUNNER
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

const Hero = ({ onStartPromotion }: { onStartPromotion: () => void }) => (
  <section className="relative pt-10 pb-24 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
    <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.07] pointer-events-none"></div>
    <div className="bg-grid-floor"></div>
    <div className="scanline"></div>
    
    <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
      <MemeStarLogo />

      <div className="inline-flex items-center gap-4 bg-black/80 border border-purple-500/40 px-8 py-3 rounded-full mb-12 backdrop-blur-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
        <span className="text-[10px] md:text-xs font-black text-purple-100 uppercase tracking-[0.4em]">Propel Your Ticker for $1.00 BTC</span>
      </div>

      <p className="text-xl md:text-3xl text-zinc-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light italic">
        The ultimate <span className="text-white font-black border-b-2 border-pink-500 px-2">Launchpad</span> for coins destined to break the charts. No influencers. No fees. Just pure speed.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button 
          onClick={onStartPromotion}
          className="bg-white text-black px-14 py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-[0_30px_100px_rgba(255,255,255,0.2)] group"
        >
          INITIATE BURN <Rocket className="w-7 h-7 group-hover:rotate-12 group-hover:-translate-y-1 transition-all" />
        </button>
        <a href="#featured" className="text-white bg-zinc-900/60 border border-white/10 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all backdrop-blur-xl">
          View Live Feed
        </a>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="how-it-works" className="py-40 bg-black relative border-y border-white/5">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-16">
        {[
          {
            icon: <Globe className="w-10 h-10 text-cyan-400" />,
            title: "Network Nodes",
            desc: "Featured across our high-traffic terminal and satellite pages. 100% uptime for your mission."
          },
          {
            icon: <Twitter className="w-10 h-10 text-sky-400" />,
            title: "Social Overdrive",
            desc: "Instant syndication to our X, Telegram, and Discord hubs via the Star Runner API."
          },
          {
            icon: <Newspaper className="w-10 h-10 text-pink-400" />,
            title: "Degen Digest",
            desc: "Permanent inclusion in our 'Alpha Scan' newsletter sent to serious volume hunters."
          }
        ].map((feat, i) => (
          <div key={i} className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-[3rem] blur opacity-0 group-hover:opacity-10 transition duration-1000"></div>
            <div className="relative bg-zinc-950/50 border border-white/5 p-16 rounded-[2.5rem] h-full flex flex-col items-center text-center hover:border-white/10 transition-colors">
              <div className="mb-10 p-6 bg-black rounded-3xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-2xl font-black mb-5 uppercase tracking-tighter italic">{feat.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium text-lg italic">"{feat.desc}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PromotionBoard = ({ coins }: { coins: MemeCoin[] }) => (
  <section id="featured" className="py-40 relative overflow-hidden bg-[#020202]">
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
        <div>
          <h2 className="text-6xl font-black mb-4 italic tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600">The Runner Board</h2>
          <p className="text-zinc-500 font-bold text-xl italic tracking-tight">Active moon missions currently broadcasting through the Star Runner terminal.</p>
        </div>
        <div className="bg-zinc-900/40 px-8 py-4 rounded-[1.5rem] border border-white/10 backdrop-blur-md flex items-center gap-6">
          <span className="text-green-500 text-[10px] font-black animate-pulse flex items-center gap-4 tracking-[0.3em]">
            <span className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.8)]"></span> NETWORK: ONLINE
          </span>
          <div className="h-4 w-px bg-white/10"></div>
          <Activity className="w-5 h-5 text-zinc-500" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {coins.length === 0 ? (
          <div className="col-span-full py-48 text-center bg-zinc-950/20 border-2 border-dashed border-zinc-900 rounded-[4rem]">
            <Rocket className="w-20 h-20 text-zinc-800 mx-auto mb-8 opacity-10" />
            <p className="text-zinc-700 font-black text-2xl uppercase italic tracking-[0.5em]">No Missions In Progress</p>
          </div>
        ) : (
          coins.map((coin) => (
            <div key={coin.id} className="group relative bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-[3rem] overflow-hidden hover:translate-y-[-12px] transition-all duration-700 hover:shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
              <div className="absolute top-8 right-8 z-10">
                <div className="bg-purple-600/10 text-purple-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-purple-500/20 backdrop-blur-md">
                  HOT ASSET
                </div>
              </div>
              <div className="p-12">
                <div className="flex items-center gap-8 mb-10">
                  <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 flex items-center justify-center text-4xl font-black text-white shadow-[0_20px_50px_rgba(168,85,247,0.4)] transform group-hover:rotate-6 transition-transform">
                    {coin.ticker[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-3xl leading-none mb-3 italic uppercase">{coin.name}</h4>
                    <span className="text-pink-500 text-lg font-mono font-black tracking-tighter">${coin.ticker}</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-lg line-clamp-4 mb-12 h-28 leading-relaxed italic font-medium">
                  "{coin.description}"
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <a href={coin.website} target="_blank" className="bg-zinc-800/50 hover:bg-white hover:text-black p-5 rounded-2xl flex items-center justify-center transition-all group/btn">
                    <Globe className="w-7 h-7" />
                  </a>
                  {coin.twitter && (
                    <a href={coin.twitter} target="_blank" className="bg-zinc-800/50 hover:bg-sky-500 p-5 rounded-2xl flex items-center justify-center transition-all">
                      <Twitter className="w-7 h-7" />
                    </a>
                  )}
                  {coin.telegram && (
                    <a href={coin.telegram} target="_blank" className="bg-zinc-800/50 hover:bg-blue-500 p-5 rounded-2xl flex items-center justify-center transition-all">
                      <MessageCircle className="w-7 h-7" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-8 bg-black/80 border-t border-white/5 text-[11px] font-mono text-zinc-600 flex items-center justify-between">
                <span className="truncate pr-10 uppercase font-black tracking-tighter">CA: {coin.contractAddress}</span>
                <button className="text-purple-400 font-black hover:text-white transition-colors tracking-widest uppercase text-[10px]">VERIFY</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </section>
);

const PromotionModal = ({ isOpen, onClose, onFinish }: { isOpen: boolean, onClose: () => void, onFinish: (coin: MemeCoin) => void }) => {
  const [step, setStep] = useState<PromotionStatus>(PromotionStatus.IDLE);
  const [hasInitiatedPayment, setHasInitiatedPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: '', ticker: '', contract: '', website: '', twitter: '', telegram: '', description: ''
  });

  // Re-initialize Blockonomics if needed when modal opens
  useEffect(() => {
    if (isOpen && (window as any).Blockonomics) {
      // Standard Blockonomics pay_button.js script scans the DOM
      // No explicit init usually needed if the element exists on load, 
      // but some versions allow re-scanning.
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinueAfterPayment = () => setStep(PromotionStatus.SUBMITTING);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(PromotionStatus.SUBMITTING);
    const catchphrase = await generateMoonCatchphrase(formData.name, formData.ticker);
    
    const newCoin: MemeCoin = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      ticker: formData.ticker,
      contractAddress: formData.contract,
      website: formData.website,
      twitter: formData.twitter,
      telegram: formData.telegram,
      description: catchphrase + " " + formData.description,
      timestamp: Date.now()
    };

    setTimeout(() => {
      onFinish(newCoin);
      setStep(PromotionStatus.SUCCESS);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-[40px]" onClick={onClose}></div>
      <div className="relative bg-zinc-950 w-full max-w-2xl border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_40px_150px_rgba(0,0,0,1)]">
        
        {step === PromotionStatus.IDLE && (
          <div className="p-16">
            <h2 className="text-5xl font-black mb-4 italic tracking-tighter uppercase leading-none">Access Mission</h2>
            <p className="text-zinc-500 mb-12 text-xl font-medium italic">Broadcast your asset for $1.00 USD (Paid in BTC).</p>
            
            <div className="bg-black p-20 rounded-[3rem] text-center mb-12 border border-white/5 relative group flex flex-col items-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(247,147,26,0.15)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="mb-12 relative z-10" onClick={() => setHasInitiatedPayment(true)}>
                <a href="" className="blockoPayBtn" data-toggle="modal" data-uid="32a3fea8442c4112">
                  <img width="240" src="https://www.blockonomics.co/img/pay_with_bitcoin_medium.png" className="hover:scale-110 transition-transform active:scale-95 duration-500 drop-shadow-[0_0_20px_rgba(247,147,26,0.3)]" />
                </a>
              </div>

              {hasInitiatedPayment && (
                <button 
                  onClick={handleContinueAfterPayment}
                  className="w-full py-6 bg-purple-600/10 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-600/30 rounded-2xl font-black text-2xl transition-all flex items-center justify-center gap-4 group/btn relative z-10 shadow-2xl"
                >
                  TRANSACTION BROADCASTED <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              )}
              
              <p className="mt-8 text-[11px] text-zinc-700 font-mono tracking-[0.5em] uppercase font-bold italic z-10">Secured via Blockonomics Protocol</p>
            </div>
            
            <button onClick={onClose} className="w-full text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-[0.5em] transition-colors italic">Abort Launch Cycle</button>
          </div>
        )}

        {step === PromotionStatus.SUBMITTING && (
          <form onSubmit={handleSubmit} className="p-16 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">Payload Configuration</h2>
              <div className="bg-green-500/10 text-green-500 px-6 py-2 rounded-full text-[11px] font-black tracking-[0.2em] border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                FUEL DETECTED
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-10 mb-12">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em] italic">Ticker Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-6 focus:border-purple-600 outline-none transition-all text-white font-black text-xl italic" placeholder="GALAXY" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em] italic">$Ticker</label>
                <input required value={formData.ticker} onChange={e => setFormData({...formData, ticker: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-6 focus:border-purple-600 outline-none transition-all text-white font-black text-xl italic" placeholder="GALX" />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em] italic">Network ID (Contract)</label>
                <input required value={formData.contract} onChange={e => setFormData({...formData, contract: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-6 focus:border-cyan-500 outline-none transition-all font-mono text-base text-cyan-400" placeholder="0x..." />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em] italic">Orbital Portal (Web)</label>
                <input required value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-6 focus:border-purple-600 outline-none transition-all text-white font-bold" placeholder="https://..." />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em] italic">Social Uplink (X)</label>
                <input value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-6 focus:border-purple-600 outline-none transition-all text-white font-bold" placeholder="@ticker" />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em] italic">The Degen Thesis</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-6 focus:border-pink-500 outline-none transition-all h-40 resize-none text-white italic text-lg leading-relaxed" placeholder="Why are you going to the moon? Give us the alpha..."></textarea>
              </div>
            </div>

            <button type="submit" className="w-full py-8 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white font-black text-3xl rounded-3xl transition-all shadow-[0_20px_80px_rgba(168,85,247,0.5)] transform hover:scale-[1.02] active:scale-95 italic">
              ENGAGE HYPERDRIVE ⚡
            </button>
          </form>
        )}

        {step === PromotionStatus.SUCCESS && (
          <div className="p-32 text-center">
            <div className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-12 text-green-500 shadow-[0_0_80px_rgba(34,197,94,0.3)] border border-green-500/20">
              <ShieldCheck className="w-20 h-20" />
            </div>
            <h3 className="text-6xl font-black italic tracking-tighter mb-8 uppercase leading-none">MISSION LIVE</h3>
            <p className="text-zinc-500 font-bold mb-16 text-2xl italic leading-relaxed max-w-sm mx-auto">Your asset is now streaming across the Star Runner infrastructure.</p>
            <button 
              onClick={onClose}
              className="px-20 py-6 bg-white text-black font-black text-2xl rounded-3xl hover:bg-zinc-100 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
            >
              RETURN TO DECK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [coins, setCoins] = useState<MemeCoin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCoins([
      {
        id: '1',
        name: 'Doge Overdrive',
        ticker: 'DOVER',
        contractAddress: '0x382...772',
        website: '#',
        description: 'Breaking the sound barrier of the meme economy. 🏎️ Maximum velocity doge with built-in rewards.',
        timestamp: Date.now() - 1800000
      },
      {
        id: '2',
        name: 'Neon Pepe',
        ticker: 'NPEPE',
        contractAddress: '0x992...11a',
        website: '#',
        description: 'Pepe has ascended to the neon dimension. 🔋 Fully audited, degen verified, moon-bound technology.',
        timestamp: Date.now() - 5400000
      },
      {
        id: '3',
        name: 'Cyber Shibe',
        ticker: 'CSHIBE',
        contractAddress: '0xfe8...283',
        website: '#',
        description: 'The cybernetic evolution of the shiba inu. 🦾 Holding until 2077 and beyond. Join the collective.',
        timestamp: Date.now() - 8600000
      }
    ]);
  }, []);

  const handleFinishPromotion = (newCoin: MemeCoin) => {
    setCoins(prev => [newCoin, ...prev]);
  };

  return (
    <div className="min-h-screen selection:bg-purple-600 selection:text-white overflow-x-hidden">
      <Header />
      
      <main>
        <Hero onStartPromotion={() => setIsModalOpen(true)} />
        
        {/* Banner Ticker */}
        <div className="bg-gradient-to-r from-zinc-900 via-purple-900 to-zinc-900 py-5 overflow-hidden whitespace-nowrap border-y border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
          <div className="flex animate-scroll gap-16 text-white font-black pixel-font text-[10px] uppercase tracking-[0.2em] items-center italic">
            <span>$1 Promotion Active</span>
            <div className="w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]"></div>
            <span>High Volume Terminal</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
            <span>Syndicated Socials</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"></div>
            <span>Newsletter Inclusion</span>
            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
            <span>$1 Promotion Active</span>
            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
            <span>High Volume Terminal</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          </div>
        </div>

        <Features />
        <PromotionBoard coins={coins} />
        
        {/* CTA Bottom */}
        <section className="py-60 relative overflow-hidden bg-black text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.12)_0%,_transparent_65%)]"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-7xl md:text-[9rem] font-black italic tracking-tighter uppercase mb-12 leading-[0.75] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800">Runner<br/>Now.</h2>
            <p className="text-zinc-500 mb-20 text-3xl font-bold max-w-xl mx-auto italic tracking-tight">The industry's most cost-efficient blast. Don't let your moon mission wait.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-20 py-8 rounded-[3rem] font-black text-3xl shadow-[0_40px_120px_rgba(255,255,255,0.15)] transition-all transform hover:scale-110 active:scale-95 italic uppercase tracking-tighter"
            >
              LAUNCH FOR $1
            </button>
          </div>
        </section>
      </main>

      <footer className="py-32 border-t border-white/5 bg-[#020202]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-24 items-center">
          <div className="flex flex-col items-center md:items-start gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-purple-600 p-2.5 rounded-2xl shadow-xl">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="pixel-font text-[11px] font-bold text-zinc-500 tracking-[0.3em] uppercase">
                STAR RUNNER
              </span>
            </div>
            <p className="text-zinc-600 text-lg font-bold italic text-center md:text-left leading-relaxed">Fueling the next generation of meme wealth acceleration.</p>
          </div>
          
          <div className="flex gap-12 justify-center">
            <a href="#" className="text-zinc-700 hover:text-white transition-all transform hover:scale-150 hover:rotate-12"><Twitter className="w-8 h-8" /></a>
            <a href="#" className="text-zinc-700 hover:text-white transition-all transform hover:scale-150 hover:rotate-12"><MessageCircle className="w-8 h-8" /></a>
            <a href="#" className="text-zinc-700 hover:text-white transition-all transform hover:scale-150 hover:rotate-12"><Activity className="w-8 h-8" /></a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 font-mono">
            <p className="text-zinc-700 text-xs font-black tracking-[0.4em] uppercase italic">Deployed: Bitcoin Mainnet</p>
            <p className="text-zinc-800 text-[10px] uppercase font-bold">© 2025 Runner Labs Int.</p>
          </div>
        </div>
      </footer>

      <PromotionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onFinish={handleFinishPromotion} 
      />
    </div>
  );
}
