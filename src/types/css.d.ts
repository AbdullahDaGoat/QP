// src/types/css.d.ts
// Let TS accept any CSS import (e.g., 'swiper/css')
declare module '*.css';

// Be explicit for Swiper's CSS entrypoints (helps some TS configs)
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
