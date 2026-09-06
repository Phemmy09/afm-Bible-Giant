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
  ChevronRight
} from 'lucide-react';

export default function HeritageModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('ydd'); // 'ydd' | 'fathers' | 'emblems' | 'doctrines'

  if (!isOpen) return null;

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
      keyContribution: "Spearheaded the development of Faith City campground in Igbesa and massive gospel literature distribution across West Africa."
    },
    {
      name: "Rev. Emmanuel Adebayo Adeniran",
      years: "1954 – 2021",
      role: "3rd District Superintendent, AFMWECA",
      image: "/afc/Jesus the light of the world.jpg",
      quote: "Our young people are the heartbeat of the church today and the torchbearers of truth into eternity. Win them for Christ!",
      keyContribution: "Vastly expanded the Youth Development Directorate (YDD), campus fellowships, and youth evangelistic outreaches."
    },
    {
      name: "Rev. Isaac Adigun",
      years: "Present",
      role: "Current District Superintendent, AFMWECA",
      image: "/afc/Africa for christ.jpg",
      quote: "Stand fast in the faith, quit you like men, be strong. Keep the gospel standard uncontaminated!",
      keyContribution: "Leading the modern transformation and spiritual consolidation of the Apostolic Faith work across West and Central Africa."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-afc-navy border-2 border-afc-gold/60 rounded-3xl shadow-gold-glow-lg flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-afc-navy-surface border-b border-afc-gold/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/afc/ydd.webp" alt="YDD Logo" className="w-11 h-11 rounded-full border border-afc-gold shadow-gold-glow" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-afc-gold rounded-full border-2 border-afc-navy"></span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-black text-afc-gold-light flex items-center gap-2">
                Apostolic Faith Heritage & YDD Pavilion
              </h3>
              <p className="text-[11px] text-gray-300">
                Youth Development Directorate • Ekiti Area Headquarters: 74 Ajilosun St, Ado-Ekiti
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-afc-gold/20 bg-afc-navy-surface/50 px-6 pt-2 overflow-x-auto">
          {[
            { id: 'ydd', label: 'Youth Directorate (YDD)', icon: Users },
            { id: 'fathers', label: 'Founding Fathers & Quotes', icon: Church },
            { id: 'emblems', label: 'Sacred Church Emblems', icon: Globe },
            { id: 'doctrines', label: '3 Foundational Experiences', icon: Flame },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-afc-gold text-afc-gold-light bg-afc-navy/60'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: YDD SHOWCASE */}
          {activeTab === 'ydd' && (
            <div className="space-y-6">
              
              {/* Hero Banner with Official YDD Logo & Slogan */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-afc-navy-mid via-afc-navy-surface to-afc-navy border-2 border-afc-gold/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/5 border-2 border-afc-gold p-3 flex items-center justify-center shadow-gold-glow">
                    <img src="/afc/ydd.webp" alt="YDD Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-afc-gold text-afc-navy font-black text-[9px] uppercase tracking-wider">
                    AFMWECA
                  </span>
                </div>

                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-afc-gold/10 border border-afc-gold/30 text-afc-gold text-[10px] font-black uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" />
                    Youth Development Directorate (YDD)
                  </div>
                  
                  <h4 className="text-lg sm:text-xl font-serif font-black text-white leading-tight">
                    "We are an army of outstanding young people, going to Heaven and persuading others to come along."
                  </h4>
                  
                  <p className="text-xs text-afc-gold-light/90 italic">
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

              {/* The 5 Key YDD Platforms */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-widest text-afc-gold">
                  YDD Key Platforms & Ministries:
                </h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { title: "Teenage Ministry", desc: "Nurturing adolescents with sound biblical doctrine, character building, and holy living." },
                    { title: "Campus Fellowship (AFCF)", desc: "Empowering university and polytechnic students to shine as lights of Christ in academic spheres." },
                    { title: "Young Professionals", desc: "Equipping graduates and career youths with godly professional integrity and excellence." },
                    { title: "Young Couples", desc: "Building godly marriages, homes, and parenting founded on Christ's holiness." },
                    { title: "Singles Forum", desc: "Guidance on career, purpose, biblical courtship, and holy devotion while single." },
                    { title: "Bible Challenge (Bible Giant)", desc: "Deep scriptural mastery and church history tournaments fostering love for the Word." },
                  ].map((plat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-afc-navy border border-afc-gold/20 hover:border-afc-gold/50 transition-all">
                      <h6 className="font-bold text-xs text-white">{plat.title}</h6>
                      <p className="text-[11px] text-gray-400 mt-1 leading-snug">{plat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FOUNDING FATHERS & QUOTES */}
          {activeTab === 'fathers' && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-afc-gold">
                  Hall of Faith & Gospel Pioneers
                </span>
                <h4 className="text-lg font-serif font-black text-white">
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

          {/* TAB 3: SACRED CHURCH EMBLEMS */}
          {activeTab === 'emblems' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Emblem 1: Jesus The Light of the World */}
                <div className="p-5 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl space-y-4 text-center">
                  <div className="w-36 h-36 mx-auto rounded-full bg-white/5 border-2 border-afc-gold p-3 flex items-center justify-center shadow-gold-glow">
                    <img src="/afc/images.jpg" alt="Jesus The Light of the World" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-afc-gold text-afc-navy">
                      INTERNATIONAL CHURCH MOTTO
                    </span>
                    <h5 className="font-serif font-black text-lg text-white mt-2">
                      "Jesus, The Light of the World"
                    </h5>
                    <p className="text-xs text-afc-gold font-mono mt-0.5">John 8:12</p>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed text-left">
                    First illuminated in electric lights atop the Portland, Oregon headquarters roof in 1917. It stands today across every church sanctuary from Portland to Faith City Anthony, and 74 Ajilosun Ado-Ekiti.
                  </p>
                </div>

                {/* Emblem 2: Africa for Christ */}
                <div className="p-5 rounded-3xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-xl space-y-4 text-center">
                  <div className="w-36 h-36 mx-auto rounded-full bg-white/5 border-2 border-afc-gold p-3 flex items-center justify-center shadow-gold-glow">
                    <img src="/afc/Africa for christ.jpg" alt="Africa for Christ" className="w-full h-full object-contain rounded-full" />
                  </div>
                  <div>
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-afc-crimson text-white border border-afc-crimson-light">
                      CONTINENTAL EVANGELISTIC EMBLEM
                    </span>
                    <h5 className="font-serif font-black text-lg text-white mt-2">
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

          {/* TAB 4: 3 FOUNDATIONAL CHRISTIAN EXPERIENCES */}
          {activeTab === 'doctrines' && (
            <div className="space-y-4">
              <div className="text-center max-w-xl mx-auto space-y-1 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-afc-gold">
                  Foundational Doctrinal Pillars
                </span>
                <h4 className="text-lg font-serif font-black text-white">
                  The Three Definite Works of Grace
                </h4>
                <p className="text-xs text-gray-400">
                  The core biblical doctrines taught and lived in The Apostolic Faith Church worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Salvation */}
                <div className="p-5 rounded-2xl bg-afc-navy-surface border-2 border-emerald-500/40 shadow-md space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-400 text-emerald-300 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h5 className="font-serif font-black text-base text-emerald-300">
                    Salvation (Justification)
                  </h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The initial work of grace where actual committed sins are repented of and pardoned by God through faith in the atoning blood of Jesus Christ (Romans 5:1).
                  </p>
                </div>

                {/* 2. Entire Sanctification */}
                <div className="p-5 rounded-2xl bg-afc-navy-surface border-2 border-afc-gold/40 shadow-md space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-yellow-950 border border-afc-gold text-afc-gold flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h5 className="font-serif font-black text-base text-afc-gold-light">
                    Entire Sanctification
                  </h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The second definite work of grace subsequent to salvation. It cleanses and eradicates the inbred carnal nature (root of sin), imparting heart purity (Hebrews 13:12; 1 Thess 5:23).
                  </p>
                </div>

                {/* 3. Baptism of the Holy Ghost */}
                <div className="p-5 rounded-2xl bg-afc-navy-surface border-2 border-rose-500/40 shadow-md space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-400 text-rose-300 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h5 className="font-serif font-black text-base text-rose-300">
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
        <div className="px-6 py-3.5 bg-afc-navy-surface border-t border-afc-gold/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-400 text-[11px]">
            <img src="/afc/ydd.webp" alt="YDD" className="w-5 h-5 rounded-full" />
            <span>Youth Development Directorate • Ekiti Area Youth Wing</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-afc-gold text-afc-navy font-bold hover:brightness-110 shadow-gold-glow"
          >
            Close Pavilion
          </button>
        </div>

      </div>
    </div>
  );
}
