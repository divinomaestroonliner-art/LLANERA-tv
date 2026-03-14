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
  type: 'movie' | 'series';
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
    isPremium: false,
  },
  {
    id: 'ecos-del-llano',
    name: 'Ecos del Llano',
    logo: 'https://picsum.photos/seed/nature/800/450',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    description: 'Naturaleza, leyendas y el alma de nuestra tierra.',
    isPremium: false,
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
    iframeUrl: "https://drive.google.com/file/d/1H18TBMd6xifSrGSez4yZWIZqy7aozrce/preview",
    type: 'movie'
  },
  {
    id: 999998,
    title: "El príncipe encantador (2018)",
    overview: "Un príncipe encantador debe encontrar a su verdadero amor antes de que se agote el tiempo.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BNDViY2E4MmEtZTQ4Ny00N2IxLWIxZmUtODYzOWYzMjc3OGI4XkEyXkFqcGc@._V1_.jpg",
    backdrop_path: "https://m.media-amazon.com/images/M/MV5BNDViY2E4MmEtZTQ4Ny00N2IxLWIxZmUtODYzOWYzMjc3OGI4XkEyXkFqcGc@._V1_.jpg",
    vote_average: 7.8,
    release_date: "2018-01-01",
    genre_ids: [16, 35, 10751],
    iframeUrl: "https://drive.google.com/file/d/1zyDyWJbhL7gBJII0yFrLTOy2idgXBZOI/preview",
    type: 'movie'
  },
  {
    id: 999997,
    title: "Rey león 2019",
    overview: "Tras el asesinato de su padre, un joven león huye de su reino para aprender el verdadero significado de la responsabilidad y la valentía.",
    poster_path: "https://lumiere-a.akamaihd.net/v1/images/image_8b5ca578.jpeg",
    backdrop_path: "https://lumiere-a.akamaihd.net/v1/images/image_8b5ca578.jpeg",
    vote_average: 8.0,
    release_date: "2019-07-19",
    genre_ids: [12, 10751, 18],
    iframeUrl: "https://drive.google.com/file/d/1aE9KiO9galocFkkDtajFMNq6V0Q4pEUw/preview",
    type: 'movie'
  },
  {
    id: 999996,
    title: "Mi mascota es un León (2018)",
    overview: "Una joven entabla una amistad inusual con un león blanco y lucha por protegerlo de los cazadores.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BNjVlZjVhNjctMTFhYi00YzM5LThjNTctNGExMTlkZTFkOTQ1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backdrop_path: "https://m.media-amazon.com/images/M/MV5BNjVlZjVhNjctMTFhYi00YzM5LThjNTctNGExMTlkZTFkOTQ1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    vote_average: 7.5,
    release_date: "2018-12-26",
    genre_ids: [12, 18, 10751],
    iframeUrl: "https://drive.google.com/file/d/1dgHVRLqCPs1BE-yhUjziEdll2-7r4cTk/preview",
    type: 'movie'
  },
  {
    id: 999995,
    title: "Cuentos que no son cuento (2008)",
    overview: "La vida de un botones de hotel cambia para siempre cuando los cuentos que les cuenta a sus sobrinos empiezan a hacerse realidad.",
    poster_path: "https://play-lh.googleusercontent.com/AAcmT65Ri3uz_ADH4xkq7q48kGpICw2Oj4YzsHDRkt_YzYtfwyQJ-VOtnE8rXmo0A6Un",
    backdrop_path: "https://play-lh.googleusercontent.com/AAcmT65Ri3uz_ADH4xkq7q48kGpICw2Oj4YzsHDRkt_YzYtfwyQJ-VOtnE8rXmo0A6Un",
    vote_average: 6.1,
    release_date: "2008-12-24",
    genre_ids: [14, 35, 10751],
    iframeUrl: "https://drive.google.com/file/d/1M2ibQsokuJSq3cziR3sHV06JnayF8KHn/preview",
    type: 'movie'
  },
  {
    id: 999994,
    title: "El pianista (2002)",
    overview: "Un brillante pianista polaco de origen judío vive en el gueto de Varsovia durante la Segunda Guerra Mundial.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BMjEwNmEwYjgtNTk3ZC00NjljLTg5ZDctZTY3ZGQwZjRkZmQxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backdrop_path: "https://m.media-amazon.com/images/M/MV5BMjEwNmEwYjgtNTk3ZC00NjljLTg5ZDctZTY3ZGQwZjRkZmQxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    vote_average: 8.5,
    release_date: "2002-05-24",
    genre_ids: [18, 36, 10752],
    iframeUrl: "https://drive.google.com/file/d/1rYTrumLCagmK18SW4wRSlh5-riPiGD78/preview",
    type: 'movie'
  },
  {
    id: 999993,
    title: "Aladdin (2019)",
    overview: "Un joven callejero de buen corazón y un visir hambriento de poder compiten por una lámpara mágica que tiene el poder de hacer realidad sus deseos más profundos.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BZDVjNzBkOGUtZTE4NS00OWMxLWE5ODktMTNkNDgwYzNhNjg4XkEyXkFqcGc@._V1_.jpg",
    backdrop_path: "https://m.media-amazon.com/images/M/MV5BZDVjNzBkOGUtZTE4NS00OWMxLWE5ODktMTNkNDgwYzNhNjg4XkEyXkFqcGc@._V1_.jpg",
    vote_average: 7.1,
    release_date: "2019-05-22",
    genre_ids: [12, 14, 10751, 35, 10749],
    iframeUrl: "https://drive.google.com/file/d/1YoC5URIipY3qVEWC_GSv7DCwaEAu2Tx-/preview",
    type: 'movie'
  }
];

export const getRecommendations = (currentMovie: Movie): Movie[] => {
  return SPECIAL_MOVIES.filter(m => 
    m.id !== currentMovie.id && 
    m.genre_ids.some(id => currentMovie.genre_ids.includes(id))
  ).slice(0, 4);
};

