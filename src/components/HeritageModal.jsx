import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Quote, 
  Heart, 
  Users, 
  Flame, 
  Globe, 
  Church, 
  Award,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
  Compass,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function HeritageModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('ydd'); // 'ydd' | 'gallery' | 'fathers' | 'emblems' | 'doctrines'
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('ALL');
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  if (!isOpen) return null;

  // Official Pioneer Leaders
  const pioneers = [
    {
      name: "Mother Florence Louise Crawford",
      years: "1872 – 1936",
      role: "Founder & 1st General Overseer, Portland, Oregon",
      image: "/afc/florence_crawford.jpg",
      quote: "The Apostolic Faith is not a new religion; it is the old-time power of Pentecost restored. Go forward and look up, Jesus never fails!",
      keyContribution: "Received the baptism of the Holy Ghost at the Azusa Street revival in 1906 and established the world headquarters in Portland, Oregon in 1908."
    },
    {
      name: "Rev. Timothy Gbadebo Oshokoya (Brother T)",
      years: "1909 – 1980",
      role: "Pioneering Leader, West & Central Africa (WECA)",
      image: "/afc/timothy_oshokoya.jpg",
      quote: "Africa for Christ, and Christ for Africa! Consecrate your all to God, uphold the ancient landmarks, and let the fire burn perpetually upon the altar.",
      keyContribution: "Commenced the Apostolic Faith work in Nigeria in 1944 and launched the historic 1956 'Africa for Christ' evangelistic crusades that swept across the continent."
    },
    {
      name: "Rev. Paul O. Akazue",
      years: "1942 – 2010",
      role: "2nd District Superintendent, AFMWECA",
      image: "/afc/images.jpg",
      quote: "Remove not the ancient landmark which thy fathers have set. Holiness is still the undisputed beauty of God's sanctuary.",
      keyContribution: "Spearheaded the miraculous development of Faith City campground in Igbesa and massive gospel literature distribution across West Africa."
    },
    {
      name: "Rev. Emmanuel Adebayo Adeniran",
      years: "1954 – 2021",
      role: "3rd District Superintendent, AFMWECA",
      image: "/afc/Jesus the light of the world.jpg",
      quote: "Our young people are the heartbeat of the church today and the torchbearers of truth into eternity. Win them for Christ!",
      keyContribution: "Vastly expanded the Youth Development Directorate (YDD), campus fellowships (AFCF), and international youth evangelism."
    },
    {
      name: "Rev. Isaac Adigun",
      years: "Present",
      role: "Current District Superintendent, AFMWECA",
      image: "/afc/Africa for christ.jpg",
      quote: "Stand fast in the faith, quit you like men, be strong. Keep the gospel standard uncontaminated!",
      keyContribution: "Leading the spiritual consolidation, modern digital transformation, and campus missions across West and Central Africa."
    }
  ];

  // Authentic Multimedia Gallery ("Faith in Frames")
  const galleryItems = [
    {
      id: 'g1',
      title: 'Portland World Headquarters Symphony Orchestra & Choir',
      category: 'MUSIC',
      categoryLabel: 'Orchestra & Choir',
      location: 'Portland, Oregon, USA',
      image: '/afc/portland_orchestra.jpg',
      caption: 'The majestic tabernacle choir and world-renowned symphony orchestra praising God in classical harmony.',
      scripture: 'Psalm 150:3-6'
    },
    {
      id: 'g2',
      title: 'Faith City Camp Meeting International Tabernacle',
      category: 'CAMP',
      categoryLabel: 'Camp Meeting',
      location: 'Faith City, Igbesa, Ogun State',
      image: '/afc/weca_camp_share.png',
      caption: 'The vast 100,000-capacity International Tabernacle where saints gather annually for holy revival.',
      scripture: 'Isaiah 35:8-10'
    },
    {
      id: 'g3',
      title: 'AFMWECA International Youth Convention Arena',
      category: 'YOUTH',
      categoryLabel: 'Youth Convention',
      location: 'Faith City Campground',
      image: '/afc/ydd_hero.jpg',
      caption: 'Thousands of young Christians worshipping, praying, and consecrating their lives to the Master.',
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
      caption: 'Empowering undergraduate and postgraduate students to shine as radiant lights in university campuses.',
      scripture: 'Matthew 5:14-16'
    },
    {
      id: 'g6',
      title: 'Young Professionals & Career Guild',
      category: 'YOUTH',
      categoryLabel: 'Young Professionals',
      location: 'Metropolitan Chapters',
      image: '/afc/ydd_young_professionals.jpg',
      caption: 'Equipping graduates and professionals to excel with integrity, devotion, and Christian excellence.',
      scripture: 'Colossians 3:23'
    },
    {
      id: 'g7',
      title: 'Young Couples & Godly Parenting Forum',
      category: 'YOUTH',
      categoryLabel: 'Young Couples',
      location: 'Family Life Ministry',
      image: '/afc/ydd_young_couples.jpg',
      caption: 'Building Christian families and holy homes upon the solid foundation of God\'s eternal Word.',
      scripture: 'Joshua 24:15'
    },
    {
      id: 'g8',
      title: 'Singles Forum & Spiritual Destiny Summit',
      category: 'YOUTH',
      categoryLabel: 'Singles Forum',
      location: 'Youth Directorate Centers',
      image: '/afc/ydd_singles_forum.jpg',
      caption: 'Counsel, purpose, biblical courtship, and holy dedication for vibrant singles.',
      scripture: '1 Corinthians 7:32'
    },
    {
      id: 'g9',
      title: 'Historic "Africa for Christ" Continental Crusade Banner',
      category: 'HERITAGE',
      categoryLabel: 'Evangelistic Crusade',
      location: 'Lagos to Global Missions',
      image: '/afc/Africa for christ 2.jpg',
      caption: 'The visionary emblem unveiled by Rev. T.G. Oshokoya in 1956 for the continental evangelism thrust.',
      scripture: 'Mark 16:15'
    }
  ];

  const filteredGallery = selectedGalleryCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedGalleryCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-6xl bg-afc-navy border-2 border-afc-gold/60 rounded-3xl shadow-gold-glow-lg flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-gradient-to-r from-afc-navy-mid via-afc-navy-surface to-afc-navy border-b border-afc-gold/30">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-12 h-12 rounded-full border border-afc-gold shadow-gold-glow bg-white p-0.5" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-afc-navy"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-serif font-black text-afc-gold-light flex items-center gap-2">
                  Apostolic Faith Heritage & YDD Pavilion
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  AFMWECA YDD
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-300">
                Youth Development Directorate • Ekiti Area Headquarters: 74 Ajilosun St, Ado-Ekiti
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="https://youth.afmweca.org/" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <span>youth.afmweca.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-afc-gold/20 bg-afc-navy-surface/60 px-4 sm:px-8 pt-2 overflow-x-auto gap-1">
          {[
            { id: 'ydd', label: 'Youth Directorate (YDD)', icon: Users },
            { id: 'gallery', label: 'Sacred Media Gallery ("Faith in Frames")', icon: ImageIcon },
            { id: 'fathers', label: 'Founding Fathers & Quotes', icon: Church },
            { id: 'emblems', label: 'Sacred Church Emblems', icon: Globe },
            { id: 'doctrines', label: '3 Foundational Experiences', icon: Flame },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap rounded-t-xl ${
                  activeTab === tab.id
                    ? 'border-afc-gold text-afc-gold-light bg-afc-navy/80 shadow-md'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: YDD SHOWCASE */}
          {activeTab === 'ydd' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Hero Banner with Official YDD Logo & Slogan */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-afc-navy-mid via-afc-navy-surface to-afc-navy border-2 border-afc-gold/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white border-2 border-afc-gold p-3 flex items-center justify-center shadow-gold-glow">
                    <img src="/afc/ydd_logo_hq.png" alt="YDD Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full bg-afc-gold text-afc-navy font-black text-[10px] uppercase tracking-wider shadow-md">
                    AFMWECA
                  </span>
                </div>

                <div className="space-y-2.5 text-center md:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-afc-gold/15 border border-afc-gold/40 text-afc-gold-light text-xs font-black uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-afc-gold" />
                    Youth Development Directorate (YDD)
                  </div>
                  
                  <h4 className="text-lg sm:text-2xl font-serif font-black text-white leading-tight">
                    "We are an army of outstanding young people, going to Heaven and persuading others to come along."
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-afc-gold-light/90 italic font-medium">
                    The Official Youth Wing of The Apostolic Faith Church (West & Central Africa)
                  </p>
                </div>
              </div>

              {/* Mission, Vision & Values Triad */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mission */}
                <div className="p-5 rounded-2xl bg-afc-navy-surface border border-afc-gold/40 shadow-md space-y-2">
                  <div className="flex items-center gap-2 text-afc-gold font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>OUR MISSION</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-medium">
                    To create platforms using relevant channels through which young people can discover themselves, connect with God, the Church and one another as means of converting the world.
                  </p>
                </div>

                {/* Vision */}
                <div className="p-5 rounded-2xl bg-afc-navy-surface border border-cyan-400/40 shadow-md space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>OUR VISION</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-medium">
                    To raise a generation of outstanding young people who are heaven-bound, useful to God and humanity.
                  </p>
                </div>

                {/* Values */}
                <div className="p-5 rounded-2xl bg-afc-navy-surface border border-emerald-400/40 shadow-md space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <Heart className="w-4 h-4" />
                    <span>OUR VALUES</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Integrity', 'Love', 'Service', 'Spiritual Growth', 'Community', 'Excellence'].map((val, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-200">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* The 6 Key YDD Platforms with Real Official Photos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-afc-gold flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    YDD Platforms & Ministry Forums:
                  </h5>
                  <span className="text-[11px] text-gray-400">Official Channels</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      title: "Teenage Ministry", 
                      image: "/afc/ydd_teen_ministry.jpg",
                      desc: "Nurturing adolescents with sound biblical doctrine, character building, and holy living." 
                    },
                    { 
                      title: "Campus Fellowship (AFCF)", 
                      image: "/afc/ydd_campus_fellowship.jpg",
                      desc: "Empowering university and polytechnic students to shine as lights of Christ in academic spheres." 
                    },
                    { 
                      title: "Young Professionals", 
                      image: "/afc/ydd_young_professionals.jpg",
                      desc: "Equipping graduates and career youths with godly professional integrity and corporate excellence." 
                    },
                    { 
                      title: "Young Couples", 
                      image: "/afc/ydd_young_couples.jpg",
                      desc: "Building godly marriages, homes, and holy parenting founded on Christ's holiness." 
                    },
                    { 
                      title: "Singles Forum", 
                      image: "/afc/ydd_singles_forum.jpg",
                      desc: "Guidance on career, purpose, biblical courtship, and holy devotion while single." 
                    },
                    { 
                      title: "Bible Challenge (Bible Giant)", 
                      image: "/afc/ydd_hero.jpg",
                      desc: "Deep scriptural mastery and church history tournaments fostering passionate love for God's Word." 
                    },
                  ].map((plat, i) => (
                    <div key={i} className="group rounded-2xl bg-afc-navy border border-afc-gold/20 hover:border-afc-gold transition-all overflow-hidden shadow-lg flex flex-col">
                      <div className="relative h-36 w-full overflow-hidden bg-black/50">
                        <img 
                          src={plat.image} 
                          alt={plat.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-afc-navy via-transparent to-transparent"></div>
                        <span className="absolute bottom-2 left-3 font-bold text-xs text-white bg-afc-navy/80 px-2 py-0.5 rounded border border-afc-gold/30">
                          {plat.title}
                        </span>
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <p className="text-[11px] text-gray-300 leading-snug">{plat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SACRED MEDIA GALLERY ("FAITH IN FRAMES") */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-afc-gold">
                    Official Multimedia Archive
                  </span>
                  <h4 className="text-lg sm:text-xl font-serif font-black text-white">
                    "Faith in Frames" — Sacred Gallery
                  </h4>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'ALL', label: 'All Photos' },
                    { id: 'CAMP', label: 'Camp Meetings' },
                    { id: 'YOUTH', label: 'YDD Youth Rallies' },
                    { id: 'MUSIC', label: 'Symphony & Choir' },
                    { id: 'HERITAGE', label: 'Revival Landmarks' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedGalleryCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] text-afc-gold font-mono">
                        <span>{item.scripture}</span>
                        <span className="text-gray-400 group-hover:text-white flex items-center gap-0.5">
                          Enlarge <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox Modal */}
              {activeLightboxImage && (
                <div 
                  className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in"
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
                        className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10"
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

            </div>
          )}

          {/* TAB 3: FOUNDING FATHERS & QUOTES */}
          {activeTab === 'fathers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-afc-gold">
                  Hall of Faith & Gospel Pioneers
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-black text-white">
                  Founding Fathers & Their Timeless Quotes
                </h4>
                <p className="text-xs text-gray-400">
                  Honouring the consecrated vessels God used to ignite the Apostolic Faith revival across the globe and in Africa.
                </p>
              </div>

              <div className="space-y-5">
                {pioneers.map((p, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-afc-navy-surface border-2 border-afc-gold/30 shadow-xl flex flex-col md:flex-row items-center gap-5 hover:border-afc-gold transition-all"
                  >
                    <div className="relative shrink-0">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-afc-gold shadow-gold-glow"
                      />
                      <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded bg-afc-gold text-afc-navy font-mono font-black text-[9px]">
                        {p.years}
                      </span>
                    </div>

                    <div className="space-y-2 flex-1 text-center md:text-left">
                      <div>
                        <h5 className="font-serif font-black text-base text-afc-gold-light">
                          {p.name}
                        </h5>
                        <p className="text-xs text-gray-400 font-semibold">{p.role}</p>
                      </div>

                      {/* Quote Callout */}
                      <div className="p-3 rounded-xl bg-black/40 border-l-4 border-afc-gold text-xs italic text-gray-200 flex items-start gap-2">
                        <Quote className="w-4 h-4 text-afc-gold shrink-0 mt-0.5" />
                        <span>"{p.quote}"</span>
                      </div>

                      <p className="text-[11px] text-gray-400">
                        <strong>Heritage Note:</strong> {p.keyContribution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SACRED CHURCH EMBLEMS */}
          {activeTab === 'emblems' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Emblem 1: Jesus The Light of the World */}
                <div className="p-6 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl space-y-4 text-center">
                  <div className="w-40 h-40 mx-auto rounded-full bg-white/5 border-2 border-afc-gold p-3 flex items-center justify-center shadow-gold-glow">
                    <img src="/afc/Jesus the light of the world.jpg" alt="Jesus The Light of the World" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-afc-gold text-afc-navy">
                      INTERNATIONAL CHURCH MOTTO
                    </span>
                    <h5 className="font-serif font-black text-xl text-white mt-2">
                      "Jesus, The Light of the World"
                    </h5>
                    <p className="text-xs text-afc-gold font-mono mt-0.5">John 8:12</p>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed text-left">
                    First illuminated in brilliant electric lights atop the Portland, Oregon headquarters roof in 1917. It stands today across every church sanctuary from Portland to Faith City Anthony, and 74 Ajilosun Ado-Ekiti.
                  </p>
                </div>

                {/* Emblem 2: Africa for Christ */}
                <div className="p-6 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl space-y-4 text-center">
                  <div className="w-40 h-40 mx-auto rounded-full bg-white/5 border-2 border-afc-gold p-3 flex items-center justify-center shadow-gold-glow">
                    <img src="/afc/Africa for christ.jpg" alt="Africa for Christ" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-afc-crimson text-white border border-afc-crimson-light">
                      CONTINENTAL EVANGELISTIC EMBLEM
                    </span>
                    <h5 className="font-serif font-black text-xl text-white mt-2">
                      "Africa for Christ"
                    </h5>
                    <p className="text-xs text-afc-gold font-mono mt-0.5">Mark 16:15</p>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed text-left">
                    Registered as the official crusade banner by Rev. Timothy Oshokoya ("Brother T") in 1956, representing the unshakeable vision to win every soul across the African continent for Jesus Christ.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: 3 FOUNDATIONAL CHRISTIAN EXPERIENCES */}
          {activeTab === 'doctrines' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-afc-gold">
                  Foundational Doctrinal Pillars
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-black text-white">
                  The Three Definite Works of Grace
                </h4>
                <p className="text-xs text-gray-400">
                  The core biblical doctrines taught and lived in The Apostolic Faith Church worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Salvation */}
                <div className="p-6 rounded-2xl bg-afc-navy-surface border-2 border-emerald-500/40 shadow-md space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-400 text-emerald-300 flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h5 className="font-serif font-black text-lg text-emerald-300">
                    Salvation (Justification)
                  </h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The initial work of grace where actual committed sins are repented of and pardoned by God through faith in the atoning blood of Jesus Christ (Romans 5:1; 2 Cor 5:17).
                  </p>
                </div>

                {/* 2. Entire Sanctification */}
                <div className="p-6 rounded-2xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-md space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-950 border border-afc-gold text-afc-gold flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h5 className="font-serif font-black text-lg text-afc-gold-light">
                    Entire Sanctification
                  </h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The second definite work of grace subsequent to salvation. It cleanses and eradicates the inbred carnal nature (root of sin), imparting heart purity (Hebrews 13:12; 1 Thess 5:23).
                  </p>
                </div>

                {/* 3. Baptism of the Holy Ghost */}
                <div className="p-6 rounded-2xl bg-afc-navy-surface border-2 border-rose-500/40 shadow-md space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-400 text-rose-300 flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h5 className="font-serif font-black text-lg text-rose-300">
                    Holy Ghost & Fire Baptism
                  </h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The enduement of power from on high upon the sanctified life for effective Christian service and soul winning, with the initial evidence of speaking in tongues (Acts 1:8, 2:4).
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-afc-navy-surface border-t border-afc-gold/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <img src="/afc/ydd_logo_hq.png" alt="YDD" className="w-6 h-6 rounded-full bg-white p-0.5" />
            <span>Youth Development Directorate • Ekiti Area Youth Wing</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-afc-gold text-afc-navy font-bold hover:brightness-110 shadow-gold-glow cursor-pointer transition-transform active:scale-95"
          >
            Close Pavilion
          </button>
        </div>

      </div>
    </div>
  );
}
