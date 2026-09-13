/**
 * Bright Sprout Studio — Dynamic Brand Storefront Application Script
 * Creator: Mahnoor Mansoor (Speech-Language Pathologist)
 * Hybrid Dynamic API & Offline Fallback Architecture
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Base Fallback Catalog Data (Ensures static host compatibility)
  let workbookCatalog = {
  "birds": {
    "title": "Let's Draw the Birds Together",
    "category": "Drawing & Creative Art",
    "categoryId": "drawing",
    "tagClass": "badge-bestseller",
    "badgeText": "⭐ Bestseller",
    "age": "Ages 3–7",
    "pages": "17 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "5.0 (28 reviews)",
    "cover": "assets/images/workbooks/covers/birds_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/birds_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/birds_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/birds_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "A step-by-step bird drawing workbook guiding young children to draw charming garden and songbirds using simple geometric shapes, progressive lines, and coloring prompts.",
    "developmentPillars": [
      "Visual-spatial awareness & shape breakdown",
      "Pencil grip & controlled directional strokes",
      "Bird species recognition & vocabulary enrichment",
      "Creative coloring & artistic confidence"
    ]
  },
  "sea_animals": {
    "title": "Let's Draw the Sea Animals Together",
    "category": "Drawing & Creative Art",
    "categoryId": "drawing",
    "tagClass": "badge-popular",
    "badgeText": "🐬 Popular",
    "age": "Ages 3–7",
    "pages": "15 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "5.0 (34 reviews)",
    "cover": "assets/images/workbooks/covers/sea_animals_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/sea_animals_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/sea_animals_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/sea_animals_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "An ocean-themed drawing guide featuring dolphins, turtles, octopuses, and reef fish, breaking down aquatic shapes into intuitive steps for little hands.",
    "developmentPillars": [
      "Curved line tracing & fluid hand motions",
      "Marine life exploration & vocabulary expansion",
      "Shape construction & proportion calibration",
      "Low-frustration artistic self-expression"
    ]
  },
  "pets": {
    "title": "Let's Draw the Pet Animals Together",
    "category": "Drawing & Creative Art",
    "categoryId": "drawing",
    "tagClass": "badge-cute",
    "badgeText": "🐶 Kids Favorite",
    "age": "Ages 3–7",
    "pages": "14 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "5.0 (19 reviews)",
    "cover": "assets/images/workbooks/covers/pets_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/pets_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/pets_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/pets_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Features beloved family pets (puppies, kittens, bunnies, hamsters) with engaging step-by-step drawing demonstrations that build confidence.",
    "developmentPillars": [
      "Fine-motor coordination & precision",
      "Empathy & animal vocabulary",
      "Hand-eye coordination & boundary awareness",
      "Encouraging positive daily drawing routines"
    ]
  },
  "body_parts": {
    "title": "Let's Draw & Learn Body Parts Together",
    "category": "Speech & Early Learning",
    "categoryId": "speech",
    "tagClass": "badge-therapy",
    "badgeText": "🩺 Speech Focus",
    "age": "Ages 3–6",
    "pages": "19 Printable Pages",
    "price": "$5.49",
    "originalPrice": "$9.99",
    "reviews": "5.0 (22 reviews)",
    "cover": "assets/images/workbooks/covers/body_parts_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/body_parts_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/body_parts_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/body_parts_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Combines fundamental anatomical vocabulary with guided drawing of facial features, hands, feet, and gestures to reinforce body schema and speech concepts.",
    "developmentPillars": [
      "Self-concept & anatomical vocabulary",
      "Facial feature placement & symmetry",
      "Speech therapy language reinforcement",
      "Pre-writing motor control"
    ]
  },
  "build_a_face": {
    "title": "Make My Face — Cut, Create & Complete",
    "category": "Fine-Motor & Social Skills",
    "categoryId": "fine-motor",
    "tagClass": "badge-craft",
    "badgeText": "✂️ Cut & Paste",
    "age": "Ages 3–7",
    "pages": "20 Printable Pages",
    "price": "$5.49",
    "originalPrice": "$9.99",
    "reviews": "5.0 (41 reviews)",
    "cover": "assets/images/workbooks/covers/build_a_face_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/build_a_face_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/build_a_face_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/build_a_face_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Hands-on cut-and-paste activity pages where children assemble different facial expressions, hair styles, and accessories to learn about emotions.",
    "developmentPillars": [
      "Bilateral scissor coordination & safety",
      "Emotion identification & facial cues",
      "Spatial orientation & pasting accuracy",
      "Creative storytelling & personal identity"
    ]
  },
  "count_play_learn": {
    "title": "Count, Play & Learn Numbers 1–10",
    "category": "Numbers & Early Math",
    "categoryId": "numbers",
    "tagClass": "badge-math",
    "badgeText": "🔢 Early Math",
    "age": "Pre-K & Kindergarten",
    "pages": "20 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "4.9 (30 reviews)",
    "cover": "assets/images/workbooks/covers/count_play_learn_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/count_play_learn_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/count_play_learn_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/count_play_learn_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Visual math workbook introducing number recognition 1–10, one-to-one counting correspondence, and fun object grouping.",
    "developmentPillars": [
      "Number formation & stroke order",
      "One-to-one counting correspondence",
      "Visual quantity estimation",
      "Early math confidence"
    ]
  },
  "abc_learning": {
    "title": "ABC Little Learner A–Z Activity Book",
    "category": "ABC & Alphabet Learning",
    "categoryId": "abc",
    "tagClass": "badge-bestseller",
    "badgeText": "⭐ Top Seller",
    "age": "Pre-K & Kindergarten",
    "pages": "27 Printable Pages",
    "price": "$5.99",
    "originalPrice": "$11.99",
    "reviews": "5.0 (52 reviews)",
    "cover": "assets/images/workbooks/covers/abc_learning_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/abc_learning_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/abc_learning_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/abc_learning_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Complete alphabet learning workbook with large uppercase and lowercase letters, guided directional arrows, and cheerful phonics illustrations.",
    "developmentPillars": [
      "Letter recognition & formation",
      "Initial letter sound associations",
      "Phonological awareness",
      "Pre-reading literacy foundation"
    ]
  },
  "fine_motor_tracing": {
    "title": "My First Fine Motor Skill Tracing Workbook",
    "category": "Fine-Motor & Pre-Writing",
    "categoryId": "fine-motor",
    "tagClass": "badge-bestseller",
    "badgeText": "🔥 36 Pages",
    "age": "Ages 2.5–6",
    "pages": "36 Printable Pages",
    "price": "$6.49",
    "originalPrice": "$12.99",
    "reviews": "5.0 (46 reviews)",
    "cover": "assets/images/workbooks/covers/fine_motor_tracing_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/fine_motor_tracing_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/fine_motor_tracing_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/fine_motor_tracing_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Calibrated line tracing workbook featuring straight lines, zig-zags, waves, arches, and spiral patterns that prepare fingers for handwriting.",
    "developmentPillars": [
      "Pencil pressure & grip stability",
      "Controlled wrist and finger movement",
      "Visual-motor tracking",
      "Hand endurance for handwriting"
    ]
  },
  "little_hearts": {
    "title": "Little Hearts, Big Feelings: Emotional Learning",
    "category": "Social-Emotional & Speech",
    "categoryId": "emotional",
    "tagClass": "badge-therapy",
    "badgeText": "💖 Emotional Skills",
    "age": "Ages 3–7",
    "pages": "22 Printable Pages",
    "price": "$5.49",
    "originalPrice": "$9.99",
    "reviews": "5.0 (38 reviews)",
    "cover": "assets/images/workbooks/covers/little_hearts_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/little_hearts_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/little_hearts_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/little_hearts_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Therapist-informed emotional learning workbook helping children recognize, express, and regulate emotions through meaningful scenarios and conversations.",
    "developmentPillars": [
      "Emotional self-awareness & labeling",
      "Empathy & understanding others",
      "Expressive speech and language communication",
      "Coping strategies for big emotions"
    ]
  },
  "little_explorer": {
    "title": "My Curious World, Little Explorer",
    "category": "Preschool Discovery",
    "categoryId": "discovery",
    "tagClass": "badge-popular",
    "badgeText": "🌍 Explorer",
    "age": "Pre-K & Kindergarten",
    "pages": "16 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "4.9 (17 reviews)",
    "cover": "assets/images/workbooks/covers/little_explorer_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/little_explorer_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/little_explorer_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/little_explorer_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Playful discovery workbook filled with interactive observation prompts, sorting games, and cognitive reasoning activities.",
    "developmentPillars": [
      "Curiosity & observation skills",
      "Cognitive classification & matching",
      "Early vocabulary expansion",
      "Engaging hands-on worksheets"
    ]
  },
  "jungle_animals": {
    "title": "Wildlife & Jungle Animal Drawing Workbook",
    "category": "Drawing & Creative Art",
    "categoryId": "drawing",
    "tagClass": "badge-cute",
    "badgeText": "🦁 Safari Art",
    "age": "Ages 4–8",
    "pages": "21 Printable Pages",
    "price": "$5.49",
    "originalPrice": "$9.99",
    "reviews": "5.0 (25 reviews)",
    "cover": "assets/images/workbooks/covers/jungle_animals_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/jungle_animals_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/jungle_animals_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/jungle_animals_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Exciting safari and jungle animal drawing guides connecting animal anatomy with beginner-friendly art steps.",
    "developmentPillars": [
      "Wildlife anatomy & creature recognition",
      "Complex curve drawing mastery",
      "Fine-motor grip refinement",
      "Independent artistic accomplishment"
    ]
  },
  "learning_colors": {
    "title": "Learning Colors & Creative Shapes Workbook",
    "category": "Preschool Discovery",
    "categoryId": "discovery",
    "tagClass": "badge-math",
    "badgeText": "🎨 Colors & Shapes",
    "age": "Ages 2–5",
    "pages": "18 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "4.9 (18 reviews)",
    "cover": "assets/images/workbooks/covers/learning_colors_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/learning_colors_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/learning_colors_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/learning_colors_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Visual recognition worksheets pairing basic color theory with playful illustration and sensory discovery.",
    "developmentPillars": [
      "Color identification & discrimination",
      "Basic geometric shape recognition",
      "Visual perception & sorting",
      "Early preschool cognitive readiness"
    ]
  },
  "fun_with_fruits": {
    "title": "Fun with Fruits — Coloring & Learning Activity Book",
    "category": "Preschool Discovery",
    "categoryId": "discovery",
    "tagClass": "badge-cute",
    "badgeText": "🍓 Fruit Fun",
    "age": "Ages 2.5–6",
    "pages": "21 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "5.0 (14 reviews)",
    "cover": "assets/images/workbooks/covers/fun_with_fruits_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/fun_with_fruits_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/fun_with_fruits_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/fun_with_fruits_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Delightful fruit-themed coloring and learning pages teaching healthy food vocabulary, color recognition, and controlled coloring boundaries.",
    "developmentPillars": [
      "Food vocabulary & healthy eating concepts",
      "Color identification (Red, Green, Yellow, Purple)",
      "Boundary awareness & controlled strokes",
      "Sensory exploration & curiosity"
    ]
  },
  "daily_life_skills": {
    "title": "Daily Life Skills & Morning Routines for Kids",
    "category": "Speech & Early Learning",
    "categoryId": "speech",
    "tagClass": "badge-therapy",
    "badgeText": "☀️ Life Skills",
    "age": "Ages 3–7",
    "pages": "14 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "5.0 (16 reviews)",
    "cover": "assets/images/workbooks/covers/daily_life_skills_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/daily_life_skills_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/daily_life_skills_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/daily_life_skills_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Therapist-created visual routine guides and life skill worksheets helping children master hand washing, teeth brushing, getting dressed, and morning schedules.",
    "developmentPillars": [
      "Daily routine sequencing & independence",
      "Self-care & personal hygiene awareness",
      "Expressive speech describing daily steps",
      "Executive functioning & time predictability"
    ]
  },
  "finish_my_picture": {
    "title": "Finish My Picture — Creative Symmetry & Visual Closure",
    "category": "Drawing & Creative Art",
    "categoryId": "drawing",
    "tagClass": "badge-popular",
    "badgeText": "🎨 Symmetry Art",
    "age": "Ages 3.5–8",
    "pages": "22 Printable Pages",
    "price": "$5.49",
    "originalPrice": "$9.99",
    "reviews": "5.0 (21 reviews)",
    "cover": "assets/images/workbooks/covers/finish_my_picture_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/finish_my_picture_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/finish_my_picture_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/finish_my_picture_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Half-drawn picture prompts where children complete the other half of animals, vehicles, and objects, building visual symmetry, observation, and creative problem solving.",
    "developmentPillars": [
      "Visual closure & spatial symmetry",
      "Mirror-image drawing & hand stability",
      "Detail observation & proportion control",
      "Creative storytelling through completion"
    ]
  },
  "good_manners": {
    "title": "I Know My Good Manners! Everyday Conversations",
    "category": "Social-Emotional & Speech",
    "categoryId": "emotional",
    "tagClass": "badge-therapy",
    "badgeText": "🤝 Social Skills",
    "age": "Ages 3–7",
    "pages": "20 Printable Pages",
    "price": "$5.49",
    "originalPrice": "$9.99",
    "reviews": "5.0 (31 reviews)",
    "cover": "assets/images/workbooks/covers/good_manners_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/good_manners_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/good_manners_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/good_manners_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Charming real-world social scenarios teaching polite conversation prompts (Please, Thank You, Excuse Me), turn-taking, sharing, and kind peer interactions.",
    "developmentPillars": [
      "Social-pragmatic communication & etiquette",
      "Polite vocabulary in real conversations",
      "Empathy & considering peers' feelings",
      "Turn-taking and classroom social confidence"
    ]
  },
  "learn_phonics": {
    "title": "Learn Phonics & Letter Sounds for Confident Reading",
    "category": "ABC & Alphabet Learning",
    "categoryId": "abc",
    "tagClass": "badge-bestseller",
    "badgeText": "🔤 Phonics Focus",
    "age": "Ages 4–7",
    "pages": "23 Printable Pages",
    "price": "$5.99",
    "originalPrice": "$11.99",
    "reviews": "5.0 (27 reviews)",
    "cover": "assets/images/workbooks/covers/learn_phonics_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/learn_phonics_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/learn_phonics_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/learn_phonics_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Phonological awareness workbook connecting letter shapes to their phonetic sounds, short vowels, consonant blends, and early word blending.",
    "developmentPillars": [
      "Phonemic awareness & auditory discrimination",
      "Letter-sound correspondence (Phonics)",
      "Beginning sound identification",
      "Early kindergarten reading readiness"
    ]
  },
  "little_detective": {
    "title": "Little Detective — Language & Visual Discrimination",
    "category": "Speech & Early Learning",
    "categoryId": "speech",
    "tagClass": "badge-popular",
    "badgeText": "🔍 Top Rated",
    "age": "Ages 4–8",
    "pages": "30 Printable Pages",
    "price": "$5.99",
    "originalPrice": "$11.99",
    "reviews": "5.0 (35 reviews)",
    "cover": "assets/images/workbooks/covers/little_detective_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/little_detective_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/little_detective_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/little_detective_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Engaging 'I Spy' and search-and-find deduction sheets where children identify hidden clues, categorize objects, and explain their reasoning using full sentences.",
    "developmentPillars": [
      "Visual discrimination & foreground/background separation",
      "Descriptive language & expressive vocabulary",
      "Attention to detail & sustained focus",
      "Deductive cognitive reasoning"
    ]
  },
  "little_problem_solver": {
    "title": "Little Problem Solver — Logic, Sequencing & Puzzles",
    "category": "Numbers & Early Math",
    "categoryId": "numbers",
    "tagClass": "badge-math",
    "badgeText": "🧩 Logic & Math",
    "age": "Ages 4–8",
    "pages": "29 Printable Pages",
    "price": "$5.99",
    "originalPrice": "$11.99",
    "reviews": "5.0 (23 reviews)",
    "cover": "assets/images/workbooks/covers/little_problem_solver_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/little_problem_solver_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/little_problem_solver_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/little_problem_solver_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Brain-building puzzles, sequential picture ordering (What happens next?), maze navigation, and logical pattern matching.",
    "developmentPillars": [
      "Sequential thinking & narrative structure",
      "Logical reasoning & problem deduction",
      "Spatial planning & maze navigation",
      "Patience and persistence with multi-step tasks"
    ]
  },
  "matching_sorting": {
    "title": "Matching & Sorting Early Concept Preschool Workbook",
    "category": "Preschool Discovery",
    "categoryId": "discovery",
    "tagClass": "badge-cute",
    "badgeText": "📦 Early Skills",
    "age": "Ages 2.5–5",
    "pages": "23 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "4.9 (19 reviews)",
    "cover": "assets/images/workbooks/covers/matching_sorting_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/matching_sorting_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/matching_sorting_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/matching_sorting_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Foundational cognitive sorting by size (Big vs. Small), category (Animals vs. Vehicles), and color pairs to establish preschool categorization skills.",
    "developmentPillars": [
      "Concept classification & attribute grouping",
      "Comparative vocabulary (Bigger/Smaller, Heavy/Light)",
      "Visual discrimination & pair matching",
      "Cognitive flexibility"
    ]
  },
  "shape_hunt": {
    "title": "Shape Hunt — Learn, Trace & Spot Everyday Shapes",
    "category": "Numbers & Early Math",
    "categoryId": "numbers",
    "tagClass": "badge-math",
    "badgeText": "📐 Shapes & Math",
    "age": "Ages 3–6",
    "pages": "16 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "5.0 (15 reviews)",
    "cover": "assets/images/workbooks/covers/shape_hunt_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/shape_hunt_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/shape_hunt_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/shape_hunt_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Explore circles, squares, triangles, rectangles, ovals, and stars through shape tracing paths and real-world environment shape searches.",
    "developmentPillars": [
      "Geometric 2D shape identification",
      "Fine-motor shape tracing & corner control",
      "Visual-spatial environment mapping",
      "Pre-math spatial awareness"
    ]
  },
  "bedtime_stories": {
    "title": "Sweet Dreams, Little One — 4 Gentle Bedtime Stories",
    "category": "Social-Emotional & Speech",
    "categoryId": "emotional",
    "tagClass": "badge-therapy",
    "badgeText": "🌙 Bedtime Story",
    "age": "Ages 2–7",
    "pages": "17 Printable Pages",
    "price": "$5.49",
    "originalPrice": "$9.99",
    "reviews": "5.0 (33 reviews)",
    "cover": "assets/images/workbooks/covers/bedtime_stories_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/bedtime_stories_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/bedtime_stories_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/bedtime_stories_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Four beautifully illustrated calming stories designed for bedtime wind-down, teaching deep breathing, gentle reflection, and listening comprehension.",
    "developmentPillars": [
      "Auditory listening comprehension & story recall",
      "Emotional regulation & calming bedtime routines",
      "Expressive conversation & bonding",
      "Mindful breathing & sleep relaxation"
    ]
  },
  "playful_drawing": {
    "title": "Playful Kids Drawing & Creative Art Adventure",
    "category": "Drawing & Creative Art",
    "categoryId": "drawing",
    "tagClass": "badge-popular",
    "badgeText": "🎨 Drawing Fun",
    "age": "Ages 3–7",
    "pages": "21 Printable Pages",
    "price": "$4.99",
    "originalPrice": "$8.99",
    "reviews": "5.0 (20 reviews)",
    "cover": "assets/images/workbooks/covers/playful_drawing_cover.jpg",
    "payhipUrl": "https://payhip.com/BrightSproutsStudio",
    "samples": [
      {
        "src": "assets/images/workbooks/samples/playful_drawing_sample_1.jpg",
        "caption": "Activity Sheet 1"
      },
      {
        "src": "assets/images/workbooks/samples/playful_drawing_sample_2.jpg",
        "caption": "Activity Sheet 2"
      },
      {
        "src": "assets/images/workbooks/samples/playful_drawing_sample_3.jpg",
        "caption": "Activity Sheet 3"
      }
    ],
    "description": "Joyful step-by-step drawing exercises breaking down rockets, castles, trees, and cute characters into beginner strokes.",
    "developmentPillars": [
      "Basic object construction from shapes",
      "Fluid hand motions and pencil grip",
      "Artistic imagination & coloring freedom",
      "Boosted drawing confidence"
    ]
  }
};

  // 2. Fetch Live Dynamic Data from API (if backend is active)
  try {
    const [apiProducts, apiSettings, apiReviews, apiFaqs] = await Promise.all([
      fetch('/api/products').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/settings').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/reviews').then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/faqs').then(r => r.ok ? r.json() : null).catch(() => null)
    ]);

    if (Array.isArray(apiProducts) && apiProducts.length > 0) {
      const dynamicCatalog = {};
      apiProducts.forEach(p => {
        dynamicCatalog[p.id] = p;
      });
      workbookCatalog = dynamicCatalog;
      renderStorefrontProducts(apiProducts);
    }

    if (apiSettings) {
      if (apiSettings.announcement) {
        const banner = document.querySelector('.top-announcement-bar');
        const textEl = document.querySelector('.announcement-text');
        const linkEl = document.querySelector('.announcement-link');
        if (banner) banner.style.display = apiSettings.announcement.enabled ? 'block' : 'none';
        if (textEl && apiSettings.announcement.text) textEl.textContent = apiSettings.announcement.text;
        if (linkEl && apiSettings.announcement.linkText) {
          linkEl.textContent = apiSettings.announcement.linkText;
          if (apiSettings.announcement.linkUrl) linkEl.href = apiSettings.announcement.linkUrl;
        }
      }
      if (apiSettings.hero) {
        const headline = document.querySelector('.hero-headline');
        const subheadline = document.querySelector('.hero-description');
        if (headline && apiSettings.hero.headline) headline.innerHTML = apiSettings.hero.headline;
        if (subheadline && apiSettings.hero.subheadline) subheadline.textContent = apiSettings.hero.subheadline;
      }
    }

    if (Array.isArray(apiReviews) && apiReviews.length > 0) {
      const reviewsGrid = document.querySelector('.reviews-grid');
      if (reviewsGrid) {
        reviewsGrid.innerHTML = apiReviews.slice(0, 6).map(r => `
          <div class="review-card">
            <div class="review-stars">★★★★★</div>
            <p class="review-quote">“${r.comment}”</p>
            <div class="reviewer-meta">
              <div class="reviewer-avatar">${r.avatar || '🌸'}</div>
              <div>
                <strong>${r.author}</strong>
                <span>${r.role || 'Verified Buyer'} &bull; <em>${r.workbook || 'Collection'}</em></span>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    if (Array.isArray(apiFaqs) && apiFaqs.length > 0) {
      const faqList = document.querySelector('.faq-accordion-list');
      if (faqList) {
        faqList.innerHTML = apiFaqs.map(f => `
          <div class="faq-item">
            <button class="faq-question">
              <span>${f.question}</span>
              <span class="faq-toggle-icon">&#43;</span>
            </button>
            <div class="faq-answer">
              <p>${f.answer}</p>
            </div>
          </div>
        `).join('');
        bindFaqEvents();
      }
    }
  } catch (e) {
    // Seamless offline fallback
  }

  // Track Page View
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'pageview' })
    }).catch(() => {});
  } catch (e) {}

  function renderStorefrontProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.filter(p => p.status !== 'draft').map(p => `
      <div class="product-card" data-category="${p.categoryId || 'drawing'}" data-wb-id="${p.id}">
        <div class="product-media-wrap">
          <span class="product-badge ${p.tagClass || 'badge-bestseller'}">${p.badgeText || '⭐ Featured'}</span>
          <img src="${p.cover}" alt="${p.title} Cover" class="product-cover-img" loading="lazy" onerror="this.src='assets/images/workbooks/covers/birds_cover.jpg'">
          <button class="quick-view-overlay-btn" data-id="${p.id}">
            <span>Look Inside 🔍</span>
          </button>
        </div>
        <div class="product-body">
          <div class="product-rating-row">
            <span class="product-stars">★★★★★</span>
            <span class="product-rating-num">${p.reviews || '5.0 (Verified)'}</span>
          </div>
          <h3 class="product-title">${p.title}</h3>
          <p class="product-card-desc">${p.description ? p.description.slice(0, 110) + '...' : ''}</p>
          <div class="product-tags-row">
            <span class="tag-pill tag-age">🎯 ${p.age}</span>
            <span class="tag-pill tag-pages">📄 ${p.pages}</span>
          </div>
          <div class="product-footer-row">
            <div class="product-pricing">
              <span class="price-current">${p.price || '$4.99'}</span>
              ${p.originalPrice ? `<span class="price-original">${p.originalPrice}</span>` : ''}
            </div>
            <div class="product-actions-group">
              <button class="btn btn-look-inside" data-id="${p.id}" title="Preview Pages">
                <span>Look Inside 🔍</span>
              </button>
              <a href="${p.payhipUrl || 'https://payhip.com/BrightSproutsStudio'}" target="_blank" rel="noopener noreferrer" class="btn btn-buy-payhip btn-track-payhip" title="Buy on Payhip">
                <span>Buy 🛍️</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    bindProductButtonEvents();
  }

  // 3. Category Filter Handling
  const filterTabs = document.querySelectorAll('.filter-tab');

  function applyFilter(filterValue) {
    filterTabs.forEach(t => {
      if (t.getAttribute('data-filter') === filterValue) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const catAttr = (card.getAttribute('data-category') || '').toLowerCase();
      const categories = catAttr.split(/\s+/);
      const isMatch = filterValue === 'all' || 
        categories.includes(filterValue.toLowerCase()) ||
        (filterValue === 'fine-motor' && (categories.includes('motor') || categories.includes('fine-motor'))) ||
        (filterValue === 'motor' && (categories.includes('motor') || categories.includes('fine-motor'))) ||
        (filterValue === 'early' && (categories.includes('abc') || categories.includes('numbers') || categories.includes('discovery')));

      if (isMatch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filterValue = tab.getAttribute('data-filter');
      applyFilter(filterValue);
    });
  });

  // Category Cards Click to filter & scroll
  document.querySelectorAll('.cat-pill-card').forEach(card => {
    card.addEventListener('click', () => {
      const filter = card.getAttribute('data-filter-trigger');
      applyFilter(filter);
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. Look Inside Modal / Lightbox
  const modal = document.getElementById('workbookModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openLookInsideModal(id) {
    const item = workbookCatalog[id];
    if (!item) return;

    // Track look inside analytics
    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'look_inside', targetId: id })
      }).catch(() => {});
    } catch (e) {}

    const allImages = [
      { src: item.cover, caption: "Official Cover Preview" },
      ...(item.samples || [])
    ];

    modalBody.innerHTML = `
      <div class="modal-gallery-layout">
        
        <!-- Left: Image Viewer & Thumbnails -->
        <div class="modal-gallery-visual">
          <div class="modal-main-img-wrap">
            <img id="modalMainImg" src="${item.cover}" alt="${item.title}" class="modal-main-img">
            <div id="modalImgCaption" class="modal-img-caption">Official Cover Preview</div>
          </div>

          <div class="modal-thumbnails-strip">
            ${allImages.map((img, idx) => `
              <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${img.src}" data-caption="${img.caption}">
                <img src="${img.src}" alt="${img.caption}">
              </button>
            `).join('')}
          </div>
          <p class="thumbnail-hint">💡 Click any thumbnail above to inspect actual activity pages</p>
        </div>

        <!-- Right: Product & Educational Details -->
        <div class="modal-gallery-info">
          <div class="modal-badge-row">
            <span class="product-badge ${item.tagClass || 'badge-bestseller'}">${item.badgeText || '⭐ Recommended'}</span>
            <span class="meta-pill">${item.category}</span>
          </div>

          <h3 class="modal-title">${item.title}</h3>
          <p class="modal-subtitle">Target Age: <strong>${item.age}</strong> &bull; <strong>${item.pages}</strong> &bull; ★★★★★ ${item.reviews || '5.0'}</p>

          <div class="modal-desc-box">
            <p>${item.description}</p>
          </div>

          <div class="modal-pillars-box">
            <h4>🌱 Key Learning &amp; Speech Milestones:</h4>
            <ul class="pillars-checklist">
              ${(item.developmentPillars || []).map(p => `
                <li><span class="check-bullet">✓</span> ${p}</li>
              `).join('')}
            </ul>
          </div>

          <div class="modal-cta-row">
            <a href="${item.payhipUrl || 'https://payhip.com/BrightSproutsStudio'}" target="_blank" rel="noopener noreferrer" class="btn btn-store-modal btn-track-payhip">
              <span>Get Instant PDF Download on Payhip 🛍️</span>
            </a>
          </div>
        </div>

      </div>
    `;

    // Hook up thumbnail click events
    const thumbBtns = modalBody.querySelectorAll('.thumb-btn');
    const mainImg = modalBody.querySelector('#modalMainImg');
    const mainCaption = modalBody.querySelector('#modalImgCaption');

    thumbBtns.forEach(tb => {
      tb.addEventListener('click', () => {
        thumbBtns.forEach(b => b.classList.remove('active'));
        tb.classList.add('active');
        const newSrc = tb.getAttribute('data-src');
        const newCaption = tb.getAttribute('data-caption');
        mainImg.src = newSrc;
        mainCaption.textContent = newCaption;
      });
    });

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', 'true');
    }
  }

  function bindProductButtonEvents() {
    document.querySelectorAll('.btn-look-inside, .quick-view-overlay-btn').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const id = el.getAttribute('data-id');
        openLookInsideModal(id);
      };
    });
  }

  bindProductButtonEvents();

  // Track Payhip Clicks
  document.addEventListener('click', (e) => {
    const payhipBtn = e.target.closest('.btn-track-payhip, .btn-buy-payhip, .btn-store-header, .btn-store-primary');
    if (payhipBtn) {
      try {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'payhip_click' })
        }).catch(() => {});
      } catch (err) {}
    }
  });

  // 5. Lead Capture (Freebie Form)
  const leadForm = document.getElementById('leadCaptureForm');
  const leadInput = document.getElementById('leadEmailInput');
  const leadSuccess = document.getElementById('leadSuccessMsg');
  const leadBtn = document.getElementById('leadSubmitBtn');

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = leadInput.value.trim();
      if (!email) return;

      if (leadBtn) leadBtn.disabled = true;

      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, source: 'Freebie Sample Pack' })
        });
      } catch (err) {
        // Continue even if offline
      }

      if (leadSuccess) leadSuccess.style.display = 'block';
      if (leadBtn) leadBtn.innerHTML = '<span>Downloaded! 🎉</span>';
      
      // Open sample preview modal immediately
      setTimeout(() => {
        openLookInsideModal('birds');
      }, 400);
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  }

  // Close modal when clicking on the backdrop
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      if (typeof modal.close === 'function') {
        modal.close();
      }
    }
  });

  // 6. FAQ Accordion Interaction
  function bindFaqEvents() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      const icon = item.querySelector('.faq-toggle-icon');
      if (!questionBtn) return;

      questionBtn.onclick = () => {
        const isOpen = item.classList.contains('active');

        faqItems.forEach(i => {
          i.classList.remove('active');
          const iIcon = i.querySelector('.faq-toggle-icon');
          if (iIcon) iIcon.innerHTML = '&#43;';
        });

        if (!isOpen) {
          item.classList.add('active');
          if (icon) icon.innerHTML = '&minus;';
        }
      };
    });
  }

  bindFaqEvents();

  // 7. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 8. Active Nav Link on Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 250;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
