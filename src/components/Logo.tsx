import React from 'react';
import { Play } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-6" }) => {
  return (
    <div className={`flex items-center gap-2 font-bold tracking-tighter ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-llano-gold to-llano-sunset shadow-lg shadow-llano-gold/20">
        {/* Harp/Sun stylized icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-5 h-5 border border-white rounded-full" />
          <div className="absolute w-0.5 h-5 bg-white rotate-45" />
          <div className="absolute w-0.5 h-5 bg-white -rotate-45" />
        </div>
        <Play className="w-4 h-4 text-llano-black fill-llano-black ml-0.5" />
      </div>
      <span className="text-xl">
        <span className="text-white">Llanera</span>
        <span className="text-llano-gold">TV+</span>
      </span>
    </div>
  );
};
