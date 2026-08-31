/**
 * Bright Sprout Studio — Digital Portfolio Application Script
 * Creator: Mahnoor Mansoor
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Workbook Catalog Data for Details Dialog
  const workbookDetails = {
    "1": {
      title: "Let's Draw the Birds Together",
      category: "Drawing & Creative Activities",
      icon: "🐦",
      age: "Ages 3–7",
      pages: "Printable Activity Pages",
      description: "A step-by-step bird drawing workbook guiding children to draw charming garden and songbirds using simple geometric shapes, progressive lines, and coloring prompts.",
      developmentPillars: [
        "Visual-spatial awareness",
        "Pencil grip & stroke control",
        "Bird species recognition & curiosity",
        "Creative coloring & artistic confidence"
      ]
    },
    "2": {
      title: "Let's Draw the Sea Animals Together",
      category: "Drawing & Creative Activities",
      icon: "🐬",
      age: "Ages 3–7",
      pages: "Printable Activity Pages",
      description: "An ocean-themed drawing guide featuring dolphins, turtles, octopuses, and reef fish, breaking down aquatic shapes into intuitive steps.",
      developmentPillars: [
        "Curved line tracing & fluid hand motions",
        "Marine life exploration",
        "Shape construction & proportion",
        "Artistic self-expression"
      ]
    },
    "3": {
      title: "Let's Draw the Pet Animals Together",
      category: "Drawing & Creative Activities",
      icon: "🐶",
      age: "Ages 3–7",
      pages: "Printable Activity Pages",
      description: "Features beloved family pets (puppies, kittens, bunnies, hamsters) with engaging step-by-step drawing demonstrations.",
      developmentPillars: [
        "Fine-motor coordination",
        "Pet empathy & vocabulary",
        "Hand-eye coordination",
        "Low-frustration step mastery"
      ]
    },
    "4": {
      title: "Let's Draw & Learn Body Parts Together",
      category: "Body Parts & Early Learning",
      icon: "👀",
      age: "Ages 3–6",
      pages: "Printable Activity Pages",
      description: "Combines fundamental anatomical vocabulary with guided drawing of facial features, hands, feet, and gestures to reinforce body schema.",
      developmentPillars: [
        "Self-concept & anatomical vocabulary",
        "Facial feature placement & symmetry",
        "Speech therapy language reinforcement",
        "Pre-writing motor control"
      ]
    },
    "5": {
      title: "Build-a-Face / Who Am I? Build My Face",
      category: "Cut & Paste / Social-Emotional",
      icon: "🎭",
      age: "Ages 3–7",
      pages: "Printable Cut-and-Paste Sheets",
      description: "Hands-on cut-and-paste activity pages where children assemble different facial expressions, hair styles, and accessories.",
      developmentPillars: [
        "Bilateral scissor coordination & safety",
        "Emotion identification & facial cues",
        "Spatial orientation & pasting accuracy",
        "Creative storytelling & identity"
      ]
    },
    "6": {
      title: "Count, Play and Learn",
      category: "Counting & Numbers",
      icon: "🔢",
      age: "Preschool & Kindergarten",
      pages: "Printable Math Worksheets",
      description: "Visual math workbook introducing number recognition 1–10, one-to-one counting correspondence, and fun object grouping.",
      developmentPillars: [
        "Number formation & stroke order",
        "One-to-one correspondence",
        "Visual quantity estimation",
        "Early math confidence"
      ]
    },
    "7": {
      title: "ABC Learning",
      category: "Alphabet & Phonics",
      icon: "🔤",
      age: "Preschool & Kindergarten",
      pages: "A–Z Printable Workbook",
      description: "Complete alphabet learning workbook with large uppercase and lowercase letters, guided directional arrows, and cheerful phonics illustrations.",
      developmentPillars: [
        "Letter recognition & formation",
        "Initial letter sound associations",
        "Phonological awareness",
        "Pre-reading literacy foundation"
      ]
    },
    "8": {
      title: "Fine Motor Skills Tracing Workbook",
      category: "Fine-Motor & Pre-Writing",
      icon: "✍️",
      age: "Ages 2.5–6",
      pages: "Graduated Tracing Paths",
      description: "Calibrated line tracing workbook featuring straight lines, zig-zags, waves, arches, and spiral patterns that prepare fingers for handwriting.",
      developmentPillars: [
        "Pencil pressure & grip stability",
        "Controlled wrist movement",
        "Visual-motor tracking",
        "Hand endurance for handwriting"
      ]
    }
  };

  // 2. Filter Functionality
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

  // 3. Details Dialog / Modal
  const modal = document.getElementById('workbookModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('.btn-card-details');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-item');
      const item = workbookDetails[id];
      if (!item) return;

      modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 2.8rem; margin-bottom: 8px;">${item.icon}</div>
          <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--color-coral); background: var(--color-coral-light); padding: 3px 10px; border-radius: 9999px;">${item.category}</span>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-top: 10px;">${item.title}</h3>
          <p style="font-size: 0.88rem; font-weight: 600; color: var(--text-muted);">${item.age} &bull; ${item.pages}</p>
        </div>

        <div style="background: var(--bg-card-subtle); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px;">
          <p style="font-size: 0.94rem; color: var(--text-main); line-height: 1.6;">${item.description}</p>
        </div>

        <div>
          <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 10px;">🌱 Key Developmental Skills:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${item.developmentPillars.map(p => `
              <li style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; color: var(--text-muted);">
                <span style="color: var(--color-sprout-green); font-weight: bold;">✓</span> ${p}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://payhip.com/BrightSproutsStudio" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%;">
            View in Payhip Store &rarr;
          </a>
        </div>
      `;

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', 'true');
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

  // Close modal when clicking outside
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

  // 4. Print / PDF Export Handler
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
