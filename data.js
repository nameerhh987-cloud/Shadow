// ============================================================================
// TG The Gym – Mesa | Data Configuration File (data.js)
// ============================================================================

const SHADOW_DATA = {
  gym: {
    name: "TG THE GYM MESA",
    branch: "Mesa Branch",
    tagline: "Elevate Your Fitness. Mesa's Premier Gym.",
    description: "Top-tier equipment, high-energy environment, and a dedicated community in Mesa, Arizona.",
    phone: "(480) 530-4988",
    phoneRaw: "4805304988",
    email: "thegymmesa@gmail.com",
    address: {
      street: "1126 S Gilbert Rd",
      city: "Mesa",
      state: "AZ",
      zip: "85204",
      full: "1126 S Gilbert Rd, Mesa, AZ 85204",
      short: "1126 S Gilbert Rd, Mesa, AZ"
    },
    maps: {
      queryUrl: "https://maps.google.com/?q=1126+S+Gilbert+Rd+Mesa+AZ+85204",
      embedUrl: "https://www.google.com/maps?q=1126+S+Gilbert+Rd+Mesa+AZ+85204&output=embed"
    }
  },

  stats: [
    { label: "500+ REVIEWS", value: "4.5★" },
    { label: "PRO EQUIPMENT", value: "FULL" },
    { label: "AZ COMMUNITY", value: "MESA" },
    { label: "VIP DAY PASS", value: "FREE" }
  ],

  about: {
    sectionLabel: "The Mesa Chapter",
    title: "Built for Performance, Results & Community.",
    description: "Located at 1126 S Gilbert Rd in Mesa, Arizona, TG The Gym was built from the ground up to deliver a premium fitness experience.",
    subDescription: "State-of-the-art equipment, dedicated lifting zones, and a high-energy culture that pushes you to your best.",
    checklist: [
      "Certified personal trainers",
      "Full pro-grade equipment",
      "High-energy group classes",
      "Mesa's dedicated community"
    ],
    floorStats: [
      { label: "Floor Layout", value: "Pro Multi-Zone" },
      { label: "Free Weights", value: "Full Range DBs" },
      { label: "Cardio Zone", value: "Top-Tier Machines" },
      { label: "Community", value: "Mesa, AZ", isGreen: true },
      { label: "Branch Hotline", value: "(480) 530-4988", isRed: true, isTel: true }
    ]
  },

  facilities: [
    {
      id: "iron-bay",
      title: "Pro Strength Floor",
      desc: "Full range of dumbbells, Olympic barbells, power racks, and dedicated deadlift platforms for serious lifters.",
      icon: "dumbbell"
    },
    {
      id: "cardio-deck",
      title: "Cardio Deck",
      desc: "Commercial treadmills, ellipticals, assault bikes, and rowing machines for peak aerobic conditioning.",
      icon: "heart-pulse"
    },
    {
      id: "expert-coaches",
      title: "Expert Coaches",
      desc: "Certified personal trainers who build customized programs and keep your form sharp every session.",
      icon: "users"
    },
    {
      id: "community",
      title: "Mesa Community",
      desc: "A high-energy, motivating environment built by Mesa locals — your crew is already here training.",
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
      price: "Contact Us",
      period: "",
      note: "Billed monthly. Zero lock-in.",
      popular: false,
      badge: null,
      ctaText: "Get Pricing",
      features: [
        { text: "Full Gym Floor Access", included: true },
        { text: "Unlimited Cardio Deck", included: true },
        { text: "Locker Room Access", included: true },
        { text: "Free Machine Orientation", included: true },
        { text: "Personalized Nutrition Plan", included: false }
      ]
    },
    {
      id: "quarterly",
      name: "Quarterly Pro",
      subLabel: "3-Month Transformation",
      price: "Contact Us",
      period: "",
      note: "Best value for committed athletes",
      popular: true,
      badge: "Best Value",
      ctaText: "Claim Pro Plan",
      features: [
        { text: "Everything in Monthly", included: true, bold: true },
        { text: "Free Fitness Assessment", included: true },
        { text: "Custom Diet & Nutrition Plan", included: true },
        { text: "Priority Equipment Access", included: true },
        { text: "2 Free Guest Passes", included: true }
      ]
    },
    {
      id: "vip-annual",
      name: "VIP Annual Iron",
      subLabel: "Full 365-Day Access",
      price: "Contact Us",
      period: "",
      note: "Best effective rate per month",
      popular: false,
      badge: null,
      ctaText: "Join VIP Annual",
      features: [
        { text: "Full All-Hours Access", included: true, bold: true },
        { text: "Dedicated Locker Assigned", included: true },
        { text: "4 Personal Training Sessions", included: true },
        { text: "Complete Nutrition Blueprint", included: true },
        { text: "Unlimited Guest Passes", included: true }
      ]
    }
  ],

  timings: [
    { days: "Monday – Friday", sub: "Full floor & all zones open", hours: "5 AM – 11 PM", closed: false },
    { days: "Saturday", sub: "Weekend conditioning", hours: "7 AM – 9 PM", closed: false },
    { days: "Sunday", sub: "Rest & recovery day", hours: "8 AM – 6 PM", closed: false }
  ],

  slots: [
    "Morning (5:00 AM – 10:00 AM)",
    "Midday (10:00 AM – 3:00 PM)",
    "Evening (3:00 PM – 7:00 PM)",
    "Night (7:00 PM – 11:00 PM)"
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SHADOW_DATA;
}
window.SHADOW_DATA = SHADOW_DATA;
