import axios from 'axios';

const TMDB_API_KEY = process.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'es-ES',
  },
});

export const getImageUrl = (path: string | null) => 
  path ? `${IMAGE_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface TVChannel {
  id: string;
  name: string;
  logo: string;
  streamUrl: string;
  description: string;
  isPremium: boolean;
}

export const MOCK_CHANNELS: TVChannel[] = [
  {
    id: 'llanera-tv-plus',
    name: 'Llanera TV+',
    logo: 'https://picsum.photos/seed/llaneratv/800/450',
    streamUrl: 'https://tvspectro.moxapps.shop/live/22OeaFNKyCOwDoFdVOOAwrPDJkx1/index.m3u8',
    description: 'Tu ventana al mundo llanero. Música, cultura y tradiciones en vivo.',
    isPremium: false,
  },
  {
    id: 'joropo-estelar',
    name: 'Joropo Estelar',
    logo: 'https://picsum.photos/seed/joropo/800/450',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    description: 'Los grandes clásicos y las nuevas promesas del joropo.',
    isPremium: true,
  },
  {
    id: 'ecos-del-llano',
    name: 'Ecos del Llano',
    logo: 'https://picsum.photos/seed/nature/800/450',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    description: 'Naturaleza, leyendas y el alma de nuestra tierra.',
    isPremium: true,
  }
];
