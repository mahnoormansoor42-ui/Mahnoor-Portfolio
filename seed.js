const fs = require('fs');
const path = require('path');

const initialData = {
  products: [
    {
      id: "birds",
      title: "Let's Draw the Birds Together",
      category: "Drawing & Creative Art",
      categoryId: "drawing",
      tagClass: "badge-bestseller",
      badgeText: "⭐ Bestseller",
      age: "Ages 3–7",
      pages: "17 Printable Pages",
      price: "$4.99",
      originalPrice: "$8.99",
      reviews: "5.0 (28 reviews)",
      rating: 5.0,
      reviewCount: 28,
      cover: "assets/images/workbooks/covers/birds_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/birds_sample_1.jpg", caption: "Step-by-Step Bird Construction" },
        { src: "assets/images/workbooks/samples/birds_sample_2.jpg", caption: "Coloring & Feature Detailing" },
        { src: "assets/images/workbooks/samples/birds_sample_3.jpg", caption: "Species Name & Word Practice" }
      ],
      description: "A step-by-step bird drawing workbook guiding young children to draw charming garden and songbirds using simple geometric shapes, progressive lines, and coloring prompts.",
      developmentPillars: [
        "Visual-spatial awareness & shape breakdown",
        "Pencil grip & controlled directional strokes",
        "Bird species recognition & vocabulary enrichment",
        "Creative coloring & artistic confidence"
      ],
      featured: true,
      status: "active",
      order: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: "sea_animals",
      title: "Let's Draw the Sea Animals Together",
      category: "Drawing & Creative Art",
      categoryId: "drawing",
      tagClass: "badge-popular",
      badgeText: "🐬 Popular",
      age: "Ages 3–7",
      pages: "15 Printable Pages",
      price: "$4.99",
      originalPrice: "$8.99",
      reviews: "5.0 (34 reviews)",
      rating: 5.0,
      reviewCount: 34,
      cover: "assets/images/workbooks/covers/sea_animals_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/sea_animals_sample_1.jpg", caption: "Ocean Creature Line Guide" },
        { src: "assets/images/workbooks/samples/sea_animals_sample_2.jpg", caption: "Step-by-Step Marine Drawing" },
        { src: "assets/images/workbooks/samples/sea_animals_sample_3.jpg", caption: "Sea Life Identification" }
      ],
      description: "An ocean-themed drawing guide featuring dolphins, turtles, octopuses, and reef fish, breaking down aquatic shapes into intuitive steps for little hands.",
      developmentPillars: [
        "Curved line tracing & fluid hand motions",
        "Marine life exploration & vocabulary expansion",
        "Shape construction & proportion calibration",
        "Low-frustration artistic self-expression"
      ],
      featured: true,
      status: "active",
      order: 2,
      createdAt: new Date().toISOString()
    },
    {
      id: "pets",
      title: "Let's Draw the Pet Animals Together",
      category: "Drawing & Creative Art",
      categoryId: "drawing",
      tagClass: "badge-cute",
      badgeText: "🐶 Kids Favorite",
      age: "Ages 3–7",
      pages: "14 Printable Pages",
      price: "$4.99",
      originalPrice: "$8.99",
      reviews: "5.0 (19 reviews)",
      rating: 5.0,
      reviewCount: 19,
      cover: "assets/images/workbooks/covers/pets_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/pets_sample_1.jpg", caption: "Puppy & Kitten Drawing Guides" },
        { src: "assets/images/workbooks/samples/pets_sample_2.jpg", caption: "Facial Expressions & Paws" },
        { src: "assets/images/workbooks/samples/pets_sample_3.jpg", caption: "Pet Name Learning Sheet" }
      ],
      description: "Features beloved family pets (puppies, kittens, bunnies, hamsters) with engaging step-by-step drawing demonstrations that build confidence.",
      developmentPillars: [
        "Fine-motor coordination & precision",
        "Empathy & animal vocabulary",
        "Hand-eye coordination & boundary awareness",
        "Encouraging positive daily drawing routines"
      ],
      featured: true,
      status: "active",
      order: 3,
      createdAt: new Date().toISOString()
    },
    {
      id: "body_parts",
      title: "Let's Draw & Learn Body Parts Together",
      category: "Speech & Early Learning",
      categoryId: "speech",
      tagClass: "badge-therapy",
      badgeText: "🩺 Speech Focus",
      age: "Ages 3–6",
      pages: "19 Printable Pages",
      price: "$5.49",
      originalPrice: "$9.99",
      reviews: "5.0 (22 reviews)",
      rating: 5.0,
      reviewCount: 22,
      cover: "assets/images/workbooks/covers/body_parts_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/body_parts_sample_1.jpg", caption: "Facial Features & Symmetry" },
        { src: "assets/images/workbooks/samples/body_parts_sample_2.jpg", caption: "Hands, Feet & Movement Lines" },
        { src: "assets/images/workbooks/samples/body_parts_sample_3.jpg", caption: "Body Schema & Vocabulary" }
      ],
      description: "Combines fundamental anatomical vocabulary with guided drawing of facial features, hands, feet, and gestures to reinforce body schema and speech concepts.",
      developmentPillars: [
        "Self-concept & anatomical vocabulary",
        "Facial feature placement & symmetry",
        "Speech therapy language reinforcement",
        "Pre-writing motor control"
      ],
      featured: true,
      status: "active",
      order: 4,
      createdAt: new Date().toISOString()
    },
    {
      id: "build_a_face",
      title: "Make My Face — Cut, Create & Complete",
      category: "Fine-Motor & Social Skills",
      categoryId: "fine-motor",
      tagClass: "badge-craft",
      badgeText: "✂️ Cut & Paste",
      age: "Ages 3–7",
      pages: "20 Printable Pages",
      price: "$5.49",
      originalPrice: "$9.99",
      reviews: "5.0 (41 reviews)",
      rating: 5.0,
      reviewCount: 41,
      cover: "assets/images/workbooks/covers/build_a_face_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/build_a_face_sample_1.jpg", caption: "Cutout Face Base & Options" },
        { src: "assets/images/workbooks/samples/build_a_face_sample_2.jpg", caption: "Emotion Eyes & Smile Cutouts" },
        { src: "assets/images/workbooks/samples/build_a_face_sample_3.jpg", caption: "Custom Character Assembly" }
      ],
      description: "Hands-on cut-and-paste activity pages where children assemble different facial expressions, hair styles, and accessories to learn about emotions.",
      developmentPillars: [
        "Bilateral scissor coordination & safety",
        "Emotion identification & facial cues",
        "Spatial orientation & pasting accuracy",
        "Creative storytelling & personal identity"
      ],
      featured: true,
      status: "active",
      order: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: "count_play_learn",
      title: "Count, Play & Learn Numbers 1–10",
      category: "Numbers & Early Math",
      categoryId: "numbers",
      tagClass: "badge-math",
      badgeText: "🔢 Early Math",
      age: "Pre-K & Kindergarten",
      pages: "20 Printable Pages",
      price: "$4.99",
      originalPrice: "$8.99",
      reviews: "4.9 (30 reviews)",
      rating: 4.9,
      reviewCount: 30,
      cover: "assets/images/workbooks/covers/count_play_learn_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/count_play_learn_sample_1.jpg", caption: "Number Tracing & Path Guidance" },
        { src: "assets/images/workbooks/samples/count_play_learn_sample_2.jpg", caption: "Object Counting Challenges" },
        { src: "assets/images/workbooks/samples/count_play_learn_sample_3.jpg", caption: "One-to-One Correspondence Games" }
      ],
      description: "Visual math workbook introducing number recognition 1–10, one-to-one counting correspondence, and fun object grouping.",
      developmentPillars: [
        "Number formation & stroke order",
        "One-to-one counting correspondence",
        "Visual quantity estimation",
        "Early math confidence"
      ],
      featured: true,
      status: "active",
      order: 6,
      createdAt: new Date().toISOString()
    },
    {
      id: "abc_learning",
      title: "ABC Little Learner A–Z Activity Book",
      category: "ABC & Alphabet Learning",
      categoryId: "abc",
      tagClass: "badge-bestseller",
      badgeText: "⭐ Top Seller",
      age: "Pre-K & Kindergarten",
      pages: "27 Printable Pages",
      price: "$5.99",
      originalPrice: "$11.99",
      reviews: "5.0 (52 reviews)",
      rating: 5.0,
      reviewCount: 52,
      cover: "assets/images/workbooks/covers/abc_learning_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/abc_learning_sample_1.jpg", caption: "Uppercase & Lowercase Tracing" },
        { src: "assets/images/workbooks/samples/abc_learning_sample_2.jpg", caption: "Phonics Illustration & Coloring" },
        { src: "assets/images/workbooks/samples/abc_learning_sample_3.jpg", caption: "Letter Search & Sound Match" }
      ],
      description: "Complete alphabet learning workbook with large uppercase and lowercase letters, guided directional arrows, and cheerful phonics illustrations.",
      developmentPillars: [
        "Letter recognition & formation",
        "Initial letter sound associations",
        "Phonological awareness",
        "Pre-reading literacy foundation"
      ],
      featured: true,
      status: "active",
      order: 7,
      createdAt: new Date().toISOString()
    },
    {
      id: "fine_motor_tracing",
      title: "My First Fine Motor Skill Tracing Workbook",
      category: "Fine-Motor & Pre-Writing",
      categoryId: "fine-motor",
      tagClass: "badge-bestseller",
      badgeText: "🔥 36 Pages",
      age: "Ages 2.5–6",
      pages: "36 Printable Pages",
      price: "$6.49",
      originalPrice: "$12.99",
      reviews: "5.0 (46 reviews)",
      rating: 5.0,
      reviewCount: 46,
      cover: "assets/images/workbooks/covers/fine_motor_tracing_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/fine_motor_tracing_sample_1.jpg", caption: "Straight & Slanted Tracing Paths" },
        { src: "assets/images/workbooks/samples/fine_motor_tracing_sample_2.jpg", caption: "Curves, Waves & Loop Exercises" },
        { src: "assets/images/workbooks/samples/fine_motor_tracing_sample_3.jpg", caption: "Pencil Mazes & Hand Control" }
      ],
      description: "Calibrated line tracing workbook featuring straight lines, zig-zags, waves, arches, and spiral patterns that prepare fingers for handwriting.",
      developmentPillars: [
        "Pencil pressure & grip stability",
        "Controlled wrist and finger movement",
        "Visual-motor tracking",
        "Hand endurance for handwriting"
      ],
      featured: true,
      status: "active",
      order: 8,
      createdAt: new Date().toISOString()
    },
    {
      id: "little_hearts",
      title: "Little Hearts, Big Feelings: Emotional Learning",
      category: "Social-Emotional & Speech",
      categoryId: "emotional",
      tagClass: "badge-therapy",
      badgeText: "💖 Emotional Skills",
      age: "Ages 3–7",
      pages: "22 Printable Pages",
      price: "$5.49",
      originalPrice: "$9.99",
      reviews: "5.0 (38 reviews)",
      rating: 5.0,
      reviewCount: 38,
      cover: "assets/images/workbooks/covers/little_hearts_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/little_hearts_sample_1.jpg", caption: "Emotion Vocabulary & Identifying Feelings" },
        { src: "assets/images/workbooks/samples/little_hearts_sample_2.jpg", caption: "What Makes Me Feel... Prompts" },
        { src: "assets/images/workbooks/samples/little_hearts_sample_3.jpg", caption: "Calm Down Strategies & Reflection" }
      ],
      description: "Therapist-informed emotional learning workbook helping children recognize, express, and regulate emotions through meaningful scenarios and conversations.",
      developmentPillars: [
        "Emotional self-awareness & labeling",
        "Empathy & understanding others",
        "Expressive speech and language communication",
        "Coping strategies for big emotions"
      ],
      featured: true,
      status: "active",
      order: 9,
      createdAt: new Date().toISOString()
    },
    {
      id: "little_explorer",
      title: "My Curious World, Little Explorer",
      category: "Preschool Discovery",
      categoryId: "discovery",
      tagClass: "badge-popular",
      badgeText: "🌍 Explorer",
      age: "Pre-K & Kindergarten",
      pages: "16 Printable Pages",
      price: "$4.99",
      originalPrice: "$8.99",
      reviews: "4.9 (17 reviews)",
      rating: 4.9,
      reviewCount: 17,
      cover: "assets/images/workbooks/covers/little_explorer_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/little_explorer_sample_1.jpg", caption: "Nature & World Observation Sheet" },
        { src: "assets/images/workbooks/samples/little_explorer_sample_2.jpg", caption: "Pattern Matching & Sorting" },
        { src: "assets/images/workbooks/samples/little_explorer_sample_3.jpg", caption: "Creative Exploration Activities" }
      ],
      description: "Playful discovery workbook filled with interactive observation prompts, sorting games, and cognitive reasoning activities.",
      developmentPillars: [
        "Curiosity & observation skills",
        "Cognitive classification & matching",
        "Early vocabulary expansion",
        "Engaging hands-on worksheets"
      ],
      featured: true,
      status: "active",
      order: 10,
      createdAt: new Date().toISOString()
    },
    {
      id: "jungle_animals",
      title: "Wildlife & Jungle Animal Drawing Workbook",
      category: "Drawing & Creative Art",
      categoryId: "drawing",
      tagClass: "badge-cute",
      badgeText: "🦁 Safari Art",
      age: "Ages 4–8",
      pages: "22 Printable Pages",
      price: "$5.49",
      originalPrice: "$9.99",
      reviews: "5.0 (25 reviews)",
      rating: 5.0,
      reviewCount: 25,
      cover: "assets/images/workbooks/covers/jungle_animals_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/jungle_animals_sample_1.jpg", caption: "Lion & Tiger Step-by-Step Art" },
        { src: "assets/images/workbooks/samples/jungle_animals_sample_2.jpg", caption: "Jungle Animals Habitat Coloring" },
        { src: "assets/images/workbooks/samples/jungle_animals_sample_3.jpg", caption: "Animal Drawing & Pre-Writing Paths" }
      ],
      description: "Exciting safari and jungle animal drawing guides connecting animal anatomy with beginner-friendly art steps.",
      developmentPillars: [
        "Wildlife anatomy & creature recognition",
        "Complex curve drawing mastery",
        "Fine-motor grip refinement",
        "Independent artistic accomplishment"
      ],
      featured: true,
      status: "active",
      order: 11,
      createdAt: new Date().toISOString()
    },
    {
      id: "learning_colors",
      title: "Learning Colors & Creative Shapes Workbook",
      category: "Preschool Discovery",
      categoryId: "discovery",
      tagClass: "badge-math",
      badgeText: "🎨 Colors & Shapes",
      age: "Ages 2–5",
      pages: "18 Printable Pages",
      price: "$4.99",
      originalPrice: "$8.99",
      reviews: "4.9 (18 reviews)",
      rating: 4.9,
      reviewCount: 18,
      cover: "assets/images/workbooks/covers/learning_colors_cover.jpg",
      payhipUrl: "https://payhip.com/BrightSproutsStudio",
      samples: [
        { src: "assets/images/workbooks/samples/learning_colors_sample_1.jpg", caption: "Primary & Secondary Colors Sheet" },
        { src: "assets/images/workbooks/samples/learning_colors_sample_2.jpg", caption: "Color Sorting & Matching Game" },
        { src: "assets/images/workbooks/samples/learning_colors_sample_3.jpg", caption: "Color By Number Practice" }
      ],
      description: "Visual recognition worksheets pairing basic color theory with playful illustration and sensory discovery.",
      developmentPillars: [
        "Color identification & discrimination",
        "Basic geometric shape recognition",
        "Visual perception & sorting",
        "Early preschool cognitive readiness"
      ],
      featured: true,
      status: "active",
      order: 12,
      createdAt: new Date().toISOString()
    }
  ],
  categories: [
    { id: "drawing", name: "Drawing & Art", icon: "🎨", accent: "#FFF2F2", count: "4 Workbooks", filter: "drawing" },
    { id: "fine-motor", name: "Fine-Motor & Tracing", icon: "✂️", accent: "#F0F9FF", count: "2 Workbooks", filter: "fine-motor" },
    { id: "abc", name: "Alphabet & ABC", icon: "🔤", accent: "#FEF9EE", count: "1 Workbook", filter: "abc" },
    { id: "numbers", name: "Numbers & Math", icon: "🔢", accent: "#F5F3FF", count: "1 Workbook", filter: "numbers" },
    { id: "emotional", name: "Social & Emotional", icon: "💖", accent: "#FFF1F2", count: "1 Workbook", filter: "emotional" },
    { id: "discovery", name: "Preschool Discovery", icon: "🌍", accent: "#ECFDF5", count: "3 Workbooks", filter: "discovery" }
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Sarah M.",
      role: "Preschool Educator & Parent of 4yo",
      rating: 5,
      comment: "As both an educator and mom, I am blown away by the intentional design. The step-by-step drawing workbook broke down shapes in a way that actually gave my 4-year-old confidence without tears!",
      workbook: "Let's Draw Birds Workbook",
      avatar: "👩‍🏫",
      approved: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "rev-2",
      author: "Dr. Emily Vance",
      role: "Pediatric Occupational Therapist",
      rating: 5,
      comment: "The fine-motor tracing paths are calibrated with genuine clinical care. Line thickness, directional arrows, and wrist stabilization cues are top notch.",
      workbook: "Fine-Motor Tracing Pack",
      avatar: "🩺",
      approved: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "rev-3",
      author: "Jessica T.",
      role: "Homeschooling Mom of 3",
      rating: 5,
      comment: "Instant download and crystal-clear prints on my regular home inkjet! My kids ask for 'Bright Sprout time' every morning after breakfast.",
      workbook: "Complete Learning Bundle",
      avatar: "🏡",
      approved: true,
      createdAt: new Date().toISOString()
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How do I receive my workbooks after purchase?",
      answer: "Instantly! Immediately after completing checkout on Payhip, you will receive a secure download link on screen and via email to download high-resolution, print-ready PDF files.",
      order: 1
    },
    {
      id: "faq-2",
      question: "Can I print these files multiple times for my classroom or siblings?",
      answer: "Yes! Personal and classroom licenses allow you to print unlimited copies for your own children or students in a single classroom.",
      order: 2
    },
    {
      id: "faq-3",
      question: "What age groups are Bright Sprout Studio workbooks designed for?",
      answer: "Our workbooks are created specifically for children ages 2 to 8 (toddlers, preschoolers, pre-K, kindergarten, and early elementary), with clear developmental milestone indicators.",
      order: 3
    },
    {
      id: "faq-4",
      question: "What makes these different from ordinary coloring books?",
      answer: "Every page is intentionally crafted by Mahnoor Mansoor, a licensed Speech-Language Pathologist, to target speech clarity, shape breakdown, hand-eye coordination, emotional awareness, and pre-writing strength.",
      order: 4
    }
  ],
  settings: {
    announcement: {
      enabled: true,
      text: "✨ Instant PDF Downloads • 100% Speech-Therapist Crafted • Print & Play at Home in Seconds!",
      linkText: "Shop Store →",
      linkUrl: "#shop"
    },
    hero: {
      headline: "Joyful Learning & Creative Printables for Little Minds 🎨",
      subheadline: "Speech-language pathologist crafted activity workbooks and step-by-step drawing printables designed to build early literacy, pencil grip, fine-motor coordination, and joyful artistic confidence in children ages 2 to 8.",
      ratingText: "4.9 / 5.0 Parent & Teacher Rated",
      trustText: "Instant PDF Download • Print Anywhere"
    },
    founder: {
      name: "Mahnoor Mansoor",
      title: "Speech-Language Pathologist & Early Childhood Specialist",
      experience: "9+ Years Clinical Practice",
      bio: "With over 9 years of direct clinical experience guiding young children through developmental milestones, speech articulation, and fine-motor progression, every single printable workbook at Bright Sprout Studio is intentionally designed to be engaging, low-frustration, and developmentally rich.",
      email: "mahnoormansoor42@gmail.com",
      storeUrl: "https://payhip.com/BrightSproutsStudio"
    },
    auth: {
      adminUsername: "admin",
      adminPassword: "password123"
    }
  },
  leads: [
    {
      id: "lead-1",
      email: "parent.sample@example.com",
      name: "Sample Parent",
      source: "Freebie Sample Pack",
      createdAt: new Date().toISOString()
    }
  ],
  analytics: {
    pageViews: 142,
    lookInsideViews: 68,
    payhipClicks: 35,
    leadsCount: 1,
    events: []
  }
};

fs.writeFileSync(path.join(__dirname, 'data', 'database.json'), JSON.stringify(initialData, null, 2), 'utf8');
console.log('SUCCESS: database.json successfully seeded with ' + initialData.products.length + ' products!');
