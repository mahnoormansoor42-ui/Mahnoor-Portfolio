/**
 * Bright Sprout Studio — Modern Brand Storefront Application Script
 * Creator: Mahnoor Mansoor (Speech-Language Pathologist)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Full Real Workbook Catalog Data
  const workbookCatalog = {
    "birds": {
      title: "Let's Draw the Birds Together",
      category: "Drawing & Creative Art",
      tagClass: "badge-bestseller",
      badgeText: "⭐ Bestseller",
      age: "Ages 3–7",
      pages: "17 Printable Pages",
      reviews: "5.0 (28 reviews)",
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
      ]
    },
    "sea_animals": {
      title: "Let's Draw the Sea Animals Together",
      category: "Drawing & Creative Art",
      tagClass: "badge-popular",
      badgeText: "🐬 Popular",
      age: "Ages 3–7",
      pages: "15 Printable Pages",
      reviews: "5.0 (34 reviews)",
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
      ]
    },
    "pets": {
      title: "Let's Draw the Pet Animals Together",
      category: "Drawing & Creative Art",
      tagClass: "badge-cute",
      badgeText: "🐶 Kids Favorite",
      age: "Ages 3–7",
      pages: "14 Printable Pages",
      reviews: "5.0 (19 reviews)",
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
      ]
    },
    "body_parts": {
      title: "Let's Draw & Learn Body Parts Together",
      category: "Speech & Early Learning",
      tagClass: "badge-therapy",
      badgeText: "🩺 Speech Focus",
      age: "Ages 3–6",
      pages: "19 Printable Pages",
      reviews: "5.0 (22 reviews)",
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
      ]
    },
    "build_a_face": {
      title: "Make My Face — Cut, Create & Complete",
      category: "Fine-Motor & Social Skills",
      tagClass: "badge-craft",
      badgeText: "✂️ Cut & Paste",
      age: "Ages 3–7",
      pages: "20 Printable Pages",
      reviews: "5.0 (41 reviews)",
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
      ]
    },
    "count_play_learn": {
      title: "Count, Play & Learn Numbers 1–10",
      category: "Numbers & Early Math",
      tagClass: "badge-math",
      badgeText: "🔢 Early Math",
      age: "Pre-K & Kindergarten",
      pages: "20 Printable Pages",
      reviews: "4.9 (30 reviews)",
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
      ]
    },
    "abc_learning": {
      title: "ABC Little Learner A–Z Activity Book",
      category: "ABC & Alphabet Learning",
      tagClass: "badge-bestseller",
      badgeText: "⭐ Top Seller",
      age: "Pre-K & Kindergarten",
      pages: "27 Printable Pages",
      reviews: "5.0 (52 reviews)",
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
      ]
    },
    "fine_motor_tracing": {
      title: "My First Fine Motor Skill Tracing Workbook",
      category: "Fine-Motor & Pre-Writing",
      tagClass: "badge-bestseller",
      badgeText: "🔥 36 Pages",
      age: "Ages 2.5–6",
      pages: "36 Printable Pages",
      reviews: "5.0 (46 reviews)",
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
      ]
    },
    "little_hearts": {
      title: "Little Hearts, Big Feelings: Emotional Learning",
      category: "Social-Emotional & Speech",
      tagClass: "badge-therapy",
      badgeText: "💖 Emotional Skills",
      age: "Ages 3–7",
      pages: "22 Printable Pages",
      reviews: "5.0 (38 reviews)",
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
      ]
    },
    "little_explorer": {
      title: "My Curious World, Little Explorer",
      category: "Preschool Discovery",
      tagClass: "badge-popular",
      badgeText: "🌍 Explorer",
      age: "Pre-K & Kindergarten",
      pages: "16 Printable Pages",
      reviews: "4.9 (17 reviews)",
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
      ]
    },
    "jungle_animals": {
      title: "Wildlife & Jungle Animal Drawing Workbook",
      category: "Drawing & Creative Art",
      tagClass: "badge-cute",
      badgeText: "🦁 Safari Art",
      age: "Ages 4–8",
      pages: "22 Printable Pages",
      reviews: "5.0 (25 reviews)",
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
      ]
    },
    "learning_colors": {
      title: "Learning Colors & Creative Shapes Workbook",
      category: "Preschool Discovery",
      tagClass: "badge-math",
      badgeText: "🎨 Colors & Shapes",
      age: "Ages 2–5",
      pages: "18 Printable Pages",
      reviews: "4.9 (18 reviews)",
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
      ]
    }
  };

  // 2. Category Filter Handling
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  function applyFilter(filterValue) {
    filterTabs.forEach(t => {
      if (t.getAttribute('data-filter') === filterValue) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    productCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (filterValue === 'all' || categories.includes(filterValue)) {
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

  // 3. Look Inside Modal / Lightbox
  const modal = document.getElementById('workbookModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openLookInsideModal(id) {
    const item = workbookCatalog[id];
    if (!item) return;

    const allImages = [
      { src: item.cover, caption: "Cover Preview" },
      ...item.samples
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
            <span class="product-badge ${item.tagClass}">${item.badgeText}</span>
            <span class="meta-pill">${item.category}</span>
          </div>

          <h3 class="modal-title">${item.title}</h3>
          <p class="modal-subtitle">Target Age: <strong>${item.age}</strong> &bull; <strong>${item.pages}</strong> &bull; ★★★★★ ${item.reviews}</p>

          <div class="modal-desc-box">
            <p>${item.description}</p>
          </div>

          <div class="modal-pillars-box">
            <h4>🌱 Key Learning &amp; Speech Milestones:</h4>
            <ul class="pillars-checklist">
              ${item.developmentPillars.map(p => `
                <li><span class="check-bullet">✓</span> ${p}</li>
              `).join('')}
            </ul>
          </div>

          <div class="modal-cta-row">
            <a href="${item.payhipUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-store-modal">
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

  // Bind click on "Look Inside" buttons and Quick View overlay
  document.querySelectorAll('.btn-look-inside, .quick-view-overlay-btn').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.getAttribute('data-id');
      openLookInsideModal(id);
    });
  });

  // Freebie Modal Trigger (opens birds workbook as free preview sample pack)
  const freebieBtn = document.getElementById('freebieModalTrigger');
  if (freebieBtn) {
    freebieBtn.addEventListener('click', () => {
      openLookInsideModal('birds');
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

  // 4. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const icon = item.querySelector('.faq-toggle-icon');

    questionBtn.addEventListener('click', () => {
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
    });
  });

  // 5. Mobile Menu Toggle
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

  // 6. Active Nav Link on Scroll Spy
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
