import React, { useEffect, useRef, useState } from 'react';
import { Movie, getRecommendations } from '../services/tmdb';
import { useAuth } from '../contexts/AuthContext';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Play, RotateCcw, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  isFree?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose, onSelectMovie, isFree = false }) => {
  const { user } = useAuth();
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      const progressDocRef = doc(db, 'users', user.uid, 'progress', movie.id.toString());
      try {
        const progressDoc = await getDoc(progressDocRef);
        if (progressDoc.exists()) {
          setInitialTime(progressDoc.data().seconds);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();

    // Save progress periodically (simulated for iframe)
    const interval = setInterval(() => {
      // In a real scenario with a custom player, we'd get the actual time.
      // With an iframe, we can't easily get the current time of the video inside.
      // For this demo, we'll assume the user is watching and save a "last watched" timestamp.
      // If we had a real player SDK, we'd use player.getCurrentTime().
    }, 10000);

    return () => clearInterval(interval);
  }, [user, movie.id]);

  // Recommendations logic
  const recommendations = getRecommendations(movie);

  const handleClose = async () => {
    if (user) {
      try {
        const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
        const { db } = await import('../firebase');
        await setDoc(doc(db, 'playbackProgress', `${user.uid}_${movie.id}`), {
          userId: user.uid,
          movieId: movie.id,
          position: 300,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
    onClose();
  };

  if (loading) return <div className="flex items-center justify-center h-full">Cargando...</div>;

  return (
    <div className="relative w-full h-full bg-black">
      <iframe
        ref={iframeRef}
        src={`${movie.iframeUrl}${initialTime > 0 ? `&t=${initialTime}s` : ''}`}
        className="w-full h-full border-0"
        allowFullScreen
        onLoad={() => {
          // In a real app, we'd listen for the 'ended' event from the player SDK
          // For demo, we'll add a button to simulate "End of Movie"
        }}
      />
      
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all"
      >
        <ChevronRight className="w-6 h-6 rotate-180" />
      </button>

      {/* Simulation of "End of Movie" for demo purposes */}
      <button 
        onClick={() => setShowRecommendations(true)}
        className="absolute bottom-4 right-4 bg-yellow-500 text-black text-xs font-bold py-1 px-3 rounded-full opacity-50 hover:opacity-100 transition-opacity"
      >
        Simular Fin de Película
      </button>

      <AnimatePresence>
        {showRecommendations && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-8">¿Qué ver a continuación?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
              {recommendations.map(rec => (
                <motion.div 
                  key={rec.id}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer group"
                  onClick={() => {
                    setShowRecommendations(false);
                    onSelectMovie(rec);
                  }}
                >
                  <div className="aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-2xl">
                    <img 
                      src={rec.poster_path} 
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-white text-sm font-medium truncate">{rec.title}</p>
                </motion.div>
              ))}
            </div>
            <button 
              onClick={() => setShowRecommendations(false)}
              className="mt-12 text-gray-400 hover:text-white transition-colors"
            >
              Cerrar Recomendaciones
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
