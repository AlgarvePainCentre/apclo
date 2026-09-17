/*
 * Demo datasets for the uniform speciality template preview.
 * headPain = the "lean" condition; lumbarSpine = the "content-rich" condition.
 * Both feed the SAME view — the template flexes to how much each slot holds.
 * Slots: discipline, title, heroImage, heroSubtitle, overview[], patterns[],
 *        treatments[], guidance[] (small aside) | tips[] (numbered grid),
 *        story, citations[]
 */

export const headPainData = {
  discipline: 'Pain Medicine',
  category: 'pain-medicine',
  title: 'Head pain',
  areaLabel: 'head pain',
  heroImage: '/assets/images/Hero/HeadPain.webp',
  heroSubtitle:
    'Headache and facial pain syndromes can be disabling — but many respond well to targeted diagnosis and treatment.',
  // §5 When to seek help (canonical, universal safety slot)
  seekHelp: [
    'Seek urgent care for a sudden, severe “worst-ever” (thunderclap) headache that peaks within seconds to minutes.',
    'Seek urgent care for headache with fever, neck stiffness, rash, confusion, or a first seizure.',
    'Seek prompt assessment for new neurological symptoms: weakness, numbness, vision loss, difficulty speaking or walking.',
    'Book an assessment when headaches become more frequent or severe, wake you at night, or stop responding to usual measures.',
    'Review acute medication use — pain relief on most days can worsen headaches (medication-overuse).',
  ],
  overview: [
    'Head pain can include migraine, tension-type headache, cluster headache and other primary headache disorders. It may also be secondary to conditions affecting the neck, jaw, sinuses or nerves.',
    'We focus on the pattern: onset, frequency, triggers, associated symptoms and any red flags. This helps match you to the most appropriate evidence-based pathway.',
    'Treatment may include lifestyle and trigger strategies, acute and preventive medicines when indicated, rehabilitation for cervicogenic contributors, and targeted procedures for selected headache syndromes.',
  ],
  patterns: [
    { id: 'migraine', label: 'Migraine-type headache', description: 'Moderate to severe headache often with nausea, sensitivity to light or sound, and activity intolerance. We consider acute and preventive strategies based on frequency and disability.' },
    { id: 'tension', label: 'Tension-type headache', description: 'A pressure or tight-band sensation often linked to stress, sleep and posture. Management commonly includes education, stress/sleep strategies and rehabilitation.' },
    { id: 'cluster', label: 'Cluster-type headache', description: 'Severe one-sided attacks often around the eye, sometimes with tearing or nasal symptoms. Prompt recognition matches acute and preventive treatment.' },
    { id: 'neck-related', label: 'Neck-related headache features', description: 'Headache that overlaps with neck pain or stiffness may suggest a cervicogenic contribution. Careful assessment guides appropriate rehabilitation or interventions.' },
  ],
  // Symptoms & diagnosis — headache is common (≈47% global prevalence).
  symptoms: [
    'Head pain is one of the most common health problems, with a global prevalence of around 47% (symptoms occurring at least once in the past year). Presentations range from occasional tension-type headache to disabling migraine and cluster attacks.',
    'Symptoms depend on the underlying type and can include throbbing or pressing pain, one-sided attacks, nausea, sensitivity to light or sound, tearing or nasal congestion, and overlap with neck pain or stiffness.',
    'Diagnosis focuses on the pattern — onset, frequency, triggers, associated symptoms and any red flags. We align assessment with ICHD-3 criteria, screen for medication-overuse headache, and use imaging when warning signs are present.',
  ],
  // Named syndromes (text-only — no dedicated imagery, so the cards adapt).
  syndromes: [
    { name: 'Cluster headache', copy: ['Severe, one-sided headache attacks with autonomic symptoms such as tearing or nasal congestion, often occurring in clusters over weeks.'] },
    { name: 'Tension headache', copy: ['A common pattern often described as a pressing or tightening sensation, sometimes associated with stress, sleep and muscle tension.'] },
    { name: 'Paroxysmal hemicrania', copy: ['Short, frequent, one-sided attacks that can respond strongly to specific anti-inflammatory medication under medical supervision.'] },
    { name: 'Short-lasting unilateral neuralgiform attacks (SUNHA)', copy: ['Brief, sharp attacks of head pain with prominent autonomic features. Care focuses on confirming the diagnosis and choosing the right treatment plan.'] },
  ],
  treatments: [
    { name: 'Botulinum toxin injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/botulin-toxin-injection', img: '/assets/images/Hero/BotulinToxinInjection.webp' },
    { name: 'Peripheral nerve block', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/peripheral-nerve-block', img: '/assets/images/Hero/PeripheralNerveBlocks.webp' },
    { name: 'Radiofrequency', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/radiofrequency', img: '/assets/images/Hero/RadiofrequencyAblation.webp' },
    { name: 'Pharmacological pain management', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/pharmacological-pain-management', img: '/assets/images/Hero/PharmacologicalPainManagement.webp' },
    { name: 'Physiotherapy', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/physiotherapy', img: '/assets/images/Hero/Physiotherapy.webp' },
    { name: 'Psychology', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/psychology', img: '/assets/images/Hero/Psychology.webp' },
  ],
  story: {
    quote: 'After years of frequent migraines, a clear plan finally gave me control back. I know what to do and the attacks are far less frequent.',
    name: 'Patient story',
    detail: 'Chronic migraine · Pain Medicine',
  },
  help: {
    paragraphs: [
      'Recurrent or severe head pain deserves a clear diagnosis and a plan, not just short-term relief. The right pathway depends on the type of headache, how often it occurs and how much it affects your life.',
      'Early, structured care helps reduce attack frequency, avoid medication-overuse headache, and get you back to work, sport and sleep.',
    ],
    patient: [
      'Keep a simple headache diary for 2–4 weeks (frequency, duration, triggers and medication use) — it improves diagnostic accuracy.',
      'Seek urgent care for a “worst-ever” or sudden thunderclap headache, new neurological symptoms, or headache with fever and neck stiffness.',
    ],
    clinician: [
      'We align diagnosis with ICHD-3 patterns and prioritise medication-overuse screening, red flags and coordinated preventive strategies.',
      'Referral notes with frequency, disability, acute medication use and prior preventive trials help streamline care.',
    ],
  },
  citations: [
    { label: 'IHS — International Classification of Headache Disorders (ICHD-3)', url: 'https://ichd-3.org/' },
    { label: 'NICE — Headaches in over 12s (CG150)', url: 'https://www.nice.org.uk/guidance/cg150' },
  ],
};

export const lumbarSpineData = {
  discipline: 'Pain Medicine',
  category: 'pain-medicine',
  title: 'Lumbar spine pain',
  areaLabel: 'lumbar spine pain',
  heroImage: '/assets/images/Hero/LumbarSpinePain.webp',
  heroSubtitle:
    'Low back pain is one of the most common pain syndromes — a structured, personalised plan helps most people return to daily life.',
  seekHelp: [
    'Seek urgent care for loss of bladder or bowel control, numbness around the groin/inner thighs, or new leg weakness (possible cauda equina — an emergency).',
    'Seek prompt assessment for leg pain, numbness or tingling below the knee that is worsening.',
    'Get reviewed if back pain follows a significant injury, or comes with fever, unexplained weight loss or night pain.',
    'Book an assessment when pain limits walking, work or sleep despite a few weeks of simple measures.',
  ],
  overview: [
    'Lumbar spine pain refers to pain felt in the lower back, in the area of the lumbar vertebrae.',
    'The lumbar region is the lower portion of the spine — five vertebrae that support the weight of the upper body and provide flexibility and range of motion for the lower body.',
    'Chronic low back pain is one of the most common pain syndromes and represents an important burden and cost generator for society.',
  ],
  patterns: [
    { id: 'mechanical', label: 'Mechanical back pain', description: 'Pain that changes with posture or movement (bending, lifting, prolonged sitting). Often improves with graded activity and strengthening.' },
    { id: 'sciatica', label: 'Leg pain or sciatica-type symptoms', description: 'Pain, tingling or numbness that travels into the leg may suggest nerve involvement. We assess neurological signs and red flags before deciding on treatment.' },
    { id: 'stiffness', label: 'Morning stiffness and reduced mobility', description: 'Stiffness after rest or first movements of the day that eases with activity. Treatment focuses on mobility, pacing and tailored exercise.' },
    { id: 'persistent', label: 'Persistent pain with flare-ups', description: 'Longer-lasting pain influenced by workload, sleep and stress. A structured plan aims to reduce flare-up frequency and restore function.' },
  ],
  // Optional slot: symptoms & diagnosis (from the original page — good for SEO).
  symptoms: [
    'Symptoms of lumbar spine pain can vary widely depending on the underlying cause and may include localized pain in the lower back, as well as radiating pain, numbness, or tingling sensations in the legs or feet.',
    'It can be caused by injury, poor posture, arthritis or degenerative disc disease. Some cases are acute and resolve with rest and conservative treatment; others are chronic and require more active intervention.',
    'Diagnostic tests may include X-rays, CT scans, MRIs and nerve conduction studies to identify the underlying cause and guide treatment decisions.',
  ],
  // Optional slot: named syndromes with imagery + a learn link.
  syndromes: [
    { name: 'Radicular pain', img: '/assets/images/lumbar-cards/RadicularPain.webp', to: '/resources/learn/cervical-pain', copy: ['Pain that results from irritation of a nerve root. Symptoms differ from person to person and can include pain, pins and needles, numbness, muscle weakness or altered sensations.', 'Nerve pain is usually burning in nature and normally spreads below the knee or elbow in the affected limb. Nerve pain and back pain are often present at the same time.'] },
    { name: 'Facet joint syndrome', img: '/assets/images/lumbar-cards/FacetJointSyndrome.webp', copy: ['Lumbar facet joints are a common — and often misdiagnosed — source of pain, with facet osteoarthritis the most frequent form.', '“Pseudo-radicular” pain typically radiates to the buttock, trochanteric region, groin and thighs, ending above the knee, without neurological deficits.'] },
    { name: 'Sacroiliac joint pain', img: '/assets/images/lumbar-cards/SacroiliacJointPain.webp', copy: ['Gluteal pain near the posterior superior iliac spine is the most common presentation, sometimes with groin pain, pain radiating into the leg, numbness or clicking in the posterior pelvis.', 'Pain or clicking with transitional activities — getting up from a chair or in and out of a car — may also be noted.'] },
    { name: 'Lumbar spinal stenosis', img: '/assets/images/lumbar-cards/LumbarSpinalStenosis.webp', copy: ['Anatomical narrowing of the spinal canal, associated with a range of clinical symptoms that often (but not always) include neurological features.', 'Typically unilateral or bilateral back and leg pain that develops slowly and persists over months or years, frequently in a pseudo-radicular pattern.'] },
    { name: 'Discogenic pain', img: '/assets/images/lumbar-cards/DiscogenicPain.webp', copy: ['Shares clinical signs with lumbosacral radicular pain; no single feature in the history confirms or excludes it.', 'More typical features include persistent low back, groin and/or leg pain that worsens with axial loading and improves when lying down.'] },
  ],
  // Content-rich: the real curated intervention list (grid simply scales).
  treatments: [
    { name: 'Radiofrequency', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/radiofrequency', img: '/assets/images/Hero/RadiofrequencyAblation.webp' },
    { name: 'Cryoablation', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/cryoablation', img: '/assets/images/Hero/Cryoablation.webp' },
    { name: 'Corticosteroid injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection', img: '/assets/images/Hero/Intra-ArticularCorticosteroidInjections.webp' },
    { name: 'Platelet-rich plasma', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection', img: '/assets/images/Hero/Platelet-RichPlasmaInjections.webp' },
    { name: 'Peripheral nerve block', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/peripheral-nerve-block', img: '/assets/images/Hero/PeripheralNerveBlocks.webp' },
    { name: 'Nucleoplasty', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/nucleoplasty', img: '/assets/images/Hero/Nucleoplasty.webp' },
    { name: 'Hydrodistention', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/hydrodistention', img: '/assets/images/Hero/Hydrodistention.webp' },
    { name: 'Calcification barbotage', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/calcification-barbotage', img: '/assets/images/Hero/CalcificationBarbotage.webp' },
    { name: 'Botulinum toxin injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/botulin-toxin-injection', img: '/assets/images/Hero/BotulinToxinInjection.webp' },
    { name: 'Pharmacological management', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/pharmacological-pain-management', img: '/assets/images/Hero/PharmacologicalPainManagement.webp' },
  ],
  // Many tips → the self-care slot renders as a full numbered grid instead of a small aside.
  tips: [
    { title: 'Practice good posture', body: 'Keep a neutral spine when sitting or standing. Avoid slouching and long periods in one position.' },
    { title: 'Exercise regularly', body: 'Build strength and mobility with low-impact activity such as walking, swimming or cycling.' },
    { title: 'Maintain a healthy weight', body: 'Reducing excess load on the spine can ease symptoms and support long-term joint health.' },
    { title: 'Use proper lifting techniques', body: 'Bend at the hips and knees, keep the load close, and avoid twisting when lifting.' },
    { title: 'Take breaks from sitting', body: 'Stand up, stretch and move every 30–60 minutes to reduce stiffness and pressure.' },
    { title: 'Practice stress reduction', body: 'Sleep, breathing and relaxation techniques can reduce muscle tension and improve recovery.' },
  ],
  story: {
    quote: 'I went from barely getting out of bed to walking every morning. The plan was clear and every step was explained.',
    name: 'Patient story',
    detail: 'Chronic low back pain · Pain Medicine',
  },
  // Optional slot: "Let us help you" + for patients / for clinicians.
  help: {
    paragraphs: [
      'If you’re experiencing lumbar spine pain, consulting a healthcare provider is essential. It may signal underlying issues such as herniated discs, spinal stenosis or spondylolisthesis, which can lead to nerve damage if left untreated. Early intervention helps prevent long-term complications.',
      'Lumbar pain can also affect daily activities like walking or sitting and interfere with work and recreation. Timely treatment relieves pain, restores function and helps stop the condition becoming chronic.',
    ],
    patient: [
      'Bring your medication list and any imaging reports to appointments.',
      'Tell us your priorities so we can tailor the plan around what matters to you.',
    ],
    clinician: [
      'Our approach integrates guideline-informed care and shared decision-making.',
      'Please contact us to discuss complex cases and referral pathways.',
    ],
  },
  citations: [
    { label: 'NICE — Low back pain and sciatica in over 16s (NG59)', url: 'https://www.nice.org.uk/guidance/ng59' },
  ],
};

// SPORTS "service" page — shows the canonical serving a non-condition page via
// flexible headings ("What we assess" / "What we help you prevent") and text
// approaches (no image treatment cards). Content per the canonical doc (B2).
export const injuryPreventionData = {
  discipline: 'Sports Medicine',
  category: 'sports-medicine',
  title: 'Injury prevention',
  areaLabel: 'injury prevention',
  heroImage: '/assets/images/Hero/Exercise.webp',
  heroSubtitle:
    'Stay available for training and competition — we find and close the gaps that lead to injury before they cost you time.',
  seekHelp: [
    'Book a screening before a new season, a step up in training, or after a previous significant injury.',
    'Get assessed for recurring niggles in the same area, or pain that returns each time load increases.',
    'Speak to us early if training volume is rising quickly — planning now prevents time-loss later.',
  ],
  overview: [
    'Injury prevention is about staying available: reducing the risk of the injuries most likely to interrupt your training and competition.',
    'We look at how you move, how you load, and how you recover — then build a plan that closes the gaps specific to you and your sport.',
    'Prevention is most effective when it is proactive and individualised, not a generic warm-up applied to everyone.',
  ],
  presentationHeading: 'What we assess',
  patterns: [
    { id: 'movement', label: 'Movement screening', description: 'How you move under load — identifying patterns that raise injury risk in your sport.' },
    { id: 'warmups', label: 'Proven warm-ups', description: 'Evidence-based preparation routines matched to your activity and position.' },
    { id: 'load', label: 'Load planning', description: 'How training volume and intensity progress, to protect tissues while you build fitness.' },
    { id: 'education', label: 'Education & habits', description: 'Sleep, nutrition and recovery habits that underpin resilience over a season.' },
  ],
  conditionsHeading: 'What we help you prevent',
  syndromes: [
    { name: 'Recurrent soft-tissue injuries', copy: ['Hamstring, groin and calf strains — closing the strength and load gaps that drive re-injury.'] },
    { name: 'Overuse & load-related injuries', copy: ['Tendinopathy and bone-stress injuries — planning training progression to protect tissues.'] },
    { name: 'Return-to-sport re-injury', copy: ['Bridging rehabilitation and full training with objective, criteria-based clearance.'] },
    { name: 'High-risk movements (ACL, ankle)', copy: ['Targeted neuromuscular programmes to reduce the risk of the highest-cost injuries.'] },
  ],
  treatHeading: 'How we assess & help',
  approaches: [
    { title: 'Movement & biomechanical assessment', text: 'A structured screen of how you move and load, mapped to your sport and history.', href: '/treatments/non-invasive-treatments/physiotherapy' },
    { title: 'Individualised strength & neuromuscular programmes', text: 'Progressive plans that build capacity where you need it most.', href: '/treatments/non-invasive-treatments/exercise' },
    { title: 'Load & recovery monitoring', text: 'Guidance on training progression, sleep, nutrition and recovery to sustain adaptation.', href: '/treatments/non-invasive-treatments/exercise' },
  ],
  help: {
    paragraphs: [
      'The best time to work on prevention is before an injury — when small changes to strength, movement and load planning have the biggest pay-off.',
      'A short, focused screen at the right moment (new season, step-up in load, or return from injury) can save months of lost training later.',
    ],
    patient: [
      'Share your sport, position, season phase and injury history so screening targets your real risks.',
      'Book before a new season or a step up in load, and flag any recurring niggles.',
    ],
    clinician: [
      'We deliver movement screening and individualised neuromuscular and load-management programmes.',
      'Referrals with injury history and training context help us tailor prevention.',
    ],
  },
  citations: [
    { label: 'British Journal of Sports Medicine — injury prevention', url: 'https://bjsm.bmj.com/' },
  ],
};
