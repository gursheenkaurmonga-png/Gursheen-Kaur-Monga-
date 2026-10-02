/**
 * ==============================================================================
 * 💖 EDIT_ME: ROMANTIC ANNIVERSARY & BOYFRIEND'S DAY CONFIGURATION
 * ==============================================================================
 * You can easily customize every single piece of text, photo, milestone,
 * coupon, and love reason below!
 *
 * Simply edit the values inside the quotes, numbers, or arrays.
 * You can also use the in-app "Customize" button on the website to edit live!
 * ==============================================================================
 */

export interface TimelineMilestone {
  id: string;
  yearLabel: string; // e.g. "Year 1", "Year 2", "Year 3"
  date: string;
  title: string;
  description: string;
  photoUrl: string;
  tag: string;
}

export interface LoveReason {
  id: number;
  note: string;
  category: "sweet" | "funny" | "romantic" | "cozy";
}

export interface PolaroidPhoto {
  id: string;
  caption: string;
  date: string;
  photoUrl: string;
  rotateDeg: number; // e.g. -3, 2, -2, 4
  tapeColor?: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  category: string;
  terms: string;
  iconName: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface WheelOption {
  id: string;
  text: string;
  color: string;
  category: string;
}

export interface WebsiteConfig {
  // 1. General & Hero Details
  boyfriendName: string;
  yourName: string;
  anniversaryDate: string; // Format: "YYYY-MM-DD" e.g. "2023-10-03" (Oct 3, 2023)
  anniversaryYears: number;
  heroHeadline: string;
  heroSubheadline: string;
  heroPhotoUrl: string;

  // 2. Love Counter Settings
  loveCounterTitle: string;
  loveCounterSubtitle: string;

  // 3. Timeline / Our Story
  timelineTitle: string;
  timelineSubtitle: string;
  timeline: TimelineMilestone[];

  // 4. "Reasons Why I Love You" Jar
  jarTitle: string;
  jarSubtitle: string;
  reasons: LoveReason[];

  // 5. Memory Lane / Polaroid Gallery
  galleryTitle: string;
  gallerySubtitle: string;
  polaroids: PolaroidPhoto[];

  // 6. Secret Love Letter
  letterTitle: string;
  letterSubtitle: string;
  letterGreeting: string;
  letterBody: string[];
  letterClosing: string;
  letterSignature: string;

  // 7. Love Coupon Book
  couponsTitle: string;
  couponsSubtitle: string;
  coupons: LoveCoupon[];

  // 8. Custom Audio
  audioTitle: string;
  enableFloatingHearts: boolean;
  customSongUrl?: string; // Optional direct MP3 audio link to play your actual song

  // 9. Romantic Games Arcade
  arcadeTitle: string;
  arcadeSubtitle: string;
  triviaQuestions: TriviaQuestion[];
  wheelOptions: WheelOption[];
}

export const INITIAL_CONFIG: WebsiteConfig = {
  // --- 💖 COUPLE PROFILE ---
  boyfriendName: "Preetiii",
  yourName: "Your Forever Love",
  anniversaryDate: "2023-10-03", // 03/10/2023 (October 3, 2023)
  anniversaryYears: 3,

  // --- 🌸 HERO SECTION ---
  heroHeadline: "Happy 3 Years & Happy Boyfriend's Day, Preetiii!",
  heroSubheadline:
    "Three whole years of laughing at your jokes, stealing your hoodies, holding your hand through everything, and falling deeper in love with you every single sunrise.",
  heroPhotoUrl: "/src/assets/images/hero_romantic_couple_1790965179647.jpg",

  // --- ⏱️ LOVE COUNTER ---
  loveCounterTitle: "Counting Every Second In Love",
  loveCounterSubtitle:
    "From the very first moment on October 3, 2023 until right now, here is our journey together:",

  // --- 📖 OUR STORY / TIMELINE ---
  timelineTitle: "The Chapters of Us",
  timelineSubtitle:
    "Three chapters down, a whole lifetime of unwritten adventures to go.",
  timeline: [
    {
      id: "year-1",
      yearLabel: "Year 1 · 2023–2024",
      date: "The Spark & First Memories",
      title: "Where Our Forever Began",
      description:
        "From awkward butterflies and endlessly smiling at my phone, to our unforgettable first date sharing warm lattes and talking until the cafe closed down. You made my world feel so safe and magical from day one.",
      photoUrl: "/src/assets/images/memory_first_date_1790965193717.jpg",
      tag: "First Date & Butterflies",
    },
    {
      id: "year-2",
      yearLabel: "Year 2 · 2024–2025",
      date: "Adventures & Growing Closer",
      title: "Sunsets, Roadtrips & Cozy Chaos",
      description:
        "Learning all your little habits, watching sunsets on spontaneous trips, singing at the top of our lungs in the car, and cooking late-night snacks together. This was the year you truly became my home.",
      photoUrl: "/src/assets/images/memory_sunset_trip_1790965207476.jpg",
      tag: "Adventures & Home",
    },
    {
      id: "year-3",
      yearLabel: "Year 3 · 2025–2026",
      date: "3 Years Strong & Unbreakable",
      title: "The Sweetest Kind of Forever",
      description:
        "Celebrating 3 years together! We have weathered every storm, celebrated every win, and built something truly rare. You are my best friend, my proudest boy, and the love of my life. Happy Boyfriend's Day, handsome!",
      photoUrl: "/src/assets/images/memory_cozy_celebration_1790965215989.jpg",
      tag: "Unconditional Love",
    },
  ],

  // --- 🍯 "WHY I LOVE YOU" REASONS JAR ---
  jarTitle: "Little Jar of 36 Reasons I Love You",
  jarSubtitle:
    "36 little love notes—one for every single month of our 3 years together. Tap the jar to draw one!",
  reasons: [
    { id: 1, note: "The warm crinkles around your eyes whenever you genuinely laugh.", category: "sweet" },
    { id: 2, note: "How you always make sure I walk on the safe side of the sidewalk without even saying a word.", category: "romantic" },
    { id: 3, note: "Your silly morning voice and how adorably sleepy you look.", category: "funny" },
    { id: 4, note: "The gentle way you kiss my forehead when you say goodbye or goodnight.", category: "romantic" },
    { id: 5, note: "How patient and understanding you are, even when I'm being a dramatic baby.", category: "sweet" },
    { id: 6, note: "The way you remember the tiniest details about things I like or mentioned weeks ago.", category: "sweet" },
    { id: 7, note: "How handsome you look in your favorite jacket and that signature scent I love.", category: "romantic" },
    { id: 8, note: "The fact that you let me steal your fries (even when I claimed I wasn't hungry).", category: "funny" },
    { id: 9, note: "Your big, generous heart and how you treat the people around you with respect.", category: "sweet" },
    { id: 10, note: "Your warm hugs that instantly melt away all the stress of a bad day.", category: "cozy" },
    { id: 11, note: "The funny dances you do when you are excited about food or a good song.", category: "funny" },
    { id: 12, note: "How proud you make me every single day with your ambition and hard work.", category: "romantic" },
    { id: 13, note: "The cozy silence where we can just sit next to each other doing our own thing and feel completely at peace.", category: "cozy" },
    { id: 14, note: "How you hold my hand in public and squeeze it three times (I love you).", category: "romantic" },
    { id: 15, note: "Your goofy sense of humor that can pull me out of any sad mood in 5 seconds flat.", category: "funny" },
    { id: 16, note: "How safe and protected I feel in your arms every night.", category: "cozy" },
    { id: 17, note: "The way you look at me across a crowded room like I'm the only person there.", category: "romantic" },
    { id: 18, note: "Because you're not just my boyfriend—you are my absolute best friend and partner-in-crime.", category: "sweet" },
    { id: 19, note: "How you always support my wild dreams and cheer louder for me than anyone else.", category: "sweet" },
    { id: 20, note: "Your sweet sleepy cuddles where you pull me in close without waking up.", category: "cozy" },
    { id: 21, note: "The cute way you get concentrated when you are playing games or fixing something.", category: "funny" },
    { id: 22, note: "You always save the best bite of food for me.", category: "sweet" },
    { id: 23, note: "How our hands fit together so perfectly, like two puzzle pieces.", category: "romantic" },
    { id: 24, note: "Your kindness, integrity, and the morals you carry yourself with.", category: "sweet" },
    { id: 25, note: "Because after 3 whole years, my heart still skips a beat when you smile at me.", category: "romantic" },
    { id: 26, note: "The cute voice you make when you talk to sweet animals.", category: "funny" },
    { id: 27, note: "How we can talk for 4 hours about absolutely nothing and never get bored.", category: "sweet" },
    { id: 28, note: "Your unwavering reassurance whenever overthinking tries to get the best of me.", category: "cozy" },
    { id: 29, note: "How handsome you look right now as you read this screen!", category: "funny" },
    { id: 30, note: "Because you are simply Preetiii—my favorite human in the entire universe.", category: "romantic" },
    { id: 31, note: "How you always hold my hand tighter when we cross the street or walk through a crowd.", category: "romantic" },
    { id: 32, note: "Your goofy little victory smile when you find what you were looking for or win a game.", category: "funny" },
    { id: 33, note: "The sweet scent of your cologne that lingers on my favorite hoodie days after hugging you.", category: "cozy" },
    { id: 34, note: "How you make even the most boring errands like grocery shopping feel like a fun date.", category: "sweet" },
    { id: 35, note: "Because you believe in me even when I doubt myself, always being my biggest cheerleader.", category: "sweet" },
    { id: 36, note: "For all 36 months of love, laughter, and memories we've shared—and a lifetime more to come!", category: "romantic" },
  ],

  // --- 📸 POLAROID MEMORY LANE ---
  galleryTitle: "Our Memory Lane",
  gallerySubtitle:
    "Little polaroid snapshots from our golden moments. Hover or click to look closely!",
  polaroids: [
    {
      id: "p1",
      caption: "Our very first cafe date · Warm lattes & bashful smiles",
      date: "October 2023",
      photoUrl: "/src/assets/images/memory_first_date_1790965193717.jpg",
      rotateDeg: -2,
      tapeColor: "#fde2e4",
    },
    {
      id: "p2",
      caption: "Golden hour sunset walks by the water · Pure magic",
      date: "Summer Getaway",
      photoUrl: "/src/assets/images/memory_sunset_trip_1790965207476.jpg",
      rotateDeg: 2.5,
      tapeColor: "#e2ece9",
    },
    {
      id: "p3",
      caption: "Celebrating 3 sweet years with sweet treats & sparklers",
      date: "Anniversary Celebration",
      photoUrl: "/src/assets/images/memory_cozy_celebration_1790965215989.jpg",
      rotateDeg: -3,
      tapeColor: "#fff1e6",
    },
    {
      id: "p4",
      caption: "Stargazing picnic with cozy blankets & fairy lights",
      date: "Late Night Talks",
      photoUrl: "/src/assets/images/memory_stargazing_night_1790965227478.jpg",
      rotateDeg: 1.5,
      tapeColor: "#dfe7fd",
    },
  ],

  // --- 💌 SECRET LOVE LETTER ---
  letterTitle: "A Sealed Letter For You",
  letterSubtitle: "Break the wax seal to unfold my heart's message on our special day.",
  letterGreeting: "To My Dearest Preetiii,",
  letterBody: [
    "Happy 3rd Anniversary, and Happy National Boyfriend's Day! Looking back over these 1,095+ days together, I am still in awe of how naturally and effortlessly you became the brightest part of my life.",
    "Thank you for being my constant rock when things get tough, my favorite person to laugh with until our stomachs hurt, and the gentlest soul who always knows how to make me feel cherished and heard. In a world that is always in a hurry, with you, time feels slow, warm, and precious.",
    "Three years feels like both a heartbeat and a rich lifetime of memories. I love the person you are, I love the person you inspire me to be, and I love the home we've created in each other's hearts. No matter where life takes us next, my favorite place will always be right next to you.",
    "Happy Anniversary, my love. Here's to 3 wonderful years, and to a hundred more.",
  ],
  letterClosing: "With all my love, forever & always,",
  letterSignature: "Your Girlfriend 💖",

  // --- 🎟️ LOVE COUPON BOOK ---
  couponsTitle: "Your Boyfriend's Day Coupon Book",
  couponsSubtitle:
    "Treat yourself, handsome! Click to redeem whenever you want—no expiration date, guaranteed honor system.",
  coupons: [
    {
      id: "coupon-1",
      title: "One Free Home-Cooked Feast",
      description: "Any meal of your choice, cooked with love (and unlimited dessert).",
      category: "Food & Treats",
      terms: "Redeemable anytime you're hungry. Chef accepts special requests!",
      iconName: "Utensils",
    },
    {
      id: "coupon-2",
      title: "Movie Night of Your Pick",
      description: "You get full control of the remote, cozy blankets, and favorite popcorn.",
      category: "Entertainment",
      terms: "Zero complaints, even if it's an action movie or 3-hour sci-fi marathon.",
      iconName: "Film",
    },
    {
      id: "coupon-3",
      title: "A Long Relaxing Massage",
      description: "Shoulders, back, or neck massage with relaxing music and sweet vibes.",
      category: "Wellness",
      terms: "Valid whenever work was tiring or your muscles need pampering.",
      iconName: "Sparkles",
    },
    {
      id: "coupon-4",
      title: "Win One Silly Argument Instantly",
      description: "Present this coupon to win immediately. You are officially 100% right.",
      category: "Golden Pass",
      terms: "Valid once! Use wisely for emergency stubborn moments.",
      iconName: "Crown",
    },
    {
      id: "coupon-5",
      title: "Spontaneous Ice Cream & Coffee Run",
      description: "Late night drive to grab your favorite treat on me.",
      category: "Sweet Tooth",
      terms: "Includes unlimited toppings and good music in the car.",
      iconName: "Coffee",
    },
    {
      id: "coupon-6",
      title: "Unlimited Cuddle & Hug Marathon",
      description: "Non-stop cozy snuggles with no time limit allowed.",
      category: "Love & Cozy",
      terms: "Cannot be refused under any circumstances. Automatic acceptance.",
      iconName: "Heart",
    },
  ],

  // --- 🎵 AUDIO & EFFECTS ---
  audioTitle: "Romantic Lo-Fi / Soft Melodies",
  enableFloatingHearts: true,

  // --- 🎮 ROMANTIC GAMES ARCADE ---
  arcadeTitle: "Our Love Games Arcade",
  arcadeSubtitle: "A cozy collection of 3 cute interactive mini-games made just for us. Test your memory, spin for date night prizes, and see how well you know our story!",
  triviaQuestions: [
    {
      id: 1,
      question: "Where did we have our very first official date together?",
      options: [
        "Cozy Coffee Cafe sipping warm lattes",
        "A loud busy restaurant",
        "A 3-hour movie theater screening",
        "We got lost in a parking lot"
      ],
      correctIndex: 0,
      explanation: "Our sweet coffee date where we talked for hours until the cafe closed! ☕"
    },
    {
      id: 2,
      question: "What is our official anniversary start date?",
      options: [
        "October 3, 2023",
        "November 14, 2023",
        "August 20, 2023",
        "December 25, 2023"
      ],
      correctIndex: 0,
      explanation: "October 3, 2023 — the day our favorite forever started! 💖"
    },
    {
      id: 3,
      question: "What late-night treat will we NEVER say no to?",
      options: [
        "Plain dry crackers",
        "Late-night ice cream & sweet fries run",
        "Cold soup",
        "Celery sticks"
      ],
      correctIndex: 1,
      explanation: "Spontaneous ice cream runs and car chats are our specialty! 🍨"
    },
    {
      id: 4,
      question: "Who is the certified world champion blanket-stealer at night?",
      options: [
        "Preetiii (no defense!)",
        "Me (definitely innocent... mostly)",
        "The blankets mysteriously evaporate",
        "Both of us fight for survival"
      ],
      correctIndex: 1,
      explanation: "I might steal 85% of the blankets, but I keep you warm with hugs! 🧸"
    },
    {
      id: 5,
      question: "What is my absolute favorite thing about you?",
      options: [
        "Your kindness, infectious laugh & warm hugs",
        "How handsome you look in your favorite jacket",
        "Your patience and gentle heart",
        "All of the above and a million more!"
      ],
      correctIndex: 3,
      explanation: "Everything about you! You're simply the best boyfriend in the world. 🏆"
    }
  ],
  wheelOptions: [
    { id: "w1", text: "Late Night Ice Cream Run", color: "#f43f5e", category: "Treat" },
    { id: "w2", text: "10-Min Relaxing Massage", color: "#fb7185", category: "Pamper" },
    { id: "w3", text: "You Pick The Movie Tonight", color: "#f59e0b", category: "Entertainment" },
    { id: "w4", text: "Reenact Our First Kiss", color: "#ec4899", category: "Romance" },
    { id: "w5", text: "3 Things You Adore About Me", color: "#8b5cf6", category: "Sweet" },
    { id: "w6", text: "Cook Comfort Food Together", color: "#10b981", category: "Food" },
    { id: "w7", text: "Slow Dance in the Living Room", color: "#06b6d4", category: "Romance" },
    { id: "w8", text: "FREE WISH: Any Favor You Want", color: "#e11d48", category: "Golden Pass" }
  ],
};
