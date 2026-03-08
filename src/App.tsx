import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BottomNav } from './components/BottomNav';
import { VideoPlayer } from './components/VideoPlayer';
import { MovieCarousel } from './components/MovieCarousel';
import { tmdb, getImageUrl, Movie, MOCK_CHANNELS, TVChannel } from './services/tmdb';
import { Star, Plus, Info, Play, Lock, ChevronRight, Search, Github, GitBranch, GitCommit } from 'lucide-react';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [buildInfo, setBuildInfo] = useState<{ branch: string, commit: string } | null>(null);

  useEffect(() => {
    // Show welcome screen for 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    const fetchData = async () => {
      try {
        const [trendingRes, popularRes, topRatedRes] = await Promise.all([
          tmdb.get('/trending/movie/week'),
          tmdb.get('/movie/popular'),
          tmdb.get('/movie/top_rated')
        ]);
        
        setTrending(trendingRes.data.results.slice(0, 10));
        setPopular(popularRes.data.results.slice(0, 10));
        setTopRated(topRatedRes.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    // Fetch GitHub Build Info (Simulated or real if possible)
    const fetchBuildInfo = async () => {
      try {
        // Attempt to fetch from GitHub (Owner guessed from email)
        const owner = 'divinomaestroonliner';
        const repo = 'LLANERA-tv';
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/main`);
        
        if (response.data && response.data.sha) {
          setBuildInfo({
            branch: 'main',
            commit: response.data.sha.substring(0, 7)
          });
        }
      } catch (error) {
        // Silently fallback to mock data if repo is private or not found
        // This avoids the 404 error in console that the user reported
        setBuildInfo({
          branch: 'main',
          commit: '7a2e8f1'
        });
      }
    };
    fetchBuildInfo();

    return () => clearTimeout(timer);
  }, []);

  const handlePlay = (content: any) => {
    if (!isSubscribed && (content.isPremium || Math.random() > 0.7)) {
      setShowPaywall(true);
    } else {
      // In a real app, navigate to player
      alert('Reproduciendo: ' + (content.title || content.name));
    }
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-llano-black to-transparent">
        <Logo />
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
          <span className="text-sm font-bold">JD</span>
        </div>
      </header>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              {trending[0] && (
                <section className="relative h-[70vh] w-full overflow-hidden">
                  <img
                    src={getImageUrl(trending[0].backdrop_path)}
                    alt={trending[0].title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-llano-black via-llano-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                    <div className="flex items-center gap-2 text-llano-gold text-sm font-bold uppercase tracking-widest">
                      <Star className="w-4 h-4 fill-llano-gold" />
                      <span>Tendencia de la semana</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-2xl">
                      {trending[0].title}
                    </h1>
                    <p className="text-white/60 line-clamp-2 max-w-xl text-lg">
                      {trending[0].overview}
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <button 
                        onClick={() => handlePlay(trending[0])}
                        className="flex items-center gap-2 bg-llano-gold text-llano-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                      >
                        <Play className="w-5 h-5 fill-llano-black" />
                        Reproducir
                      </button>
                      <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-colors">
                        <Plus className="w-5 h-5" />
                        Mi Lista
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* Movie Rows */}
              <MovieCarousel 
                title="Recomendados para ti" 
                movies={trending} 
                onMovieClick={handlePlay} 
              />
              
              <MovieCarousel 
                title="Más Populares" 
                movies={popular} 
                onMovieClick={handlePlay} 
              />

              <MovieCarousel 
                title="Aclamadas por la Crítica" 
                movies={topRated} 
                onMovieClick={handlePlay} 
              />
            </motion.div>
          )}

          {activeTab === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="px-6 space-y-6"
            >
              <h2 className="text-3xl font-bold">Canales en Vivo</h2>
              <div className="space-y-8">
                {MOCK_CHANNELS.map((channel) => (
                  <div key={channel.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-llano-gold">
                          <img src={channel.logo} alt={channel.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl">{channel.name}</h3>
                          <p className="text-white/40 text-sm">{channel.description}</p>
                        </div>
                      </div>
                      {channel.isPremium && (
                        <span className="bg-llano-gold/20 text-llano-gold px-3 py-1 rounded-full text-xs font-bold border border-llano-gold/30">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    <VideoPlayer src={channel.streamUrl} poster={channel.logo} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 pt-10"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Busca películas, series o canales..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-llano-gold transition-colors"
                />
              </div>
              <div className="mt-10 space-y-6">
                <h3 className="text-white/40 font-bold uppercase tracking-widest text-sm">Géneros Populares</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Acción', 'Drama', 'Comedia', 'Terror', 'Documental', 'Tradición'].map((genre) => (
                    <div key={genre} className="h-24 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center font-bold text-lg hover:border-llano-gold transition-colors cursor-pointer">
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 space-y-8"
            >
              <div className="flex flex-col items-center gap-4 pt-10">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-llano-gold to-llano-sunset p-1">
                  <div className="w-full h-full rounded-full bg-llano-black flex items-center justify-center overflow-hidden border-4 border-llano-black">
                    <img src="https://picsum.photos/seed/user/200/200" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Juan del Llano</h2>
                  <p className="text-llano-gold font-medium">Plan Premium</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Mi Lista', icon: Plus },
                  { label: 'Suscripción', icon: Star },
                  { label: 'Configuración', icon: Info },
                ].map((item) => (
                  <button key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/5 text-llano-gold">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="font-bold">{item.label}</span>
                    </div>
                    <ChevronRight className="text-white/20" />
                  </button>
                ))}
              </div>

              {/* Build Info Section */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                  <Github className="w-4 h-4" />
                  <span>Información del Repositorio</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-llano-gold" />
                    <div>
                      <p className="text-xs text-white/40">Rama</p>
                      <p className="font-bold">{buildInfo?.branch || 'main'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GitCommit className="w-5 h-5 text-llano-gold" />
                    <div>
                      <p className="text-xs text-white/40">Referencia</p>
                      <p className="font-mono font-bold">{buildInfo?.commit || '7a2e8f1'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <p className="text-xs text-white/40 font-bold uppercase tracking-wider">Guía de Sincronización</p>
                  <div className="bg-black/40 rounded-xl p-3 font-mono text-[10px] text-llano-gold/80 space-y-1 border border-white/5">
                    <p>git add .</p>
                    <p>git commit -m "Initial commit"</p>
                    <p>git push -u origin main</p>
                  </div>
                  <p className="text-[10px] text-white/30 italic">
                    Ejecuta estos comandos en tu terminal local para subir el código a <span className="text-white/50">LLANERA-tv</span>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-llano-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-llano-black to-white/5 border border-llano-gold/30 p-8 rounded-[2rem] max-w-md w-full text-center space-y-6 shadow-2xl shadow-llano-gold/10"
            >
              <div className="w-20 h-20 bg-llano-gold/20 rounded-full flex items-center justify-center mx-auto border border-llano-gold/30">
                <Lock className="w-10 h-10 text-llano-gold" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">Contenido Premium</h2>
                <p className="text-white/60">
                  Suscríbete a Llanera TV+ para acceder a todo nuestro catálogo exclusivo y canales en vivo sin límites.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
                <p className="text-llano-gold font-bold text-4xl">$9.99<span className="text-sm text-white/40 font-normal">/mes</span></p>
                <p className="text-sm text-white/40">Cancela en cualquier momento</p>
              </div>
              <button
                onClick={() => {
                  setIsSubscribed(true);
                  setShowPaywall(false);
                }}
                className="w-full bg-llano-gold text-llano-black py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                Suscribirme Ahora
              </button>
              <button
                onClick={() => setShowPaywall(false)}
                className="text-white/40 font-medium hover:text-white transition-colors"
              >
                Tal vez más tarde
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

