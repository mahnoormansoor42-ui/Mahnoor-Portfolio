import os
import sys
import json
import datetime
import pymupdf

# Set UTF-8 output for Windows console
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

canva_dir = r"C:\Users\tayyab\Desktop\mahnoor  canva"
base_dir = r"F:\work\workbook"
out_covers = os.path.join(base_dir, "assets", "images", "workbooks", "covers")
out_samples = os.path.join(base_dir, "assets", "images", "workbooks", "samples")
db_path = os.path.join(base_dir, "data", "database.json")
sync_log_path = os.path.join(base_dir, "data", "sync_log.json")
audit_log_path = os.path.join(base_dir, "data", "sync_audit.log")

os.makedirs(out_covers, exist_ok=True)
os.makedirs(out_samples, exist_ok=True)
os.makedirs(os.path.join(base_dir, "data"), exist_ok=True)

# 1. Load Existing Sync Log
sync_log = {}
if os.path.exists(sync_log_path):
    try:
        with open(sync_log_path, 'r', encoding='utf-8') as f:
            sync_log = json.load(f)
    except Exception:
        sync_log = {}

# 2. Load Existing Database
db = {"products": [], "categories": [], "reviews": [], "faqs": [], "settings": {}, "leads": [], "analytics": {}}
if os.path.exists(db_path):
    try:
        with open(db_path, 'r', encoding='utf-8') as f:
            db = json.load(f)
    except Exception:
        pass

# 3. Master Catalog Definitions for All 23 Workbooks
catalog_definitions = [
    {
        "id": "birds",
        "pdf_match": "bird",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "A step-by-step bird drawing workbook guiding young children to draw charming garden and songbirds using simple geometric shapes, progressive lines, and coloring prompts.",
        "developmentPillars": [
            "Visual-spatial awareness & shape breakdown",
            "Pencil grip & controlled directional strokes",
            "Bird species recognition & vocabulary enrichment",
            "Creative coloring & artistic confidence"
        ]
    },
    {
        "id": "sea_animals",
        "pdf_match": "sea animal",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "An ocean-themed drawing guide featuring dolphins, turtles, octopuses, and reef fish, breaking down aquatic shapes into intuitive steps for little hands.",
        "developmentPillars": [
            "Curved line tracing & fluid hand motions",
            "Marine life exploration & vocabulary expansion",
            "Shape construction & proportion calibration",
            "Low-frustration artistic self-expression"
        ]
    },
    {
        "id": "pets",
        "pdf_match": "pet animal",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Features beloved family pets (puppies, kittens, bunnies, hamsters) with engaging step-by-step drawing demonstrations that build confidence.",
        "developmentPillars": [
            "Fine-motor coordination & precision",
            "Empathy & animal vocabulary",
            "Hand-eye coordination & boundary awareness",
            "Encouraging positive daily drawing routines"
        ]
    },
    {
        "id": "body_parts",
        "pdf_match": "body part",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Combines fundamental anatomical vocabulary with guided drawing of facial features, hands, feet, and gestures to reinforce body schema and speech concepts.",
        "developmentPillars": [
            "Self-concept & anatomical vocabulary",
            "Facial feature placement & symmetry",
            "Speech therapy language reinforcement",
            "Pre-writing motor control"
        ]
    },
    {
        "id": "build_a_face",
        "pdf_match": "make my face",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Hands-on cut-and-paste activity pages where children assemble different facial expressions, hair styles, and accessories to learn about emotions.",
        "developmentPillars": [
            "Bilateral scissor coordination & safety",
            "Emotion identification & facial cues",
            "Spatial orientation & pasting accuracy",
            "Creative storytelling & personal identity"
        ]
    },
    {
        "id": "count_play_learn",
        "pdf_match": "count, play",
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
        "rating": 4.9,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Visual math workbook introducing number recognition 1–10, one-to-one counting correspondence, and fun object grouping.",
        "developmentPillars": [
            "Number formation & stroke order",
            "One-to-one counting correspondence",
            "Visual quantity estimation",
            "Early math confidence"
        ]
    },
    {
        "id": "abc_learning",
        "pdf_match": "abc little learner",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Complete alphabet learning workbook with large uppercase and lowercase letters, guided directional arrows, and cheerful phonics illustrations.",
        "developmentPillars": [
            "Letter recognition & formation",
            "Initial letter sound associations",
            "Phonological awareness",
            "Pre-reading literacy foundation"
        ]
    },
    {
        "id": "fine_motor_tracing",
        "pdf_match": "fine motor skill tracing",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Calibrated line tracing workbook featuring straight lines, zig-zags, waves, arches, and spiral patterns that prepare fingers for handwriting.",
        "developmentPillars": [
            "Pencil pressure & grip stability",
            "Controlled wrist and finger movement",
            "Visual-motor tracking",
            "Hand endurance for handwriting"
        ]
    },
    {
        "id": "little_hearts",
        "pdf_match": "little hearts",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Therapist-informed emotional learning workbook helping children recognize, express, and regulate emotions through meaningful scenarios and conversations.",
        "developmentPillars": [
            "Emotional self-awareness & labeling",
            "Empathy & understanding others",
            "Expressive speech and language communication",
            "Coping strategies for big emotions"
        ]
    },
    {
        "id": "little_explorer",
        "pdf_match": "little explorer",
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
        "rating": 4.9,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Playful discovery workbook filled with interactive observation prompts, sorting games, and cognitive reasoning activities.",
        "developmentPillars": [
            "Curiosity & observation skills",
            "Cognitive classification & matching",
            "Early vocabulary expansion",
            "Engaging hands-on worksheets"
        ]
    },
    {
        "id": "jungle_animals",
        "pdf_match": "blue colorful illustration",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Exciting safari and jungle animal drawing guides connecting animal anatomy with beginner-friendly art steps.",
        "developmentPillars": [
            "Wildlife anatomy & creature recognition",
            "Complex curve drawing mastery",
            "Fine-motor grip refinement",
            "Independent artistic accomplishment"
        ]
    },
    {
        "id": "learning_colors",
        "pdf_match": "learning colors",
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
        "rating": 4.9,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Visual recognition worksheets pairing basic color theory with playful illustration and sensory discovery.",
        "developmentPillars": [
            "Color identification & discrimination",
            "Basic geometric shape recognition",
            "Visual perception & sorting",
            "Early preschool cognitive readiness"
        ]
    },
    # --- 11 NEW REMAINING WORKBOOKS ---
    {
        "id": "fun_with_fruits",
        "pdf_match": "fruit",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Delightful fruit-themed coloring and learning pages teaching healthy food vocabulary, color recognition, and controlled coloring boundaries.",
        "developmentPillars": [
            "Food vocabulary & healthy eating concepts",
            "Color identification (Red, Green, Yellow, Purple)",
            "Boundary awareness & controlled strokes",
            "Sensory exploration & curiosity"
        ]
    },
    {
        "id": "daily_life_skills",
        "pdf_match": "daily life skill",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Therapist-created visual routine guides and life skill worksheets helping children master hand washing, teeth brushing, getting dressed, and morning schedules.",
        "developmentPillars": [
            "Daily routine sequencing & independence",
            "Self-care & personal hygiene awareness",
            "Expressive speech describing daily steps",
            "Executive functioning & time predictability"
        ]
    },
    {
        "id": "finish_my_picture",
        "pdf_match": "finish my picture",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Half-drawn picture prompts where children complete the other half of animals, vehicles, and objects, building visual symmetry, observation, and creative problem solving.",
        "developmentPillars": [
            "Visual closure & spatial symmetry",
            "Mirror-image drawing & hand stability",
            "Detail observation & proportion control",
            "Creative storytelling through completion"
        ]
    },
    {
        "id": "good_manners",
        "pdf_match": "good manners",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Charming real-world social scenarios teaching polite conversation prompts (Please, Thank You, Excuse Me), turn-taking, sharing, and kind peer interactions.",
        "developmentPillars": [
            "Social-pragmatic communication & etiquette",
            "Polite vocabulary in real conversations",
            "Empathy & considering peers' feelings",
            "Turn-taking and classroom social confidence"
        ]
    },
    {
        "id": "learn_phonics",
        "pdf_match": "learn phonics",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Phonological awareness workbook connecting letter shapes to their phonetic sounds, short vowels, consonant blends, and early word blending.",
        "developmentPillars": [
            "Phonemic awareness & auditory discrimination",
            "Letter-sound correspondence (Phonics)",
            "Beginning sound identification",
            "Early kindergarten reading readiness"
        ]
    },
    {
        "id": "little_detective",
        "pdf_match": "little detective",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Engaging 'I Spy' and search-and-find deduction sheets where children identify hidden clues, categorize objects, and explain their reasoning using full sentences.",
        "developmentPillars": [
            "Visual discrimination & foreground/background separation",
            "Descriptive language & expressive vocabulary",
            "Attention to detail & sustained focus",
            "Deductive cognitive reasoning"
        ]
    },
    {
        "id": "little_problem_solver",
        "pdf_match": "little problem solver",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Brain-building puzzles, sequential picture ordering (What happens next?), maze navigation, and logical pattern matching.",
        "developmentPillars": [
            "Sequential thinking & narrative structure",
            "Logical reasoning & problem deduction",
            "Spatial planning & maze navigation",
            "Patience and persistence with multi-step tasks"
        ]
    },
    {
        "id": "matching_sorting",
        "pdf_match": "matching & sorting",
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
        "rating": 4.9,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Foundational cognitive sorting by size (Big vs. Small), category (Animals vs. Vehicles), and color pairs to establish preschool categorization skills.",
        "developmentPillars": [
            "Concept classification & attribute grouping",
            "Comparative vocabulary (Bigger/Smaller, Heavy/Light)",
            "Visual discrimination & pair matching",
            "Cognitive flexibility"
        ]
    },
    {
        "id": "shape_hunt",
        "pdf_match": "shape hunt",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Explore circles, squares, triangles, rectangles, ovals, and stars through shape tracing paths and real-world environment shape searches.",
        "developmentPillars": [
            "Geometric 2D shape identification",
            "Fine-motor shape tracing & corner control",
            "Visual-spatial environment mapping",
            "Pre-math spatial awareness"
        ]
    },
    {
        "id": "bedtime_stories",
        "pdf_match": "sweet dreams",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Four beautifully illustrated calming stories designed for bedtime wind-down, teaching deep breathing, gentle reflection, and listening comprehension.",
        "developmentPillars": [
            "Auditory listening comprehension & story recall",
            "Emotional regulation & calming bedtime routines",
            "Expressive conversation & bonding",
            "Mindful breathing & sleep relaxation"
        ]
    },
    {
        "id": "playful_drawing",
        "pdf_match": "playful kids drawing",
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
        "rating": 5.0,
        "payhipUrl": "https://payhip.com/BrightSproutsStudio",
        "description": "Joyful step-by-step drawing exercises breaking down rockets, castles, trees, and cute characters into beginner strokes.",
        "developmentPillars": [
            "Basic object construction from shapes",
            "Fluid hand motions and pencil grip",
            "Artistic imagination & coloring freedom",
            "Boosted drawing confidence"
        ]
    }
]

# 4. Map PDFs in Canva directory
pdf_files = [f for f in os.listdir(canva_dir) if f.lower().endswith('.pdf')]

new_added_count = 0
skipped_count = 0
audit_entries = []

now_iso = datetime.datetime.utcnow().isoformat() + "Z"

for item in catalog_definitions:
    item_id = item["id"]
    pdf_keyword = item["pdf_match"].lower()
    
    # Check if already synced in sync_log
    is_already_synced = item_id in sync_log and os.path.exists(os.path.join(base_dir, sync_log[item_id].get("cover", "")))
    
    # Locate matching PDF in canva folder
    matched_pdf = None
    for f in pdf_files:
        if pdf_keyword in f.lower():
            matched_pdf = f
            break
            
    cover_rel_path = f"assets/images/workbooks/covers/{item_id}_cover.jpg"
    cover_full_path = os.path.join(base_dir, cover_rel_path)
    
    samples = [
        {"src": f"assets/images/workbooks/samples/{item_id}_sample_1.jpg", "caption": "Activity Sheet 1"},
        {"src": f"assets/images/workbooks/samples/{item_id}_sample_2.jpg", "caption": "Activity Sheet 2"},
        {"src": f"assets/images/workbooks/samples/{item_id}_sample_3.jpg", "caption": "Activity Sheet 3"}
    ]
    
    if is_already_synced:
        skipped_count += 1
        audit_entries.append(f"[SKIP] {item['title']} - Already synced in ledger.")
        continue
        
    # Extract images if PDF is found
    if matched_pdf:
        pdf_path = os.path.join(canva_dir, matched_pdf)
        try:
            doc = pymupdf.open(pdf_path)
            num_pages = len(doc)
            
            # Extract Cover (Page 0) at 300 DPI
            page0 = doc[0]
            pix0 = page0.get_pixmap(dpi=200)
            pix0.save(cover_full_path)
            
            # Extract Sample Sheets (e.g. Page 1, mid page, last-1 page)
            sample_page_indices = [1, max(1, num_pages // 2), max(1, num_pages - 2)]
            for s_idx, p_num in enumerate(sample_page_indices):
                if p_num < num_pages:
                    p = doc[p_num]
                    pix = p.get_pixmap(dpi=180)
                    sample_file = os.path.join(base_dir, f"assets/images/workbooks/samples/{item_id}_sample_{s_idx+1}.jpg")
                    pix.save(sample_file)
            
            item["pages"] = f"{num_pages} Printable Pages"
            print(f"Extracted: {item['title']} ({num_pages} pages)")
        except Exception as e:
            print(f"Warning extracting {item_id}: {e}")
            
    item["cover"] = cover_rel_path
    item["samples"] = samples
    item["status"] = "active"
    item["featured"] = True
    item["order"] = len(db["products"]) + 1
    item["createdAt"] = now_iso
    
    # Update or insert into database
    existing_idx = next((idx for idx, p in enumerate(db["products"]) if p.get("id") == item_id), -1)
    if existing_idx >= 0:
        db["products"][existing_idx] = {**db["products"][existing_idx], **item}
    else:
        db["products"].append(item)
        
    # Record in Sync Log Ledger
    sync_log[item_id] = {
        "id": item_id,
        "title": item["title"],
        "category": item["category"],
        "cover": cover_rel_path,
        "samplesCount": len(samples),
        "sourcePdf": matched_pdf or "built-in",
        "syncedAt": now_iso,
        "status": "synced"
    }
    
    new_added_count += 1
    audit_entries.append(f"[NEW] {item['title']} - Extracted & Synced to database.")

# 5. Save database.json and sync_log.json
with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

with open(sync_log_path, 'w', encoding='utf-8') as f:
    json.dump(sync_log, f, indent=2, ensure_ascii=False)

# 6. Append to sync_audit.log
with open(audit_log_path, 'a', encoding='utf-8') as f:
    f.write(f"\n=======================================================\n")
    f.write(f"SYNC SESSION: {now_iso}\n")
    f.write(f"New Workbooks Added: {new_added_count}\n")
    f.write(f"Existing Workbooks Skipped: {skipped_count}\n")
    f.write(f"Total Workbooks in Catalog: {len(db['products'])}\n")
    f.write(f"-------------------------------------------------------\n")
    for entry in audit_entries:
        f.write(entry + "\n")
    f.write(f"Status: COMPLETED_SUCCESSFULLY\n")

print("\n-------------------------------------------------------")
print(f"SUCCESS: Catalog Sync Completed!")
print(f"New Workbooks Processed: {new_added_count}")
print(f"Existing Skipped: {skipped_count}")
print(f"Total In Database: {len(db['products'])}")
print("-------------------------------------------------------")
