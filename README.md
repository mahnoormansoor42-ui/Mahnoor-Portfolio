# 🌱 Bright Sprout Studio — Digital Designer Portfolio

> **Children’s Educational & Creative Printables**  
> Created by **Mahnoor Mansoor** (Speech-Language Pathologist, 9+ Years Clinical Experience)  
> Store: [https://payhip.com/BrightSproutsStudio](https://payhip.com/BrightSproutsStudio)  
> Email: `mahnoormansoor42@gmail.com`

---

## 📖 Overview

This is the official digital designer portfolio website for **Bright Sprout Studio**, crafted specifically for submission to **Creative Fabrica**, client presentations, and public web hosting on **GitHub Pages**.

It features a 6-page/section presentation highlighting early childhood educational printables, speech-informed learning resources, fine-motor drawing workbooks, and core brand values.

---

## ✨ Key Features

1. **6-Section Structure**:
   - **Page 1 — Cover**: Branded hero presentation with creator credentials and quick navigation.
   - **Page 2 — About the Designer**: Mahnoor's clinical speech-language therapy background and 9+ years experience.
   - **Page 3 — What I Create**: 10 distinct developmental product categories with crisp descriptions.
   - **Page 4 — Selected Workbook Collection**: 8 featured workbooks with interactive filters and preview dialogs.
   - **Page 5 — My Design Approach**: Core educational pillars and target audience breakdown.
   - **Page 6 — Contact & Online Store**: Direct email, Payhip store integration, and closing brand statement.
2. **Interactive Workbook Showcase**: Filter by category (Drawing & Art, Early Learning, Fine Motor & Speech) and inspect detailed developmental skills per workbook.
3. **1-Click 6-Page PDF Export**: Click the **PDF Export** button in the header (or press `Ctrl + P`) to generate a clean 6-page presentation PDF formatted for Creative Fabrica reviewer submissions.
4. **100% Authentic Drop-in Cover System**: No AI-fabricated covers. Features modular slots ready for real workbook cover screenshots.
5. **Zero External Build Dependencies**: Pure HTML5, CSS3, and modern Vanilla JavaScript. Super fast, zero build step required.

---

## 🖼️ How to Add Real Workbook Covers

To display your actual workbook covers, place your image files into `assets/images/workbooks/` with the corresponding filenames:

| Workbook Title | Image Filename |
| :--- | :--- |
| **Let's Draw the Birds Together** | `assets/images/workbooks/birds.png` |
| **Let's Draw the Sea Animals Together** | `assets/images/workbooks/sea-animals.png` |
| **Let's Draw the Pet Animals Together** | `assets/images/workbooks/pets.png` |
| **Let's Draw & Learn Body Parts Together** | `assets/images/workbooks/body-parts.png` |
| **Build-a-Face / Who Am I? Build My Face** | `assets/images/workbooks/build-a-face.png` |
| **Count, Play and Learn** | `assets/images/workbooks/count-play-learn.png` |
| **ABC Learning** | `assets/images/workbooks/abc-learning.png` |
| **Fine Motor Skills Tracing Workbook** | `assets/images/workbooks/fine-motor-tracing.png` |

*(Supported formats: `.png` or `.jpg`. If an image is not present yet, the site gracefully falls back to a clean, branded pastel template).*

---

## 🚀 How to Launch on GitHub Pages (Step-by-Step)

### Step 1: Create a new repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `bright-sprout-portfolio` or `mahnoor-portfolio`).
3. Set visibility to **Public**.
4. Click **Create repository** (do not check initialize with README since we already have one).

### Step 2: Push your code to GitHub
Run the following commands in your terminal inside `F:\work\workbook`:

```bash
# 1. Initialize git (already initialized)
git init

# 2. Add all files
git add .

# 3. Commit the portfolio
git commit -m "Initial commit of Bright Sprout Studio Portfolio"

# 4. Set main branch
git branch -M main

# 5. Link your GitHub repository (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# 6. Push code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages (Free Hosting)
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top right).
3. In the left sidebar, click **Pages** (under Code and automation).
4. Under **Build and deployment > Source**, select **Deploy from a branch**.
5. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
6. In 1–2 minutes, GitHub will publish your live website at:
   `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## 📄 License & Credits
© 2026 **Bright Sprout Studio**. All rights reserved.  
Designed for **Mahnoor Mansoor**.
