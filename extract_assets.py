import os
import shutil
import pymupdf

desktop = r'C:\Users\tayyab\Desktop\mahnoor  canva'
out_dir = r'F:\work\workbook\assets\images\workbooks'
out_covers = os.path.join(out_dir, 'covers')
out_samples = os.path.join(out_dir, 'samples')
os.makedirs(out_covers, exist_ok=True)
os.makedirs(out_samples, exist_ok=True)

workbooks_map = [
    {
        'id': 'birds',
        'pdf_pattern': 'Birds Together',
        'folder_pattern': None,
        'title': "Let's Draw the Birds Together",
        'category': 'drawing',
        'category_name': 'Drawing & Creative Activities',
        'age': 'Ages 3–7',
        'total_pages': 17,
        'desc': 'Step-by-step bird illustration guides with friendly shapes, fun facts, and color exploration for young artists.'
    },
    {
        'id': 'sea_animals',
        'pdf_pattern': 'Sea Animals Together',
        'folder_pattern': 'Sea Animals',
        'title': "Let's Draw the Sea Animals Together",
        'category': 'drawing',
        'category_name': 'Drawing & Creative Activities',
        'age': 'Ages 3–7',
        'total_pages': 15,
        'desc': 'Captivating marine life drawing activities introducing ocean creatures through accessible, step-guided strokes.'
    },
    {
        'id': 'pets',
        'pdf_pattern': 'Pet Animals Together',
        'folder_pattern': 'Pets Coloring',
        'title': "Let's Draw the Pet Animals Together",
        'category': 'drawing',
        'category_name': 'Drawing & Creative Activities',
        'age': 'Ages 3–7',
        'total_pages': 14,
        'desc': 'A delightful collection of popular pets with intuitive line guides designed to encourage self-expression and motor control.'
    },
    {
        'id': 'body_parts',
        'pdf_pattern': 'Discover My Body',
        'folder_pattern': 'Parts of the Body',
        'title': "Let's Draw & Learn Body Parts Together",
        'category': 'early',
        'category_name': 'Body & Early Learning',
        'age': 'Ages 3–6',
        'total_pages': 19,
        'desc': 'Blends essential anatomical vocabulary with playful drawing exercises, enhancing self-awareness and body concept.'
    },
    {
        'id': 'build_a_face',
        'pdf_pattern': 'Make My Face',
        'folder_pattern': None,
        'title': "Build-a-Face / Who Am I? Build My Face",
        'category': 'motor',
        'category_name': 'Fine-Motor & Social-Emotional',
        'age': 'Ages 3–7',
        'total_pages': 20,
        'desc': 'Interactive cut-and-paste facial feature templates supporting spatial arrangement, scissor coordination, and emotional expressions.'
    },
    {
        'id': 'count_play_learn',
        'pdf_pattern': 'Count, Play & Learn',
        'folder_pattern': None,
        'title': 'Count, Play and Learn Numbers 1–10',
        'category': 'early',
        'category_name': 'Counting & Early Math',
        'age': 'Preschool & Kindergarten',
        'total_pages': 20,
        'desc': 'Bright, cheerful counting challenges, one-to-one correspondence tasks, and number tracing for preschool learners.'
    },
    {
        'id': 'abc_learning',
        'pdf_pattern': 'ABC Little Learner',
        'folder_pattern': None,
        'title': 'ABC Little Learner A–Z Activity Book',
        'category': 'early',
        'category_name': 'ABC & Alphabet Learning',
        'age': 'Preschool & Kindergarten',
        'total_pages': 27,
        'desc': 'Comprehensive A-to-Z workbook featuring uppercase and lowercase tracing, phonics illustrations, and letter identification games.'
    },
    {
        'id': 'fine_motor_tracing',
        'pdf_pattern': 'Fine Motor Skill Tracing',
        'folder_pattern': 'Line Tracing',
        'title': 'My First Fine Motor Skill Tracing Workbook',
        'category': 'motor',
        'category_name': 'Fine-Motor Skills',
        'age': 'Ages 2.5–6',
        'total_pages': 36,
        'desc': 'Graduated line tracing pathways (curves, waves, zig-zags, loops) designed to strengthen pencil grip and hand endurance.'
    },
    {
        'id': 'little_hearts',
        'pdf_pattern': 'Little Hearts, Big Feelings',
        'folder_pattern': None,
        'title': 'Little Hearts, Big Feelings: Emotional Learning',
        'category': 'speech',
        'category_name': 'Social-Emotional Learning',
        'age': 'Ages 3–7',
        'total_pages': 22,
        'desc': 'Feelings, emotions, and social-skills activities crafted by a Speech Therapist to help children identify and express emotions.'
    },
    {
        'id': 'little_explorer',
        'pdf_pattern': 'Little Explorer',
        'folder_pattern': 'Little Explorer',
        'title': 'My Curious World, Little Explorer Activity Workbook',
        'category': 'early',
        'category_name': 'Early Learning & Exploration',
        'age': 'Preschool & Kindergarten',
        'total_pages': 16,
        'desc': 'Exploration-focused preschool learning worksheets covering daily observations, spatial awareness, and creative thinking.'
    },
    {
        'id': 'jungle_animals',
        'pdf_pattern': None,
        'folder_pattern': 'Jungle Book Cover',
        'title': 'Wildlife & Jungle Animal Drawing Workbook',
        'category': 'drawing',
        'category_name': 'Animal Learning & Drawing',
        'age': 'Ages 4–8',
        'total_pages': 22,
        'desc': 'A vibrant collection of jungle beasts and safari animals with guided steps, habitat context, and fine-motor drawing paths.'
    },
    {
        'id': 'learning_colors',
        'pdf_pattern': None,
        'folder_pattern': 'Learning Colors',
        'title': 'Learning Colors & Creative Shapes Workbook',
        'category': 'early',
        'category_name': 'Early Preschool Learning',
        'age': 'Ages 2–5',
        'total_pages': 18,
        'desc': 'Visual recognition worksheets pairing basic color theory with playful illustration and sensory discovery.'
    }
]

print("Starting extraction of real images...")
pdf_files = [f for f in os.listdir(desktop) if f.endswith('.pdf')]
dirs = [d for d in os.listdir(desktop) if os.path.isdir(os.path.join(desktop, d))]

for wb in workbooks_map:
    wb_id = wb['id']
    pdf_match = None
    if wb['pdf_pattern']:
        for pf in pdf_files:
            if wb['pdf_pattern'].lower() in pf.lower():
                pdf_match = os.path.join(desktop, pf)
                break
    
    if pdf_match and os.path.exists(pdf_match):
        doc = pymupdf.open(pdf_match)
        print(f"[PDF] {wb['title']} ({len(doc)} pages)")
        
        # Save high quality Cover
        page0 = doc[0]
        pix = page0.get_pixmap(dpi=160)
        cover_path = os.path.join(out_covers, f"{wb_id}_cover.jpg")
        pix.save(cover_path)
        
        # Save standard filename as well
        std_name = os.path.join(out_dir, f"{wb_id.replace('_', '-')}.png")
        pix.save(std_name)
        
        # Extract 2-3 sample internal activity sheets
        sample_indices = []
        if len(doc) >= 4:
            sample_indices = [1, 2, min(4, len(doc)-1)]
        elif len(doc) > 1:
            sample_indices = list(range(1, len(doc)))
            
        for i, page_idx in enumerate(sample_indices):
            if page_idx < len(doc):
                spix = doc[page_idx].get_pixmap(dpi=140)
                sample_file = os.path.join(out_samples, f"{wb_id}_sample_{i+1}.jpg")
                spix.save(sample_file)
                print(f"   -> sample {i+1} saved")
    else:
        # Check folder pattern
        folder_match = None
        if wb['folder_pattern']:
            for d in dirs:
                if wb['folder_pattern'].lower() in d.lower():
                    folder_match = os.path.join(desktop, d)
                    break
        
        if folder_match and os.path.exists(folder_match):
            print(f"[FOLDER] {wb['title']} from {os.path.basename(folder_match)}")
            folder_imgs = sorted([f for f in os.listdir(folder_match) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
            if folder_imgs:
                # Cover is usually 1.png
                c_img = folder_imgs[0]
                src = os.path.join(folder_match, c_img)
                shutil.copy2(src, os.path.join(out_covers, f"{wb_id}_cover.jpg"))
                shutil.copy2(src, os.path.join(out_dir, f"{wb_id.replace('_', '-')}.png"))
                
                # Samples
                for i, s_img in enumerate(folder_imgs[1:4]):
                    shutil.copy2(os.path.join(folder_match, s_img), os.path.join(out_samples, f"{wb_id}_sample_{i+1}.jpg"))
                print(f"   -> copied {len(folder_imgs)} images")

print("All real images extracted and organized successfully!")
