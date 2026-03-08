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
    name: 'Llanera TV+ Oficial',
    logo: 'https://picsum.photos/seed/llano1/200/200',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    description: 'El corazón del llano en vivo 24/7.',
    isPremium: false,
  },
  {
    id: 'joropo-vivo',
    name: 'Joropo Vivo',
    logo: 'https://picsum.photos/seed/llano2/200/200',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    description: 'Música, danza y tradición llanera.',
    isPremium: true,
  }
];
