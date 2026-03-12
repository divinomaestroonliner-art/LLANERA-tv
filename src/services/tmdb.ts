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

export const getImageUrl = (path: string | null) => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}${path}`;
};

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  iframeUrl?: string;
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

export const SPECIAL_MOVIES: Movie[] = [
  {
    id: 999999,
    title: "Las aventuras de una Super Maestra (2018)",
    overview: "Una maestra excepcional vive aventuras inolvidables mientras inspira a sus alumnos.",
    poster_path: "https://m.media-amazon.com/images/S/pv-target-images/49f3bfb9077b0ce17d1f76a42f432c4ad7587841a9c6d353bf0f3dfee7bc8e5f.jpg",
    backdrop_path: "https://m.media-amazon.com/images/S/pv-target-images/49f3bfb9077b0ce17d1f76a42f432c4ad7587841a9c6d353bf0f3dfee7bc8e5f.jpg",
    vote_average: 8.5,
    release_date: "2018-01-01",
    genre_ids: [18, 35],
    iframeUrl: "https://drive.google.com/file/d/1H18TBMd6xifSrGSez4yZWIZqy7aozrce/preview"
  }
];
