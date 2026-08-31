/**
 * Bright Sprout Studio — Digital Portfolio Application Script
 * Creator: Mahnoor Mansoor (Speech-Language Pathologist)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Full Real Workbook Catalog Data
  const workbookCatalog = {
    "birds": {
      title: "Let's Draw the Birds Together",
      category: "Drawing & Creative Activities",
      tagClass: "tag-drawing",
      icon: "🐦",
      age: "Ages 3–7",
      pages: "17 Printable Pages",
      cover: "assets/images/workbooks/covers/birds_cover.jpg",
      samples: [
        { src: "assets/images/workbooks/samples/birds_sample_1.jpg", caption: "Step-by-Step Bird Construction" },
        { src: "assets/images/workbooks/samples/birds_sample_2.jpg", caption: "Coloring & Feature Detailing" },
        { src: "assets/images/workbooks/samples/birds_sample_3.jpg", caption: "Species Name & Word Practice" }
      ],
      description: "A step-by-step bird drawing workbook guiding young children to draw charming garden and songbirds using simple geometric shapes, progressive lines, and coloring prompts.",
      developmentPillars: [
        "Visual-spatial awareness & shape decomposition",
        "Pencil grip & controlled directional strokes",
        "Bird species recognition & vocabulary",
        "Creative coloring & artistic confidence"
      ]
    },
    "sea_animals": {
      title: "Let's Draw the Sea Animals Together",
      category: "Drawing & Creative Activities",
      tagClass: "tag-drawing",
      icon: "🐬",
      age: "Ages 3–7",
      pages: "15 Printable Pages",
      cover: "assets/images/workbooks/covers/sea_animals_cover.jpg",
      samples: [
        { src: "assets/images/workbooks/samples/sea_animals_sample_1.jpg", caption: "Ocean Creature Line Guide" },
        { src: "assets/images/workbooks/samples/sea_animals_sample_2.jpg", caption: "Step-by-Step Marine Drawing" },
        { src: "assets/images/workbooks/samples/sea_animals_sample_3.jpg", caption: "Sea Life Identification" }
      ],
      description: "An ocean-themed drawing guide featuring dolphins, turtles, octopuses, and reef fish, breaking down aquatic shapes into intuitive steps for little hands.",
      developmentPillars: [
        "Curved line tracing & fluid hand motions",
        "Marine life exploration & language enrichment",
        "Shape construction & proportion calibration",
        "Low-frustration artistic self-expression"
      ]
    },
    "pets": {
      title: "Let's Draw the Pet Animals Together",
      category: "Drawing & Creative Activities",
      tagClass: "tag-drawing",
      icon: "🐶",
      age: "Ages 3–7",
      pages: "14 Printable Pages",
      cover: "assets/images/workbooks/covers/pets_cover.jpg",
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
        "Encouraging positive drawing routines"
      ]
    },
    "body_parts": {
      title: "Let's Draw & Learn Body Parts Together",
      category: "Body & Early Learning",
      tagClass: "tag-early",
      icon: "👀",
      age: "Ages 3–6",
      pages: "19 Printable Pages",
      cover: "assets/images/workbooks/covers/body_parts_cover.jpg",
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
      category: "Cut & Paste / Social-Emotional",
      tagClass: "tag-motor",
      icon: "🎭",
      age: "Ages 3–7",
      pages: "20 Printable Pages",
      cover: "assets/images/workbooks/covers/build_a_face_cover.jpg",
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
      category: "Counting & Early Math",
      tagClass: "tag-early",
      icon: "🔢",
      age: "Preschool & Kindergarten",
      pages: "20 Printable Pages",
      cover: "assets/images/workbooks/covers/count_play_learn_cover.jpg",
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
      tagClass: "tag-early",
      icon: "🔤",
      age: "Preschool & Kindergarten",
      pages: "27 Printable Pages",
      cover: "assets/images/workbooks/covers/abc_learning_cover.jpg",
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
      tagClass: "tag-motor",
      icon: "✍️",
      age: "Ages 2.5–6",
      pages: "36 Printable Pages",
      cover: "assets/images/workbooks/covers/fine_motor_tracing_cover.jpg",
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
      tagClass: "tag-speech",
      icon: "💖",
      age: "Ages 3–7",
      pages: "22 Printable Pages",
      cover: "assets/images/workbooks/covers/little_hearts_cover.jpg",
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
      category: "Preschool Early Learning",
      tagClass: "tag-early",
      icon: "🌍",
      age: "Preschool & Kindergarten",
      pages: "16 Printable Pages",
      cover: "assets/images/workbooks/covers/little_explorer_cover.jpg",
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
      category: "Drawing & Animal Learning",
      tagClass: "tag-drawing",
      icon: "🦁",
      age: "Ages 4–8",
      pages: "22 Printable Pages",
      cover: "assets/images/workbooks/covers/jungle_animals_cover.jpg",
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
      category: "Early Preschool Learning",
      tagClass: "tag-early",
      icon: "🎨",
      age: "Ages 2–5",
      pages: "18 Printable Pages",
      cover: "assets/images/workbooks/covers/learning_colors_cover.jpg",
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

  // 2. Category Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workbookCards = document.querySelectorAll('.workbook-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      workbookCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Interactive Gallery & Modal Lightbox
  const modal = document.getElementById('workbookModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openWorkbookModal(id) {
    const item = workbookCatalog[id];
    if (!item) return;

    const allImages = [
      { src: item.cover, caption: "Official Cover" },
      ...item.samples
    ];

    modalBody.innerHTML = `
      <div class="modal-gallery-layout">
        
        <!-- Left: Image Viewer & Thumbnails -->
        <div class="modal-gallery-visual">
          <div class="modal-main-img-wrap">
            <img id="modalMainImg" src="${item.cover}" alt="${item.title}" class="modal-main-img">
            <div id="modalImgCaption" class="modal-img-caption">Official Cover</div>
          </div>

          <div class="modal-thumbnails-strip">
            ${allImages.map((img, idx) => `
              <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${img.src}" data-caption="${img.caption}">
                <img src="${img.src}" alt="${img.caption}">
              </button>
            `).join('')}
          </div>
          <p class="thumbnail-hint">💡 Click any thumbnail above to inspect the real activity worksheets</p>
        </div>

        <!-- Right: Educational Details -->
        <div class="modal-gallery-info">
          <div class="modal-badge-row">
            <span class="meta-tag ${item.tagClass}">${item.category}</span>
            <span class="page-count-badge">${item.pages}</span>
          </div>

          <h3 class="modal-title">${item.title}</h3>
          <p class="modal-subtitle">Target: <strong>${item.age}</strong> &bull; Print-Ready PDF Format</p>

          <div class="modal-desc-box">
            <p>${item.description}</p>
          </div>

          <div class="modal-pillars-box">
            <h4>🌱 Key Developmental &amp; Speech Milestones:</h4>
            <ul class="pillars-checklist">
              ${item.developmentPillars.map(p => `
                <li><span class="check-bullet">✓</span> ${p}</li>
              `).join('')}
            </ul>
          </div>

          <div class="modal-cta-row">
            <a href="https://payhip.com/BrightSproutsStudio" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-store-link">
              <span>View in Payhip Store</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
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

  // Bind click on Preview buttons and Card frames
  document.querySelectorAll('.btn-preview-samples, .workbook-card .cover-slot').forEach(el => {
    el.addEventListener('click', (e) => {
      const card = el.closest('.workbook-card');
      if (card) {
        const id = card.getAttribute('data-wb-id');
        openWorkbookModal(id);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  }

  // Close modal when clicking outside dialog window
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

  // 4. PDF Export / Print Handler
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 5. Mobile Navigation Menu Toggle
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
  const sections = document.querySelectorAll('.portfolio-page');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

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
