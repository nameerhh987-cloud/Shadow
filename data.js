// ============================================================================
// Shadow Fitness – Gulshan Branch | Data Configuration File (data.js)
// ============================================================================

const SHADOW_DATA = {
  gym: {
    name: "SHADOW FITNESS",
    branch: "Gulshan Branch",
    tagline: "Forge Your Discipline In The Shadows.",
    description: "Karachi's serious gym for serious lifters. Olympic equipment, expert coaches, zero chaos at Block 4 Gulshan-e-Iqbal.",
    phone: "0336 4769509",
    phoneRaw: "03364769509",
    whatsappNumber: "923364769509",
    whatsappLink: "https://wa.me/923364769509",
    address: {
      plot: "FL-3",
      road: "Allama Shabbir Ahmed Usmani Rd",
      block: "Block 4 Gulshan-e-Iqbal",
      city: "Karachi",
      postalCode: "75300",
      country: "Pakistan",
      full: "FL-3 Allama Shabbir Ahmed Usmani Rd, Block 4 Gulshan-e-Iqbal, Karachi, 75300, Pakistan",
      short: "FL-3 Block 4 Gulshan-e-Iqbal, Karachi"
    },
    maps: {
      queryUrl: "https://maps.google.com/?q=FL-3+Allama+Shabbir+Ahmed+Usmani+Rd+Block+4+Gulshan-e-Iqbal+Karachi",
      embedUrl: "https://www.google.com/maps?q=FL-3+Allama+Shabbir+Ahmed+Usmani+Rd+Block+4+Gulshan-e-Iqbal+Karachi&output=embed"
    }
  },

  stats: [
    { label: "Hours", value: "6 AM – 11 PM" },
    { label: "Equipment", value: "Olympic Grade" },
    { label: "Climate", value: "Full AC + Gen" },
    { label: "Location", value: "Block 4 Gulshan" }
  ],

  about: {
    sectionLabel: "The Gulshan Chapter",
    title: "Built for Focus, Space & Real Results.",
    description: "Located at FL-3 Allama Shabbir Ahmed Usmani Road, Block 4 Gulshan-e-Iqbal, Shadow Fitness was designed from the ground up to eliminate gym chaos.",
    subDescription: "Precision rubberized flooring, imported biomechanically tuned machines, dedicated free-weight bays, and a no-nonsense training culture.",
    checklist: [
      "Certified strength coaches",
      "Lockers, showers & steam",
      "Separate ladies & gents slots",
      "Full AC & generator backup"
    ],
    floorStats: [
      { label: "Floor Layout", value: "Premium 2-Level" },
      { label: "Free Weights", value: "Up to 60KG DBs" },
      { label: "Power Platforms", value: "Olympic Bays" },
      { label: "Power Backup", value: "100% Generator", isGreen: true },
      { label: "Branch Hotline", value: "0336 4769509", isRed: true, isTel: true }
    ]
  },

  facilities: [
    {
      id: "iron-bay",
      title: "Heavy Iron Bay",
      desc: "Calibrated urethane plates, rubber hex dumbbells up to 60kg, competition benches, and dedicated deadlift platforms.",
      icon: "dumbbell"
    },
    {
      id: "cardio-deck",
      title: "Cardio Deck",
      desc: "Commercial curved treadmills, assault bikes, stairmasters, and rowing machines for peak aerobic conditioning.",
      icon: "heart-pulse"
    },
    {
      id: "expert-coaches",
      title: "Expert Coaches",
      desc: "Certified trainers who design personalized macros, progressive overload protocols, and correct form in every session.",
      icon: "users"
    },
    {
      id: "steam-lockers",
      title: "Steam & Lockers",
      desc: "Secure digital lockers, clean showers, post-workout steam sauna, and chilled hydration stations.",
      icon: "sparkles"
    }
  ],

  programs: [
    {
      id: "hypertrophy",
      phase: "Phase 01",
      title: "Hypertrophy & Bodybuilding",
      desc: "Targeted muscle isolation, mechanical tension, and volume training to sculpt balanced, aesthetic mass.",
      popular: false,
      checks: [
        "Progressive Overload Tracking",
        "Compound & Cable Pairings",
        "Nutritional Surplus Guidance"
      ],
      ctaText: "Enroll in Program"
    },
    {
      id: "fatloss",
      phase: "Phase 02",
      title: "Fat Loss & Athletic Shred",
      desc: "Metabolic circuits, VO2 conditioning, and structured caloric deficits for lean muscle retention.",
      popular: true,
      tag: "Most Popular",
      checks: [
        "Fat Oxidation Protocols",
        "Weekly Body Composition Audit",
        "Cardio Interval Systems"
      ],
      ctaText: "Start Shredding"
    },
    {
      id: "powerlifting",
      phase: "Phase 03",
      title: "Powerlifting & Strength",
      desc: "Master the Big 3 — Squat, Bench, Deadlift — with chalk-allowed platforms and biomechanical coaching.",
      popular: false,
      checks: [
        "RPE & 1-Rep Max Programming",
        "Olympic Deadlift Platform",
        "Joint Mobility & Longevity"
      ],
      ctaText: "Enroll in Program"
    }
  ],

  pricing: [
    {
      id: "monthly",
      name: "Monthly Standard",
      subLabel: "Flexible Commitment",
      price: "6,500",
      period: " / mo",
      note: "Billed monthly. Zero lock-in.",
      popular: false,
      badge: null,
      ctaText: "Join Monthly",
      features: [
        { text: "Full Gym Floor Access", included: true },
        { text: "Unlimited Cardio Deck", included: true },
        { text: "Daily Locker & Showers", included: true },
        { text: "Free Machine Orientation", included: true },
        { text: "Personalized Nutrition Plan", included: false }
      ]
    },
    {
      id: "quarterly",
      name: "Quarterly Pro",
      subLabel: "3-Month Transformation",
      price: "16,500",
      period: " / 3 mos",
      note: "Save PKR 3,000 vs monthly rate",
      popular: true,
      badge: "Best Value",
      ctaText: "Claim Pro Plan",
      features: [
        { text: "Everything in Monthly", included: true, bold: true },
        { text: "Free InBody Composition Analysis", included: true },
        { text: "Custom Diet & Nutrition Plan", included: true },
        { text: "Weekly Steam Access", included: true },
        { text: "2 Free Guest Passes", included: true }
      ]
    },
    {
      id: "vip-annual",
      name: "VIP Annual Iron",
      subLabel: "Full 365-Day Access",
      price: "52,000",
      period: " / yr",
      note: "Only PKR 4,333/month effective rate",
      popular: false,
      badge: null,
      ctaText: "Join VIP Annual",
      features: [
        { text: "Full All-Hours Access", included: true, bold: true },
        { text: "Dedicated Locker Assigned", included: true },
        { text: "4 Personal Training Sessions", included: true },
        { text: "Complete Nutrition Blueprint", included: true },
        { text: "Unlimited Steam Sessions", included: true }
      ]
    }
  ],

  timings: [
    { days: "Monday – Thursday", sub: "Full floor & powerlifting bays", hours: "6 AM – 11 PM", closed: false },
    { days: "Friday", sub: "Jummah break 1:00 – 2:30 PM", hours: "6 AM – 11 PM", closed: false },
    { days: "Saturday", sub: "Weekend conditioning", hours: "7 AM – 10 PM", closed: false },
    { days: "Sunday", sub: "Maintenance & sanitation", hours: "Closed", closed: true }
  ],

  slots: [
    "Morning (6:00 AM – 11:00 AM)",
    "Afternoon (11:00 AM – 4:00 PM)",
    "Evening (4:00 PM – 9:00 PM)",
    "Night (9:00 PM – 11:00 PM)"
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SHADOW_DATA;
}
window.SHADOW_DATA = SHADOW_DATA;
