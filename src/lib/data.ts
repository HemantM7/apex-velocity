export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: number;
  category: "hypercar" | "supercar" | "electric" | "gt";
  fuelType: "electric" | "hybrid" | "petrol";
  specs: {
    horsepower: number;
    torque: number;
    topSpeed: number;
    acceleration: number; // 0-60 mph in seconds
    weight: number; // kg
    engine: string;
    transmission: string;
    range?: number; // km, for electric
    drivetrain: string;
    aeroDrag: number;
  };
  colors: { name: string; hex: string }[];
  images: {
    hero: string;
    gallery: string[];
    interior: string[];
  };
  features: string[];
  year: number;
  limited?: boolean;
  limitedCount?: number;
  badge?: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "apex-x1",
    name: "APEX X1",
    brand: "Apex Velocity",
    tagline: "The Pinnacle of Human Engineering",
    description:
      "The APEX X1 represents the absolute zenith of automotive achievement. Born from Formula 1 technology and aerospace engineering, every component exists to serve one purpose: pure, unadulterated performance. With a quad-turbocharged V16 producing 1,800 horsepower, the X1 redefines what is physically possible on four wheels.",
    price: 3200000,
    category: "hypercar",
    fuelType: "hybrid",
    specs: {
      horsepower: 1800,
      torque: 1600,
      topSpeed: 310,
      acceleration: 2.1,
      weight: 1250,
      engine: "4.0L Quad-Turbo V16 + Hybrid",
      transmission: "7-Speed Dual-Clutch",
      range: 80,
      drivetrain: "AWD",
      aeroDrag: 0.28,
    },
    colors: [
      { name: "Obsidian Black", hex: "#0A0A0F" },
      { name: "Titanium Silver", hex: "#C0C0D0" },
      { name: "Inferno Orange", hex: "#FF5A1F" },
      { name: "Midnight Blue", hex: "#0D1B3E" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
      ],
      interior: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      ],
    },
    features: [
      "Active Aerodynamics",
      "Carbon Fiber Monocoque",
      "Magnetic Ride Control",
      "AI Driving Assistant",
      "Heads-Up Display",
      "Track Mode",
    ],
    year: 2025,
    limited: true,
    limitedCount: 25,
    badge: "HYPERCAR",
  },
  {
    id: "phantom-gt",
    name: "PHANTOM GT",
    brand: "Apex Velocity",
    tagline: "Grand Touring Redefined",
    description:
      "The Phantom GT merges blistering performance with transcontinental luxury. A twin-turbocharged V12 delivers effortless power while the adaptive suspension cocoons occupants in serene comfort. This is the car for those who refuse to compromise.",
    price: 890000,
    category: "gt",
    fuelType: "petrol",
    specs: {
      horsepower: 1050,
      torque: 1100,
      topSpeed: 280,
      acceleration: 2.8,
      weight: 1680,
      engine: "6.0L Twin-Turbo V12",
      transmission: "8-Speed Automatic",
      drivetrain: "RWD",
      aeroDrag: 0.32,
    },
    colors: [
      { name: "Phantom Black", hex: "#111118" },
      { name: "Arctic White", hex: "#F0F0F5" },
      { name: "British Racing Green", hex: "#004225" },
      { name: "Bordeaux Red", hex: "#5C0A14" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      ],
      interior: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      ],
    },
    features: [
      "Adaptive Air Suspension",
      "Massaging Seats",
      "Burmester Audio",
      "Night Vision",
      "Panoramic Roof",
      "Rear Entertainment",
    ],
    year: 2025,
    badge: "GRAND TOURER",
  },
  {
    id: "volt-r",
    name: "VOLT R",
    brand: "Apex Velocity",
    tagline: "Electric. Relentless. Revolutionary.",
    description:
      "The VOLT R is our answer to the electric revolution — and it's a thunderous one. Four electric motors deliver instantaneous torque to all four wheels, launching this 2,200kg machine to 60mph in 1.8 seconds. The future of performance is silent, and it's devastating.",
    price: 1450000,
    category: "electric",
    fuelType: "electric",
    specs: {
      horsepower: 1600,
      torque: 2200,
      topSpeed: 260,
      acceleration: 1.8,
      weight: 2200,
      engine: "Quad Electric Motor",
      transmission: "Single-Speed",
      range: 520,
      drivetrain: "AWD",
      aeroDrag: 0.21,
    },
    colors: [
      { name: "Stealth Black", hex: "#0A0A0F" },
      { name: "Volt Yellow", hex: "#E8FF00" },
      { name: "Deep Space", hex: "#0D0D2B" },
      { name: "Glacier White", hex: "#F8F8FF" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80",
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80",
      ],
      interior: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      ],
    },
    features: [
      "Torque Vectoring",
      "Regenerative Braking",
      "OTA Updates",
      "Autopilot Suite",
      "800V Architecture",
      "10-min Fast Charge",
    ],
    year: 2025,
    badge: "ELECTRIC",
  },
  {
    id: "storm-s",
    name: "STORM S",
    brand: "Apex Velocity",
    tagline: "Track Weapon. Street Legal.",
    description:
      "Stripped of excess, the Storm S is a pure driver's machine. Derived directly from our GT3 racing program, it features a naturally aspirated flat-six screaming to 9,500 RPM. Every gram saved, every aerodynamic surface optimized. This is motorsport for the road.",
    price: 620000,
    category: "supercar",
    fuelType: "petrol",
    specs: {
      horsepower: 720,
      torque: 580,
      topSpeed: 320,
      acceleration: 2.5,
      weight: 1180,
      engine: "4.0L Naturally Aspirated Flat-6",
      transmission: "6-Speed PDK",
      drivetrain: "RWD",
      aeroDrag: 0.31,
    },
    colors: [
      { name: "Guards Red", hex: "#CC0000" },
      { name: "Racing Yellow", hex: "#FFD700" },
      { name: "Chalk White", hex: "#E8E8E0" },
      { name: "Jet Black", hex: "#0A0A0A" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
      ],
      interior: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      ],
    },
    features: [
      "Carbon Ceramic Brakes",
      "Active Rear Wing",
      "Roll Cage",
      "Racing Harness",
      "Telemetry System",
      "Lightweight Bucket Seats",
    ],
    year: 2025,
    badge: "TRACK EDITION",
  },
  {
    id: "nova-hybrid",
    name: "NOVA HYBRID",
    brand: "Apex Velocity",
    tagline: "Efficiency Meets Exhilaration",
    description:
      "The Nova Hybrid proves that sustainability and supercar performance are not mutually exclusive. A sophisticated hybrid powertrain combines a twin-turbo V8 with dual electric motors, delivering 900 horsepower while achieving remarkable efficiency. The future is now.",
    price: 480000,
    category: "supercar",
    fuelType: "hybrid",
    specs: {
      horsepower: 900,
      torque: 950,
      topSpeed: 265,
      acceleration: 2.6,
      weight: 1580,
      engine: "3.8L Twin-Turbo V8 + Dual Electric",
      transmission: "8-Speed DCT",
      range: 60,
      drivetrain: "AWD",
      aeroDrag: 0.29,
    },
    colors: [
      { name: "Emerald Green", hex: "#1A4A2E" },
      { name: "Midnight Black", hex: "#0A0A0F" },
      { name: "Pearl White", hex: "#F5F5F0" },
      { name: "Sapphire Blue", hex: "#0A2A5C" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
      ],
      interior: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      ],
    },
    features: [
      "Hybrid Boost Mode",
      "EV-Only Mode",
      "Energy Recovery",
      "Predictive Charging",
      "Eco Dashboard",
      "Wireless Charging",
    ],
    year: 2025,
    badge: "HYBRID",
  },
  {
    id: "apex-rs",
    name: "APEX RS",
    brand: "Apex Velocity",
    tagline: "Racing Soul. Road Certified.",
    description:
      "The RS designation has always meant one thing: uncompromising performance. The Apex RS takes our most powerful road car and strips it to its essence. Wider body, bigger wing, harder suspension. This is the car that wins on Sunday and terrifies on Monday.",
    price: 1100000,
    category: "hypercar",
    fuelType: "petrol",
    specs: {
      horsepower: 1350,
      torque: 1200,
      topSpeed: 340,
      acceleration: 2.3,
      weight: 1320,
      engine: "5.2L Twin-Turbo V10",
      transmission: "7-Speed Sequential",
      drivetrain: "AWD",
      aeroDrag: 0.26,
    },
    colors: [
      { name: "Matte Black", hex: "#111118" },
      { name: "Matte Orange", hex: "#CC4400" },
      { name: "Carbon Grey", hex: "#2A2A35" },
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90",
      gallery: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
      ],
      interior: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      ],
    },
    features: [
      "Active Aero Package",
      "Titanium Exhaust",
      "Carbon Fiber Body",
      "Racing Suspension",
      "Launch Control",
      "Drift Mode",
    ],
    year: 2025,
    limited: true,
    limitedCount: 50,
    badge: "LIMITED RS",
  },
];

export const techFeatures = [
  {
    id: "ai-driving",
    title: "AI Driving Systems",
    subtitle: "Neural Performance Intelligence",
    description:
      "Our proprietary AI analyzes 200 data points per second — road surface, weather, driver inputs, and vehicle dynamics — to optimize performance in real time. The system learns your driving style and adapts accordingly.",
    icon: "cpu",
    stats: ["200 data points/sec", "0.001s response time", "99.97% accuracy"],
  },
  {
    id: "aerodynamics",
    title: "Active Aerodynamics",
    subtitle: "Computational Fluid Dynamics",
    description:
      "Every surface is a functional aerodynamic element. Active flaps, adjustable rear wings, and underbody diffusers work in concert to generate up to 1,200kg of downforce at top speed while minimizing drag at highway speeds.",
    icon: "wind",
    stats: ["1,200kg downforce", "Cd 0.21 drag", "Active at 80mph+"],
  },
  {
    id: "battery",
    title: "Battery Architecture",
    subtitle: "800V Solid-State Technology",
    description:
      "Our next-generation 800V solid-state battery pack delivers 150kWh of energy in a package 40% lighter than conventional lithium-ion. Thermal management ensures consistent performance from -40°C to +60°C.",
    icon: "zap",
    stats: ["150kWh capacity", "800V architecture", "10-min 20-80% charge"],
  },
  {
    id: "carbon",
    title: "Carbon Fiber Architecture",
    subtitle: "Aerospace-Grade Composites",
    description:
      "The monocoque chassis is constructed from T800 carbon fiber — the same grade used in Boeing 787 aircraft. The result is a structure 60% lighter than steel with 10x the tensile strength.",
    icon: "layers",
    stats: ["T800 carbon fiber", "60% lighter than steel", "10x tensile strength"],
  },
  {
    id: "cockpit",
    title: "Smart Cockpit",
    subtitle: "Digital Command Center",
    description:
      "A curved 32-inch OLED display wraps around the driver, presenting critical information with zero latency. Voice control, gesture recognition, and haptic feedback create an intuitive interface that never distracts from the drive.",
    icon: "monitor",
    stats: ["32\" curved OLED", "1ms response time", "Voice + gesture control"],
  },
];

export const newsArticles = [
  {
    id: "1",
    title: "APEX X1 Breaks Nürburgring Production Car Record",
    excerpt:
      "The APEX X1 has shattered the Nürburgring Nordschleife production car lap record with a time of 6:38.835, beating the previous record by over 12 seconds.",
    category: "Performance",
    date: "2025-03-15",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  },
  {
    id: "2",
    title: "VOLT R: The Electric Hypercar That Changes Everything",
    excerpt:
      "With a 0-60 time of 1.8 seconds and 520km of range, the VOLT R proves that electric hypercars have arrived. We take an in-depth look at the technology inside.",
    category: "Technology",
    date: "2025-02-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
  },
  {
    id: "3",
    title: "Inside the Carbon Fiber Lab: How We Build the Future",
    excerpt:
      "A rare look inside our advanced composites facility where aerospace-grade carbon fiber is transformed into the structural backbone of our hypercars.",
    category: "Engineering",
    date: "2025-02-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  {
    id: "4",
    title: "The Art of the Apex: Design Philosophy Revealed",
    excerpt:
      "Chief Design Officer reveals the philosophy behind our latest generation of vehicles — where aerodynamic function meets sculptural beauty.",
    category: "Design",
    date: "2025-01-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  },
];

export const dealers = [
  {
    id: "1",
    name: "Apex Velocity London",
    address: "15 Mayfair Square, London W1K 2AB",
    phone: "+44 20 7123 4567",
    email: "london@apexvelocity.com",
    hours: "Mon-Sat: 9AM-7PM",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: "2",
    name: "Apex Velocity New York",
    address: "432 Park Avenue, New York, NY 10022",
    phone: "+1 212 555 0100",
    email: "newyork@apexvelocity.com",
    hours: "Mon-Sat: 10AM-8PM",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "3",
    name: "Apex Velocity Dubai",
    address: "Sheikh Zayed Road, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "dubai@apexvelocity.com",
    hours: "Sun-Thu: 10AM-9PM",
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: "4",
    name: "Apex Velocity Tokyo",
    address: "2-1 Minami-Aoyama, Minato, Tokyo",
    phone: "+81 3 1234 5678",
    email: "tokyo@apexvelocity.com",
    hours: "Mon-Sun: 10AM-8PM",
    lat: 35.6762,
    lng: 139.6503,
  },
];
