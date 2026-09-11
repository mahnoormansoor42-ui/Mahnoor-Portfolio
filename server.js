/**
 * Bright Sprout Studio — Dynamic REST API & Static File Server
 * Zero external dependency architecture (Pure Node.js)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const FALLBACK_PORTS = [8000, 3000, 8080, 5000, 4000];
const DB_PATH = path.join(__dirname, 'data', 'database.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Active session tokens in-memory
const activeTokens = new Set(['admin-session-demo-token']);

// Database Helpers
function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { products: [], categories: [], reviews: [], faqs: [], settings: {}, leads: [], analytics: { pageViews: 0, lookInsideViews: 0, payhipClicks: 0, leadsCount: 0, events: [] } };
    }
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database:', err);
    return { products: [], categories: [], reviews: [], faqs: [], settings: {}, leads: [], analytics: { pageViews: 0, lookInsideViews: 0, payhipClicks: 0, leadsCount: 0, events: [] } };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.csv': 'text/csv; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Response Helpers
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 25 * 1024 * 1024) {
        reject(new Error('Request body payload too large'));
      }
    });
    req.on('end', () => {
      try {
        if (!body) return resolve({});
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (e) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

function requireAuth(req, res) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token || !activeTokens.has(token)) {
    sendJSON(res, 401, { error: 'Unauthorized: Invalid or expired admin token' });
    return false;
  }
  return true;
}

// Master HTTP Request Handler
async function appHandler(req, res) {
  const host = req.headers.host || 'localhost:8000';
  const parsedUrl = new URL(req.url, 'http://' + host);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  const method = req.method.toUpperCase();

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // --------------------------------------------------------------------------
  // REST API ROUTES
  // --------------------------------------------------------------------------

  // 1. Authentication
  if (pathname === '/api/auth/login' && method === 'POST') {
    const { username, password } = await parseBody(req);
    const db = readDB();
    const adminUser = db.settings?.auth?.adminUsername || 'admin';
    const adminPass = db.settings?.auth?.adminPassword || 'password123';

    if (username === adminUser && password === adminPass) {
      const token = 'token_' + crypto.randomBytes(24).toString('hex');
      activeTokens.add(token);
      return sendJSON(res, 200, {
        success: true,
        token: token,
        user: { username: adminUser, role: 'Administrator' }
      });
    } else {
      return sendJSON(res, 401, { success: false, error: 'Invalid username or password' });
    }
  }

  if (pathname === '/api/auth/verify' && method === 'GET') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (activeTokens.has(token)) {
      return sendJSON(res, 200, { valid: true });
    }
    return sendJSON(res, 401, { valid: false });
  }

  if (pathname === '/api/auth/update-credentials' && method === 'PUT') {
    if (!requireAuth(req, res)) return;
    const { currentPassword, newUsername, newPassword } = await parseBody(req);
    const db = readDB();
    if (currentPassword !== db.settings?.auth?.adminPassword) {
      return sendJSON(res, 400, { error: 'Current password does not match' });
    }
    if (!db.settings.auth) db.settings.auth = {};
    if (newUsername) db.settings.auth.adminUsername = newUsername;
    if (newPassword) db.settings.auth.adminPassword = newPassword;
    writeDB(db);
    return sendJSON(res, 200, { success: true, message: 'Admin credentials updated successfully' });
  }

  // 2. Analytics
  if (pathname === '/api/analytics' && method === 'GET') {
    const db = readDB();
    const analytics = db.analytics || { pageViews: 0, lookInsideViews: 0, payhipClicks: 0, leadsCount: 0 };
    return sendJSON(res, 200, {
      totalProducts: (db.products || []).length,
      totalCategories: (db.categories || []).length,
      totalReviews: (db.reviews || []).length,
      totalLeads: (db.leads || []).length,
      pageViews: analytics.pageViews || 0,
      lookInsideViews: analytics.lookInsideViews || 0,
      payhipClicks: analytics.payhipClicks || 0,
      recentEvents: (analytics.events || []).slice(-15)
    });
  }

  if (pathname === '/api/analytics/track' && method === 'POST') {
    const { event, targetId } = await parseBody(req);
    const db = readDB();
    if (!db.analytics) db.analytics = { pageViews: 0, lookInsideViews: 0, payhipClicks: 0, leadsCount: 0, events: [] };
    
    if (event === 'pageview') db.analytics.pageViews = (db.analytics.pageViews || 0) + 1;
    if (event === 'look_inside') db.analytics.lookInsideViews = (db.analytics.lookInsideViews || 0) + 1;
    if (event === 'payhip_click') db.analytics.payhipClicks = (db.analytics.payhipClicks || 0) + 1;

    if (!db.analytics.events) db.analytics.events = [];
    db.analytics.events.push({
      event: event || 'custom',
      targetId: targetId || null,
      timestamp: new Date().toISOString()
    });
    if (db.analytics.events.length > 100) db.analytics.events.shift();

    writeDB(db);
    return sendJSON(res, 200, { success: true });
  }

  // 3. Products CRUD
  if (pathname === '/api/products' && method === 'GET') {
    const db = readDB();
    return sendJSON(res, 200, db.products || []);
  }

  if (pathname.startsWith('/api/products/') && method === 'GET') {
    const id = pathname.replace('/api/products/', '').trim();
    const db = readDB();
    const item = (db.products || []).find(p => p.id === id);
    if (!item) return sendJSON(res, 404, { error: 'Product not found' });
    return sendJSON(res, 200, item);
  }

  if (pathname === '/api/products' && method === 'POST') {
    if (!requireAuth(req, res)) return;
    const body = await parseBody(req);
    if (!body.title) return sendJSON(res, 400, { error: 'Title is required' });

    const db = readDB();
    if (!db.products) db.products = [];

    const newId = body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') + '_' + Date.now().toString().slice(-4);
    
    const newProduct = {
      id: newId,
      title: body.title,
      category: body.category || 'Drawing & Creative Art',
      categoryId: body.categoryId || 'drawing',
      tagClass: body.tagClass || 'badge-bestseller',
      badgeText: body.badgeText || '⭐ New',
      age: body.age || 'Ages 3–7',
      pages: body.pages || '15 Printable Pages',
      price: body.price || '$4.99',
      originalPrice: body.originalPrice || '$8.99',
      reviews: body.reviews || '5.0 (New)',
      rating: Number(body.rating) || 5.0,
      reviewCount: Number(body.reviewCount) || 1,
      cover: body.cover || 'assets/images/workbooks/covers/birds_cover.jpg',
      payhipUrl: body.payhipUrl || 'https://payhip.com/BrightSproutsStudio',
      samples: Array.isArray(body.samples) ? body.samples : [],
      description: body.description || '',
      developmentPillars: Array.isArray(body.developmentPillars) ? body.developmentPillars : [],
      featured: Boolean(body.featured),
      status: body.status || 'active',
      order: db.products.length + 1,
      createdAt: new Date().toISOString()
    };

    db.products.push(newProduct);
    writeDB(db);
    return sendJSON(res, 201, newProduct);
  }

  if (pathname.startsWith('/api/products/') && method === 'PUT') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/products/', '').trim();
    const body = await parseBody(req);
    const db = readDB();
    const idx = (db.products || []).findIndex(p => p.id === id);
    if (idx === -1) return sendJSON(res, 404, { error: 'Product not found' });

    db.products[idx] = {
      ...db.products[idx],
      ...body,
      id: id,
      updatedAt: new Date().toISOString()
    };

    writeDB(db);
    return sendJSON(res, 200, db.products[idx]);
  }

  if (pathname.startsWith('/api/products/') && method === 'DELETE') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/products/', '').trim();
    const db = readDB();
    const initialLen = (db.products || []).length;
    db.products = (db.products || []).filter(p => p.id !== id);
    if (db.products.length === initialLen) return sendJSON(res, 404, { error: 'Product not found' });

    writeDB(db);
    return sendJSON(res, 200, { success: true, message: 'Product deleted' });
  }

  // 4. Categories CRUD
  if (pathname === '/api/categories' && method === 'GET') {
    const db = readDB();
    return sendJSON(res, 200, db.categories || []);
  }

  if (pathname === '/api/categories' && method === 'POST') {
    if (!requireAuth(req, res)) return;
    const body = await parseBody(req);
    const db = readDB();
    if (!db.categories) db.categories = [];
    const newCat = {
      id: body.id || 'cat_' + Date.now(),
      name: body.name || 'New Category',
      icon: body.icon || '🎨',
      accent: body.accent || '#FFF2F2',
      count: body.count || '0 Workbooks',
      filter: body.filter || 'drawing'
    };
    db.categories.push(newCat);
    writeDB(db);
    return sendJSON(res, 201, newCat);
  }

  if (pathname.startsWith('/api/categories/') && method === 'PUT') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/categories/', '').trim();
    const body = await parseBody(req);
    const db = readDB();
    const idx = (db.categories || []).findIndex(c => c.id === id);
    if (idx === -1) return sendJSON(res, 404, { error: 'Category not found' });
    db.categories[idx] = { ...db.categories[idx], ...body, id: id };
    writeDB(db);
    return sendJSON(res, 200, db.categories[idx]);
  }

  if (pathname.startsWith('/api/categories/') && method === 'DELETE') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/categories/', '').trim();
    const db = readDB();
    db.categories = (db.categories || []).filter(c => c.id !== id);
    writeDB(db);
    return sendJSON(res, 200, { success: true });
  }

  // 5. Reviews CRUD
  if (pathname === '/api/reviews' && method === 'GET') {
    const db = readDB();
    return sendJSON(res, 200, db.reviews || []);
  }

  if (pathname === '/api/reviews' && method === 'POST') {
    if (!requireAuth(req, res)) return;
    const body = await parseBody(req);
    const db = readDB();
    if (!db.reviews) db.reviews = [];
    const newRev = {
      id: 'rev_' + Date.now(),
      author: body.author || 'Parent / Educator',
      role: body.role || 'Verified Buyer',
      rating: Number(body.rating) || 5,
      comment: body.comment || '',
      workbook: body.workbook || 'General Collection',
      avatar: body.avatar || '⭐',
      approved: body.approved !== false,
      createdAt: new Date().toISOString()
    };
    db.reviews.push(newRev);
    writeDB(db);
    return sendJSON(res, 201, newRev);
  }

  if (pathname.startsWith('/api/reviews/') && method === 'PUT') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/reviews/', '').trim();
    const body = await parseBody(req);
    const db = readDB();
    const idx = (db.reviews || []).findIndex(r => r.id === id);
    if (idx === -1) return sendJSON(res, 404, { error: 'Review not found' });
    db.reviews[idx] = { ...db.reviews[idx], ...body, id: id };
    writeDB(db);
    return sendJSON(res, 200, db.reviews[idx]);
  }

  if (pathname.startsWith('/api/reviews/') && method === 'DELETE') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/reviews/', '').trim();
    const db = readDB();
    db.reviews = (db.reviews || []).filter(r => r.id !== id);
    writeDB(db);
    return sendJSON(res, 200, { success: true });
  }

  // 6. FAQs CRUD
  if (pathname === '/api/faqs' && method === 'GET') {
    const db = readDB();
    return sendJSON(res, 200, db.faqs || []);
  }

  if (pathname === '/api/faqs' && method === 'POST') {
    if (!requireAuth(req, res)) return;
    const body = await parseBody(req);
    const db = readDB();
    if (!db.faqs) db.faqs = [];
    const newFaq = {
      id: 'faq_' + Date.now(),
      question: body.question || '',
      answer: body.answer || '',
      order: db.faqs.length + 1
    };
    db.faqs.push(newFaq);
    writeDB(db);
    return sendJSON(res, 201, newFaq);
  }

  if (pathname.startsWith('/api/faqs/') && method === 'PUT') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/faqs/', '').trim();
    const body = await parseBody(req);
    const db = readDB();
    const idx = (db.faqs || []).findIndex(f => f.id === id);
    if (idx === -1) return sendJSON(res, 404, { error: 'FAQ not found' });
    db.faqs[idx] = { ...db.faqs[idx], ...body, id: id };
    writeDB(db);
    return sendJSON(res, 200, db.faqs[idx]);
  }

  if (pathname.startsWith('/api/faqs/') && method === 'DELETE') {
    if (!requireAuth(req, res)) return;
    const id = pathname.replace('/api/faqs/', '').trim();
    const db = readDB();
    db.faqs = (db.faqs || []).filter(f => f.id !== id);
    writeDB(db);
    return sendJSON(res, 200, { success: true });
  }

  // 7. Leads / Subscribers
  if (pathname === '/api/leads' && method === 'GET') {
    if (!requireAuth(req, res)) return;
    const db = readDB();
    return sendJSON(res, 200, db.leads || []);
  }

  if (pathname === '/api/leads' && method === 'POST') {
    const { email, name, source } = await parseBody(req);
    if (!email || !email.includes('@')) {
      return sendJSON(res, 400, { error: 'Valid email is required' });
    }
    const db = readDB();
    if (!db.leads) db.leads = [];
    
    const exists = db.leads.find(l => l.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return sendJSON(res, 200, { success: true, message: 'Already subscribed! Your download is ready.', lead: exists });
    }

    const newLead = {
      id: 'lead_' + Date.now(),
      email: email.trim().toLowerCase(),
      name: name || 'Parent/Teacher',
      source: source || 'Freebie Sample Pack',
      createdAt: new Date().toISOString()
    };
    db.leads.unshift(newLead);
    if (db.analytics) db.analytics.leadsCount = db.leads.length;
    writeDB(db);
    return sendJSON(res, 201, { success: true, message: 'Subscribed successfully!', lead: newLead });
  }

  if (pathname === '/api/leads/export-csv' && method === 'GET') {
    if (!requireAuth(req, res)) return;
    const db = readDB();
    const leads = db.leads || [];
    let csv = 'ID,Email,Name,Source,Created At\r\n';
    leads.forEach(l => {
      csv += `"${l.id}","${l.email}","${l.name || ''}","${l.source || ''}","${l.createdAt}"\r\n`;
    });
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=UTF-8',
      'Content-Disposition': 'attachment; filename="bright_sprout_leads_' + Date.now() + '.csv"'
    });
    return res.end(csv);
  }

  // 8. Site Settings
  if (pathname === '/api/settings' && method === 'GET') {
    const db = readDB();
    const safeSettings = { ...db.settings };
    if (safeSettings.auth) delete safeSettings.auth.adminPassword;
    return sendJSON(res, 200, safeSettings);
  }

  if (pathname === '/api/settings' && method === 'PUT') {
    if (!requireAuth(req, res)) return;
    const body = await parseBody(req);
    const db = readDB();
    db.settings = {
      ...db.settings,
      ...body,
      auth: db.settings.auth
    };
    writeDB(db);
    return sendJSON(res, 200, db.settings);
  }

  // 9. File Upload Endpoint
  if (pathname === '/api/upload' && method === 'POST') {
    if (!requireAuth(req, res)) return;
    const body = await parseBody(req);
    const { filename, data } = body;

    if (!data || !filename) {
      return sendJSON(res, 400, { error: 'Filename and base64 data are required' });
    }

    try {
      const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer;
      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(data, 'base64');
      }

      const cleanName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
      const ext = path.extname(cleanName) || '.jpg';
      const finalFileName = `${path.basename(cleanName, ext)}_${Date.now()}${ext}`;
      const filePath = path.join(UPLOADS_DIR, finalFileName);

      fs.writeFileSync(filePath, buffer);
      const fileUrl = `uploads/${finalFileName}`;

      return sendJSON(res, 200, {
        success: true,
        url: fileUrl,
        filename: finalFileName
      });
    } catch (err) {
      console.error('Upload error:', err);
      return sendJSON(res, 500, { error: 'Failed to save uploaded file: ' + err.message });
    }
  }

  // --------------------------------------------------------------------------
  // STATIC FILE SERVING
  // --------------------------------------------------------------------------

  if (pathname === '/admin' || pathname === '/admin/') {
    pathname = '/admin/index.html';
  } else if (pathname === '/admin/login' || pathname === '/admin/login/') {
    pathname = '/admin/login.html';
  } else if (pathname === '/') {
    pathname = '/index.html';
  }

  let filePath = path.join(__dirname, pathname);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      return res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

function startServer(portIndex = 0) {
  if (portIndex >= FALLBACK_PORTS.length) {
    console.error('❌ All fallback ports are occupied.');
    return;
  }
  const currentPort = FALLBACK_PORTS[portIndex];
  const instance = http.createServer(appHandler);

  instance.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`ℹ️ Port ${currentPort} is busy, checking port ${FALLBACK_PORTS[portIndex + 1]}...`);
      startServer(portIndex + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  instance.once('listening', () => {
    console.log(`=======================================================`);
    console.log(`🌱 Bright Sprout Studio Dynamic Server is Live!`);
    console.log(`🌐 Public Storefront: http://localhost:${currentPort}`);
    console.log(`🛠️ Admin Dashboard:  http://localhost:${currentPort}/admin`);
    console.log(`🔑 Default Admin:     admin / password123`);
    console.log(`=======================================================`);
  });

  instance.listen(currentPort);
}

startServer();

