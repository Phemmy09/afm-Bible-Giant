import React, { useState } from 'react';
import { 
  Tv, 
  ShieldCheck, 
  Sparkles, 
  Image as ImageIcon, 
  BookOpen, 
  Church, 
  Award, 
  Globe, 
  Flame, 
  ChevronRight, 
  ExternalLink,
  Users,
  MapPin,
  Maximize2,
  X,
  Play
} from 'lucide-react';
import classicalAudio from '../services/audioService';

export default function HomePage({ 
  onLaunchStage, 
  onOpenAdminLogin,
  onOpenHeritage 
}) {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('ALL');
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  const galleryItems = [
    {
      id: 'g1',
      title: 'Portland World Headquarters Symphony Orchestra & Choir',
      category: 'MUSIC',
      categoryLabel: 'Orchestra & Choir',
      location: 'Portland, Oregon, USA',
      image: '/afc/portland_orchestra.jpg',
      caption: 'The tabernacle choir and international symphony orchestra praising God in classical harmony.',
      scripture: 'Psalm 150:3-6'
    },
    {
      id: 'g2',
      title: 'Faith City Camp Meeting International Tabernacle',
      category: 'CAMP',
      categoryLabel: 'Camp Meeting',
      location: 'Faith City, Igbesa, Ogun State',
      image: '/afc/weca_camp_share.png',
      caption: 'The vast 100,000-capacity tabernacle where thousands gather annually for holy revival.',
      scripture: 'Isaiah 35:8-10'
    },
    {
      id: 'g3',
      title: 'AFMWECA International Youth Convention Arena',
      category: 'YOUTH',
      categoryLabel: 'Youth Convention',
      location: 'Faith City Campground',
      image: '/afc/ydd_hero.jpg',
      caption: 'Thousands of young Christians worshipping, praying, and consecrating their lives to God.',
      scripture: 'Ecclesiastes 12:1'
    },
    {
      id: 'g4',
      title: 'Teenage Ministry Leadership & Bible Mentorship',
      category: 'YOUTH',
      categoryLabel: 'Teenage Ministry',
      location: 'Ekiti & WECA Regional Centers',
      image: '/afc/ydd_teen_ministry.jpg',
      caption: 'Nurturing teenagers with sound biblical doctrine, holy character, and academic excellence.',
      scripture: '1 Timothy 4:12'
    },
    {
      id: 'g5',
      title: 'Apostolic Faith Campus Fellowship (AFCF)',
      category: 'YOUTH',
      categoryLabel: 'Campus Mission',
      location: 'Universities Across West Africa',
      image: '/afc/ydd_campus_fellowship.jpg',
      caption: 'Empowering undergraduate and postgraduate students to shine as radiant lights on campus.',
      scripture: 'Matthew 5:14-16'
    },
    {
      id: 'g6',
      title: 'Young Professionals & Corporate Guild',
      category: 'YOUTH',
      categoryLabel: 'Young Professionals',
      location: 'Metropolitan Chapters',
      image: '/afc/ydd_young_professionals.jpg',
      caption: 'Equipping graduates and professionals with godly integrity, devotion, and excellence.',
      scripture: 'Colossians 3:23'
    }
  ];

  const filteredGallery = selectedGalleryCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedGalleryCategory);

  const pioneers = [
    {
      name: "Mother Florence Louise Crawford",
      years: "1872 – 1936",
      role: "Founder & 1st General Overseer, Portland",
      image: "/afc/florence_crawford.jpg",
      quote: "The Apostolic Faith is not a new religion; it is the old-time power of Pentecost restored."
    },
    {
      name: "Rev. Timothy G. Oshokoya (Brother T)",
      years: "1909 – 1980",
      role: "Pioneer Leader, West & Central Africa",
      image: "/afc/timothy_oshokoya.jpg",
      quote: "Africa for Christ, and Christ for Africa! Consecrate your all to God and uphold the ancient landmarks."
    },
    {
      name: "Rev. Paul O. Akazue",
      years: "1942 – 2010",
      role: "2nd District Superintendent, AFMWECA",
      image: "/afc/images.jpg",
      quote: "Remove not the ancient landmark which thy fathers have set. Holiness is the beauty of God's house."
    },
    {
      name: "Rev. Emmanuel A. Adeniran",
      years: "1954 – 2021",
      role: "3rd District Superintendent, AFMWECA",
      image: "/afc/Jesus the light of the world.jpg",
      quote: "Our young people are the heartbeat of the church today and torchbearers into eternity."
    },
    {
      name: "Rev. Isaac Adigun",
      years: "Present",
      role: "Current District Superintendent, AFMWECA",
      image: "/afc/Africa for christ.jpg",
      quote: "Stand fast in the faith, quit you like men, be strong. Keep the standard uncontaminated!"
    }
  ];

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      
      {/* 1. HERO ARENA SECTION */}
      <section className="relative rounded-3xl overflow-hidden border-2 border-afc-gold/50 shadow-2xl bg-gradient-to-b from-afc-navy-mid via-afc-navy to-[#030712] p-6 sm:p-12 text-center">
        
        {/* Background Image Ambient Texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <img src="/afc/ydd_hero.jpg" alt="Hero background" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          
          {/* Dual Crests & Badge */}
          <div className="flex items-center justify-center -space-x-4">
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-afc-gold shadow-gold-glow bg-afc-navy p-1">
              <img src="/logo.svg" alt="AFC Crest" className="w-full h-full object-contain" />
            </div>
            <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-cyan-400 shadow-cyan-glow bg-white p-1">
              <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-afc-gold/15 border border-afc-gold/40 text-afc-gold-light text-xs font-black uppercase tracking-widest shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-afc-gold" />
              The Apostolic Faith Church • Ekiti Area Youth Wing
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight gold-text-shimmer leading-tight">
              WHO WANTS TO BE A BIBLE GIANT
            </h1>

            <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
              "We are an army of outstanding young people, going to Heaven and persuading others to come along."
            </p>
          </div>

          {/* TWO PRIMARY ACTION BUTTONS (STAGE vs ADMIN) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            
            {/* Primary CTA: Launch Stage / Projector Screen */}
            <button
              onClick={() => {
                classicalAudio.playReveal();
                onLaunchStage();
              }}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl gold-button text-sm sm:text-base font-serif font-black uppercase tracking-wider shadow-gold-glow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <Tv className="w-5 h-5 text-afc-navy group-hover:animate-pulse" />
              <span>Launch Live Stage (Projector Screen)</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA: Dedicated Admin Command Portal */}
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-afc-navy-surface border-2 border-afc-gold/50 text-afc-gold-light hover:border-afc-gold hover:bg-afc-navy text-sm sm:text-base font-serif font-black uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-afc-gold" />
              <span>Admin Command Portal (🔒)</span>
            </button>

          </div>

          {/* Sub Link: YDD Heritage Pavilion */}
          <div className="pt-2">
            <button
              onClick={onOpenHeritage}
              className="text-xs text-cyan-300 hover:text-white inline-flex items-center gap-1.5 font-bold hover:underline transition-colors"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Explore Church Heritage, Doctrines & Pioneers Pavilion →
            </button>
          </div>

        </div>
      </section>

      {/* 2. SACRED MEDIA GALLERY SECTION ("FAITH IN FRAMES") */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-afc-gold/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-afc-gold text-xs font-black uppercase tracking-widest">
              <ImageIcon className="w-4 h-4" />
              Official Media Archive
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-white mt-1">
              "Faith in Frames" — Sacred Gallery
            </h3>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'ALL', label: 'All Photos' },
              { id: 'CAMP', label: 'Camp Meetings' },
              { id: 'YOUTH', label: 'Youth Rallies' },
              { id: 'MUSIC', label: 'Symphony & Choir' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedGalleryCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGalleryCategory === cat.id
                    ? 'bg-afc-gold text-afc-navy shadow-gold-glow'
                    : 'bg-afc-navy-surface text-gray-300 hover:text-white border border-afc-gold/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => setActiveLightboxImage(item)}
              className="group relative rounded-2xl bg-afc-navy-surface border border-afc-gold/30 hover:border-afc-gold overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden bg-black/60">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-afc-navy via-black/20 to-transparent"></div>
                
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-afc-gold border border-afc-gold/40">
                  {item.categoryLabel}
                </span>

                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 font-semibold">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <h5 className="font-serif font-black text-sm text-white leading-snug group-hover:text-afc-gold-light transition-colors">
                  {item.title}
                </h5>
                <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-afc-gold font-mono">
                  <span>{item.scripture}</span>
                  <span className="text-gray-400 group-hover:text-white flex items-center gap-0.5 font-sans">
                    View Fullscreen <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxImage && (
          <div 
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in"
            onClick={() => setActiveLightboxImage(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-afc-navy border-2 border-afc-gold rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-afc-gold/30 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-afc-gold uppercase tracking-widest">
                    {activeLightboxImage.categoryLabel} • {activeLightboxImage.location}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-black text-white">
                    {activeLightboxImage.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveLightboxImage(null)}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden max-h-[60vh] bg-black flex items-center justify-center border border-afc-gold/40">
                <img 
                  src={activeLightboxImage.image} 
                  alt={activeLightboxImage.title} 
                  className="max-h-[60vh] w-full object-contain"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <p className="text-gray-300 italic max-w-xl">
                  "{activeLightboxImage.caption}"
                </p>
                <span className="px-3 py-1 rounded-lg bg-afc-gold/20 border border-afc-gold/40 text-afc-gold-light font-mono font-bold">
                  {activeLightboxImage.scripture}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. SACRED CHURCH EMBLEMS & MOTTOES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Emblem 1: Jesus The Light of the World */}
        <div className="p-6 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl space-y-4 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full bg-white/5 border-2 border-afc-gold p-2 flex items-center justify-center shadow-gold-glow">
            <img src="/afc/Jesus the light of the world.jpg" alt="Jesus The Light of the World" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-afc-gold text-afc-navy inline-block">
              CHURCH MOTTO • JOHN 8:12
            </span>
            <h4 className="font-serif font-black text-lg text-white">
              "Jesus, The Light of the World"
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Illuminated across Apostolic Faith Church sanctuaries worldwide since 1917, proclaiming Christ as the only hope of salvation.
            </p>
          </div>
        </div>

        {/* Emblem 2: Africa for Christ */}
        <div className="p-6 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl space-y-4 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full bg-white/5 border-2 border-afc-gold p-2 flex items-center justify-center shadow-gold-glow">
            <img src="/afc/Africa for christ.jpg" alt="Africa for Christ" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-afc-crimson text-white border border-afc-crimson-light inline-block">
              CRUSADE EMBLEM • MARK 16:15
            </span>
            <h4 className="font-serif font-black text-lg text-white">
              "Africa for Christ"
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Registered by Rev. T.G. Oshokoya in 1956, representing our unshakeable vision to win every soul across Africa for Jesus.
            </p>
          </div>
        </div>

      </section>

      {/* 4. FOUNDING FATHERS PREVIEW */}
      <section className="space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-afc-gold">
            Hall of Faith & Gospel Pioneers
          </span>
          <h3 className="text-xl font-serif font-black text-white">
            Honouring Our Consecrated Leaders
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pioneers.slice(0, 3).map((p, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-afc-navy-surface border border-afc-gold/30 hover:border-afc-gold transition-all flex items-center gap-4">
              <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover border border-afc-gold shrink-0" />
              <div className="space-y-0.5">
                <h5 className="font-serif font-bold text-xs text-afc-gold-light leading-snug">{p.name}</h5>
                <p className="text-[10px] text-gray-400">{p.role}</p>
                <p className="text-[10px] text-gray-300 italic line-clamp-2">"{p.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
