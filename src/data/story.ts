/**
 * =======================================================================
 * OUR LITTLE UNIVERSE - CONFIGURATION & STORY DATA
 * =======================================================================
 */

export interface TimelineMemory {
  id: string;
  number: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  quote?: string;
  image: string;
  video?: string;
  mediaType?: 'image' | 'video';
  emoji?: string;
  tag?: string;
}

export interface LittleThing {
  id: string;
  title: string;
  preview: string;
  iconName: string;
  fullStory: string;
  date?: string;
  personalNote?: string;
  image?: string;
  video?: string;
}

export interface JarStarMemory {
  id: string;
  title: string;
  memory: string;
  color?: string;
  date?: string;
}

export interface PolaroidItem {
  id: string;
  image: string;
  video?: string;
  caption: string;
  date?: string;
  location?: string;
  rotation: number;
  backNote?: string;
}

export interface FilmFrame {
  id: string;
  frameNumber: string;
  image: string;
  video?: string;
  title: string;
  timecode: string;
  quote: string;
}

export interface ThingILove {
  id: string;
  text: string;
  highlight?: string;
}

export interface StoryConfig {
  couple: {
    myName: string;
    hisName: string;
    nickname: string;
    ourDate: string;
    specialPlace: string;
  };
  intro: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    buttonText: string;
    headphonesNote: string;
  };
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    image: string;
    video?: string;
  };
  memoryIntro: {
    title: string;
    subtitle: string;
    quote: string;
  };
  timeline: TimelineMemory[];
  littleThings: LittleThing[];
  memoryJar: {
    title: string;
    subtitle: string;
    instruction: string;
    stars: JarStarMemory[];
  };
  polaroids: PolaroidItem[];
  filmReel: {
    heading: string;
    subtitle: string;
    focalPrompt: string;
    frames: FilmFrame[];
  };
  soundtrack: {
    heading: string;
    subtitle: string;
    songTitle: string;
    artist: string;
    audioSrc: string;
    albumArt: string;
    lyricsSnippet: string;
  };
  thePause: {
    lines: string[];
  };
  apology: {
    envelopeLabel: string;
    salutation: string;
    opening: string;
    bodyParagraphs: string[];
    closing: string;
    signOff: string;
  };
  pleaseRemember: {
    heading: string;
    statements: string[];
    keyTakeaway: string;
    quote: string;
  };
  thingsILove: ThingILove[];
  easterEggs: {
    moonMessage: string;
    secretStarMessage: string;
    polaroidSecretNote: string;
    secretWhisper: string;
  };
  finalMessage: {
    heading: string;
    paragraphs: string[];
    subtext: string;
  };
  finalCTA: {
    buttonText: string;
    reassuranceTitle: string;
    reassuranceLines: string[];
    closingNote: string;
    timedPSMessage: string;
  };
}

export const initialStoryData: StoryConfig = {
  couple: {
    myName: "pappaa",
    hisName: "My Everything",
    nickname: "chelllooo",
    ourDate: "Jan 29 2025",
    specialPlace: "Our Favourite Spot"
  },
  intro: {
    line1: "Hey you…",
    line2: "Before you decide anything…",
    line3: "Can you give me a few minutes?",
    line4: "I made a little place for us.",
    buttonText: "Enter Our Little Universe →",
    headphonesNote: "🎧 Headphones recommended for our ambient soundtrack"
  },
  hero: {
    title: "OUR LITTLE UNIVERSE",
    subtitle: "en thangamana paiyan  of my life",
    tagline: "Every laugh, every quiet midnight call, every unsaid thought — kept safe right here.",
    image: "/uploads/upload_1789959641502_insidehim.jpeg"
  },
  memoryIntro: {
    title: "Do you remember?",
    subtitle: "Before we talk about today… let's go back for a little while.",
    quote: "“Sometimes the smallest moments ended up taking the biggest space in my heart.”"
  },
  timeline: [
    {
      id: "timeline-1",
      number: "01",
      title: "holding hands",
      date: "all dates i neeed it",
      location: "Where it all started",
      description: " lirfe full ah ipd puduchutu ella pakamum naa kutitu poren nee edukara risk puryuthu ellame en thappu thaa sorry ana nee vangra thittu ku ellam eatha vida athigama una happy ah vechupe",
      quote: "“Iife long like this.”",
      image: "/uploads/upload_1789959962354_meantobeforever.jpeg",
      emoji: "✨",
      tag: "First Chapter",
      mediaType: "image"
    },
    {
      id: "timeline-2",
      number: "02",
      title: "All day",
      date: "A quiet afternoon",
      location: "over ur  jupiter",
      description: "enkaga risk eduthu  ella timeum ena kootui vnathu vittu kuttitu poathu ngrathu periya vishaym un veedla ipd rukarapo ana en papa enakga pannum ellame atha naa value panna koodathunu illa  unaku apd kandippa thonirukum sorrryyyyy chelloooo!!!!!!!!!",
      quote: "“.a phtootgraphy like this mattersss when u are of several problems ”",
      image: "/uploads/upload_1789959970472_my_aalu.jpeg",
      emoji: "☕",
      tag: "Connection",
      mediaType: "image"
    },
    {
      id: "timeline-3",
      number: "03",
      title: "Meltt n Mingle",
      date: "all dates like this",
      location: "Everywhere & Nowhere",
      description: "enakaga naa asapatenu en appaa melt and mingle kootitu pochu unakula ulla bayam kandipa irunthurkum but enakaga en papa risk eduthu ena kotitu poi porumaya ena dspada vechu kootitu vanthu ena alaga photo eduthu kufuthu ukkara vechu ellame panathu en chello thaa",
      quote: "“specuial date with minee!!.”",
      image: "/uploads/upload_1789959976713_melt.jpeg",
      emoji: "🚗",
      tag: "Everyday Magic",
      mediaType: "image"
    },
    {
      id: "timeline-4",
      number: "04",
      title: "Brooks",
      date: "Countless times",
      location: "Togetherness",
      description: "unga veetla thittu vangi time spend pannaum nu en chello en thango enkodoa  vanthathu unaku nyabagam iruka dugout la un mela apd viluntahthu nama rendu perum litterlay hugging everywehere around we had our own time ven in the chaos",
      quote: "“i wil make u laugh like that all over our lifeee”",
      image: "/uploads/upload_1789959982753_brooks.jpeg",
      emoji: "💖",
      tag: "Pure Happiness",
      mediaType: "image"
    },
    {
      id: "timeline-5",
      number: "05",
      title: "Juice barr",
      date: "02:45 AM",
      location: "",
      description: "enakaga edukra risk la ithu frequent unaku konja time kedacha kooda ena veliya kootitu pova athu laaam  apdiey pattampocchi parakarav mathir athlemma thaa una spl ah kamikum  feel aagum thank you chelloooo for the lovee",
      quote: "“You made feeling vulnerable feel ”",
      image: "/uploads/upload_1789959988732_juicebar.jpeg",
      emoji: "🌙",
      tag: "Heart to Heart",
      mediaType: "image"
    },
    {
      id: "timeline-6",
      number: "06",
      title: "The Little Fights",
      date: "Moments of growth",
      location: "Making up",
      description: "Even when we disagreed or misunderstood each other, we always found our way back because what we have was always bigger than our stubbornness.",
      quote: "“Learning to understand you better with each day.”",
      image: "/uploads/upload_1789960000860_recent_fav.jpeg",
      emoji: "🌿",
      tag: "Understanding",
      mediaType: "image"
    },
    {
      id: "timeline-7",
      number: "07",
      title: "Dec 12",
      date: "my chello's bdayyy",
      location: "",
      description: "unti i have my breath with u i will never fail to make ur bdays more speacil than this  unaku ellam gift um vangi kuudpen athukaaga ve sambarichu una pathupen ppaa serious ahh",
      quote: "“Every corner of my mind has a footprint of you and i own it .”",
      image: "/uploads/upload_1789960010765_dec12.jpeg",
      emoji: "📸",
      tag: "Keepsakes",
      mediaType: "image"
    },
    {
      id: "timeline-8",
      number: "08",
      title: "Our Oct 7",
      date: "Today & Always",
      location: "Our Universe",
      description: "this was our 1st anniversay enaku antha mathri 50 to 60 anniversires ahchuu una veliya kootitu poi neray vangi kuduthu celeberate pannummmm!!!",
      quote: "“What we built still matters to me, more than you know.”",
      image: "/images/memory-first-date.jpg",
      emoji: "🌌",
      tag: "Forever Present",
      mediaType: "video",
      video: "/uploads/upload_1789960030558_WhatsApp_Video_2026-09-20_at_12.40.16_PM.mp4"
    }
  ],
  littleThings: [
    {
      id: "lt-1",
      title: "Random Calls",
      preview: "Calling just to hear your voice for two minutes",
      iconName: "PhoneCall",
      fullStory: "Even when we had nothing specific to say, just hearing you say 'hello?' instantly softened whatever stress I had carried all day.",
      date: "Random Tuesday",
      personalNote: "I still check my phone hoping to see your name pop up.",
      image: "/images/polaroid-01.jpg"
    },
    {
      id: "lt-2",
      title: "“Saaptacha?” Messages",
      preview: "That simple text asking if I had eaten",
      iconName: "MessageCircle",
      fullStory: "It was never just about food — it was the quiet, consistent way you looked out for me even in the middle of your busy workdays.",
      date: "Every single afternoon",
      personalNote: "Those little check-ins meant the world to me.",
      image: "/images/polaroid-02.jpg"
    },
    {
      id: "lt-3",
      title: "Stupid Jokes",
      preview: "Inside jokes that only you and I understand",
      iconName: "Smile",
      fullStory: "Those moments where nobody else would find it funny, but we would laugh until our stomachs hurt and our eyes watered.",
      date: "Countless memories",
      personalNote: "Nobody gets my weird humor like you do.",
      image: "/images/polaroid-03.jpg"
    },
    {
      id: "lt-4",
      title: "Late-Night Rambles",
      preview: "Staying on call until one of us falls asleep",
      iconName: "Moon",
      fullStory: "Listening to your breathing slow down as you fell asleep on call. It was the most peaceful feeling in the world.",
      date: "Late nights",
      personalNote: "The quietest and most sacred part of my days.",
      image: "/images/polaroid-04.jpg"
    },
    {
      id: "lt-5",
      title: "Random Photos",
      preview: "Silly angles and candid blurry snapshots",
      iconName: "Camera",
      fullStory: "All those unposed pictures saved in my private gallery that never made it to social media, but hold our most genuine smiles.",
      date: "Private album",
      personalNote: "My favourite gallery folder.",
      image: "/images/polaroid-05.jpg"
    },
    {
      id: "lt-6",
      title: "Making Up Afterwards",
      preview: "That gentle relief after we talked things through",
      iconName: "HeartHandshake",
      fullStory: "The way you’d soften your voice and we’d both realize how much we hated being apart or angry at each other.",
      date: "Quiet moments",
      personalNote: "You taught me what patience and care look like.",
      image: "/images/polaroid-06.jpg"
    },
    {
      id: "lt-7",
      title: "Waiting for Your Reply",
      preview: "That quick flutter whenever the notification chime goes off",
      iconName: "BellRing",
      fullStory: "Glancing at my phone and instantly smiling just seeing your text on my lockscreen.",
      date: "Every day",
      personalNote: "You’ve always had my undivided attention.",
      image: "/images/polaroid-01.jpg"
    },
    {
      id: "lt-8",
      title: "Saying Goodnight",
      preview: "Never going to sleep without letting each other know",
      iconName: "Sparkles",
      fullStory: "Even when tired, sending that final sweet message so the day ended with warmth and reassurance.",
      date: "Every night",
      personalNote: "Nights feel colder without your goodnight.",
      image: "/images/polaroid-02.jpg"
    }
  ],
  memoryJar: {
    title: "Things I never want to forget.",
    subtitle: "A glass jar filled with tiny glowing stars — each holding a piece of my heart.",
    instruction: "Pick a star to reveal a memory.",
    stars: [
      {
        id: "star-1",
        title: "liplock",
        memory: "unaku nybagam that day we locked together with everything and unoda pala naal kanavu apo nenavua achu naa kooda um nu sollala nu solluviyee",
        date: "Always",
        color: "#ff2a73"
      },
      {
        id: "star-2",
        title: "First memorble bike ride",
        memory: "unoda vandila ukkanthut labo libo nu kathitu vanthutu unaku sudu vechute  sorry for taht thangooo",
        date: "Memory #2",
        color: "#e5c583"
      },
      {
        id: "star-3",
        title: "That one call",
        memory: "kalyanam panni kulantha pirakra varikum ellaame antha call eh panni muduchom that will be  our best call we had anyways ipo nee dink nu solra but athu feelsls wwowo la a",
        date: "A quiet midnight",
        color: "#ff8fb5"
      },
      {
        id: "star-4",
        title: "Our stupid conversations",
        memory: "Debating the most pointless hypothetical scenarios for an hour with full seriousness.",
        date: "Pure joy",
        color: "#9b2ce6"
      },
      {
        id: "star-5",
        title: "The way you listen",
        memory: "en ella prachnayum listen panni ena ellamvum irunthhu pathukituu enoda first first oru paian ta irunthu ivlo ove alaga feel pannavechathu nee thaa",
        date: "Kept in heart",
        color: "#ff2a73"
      },
      {
        id: "star-6",
        title: "remmeber our first long drive",
        memory: "naa apo thaa una firts first hug pnannen vandila kai puduchutu ana apo thryathu neee enkodda lie long varuvenu but we are meant to be lie that ",
        date: "Mornings",
        color: "#e5c583"
      },
      {
        id: "star-7",
        title: "Our quiet comfort",
        memory: "our coco by sittuing in scootyy",
        date: "Peace",
        color: "#ff8fb5"
      },
      {
        id: "star-8",
        title: "The little things",
        memory: "naa asapaten nekaga kutty kutty ah varachu kudukarathu ellmae special athanaa.",
        date: "Treasured",
        color: "#e60049"
      }
    ]
  },
  polaroids: [
    {
      id: "pol-1",
      image: "/uploads/upload_1789960797934_handle_me.jpeg",
      caption: "My favourite smile in the whole universe.",
      date: "Captured moment",
      location: "Our Spot",
      rotation: -3,
      backNote: "P.S. You didn't even notice I was taking this picture. You were looking at something in the distance, looking so handsome."
    },
    {
      id: "pol-2",
      image: "/uploads/upload_1789960804071_kutty.jpeg",
      caption: "Our little quiet chaos & coffee mornings.",
      date: "Sunday warmth",
      location: "Our corner table",
      rotation: 4,
      backNote: "We spent three hours talking about everything and nothing. I ordered two cups just to stay longer."
    },
    {
      id: "pol-3",
      image: "/uploads/upload_1789960810933_WhatsApp_Image_2026-09-20_at_10.28.32_AM__3_.jpeg",
      caption: "That day when the sky matched our mood.",
      date: "Golden Sunset",
      location: "Hilltop overlook",
      rotation: -2,
      backNote: "I remember thinking that evening: 'I hope we get to watch a hundred more sunsets just like this.'"
    },
    {
      id: "pol-4",
      image: "/uploads/upload_1789960820413_WhatsApp_Image_2026-09-20_at_10.28.33_AM.jpeg",
      caption: "Just us, laughing at our own silliness.",
      date: "Autumn evening",
      location: "Park walk",
      rotation: 3,
      backNote: "You made that ridiculous joke and I couldn't stop laughing for ten minutes straight."
    },
    {
      id: "pol-5",
      image: "/uploads/upload_1789960828455_WhatsApp_Image_2026-09-20_at_10.28.33_AM__2_.jpeg",
      caption: "The walk along the beach as twilight arrived.",
      date: "Golden hour",
      location: "Seaside breeze",
      rotation: -4,
      backNote: "The sound of the waves and your hand in mine. One of the calmest days of my life."
    },
    {
      id: "pol-6",
      image: "/uploads/upload_1789960897444_WhatsApp_Image_2026-09-20_at_10.28.32_AM__1_.jpeg",
      caption: "Rainy streets, one umbrella, zero worries.",
      date: "City lights",
      location: "Downtown stroll",
      rotation: 2,
      backNote: "My shoes were completely wet, but I didn't care at all because you were walking beside me."
    }
  ],
  filmReel: {
    heading: "If I could rewind…",
    subtitle: "A reel of moments I wish I could pause time in.",
    focalPrompt: "I would stop here for a little longer.",
    frames: [
      {
        id: "frame-1",
        frameNumber: "001",
        image: "/images/film-01.jpg",
        title: "The first time we locked eyes",
        timecode: "00:14:22",
        quote: "jan 29 a long day which we are planning for apo kooda na mum mum nu panla nu sonniye apo edutahthu",
        video: "/uploads/upload_1789961803869_WhatsApp_Video_2026-09-20_at_12.40.15_PM.mp4"
      },
      {
        id: "frame-2",
        frameNumber: "002",
        image: "/images/film-02.jpg",
        title: "The endless constant",
        timecode: "01:08:45",
        quote: "my endless laughter when u are beside  me",
        video: "/uploads/upload_1789959674105_WhatsApp_Video_2026-09-20_at_2.25.15_PM.mp4"
      },
      {
        id: "frame-3",
        frameNumber: "003",
        image: "/images/film-03.jpg",
        title: "an videocall to remember",
        timecode: "02:30:10",
        quote: "nee dance adi kamichathu naa veeda suthi kamichathu that made my day a valued lovedd one",
        video: "/uploads/upload_1789959688502_WhatsApp_Video_2026-09-20_at_2.27.28_PM.mp4"
      },
      {
        id: "frame-4",
        frameNumber: "004",
        image: "/images/film-04.jpg",
        title: "showing off of  face",
        timecode: "03:15:00",
        quote: "kutty kutty calls naa face kamika maraikarathu all those",
        video: "/uploads/upload_1789959701067_WhatsApp_Video_2026-09-20_at_2.27.29_PM.mp4"
      },
      {
        id: "frame-5",
        frameNumber: "005",
        image: "/images/film-05.jpg",
        title: "first vlog",
        timecode: "04:22:18",
        quote: "library la eduthathu anga thaa ellam starta achu nee irst first kai ketathu naa kudukama iruntathu athu apro neraya kai puduchukatahthu may be nee keta apo kudthruntha ivlo prachana vanthrukathu",
        video: "/uploads/upload_1789959716368_WhatsApp_Video_2026-09-20_at_2.27.38_PM.mp4"
      },
      {
        id: "frame-6",
        frameNumber: "006",
        image: "/images/film-06.jpg",
        title: "Under the umbrella in the rain",
        timecode: "05:01:40",
        quote: "its all about littel moments wid u ",
        video: "/uploads/upload_1789959731277_WhatsApp_Video_2026-09-20_at_2.27.40_PM.mp4"
      }
    ]
  },
  soundtrack: {
    heading: "Our soundtrack.",
    subtitle: "Some songs don't sound the same after you associate them with someone.",
    songTitle: "Marappadhilai-Nenje-(Additional-Song)-MassTamilan.io",
    artist: "Our Custom Track",
    audioSrc: "/uploads/upload_1789961749476_Marappadhilai-Nenje-_Additional-Song_-MassTamilan.io.mp3",
    albumArt: "/images/hero-couple.jpg",
    lyricsSnippet: "“In a universe full of noise, you were always my calm.”"
  },
  thePause: {
    lines: [
      "And then…",
      "I made a mistake.",
      "A careless one.",
      "And I'm genuinely sorry."
    ]
  },
  apology: {
    envelopeLabel: "enoda ",
    salutation: "thango ",
    opening: "I know I made a careless mistake.",
    bodyParagraphs: [
      "enaku thryum una kastama situation la thallitu iruken neraya hurt panre then enoda carelessness nala thaan ivlo pracha unaku iam so sorryyyy thangoo crcrt thaa naa oru thadava rendu thadava panna athu thapu papaa  ana romba periya thappu una avlo thittu vanga veikren ",
      "I'm not going to make excuses or justify it. Hurting you, distressing you, or making you doubt how much you mean to me was never my intention  but I recognize that intent doesn't change the impact of what happened.",
      "I take full accountability. I value you, your feelings, your peace of mind, and our bond far too much to ever take you for granted.    ",
      "enaku una avlo pudikum ulagam alavuku ellame pduikum en papa enakaga ellame pannum avan nala mudunja risk edukum naa thaa loosu mathri sila times panniduven enoda madness nala enaku intha relationship mudya venam pleassee enakuu neee venum kadaaisi moment of life varakum en na avlo attach ayiruken unkitta nannum nee ilama un  hug ilama ,un kisses illama, full ah nee ilama enala  happy ah seri v2 pona poranu iruka mudiyathu enala en papa va avlo easy ah vitu kuduka mudyathuuu enaku nee venum athukaga naa entha extent kum poven and pleasee limit laam venameee i got so addicted in u i can walk back again "
    ],
    closing: "with love or my love",
    signOff: "Forever Yours 🤍"
  },
  pleaseRemember: {
    heading: "Please remember…",
    statements: [
      "I'm not asking you to forget what happened.",
      "I'm not asking you to stop being angry right now.",
      "I'm not asking you to forgive me immediately."
    ],
    keyTakeaway: "I only want you to remember…",
    quote: "“One mistake doesn't erase every beautiful, honest moment we shared.”"
  },
  thingsILove: [
    {
      id: "love-1",
      text: "How we can talk about absolutely nothing for hours and never get bored.",
      highlight: "Effortless Bond"
    },
    {
      id: "love-2",
      text: "How one stupid joke from you can completely turn around my worst day.",
      highlight: "Your Humor"
    },
    {
      id: "love-3",
      text: "How we became so comfortably ourselves without any pretense or masks.",
      highlight: "True Comfort"
    },
    {
      id: "love-4",
      text: "The little conversations I never thought I'd remember, but keep replaying.",
      highlight: "Kept Memories"
    },
    {
      id: "love-5",
      text: "The reassuring feeling of simply knowing you are there in my corner.",
      highlight: "Quiet Anchor"
    },
    {
      id: "love-6",
      text: "The way you look at me when you think I'm not paying attention.",
      highlight: "Pure Warmth"
    },
    {
      id: "love-7",
      text: "How thoughtful you are when you take care of the people you love.",
      highlight: "Your Heart"
    },
    {
      id: "love-8",
      text: "The way you make ordinary places feel like our own private world.",
      highlight: "Our Universe"
    }
  ],
  easterEggs: {
    moonMessage: "🌕 “Even when we are quiet, the moon watches over our memories.”",
    secretStarMessage: "✨ “You found secret Star #7! P.S. You still have the cutest smile I've ever seen.”",
    polaroidSecretNote: "💌 “Remember when we tried to take that photo and dropped the phone? Worth it.”",
    secretWhisper: "🕊️ “I really miss talking to you.”"
  },
  finalMessage: {
    heading: "One last thing…",
    paragraphs: [
      "I don't want to force an answer from you.",
      "I don't want to make you feel guilty, pressured, or rushed.",
      "I just want one honest, gentle conversation whenever you feel ready.",
      "Until then… I'm right here."
    ],
    subtext: "Take all the time and space you need."
  },
  finalCTA: {
    buttonText: "Can we talk? 🤍",
    reassuranceTitle: "Whenever you're ready.",
    reassuranceLines: [
      "No pressure.",
      "No perfect words required.",
      "Just you and me.",
      "Let's talk when you're ready."
    ],
    closingNote: "I'm always listening.",
    timedPSMessage: "P.S. — If you smiled even once while going through this… then maybe this little universe still has some magic left. ✨"
  }
};

export const storyData = initialStoryData;
