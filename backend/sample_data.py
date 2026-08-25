"""
Pre-seeded high-fidelity textbook datasets for CBSE/NCERT subjects.
Provides rich chapter content, page numbers, sections, definitions, exercises, and examples
so the application is fully functional immediately upon launch.
"""

SAMPLE_BOOKS = [
    {
        "id": "book-sci-10",
        "title": "Science - Class 10",
        "subject": "Science",
        "grade": "Class 10",
        "board": "CBSE",
        "author": "NCERT",
        "academic_year": "2025-2026",
        "filename": "NCERT_Class_10_Science.pdf",
        "file_path": "sample_data/NCERT_Class_10_Science.pdf",
        "file_size_bytes": 14200000,
        "total_pages": 260,
        "cover_color": "emerald",
        "chapters": [
            {
                "id": "chap-sci-10-1",
                "chapter_number": 1,
                "title": "Chemical Reactions and Equations",
                "start_page": 1,
                "end_page": 18,
                "summary": "Covers chemical equations, balanced chemical equations, types of chemical reactions (combination, decomposition, displacement, double displacement), oxidation and reduction, corrosion and rancidity.",
                "sections": [
                    "1.1 Chemical Equations",
                    "1.2 Balanced Chemical Equations",
                    "1.3 Types of Chemical Reactions",
                    "1.3.1 Combination Reaction",
                    "1.3.2 Decomposition Reaction",
                    "1.3.3 Displacement Reaction",
                    "1.3.4 Double Displacement Reaction",
                    "1.4 Oxidation and Reduction",
                    "1.5 Corrosion and Rancidity"
                ]
            },
            {
                "id": "chap-sci-10-6",
                "chapter_number": 6,
                "title": "Life Processes",
                "start_page": 93,
                "end_page": 118,
                "summary": "Details the vital processes: Nutrition (Autotrophic & Heterotrophic, Photosynthesis, Human Alimentary Canal), Respiration (Aerobic & Anaerobic, ATP), Transportation (Human Heart, Blood vessels, Xylem & Phloem in plants), and Excretion (Nephrons, Urine formation, Dialysis).",
                "sections": [
                    "6.1 What are Life Processes?",
                    "6.2 Nutrition - Autotrophic & Heterotrophic",
                    "6.2.1 Photosynthesis and Stomata",
                    "6.2.2 Nutrition in Human Beings",
                    "6.3 Respiration - Aerobic and Anaerobic",
                    "6.4 Transportation in Human Beings and Plants",
                    "6.5 Excretion - Human Excretory System and Nephron"
                ]
            },
            {
                "id": "chap-sci-10-10",
                "chapter_number": 10,
                "title": "Light – Reflection and Refraction",
                "start_page": 160,
                "end_page": 189,
                "summary": "Explores spherical mirrors (concave and convex), mirror formula, magnification, refraction of light, Snell's law, refractive index, refraction by spherical lenses, lens formula, and power of a lens.",
                "sections": [
                    "10.1 Reflection of Light & Laws of Reflection",
                    "10.2 Spherical Mirrors and Image Formation",
                    "10.2.1 Mirror Formula and Magnification",
                    "10.3 Refraction of Light & Snell's Law",
                    "10.3.1 Refractive Index",
                    "10.3.2 Refraction by Spherical Lenses",
                    "10.3.3 Lens Formula, Magnification & Power of Lens"
                ]
            },
            {
                "id": "chap-sci-10-12",
                "chapter_number": 12,
                "title": "Electricity",
                "start_page": 199,
                "end_page": 222,
                "summary": "Covers electric current, electric potential and potential difference, Ohm's law, factors affecting resistance, resistivity, resistors in series and parallel, heating effect of electric current (Joule's law), and electric power.",
                "sections": [
                    "12.1 Electric Current and Circuit",
                    "12.2 Electric Potential and Potential Difference",
                    "12.3 Circuit Diagram",
                    "12.4 Ohm's Law and Resistance",
                    "12.5 Resistors in Series and Parallel",
                    "12.6 Heating Effect of Electric Current",
                    "12.7 Electric Power"
                ]
            }
        ]
    },
    {
        "id": "book-math-8",
        "title": "Mathematics - Class 8",
        "subject": "Mathematics",
        "grade": "Class 8",
        "board": "CBSE",
        "author": "NCERT",
        "academic_year": "2025-2026",
        "filename": "NCERT_Class_8_Mathematics.pdf",
        "file_path": "sample_data/NCERT_Class_8_Mathematics.pdf",
        "file_size_bytes": 11500000,
        "total_pages": 240,
        "cover_color": "blue",
        "chapters": [
            {
                "id": "chap-math-8-1",
                "chapter_number": 1,
                "title": "Rational Numbers",
                "start_page": 1,
                "end_page": 20,
                "summary": "Properties of rational numbers: closure, commutativity, associativity, the role of 0 and 1, additive inverse, reciprocal/multiplicative inverse, distributivity of multiplication over addition, and representation on a number line.",
                "sections": [
                    "1.1 Introduction to Rational Numbers",
                    "1.2 Properties of Rational Numbers",
                    "1.2.1 Closure and Commutativity",
                    "1.2.2 Associativity",
                    "1.2.3 The Role of Zero and One",
                    "1.2.4 Negative and Reciprocal of a Number",
                    "1.2.5 Distributivity of Multiplication",
                    "1.3 Rational Numbers between Two Rational Numbers"
                ]
            },
            {
                "id": "chap-math-8-2",
                "chapter_number": 2,
                "title": "Linear Equations in One Variable",
                "start_page": 21,
                "end_page": 38,
                "summary": "Solving linear equations with linear expressions on one side and numbers on the other, applications/word problems, solving equations having the variable on both sides, reducing equations to simpler form and linear form.",
                "sections": [
                    "2.1 Introduction to Algebraic Equations",
                    "2.2 Solving Equations with Linear Expressions on One Side",
                    "2.3 Some Applications (Word Problems on Ages, Numbers, Perimeter)",
                    "2.4 Solving Equations having the Variable on both Sides",
                    "2.5 Reducing Equations to Simpler Form"
                ]
            },
            {
                "id": "chap-math-8-3",
                "chapter_number": 3,
                "title": "Understanding Quadrilaterals",
                "start_page": 39,
                "end_page": 58,
                "summary": "Polygons, classification of polygons, convex and concave polygons, regular and irregular polygons, angle sum property, sum of the measures of the exterior angles of a polygon (360 degrees), types of quadrilaterals: trapezium, kite, parallelogram, rhombus, rectangle, square.",
                "sections": [
                    "3.1 Polygons and Classification",
                    "3.2 Angle Sum Property of Polygons",
                    "3.3 Sum of Exterior Angles of a Polygon",
                    "3.4 Kinds of Quadrilaterals: Trapezium, Kite, Parallelogram",
                    "3.5 Elements and Properties of a Parallelogram",
                    "3.6 Special Parallelograms: Rhombus, Rectangle, Square"
                ]
            },
            {
                "id": "chap-math-8-5",
                "chapter_number": 5,
                "title": "Square and Square Roots",
                "start_page": 89,
                "end_page": 110,
                "summary": "Properties of square numbers, Pythagorean triplets, finding square root through repeated subtraction, prime factorisation method, division method, square roots of decimals.",
                "sections": [
                    "5.1 Properties of Square Numbers",
                    "5.2 Some More Interesting Patterns",
                    "5.3 Finding Square of a Number & Pythagorean Triplets",
                    "5.4 Square Roots via Prime Factorisation",
                    "5.5 Square Roots by Division Method",
                    "5.6 Square Roots of Decimals"
                ]
            }
        ]
    }
]

# Detailed textbook passages for chunking and vector storage
SAMPLE_TEXTBOOK_CHUNKS = [
    # --- SCIENCE CLASS 10 - CHAPTER 1: CHEMICAL REACTIONS ---
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-1",
        "chapter_number": 1,
        "chapter_title": "Chemical Reactions and Equations",
        "page_number": 2,
        "section_name": "1.1 Chemical Equations",
        "content": "A chemical reaction can be represented by a chemical equation. Magnesium ribbon burns in oxygen with a dazzling white flame and changes into a white powder of magnesium oxide: 2Mg + O2 -> 2MgO. In any chemical reaction, the total mass of the elements present in the products has to be equal to the total mass of the elements present in the reactants. This is known as the Law of Conservation of Mass."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-1",
        "chapter_number": 1,
        "chapter_title": "Chemical Reactions and Equations",
        "page_number": 6,
        "section_name": "1.3.1 Combination Reaction",
        "content": "A reaction in which a single product is formed from two or more reactants is known as a combination reaction. Calcium oxide (quick lime, CaO) reacts vigorously with water to produce slaked lime (calcium hydroxide, Ca(OH)2), releasing a large amount of heat: CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat. A solution of slaked lime is used for white-washing walls. Calcium hydroxide reacts slowly with carbon dioxide in air to form a thin layer of calcium carbonate (CaCO3) on walls: Ca(OH)2 + CO2 -> CaCO3 + H2O."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-1",
        "chapter_number": 1,
        "chapter_title": "Chemical Reactions and Equations",
        "page_number": 8,
        "section_name": "1.3.2 Decomposition Reaction",
        "content": "When a single reactant breaks down into simpler products, this is a decomposition reaction. Heating ferrous sulphate crystals (FeSO4.7H2O): 2FeSO4(s) -> Fe2O3(s) + SO2(g) + SO3(g). Green color of ferrous sulphate changes to brownish-black and pungent smell of burning sulphur is observed. Decomposition of calcium carbonate into calcium oxide and carbon dioxide on heating is thermal decomposition: CaCO3 -> CaO + CO2. Silver chloride turns grey in sunlight due to decomposition of silver chloride into silver and chlorine: 2AgCl(s) -> 2Ag(s) + Cl2(g). This reaction is used in black and white photography."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-1",
        "chapter_number": 1,
        "chapter_title": "Chemical Reactions and Equations",
        "page_number": 11,
        "section_name": "1.3.3 Displacement & Double Displacement Reaction",
        "content": "When iron nail is dipped in copper sulphate solution, iron displaces copper: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s). The blue color of copper sulphate solution fades to light green. Double displacement reactions involve exchange of ions between reactants. Reaction between sodium sulphate and barium chloride: Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq). A white precipitate of barium sulphate (BaSO4) is formed."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-1",
        "chapter_number": 1,
        "chapter_title": "Chemical Reactions and Equations",
        "page_number": 13,
        "section_name": "1.4 Oxidation, Reduction, Corrosion and Rancidity",
        "content": "Oxidation is the gain of oxygen or loss of hydrogen. Reduction is the loss of oxygen or gain of hydrogen. In CuO + H2 -> Cu + H2O, copper oxide is reduced to copper and hydrogen is oxidized to water. Reactions where both occur simultaneously are redox reactions. Corrosion: Iron when exposed to moisture and air gets coated with reddish brown powder (rust, Fe2O3.xH2O). Silver develops a black coating of silver sulphide (Ag2S) and copper develops green coating of basic copper carbonate (CuCO3.Cu(OH)2). Rancidity: When fats and oils are oxidized, they become rancid and their smell and taste change. Antioxidants and flushing with nitrogen gas prevent rancidity."
    },

    # --- SCIENCE CLASS 10 - CHAPTER 6: LIFE PROCESSES ---
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-6",
        "chapter_number": 6,
        "chapter_title": "Life Processes",
        "page_number": 95,
        "section_name": "6.2.1 Photosynthesis and Stomata",
        "content": "Autotrophic nutrition is the process by which autotrophs take in carbon dioxide and water and convert them into carbohydrates in the presence of sunlight and chlorophyll: 6CO2 + 12H2O -> C6H12O6 + 6O2 + 6H2O. Events of photosynthesis: (i) Absorption of light energy by chlorophyll, (ii) Conversion of light energy to chemical energy and splitting of water molecules into hydrogen and oxygen, (iii) Reduction of carbon dioxide to carbohydrates. Desert plants take up CO2 at night and prepare an intermediate which is acted upon by energy absorbed by chlorophyll during daytime. Stomata are tiny pores present on the surface of leaves for massive gas exchange. The opening and closing of stomata is controlled by guard cells which swell when water flows into them."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-6",
        "chapter_number": 6,
        "chapter_title": "Life Processes",
        "page_number": 99,
        "section_name": "6.2.2 Nutrition in Human Beings",
        "content": "Saliva contains an enzyme called salivary amylase that breaks down starch which is a complex molecule to give simple sugar (maltose). In the stomach, gastric glands release hydrochloric acid, a protein-digesting enzyme called pepsin, and mucus. Mucus protects the inner lining of the stomach from the acid. Small intestine is the site of complete digestion of carbohydrates, proteins, and fats. Liver secretes bile juice which makes acidic food alkaline and emulsifies fats. Pancreas secretes pancreatic juice containing trypsin for digesting proteins and lipase for breaking down emulsified fats. The inner wall of the small intestine has numerous finger-like projections called villi which increase surface area for absorption."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-6",
        "chapter_number": 6,
        "chapter_title": "Life Processes",
        "page_number": 103,
        "section_name": "6.3 Respiration",
        "content": "The first step in cellular respiration is the breakdown of glucose (6-carbon) into pyruvate (3-carbon) in the cytoplasm. In the absence of oxygen (anaerobic, yeast), pyruvate is converted into ethanol and carbon dioxide (fermentation). In lack of oxygen (human muscle cells during vigorous exercise), pyruvate converts into lactic acid (3-carbon), causing cramps. In the presence of oxygen (aerobic, mitochondria), pyruvate breaks down into carbon dioxide, water, and 36-38 ATP molecules. ATP is the energy currency for most cellular processes. In human lungs, alveoli provide extensive surface for gas exchange. The respiratory pigment in humans is haemoglobin, which has a very high affinity for oxygen."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-6",
        "chapter_number": 6,
        "chapter_title": "Life Processes",
        "page_number": 110,
        "section_name": "6.4 Transportation & Excretion",
        "content": "Human heart is four-chambered to prevent mixing of oxygenated and deoxygenated blood. Double circulation involves systemic and pulmonary circulation. Blood pressure is measured with a sphygmomanometer (normal systolic 120 mm Hg, diastolic 80 mm Hg). Arteries carry blood away from the heart under high pressure; veins have valves to prevent backflow. In plants, Xylem transports water and minerals by transpiration pull and root pressure; Phloem transports products of photosynthesis (sucrose) using ATP (translocation). Human excretory system consists of a pair of kidneys, ureters, urinary bladder, and urethra. Nephron is the basic structural and functional unit of kidney. Bowman's capsule collects filtrate produced by glomerulus. Reabsorption of glucose, amino acids, salts and water takes place along the tubular part."
    },

    # --- SCIENCE CLASS 10 - CHAPTER 10: LIGHT ---
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-10",
        "chapter_number": 10,
        "chapter_title": "Light – Reflection and Refraction",
        "page_number": 164,
        "section_name": "10.2 Spherical Mirrors and Mirror Formula",
        "content": "Concave mirrors form real and inverted images for all positions except when the object is between Pole (P) and Focus (F), where it forms virtual and erect image behind mirror. Convex mirrors always form virtual, erect, and diminished images regardless of object distance, which is why convex mirrors are used as rear-view mirrors in vehicles. Mirror Formula: 1/v + 1/u = 1/f. Magnification m = height of image / height of object = -v/u. Sign convention: focal length of concave mirror is negative; focal length of convex mirror is positive. Object distance u is always negative."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-10",
        "chapter_number": 10,
        "chapter_title": "Light – Reflection and Refraction",
        "page_number": 172,
        "section_name": "10.3 Refraction of Light & Snell's Law",
        "content": "When light travels from rarer to denser medium, it bends towards the normal; when it travels from denser to rarer medium, it bends away from normal. Snell's Law of Refraction: The ratio of sine of angle of incidence to sine of angle of refraction is a constant for a given pair of media: sin(i) / sin(r) = n21 (Refractive index). Absolute refractive index n = speed of light in vacuum (c) / speed of light in medium (v). Speed of light in vacuum c = 3 x 10^8 m/s. Refractive index of water is 1.33, crown glass is 1.52, diamond is 2.42."
    },
    {
        "book_id": "book-sci-10",
        "book_title": "Science - Class 10",
        "chapter_id": "chap-sci-10-10",
        "chapter_number": 10,
        "chapter_title": "Light – Reflection and Refraction",
        "page_number": 182,
        "section_name": "10.3.3 Lens Formula and Power of Lens",
        "content": "Lens Formula: 1/v - 1/u = 1/f. Magnification produced by lens: m = h'/h = +v/u. Convex lens has positive focal length (converging lens), concave lens has negative focal length (diverging lens). Power of a lens (P) is the reciprocal of its focal length in metres: P = 1 / f(in meters). The SI unit of power of a lens is dioptre (D). 1 dioptre is the power of a lens of focal length 1 metre (1 D = 1 m^-1). Power of convex lens is positive, power of concave lens is negative. If multiple lenses are placed in contact, net power P = P1 + P2 + P3 + ..."
    },

    # --- MATHEMATICS CLASS 8 - CHAPTER 1: RATIONAL NUMBERS ---
    {
        "book_id": "book-math-8",
        "book_title": "Mathematics - Class 8",
        "chapter_id": "chap-math-8-1",
        "chapter_number": 1,
        "chapter_title": "Rational Numbers",
        "page_number": 4,
        "section_name": "1.2 Properties of Rational Numbers",
        "content": "A number that can be expressed in the form p/q where p and q are integers and q != 0 is called a rational number. Rational numbers are closed under addition, subtraction, and multiplication, but not closed under division (division by zero is undefined). Addition and multiplication are commutative for rational numbers: a + b = b + a, and a * b = b * a. Subtraction and division are NOT commutative. Associative property holds for addition and multiplication: (a + b) + c = a + (b + c), and (a * b) * c = a * (b * c)."
    },
    {
        "book_id": "book-math-8",
        "book_title": "Mathematics - Class 8",
        "chapter_id": "chap-math-8-1",
        "chapter_number": 1,
        "chapter_title": "Rational Numbers",
        "page_number": 12,
        "section_name": "1.2.3 Identities and Inverses",
        "content": "0 is the additive identity for rational numbers: a/b + 0 = 0 + a/b = a/b. 1 is the multiplicative identity for rational numbers: a/b * 1 = 1 * a/b = a/b. For rational number a/b, its additive inverse (negative) is -a/b such that a/b + (-a/b) = 0. The multiplicative inverse (reciprocal) of a non-zero rational number a/b is b/a such that (a/b) * (b/a) = 1. Note: 0 has no reciprocal. Distributive property of multiplication over addition: a(b + c) = ab + ac."
    },

    # --- MATHEMATICS CLASS 8 - CHAPTER 2: LINEAR EQUATIONS ---
    {
        "book_id": "book-math-8",
        "book_title": "Mathematics - Class 8",
        "chapter_id": "chap-math-8-2",
        "chapter_number": 2,
        "chapter_title": "Linear Equations in One Variable",
        "page_number": 24,
        "section_name": "2.2 Solving Linear Equations",
        "content": "An algebraic equation is an equality involving variables. A linear equation in one variable has the highest power of the variable as 1. Rules for solving: An operation applied to LHS must be applied to RHS. Transposing a term to the other side changes its sign (+ becomes -, * becomes /). Example: Solve 2x - 3 = 7. Solution: 2x = 7 + 3 => 2x = 10 => x = 5. Example 2: Solve 5x + 9 = 5 + 3x. Solution: 5x - 3x = 5 - 9 => 2x = -4 => x = -2."
    },
    {
        "book_id": "book-math-8",
        "book_title": "Mathematics - Class 8",
        "chapter_id": "chap-math-8-2",
        "chapter_number": 2,
        "chapter_title": "Linear Equations in One Variable",
        "page_number": 30,
        "section_name": "2.3 Applications of Linear Equations",
        "content": "Word Problem Rule: Express unknown quantity as variable x, translate conditions into an algebraic equation, solve for x. Problem: The perimeter of a rectangular swimming pool is 154 m. Its length is 2 m more than twice its breadth. Find length and breadth. Solution: Let breadth = b. Length = 2b + 2. Perimeter = 2(l + b) = 2(2b + 2 + b) = 2(3b + 2) = 6b + 4. Equation: 6b + 4 = 154 => 6b = 150 => b = 25 m. Length = 2(25) + 2 = 52 m. Problem 2 (Ages): Sahil's mother's present age is 3 times Sahil's present age. After 5 years their ages will add to 66 years. Let Sahil's age = x, Mother's age = 3x. After 5 yrs: (x + 5) + (3x + 5) = 66 => 4x + 10 = 66 => 4x = 56 => x = 14. Sahil is 14 years old, mother is 42 years old."
    },

    # --- MATHEMATICS CLASS 8 - CHAPTER 3: UNDERSTANDING QUADRILATERALS ---
    {
        "book_id": "book-math-8",
        "book_title": "Mathematics - Class 8",
        "chapter_id": "chap-math-8-3",
        "chapter_number": 3,
        "chapter_title": "Understanding Quadrilaterals",
        "page_number": 42,
        "section_name": "3.2 Angle Sum Property of Polygons",
        "content": "A polygon is a simple closed curve made up of only line segments. A polygon is convex if no line segment connecting two points in its interior goes outside. A regular polygon is both equiangular and equilateral. Angle sum of a polygon with n sides is given by: (n - 2) * 180 degrees. For a triangle (n=3): (3-2)*180 = 180 deg. For a quadrilateral (n=4): (4-2)*180 = 360 deg. The sum of the measures of the exterior angles of ANY convex polygon is ALWAYS 360 degrees. For a regular polygon of n sides, measure of each exterior angle = 360 / n, and each interior angle = 180 - (360 / n)."
    },
    {
        "book_id": "book-math-8",
        "book_title": "Mathematics - Class 8",
        "chapter_id": "chap-math-8-3",
        "chapter_number": 3,
        "chapter_title": "Understanding Quadrilaterals",
        "page_number": 50,
        "section_name": "3.5 Properties of Parallelograms and Special Quadrilaterals",
        "content": "A parallelogram is a quadrilateral whose opposite sides are parallel. Properties of Parallelogram: (1) Opposite sides are equal (AB = CD, BC = DA), (2) Opposite angles are equal (angle A = angle C, angle B = angle D), (3) Adjacent angles are supplementary (angle A + angle B = 180 degrees), (4) Diagonals bisect each other. Special Parallelograms: (A) Rhombus: A parallelogram with sides of equal length. Diagonals of a rhombus are perpendicular bisectors of one another. (B) Rectangle: A parallelogram with a right angle. Diagonals of a rectangle are equal in length and bisect each other. (C) Square: A rectangle with equal sides. Diagonals of a square are equal and perpendicular bisectors of each other."
    }
]

# Standard Paper Format Templates
SAMPLE_FORMAT_TEMPLATES = [
    {
        "id": "format-cbse-50-midterm",
        "name": "CBSE Standard Mid-Term (50 Marks)",
        "description": "Balanced 50-mark pattern with MCQs, Short Answers, Long Answers, and Case Studies.",
        "subject": "All Subjects",
        "grade": "Classes 8-10",
        "total_marks": 50,
        "duration_minutes": 120,
        "is_template": True,
        "instructions": [
            "This question paper consists of 4 sections: A, B, C, and D.",
            "Section A contains 10 Multiple Choice Questions carrying 1 mark each.",
            "Section B contains 5 Short Answer Questions carrying 2 marks each.",
            "Section C contains 5 Long Answer Questions carrying 3 marks each.",
            "Section D contains 3 Case Study / Competency Questions carrying 5 marks each.",
            "All questions are compulsory. Internal choice is provided in designated questions."
        ],
        "sections": [
            {
                "id": "sec-a",
                "name": "Section A",
                "title": "Multiple Choice Questions",
                "question_count": 10,
                "marks_per_question": 1,
                "total_marks": 10,
                "question_type": "MCQ",
                "internal_choices_count": 0,
                "instructions": "Choose the correct option from the given alternatives."
            },
            {
                "id": "sec-b",
                "name": "Section B",
                "title": "Short Answer Type I",
                "question_count": 5,
                "marks_per_question": 2,
                "total_marks": 10,
                "question_type": "Short Answer",
                "internal_choices_count": 1,
                "instructions": "Answer concisely in 30-50 words."
            },
            {
                "id": "sec-c",
                "name": "Section C",
                "title": "Short Answer Type II / Long Answer",
                "question_count": 5,
                "marks_per_question": 3,
                "total_marks": 15,
                "question_type": "Long Answer",
                "internal_choices_count": 2,
                "instructions": "Answer in 50-80 words with necessary steps or diagrams."
            },
            {
                "id": "sec-d",
                "name": "Section D",
                "title": "Case Study & Competency Based",
                "question_count": 3,
                "marks_per_question": 5,
                "total_marks": 15,
                "question_type": "Case Study",
                "internal_choices_count": 1,
                "instructions": "Read the context carefully and answer the structured sub-parts."
            }
        ]
    },
    {
        "id": "format-cbse-80-board",
        "name": "CBSE Board Examination Pattern (80 Marks)",
        "description": "Official 5-Section Board blueprint with 80 total marks.",
        "subject": "All Subjects",
        "grade": "Class 10",
        "total_marks": 80,
        "duration_minutes": 180,
        "is_template": True,
        "instructions": [
            "Section A contains 20 Multiple Choice Questions of 1 mark each.",
            "Section B contains 6 Very Short Answer questions of 2 marks each.",
            "Section C contains 7 Short Answer questions of 3 marks each.",
            "Section D contains 3 Long Answer questions of 5 marks each.",
            "Section E contains 3 Source-based / Case-based units of assessment of 4 marks each."
        ],
        "sections": [
            {
                "id": "sec-board-a",
                "name": "Section A",
                "title": "Objective & MCQ",
                "question_count": 20,
                "marks_per_question": 1,
                "total_marks": 20,
                "question_type": "MCQ",
                "internal_choices_count": 0,
                "instructions": "Select the correct option."
            },
            {
                "id": "sec-board-b",
                "name": "Section B",
                "title": "Very Short Answer",
                "question_count": 6,
                "marks_per_question": 2,
                "total_marks": 12,
                "question_type": "Very Short Answer",
                "internal_choices_count": 2,
                "instructions": "Answer in 30-50 words."
            },
            {
                "id": "sec-board-c",
                "name": "Section C",
                "title": "Short Answer",
                "question_count": 7,
                "marks_per_question": 3,
                "total_marks": 21,
                "question_type": "Short Answer",
                "internal_choices_count": 2,
                "instructions": "Answer in 50-80 words."
            },
            {
                "id": "sec-board-d",
                "name": "Section D",
                "title": "Long Answer",
                "question_count": 3,
                "marks_per_question": 5,
                "total_marks": 15,
                "question_type": "Long Answer",
                "internal_choices_count": 2,
                "instructions": "Answer in 80-120 words."
            },
            {
                "id": "sec-board-e",
                "name": "Section E",
                "title": "Case Study / Competency Based",
                "question_count": 3,
                "marks_per_question": 4,
                "total_marks": 12,
                "question_type": "Case Study",
                "internal_choices_count": 1,
                "instructions": "Case-based integrated questions."
            }
        ]
    },
    {
        "id": "format-unit-test-25",
        "name": "Periodic Unit Assessment (25 Marks)",
        "description": "Compact unit test structure for single or double chapter evaluations.",
        "subject": "All Subjects",
        "grade": "All Classes",
        "total_marks": 25,
        "duration_minutes": 45,
        "is_template": True,
        "instructions": [
            "Section A: 5 MCQs of 1 mark each.",
            "Section B: 4 Short Answer questions of 2 marks each.",
            "Section C: 4 Analytical questions of 3 marks each."
        ],
        "sections": [
            {
                "id": "sec-ut-a",
                "name": "Section A",
                "title": "Objective Type",
                "question_count": 5,
                "marks_per_question": 1,
                "total_marks": 5,
                "question_type": "MCQ",
                "internal_choices_count": 0,
                "instructions": "Choose the most appropriate option."
            },
            {
                "id": "sec-ut-b",
                "name": "Section B",
                "title": "Short Concepts",
                "question_count": 4,
                "marks_per_question": 2,
                "total_marks": 8,
                "question_type": "Short Answer",
                "internal_choices_count": 1,
                "instructions": "Brief answers."
            },
            {
                "id": "sec-ut-c",
                "name": "Section C",
                "title": "Problem Solving & Numericals",
                "question_count": 4,
                "marks_per_question": 3,
                "total_marks": 12,
                "question_type": "Numerical",
                "internal_choices_count": 1,
                "instructions": "Show complete calculations and formula."
            }
        ]
    }
]
