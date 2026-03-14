import React from 'react';
import { Home, Tv, ShoppingBag, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'live', icon: Tv, label: 'En Vivo' },
    { id: 'store', icon: ShoppingBag, label: 'Tienda' },
    { id: 'search', icon: Search, label: 'Búsqueda' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-llano-black/80 backdrop-blur-xl border-t border-white/10 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors"
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? 'text-llano-gold' : 'text-white/40'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={isActive ? 'text-llano-gold' : 'text-white/40'}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-px left-1/4 right-1/4 h-0.5 bg-llano-gold rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
