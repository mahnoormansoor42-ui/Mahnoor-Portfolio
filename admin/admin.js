/**
 * Bright Sprout Studio — Professional Admin Dashboard Logic
 */

// Global State
const state = {
  products: [],
  categories: [],
  reviews: [],
  faqs: [],
  leads: [],
  settings: {},
  analytics: {},
  currentDeleteTarget: null // { type: 'product'|'category'|'review'|'faq', id: string }
};

// Strict Authentication Guard
const token = localStorage.getItem('bss_admin_token');
if (!token) {
  window.location.replace('login.html');
}

const authHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
};

// Verify token validity with backend API
fetch('/api/auth/verify', { headers: authHeaders })
  .then(res => {
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  })
  .then(data => {
    if (data && data.valid) {
      document.body.style.opacity = '1';
    } else {
      localStorage.removeItem('bss_admin_token');
      localStorage.removeItem('bss_admin_user');
      window.location.replace('login.html');
    }
  })
  .catch(() => {
    // If backend offline, check local token presence
    if (token) {
      document.body.style.opacity = '1';
    } else {
      window.location.replace('login.html');
    }
  });

// Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '⚠️'}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Modal Controllers
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll('.nav-item-btn').forEach(b => {
    if (b.getAttribute('data-tab') === tabId) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.remove('active');
  });

  const targetPanel = document.getElementById(`tab-${tabId}`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Update Page Title
  const titles = {
    overview: 'Dashboard Overview',
    workbooks: 'Workbooks & Printables Catalog',
    categories: 'Categories & Filter Management',
    reviews: 'Reviews & Testimonials',
    faqs: 'Frequently Asked Questions',
    leads: 'Email Leads & Subscribers',
    settings: 'Storefront Settings & Founder Bio'
  };
  const titleEl = document.getElementById('pageTitle');
  if (titleEl && titles[tabId]) {
    titleEl.textContent = titles[tabId];
  }
}

// Fetch All Initial Data
async function loadAllData() {
  try {
    const [prodRes, catRes, revRes, faqRes, leadRes, setRes, anaRes] = await Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
      fetch('/api/reviews').then(r => r.json()),
      fetch('/api/faqs').then(r => r.json()),
      fetch('/api/leads', { headers: authHeaders }).then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
      fetch('/api/analytics').then(r => r.json())
    ]);

    state.products = Array.isArray(prodRes) ? prodRes : [];
    state.categories = Array.isArray(catRes) ? catRes : [];
    state.reviews = Array.isArray(revRes) ? revRes : [];
    state.faqs = Array.isArray(faqRes) ? faqRes : [];
    state.leads = Array.isArray(leadRes) ? leadRes : [];
    state.settings = setRes || {};
    state.analytics = anaRes || {};

    // Update Nav Counters
    document.getElementById('navProductCount').textContent = state.products.length;
    document.getElementById('navCategoryCount').textContent = state.categories.length;
    document.getElementById('navReviewCount').textContent = state.reviews.length;
    document.getElementById('navLeadCount').textContent = state.leads.length;

    renderOverview();
    renderProducts();
    renderCategories();
    renderReviews();
    renderFaqs();
    renderLeads();
    renderSettings();
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
    showToast('Failed to load live data. Check server connection.', 'error');
  }
}

// ----------------------------------------------------------------------------
// Renderers
// ----------------------------------------------------------------------------

function renderOverview() {
  // KPI stats
  document.getElementById('kpiProducts').textContent = state.products.length;
  document.getElementById('kpiLeads').textContent = state.leads.length;
  document.getElementById('kpiReviews').textContent = state.reviews.length;
  const totalClicks = (state.analytics.lookInsideViews || 0) + (state.analytics.payhipClicks || 0);
  document.getElementById('kpiClicks').textContent = totalClicks || state.analytics.pageViews || 0;

  // Overview Workbooks Table (top 5)
  const tbody = document.getElementById('overviewProductsTbody');
  tbody.innerHTML = state.products.slice(0, 5).map(p => `
    <tr>
      <td>
        <div class="item-title-cell">
          <img src="../${p.cover}" alt="${p.title}" class="table-thumb">
          <div class="item-meta">
            <span class="item-title-text">${p.title}</span>
            <span class="item-sub-text">${p.age} &bull; ${p.pages}</span>
          </div>
        </div>
      </td>
      <td><span class="badge-pill badge-tag">${p.category}</span></td>
      <td><strong>${p.price}</strong> <span style="font-size:0.75rem; color:#94A3B8; text-decoration:line-through;">${p.originalPrice || ''}</span></td>
      <td><span class="badge-pill ${p.status === 'active' ? 'badge-active' : 'badge-draft'}">${p.status}</span></td>
    </tr>
  `).join('');

  // Overview Recent Leads
  const leadsList = document.getElementById('overviewLeadsList');
  if (state.leads.length === 0) {
    leadsList.innerHTML = `<p style="color:#94A3B8; font-size:0.9rem;">No email leads captured yet.</p>`;
  } else {
    leadsList.innerHTML = state.leads.slice(0, 5).map(l => `
      <div style="padding: 12px; background: #F8FAFC; border-radius: 10px; border: 1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:700; font-size:0.9rem;">${l.email}</div>
          <div style="font-size:0.75rem; color:#64748B;">${l.name || 'Parent'} &bull; ${l.source || 'Freebie'}</div>
        </div>
        <span style="font-size:0.72rem; color:#94A3B8;">${new Date(l.createdAt).toLocaleDateString()}</span>
      </div>
    `).join('');
  }
}

function renderProducts() {
  const tbody = document.getElementById('productsTableBody');
  const search = (document.getElementById('productSearchInput').value || '').toLowerCase();
  const catFilter = document.getElementById('productCategoryFilter').value;

  // Populate category select options
  const catSelect = document.getElementById('productCategoryFilter');
  if (catSelect.options.length <= 1) {
    state.categories.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.filter;
      opt.textContent = `${c.icon} ${c.name}`;
      catSelect.appendChild(opt);
    });
  }

  // Also populate the modal category dropdown
  const prodCatSelect = document.getElementById('prodCategory');
  prodCatSelect.innerHTML = state.categories.map(c => `
    <option value="${c.name}" data-filter="${c.filter}">${c.icon} ${c.name}</option>
  `).join('');

  const filtered = state.products.filter(p => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search) || (p.description && p.description.toLowerCase().includes(search));
    const matchesCat = catFilter === 'all' || p.categoryId === catFilter || (p.category && p.category.toLowerCase().includes(catFilter));
    return matchesSearch && matchesCat;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color:#94A3B8;">No workbooks matching your criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td>
        <div class="item-title-cell">
          <img src="../${p.cover}" alt="${p.title}" class="table-thumb" onerror="this.src='../assets/images/workbooks/covers/birds_cover.jpg'">
          <div class="item-meta">
            <span class="item-title-text">${p.title}</span>
            <span class="item-sub-text">${p.badgeText || ''}</span>
          </div>
        </div>
      </td>
      <td><span class="badge-pill badge-tag">${p.category}</span></td>
      <td>
        <div style="font-weight:600; font-size:0.85rem;">${p.age}</div>
        <div style="font-size:0.75rem; color:#64748B;">${p.pages}</div>
      </td>
      <td>
        <strong>${p.price}</strong>
        ${p.originalPrice ? `<span style="font-size:0.75rem; color:#94A3B8; text-decoration:line-through; margin-left:4px;">${p.originalPrice}</span>` : ''}
      </td>
      <td><span style="font-size:0.82rem; font-weight:700; color:#EA580C;">★ ${p.rating || 5.0}</span></td>
      <td><span class="badge-pill ${p.status === 'active' ? 'badge-active' : 'badge-draft'}">${p.status || 'active'}</span></td>
      <td style="text-align: right;">
        <div class="actions-cell" style="justify-content: flex-end;">
          <button class="btn-action-icon" title="Edit Workbook" onclick="openEditProduct('${p.id}')">✏️</button>
          <button class="btn-action-icon delete" title="Delete Workbook" onclick="confirmDelete('product', '${p.id}', '${p.title.replace(/'/g, "\\'")}')">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = state.categories.map(c => `
    <div class="admin-card-box">
      <div class="card-box-header">
        <div class="card-icon-bubble" style="background: ${c.accent || '#FFF2F2'};">${c.icon}</div>
        <div class="actions-cell">
          <button class="btn-action-icon" title="Edit" onclick="openEditCategory('${c.id}')">✏️</button>
          <button class="btn-action-icon delete" title="Delete" onclick="confirmDelete('category', '${c.id}', '${c.name.replace(/'/g, "\\'")}')">🗑️</button>
        </div>
      </div>
      <div>
        <h4 style="font-size: 1.05rem; font-weight:700;">${c.name}</h4>
        <p style="font-size:0.8rem; color:#64748B; margin-top:4px;">Filter ID: <code>${c.filter}</code></p>
      </div>
    </div>
  `).join('');
}

function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = state.reviews.map(r => `
    <div class="admin-card-box">
      <div class="card-box-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="card-icon-bubble" style="background: #FEF3C7; font-size:1.2rem;">${r.avatar || '👩‍🏫'}</div>
          <div>
            <div style="font-weight:700; font-size:0.95rem;">${r.author}</div>
            <div style="font-size:0.75rem; color:#64748B;">${r.role}</div>
          </div>
        </div>
        <div class="actions-cell">
          <button class="btn-action-icon" title="Edit" onclick="openEditReview('${r.id}')">✏️</button>
          <button class="btn-action-icon delete" title="Delete" onclick="confirmDelete('review', '${r.id}', '${r.author.replace(/'/g, "\\'")}')">🗑️</button>
        </div>
      </div>
      <div>
        <div style="color: #F59E0B; font-size:0.9rem; margin-bottom: 6px;">★★★★★ ${r.rating || 5} Stars</div>
        <p style="font-size:0.88rem; color:#334155; line-height:1.4;">"${r.comment}"</p>
        <p style="font-size:0.75rem; color:#64748B; margin-top:8px;">Workbook: <em>${r.workbook}</em></p>
      </div>
    </div>
  `).join('');
}

function renderFaqs() {
  const list = document.getElementById('faqsList');
  list.innerHTML = state.faqs.map(f => `
    <div class="admin-card-box" style="flex-direction:row; align-items:flex-start; gap:16px;">
      <div style="flex:1;">
        <h4 style="font-size:1rem; font-weight:700; color:#0F172A; margin-bottom:6px;">❓ ${f.question}</h4>
        <p style="font-size:0.88rem; color:#475569; line-height:1.45;">${f.answer}</p>
      </div>
      <div class="actions-cell">
        <button class="btn-action-icon" title="Edit" onclick="openEditFaq('${f.id}')">✏️</button>
        <button class="btn-action-icon delete" title="Delete" onclick="confirmDelete('faq', '${f.id}', '${f.question.replace(/'/g, "\\'")}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

function renderLeads() {
  const tbody = document.getElementById('leadsTableBody');
  const search = (document.getElementById('leadsSearchInput').value || '').toLowerCase();

  const filtered = state.leads.filter(l => {
    return !search || l.email.toLowerCase().includes(search) || (l.name && l.name.toLowerCase().includes(search));
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 24px; color:#94A3B8;">No subscribers found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(l => `
    <tr>
      <td><strong>${l.email}</strong></td>
      <td>${l.name || 'Parent/Teacher'}</td>
      <td><span class="badge-pill badge-tag">${l.source || 'Freebie Sample Pack'}</span></td>
      <td>${new Date(l.createdAt).toLocaleString()}</td>
    </tr>
  `).join('');
}

function renderSettings() {
  const s = state.settings || {};
  if (s.announcement) {
    document.getElementById('settingAnnounceEnabled').checked = s.announcement.enabled !== false;
    document.getElementById('settingAnnounceText').value = s.announcement.text || '';
    document.getElementById('settingAnnounceLinkText').value = s.announcement.linkText || 'Shop Store →';
    document.getElementById('settingAnnounceLinkUrl').value = s.announcement.linkUrl || '#shop';
  }
  if (s.hero) {
    document.getElementById('settingHeroHeadline').value = s.hero.headline || '';
    document.getElementById('settingHeroSubheadline').value = s.hero.subheadline || '';
  }
  if (s.founder) {
    document.getElementById('settingFounderName').value = s.founder.name || '';
    document.getElementById('settingFounderTitle').value = s.founder.title || '';
    document.getElementById('settingFounderExp').value = s.founder.experience || '';
    document.getElementById('settingFounderBio').value = s.founder.bio || '';
    document.getElementById('settingFounderEmail').value = s.founder.email || '';
    document.getElementById('settingFounderStoreUrl').value = s.founder.storeUrl || '';
  }
}

// ----------------------------------------------------------------------------
// CRUD Modals & Actions
// ----------------------------------------------------------------------------

// Product Add / Edit
document.getElementById('btnAddNewProduct').addEventListener('click', () => openNewProductModal());
document.getElementById('btnQuickAddProduct').addEventListener('click', () => openNewProductModal());

function openNewProductModal() {
  document.getElementById('productForm').reset();
  document.getElementById('prodEditId').value = '';
  document.getElementById('productModalTitle').textContent = 'Add New Workbook';
  document.getElementById('coverPreviewImg').style.display = 'none';
  openModal('productModal');
}

function openEditProduct(id) {
  const item = state.products.find(p => p.id === id);
  if (!item) return;

  document.getElementById('prodEditId').value = item.id;
  document.getElementById('productModalTitle').textContent = 'Edit: ' + item.title;
  document.getElementById('prodTitle').value = item.title || '';
  document.getElementById('prodCategory').value = item.category || '';
  document.getElementById('prodBadgeText').value = item.badgeText || '';
  document.getElementById('prodAge').value = item.age || '';
  document.getElementById('prodPages').value = item.pages || '';
  document.getElementById('prodPrice').value = item.price || '$4.99';
  document.getElementById('prodOriginalPrice').value = item.originalPrice || '$8.99';
  document.getElementById('prodPayhipUrl').value = item.payhipUrl || 'https://payhip.com/BrightSproutsStudio';
  document.getElementById('prodCoverUrl').value = item.cover || '';
  document.getElementById('prodDescription').value = item.description || '';
  document.getElementById('prodPillars').value = (item.developmentPillars || []).join('\n');
  document.getElementById('prodStatus').value = item.status || 'active';
  document.getElementById('prodReviews').value = item.reviews || '5.0 (25 reviews)';

  if (item.cover) {
    const preview = document.getElementById('coverPreviewImg');
    preview.src = '../' + item.cover;
    preview.style.display = 'block';
  }

  openModal('productModal');
}

// Product Form Submit
document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const editId = document.getElementById('prodEditId').value;
  const isEdit = Boolean(editId);

  const selectedCategoryOption = document.getElementById('prodCategory').selectedOptions[0];
  const categoryFilter = selectedCategoryOption ? selectedCategoryOption.getAttribute('data-filter') : 'drawing';

  const pillarsRaw = document.getElementById('prodPillars').value;
  const pillars = pillarsRaw.split('\n').map(s => s.trim()).filter(Boolean);

  const payload = {
    title: document.getElementById('prodTitle').value.trim(),
    category: document.getElementById('prodCategory').value,
    categoryId: categoryFilter,
    badgeText: document.getElementById('prodBadgeText').value.trim(),
    age: document.getElementById('prodAge').value.trim(),
    pages: document.getElementById('prodPages').value.trim(),
    price: document.getElementById('prodPrice').value.trim(),
    originalPrice: document.getElementById('prodOriginalPrice').value.trim(),
    payhipUrl: document.getElementById('prodPayhipUrl').value.trim(),
    cover: document.getElementById('prodCoverUrl').value.trim() || 'assets/images/workbooks/covers/birds_cover.jpg',
    description: document.getElementById('prodDescription').value.trim(),
    developmentPillars: pillars,
    status: document.getElementById('prodStatus').value,
    reviews: document.getElementById('prodReviews').value.trim() || '5.0 (New)'
  };

  try {
    const endpoint = isEdit ? `/api/products/${editId}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
      method: method,
      headers: authHeaders,
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      showToast(isEdit ? 'Workbook updated successfully!' : 'New workbook published!');
      closeModal('productModal');
      await loadAllData();
    } else {
      showToast(data.error || 'Failed to save workbook', 'error');
    }
  } catch (err) {
    showToast('Server connection error', 'error');
  }
});

// Cover Image File Upload Handler
document.getElementById('coverFileInput').addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    const base64Data = e.target.result;
    try {
      showToast('Uploading image... ⏳');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ filename: file.name, data: base64Data })
      });
      const data = await res.json();
      if (res.ok && data.url) {
        document.getElementById('prodCoverUrl').value = data.url;
        const preview = document.getElementById('coverPreviewImg');
        preview.src = '../' + data.url;
        preview.style.display = 'block';
        showToast('Image uploaded successfully! 📸');
      } else {
        showToast(data.error || 'Image upload failed', 'error');
      }
    } catch (err) {
      showToast('Upload failed: ' + err.message, 'error');
    }
  };
  reader.readAsDataURL(file);
});

// Category Add / Edit
document.getElementById('btnAddCategory').addEventListener('click', () => {
  document.getElementById('categoryForm').reset();
  document.getElementById('catEditId').value = '';
  document.getElementById('categoryModalTitle').textContent = 'Add Category';
  openModal('categoryModal');
});

function openEditCategory(id) {
  const c = state.categories.find(item => item.id === id);
  if (!c) return;
  document.getElementById('catEditId').value = c.id;
  document.getElementById('categoryModalTitle').textContent = 'Edit: ' + c.name;
  document.getElementById('catName').value = c.name;
  document.getElementById('catIcon').value = c.icon;
  document.getElementById('catFilter').value = c.filter;
  openModal('categoryModal');
}

document.getElementById('categoryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const editId = document.getElementById('catEditId').value;
  const isEdit = Boolean(editId);
  const payload = {
    name: document.getElementById('catName').value.trim(),
    icon: document.getElementById('catIcon').value.trim() || '🎨',
    filter: document.getElementById('catFilter').value.trim() || 'drawing'
  };

  try {
    const endpoint = isEdit ? `/api/categories/${editId}` : '/api/categories';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method: method,
      headers: authHeaders,
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('Category saved!');
      closeModal('categoryModal');
      await loadAllData();
    }
  } catch (err) {
    showToast('Failed to save category', 'error');
  }
});

// Review Add / Edit
document.getElementById('btnAddReview').addEventListener('click', () => {
  document.getElementById('reviewForm').reset();
  document.getElementById('revEditId').value = '';
  document.getElementById('reviewModalTitle').textContent = 'Add Testimonial';
  openModal('reviewModal');
});

function openEditReview(id) {
  const r = state.reviews.find(item => item.id === id);
  if (!r) return;
  document.getElementById('revEditId').value = r.id;
  document.getElementById('reviewModalTitle').textContent = 'Edit Review';
  document.getElementById('revAuthor').value = r.author;
  document.getElementById('revRole').value = r.role;
  document.getElementById('revAvatar').value = r.avatar;
  document.getElementById('revWorkbook').value = r.workbook;
  document.getElementById('revComment').value = r.comment;
  openModal('reviewModal');
}

document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const editId = document.getElementById('revEditId').value;
  const isEdit = Boolean(editId);
  const payload = {
    author: document.getElementById('revAuthor').value.trim(),
    role: document.getElementById('revRole').value.trim(),
    avatar: document.getElementById('revAvatar').value.trim() || '👩‍🏫',
    workbook: document.getElementById('revWorkbook').value.trim(),
    comment: document.getElementById('revComment').value.trim(),
    rating: 5
  };

  try {
    const endpoint = isEdit ? `/api/reviews/${editId}` : '/api/reviews';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method: method,
      headers: authHeaders,
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('Review saved!');
      closeModal('reviewModal');
      await loadAllData();
    }
  } catch (err) {
    showToast('Failed to save review', 'error');
  }
});

// FAQ Add / Edit
document.getElementById('btnAddFaq').addEventListener('click', () => {
  document.getElementById('faqForm').reset();
  document.getElementById('faqEditId').value = '';
  document.getElementById('faqModalTitle').textContent = 'Add FAQ Item';
  openModal('faqModal');
});

function openEditFaq(id) {
  const f = state.faqs.find(item => item.id === id);
  if (!f) return;
  document.getElementById('faqEditId').value = f.id;
  document.getElementById('faqModalTitle').textContent = 'Edit FAQ';
  document.getElementById('faqQuestion').value = f.question;
  document.getElementById('faqAnswer').value = f.answer;
  openModal('faqModal');
}

document.getElementById('faqForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const editId = document.getElementById('faqEditId').value;
  const isEdit = Boolean(editId);
  const payload = {
    question: document.getElementById('faqQuestion').value.trim(),
    answer: document.getElementById('faqAnswer').value.trim()
  };

  try {
    const endpoint = isEdit ? `/api/faqs/${editId}` : '/api/faqs';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method: method,
      headers: authHeaders,
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('FAQ item saved!');
      closeModal('faqModal');
      await loadAllData();
    }
  } catch (err) {
    showToast('Failed to save FAQ', 'error');
  }
});

// Delete Confirmation
function confirmDelete(type, id, name) {
  state.currentDeleteTarget = { type, id };
  document.getElementById('deleteConfirmText').textContent = `Are you sure you want to permanently delete "${name}"? This action cannot be undone.`;
  openModal('deleteModal');
}

document.getElementById('btnConfirmDelete').addEventListener('click', async () => {
  if (!state.currentDeleteTarget) return;
  const { type, id } = state.currentDeleteTarget;

  const endpoints = {
    product: `/api/products/${id}`,
    category: `/api/categories/${id}`,
    review: `/api/reviews/${id}`,
    faq: `/api/faqs/${id}`
  };

  try {
    const res = await fetch(endpoints[type], {
      method: 'DELETE',
      headers: authHeaders
    });
    if (res.ok) {
      showToast('Deleted successfully!');
      closeModal('deleteModal');
      await loadAllData();
    } else {
      showToast('Failed to delete item', 'error');
    }
  } catch (err) {
    showToast('Delete error: ' + err.message, 'error');
  }
});

// Save Storefront Settings
document.getElementById('btnSaveStorefrontSettings').addEventListener('click', async () => {
  const payload = {
    announcement: {
      enabled: document.getElementById('settingAnnounceEnabled').checked,
      text: document.getElementById('settingAnnounceText').value.trim(),
      linkText: document.getElementById('settingAnnounceLinkText').value.trim(),
      linkUrl: document.getElementById('settingAnnounceLinkUrl').value.trim()
    },
    hero: {
      headline: document.getElementById('settingHeroHeadline').value.trim(),
      subheadline: document.getElementById('settingHeroSubheadline').value.trim()
    },
    founder: {
      name: document.getElementById('settingFounderName').value.trim(),
      title: document.getElementById('settingFounderTitle').value.trim(),
      experience: document.getElementById('settingFounderExp').value.trim(),
      bio: document.getElementById('settingFounderBio').value.trim(),
      email: document.getElementById('settingFounderEmail').value.trim(),
      storeUrl: document.getElementById('settingFounderStoreUrl').value.trim()
    }
  };

  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('Store settings saved successfully! 💾');
      await loadAllData();
    } else {
      showToast('Failed to save settings', 'error');
    }
  } catch (err) {
    showToast('Connection error', 'error');
  }
});

// Update Password
document.getElementById('btnUpdatePassword').addEventListener('click', async () => {
  const currentPassword = document.getElementById('currentAdminPass').value;
  const newPassword = document.getElementById('newAdminPass').value;

  if (!currentPassword || !newPassword) {
    return showToast('Please fill both current and new password', 'error');
  }

  try {
    const res = await fetch('/api/auth/update-credentials', {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Password updated! Please log in again.');
      setTimeout(() => {
        localStorage.removeItem('bss_admin_token');
        window.location.href = 'login.html';
      }, 1500);
    } else {
      showToast(data.error || 'Failed to update credentials', 'error');
    }
  } catch (err) {
    showToast('Connection error', 'error');
  }
});

// Export Leads to CSV
document.getElementById('btnExportLeadsCsv').addEventListener('click', () => {
  window.location.href = '/api/leads/export-csv?auth=' + token;
});

// Logout
document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('bss_admin_token');
  localStorage.removeItem('bss_admin_user');
  window.location.href = 'login.html';
});

// Event Listeners for Filter / Search Inputs
document.getElementById('productSearchInput').addEventListener('input', renderProducts);
document.getElementById('productCategoryFilter').addEventListener('change', renderProducts);
document.getElementById('leadsSearchInput').addEventListener('input', renderLeads);

// Sidebar Nav Event Listeners
document.querySelectorAll('.nav-item-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    switchTab(tab);
  });
});

// Init on Load
document.addEventListener('DOMContentLoaded', () => {
  const userData = localStorage.getItem('bss_admin_user');
  if (userData) {
    try {
      const u = JSON.parse(userData);
      document.getElementById('adminUsernameDisplay').textContent = u.username || 'Administrator';
    } catch (e) {}
  }
  loadAllData();
});
