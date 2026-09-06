// Official Preloaded Question Bank for The Apostolic Faith Church Ekiti Area Youth Challenge
// Categorized by Sections: AFC History & Heritage, Biblical Knowledge, German Questions, Theory/Recital

export const DEFAULT_QUESTIONS = [
  // =========================================================================
  // SECTION 1: APOSTOLIC FAITH CHURCH HERITAGE, HISTORY & DOCTRINE
  // =========================================================================
  {
    id: 'afc-001',
    section: 'AFC Heritage & History',
    category: 'International Heritage',
    type: 'objective', // objective | german | theory
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'In what year and city was the International Headquarters of The Apostolic Faith Church founded following the Azusa Street Revival?',
    options: {
      A: '1906 in Portland, Oregon, USA',
      B: '1914 in Los Angeles, California, USA',
      C: '1901 in Topeka, Kansas, USA',
      D: '1920 in Seattle, Washington, USA'
    },
    answer: 'A',
    scriptureRef: 'Acts 2:1-4 (Heritage Archives)',
    explanation: 'The Apostolic Faith Church was founded in 1906 by Mother Florence L. Crawford in Portland, Oregon, following the historic Azusa Street revival.'
  },
  {
    id: 'afc-002',
    section: 'AFC Heritage & History',
    category: 'WECA African History',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'Who was the pioneering leader used by God to establish the Apostolic Faith work across West and Central Africa (WECA), championing the "Africa for Christ" crusade?',
    options: {
      A: 'Rev. Paul Akazue',
      B: 'Rev. Timothy G. Oshokoya (Brother T)',
      C: 'Rev. Josiah Soyinka',
      D: 'Rev. Emmanuel Adebayo'
    },
    answer: 'B',
    scriptureRef: 'Mark 16:15',
    explanation: 'Rev. Timothy G. Oshokoya (fondly known as "Brother T") founded the Apostolic Faith work in Nigeria and launched the famous 1956 "Africa for Christ" crusades.'
  },
  {
    id: 'afc-003',
    section: 'AFC Heritage & History',
    category: 'Ekiti Area Heritage',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'Where is the designated Area Headquarters of The Apostolic Faith Church in Ekiti State, Nigeria?',
    options: {
      A: '12 Mathew Street, Ado-Ekiti',
      B: '74 Ajilosun Street, Ado-Ekiti',
      C: '45 Fajuyi Park Road, Ado-Ekiti',
      D: 'Ikole-Ekiti Central Camp'
    },
    answer: 'B',
    scriptureRef: 'Local Church Registry',
    explanation: 'The Ekiti Area Headquarters of The Apostolic Faith Church is located at 74 Ajilosun Street, Ado-Ekiti.'
  },
  {
    id: 'afc-004',
    section: 'AFC Heritage & History',
    category: 'Church Motto & Emblems',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'What famous phrase, first illuminated on the Portland headquarters roof in 1917, is the worldwide motto of the Apostolic Faith Church?',
    options: {
      A: 'Holiness unto the Lord',
      B: 'Jesus, The Light of the World',
      C: 'Faith that Conquers',
      D: 'The Everlasting Gospel'
    },
    answer: 'B',
    scriptureRef: 'John 8:12',
    explanation: '"Jesus, The Light of the World" has stood as the church\'s international neon beacon and motto since 1917.'
  },
  {
    id: 'afc-005',
    section: 'AFC Heritage & History',
    category: 'Foundational Doctrines',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'What are the three distinct and progressive Christian experiences taught by The Apostolic Faith Church?',
    options: {
      A: 'Water Baptism, Confirmation, and Holy Communion',
      B: 'Repentance, Tithing, and Church Membership',
      C: 'Salvation (Justification), Entire Sanctification, and the Baptism of the Holy Ghost',
      D: 'Faith, Hope, and Charity'
    },
    answer: 'C',
    scriptureRef: 'Romans 5:1, 1 Thessalonians 4:3, Acts 1:8',
    explanation: 'The three definite works of grace are Salvation (Justification), Entire Sanctification (a second definite work of grace), and the Baptism of the Holy Ghost and fire.'
  },

  // =========================================================================
  // SECTION 2: SCRIPTURAL KNOWLEDGE (OLD & NEW TESTAMENTS)
  // =========================================================================
  {
    id: 'bib-001',
    section: 'Scriptural Knowledge',
    category: 'Pentateuch & Old Testament',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'According to Genesis 14:18, who was the King of Salem and priest of the most high God who brought out bread and wine to Abram?',
    options: {
      A: 'Abimelech',
      B: 'Melchizedek',
      C: 'Jethro',
      D: 'Eleazar'
    },
    answer: 'B',
    scriptureRef: 'Genesis 14:18; Hebrews 7:1-3',
    explanation: 'Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God.'
  },
  {
    id: 'bib-002',
    section: 'Scriptural Knowledge',
    category: 'Gospels & Life of Christ',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'In which Gospel and chapter is the Beatitudes (Sermon on the Mount) recorded beginning with "Blessed are the poor in spirit"?',
    options: {
      A: 'Luke Chapter 15',
      B: 'Matthew Chapter 5',
      C: 'John Chapter 3',
      D: 'Mark Chapter 8'
    },
    answer: 'B',
    scriptureRef: 'Matthew 5:3',
    explanation: 'Matthew 5 opens Jesus\' Sermon on the Mount with the eight Beatitudes.'
  },
  {
    id: 'bib-003',
    section: 'Scriptural Knowledge',
    category: 'Acts of the Apostles',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'On the road to which city was Saul blinded by a light from heaven and confronted by the resurrected Lord Jesus?',
    options: {
      A: 'Antioch',
      B: 'Damascus',
      C: 'Jerusalem',
      D: 'Tarsus'
    },
    answer: 'B',
    scriptureRef: 'Acts 9:3',
    explanation: 'As he journeyed, he came near Damascus: and suddenly there shined round about him a light from heaven.'
  },
  {
    id: 'bib-004',
    section: 'Scriptural Knowledge',
    category: 'Epistles & Prophecy',
    type: 'objective',
    points: 20,
    bonusPoints: 10,
    timeLimit: 30,
    prompt: 'According to Galatians 5:22-23, how many manifestations are listed as the singular "Fruit of the Spirit"?',
    options: {
      A: 'Seven',
      B: 'Nine',
      C: 'Twelve',
      D: 'Ten'
    },
    answer: 'B',
    scriptureRef: 'Galatians 5:22-23',
    explanation: 'The nine fruits are: Love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, and temperance.'
  },

  // =========================================================================
  // SECTION 3: GERMAN QUESTIONS (DIRECT RECALL - NO MULTIPLE CHOICE OPTIONS)
  // =========================================================================
  {
    id: 'ger-001',
    section: 'German Speed Round',
    category: 'Direct Scripture Recall',
    type: 'german',
    points: 25,
    bonusPoints: 15,
    timeLimit: 20,
    prompt: 'GERMAN QUESTION: Who was the oldest man recorded in the Bible, and how old was he when he died?',
    options: null,
    answer: 'Methuselah, 969 years old',
    scriptureRef: 'Genesis 5:27',
    explanation: 'And all the days of Methuselah were nine hundred sixty and nine years: and he died.'
  },
  {
    id: 'ger-002',
    section: 'German Speed Round',
    category: 'AFC Heritage Recall',
    type: 'german',
    points: 25,
    bonusPoints: 15,
    timeLimit: 20,
    prompt: 'GERMAN QUESTION: Name the vast campground and African headquarters of The Apostolic Faith Church located along the Lagos-Badagry/Igbesa expressway.',
    options: null,
    answer: 'Faith City (Igbesa / Anthony Village)',
    scriptureRef: 'WECA Historical Records',
    explanation: 'Faith City in Igbesa, Ogun State / Anthony Village Lagos serves as the headquarters campsite for West and Central Africa.'
  },
  {
    id: 'ger-003',
    section: 'German Speed Round',
    category: 'Direct Scripture Recall',
    type: 'german',
    points: 25,
    bonusPoints: 15,
    timeLimit: 20,
    prompt: 'GERMAN QUESTION: What is the shortest verse in the entire Holy Bible (King James Version)?',
    options: null,
    answer: '"Jesus wept." (John 11:35)',
    scriptureRef: 'John 11:35',
    explanation: 'John 11:35 contains just two words: "Jesus wept."'
  },
  {
    id: 'ger-004',
    section: 'German Speed Round',
    category: 'Direct Scripture Recall',
    type: 'german',
    points: 25,
    bonusPoints: 15,
    timeLimit: 20,
    prompt: 'GERMAN QUESTION: Which Prophet of God was carried to heaven by a chariot of fire and horses of fire in a whirlwind?',
    options: null,
    answer: 'Prophet Elijah',
    scriptureRef: '2 Kings 2:11',
    explanation: 'There appeared a chariot of fire, and horses of fire... and Elijah went up by a whirlwind into heaven.'
  },

  // =========================================================================
  // SECTION 4: THEORY & SCRIPTURE RECITATION ROUND
  // =========================================================================
  {
    id: 'thy-001',
    section: 'Theory & Recital',
    category: 'Scripture Recitation',
    type: 'theory',
    points: 30,
    bonusPoints: 15,
    timeLimit: 60,
    prompt: 'THEORY CHALLENGE: Recite verbatim the Apostolic Faith Church Motto Scripture from John 8:12, and explain its spiritual significance to Christian believers today.',
    options: null,
    answer: 'Recitation: "Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life." (John 8:12 KJV)',
    scriptureRef: 'John 8:12',
    explanation: 'Judges Scoring Criteria: 15 points for flawless verbatim recitation; 15 points for articulate doctrinal explanation of Christ illuminating our hearts and dispelling spiritual darkness.'
  },
  {
    id: 'thy-002',
    section: 'Theory & Recital',
    category: 'Church History & Doctrine',
    type: 'theory',
    points: 30,
    bonusPoints: 15,
    timeLimit: 60,
    prompt: 'THEORY CHALLENGE: Explain the biblical distinction between Justification (Salvation) and Entire Sanctification as taught in the Apostolic Faith Church.',
    options: null,
    answer: 'Justification pardons committed sins and imputes Christ\'s righteousness (Romans 5:1). Entire Sanctification is the second definite work of grace that eradicates the inbred carnal nature / root of sin through the blood of Jesus (Hebrews 13:12, 1 Thess 5:23).',
    scriptureRef: 'Romans 5:1; Hebrews 13:12; 1 Thessalonians 5:23',
    explanation: 'Judges Rubric: Clear explanation of pardon of actual transgressions vs. inner cleansing of the inherited sinful nature.'
  }
];

export const PRELOADED_EKITI_ZONES = [
  'Ado Central (Ajilosun)',
  'Ado East (Nova / Adebayo)',
  'Ado West (Ilawe Road)',
  'Igede Ekiti',
  'Ikole Ekiti',
  'Ido Ekiti',
  'Emure Ekiti',
  'Oye Ekiti',
  'Ijero Ekiti',
  'Gbonyin (Ode Ekiti)',
  'Aramoko Ekiti',
  'Ise/Orun Ekiti',
  'Ikere Ekiti'
];
