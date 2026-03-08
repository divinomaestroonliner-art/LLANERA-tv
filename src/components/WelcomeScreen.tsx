import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const WelcomeScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onAnimationComplete={(definition) => {
        // This is just for the exit animation, but we'll use a timeout in App.tsx
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#001233] overflow-hidden"
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
        {/* Responsive Logo - Moves from Left to Right */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF8C00] shadow-2xl shadow-yellow-500/20"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-12 h-12 md:w-18 md:h-18 border-2 md:border-4 border-white rounded-full" />
            <div className="absolute w-0.5 md:w-1 h-12 md:h-18 bg-white rotate-45" />
            <div className="absolute w-0.5 md:w-1 h-12 md:h-18 bg-white -rotate-45" />
          </div>
          <Play className="w-10 h-10 md:w-14 md:h-14 text-[#0A0A0A] fill-[#0A0A0A] ml-1" />
        </motion.div>

        {/* App Name - Moves from Right to Left */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
            <span className="text-white block md:inline">LLANERA</span>
            <span className="text-[#FFD700] block md:inline md:ml-4">TV+</span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-blue-200/60 mt-4 text-lg md:text-2xl font-medium tracking-widest uppercase"
          >
            El alma del llano en tu pantalla
          </motion.p>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 3 }}
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500 rounded-full blur-[120px]"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 3 }}
        className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"
      />
    </motion.div>
  );
};
