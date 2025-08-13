/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Utensils, Users, Images, MapPin, Clock, ChevronDown, ChevronLeft, ChevronRight,
  Maximize2, Grid, Sun, Moon, History, Target,
  Instagram, Facebook
} from 'lucide-react';
import { cn } from './utils/cn';
import Typewriter from 'typewriter-effect';
import Tilt from 'react-parallax-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwpNav, Pagination as SwpPag, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* -----------------------------
   Content / constants
----------------------------- */

const NAV = [
  { id: 'home',   label: 'Home',   icon: Home },
  { id: 'menu',   label: 'Menu',   icon: Utensils },
  { id: 'about',  label: 'About',  icon: Users },
  { id: 'photos', label: 'Photos', icon: Images },
];

const MENU_IMAGES = {
  drinks: [
    'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/Final-DRINK-MENU1-aa3e42d9.png',
    'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/Final-DRINK-MENU2-0578eabf.png',
  ],
  food: [
    'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/final-FOOD-MENUS-4-f3cdc2c2.png',
    'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/final-FOOD-MENUS-5-96f05ae0.png',
  ],
} as const;

const STAFF_DIRECTORY = [
  {
    name: 'Tina Scott',
    position: 'Logistics & Staff Relations',
    email: 'qpr.logistics@AMS.QUEENSU.CA',
    image: 'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/MAY2025-Website-Wire-Frame-2-e0659cf3.png',
  },
  {
    name: 'Greyson Martyn',
    position: 'Head Manager',
    email: 'qpr@ams.queensu.ca',
    image: 'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/MAY2025-Website-Wire-Frame-3-dffcd1b4.png',
  },
  {
    name: 'Avery Papoulidis',
    position: 'Marketing & Events',
    email: 'qpr.marketing@AMS.QUEENSU.CA',
    image: 'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/MAY2025-Website-Wire-Frame-4-af801bc8.png',
  },
  { name: 'Jordan East', position: 'Restaurant Manager', email: 'qprmanager@AMS.QUEENSU.CA' },
  { name: 'Rick Doucett', position: 'Head Chef', email: 'qprchef@AMS.QUEENSU.CA' },
];

const STAFF_IMAGES = [
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/DSC4569-1-65e889fb.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/DSC4681-1-scaled-d50eb20d.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/DSC4748-scaled-14214344.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/DSC01061-scaled-d31e594f.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0277-2-scaled-8c69c9c1.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0295-scaled-71f4af6f.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0291-scaled-1f1b61df.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/DSC01069-1-scaled-4ae30e8c.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0284-2-scaled-065508b0.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0307-2-scaled-aa1226d3.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0301-2-scaled-77b08114.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0298-2-scaled-67c4e8c9.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_0293-scaled-a0e18cc6.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/IMG_8796-2-scaled-bce4206c.jpeg',
];

const HERO_BANNER = 'https://thequeenspub.ca//wp-content/themes/yootheme/cache/qp-banner-bf9c8d9c.jpeg';
const FRIENDS_IMAGE = 'https://thequeenspub.ca//wp-content/themes/yootheme/cache/Copy-of-MAY2025-Website-Wire-Frame-f103def0.png';
const QP_LOGO = 'https://www.thequeenspub.ca/wp-content/uploads/2024/06/qp-logo.png';
const AMS_LOGO = 'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/AMS-Colour-White-White-c4c5f447.png';

const HISTORY_IMAGES = [
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/old-school-ea311f9a.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/bartenders-8728a012.png',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/alum-b3cc68c1.jpeg',
  'https://www.thequeenspub.ca/wp-content/themes/yootheme/cache/alfie-e1733763603620-ec8a8e2c.png',
];

/* -----------------------------
   Hooks: theme, scroll dir
----------------------------- */

function useThemeBlanket() {
  // Default to DARK as primary on first load
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = (localStorage.getItem('theme') as 'light' | 'dark' | null) || null;
    return stored ?? 'dark';
  });
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => {
    setAnimating(true);
    setTimeout(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), 150);
    setTimeout(() => setAnimating(false), 350);
  };
  return { theme, toggle, animating };
}

function useScrollDirection() {
  const [dir, setDir] = useState<'up' | 'down'>('up');
  const prev = useRef(0);
  const ticking = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const d = y - prev.current;
        if (Math.abs(d) > 6) setDir(d > 0 && y > 50 ? 'down' : 'up');
        prev.current = y;
        ticking.current = false;
      });
      ticking.current = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return dir;
}

/* -----------------------------
   Navigation with measured highlight (no misalignment)
----------------------------- */
const Navigation: React.FC<{ active: string; onJump: (id: string) => void }> = ({ active, onJump }) => {
  const dir = useScrollDirection();
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [hl, setHl] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const measure = React.useCallback(() => {
  const i = NAV.findIndex(n => n.id === active);
  const el = btnRefs.current[i];
  if (!el) return;
  const { offsetLeft: left, offsetWidth: width } = el;
  setHl({ left, width });
}, [active]);

useLayoutEffect(() => { measure(); }, [measure]);

useEffect(() => {
  const onResize = () => measure();
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, [measure]);

  const Desktop = (
    <motion.nav
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-40 px-2 py-2 rounded-full glass shadow-2xl backdrop-saturate-150"
    >
      <div className="relative flex gap-1">
        <motion.div
          className="absolute top-1 bottom-1 rounded-full"
          animate={{ left: hl.left, width: hl.width }}
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          style={{ background: 'rgba(245,158,11,0.18)' }}
        />
        {NAV.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => { btnRefs.current[i] = el; }}
              onClick={() => onJump(item.id)}
              className={cn(
                'relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors cursor-pointer',
                isActive ? 'text-amber-600 dark:text-amber-400' : 'hover:opacity-80'
                )}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );

  const Mobile = (
    <AnimatePresence>
      {(dir === 'up' || window.scrollY < 50) && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 26 }}
          className="md:hidden fixed bottom-6 left-6 right-6 z-40 px-4 py-3 rounded-2xl shadow-2xl backdrop-saturate-150"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <div className="flex justify-around items-center">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onJump(item.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all',
                    isActive ? 'text-amber-500' : 'text-gray-800'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive && 'animate-bounce')} />
                  <span className="text-xs font-semibold xs:inline">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );

  return (<>{Desktop}{Mobile}</>);
};

/* -----------------------------
   Active-section tracker (robust)
----------------------------- */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.25, 0.5, 0.75] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  // quick scroll fallback
  useEffect(() => {
    const onScroll = () => {
      const y = window.innerHeight * 0.35;
      let best: { id: string; dist: number } | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top - y);
        if (!best || d < best.dist) best = { id, dist: d };
      }
      if (best) setActive(best.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);

  return active;
}

/* -----------------------------
   Sections
----------------------------- */

const Hero: React.FC = () => {
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24">
      {/* Banner bg */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${HERO_BANNER})`, filter: 'blur(6px)', transform: 'scale(1.05)' }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-white/50 dark:from-black/50 dark:to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* EST chip moved further down so navbar never covers it */}
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} className="inline-block">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-10 mt-24 px-6 py-3 rounded-full glass-heavy"
          >
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">EST. 1978 • QUEEN&apos;S PUB &amp; RESTAURANT</p>
          </motion.div>
        </Tilt>

        <h1 className="text-7xl md:text-9xl font-black mb-6 leading-tight">
          <span className="text-gradient">Queen&apos;s</span><br />
          <span className="text-gray-900 dark:text-gray-100">Pub &amp; Restaurant</span>
        </h1>

        {/* QP logo */}
        <div className="flex justify-center mb-8">
          <img src={QP_LOGO} alt="Queen's Pub Logo" className="h-14 w-auto opacity-90" />
        </div>

        <div className="text-3xl md:text-5xl font-bold mb-10 h-20">
          <Typewriter
            options={{
              strings: ["we're so back.", 'your campus home.', 'where legends meet.', "tradition since '78."],
              autoStart: true, loop: true, deleteSpeed: 50, delay: 80
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16"
        >
          <div className="flex items-center gap-2 px-6 py-3 rounded-full glass">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span className="font-medium">99 University Ave (JDUC)</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full glass">
            <Clock className="w-5 h-5 text-amber-500" />
            <span className="font-medium">Open Daily 11:00–21:00</span>
          </div>
        </motion.div>

        {/* Chevron lowered to avoid overlap */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-amber-500" />
        </motion.div>
      </div>
    </section>
  );
};

const Menu: React.FC = () => {
  const [tab, setTab] = useState<'drinks' | 'food'>('drinks');
  const [page, setPage] = useState(0);
  const [fs, setFs] = useState<string | null>(null);

  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [pill, setPill] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const measure = (activeTab: 'drinks' | 'food') => {
    const idx = activeTab === 'drinks' ? 0 : 1;
    const el = btnRefs.current[idx];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  };
  useLayoutEffect(() => { measure(tab); }, [tab]);
  useEffect(() => { const r = () => measure(tab); window.addEventListener('resize', r); return () => window.removeEventListener('resize', r); }, [tab]);

  const imgs = MENU_IMAGES[tab];
  const next = () => setPage((p) => (p + 1) % imgs.length);
  const prev = () => setPage((p) => (p - 1 + imgs.length) % imgs.length);

  return (
    <section id="menu" className="py-24 px-6 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4">Our <span className="text-gradient">Menus</span></h2>
          <p className="text-xl text-gray-700 dark:text-gray-400 font-medium">(the reason you&apos;re really here)</p>
        </motion.div>

        {/* Tabs with measured highlight (no weird hover) */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex p-2 rounded-2xl glass-heavy overflow-hidden">
            <motion.div
              className="absolute top-2 bottom-2 rounded-xl"
              animate={{ left: pill.left + 2, width: pill.width - 4 }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              style={{ background: 'linear-gradient(90deg, rgba(245,158,11,0.35), rgba(234,88,12,0.35))' }}
            />
            {(['drinks','food'] as const).map((t, i) => (
              <button
                key={t}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => { setTab(t); setPage(0); }}
                className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
              >
                <Utensils className="w-5 h-5" />
                {t === 'drinks' ? 'Drinks' : 'Food'}
              </button>
            ))}
          </div>
        </div>

        {/* Viewer */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          className="relative max-w-3xl mx-auto">
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} perspective={1000} className="relative rounded-3xl overflow-hidden glass-heavy p-4">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
              <img src={imgs[page]} alt={`${tab} menu page ${page + 1}`} className="w-full h-full object-contain" />
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setFs(imgs[page])}
                className="absolute top-4 right-4 p-3 rounded-full glass-heavy"><Maximize2 className="w-5 h-5" /></motion.button>
            </div>
          </Tilt>

          {imgs.length > 1 && (
            <>
              <motion.button whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.95 }}
                onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full glass-heavy shadow-xl">
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.95 }}
                onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full glass-heavy shadow-xl">
                <ChevronRight className="w-6 h-6" />
              </motion.button>
              <div className="flex justify-center gap-2 mt-8">
                {imgs.map((_, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.2 }} onClick={() => setPage(i)}
                    className={cn('w-2 h-2 rounded-full transition-all', page === i ? 'w-8 bg-amber-500' : 'bg-gray-400 dark:bg-gray-600')} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Fullscreen */}
      <AnimatePresence>
        {fs && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setFs(null)} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <img src={fs} alt="Menu fullscreen" className="max-w-full max-h-full object-contain rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Friends graphic */}
      <div className="max-w-5xl mx-auto mt-16">
        <div className="rounded-3xl overflow-hidden glass-heavy">
          <img src={FRIENDS_IMAGE} alt="All meals taste better with friends" className="w-full h-auto object-cover" />
        </div>
      </div>
    </section>
  );
};


const StaffGallery: React.FC = () => {
  const [grid, setGrid] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div id="photos" className="mt-24">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-black mb-2">MEET OUR <span className="text-gradient">DREAM TEAM</span></h3>
        <p className="text-gray-700 dark:text-gray-400">The amazing people behind the magic</p>
      </div>

      <div className="flex justify-center mb-8">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setGrid((g) => !g)} className="flex items-center gap-2 px-6 py-3 rounded-full glass-heavy font-medium">
          <Grid className="w-5 h-5" /> {grid ? 'Show Slideshow' : 'Show All Photos'}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {!grid ? (
          <motion.div key="slideshow" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="relative rounded-3xl overflow-hidden glass-heavy p-4">
            <Swiper
              modules={[SwpNav, SwpPag, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4200, disableOnInteraction: false }}
              className="rounded-2xl overflow-hidden"
              style={{ height: '500px' }}
            >
              {STAFF_IMAGES.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
                    <img src={src} alt={`Staff ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-prev absolute left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-heavy"><ChevronLeft className="w-6 h-6" /></button>
            <button className="swiper-next absolute right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-heavy"><ChevronRight className="w-6 h-6" /></button>
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {STAFF_IMAGES.map((src, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }} whileHover={{ scale: 1.04 }}
                onClick={() => setSel(src)}
                className="relative aspect-square rounded-2xl overflow-hidden glass cursor-pointer"
                aria-label={`View staff image ${i + 1}`}
              >
                <img src={src} alt={`Staff ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSel(null)}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              src={sel} alt="Expanded" className="max-w-full max-h-full object-contain rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const About: React.FC = () => {
  const [flipHistory, setFlipHistory] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);

  const HistoryCard = (
    <div className="relative [perspective:1200px]">
      <div className="relative h-full min-h-[260px] rounded-3xl" style={{ transformStyle: 'preserve-3d' }}>
        {/* Front */}
        <motion.div
          className="p-8 pb-10 glass-heavy rounded-3xl absolute inset-0"
          animate={{ rotateY: flipHistory ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-amber-500/20"><History className="w-6 h-6 text-amber-500" /></div>
            <h3 className="text-2xl font-bold">Our History</h3>
          </div>
          <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
            Since 1978 your Queen&apos;s Pub &amp; Restaurant has welcomed the Queen&apos;s community—now
            back in the revitalized JDUC at University &amp; Union—keeping tradition alive with a modern vibe.
          </p>
          <div className="mt-6 pb-6 cursor-pointer">
            <button onClick={() => setFlipHistory(true)} className="px-4 py-2 rounded-full bg-amber-500 text-white font-semibold">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Back with images (scrollable, better crop) */}
        <motion.div
          className="p-6 glass-heavy rounded-3xl absolute inset-0 grid grid-cols-2 gap-3 overflow-auto"
          animate={{ rotateY: flipHistory ? 360 : 180 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: 'hidden', maxHeight: 420 }}
        >
          {HISTORY_IMAGES.map((src) => (
            <button key={src} onClick={() => setZoom(src)} className="rounded-2xl overflow-hidden cursor-pointer">
              <img src={src} alt="History" className="w-full h-40 object-cover" />
            </button>
          ))}
          <div className="col-span-2">
            <button onClick={() => setFlipHistory(false)} className="mt-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 font-semibold">
              Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const MissionCard = (
    <div className="p-8 glass-heavy rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-amber-500/20"><Target className="w-6 h-6 text-amber-500" /></div>
        <h3 className="text-2xl font-bold">Our Mission</h3>
      </div>
      <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
        Serve great food & drinks in a vibrant atmosphere and create meaningful student employment—run with AMS spirit,
        for the campus community.
      </p>
    </div>
  );

  return (
    <section id="about" className="py-24 px-6 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4">get to <span className="text-gradient">know us</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {HistoryCard}
          {MissionCard}
        </div>

        {/* Staff Directory */}
<div className="mb-16">
  <h3 className="text-3xl font-extrabold text-center mb-8">Staff Directory</h3>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {STAFF_DIRECTORY.map((m) => (
      <div key={m.name} className="p-6 rounded-3xl glass-heavy h-full">
        <div className="flex items-start gap-4">
          <button
            onClick={() => m.image && window.open(m.image, '_blank')}
            className={cn(
              'shrink-0 w-16 h-16 rounded-2xl overflow-hidden',
              m.image ? 'cursor-pointer' : 'cursor-default'
            )}
            aria-label={`Open ${m.name} image`}
            type="button"
          >
            {m.image ? (
              <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                {/* fallback icon when no photo */}
                <Users className="w-7 h-7 opacity-70" />
              </div>
            )}
          </button>

          <div className="flex-1">
            <h4 className="text-xl font-bold mb-1">{m.name}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">{m.position}</p>

            {m.email && (
              <a
                href={`mailto:${m.email}`}
                className="inline-block text-[0.95rem] font-medium 
                  text-sky-700 hover:underline dark:text-amber-400"
              >
                {m.email}
              </a>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <StaffGallery />
        </motion.div>

        {/* Zoom for history images */}
        <AnimatePresence>
          {zoom && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setZoom(null)}>
              <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={zoom} alt="Historic" className="max-w-full max-h-full object-contain rounded-lg" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img src={QP_LOGO} alt="Queen's Pub logo" className="h-10 w-auto" />
              <div className="text-center md:text-left">
                <p className="font-bold text-xl">Queen&apos;s Pub &amp; Restaurant</p>
                <p className="text-gray-700 dark:text-gray-400">99 University Ave, Kingston, ON K7L 3P5</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <motion.a whileHover={{ scale: 1.05 }} href="https://www.instagram.com/queenspub_restaurant/"
                target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-heavy" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="https://www.facebook.com/profile.php?id=61561660881724"
                target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-heavy" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </motion.a>
              <div className="h-10 w-px bg-gray-300/60 dark:bg-white/10 mx-2" />
              <img src={AMS_LOGO} alt="AMS Queen's University" className="h-10 w-auto" />
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-500">© 2025 Queen&apos;s Pub. Part of AMS Queen&apos;s University.</div>
        </motion.footer>
      </div>
    </section>
  );
};

/* -----------------------------
   App
----------------------------- */

export default function App() {
  const { theme, toggle, animating } = useThemeBlanket();
  const active = useActiveSection(NAV.map((n) => n.id));

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen relative font-sans">
      {/* Theme toggle */}
      <motion.button
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        onClick={toggle}
        className="fixed top-6 right-6 z-50 p-3 rounded-full glass shadow-xl"
        aria-label="Toggle theme"
      >
        <motion.div initial={false} animate={{ rotate: theme === 'dark' ? 360 : 0 }} transition={{ duration: 0.45 }}>
          {theme === 'dark' ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
        </motion.div>
      </motion.button>

      {/* Theme blanket */}
      <AnimatePresence>
        {animating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            className="pointer-events-none fixed inset-0 z-50">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-q-blue-100 dark:from-q-navy-900 dark:to-q-navy-800 opacity-70" />
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation active={active} onJump={jump} />
      <Hero />
      <Menu />
      <About />
    </div>
  );
}