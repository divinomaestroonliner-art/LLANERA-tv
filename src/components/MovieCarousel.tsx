import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Movie, getImageUrl } from '../services/tmdb';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies, onMovieClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 md:px-6 space-y-4 relative group">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="relative group/carousel">
        {/* Left Arrow */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-r from-llano-black to-transparent pointer-events-none hidden md:block" />
        )}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-llano-black/80 backdrop-blur-md p-3 rounded-full border border-white/10 text-white hover:bg-llano-gold hover:text-llano-black transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-1 md:px-2"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05 }}
              className="flex-none w-40 md:w-48 space-y-2 cursor-pointer snap-start"
              onClick={() => onMovieClick(movie)}
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-lg relative group/item">
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-llano-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-llano-gold flex items-center justify-center scale-75 group-hover/item:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-llano-black fill-llano-black ml-1" />
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium line-clamp-1">{movie.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-l from-llano-black to-transparent pointer-events-none hidden md:block" />
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-llano-black/80 backdrop-blur-md p-3 rounded-full border border-white/10 text-white hover:bg-llano-gold hover:text-llano-black transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
};
