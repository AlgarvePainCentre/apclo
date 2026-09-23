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

// PILOT · A2 Cervical spine pain (Pain Medicine) — validated content from repo
// + canonical seek-help / patient / clinician from the content doc.
export const cervicalSpineData = {
  discipline: 'Pain Medicine',
  category: 'pain-medicine',
  title: 'Cervical spine pain',
  areaLabel: 'cervical spine pain',
  heroImage: '/assets/images/Hero/CervicalPain.webp',
  heroSubtitle:
    'Neck pain can come from joints, muscles, discs or nerves — a careful assessment guides the right, personalised plan.',
  seekHelp: [
    'Seek urgent care after significant trauma (fall, collision) with severe neck pain, or if you have numbness or weakness in the arms or legs.',
    'Seek urgent care for loss of bladder or bowel control, or unsteadiness when walking.',
    'Book an assessment for arm pain, tingling or weakness that travels below the shoulder, or symptoms that persist beyond a few weeks.',
    'Get reviewed if neck pain comes with unexplained weight loss, fever, or night pain.',
  ],
  overview: [
    'Cervical spine pain (neck pain) is often linked to joints, muscles, discs or nerves. Symptoms can include stiffness, reduced range of motion, headache, and pain that may travel into the shoulder blade or arm.',
    'During your first consultation we focus on the pattern of symptoms — what triggers flare-ups, what eases them, and whether there are nerve-related features such as tingling or weakness. This guides the next step, from simple measures to more targeted investigations or interventions.',
    'Treatment plans frequently combine education, movement and strengthening, posture strategies, and — when appropriate — image-guided procedures to reduce pain and support rehabilitation.',
  ],
  patterns: [
    { id: 'stiffness', label: 'Stiffness and restricted turning', description: 'Pain that is worse with looking up, turning the head, or prolonged desk work. Often improves with gentle movement and targeted strengthening.' },
    { id: 'headache', label: 'Headache linked to neck pain', description: 'Headache that seems to start from the upper neck and base of the skull, sometimes with neck tightness or sensitivity.' },
    { id: 'arm', label: 'Arm pain, tingling or weakness', description: 'Symptoms that travel into the shoulder, arm or hand may suggest nerve irritation. We prioritise a careful neurological assessment to guide treatment safely.' },
    { id: 'persistent', label: 'Persistent pain with flare-ups', description: 'Ongoing neck discomfort with fluctuating intensity, often influenced by sleep, workload and stress. A stepwise plan can help reduce flare-ups over time.' },
  ],
  syndromes: [
    { name: '“Whiplash” injury', copy: ['Whiplash-associated disorders can follow an acceleration–deceleration injury (for example, a rear-end collision). Symptoms may include neck pain and stiffness, headache, and sensitivity with movement.'] },
    { name: 'Fractures and fracture dislocations', copy: ['Neck pain after trauma requires careful assessment. When suspected, imaging and specialist review help confirm stability and guide safe management.'] },
    { name: 'Disc & facet joint degenerative disease', copy: ['Age-related changes in discs and facet joints can contribute to stiffness, local neck pain, and referred pain into the shoulder-blade region, especially with sustained posture or rotation.'] },
    { name: 'Inflammatory joint disease', copy: ['Inflammatory conditions can cause persistent pain and morning stiffness. Treatment often combines medication optimisation with rehabilitation and posture strategies.'] },
    { name: 'Cervical muscle contractures', copy: ['Muscle spasm or protective guarding can limit range of motion and amplify pain. Plans typically include education, graded movement and strengthening to restore tolerance.'] },
  ],
  treatments: [
    { name: 'Corticosteroid injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection', img: '/assets/images/Hero/Intra-ArticularCorticosteroidInjections.webp' },
    { name: 'Radiofrequency', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/radiofrequency', img: '/assets/images/Hero/RadiofrequencyAblation.webp' },
    { name: 'Cryoablation', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/cryoablation', img: '/assets/images/Hero/Cryoablation.webp' },
    { name: 'Nucleoplasty', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/nucleoplasty', img: '/assets/images/Hero/Nucleoplasty.webp' },
    { name: 'Pharmacological management', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/pharmacological-pain-management', img: '/assets/images/Hero/PharmacologicalPainManagement.webp' },
  ],
  help: {
    paragraphs: [
      'Neck pain is common and usually settles, but the right plan depends on the pattern — mechanical, nerve-related or headache-linked — and on ruling out the few serious causes.',
      'Early, structured care combines rehabilitation with targeted procedures when appropriate, to reduce pain and restore movement.',
    ],
    patient: [
      'Note what eases or worsens your neck pain (posture, desk work, sleep) and whether symptoms travel into the arm — this guides your assessment.',
      'Seek urgent care for arm weakness, numbness, unsteadiness, or neck pain after significant trauma.',
    ],
    clinician: [
      'We assess mechanical, radicular and headache-related patterns, screen for red flags, and combine rehabilitation with image-guided procedures when appropriate.',
      'Referrals noting neurological signs, symptom duration and any prior imaging help us prioritise safely.',
    ],
  },
  citations: [
    { label: 'NICE — Neck pain (cervical radiculopathy) guidance', url: 'https://cks.nice.org.uk/topics/neck-pain-cervical-radiculopathy/' },
  ],
};

// PILOT · C1 Stroke rehabilitation (Stroke Medicine) — a "service" page that had
// no data in the repo; fully authored from the content doc. Shows the canonical
// serving stroke with FAST safety and text approaches.
export const strokeRehabData = {
  discipline: 'Stroke Medicine',
  category: 'stroke-medicine',
  title: 'Stroke rehabilitation',
  areaLabel: 'stroke rehabilitation',
  heroImage: '/assets/images/Hero/Physiotherapy.webp',
  heroSubtitle:
    'Rebuild movement, communication, thinking and independence after a stroke — with a coordinated team and goals that matter to you.',
  seekHelp: [
    'Call emergency services immediately for signs of a new stroke — Face drooping, Arm weakness, Speech difficulty, Time to call (FAST). Fast treatment protects the brain.',
    'Seek urgent care for a sudden severe headache, new confusion, vision loss, or difficulty walking.',
    'Get reviewed if recovery has stalled, new problems appear, or daily tasks or mood are a struggle.',
    'Ask about rehabilitation early — starting sooner supports better recovery.',
  ],
  overview: [
    'Stroke rehabilitation helps people rebuild movement, communication, thinking and independence after a stroke, and adapt to changes along the way.',
    'Recovery is different for everyone. We assess how the stroke has affected daily life and set personalised, meaningful goals with you and your family.',
    'Our multidisciplinary team coordinates therapy over time — starting early and continuing into the community — to help you regain as much autonomy as possible.',
  ],
  presentationHeading: 'Areas we work on',
  patterns: [
    { id: 'movement', label: 'Movement & mobility', description: 'Strength, balance, walking and use of the arm and hand.' },
    { id: 'communication', label: 'Communication & swallowing', description: 'Speech, language and safe eating and drinking.' },
    { id: 'cognition', label: 'Thinking & mood', description: 'Memory, attention, planning and emotional wellbeing.' },
    { id: 'independence', label: 'Everyday independence', description: 'Self-care, home tasks and return to work and community life.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    { name: 'Weakness & reduced mobility', copy: ['Task-specific training to restore safe, confident movement.'] },
    { name: 'Spasticity & muscle tightness', copy: ['Therapy, positioning and targeted treatment when needed.'] },
    { name: 'Communication & swallowing difficulties', copy: ['Speech-and-language therapy and safety strategies.'] },
    { name: 'Cognitive & perceptual changes', copy: ['Strategies and practice for memory, attention and awareness.'] },
    { name: 'Mood & fatigue', copy: ['Support for low mood, anxiety and post-stroke tiredness.'] },
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Coordinated multidisciplinary rehabilitation', text: 'Physiotherapy, occupational therapy, speech therapy and psychology working to one plan.', href: '/treatments/non-invasive-treatments/physiotherapy' },
    { title: 'Task-specific, goal-based practice', text: 'Everyday tasks practised and progressed toward the goals that matter to you.', href: '/treatments/non-invasive-treatments/occupational-therapy' },
    { title: 'Communication & swallowing therapy', text: 'Speech-and-language therapy with safe-eating strategies where needed.', href: '/treatments/non-invasive-treatments/speech-therapy' },
    { title: 'Mood, cognition & caregiver support', text: 'Psychology input and caregiver training to sustain progress at home.', href: '/treatments/non-invasive-treatments/psychology' },
  ],
  help: {
    paragraphs: [
      'Recovery works best when rehabilitation starts early and the plan reflects what matters to you and your family.',
      'A coordinated team — carrying goals from hospital into the community — helps you regain as much independence as possible.',
    ],
    patient: [
      'Bring your discharge summary and current goals — the plan works best when it reflects what matters to you.',
      'Learn the FAST signs and call emergency services immediately for any new stroke symptoms.',
    ],
    clinician: [
      'We deliver coordinated multidisciplinary rehabilitation with goal-based, task-specific practice from early recovery into the community.',
      'Referrals with stroke type, deficits and current function help us prioritise the plan.',
    ],
  },
  citations: [
    { label: 'AHA/ASA — Guidelines for Adult Stroke Rehabilitation and Recovery', url: 'https://www.ahajournals.org/doi/10.1161/STR.0000000000000098' },
    { label: 'NICE NG236 — Stroke rehabilitation in adults', url: 'https://www.nice.org.uk/guidance/ng236' },
  ],
};

/* ------------------------------------------------------------------ *
 * PAIN MEDICINE ROLLOUT (A4–A12)
 * Overview, patterns and syndromes below are ✅ validated (mirrored from
 * `src/data/specialities/conditionContent.ts`). §5 seek-help is ✍️ draft
 * (from the content doc, to validate clinically). help paragraphs +
 * patient/clinician are ✍️ short drafts. Treatments mirror the live
 * approaches / LumbarInterventions per slug.
 * ------------------------------------------------------------------ */

// Shared treatment catalogue — canonical Hero imagery + kind, so each page
// just references the procedures it uses (same links as the live pages).
const TX = {
  radiofrequency: { name: 'Radiofrequency', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/radiofrequency', img: '/assets/images/Hero/RadiofrequencyAblation.webp' },
  cryoablation: { name: 'Cryoablation', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/cryoablation', img: '/assets/images/Hero/Cryoablation.webp' },
  corticosteroids: { name: 'Corticosteroid injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/intra-articular-corticosteroids-injection', img: '/assets/images/Hero/Intra-ArticularCorticosteroidInjections.webp' },
  prp: { name: 'Platelet-rich plasma', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection', img: '/assets/images/Hero/Platelet-RichPlasmaInjections.webp' },
  nerveBlock: { name: 'Peripheral nerve block', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/peripheral-nerve-block', img: '/assets/images/Hero/PeripheralNerveBlocks.webp' },
  nucleoplasty: { name: 'Nucleoplasty', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/nucleoplasty', img: '/assets/images/Hero/Nucleoplasty.webp' },
  hydrodistention: { name: 'Hydrodistention', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/hydrodistention', img: '/assets/images/Hero/Hydrodistention.webp' },
  barbotage: { name: 'Calcification barbotage', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/calcification-barbotage', img: '/assets/images/Hero/CalcificationBarbotage.webp' },
  botulinum: { name: 'Botulinum toxin injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/botulin-toxin-injection', img: '/assets/images/Hero/BotulinToxinInjection.webp' },
  pharma: { name: 'Pharmacological management', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/pharmacological-pain-management', img: '/assets/images/Hero/PharmacologicalPainManagement.webp' },
};
// Hip & knee mirror the live <LumbarInterventions /> full option set.
const FULL_INTERVENTIONS = [TX.radiofrequency, TX.cryoablation, TX.corticosteroids, TX.prp, TX.nerveBlock, TX.pharma, TX.nucleoplasty, TX.hydrodistention, TX.barbotage, TX.botulinum];

const painBase = { discipline: 'Pain Medicine', category: 'pain-medicine' };
// helper: turn a validated {label,description} condition into a syndrome card.
const syn = (label, description) => ({ name: label, copy: [description] });

export const shoulderPainData = {
  ...painBase,
  title: 'Shoulder pain',
  areaLabel: 'shoulder pain',
  heroImage: '/assets/images/Hero/ShoulderPain.webp',
  heroSubtitle: 'Shoulder pain can make simple tasks like dressing or reaching overhead feel difficult.',
  seekHelp: [
    'Seek urgent care after a fall or dislocation with severe pain, deformity, or inability to move the arm.',
    'Get reviewed for sudden weakness lifting the arm, or numbness or tingling down the arm.',
    'Book an assessment for night pain that disrupts sleep, or stiffness and loss of range that isn’t improving.',
  ],
  overview: [
    'Shoulder pain can arise from the rotator cuff, bursa, joint irritation, tendon overload, or stiffness. It often affects reaching, dressing, lifting and sleep.',
    'We look at when the pain occurs (overhead movement, behind-the-back reach, lying on the shoulder) and whether weakness or reduced range of motion is present. This helps clarify whether rehabilitation, injections or other targeted treatments may help.',
    'Treatment commonly combines guided exercise, load management, and — when indicated — image-guided procedures to reduce pain so rehabilitation can progress.',
  ],
  patterns: [
    { id: 'overhead', label: 'Pain with overhead reach', description: 'Pain when lifting the arm or working above shoulder height. Often linked to tendon overload or irritation around the shoulder.' },
    { id: 'night', label: 'Night pain and sleep disruption', description: 'Pain that worsens when lying on the shoulder or during the night. We focus on reducing irritation and restoring comfortable movement.' },
    { id: 'stiffness', label: 'Stiffness and loss of range', description: 'Difficulty reaching behind the back or overhead with a stiff, painful end range. Treatment emphasises mobility and progressive strengthening.' },
    { id: 'weakness', label: 'Weakness or giving way', description: 'A feeling of reduced strength when lifting or carrying. We assess the rotator cuff and surrounding stabilisers and match the plan accordingly.' },
  ],
  syndromes: [
    syn('Subacromial impingement (tendinopathy, bursitis)', 'Pain with overhead reaching or side-lying that can reflect rotator cuff tendon overload and bursa irritation. Management typically combines load guidance, exercise, and selected injections.'),
    syn('Rotator cuff tear', 'Weakness and pain with lifting or reaching can indicate a tendon tear. Assessment helps determine severity and whether rehabilitation, injections, or surgical referral is appropriate.'),
    syn('Suprascapular neuropathy', 'Irritation of the suprascapular nerve can contribute to shoulder pain and weakness, sometimes linked to overhead activity or cysts near the labrum.'),
    syn('Shoulder instability', 'A feeling of slipping, catching, or apprehension can reflect instability. Treatment focuses on stability, strength, and movement control; imaging helps when structural injury is suspected.'),
    syn('Labral / SLAP tears', 'Labral injuries can cause deep shoulder pain, clicking, or reduced performance with overhead tasks. Plans range from rehabilitation to targeted injections or surgical review depending on function.'),
    syn('Biceps tendinopathy, rupture or subluxation', 'Front-of-shoulder pain can relate to the long head of biceps tendon. Management includes load modification and strengthening; imaging can help confirm tears or tendon instability.'),
    syn('AC joint arthropathy / instability', 'Pain on top of the shoulder, especially with cross-body movements, can relate to the acromioclavicular joint. Treatment may include rehabilitation and image-guided injections.'),
    syn('Glenohumeral joint arthropathy', 'Arthritis in the main shoulder joint can cause stiffness, night pain, and reduced range of motion. Care combines exercise, pain control, injections, and surgical options when needed.'),
    syn('Scapulo-thoracic dyskinesis', 'Altered shoulder blade control can increase load on shoulder tissues. Rehabilitation targets posture, strength, and coordination to improve movement efficiency.'),
  ],
  treatments: [TX.pharma, TX.hydrodistention, TX.barbotage],
  help: {
    paragraphs: [
      'Most shoulder pain improves with the right plan, but the pathway depends on the pattern — impingement, tendon, instability or joint — and on ruling out the few injuries that need earlier imaging or surgical review.',
      'Early, structured care reduces irritation so rehabilitation can rebuild strength, movement and confidence.',
    ],
    patient: [
      'Note what triggers your pain (overhead reach, lying on the shoulder, lifting) and whether there is weakness — it guides your assessment.',
      'Seek urgent care after a fall or dislocation with severe pain or loss of movement.',
    ],
    clinician: [
      'We assess rotator cuff, instability and joint patterns, screen for red flags, and combine rehabilitation with image-guided procedures when appropriate.',
      'Referrals noting mechanism, weakness and any prior imaging help us prioritise.',
    ],
  },
  citations: [
    { label: 'AAOS Clinical Practice Guideline: Management of Rotator Cuff Injuries (2019)', url: 'https://www.aaos.org/' },
  ],
};

export const handElbowData = {
  ...painBase,
  title: 'Hand and elbow pain',
  areaLabel: 'hand and elbow pain',
  heroImage: '/assets/images/Hero/HandandElbowPain.webp',
  heroSubtitle: 'Pain in the hand or elbow can affect grip strength, work and sports performance.',
  seekHelp: [
    'Seek urgent care for a suspected fracture or dislocation, an open wound, or a hand or finger that looks deformed.',
    'Get reviewed for persistent numbness or tingling, night symptoms, or weakness of grip.',
    'Book an assessment for tendon pain that limits work or sport and isn’t settling.',
  ],
  overview: [
    'Hand and elbow pain can be driven by tendon overload, joint irritation, nerve entrapment or post-injury stiffness. It can affect grip, fine motor tasks, work and sport.',
    'We assess how symptoms relate to gripping, lifting, typing and sport-specific activity, and whether there is any numbness or tingling. This helps guide rehabilitation, splinting strategies, or targeted interventions when appropriate.',
    'Treatment plans frequently combine load management, strengthening and mobility work, and carefully selected procedures to support recovery and function.',
  ],
  patterns: [
    { id: 'grip', label: 'Grip-related pain', description: 'Pain triggered by gripping, twisting, or repetitive use. Often improves with progressive loading and technique changes.' },
    { id: 'tendon', label: 'Tendon overload around the elbow', description: 'Pain on the inside or outside of the elbow that worsens with lifting or sport. A stepwise plan focuses on tendon capacity and symptom control.' },
    { id: 'nerve', label: 'Numbness or tingling', description: 'Pins-and-needles or altered sensation in the hand can suggest nerve irritation. We assess nerve distribution patterns to guide safe care.' },
    { id: 'stiffness', label: 'Post-injury stiffness', description: 'Reduced motion after sprain, fracture or surgery. Rehabilitation focuses on restoring mobility and rebuilding confidence in use.' },
  ],
  syndromes: [
    syn('Lateral / medial epicondylitis', 'Common tendon overload conditions around the elbow (tennis or golfer’s elbow), triggered by gripping, lifting or repetitive wrist activity. Management includes load modification, progressive strengthening and targeted symptom control.'),
    syn('Pronator syndrome', 'Median nerve irritation in the forearm that can cause aching pain and altered sensation. Assessment focuses on symptom pattern and provoking positions to guide rehabilitation and, when needed, targeted intervention.'),
    syn('Radial tunnel syndrome', 'Forearm pain related to irritation around the radial nerve, sometimes overlapping with lateral elbow symptoms. Treatment can include activity changes, strengthening and nerve-sensitive load progression.'),
    syn('Cubital tunnel syndrome', 'Ulnar nerve irritation at the elbow that may cause numbness or tingling in the ring and little fingers. Management often includes positioning strategies, splinting and graded strengthening.'),
    syn('Carpal tunnel syndrome', 'Median nerve compression at the wrist that can cause numbness, tingling and night symptoms. Treatment may include splinting, ergonomic changes, rehabilitation, injections, or surgical referral when indicated.'),
    syn('De Quervain’s tenosynovitis', 'Pain on the thumb side of the wrist linked to tendon sheath irritation, often worsened by gripping and lifting. Care typically includes load management, splinting and targeted procedures when needed.'),
    syn('Ganglion cysts', 'Fluid-filled swellings that can cause discomfort or limit movement depending on location. Management depends on symptoms and may include observation, aspiration or other targeted treatment.'),
    syn('Rheumatoid arthritis', 'Inflammatory joint disease that can affect the hands and wrists with pain, swelling and morning stiffness. Treatment often requires coordinated medical management alongside rehabilitation and activity planning.'),
  ],
  treatments: [TX.radiofrequency, TX.prp, TX.pharma, TX.nerveBlock, TX.corticosteroids, TX.cryoablation],
  help: {
    paragraphs: [
      'Hand and elbow pain often responds well to a targeted plan, but nerve-related and tendon problems behave differently — so the assessment shapes the treatment.',
      'Structured care combines load management and rehabilitation with selected procedures to protect grip, work and sport.',
    ],
    patient: [
      'Note which activities trigger pain (gripping, typing, lifting) and whether you have numbness, tingling or night symptoms.',
      'Seek urgent care for a suspected fracture, an open wound, or a deformed hand or finger.',
    ],
    clinician: [
      'We assess tendon-overload and nerve-entrapment patterns, and combine rehabilitation and splinting with image-guided procedures when appropriate.',
      'Referrals noting symptom distribution, night symptoms and grip weakness help us prioritise.',
    ],
  },
  citations: [],
};

export const hipGroinData = {
  ...painBase,
  title: 'Hip and groin pain',
  areaLabel: 'hip and groin pain',
  heroImage: '/assets/images/Hero/HipandGroinPain.webp',
  heroSubtitle: 'Pain around the hip or groin can make walking, sport and rest uncomfortable.',
  seekHelp: [
    'Seek urgent care after trauma with inability to bear weight, or hip or groin pain with fever.',
    'Get reviewed for groin pain that worsens with weight-bearing over days to weeks (possible stress fracture), or a hip that catches, locks or gives way.',
    'Book an assessment for pain that limits walking, stairs or sleep.',
  ],
  overview: [
    'Hip and groin pain can come from the hip joint, tendons, bursa, muscle overload, or referral from the lumbar spine. It may affect walking, stairs, sport and sleep.',
    'We explore where you feel pain (groin, side of hip, buttock), how it behaves with sitting, walking or rotation, and whether there is stiffness or weakness. This helps guide rehabilitation and targeted treatments when needed.',
    'Many people improve with a combined plan that rebuilds hip strength, improves movement control, and targets pain generators to support return to activity.',
  ],
  patterns: [
    { id: 'groin', label: 'Groin pain with walking or stairs', description: 'Pain felt deep in the groin that worsens with walking, stairs or pivoting. Often linked to hip joint irritation or reduced hip control.' },
    { id: 'lateral', label: 'Lateral hip pain', description: 'Pain on the outside of the hip, sometimes worse when lying on that side. We focus on tendon load tolerance and movement strategy.' },
    { id: 'stiffness', label: 'Stiffness after sitting', description: 'Stiffness when getting up from a chair or out of a car that eases after a few steps. Treatment emphasises mobility and graded strengthening.' },
    { id: 'referred', label: 'Referred pain patterns', description: 'Pain that overlaps with low back or buttock symptoms can be referral. Assessment clarifies whether the hip, spine or both need attention.' },
  ],
  syndromes: [
    syn('Meralgia paresthetica', 'Burning, tingling or numbness on the outer thigh due to irritation of the lateral femoral cutaneous nerve, sometimes influenced by posture, load or compression.'),
    syn('Athletic pubalgia', 'Groin pain linked to the pubic region and surrounding soft tissues, commonly in athletes and often aggravated by sprinting, cutting or kicking.'),
    syn('Femoral neck fracture / stress fracture', 'Hip or groin pain that can worsen with weight-bearing and may follow trauma or repetitive load. Prompt assessment is important when suspected.'),
    syn('Femoroacetabular impingement', 'Hip joint impingement that can cause groin pain, stiffness and reduced range of motion, often worse with sitting, squatting or rotation.'),
    syn('Hip labral tear', 'Pain often felt in the groin with clicking, catching or giving-way sensations. Symptoms may vary with activity and hip position.'),
    syn('Iliopsoas bursitis (internal snapping hip)', 'Anterior hip or groin discomfort with snapping sensations during hip flexion/extension, sometimes linked to tendon irritation and load sensitivity.'),
    syn('Greater trochanteric pain syndrome', 'Lateral hip pain linked to gluteal tendons and bursa irritation, often worse with walking, stairs, side-lying or prolonged standing.'),
    syn('Osteoarthritis / osteonecrosis of the hip', 'Joint-related pain and stiffness that can limit walking and daily activity. In older adults, osteoarthritis is a common cause of hip pain.'),
    syn('Sacroiliac joint dysfunction', 'Pain around the buttock and pelvis that can refer to the groin or thigh, influenced by posture and load. Targeted examination helps confirm likely sources.'),
    syn('Piriformis syndrome', 'Buttock pain with possible leg symptoms related to irritation near the sciatic nerve. Symptoms often vary with sitting, hip position and activity.'),
  ],
  treatments: FULL_INTERVENTIONS,
  help: {
    paragraphs: [
      'Hip and groin pain has many possible sources, so a careful assessment — hip joint, tendons, or referral from the spine — is what makes the plan effective.',
      'For many people, a combined plan of rehabilitation and targeted procedures restores walking, sport and sleep. Percutaneous options can help those not suited to, or awaiting, surgery.',
    ],
    patient: [
      'Note where you feel the pain (groin, side of hip, buttock) and what eases or worsens it — it guides your assessment.',
      'Seek urgent care after trauma with inability to bear weight, or hip or groin pain with fever.',
    ],
    clinician: [
      'We differentiate intra-articular, tendon and referred patterns, and combine rehabilitation with image-guided procedures when appropriate.',
      'Referrals noting weight-bearing pain, mechanical symptoms and imaging help us prioritise.',
    ],
  },
  citations: [],
};

export const kneePainData = {
  ...painBase,
  title: 'Knee pain',
  areaLabel: 'knee pain',
  heroImage: '/assets/images/Hero/KneePain.webp',
  heroSubtitle: 'Knee pain can make stairs, sport and even short walks feel demanding.',
  seekHelp: [
    'Seek urgent care for a knee that gives way with a “pop”, locks, or won’t straighten, or after trauma with severe swelling.',
    'Get reviewed for a hot, red, swollen knee with fever (possible infection), or rapid swelling within hours of injury.',
    'Book an assessment for pain that limits walking distance or activity despite a progressive plan.',
  ],
  overview: [
    'Knee pain may be related to joint irritation, cartilage changes, tendon overload, or biomechanics during walking, stairs and sport. It can affect confidence, fitness and daily activity.',
    'We assess where the pain sits (front, inside, outside, back of knee), whether swelling or instability is present, and how symptoms behave with load. This guides rehabilitation, lifestyle strategies and targeted interventions when indicated.',
    'Treatment focuses on improving strength and control around the knee and hip, building load tolerance, and using injections or other options selectively to support rehabilitation.',
  ],
  patterns: [
    { id: 'stairs', label: 'Pain with stairs or squatting', description: 'Pain at the front of the knee during stairs, squats or sitting-to-standing. Often improves with strengthening and movement retraining.' },
    { id: 'swelling', label: 'Swelling and stiffness', description: 'Swelling after activity with stiffness that limits bending or walking. We consider load modification and targeted symptom control.' },
    { id: 'instability', label: 'Locking or giving way', description: 'A sense of catching, locking or instability can indicate internal derangement. We assess carefully and coordinate appropriate next steps.' },
    { id: 'persistent', label: 'Persistent pain with reduced tolerance', description: 'Ongoing knee pain that limits walking distance or activity. A progressive plan helps rebuild capacity while keeping symptoms manageable.' },
  ],
  syndromes: [
    syn('Patellar subluxation or dislocation', 'The kneecap can partially shift or fully dislocate, often causing sudden pain, swelling, and a feeling of instability or “giving way”.'),
    syn('Osgood–Schlatter lesion', 'A common cause of knee pain in active adolescents, linked to traction at the tibial tuberosity and tenderness just below the kneecap.'),
    syn('Patellar tendinitis', 'Pain at the patellar tendon (often below the kneecap) that can worsen with jumping, stairs and load — frequently associated with overuse or rapid training changes.'),
    syn('Patellofemoral pain syndrome', 'Pain around or behind the kneecap, often aggravated by stairs, squatting, running or prolonged sitting, and influenced by load tolerance and biomechanics.'),
    syn('Medial / lateral collateral ligament sprain', 'Injury to the ligaments on the inside (MCL) or outside (LCL) of the knee, commonly from a twist or impact, causing localised pain and tenderness.'),
    syn('Medial / lateral meniscal tear', 'Meniscus injuries can cause joint-line pain, swelling, catching or locking sensations. Presentation varies by tear type and activity demands.'),
    syn('Pes anserine bursitis', 'Pain and tenderness on the inner side of the knee below the joint line, sometimes associated with tendon irritation and load sensitivity.'),
    syn('Iliotibial band tendinitis', 'Common in runners and cyclists, presenting as pain on the outside of the knee that worsens with repetitive bending and loading.'),
    syn('Baker’s cyst', 'A fluid-filled swelling behind the knee that can be associated with underlying joint irritation. It may cause tightness, pain, or reduced range of motion.'),
    syn('Knee osteoarthritis', 'Degenerative joint changes can lead to pain, stiffness, swelling and reduced function — often influenced by activity levels, strength and overall load tolerance.'),
  ],
  treatments: FULL_INTERVENTIONS,
  help: {
    paragraphs: [
      'Knee pain has many causes, so the assessment — where it sits, whether it swells, locks or gives way — is what shapes an effective plan.',
      'Most people improve by rebuilding strength and load tolerance, with injections or other procedures used selectively to support rehabilitation.',
    ],
    patient: [
      'Note where the pain sits and whether the knee swells, catches or gives way — it guides your assessment.',
      'Seek urgent care for a locked knee, a hot swollen knee with fever, or severe swelling after trauma.',
    ],
    clinician: [
      'We assess patellofemoral, tendon, ligament and degenerative patterns, and combine rehabilitation with image-guided procedures when appropriate.',
      'Referrals noting mechanical symptoms, swelling and imaging help us prioritise.',
    ],
  },
  citations: [
    { label: 'NICE Guideline: Osteoarthritis in over 16s (NG226, 2022)', url: 'https://www.nice.org.uk/guidance/ng226' },
  ],
};

export const thoracicWallData = {
  ...painBase,
  title: 'Thoracic wall pain',
  areaLabel: 'thoracic wall pain',
  heroImage: '/assets/images/Hero/ThoracicWallPain.webp',
  heroSubtitle: 'Pain in the chest wall can be worrying and is often linked to posture, joints or nerves.',
  seekHelp: [
    'Call emergency services for chest pain with shortness of breath, sweating, nausea, or pain spreading to the arm or jaw — chest wall pain must not be assumed before cardiac causes are excluded.',
    'Seek urgent care for chest pain after significant trauma, or with fever and cough.',
    'Book an assessment once serious causes are excluded and pain is posture- or movement-related and persistent.',
  ],
  overview: [
    'Thoracic wall pain is felt around the ribs, upper back or chest wall. It is commonly linked to posture, muscle overload, joint irritation, or nerve sensitivity.',
    'We assess breathing-related triggers, movement patterns, and whether the pain is localised to the chest wall. This helps identify treatable causes and reduce unnecessary worry when serious causes have been excluded.',
    'Treatment often includes education, mobility and strengthening, breathing and posture strategies, and targeted interventions when a specific pain generator is identified.',
  ],
  patterns: [
    { id: 'posture', label: 'Posture-related pain', description: 'Pain that worsens with prolonged sitting or rounded posture and improves with movement. Rehabilitation focuses on mobility and endurance.' },
    { id: 'rib-joint', label: 'Rib or joint irritation', description: 'Pain near the spine or rib joints that is sensitive to twisting or deep breathing. Assessment helps pinpoint the source for targeted care.' },
    { id: 'muscle', label: 'Muscle strain and overload', description: 'Pain after lifting, coughing, or sudden movement. Treatment prioritises calm-down strategies and a gradual return to normal activity.' },
    { id: 'nerve', label: 'Nerve-type pain', description: 'Sharp, burning or band-like pain that may follow a rib line. We assess nerve involvement and tailor management accordingly.' },
  ],
  syndromes: [
    syn('Costochondritis', 'Inflammation of the costal cartilage where the ribs meet the sternum. Usually benign, often presenting with chest wall pain and tenderness over affected joints. Anti-inflammatory strategies may help.'),
    syn('Pectoral or intercostal muscle strains', 'Strain of chest wall muscles can follow coughing, lifting or twisting. Management focuses on load guidance, mobility, breathing mechanics and progressive strengthening.'),
    syn('Lower rib pain syndrome', 'Irritation of lower rib attachments can cause focal chest wall pain, sometimes with movement or breathing. Treatment combines reassurance, activity modification and targeted symptom relief.'),
    syn('Sternalis syndrome', 'A less common source of anterior chest wall pain related to sternal or parasternal tissues. Assessment helps exclude serious causes and guide conservative management.'),
    syn('Thoracic spine / costovertebral joint pain', 'Facet and costovertebral joint irritation can refer pain to the chest wall. Plans often include posture strategies, mobility, strengthening and selected interventions when appropriate.'),
  ],
  treatments: [TX.nerveBlock, TX.pharma],
  help: {
    paragraphs: [
      'Chest wall pain is understandably worrying. Once serious causes have been excluded, most cases are posture-, joint- or nerve-related and respond well to a structured plan.',
      'Care combines reassurance and rehabilitation with targeted procedures when a specific pain generator is identified.',
    ],
    patient: [
      'Note whether the pain changes with posture, movement or breathing, and whether it is tender to touch.',
      'Call emergency services for chest pain with breathlessness, sweating, nausea, or pain spreading to the arm or jaw.',
    ],
    clinician: [
      'We assess musculoskeletal and nerve-related chest wall pain once cardiac and other serious causes are excluded, and use targeted procedures when appropriate.',
      'Referrals confirming that serious causes have been considered help us focus on rehabilitation and symptom control.',
    ],
  },
  citations: [],
};

export const abdominalWallData = {
  ...painBase,
  title: 'Abdominal wall pain',
  areaLabel: 'abdominal wall pain',
  heroImage: '/assets/images/Hero/AbdominalWallPain.webp',
  heroSubtitle: 'Localised abdominal wall pain can mimic internal problems but often has treatable causes.',
  seekHelp: [
    'Seek urgent care for abdominal pain with vomiting, fever, a rigid or very tender abdomen, blood in stool or urine, or pain with fainting — internal causes must be excluded first.',
    'Get reviewed for a well-localised, tender wall pain that persists after internal causes have been assessed.',
    'Book an assessment for scar-related or nerve-type pain following abdominal surgery.',
  ],
  overview: [
    'Abdominal wall pain is pain originating from the muscles, fascia or nerves of the abdominal wall rather than from internal organs. It can feel sharp, localised and tender to touch.',
    'Because it can mimic internal abdominal problems, we focus on a careful clinical assessment to confirm the likely source and rule out warning features that require medical investigation.',
    'Treatment may include targeted rehabilitation, medication strategies, and — when appropriate — image-guided injections or nerve-focused approaches to reduce pain and improve function.',
  ],
  patterns: [
    { id: 'localised', label: 'A well-localised tender spot', description: 'Pain that you can point to with one finger, often worsened by pressure on a specific area of the abdominal wall.' },
    { id: 'movement', label: 'Pain with movement or core activity', description: 'Symptoms that flare with coughing, sit-ups, turning in bed, or certain postures. Treatment focuses on graded loading and symptom control.' },
    { id: 'nerve', label: 'Nerve irritation features', description: 'Burning or shooting pain that follows a small area and may be sensitive to light touch. We assess for nerve entrapment patterns.' },
    { id: 'post-surgery', label: 'Post-surgical or scar-related pain', description: 'Pain around a scar or after abdominal procedures can be due to nerve sensitivity. A stepwise plan helps calm symptoms and restore function.' },
  ],
  syndromes: [
    syn('Anterior cutaneous nerve entrapment syndrome (ACNES)', 'A common and frequently missed cause of chronic abdominal pain, from entrapment of cutaneous branches of intercostal nerves. Pain is usually aggravated by abdominal muscle movement, and treatment often begins with ultrasound-guided nerve blocks.'),
    syn('Thoracic nerve radiculopathy', 'Irritation of a thoracic spinal nerve can refer pain to the chest or abdominal wall. Assessment looks for posture, movement and nerve-related features to guide rehabilitation and targeted treatment.'),
    syn('Lower rib pain syndromes', 'Pain arising from lower rib and costal margin structures can mimic abdominal pain. Treatment often includes reassurance, load modification, mobility and targeted symptom control.'),
  ],
  treatments: [TX.nerveBlock, TX.pharma],
  help: {
    paragraphs: [
      'Because abdominal wall pain can mimic internal problems, the priority is a careful assessment to confirm the source and exclude warning features.',
      'Once identified, nerve- and muscle-related wall pain often responds well to targeted rehabilitation and image-guided procedures such as nerve blocks.',
    ],
    patient: [
      'Note whether you can point to the pain with one finger and whether it flares with coughing, sit-ups or turning in bed.',
      'Seek urgent care for abdominal pain with vomiting, fever, a rigid abdomen, or blood in stool or urine.',
    ],
    clinician: [
      'We assess abdominal wall and nerve-entrapment pain (e.g. ACNES) once internal causes are considered, and use ultrasound-guided blocks when appropriate.',
      'Referrals confirming that internal causes have been assessed help us focus on wall-related treatment.',
    ],
  },
  citations: [],
};

export const pelvicData = {
  ...painBase,
  title: 'Pelvic and gynaecological pain',
  areaLabel: 'pelvic and gynaecological pain',
  heroImage: '/assets/images/Hero/PelvicandGynaecologicalPain.webp',
  heroSubtitle: 'Persistent pelvic pain can impact daily life, relationships and wellbeing.',
  seekHelp: [
    'Seek urgent care for severe sudden pelvic pain, pain with fever, heavy or abnormal bleeding, or pain during pregnancy.',
    'Get reviewed for pain with urinary or bowel changes, or pain during intercourse that is persistent.',
    'Book a multidisciplinary assessment for pelvic pain lasting more than a few months.',
  ],
  overview: [
    'Pelvic and gynaecological pain can have multiple contributors, including pelvic floor muscle tension, nerve sensitivity, joint or connective tissue irritation, and gynaecological or urological factors.',
    'We take a respectful, whole-person history to understand symptom triggers and impact on daily life, sleep and wellbeing. When needed, we coordinate with relevant specialists to ensure appropriate investigation and care.',
    'Treatment is often multidisciplinary, combining education, rehabilitation and pelvic floor–informed approaches, medication optimisation, and targeted interventions when appropriate.',
  ],
  patterns: [
    { id: 'flare-ups', label: 'Persistent pain with flare-ups', description: 'Ongoing symptoms that vary day to day and are influenced by stress, sleep, activity and life events. A structured plan helps reduce flare frequency.' },
    { id: 'sitting', label: 'Pain with sitting', description: 'Pain that worsens with prolonged sitting and eases with changing position. We look at pelvic floor, nerve sensitivity and movement strategies.' },
    { id: 'cycle', label: 'Symptoms linked to hormonal cycle', description: 'Pain that changes with the menstrual cycle or hormonal factors. Assessment helps clarify timing and coordinate appropriate investigation and treatment.' },
    { id: 'bladder-bowel', label: 'Bladder or bowel-related triggers', description: 'Pain that is influenced by bladder filling, bowel symptoms or pelvic pressure. Multidisciplinary input can be helpful for a comprehensive plan.' },
  ],
  syndromes: [
    syn('Fibromyalgia', 'A condition where pain-conducting systems transmit information in an erroneous manner. It is a benign condition and, while not to be dismissed, patients can be reassured. Exercise, medication and physiotherapy may help reduce the pain.'),
    syn('Pelvic floor muscle tension', 'Increased pelvic floor muscle tone can contribute to pelvic pain, urinary or bowel symptoms, and pain with sitting or activity. Treatment commonly includes education, pelvic floor–informed rehabilitation and graded exposure to comfortable movement.'),
    syn('Inflammation of the pubic joint (pubic symphysis)', 'Irritation around the pubic symphysis can cause pain in the groin or lower abdomen, sometimes worsened with walking, stairs or rolling in bed. A stepwise plan often includes load management and targeted rehabilitation.'),
    syn('Chronic pelvic inflammatory disease', 'Inflammatory conditions affecting pelvic structures can contribute to persistent pain. Care may require coordinated assessment with appropriate specialists alongside symptom control and rehabilitation strategies.'),
  ],
  treatments: [TX.corticosteroids, TX.pharma],
  help: {
    paragraphs: [
      'Pelvic pain often has more than one contributor, so a respectful, whole-person assessment — and coordination with relevant specialists — is what makes care effective.',
      'A multidisciplinary plan combining pelvic floor–informed rehabilitation, medication and targeted procedures can reduce pain and restore daily life.',
    ],
    patient: [
      'Tell us what triggers or eases your pain (sitting, cycle, bladder or bowel) so the plan reflects your priorities.',
      'Seek urgent care for severe sudden pelvic pain, pain with fever, or heavy or abnormal bleeding.',
    ],
    clinician: [
      'We coordinate pelvic floor–informed rehabilitation, medication optimisation and targeted procedures, working with gynaecology and urology when needed.',
      'Referrals noting cycle-related timing and prior investigations help us tailor the plan.',
    ],
  },
  citations: [
    { label: 'ACOG Practice Bulletin: Chronic Pelvic Pain', url: 'https://www.acog.org/' },
  ],
};

export const facialPainData = {
  ...painBase,
  title: 'Facial pain',
  areaLabel: 'facial pain',
  heroImage: '/assets/images/Hero/FacialPain.webp',
  heroSubtitle: 'Facial pain and neuralgia can be intense and distressing, but often respond to targeted care.',
  seekHelp: [
    'Seek urgent care for facial pain with jaw weakness, facial drooping, vision changes, or a severe new headache.',
    'Get reviewed for brief, severe electric-shock pains triggered by touch or chewing, or a painful rash on the face.',
    'Book an assessment for persistent facial or jaw pain affecting eating, sleep or mood.',
  ],
  overview: [
    'Facial pain can be complex and distressing. It may be related to nerve irritation, jaw and muscle tension, dental or sinus referral, or headache syndromes.',
    'We focus on the quality and timing of pain — short electric-shock episodes versus persistent aching or burning — and whether there are triggers such as chewing, touch or cold air. This helps determine the most appropriate pathway.',
    'Treatment may include medication optimisation for nerve pain, targeted procedures when indicated, and coordinated care with dental, ENT or neurology services when needed.',
  ],
  patterns: [
    { id: 'shock', label: 'Brief electric-shock episodes', description: 'Sudden, sharp pain triggered by touch, chewing or brushing teeth can suggest neuralgia-type pain. Assessment helps guide targeted treatment.' },
    { id: 'jaw', label: 'Jaw and chewing-related pain', description: 'Pain around the jaw or temples that worsens with chewing or clenching. We assess jaw mechanics and contributing muscle tension.' },
    { id: 'burning', label: 'Persistent burning or aching', description: 'Continuous pain that may be sensitive to light touch or temperature. Management focuses on calm-down strategies and nerve-informed care.' },
    { id: 'headache', label: 'Overlap with headache syndromes', description: 'Facial pain may overlap with headache patterns. A careful history helps match you with the most effective treatments.' },
  ],
  syndromes: [
    syn('Trigeminal neuralgia', 'Classically presents as brief, severe “electric shock” pain in the face, often triggered by touch, chewing or cold air. Management focuses on confirming the diagnosis and optimising neuropathic pain treatment.'),
    syn('Post-herpetic neuralgia', 'Persistent burning or sensitive pain that can follow shingles. Treatment aims to reduce nerve pain, improve sleep, and restore confidence with daily activities.'),
    syn('Temporomandibular disorder (jaw-related pain)', 'Jaw and facial pain linked to muscle tension, clenching, joint irritation or clicking. Care often includes education, muscle and jaw load strategies, and coordinated dental assessment when needed.'),
    syn('Persistent idiopathic facial pain', 'Ongoing facial pain without a clear structural cause after appropriate evaluation. A multidisciplinary plan can help reduce symptoms and improve function over time.'),
  ],
  treatments: [TX.corticosteroids, TX.pharma],
  help: {
    paragraphs: [
      'Facial pain can be intense and distressing, but the type of pain — neuralgia, jaw-related or persistent — points to different, effective treatments.',
      'Care combines nerve-informed medication and targeted procedures with coordinated dental, ENT or neurology input when needed.',
    ],
    patient: [
      'Note the quality and triggers of your pain (touch, chewing, cold air) and whether it is brief and shock-like or persistent.',
      'Seek urgent care for facial pain with jaw weakness, facial drooping, vision changes or a severe new headache.',
    ],
    clinician: [
      'We assess neuralgia, temporomandibular and persistent facial pain patterns, optimise neuropathic treatment, and use targeted procedures when indicated.',
      'Referrals noting pain character, triggers and prior dental or neurology input help us prioritise.',
    ],
  },
  citations: [
    { label: 'AAN Guideline: Trigeminal Neuralgia (2019)', url: 'https://www.aan.com/' },
  ],
};

export const footAnkleData = {
  ...painBase,
  title: 'Foot and ankle pain',
  areaLabel: 'foot and ankle pain',
  heroImage: '/assets/images/Hero/FootandAnklePain.webp',
  heroSubtitle: 'Pain in the foot or ankle can limit walking, running and balance on uneven ground.',
  seekHelp: [
    'Seek urgent care if you cannot bear weight after an injury, or the foot or ankle looks deformed (possible fracture).',
    'Get reviewed for a hot, red, very painful joint (possible gout or infection), or numbness or tingling in the foot.',
    'Book an assessment for heel or arch pain that limits walking despite footwear changes and initial loading.',
  ],
  overview: [
    'Foot and ankle pain can come from tendon and ligament overload, joint irritation, plantar fascia strain, nerve irritation, or lingering symptoms after a sprain.',
    'We assess your walking pattern, footwear and activity demands, and whether pain is localised (heel, arch, ankle, forefoot) or associated with swelling, instability or nerve symptoms.',
    'Treatment commonly combines load management, strengthening, footwear and orthotic advice when appropriate, and targeted interventions to support rehabilitation and return to activity.',
  ],
  patterns: [
    { id: 'first-steps', label: 'Pain on first steps', description: 'Heel or arch pain that is worst on the first steps in the morning and eases with movement. Treatment focuses on load management and progressive strengthening.' },
    { id: 'sprain', label: 'Post-sprain pain or instability', description: 'Symptoms after an ankle sprain can include swelling, pain and a sense of giving way. Rehabilitation targets strength, balance and confidence.' },
    { id: 'tendon', label: 'Tendon overload', description: 'Pain around the ankle that worsens with walking hills, running or jumping. A graded plan helps restore tendon capacity safely.' },
    { id: 'nerve', label: 'Numbness or tingling', description: 'Pins-and-needles, burning or altered sensation may indicate nerve irritation. Assessment clarifies contributors and guides targeted care.' },
  ],
  syndromes: [
    syn('Achilles tendinitis / tendon rupture', 'Achilles pain can reflect tendon overload or, less commonly, rupture after a sudden load. Assessment focuses on onset, swelling, strength and function to guide safe treatment.'),
    syn('Avulsion fracture', 'A small bone fragment can be pulled off where a tendon or ligament attaches, often after a twist or impact. Imaging may be needed to confirm and guide management.'),
    syn('Gout', 'A sudden, very painful, swollen joint (often the big toe) caused by urate crystal inflammation. Treatment focuses on acute control and prevention when recurrent.'),
    syn('Hammertoe and mallet toe', 'Toe deformities that can cause pressure points, corns and pain in footwear. Treatment may include footwear changes, splinting, orthoses and specialist review when severe.'),
    syn('Morton’s neuroma', 'Forefoot pain or burning between toes due to nerve irritation, often worse in tight shoes. Care includes footwear strategies, load changes and targeted interventions when needed.'),
    syn('Plantar fasciitis', 'Heel pain that is often worse with first steps and improves with movement. Management focuses on progressive loading, calf and foot strengthening, and footwear advice.'),
    syn('Rheumatoid arthritis', 'Inflammatory joint disease can affect the feet and ankles with pain, swelling and stiffness. Coordinated medical care and rehabilitation help protect function and comfort.'),
    syn('Tarsal tunnel syndrome', 'Tingling, burning or shooting pain in the foot due to tibial nerve irritation near the ankle. Treatment may include load modification, footwear changes and targeted care.'),
    syn('Sprained ankle', 'Ligament injury after a twist can lead to pain, swelling and instability. Rehabilitation focuses on strength, balance and confidence to reduce recurrence.'),
    syn('Stress fractures', 'Overuse bone stress can cause focal pain that worsens with activity. Early recognition, load management and imaging when indicated help prevent progression.'),
  ],
  treatments: [TX.corticosteroids, TX.nerveBlock, TX.cryoablation, TX.pharma, TX.prp, TX.radiofrequency],
  help: {
    paragraphs: [
      'Foot and ankle pain has many possible sources, so the assessment — walking pattern, footwear and where the pain sits — is what shapes an effective plan.',
      'Most people improve with load management, strengthening and footwear advice, with targeted procedures used to support rehabilitation and return to activity.',
    ],
    patient: [
      'Note where the pain sits (heel, arch, ankle, forefoot) and whether it is worst on first steps or with specific activity.',
      'Seek urgent care if you cannot bear weight after an injury, or the foot or ankle looks deformed.',
    ],
    clinician: [
      'We assess tendon, ligament, plantar fascia and nerve-related patterns, and combine rehabilitation with image-guided procedures when appropriate.',
      'Referrals noting mechanism, weight-bearing status and imaging help us prioritise.',
    ],
  },
  citations: [
    { label: 'BJSM: Plantar heel pain clinical practice guideline (2019)', url: 'https://bjsm.bmj.com/' },
  ],
};

// Registry — every Pain Medicine speciality keyed by its live route slug, so
// the live route `/specialities/pain-medicine/:slug` (and the base template
// demo) can render any of them from one data source.
export const PAIN_SPECIALITY_BY_SLUG = {
  'head-pain': headPainData,
  'cervical-spine-pain': cervicalSpineData,
  'lumbar-spine-pain': lumbarSpineData,
  'shoulder-pain': shoulderPainData,
  'hand-and-elbow-pain': handElbowData,
  'hip-and-groin-pain': hipGroinData,
  'knee-pain': kneePainData,
  'thoracic-wall-pain': thoracicWallData,
  'abdominal-wall-pain': abdominalWallData,
  'pelvic-and-gynaecological': pelvicData,
  'facial-pain': facialPainData,
  'foot-and-ankle-pain': footAnkleData,
};

/* ------------------------------------------------------------------ *
 * SPORTS MEDICINE ROLLOUT (B1, B3–B6) — service pages (text approaches).
 * Overview + §3 are ✅ validated (mirrored from `conditionContent.ts`).
 * §4 "What we help with", §5 seek-help and §6 approaches are ✍️ draft
 * (from the content doc, to validate clinically).
 * `prevention` reuses the existing injuryPreventionData pilot (B2).
 * ------------------------------------------------------------------ */
const sportsBase = { discipline: 'Sports Medicine', category: 'sports-medicine' };

export const sportsInjuriesData = {
  ...sportsBase,
  title: 'Sports injuries',
  areaLabel: 'sports injuries',
  heroImage: '/assets/images/Hero/Exercise.webp',
  heroSubtitle: 'From sprains to tendon tears, we help athletes return to activity safely.',
  overview: [
    'Sports injuries range from sprains and strains to tendon tears and stress reactions. Understanding the mechanism and load context guides safe return to play.',
    'We assess movement patterns, sport-specific demands and tissue healing timelines to tailor rehabilitation and decide when imaging or procedures may help.',
    'Plans emphasise progressive loading, technique coaching and — when necessary — image-guided interventions to calm pain and support training resumption.',
  ],
  patterns: [
    { id: 'acute', label: 'Acute soft-tissue injury', description: 'Early management focuses on load control and a graded return guided by symptoms and function.' },
    { id: 'tendon', label: 'Tendon overload', description: 'Progressive tendon loading restores capacity while controlling pain and avoiding deconditioning.' },
    { id: 'stress', label: 'Bone stress risk', description: 'Red-flag screening and appropriate imaging or rest if bone stress is suspected.' },
    { id: 'recurrent', label: 'Recurrent strain', description: 'Movement and strength screening to address modifiable risk and build robustness.' },
  ],
  conditionsHeading: 'Common conditions',
  syndromes: [
    syn('Muscle strains & tears', 'Hamstring, calf or quadriceps injuries — sudden pain during sprinting or jumping, sometimes with bruising or weakness.'),
    syn('Ligament sprains', 'Ankle or knee (MCL/ACL) injuries — pain, swelling and instability after a twist, impact or awkward landing.'),
    syn('Tendinopathies', 'Achilles, patellar or rotator cuff — load-related pain that builds over weeks and is stiff at the start of activity.'),
    syn('Bone stress injuries & stress fractures', 'Focal bony pain that worsens with impact, often after a rapid increase in training.'),
    syn('Cartilage & joint injuries', 'Meniscus or labrum injuries — deep joint pain with catching, locking or swelling.'),
    syn('Sports concussion', 'Headache, dizziness, “fogginess” or nausea after a head impact — needs prompt assessment and a graded return.'),
  ],
  seekHelp: [
    'Seek urgent care if you cannot bear weight or use the limb, for obvious deformity, or for a joint that has dislocated.',
    'Get assessed the same day for any suspected concussion — do not return to play until cleared.',
    'Get reviewed for rapid or severe swelling, a “pop” with immediate loss of function, or numbness and pins-and-needles.',
    'Book an assessment for pain that isn’t settling with initial rest, or that keeps recurring.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Staged, criteria-based return-to-sport rehabilitation', text: 'Progressive loading and technique coaching aligned to tissue healing and your sport’s demands.', href: '/treatments/non-invasive-treatments/physiotherapy' },
    { title: 'Image-guided procedures when indicated', text: 'Targeted injections to calm pain so rehabilitation can progress.', href: '/treatments/minimally-invasive-treatments/platelets-rich-plasma-injection' },
    { title: 'Surgical opinion for structural injuries', text: 'Coordinated referral when a structural injury needs a surgical view.', href: '/treatments' },
  ],
  help: {
    paragraphs: [
      'Most sports injuries recover well with the right plan, but the mechanism and load context matter — they shape both the rehabilitation and when imaging or procedures help.',
      'Care emphasises progressive loading and criteria-based clearance so you return to sport confident and less likely to re-injure.',
    ],
    patient: [
      'Tell us the mechanism, your sport and any previous injuries — it guides your assessment and return-to-sport plan.',
      'Get assessed the same day for any suspected concussion, and don’t return to play until cleared.',
    ],
    clinician: [
      'We deliver staged, criteria-based return-to-sport rehabilitation, with image-guided procedures and surgical referral when indicated.',
      'Referrals noting mechanism, imaging and time-loss help us prioritise.',
    ],
  },
  citations: [
    { label: 'BJSM: IOC consensus on acute soft-tissue injury management (2020)', url: 'https://bjsm.bmj.com/' },
  ],
};

export const sportsRehabData = {
  ...sportsBase,
  title: 'Sports rehabilitation',
  areaLabel: 'sports rehabilitation',
  heroImage: '/assets/images/Hero/Physiotherapy.webp',
  heroSubtitle: 'Tailored rehabilitation helps you rebuild strength, control and confidence after injury.',
  overview: [
    'Sports rehabilitation rebuilds capacity through staged strength, control and conditioning, aligned to tissue healing and performance demands.',
    'We integrate pain management when needed so progressive loading remains possible and safe.',
    'Return-to-sport testing supports confident transitions back to training and competition.',
  ],
  presentationHeading: 'What we focus on',
  patterns: [
    { id: 'capacity', label: 'Capacity building', description: 'Staged strength and conditioning with objective progress markers.' },
    { id: 'control', label: 'Motor control', description: 'Technique, balance and coordination tailored to sport-specific tasks.' },
    { id: 'criteria', label: 'Criteria-based progression', description: 'Clear criteria for phase advancement and return to training.' },
    { id: 'prehab', label: 'Prehab for performance', description: 'Preventive strength and mobility work to support upcoming loads.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Post-injury recovery', 'Muscle, ligament or tendon injuries — staged loading aligned to tissue healing.'),
    syn('Post-surgical rehabilitation', 'Structured programmes after joint or spine surgery.'),
    syn('Persistent or recurring symptoms', 'Rebuilding capacity when previous rehabilitation stalled.'),
    syn('Return-to-sport transitions', 'Confidence and criteria-based clearance to train and compete.'),
  ],
  seekHelp: [
    'Start rehabilitation early after an injury or surgery to protect capacity and confidence.',
    'Get reviewed if progress has plateaued, pain flares with each progression, or you feel unready to return.',
    'Ask for a return-to-sport assessment before going back to full training or competition.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Individualised strength & conditioning', text: 'Progressive plans that rebuild capacity where you need it most.', href: '/treatments/non-invasive-treatments/exercise' },
    { title: 'Motor-control & technique work', text: 'Balance, coordination and sport-specific movement retraining.', href: '/treatments/non-invasive-treatments/physiotherapy' },
    { title: 'Pain management to keep loading possible', text: 'Symptom control so progressive rehabilitation stays on track.', href: '/treatments/non-invasive-treatments/pharmacological-pain-management' },
    { title: 'Return-to-sport testing', text: 'Objective, criteria-based clearance before full training and competition.', href: '/treatments/non-invasive-treatments/physiotherapy' },
  ],
  help: {
    paragraphs: [
      'Rehabilitation works best when it starts early and progresses on clear criteria — so capacity, control and confidence rebuild together.',
      'Return-to-sport testing helps you go back to training and competition when you’re genuinely ready, not just pain-free.',
    ],
    patient: [
      'Share your injury, any surgery and your sport goals so the plan targets what matters to you.',
      'Ask for a return-to-sport assessment before going back to full training or competition.',
    ],
    clinician: [
      'We deliver criteria-based strength, motor-control and conditioning programmes with return-to-sport testing.',
      'Referrals noting injury, surgery and current function help us tailor progression.',
    ],
  },
  citations: [
    { label: 'BJSM: Return-to-sport consensus statements', url: 'https://bjsm.bmj.com/' },
  ],
};

export const sportsPerformanceData = {
  ...sportsBase,
  title: 'Sports performance',
  areaLabel: 'sports performance',
  heroImage: '/assets/images/Hero/Exercise.webp',
  heroSubtitle: 'We work with you to optimise strength, control and resilience in your sport.',
  overview: [
    'Performance support aligns strength, conditioning and skill work with recovery and nutrition to sustain adaptation.',
    'We emphasise progressive overload, movement efficiency and monitoring to inform training decisions.',
    'When pain or prior injury exists, performance planning integrates capacity restoration to avoid setbacks.',
  ],
  presentationHeading: 'What we work on',
  patterns: [
    { id: 'strength', label: 'Strength & power', description: 'Programme design to improve force, rate of force and movement efficiency.' },
    { id: 'conditioning', label: 'Conditioning', description: 'Aerobic and anaerobic conditioning tailored to sport-specific demands.' },
    { id: 'monitoring', label: 'Monitoring', description: 'Simple, reliable monitoring to adjust loads and support recovery.' },
    { id: 'integration', label: 'Integration with rehab', description: 'Bridge the gap between rehabilitation and performance training.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Strength & power development', 'Programming for force and movement efficiency.'),
    syn('Endurance & conditioning', 'Aerobic and anaerobic work matched to your sport.'),
    syn('Return from injury to performance', 'Closing the gap between rehabilitation and peak training.'),
    syn('Training load & recovery balance', 'Monitoring to sustain adaptation and avoid setbacks.'),
  ],
  seekHelp: [
    'Book a performance assessment when progress has stalled or you’re preparing for an event.',
    'Get reviewed if performance dips come with fatigue, poor sleep or recurring niggles.',
    'Involve us when returning from injury so performance goals don’t outpace tissue capacity.',
  ],
  treatHeading: 'How we assess & help',
  approaches: [
    { title: 'Biomechanical & performance assessment', text: 'A structured look at how you move and produce force, mapped to your sport.', href: '/treatments/non-invasive-treatments/physiotherapy' },
    { title: 'Periodised strength & conditioning', text: 'Progressive programming for force, power and conditioning.', href: '/treatments/non-invasive-treatments/exercise' },
    { title: 'Recovery & load monitoring', text: 'Guidance on training progression, sleep and recovery to sustain adaptation.', href: '/treatments/non-invasive-treatments/exercise' },
    { title: 'Integration with ongoing rehabilitation', text: 'Bridging rehab and performance so goals don’t outpace tissue capacity.', href: '/treatments/non-invasive-treatments/physiotherapy' },
  ],
  help: {
    paragraphs: [
      'Performance gains come from progressive overload and movement efficiency, balanced with recovery — monitored so training decisions stay informed.',
      'When there’s pain or a prior injury, performance planning integrates capacity restoration to avoid setbacks.',
    ],
    patient: [
      'Share your sport, goals, training history and any injuries so the plan is built around them.',
      'Involve us when returning from injury so performance goals don’t outpace tissue capacity.',
    ],
    clinician: [
      'We deliver periodised strength and conditioning with load and recovery monitoring, integrated with rehabilitation.',
      'Referrals with training context and injury history help us tailor the plan.',
    ],
  },
  citations: [],
};

export const sportsPsychologyData = {
  ...sportsBase,
  title: 'Sports psychology',
  areaLabel: 'sports psychology',
  heroImage: '/assets/images/Hero/Psychology.webp',
  heroSubtitle: 'Psychological support can help with motivation, confidence and returning to sport after injury.',
  overview: [
    'Sports psychology supports motivation, confidence and coping under pressure, especially after injury or performance dips.',
    'We build practical strategies for goal-setting, imagery, arousal regulation and returning to competition.',
    'Our approach is collaborative with coaches and medical staff while protecting athlete wellbeing.',
  ],
  presentationHeading: 'What we support',
  patterns: [
    { id: 'confidence', label: 'Confidence after injury', description: 'Gradual exposure and psychological skills training to reduce fear of re-injury.' },
    { id: 'focus', label: 'Focus & arousal regulation', description: 'Breathing, self-talk and imagery to modulate arousal and improve focus.' },
    { id: 'motivation', label: 'Motivation & adherence', description: 'Structured goals and feedback loops to maintain progress.' },
    { id: 'return', label: 'Return to competition', description: 'Mental readiness plans aligned with physical criteria.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Fear of re-injury', 'Graded exposure and psychological skills to rebuild trust in the body.'),
    syn('Performance anxiety & focus', 'Routines for arousal regulation and concentration under pressure.'),
    syn('Motivation & adherence', 'Goal-setting and feedback to sustain rehabilitation or training.'),
    syn('Adjustment after setbacks', 'Coping support during long recoveries or performance dips.'),
  ],
  seekHelp: [
    'Reach out if fear or anxiety is holding back your return despite physical readiness.',
    'Get support if motivation, mood or sleep are affecting training or recovery.',
    'Contact your GP or emergency services urgently if you ever have thoughts of self-harm — support is available and you don’t have to cope alone.',
  ],
  treatHeading: 'How we assess & help',
  approaches: [
    { title: 'Psychological skills training', text: 'Goal-setting, imagery and self-talk to build confidence and focus.', href: '/treatments/non-invasive-treatments/psychology' },
    { title: 'Arousal regulation & focus routines', text: 'Breathing and attention strategies for performing under pressure.', href: '/treatments/non-invasive-treatments/psychology' },
    { title: 'Collaborative work with coaches & medical team', text: 'Joined-up support that protects wellbeing while you return to sport.', href: '/treatments/non-invasive-treatments/psychology' },
  ],
  help: {
    paragraphs: [
      'The mind is part of recovery and performance — confidence, focus and motivation can be trained just like physical qualities.',
      'We work collaboratively with your coaches and medical team while keeping your wellbeing at the centre.',
    ],
    patient: [
      'Tell us what’s holding you back — fear, focus, motivation or mood — so support targets it.',
      'Contact your GP or emergency services urgently if you ever have thoughts of self-harm — you don’t have to cope alone.',
    ],
    clinician: [
      'We provide psychological skills training and arousal regulation, coordinated with coaches and the medical team.',
      'Referrals noting readiness concerns and any mood or sleep changes help us prioritise.',
    ],
  },
  citations: [
    { label: 'APA Division 47: Sport, Exercise & Performance Psychology resources', url: 'https://www.apa.org/' },
  ],
};

export const sportsNutritionData = {
  ...sportsBase,
  title: 'Sports nutrition',
  areaLabel: 'sports nutrition',
  heroImage: '/assets/images/Hero/Nutrition.webp',
  heroSubtitle: 'Tailored nutrition helps you fuel training, recovery and long-term performance.',
  overview: [
    'Sports nutrition optimises training adaptation, recovery and body composition while considering health and performance goals.',
    'We customise fuelling around sessions and events, and address energy availability, hydration and supplementation when appropriate.',
    'Plans integrate medical considerations and are monitored for safety and effectiveness.',
  ],
  presentationHeading: 'What we assess',
  patterns: [
    { id: 'fuelling', label: 'Session fuelling', description: 'Carbohydrate and protein timing aligned to training load and goals.' },
    { id: 'recovery', label: 'Recovery nutrition', description: 'Hydration and nutrition strategies to support adaptation and the next session.' },
    { id: 'energy', label: 'Energy availability', description: 'Screening and management to avoid the consequences of low energy availability.' },
    { id: 'supplements', label: 'Evidence-based supplements', description: 'Limited, safe, evidence-supported supplementation when appropriate.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Fuelling for training & competition', 'Carbohydrate and protein timing around sessions.'),
    syn('Recovery & adaptation', 'Hydration and nutrition to support the next session.'),
    syn('Low energy availability (RED-S)', 'Screening and management to protect health and performance.'),
    syn('Body composition goals', 'Safe strategies aligned with performance and health.'),
  ],
  seekHelp: [
    'Book an assessment if you feel under-fuelled, are losing performance, or recovering poorly.',
    'Get reviewed for unintended weight change, frequent illness, or (in athletes) menstrual changes — possible signs of low energy availability.',
    'Speak to us before trying supplements so choices are safe and evidence-based.',
    'If eating patterns ever feel out of control or distressing, we can help you find the right specialist support.',
  ],
  treatHeading: 'How we assess & help',
  approaches: [
    { title: 'Individualised fuelling plans', text: 'Carbohydrate and protein timing around your training and events.', href: '/treatments/non-invasive-treatments/nutrition' },
    { title: 'Recovery & hydration strategies', text: 'Nutrition to support adaptation and the next session.', href: '/treatments/non-invasive-treatments/nutrition' },
    { title: 'Energy-availability screening', text: 'Screening and management to protect health and performance.', href: '/treatments/non-invasive-treatments/nutrition' },
    { title: 'Supplement review', text: 'Safe, evidence-based choices tailored to you.', href: '/treatments/non-invasive-treatments/nutrition' },
  ],
  help: {
    paragraphs: [
      'Good nutrition underpins training adaptation, recovery and health — the plan works best when it’s built around your sessions, events and goals.',
      'We integrate medical considerations and monitor for safety, including screening for low energy availability.',
    ],
    patient: [
      'Share your training, events and goals so fuelling and recovery are built around them.',
      'If eating patterns ever feel out of control or distressing, tell us — we can help you find the right support.',
    ],
    clinician: [
      'We deliver individualised fuelling and recovery plans, energy-availability screening and evidence-based supplement review.',
      'Referrals noting training load, weight changes and any health concerns help us prioritise.',
    ],
  },
  citations: [
    { label: 'IOC Consensus: Dietary supplements and the high-performance athlete', url: 'https://bjsm.bmj.com/' },
  ],
};

// Sports Medicine registry, keyed by live route slug (prevention reuses B2).
export const SPORTS_SPECIALITY_BY_SLUG = {
  injuries: sportsInjuriesData,
  prevention: injuryPreventionData,
  rehabilitation: sportsRehabData,
  performance: sportsPerformanceData,
  psychology: sportsPsychologyData,
  nutrition: sportsNutritionData,
};

/* ------------------------------------------------------------------ *
 * STROKE MEDICINE ROLLOUT (C2–C11) — service pages (text approaches).
 * Overview + §3 are ✅ validated (mirrored from `conditionContent.ts`).
 * §4, §5 seek-help (FAST where relevant), §6 approaches and patient/
 * clinician are ✍️ draft (from the content doc), to validate clinically.
 * `rehabilitation` reuses the existing strokeRehabData pilot (C1).
 * ------------------------------------------------------------------ */
const strokeBase = { discipline: 'Stroke Medicine', category: 'stroke-medicine' };
const NIT = '/treatments/non-invasive-treatments';
const MIT = '/treatments/minimally-invasive-treatments';

export const strokePreventionData = {
  ...strokeBase,
  title: 'Clinical and secondary prevention of stroke',
  areaLabel: 'stroke prevention',
  heroImage: '/assets/images/Hero/OccupationalTherapy.webp',
  heroSubtitle: 'Careful assessment and prevention planning can lower the risk of another stroke.',
  overview: [
    'Secondary prevention aims to reduce the risk of recurrent stroke or TIA through medication optimisation and lifestyle interventions.',
    'We work with your medical team to address blood pressure, lipids, antithrombotic therapy and risk factors such as smoking and diabetes.',
    'Education and coordinated follow-up support adherence and long-term risk reduction.',
  ],
  presentationHeading: 'What we manage',
  patterns: [
    { id: 'bp', label: 'Blood pressure & lipids', description: 'Optimise targets according to contemporary guidelines and comorbidities.' },
    { id: 'antithrombotic', label: 'Antithrombotic therapy', description: 'Use antiplatelet or anticoagulation as indicated by stroke mechanism.' },
    { id: 'lifestyle', label: 'Lifestyle change', description: 'Support smoking cessation, activity, diet and sleep.' },
    { id: 'adherence', label: 'Adherence & follow-up', description: 'Education and review to maintain long-term prevention gains.' },
  ],
  conditionsHeading: 'Risk factors we address',
  syndromes: [
    syn('High blood pressure', 'The biggest modifiable risk for recurrent stroke.'),
    syn('Cholesterol & vascular risk', 'Lipid management and vascular protection.'),
    syn('Irregular heart rhythm (atrial fibrillation)', 'Anticoagulation when indicated by stroke mechanism.'),
    syn('Diabetes, smoking & lifestyle', 'Coordinated support to reduce overall risk.'),
  ],
  seekHelp: [
    'Call emergency services for any new stroke or TIA signs — Face drooping, Arm weakness, Speech difficulty, Time to call (FAST) — even if symptoms pass quickly.',
    'Get reviewed if blood pressure is high, you miss doses, or you have medication side effects.',
    'Book a review to plan lifestyle changes (smoking, activity, diet) after a stroke or TIA.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Medication optimisation with your medical team', text: 'Antithrombotic, blood-pressure and lipid therapy tailored to your stroke mechanism.' },
    { title: 'Blood-pressure & lipid targets', text: 'Guideline-informed targets reviewed against your comorbidities.' },
    { title: 'Lifestyle support', text: 'Help with smoking cessation, activity, diet and sleep.' },
    { title: 'Structured follow-up', text: 'Education and review to sustain long-term prevention gains.' },
  ],
  help: {
    paragraphs: [
      'After a stroke or TIA, structured secondary prevention is one of the most effective ways to reduce the risk of another event.',
      'We coordinate with your medical team to optimise medication and support the lifestyle changes that protect you long term.',
    ],
    patient: [
      'Bring your medication list and recent blood-pressure readings, and tell us about smoking, activity and diet.',
      'Call emergency services for any new stroke/TIA signs (FAST), even if they pass quickly.',
    ],
    clinician: [
      'We optimise blood pressure, lipids and antithrombotic therapy with your medical team and support lifestyle change.',
      'Referrals with stroke mechanism, risk factors and current medications streamline prevention.',
    ],
  },
  citations: [
    { label: 'AHA/ASA Guideline for the Prevention of Stroke in Patients With Stroke & TIA (2021)', url: 'https://www.ahajournals.org/' },
  ],
};

export const feedingAutonomyData = {
  ...strokeBase,
  title: 'Feeding autonomy',
  areaLabel: 'feeding autonomy after stroke',
  heroImage: '/assets/images/Hero/OccupationalTherapy.webp',
  heroSubtitle: 'We help you regain safe, confident eating and drinking after stroke.',
  overview: [
    'Feeding autonomy focuses on safe, independent eating and drinking after stroke while managing dysphagia risk.',
    'We coordinate swallow assessment, texture modifications, posture, and caregiver training as needed.',
    'Goals emphasise safety, nutrition and dignity while advancing towards independence.',
  ],
  presentationHeading: 'What we work on',
  patterns: [
    { id: 'swallow', label: 'Swallow safety', description: 'Speech-language assessment, posture and texture modifications to reduce aspiration risk.' },
    { id: 'posture', label: 'Positioning', description: 'Optimise seating and head position to support safe swallowing.' },
    { id: 'training', label: 'Caregiver training', description: 'Education on safe feeding techniques and monitoring signs of difficulty.' },
    { id: 'progression', label: 'Diet progression', description: 'Gradual changes guided by objective assessment and tolerance.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Dysphagia (swallowing difficulty)', 'Assessment and strategies to reduce choking and aspiration risk.'),
    syn('Difficulty self-feeding', 'Adaptive techniques and equipment to regain independence.'),
    syn('Texture & diet needs', 'Safe food and fluid modifications guided by assessment.'),
    syn('Nutrition & hydration risk', 'Monitoring intake while advancing independence.'),
  ],
  seekHelp: [
    'Seek urgent care for choking, coughing or a wet or gurgly voice during or after eating, or a chest infection after meals.',
    'Get reviewed for weight loss, dehydration, or avoiding food and drink due to swallowing fears.',
    'Ask for a swallow assessment before changing food textures at home.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Swallow assessment', text: 'Speech-and-language assessment to gauge safety and guide the plan.', href: `${NIT}/speech-therapy` },
    { title: 'Posture & safe-feeding techniques', text: 'Positioning and techniques that reduce aspiration risk.', href: `${NIT}/occupational-therapy` },
    { title: 'Texture modification & diet progression', text: 'Safe food and fluid changes advanced as tolerance improves.', href: `${NIT}/speech-therapy` },
    { title: 'Caregiver training', text: 'Education on safe feeding and spotting signs of difficulty.', href: `${NIT}/occupational-therapy` },
  ],
  help: {
    paragraphs: [
      'Safe eating and drinking is central to recovery, nutrition and dignity — and it can improve with the right assessment and strategies.',
      'We advance towards independence carefully, keeping safety and nutrition protected at every step.',
    ],
    patient: [
      'Tell us about any coughing, choking or difficulty with certain foods or fluids, and who supports you at meals.',
      'Seek urgent care for choking, a wet or gurgly voice after eating, or a chest infection after meals.',
    ],
    clinician: [
      'We provide swallow assessment, safe-feeding strategies, texture guidance and caregiver training.',
      'Referrals noting swallow status, nutrition risk and current diet help us plan safely.',
    ],
  },
  citations: [],
};

export const speechAutonomyData = {
  ...strokeBase,
  title: 'Speech autonomy',
  areaLabel: 'speech autonomy after stroke',
  heroImage: '/assets/images/Hero/SpeechTherapy.webp',
  heroSubtitle: 'Targeted therapy supports communication, understanding and confidence after stroke.',
  overview: [
    'Speech autonomy supports communication and swallowing after stroke, including aphasia, dysarthria and apraxia of speech.',
    'We build personalised therapy around functional goals with assistive strategies and caregiver involvement.',
    'We coordinate with medical teams to monitor progress and adjust the plan as needs evolve.',
  ],
  patterns: [
    { id: 'aphasia', label: 'Aphasia', description: 'Impairment in language affecting speaking, comprehension, reading or writing.' },
    { id: 'dysarthria', label: 'Dysarthria', description: 'Motor speech difficulties due to weakness or incoordination.' },
    { id: 'apraxia', label: 'Apraxia of speech', description: 'Difficulty planning and sequencing the movements needed for speech.' },
    { id: 'swallow', label: 'Dysphagia', description: 'Swallowing difficulty requiring safety strategies and supervised progression.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Aphasia', 'Trouble finding words, understanding, reading or writing; therapy targets functional communication.'),
    syn('Dysarthria', 'Slurred or effortful speech from muscle weakness; work on clarity and strategies.'),
    syn('Apraxia of speech', 'Difficulty planning speech movements; structured practice to rebuild sequencing.'),
    syn('Dysphagia', 'Swallowing difficulty needing safety strategies and supervised progression.'),
  ],
  seekHelp: [
    'Call emergency services for sudden new speech difficulty — Face drooping, Arm weakness, Speech difficulty, Time to call (FAST) — it can be a sign of stroke.',
    'Get reviewed if communication frustration is affecting mood, relationships or independence.',
    'Seek a swallow assessment if eating or drinking feels unsafe.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Individualised speech-and-language therapy', text: 'Therapy targeting the communication skills that matter most to you.', href: `${NIT}/speech-therapy` },
    { title: 'Functional communication strategies', text: 'Practical strategies and assistive tools for everyday situations.', href: `${NIT}/speech-therapy` },
    { title: 'Caregiver involvement', text: 'Supporting families to help communication carry over at home.', href: `${NIT}/speech-therapy` },
  ],
  help: {
    paragraphs: [
      'Communication is central to independence and wellbeing — and targeted speech-and-language therapy can rebuild it after stroke.',
      'We build therapy around the situations that matter most to you, with family involved so progress carries into daily life.',
    ],
    patient: [
      'Let us know how communication or swallowing has changed and what situations matter most to you.',
      'Call emergency services for sudden new speech difficulty (FAST); seek a swallow review if eating feels unsafe.',
    ],
    clinician: [
      'We deliver individualised speech-and-language therapy targeting functional communication, with swallow safety where needed.',
      'Referrals with communication/swallow status and goals help us tailor therapy.',
    ],
  },
  citations: [],
};

export const cognitiveAutonomyData = {
  ...strokeBase,
  title: 'Cognitive autonomy',
  areaLabel: 'cognitive autonomy after stroke',
  heroImage: '/assets/images/Hero/Psychology.webp',
  heroSubtitle: 'Rebuilding memory, attention and everyday thinking skills to support independence after stroke.',
  overview: [
    'Cognitive autonomy supports the thinking skills people rely on for everyday independence after stroke — memory, attention, planning, orientation and perception.',
    'We assess how these changes affect daily activities and build a personalised plan with practical strategies, compensatory tools and graded practice.',
    'Therapy is coordinated with the wider team and with family, so progress carries over into real-life routines at home and in the community.',
  ],
  patterns: [
    { id: 'memory', label: 'Memory', description: 'Difficulty forming or recalling new information, supported with routines, cues and memory aids.' },
    { id: 'attention', label: 'Attention & concentration', description: 'Reduced focus or mental fatigue, addressed through pacing, environment changes and graded tasks.' },
    { id: 'executive', label: 'Executive function', description: 'Planning, problem-solving and initiation difficulties, rebuilt through structured, goal-based practice.' },
    { id: 'perception', label: 'Perception & awareness', description: 'Spatial neglect and perceptual changes, managed with scanning strategies and safety adaptations.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Memory difficulties', 'Routines, cues and aids to support daily recall.'),
    syn('Attention & mental fatigue', 'Pacing and environment strategies to sustain focus.'),
    syn('Planning & problem-solving', 'Goal-based practice to rebuild executive skills.'),
    syn('Spatial neglect & perception', 'Scanning strategies and safety adaptations.'),
  ],
  seekHelp: [
    'Get reviewed if memory, attention or planning problems affect safety, work or daily tasks.',
    'Seek urgent care for sudden new confusion or a sudden change in awareness (possible new event).',
    'Ask for support if cognitive fatigue is limiting rehabilitation progress.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Cognitive assessment', text: 'Understanding how thinking changes affect your daily life.', href: `${NIT}/occupational-therapy` },
    { title: 'Compensatory strategies & aids', text: 'Routines, cues and tools that support memory and attention.', href: `${NIT}/occupational-therapy` },
    { title: 'Graded, goal-based practice', text: 'Structured practice to rebuild planning and problem-solving.', href: `${NIT}/psychology` },
    { title: 'Carryover with family and team', text: 'Making progress stick in real-life routines at home.', href: `${NIT}/occupational-therapy` },
  ],
  help: {
    paragraphs: [
      'Thinking skills underpin everyday independence — and memory, attention and planning can improve with strategies and graded practice.',
      'We coordinate with your family and wider team so gains carry over into real-life routines.',
    ],
    patient: [
      'Note where memory, attention or planning cause difficulty in daily life, and bring a family member if helpful.',
      'Seek urgent care for sudden new confusion or a change in awareness.',
    ],
    clinician: [
      'We assess cognition and deliver compensatory strategies and graded, goal-based practice with family carryover.',
      'Referrals with cognitive findings and functional impact help us prioritise.',
    ],
  },
  citations: [],
};

export const moodDisordersData = {
  ...strokeBase,
  title: 'Post-stroke depression and mood disorders',
  areaLabel: 'post-stroke mood disorders',
  heroImage: '/assets/images/Hero/Psychology.webp',
  heroSubtitle: 'Emotional changes after stroke are common; specialist support can help you adjust.',
  overview: [
    'Mood disorders after stroke are common and treatable. We screen for depression and anxiety and coordinate care across teams.',
    'Management includes psychoeducation, psychological therapies and medication when indicated, with monitoring for response and safety.',
    'Family and caregiver support is integral to recovery and quality of life.',
  ],
  patterns: [
    { id: 'depression', label: 'Depression', description: 'Persistent low mood, anhedonia and fatigue affecting recovery and engagement.' },
    { id: 'anxiety', label: 'Anxiety', description: 'Excessive worry, restlessness and physiological symptoms that can impede participation.' },
    { id: 'adjustment', label: 'Adjustment difficulties', description: 'Coping with functional changes after stroke with tailored support.' },
    { id: 'sleep', label: 'Sleep disturbance', description: 'Addressing sleep as part of a holistic mood management plan.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Depression', 'Persistent low mood, loss of interest and fatigue affecting recovery.'),
    syn('Anxiety', 'Worry, restlessness and physical symptoms that limit participation.'),
    syn('Emotional adjustment', 'Coping with changes in identity, role and independence.'),
    syn('Sleep problems', 'Addressing sleep as part of mood and recovery.'),
  ],
  seekHelp: [
    'Reach out if low mood, anxiety or hopelessness last more than two weeks or affect daily life.',
    'Contact your GP or emergency services urgently if you have thoughts of harming yourself — support is available and you don’t have to cope alone.',
    'Involve family or carers early — mood changes are common after stroke and are treatable.',
  ],
  cta: {
    heading: 'You don’t have to cope alone',
    body: 'Book a consultation and our team will support you and your family with a plan built around your recovery and wellbeing.',
    primaryLabel: 'Book a consultation',
    primaryHref: '/contact',
  },
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Psychoeducation', text: 'Understanding mood changes after stroke and what helps.', href: `${NIT}/psychology` },
    { title: 'Psychological therapies', text: 'Evidence-based therapy for low mood and anxiety.', href: `${NIT}/psychology` },
    { title: 'Medication when indicated', text: 'Coordinated with your medical team, with monitoring for response and safety.' },
    { title: 'Family & carer support', text: 'Involving those around you to sustain recovery and quality of life.', href: `${NIT}/psychology` },
  ],
  help: {
    paragraphs: [
      'Emotional changes after stroke are common and treatable — low mood, anxiety and adjustment difficulties respond well to the right support.',
      'We screen, coordinate care across teams, and involve family so recovery and quality of life are protected.',
    ],
    patient: [
      'It helps to note changes in mood, worry, sleep or motivation, and how they affect daily life.',
      'Contact your GP or emergency services urgently if you have thoughts of harming yourself — you don’t have to cope alone.',
    ],
    clinician: [
      'We screen and coordinate psychoeducation, psychological therapy and medication when indicated, with carer support.',
      'Referrals noting mood symptoms, risk and current treatment help us respond promptly.',
    ],
  },
  citations: [],
};

export const medicalComplicationsData = {
  ...strokeBase,
  title: 'Medical complications post-stroke',
  areaLabel: 'post-stroke medical complications',
  heroImage: '/assets/images/Hero/HomeCare.webp',
  heroSubtitle: 'We monitor and manage complications so that your recovery stays on track.',
  overview: [
    'Medical complications post-stroke (for example infections, DVT, pressure injuries) can impede rehabilitation and must be proactively managed.',
    'We coordinate surveillance and communication with medical teams to reduce avoidable complications and support early interventions.',
    'Education empowers patients and caregivers to recognise warning signs and seek timely care.',
  ],
  patterns: [
    { id: 'infection', label: 'Infection risk', description: 'Monitor for pneumonia, UTI and other infections; encourage mobility, hydration and hygiene.' },
    { id: 'thrombo', label: 'Thromboembolism', description: 'Encourage early mobility and appropriate prophylaxis per medical advice.' },
    { id: 'pressure', label: 'Pressure injuries', description: 'Positioning, skin checks and equipment to reduce risk.' },
    { id: 'malnutrition', label: 'Malnutrition / dehydration', description: 'Screening and nutrition support integrated with rehabilitation.' },
  ],
  conditionsHeading: 'What we help prevent & manage',
  syndromes: [
    syn('Chest & urinary infections', 'Early mobility, hydration and prompt treatment.'),
    syn('Blood clots (DVT / PE)', 'Mobility and prophylaxis per medical advice.'),
    syn('Pressure injuries', 'Positioning, skin checks and equipment.'),
    syn('Malnutrition & dehydration', 'Screening and nutrition support alongside rehabilitation.'),
  ],
  seekHelp: [
    'Seek urgent care for fever, breathlessness, a swollen or painful calf, chest pain, or a new or worsening skin wound.',
    'Get reviewed for reduced intake, confusion, or a sudden drop in function.',
    'Ask carers to watch for early warning signs during recovery.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Proactive surveillance', text: 'Monitoring for the complications that most often interrupt recovery.', href: `${NIT}/home-care` },
    { title: 'Coordination with medical teams', text: 'Joined-up communication so problems are caught and treated early.' },
    { title: 'Early mobilisation', text: 'Movement and positioning to reduce infection, clot and pressure risk.', href: `${NIT}/occupational-therapy` },
    { title: 'Patient & carer education', text: 'Recognising warning signs and seeking timely care.', href: `${NIT}/home-care` },
  ],
  help: {
    paragraphs: [
      'Preventing and catching complications early keeps rehabilitation on track and protects recovery.',
      'We support proactive surveillance and quick coordination with medical teams, and help carers recognise warning signs.',
    ],
    patient: [
      'Ask carers to watch for warning signs (fever, breathlessness, calf swelling, skin changes, reduced intake).',
      'Seek urgent care for fever, breathlessness, chest pain, a swollen painful calf, or a new skin wound.',
    ],
    clinician: [
      'We support proactive surveillance and early intervention in coordination with medical teams.',
      'Referrals noting current complications, risk factors and mobility status help us focus.',
    ],
  },
  citations: [],
};

export const spasticityData = {
  ...strokeBase,
  title: 'Post-stroke spasticity',
  areaLabel: 'post-stroke spasticity',
  heroImage: '/assets/images/Hero/Physiotherapy.webp',
  heroSubtitle: 'Spasticity management can ease stiffness, improve comfort and support movement.',
  overview: [
    'Spasticity after stroke can impair movement and function. Management blends therapy with medications and injections when indicated.',
    'We prioritise functional goals, positioning and splinting, and coordinate botulinum toxin or other interventions in selected cases.',
    'Progress is measured by comfort, ease of care and participation in rehabilitation tasks.',
  ],
  patterns: [
    { id: 'goals', label: 'Goal-oriented care', description: 'Define meaningful functional goals for any intervention considered.' },
    { id: 'therapy', label: 'Therapy & positioning', description: 'Optimise range, comfort and limb care; splinting as appropriate.' },
    { id: 'botox', label: 'Chemodenervation', description: 'Botulinum toxin or phenol in selected cases with clear goals and follow-up.' },
    { id: 'review', label: 'Review & adjust', description: 'Monitor effect and adjust the plan, educating patients and caregivers.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Muscle tightness & stiffness', 'Limiting movement, comfort and care.'),
    syn('Painful spasms', 'Interfering with sleep, positioning and daily tasks.'),
    syn('Contracture risk', 'Reduced range that can become fixed without management.'),
    syn('Difficulty with hygiene / dressing', 'Where tightness affects limb care.'),
  ],
  seekHelp: [
    'Get reviewed if tightness is limiting movement, causing pain, or making washing and dressing difficult.',
    'Seek prompt care for a sudden increase in stiffness with skin breakdown, pain, or a possible infection (which can worsen spasticity).',
    'Ask about treatment options if stretching and therapy alone aren’t enough.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Goal-based therapy & positioning', text: 'Therapy, positioning and splinting focused on your functional goals.', href: `${NIT}/physiotherapy` },
    { title: 'Chemodenervation in selected cases', text: 'Botulinum toxin when it supports clear, agreed goals, with follow-up.', href: `${MIT}/botulin-toxin-injection` },
    { title: 'Regular review', text: 'Monitoring effect and adjusting the plan with you and your carers.', href: `${NIT}/physiotherapy` },
  ],
  help: {
    paragraphs: [
      'Spasticity can limit movement, comfort and care — but a goal-based plan of therapy, positioning and, when needed, injections can help.',
      'We measure progress by what matters: comfort, ease of care and participation in rehabilitation.',
    ],
    patient: [
      'Note where tightness limits movement, comfort, or washing and dressing, and what your goals are.',
      'Seek prompt care for a sudden increase in stiffness with pain, skin breakdown or possible infection.',
    ],
    clinician: [
      'We set functional goals and combine therapy, positioning, splinting and chemodenervation in selected cases.',
      'Referrals noting distribution, functional impact and prior treatments help target care.',
    ],
  },
  citations: [],
};

export const crpsData = {
  ...strokeBase,
  title: 'Complex Regional Pain Syndrome',
  areaLabel: 'complex regional pain syndrome',
  heroImage: '/assets/images/Hero/PeripheralNerveBlocks.webp',
  heroSubtitle: 'Early, coordinated treatment can reduce pain and protect function.',
  overview: [
    'Complex Regional Pain Syndrome (CRPS) is a chronic pain condition often following injury or immobilisation, marked by pain disproportionate to the inciting event.',
    'Management emphasises education, graded exposure, desensitisation, and — when needed — medication and interventional pain approaches.',
    'Early recognition and coordinated care improve outcomes and limit disability.',
  ],
  patterns: [
    { id: 'sensory', label: 'Sensory disturbance', description: 'Allodynia, hyperalgesia and temperature changes are common features.' },
    { id: 'motor', label: 'Motor changes', description: 'Stiffness and weakness require careful graded re-activation.' },
    { id: 'autonomic', label: 'Autonomic signs', description: 'Colour, temperature or asymmetry may be present and fluctuate.' },
    { id: 'psychosocial', label: 'Psychosocial impact', description: 'Address mood, sleep and coping to support recovery.' },
  ],
  conditionsHeading: 'Common features',
  syndromes: [
    syn('Pain out of proportion', 'Burning pain and extreme sensitivity to touch (allodynia).'),
    syn('Skin & temperature changes', 'Colour, temperature or swelling differences in the limb.'),
    syn('Stiffness & weakness', 'Reduced movement needing careful graded re-activation.'),
    syn('Impact on mood & sleep', 'Addressed as part of recovery.'),
  ],
  seekHelp: [
    'Get reviewed early for persistent burning pain, swelling and sensitivity after an injury, surgery or immobilisation — early recognition improves outcomes.',
    'Seek prompt care for rapidly worsening colour or temperature changes or signs of infection.',
    'Ask for a pain-medicine assessment if pain is spreading or not settling as expected.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Education & reassurance', text: 'Understanding CRPS is the first step to managing it well.', href: `${NIT}/physiotherapy` },
    { title: 'Graded exposure & desensitisation', text: 'Rehabilitation that rebuilds movement and tolerance gradually.', href: `${NIT}/physiotherapy` },
    { title: 'Medication & interventional pain options', text: 'Neuropathic medication and nerve-focused procedures when needed.', href: `${MIT}/peripheral-nerve-block` },
    { title: 'Pharmacological management', text: 'Targeted medicines as part of a broader plan.', href: `${NIT}/pharmacological-pain-management` },
  ],
  help: {
    paragraphs: [
      'CRPS responds best to early, coordinated care — education, graded rehabilitation and, when needed, medication and interventional options.',
      'Recognising it early and starting a plan protects movement and limits long-term disability.',
    ],
    patient: [
      'Note when the pain started (after injury, surgery or immobilisation) and any skin, temperature or swelling changes.',
      'Seek early review for persistent burning pain and sensitivity — early recognition improves outcomes.',
    ],
    clinician: [
      'We apply Budapest-criteria-informed assessment and combine graded exposure, rehabilitation and interventional options.',
      'Early referrals with symptom onset and features improve outcomes.',
    ],
  },
  citations: [],
};

export const posturalMotorData = {
  ...strokeBase,
  title: 'Postural and motor control autonomy',
  areaLabel: 'postural and motor control autonomy',
  heroImage: '/assets/images/Hero/Physiotherapy.webp',
  heroSubtitle: 'We focus on balance, coordination and safe movement in everyday life.',
  overview: [
    'Postural and motor control autonomy focuses on regaining safe, independent movement and balance after stroke.',
    'Training targets trunk and limb control, sit-to-stand, stepping and gait with task-specific practice and progression.',
    'Assistive devices are used judiciously and tapered as capacity improves.',
  ],
  patterns: [
    { id: 'balance', label: 'Balance training', description: 'Progress balance tasks safely with appropriate challenge.' },
    { id: 'gait', label: 'Gait re-training', description: 'Task-specific stepping and gait drills with feedback.' },
    { id: 'strength', label: 'Strength and endurance', description: 'Progressive resistance and aerobic work for overall autonomy.' },
    { id: 'device', label: 'Assistive devices', description: 'Selection and tapering of aids as function returns.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Balance & falls risk', 'Safe, progressive balance training.'),
    syn('Walking difficulties', 'Task-specific gait re-training.'),
    syn('Trunk & limb control', 'Regaining sit-to-stand, reaching and stepping.'),
    syn('Reduced strength & endurance', 'Building capacity for everyday activity.'),
  ],
  seekHelp: [
    'Get reviewed after any fall, or if balance or walking is limiting independence or confidence.',
    'Seek urgent care for a sudden change in movement or a new inability to stand or walk.',
    'Ask for a mobility assessment before adjusting or stopping walking aids.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Balance & gait re-training', text: 'Progressive, safe practice of balance, stepping and walking.', href: `${NIT}/physiotherapy` },
    { title: 'Task-specific practice with feedback', text: 'Everyday movements practised and progressed with feedback.', href: `${NIT}/physiotherapy` },
    { title: 'Progressive strength & endurance', text: 'Building the capacity that underpins everyday autonomy.', href: `${NIT}/exercise` },
    { title: 'Appropriate assistive devices', text: 'Aids selected and tapered as function returns.', href: `${NIT}/physiotherapy` },
  ],
  help: {
    paragraphs: [
      'Safe, independent movement is the foundation of everyday autonomy — balance, walking and control can be rebuilt with task-specific practice.',
      'We use assistive devices judiciously and taper them as your capacity improves.',
    ],
    patient: [
      'Tell us about any falls, and where balance or walking limits your confidence and independence.',
      'Get reviewed after any fall; seek urgent care for a sudden change in movement or inability to stand or walk.',
    ],
    clinician: [
      'We deliver balance and gait re-training with task-specific practice and appropriate assistive devices.',
      'Referrals with mobility status, falls history and goals help us prioritise.',
    ],
  },
  citations: [],
};

export const communityReintegrationData = {
  ...strokeBase,
  title: 'Community reintegration',
  areaLabel: 'community reintegration after stroke',
  heroImage: '/assets/images/Hero/HomeCare.webp',
  heroSubtitle: 'Rehabilitation helps you return to family, work and community roles.',
  overview: [
    'Community reintegration supports return to home, work, leisure and social participation after stroke.',
    'We identify environmental barriers, build confidence in real-world tasks, and coordinate supports and transport where needed.',
    'Education and peer or community links help maintain momentum beyond formal therapy.',
  ],
  patterns: [
    { id: 'adl', label: 'Activities of daily living', description: 'Independence in personal care, household tasks and community activities.' },
    { id: 'transport', label: 'Transport & access', description: 'Plan for safe transport, mobility and community access.' },
    { id: 'work', label: 'Return to work', description: 'Graded returns with employer and team liaison where appropriate.' },
    { id: 'social', label: 'Social participation', description: 'Build routines and connections that support wellbeing and independence.' },
  ],
  conditionsHeading: 'What we help with',
  syndromes: [
    syn('Daily living independence', 'Personal care and household tasks.'),
    syn('Getting around', 'Transport, mobility and community access.'),
    syn('Return to work or study', 'Graded plans with employer or education liaison.'),
    syn('Social & leisure participation', 'Rebuilding routines and connections.'),
  ],
  seekHelp: [
    'Ask for support when planning return to home, work, driving or leisure after stroke.',
    'Get reviewed if isolation, low mood or fatigue are limiting participation.',
    'Involve family and carers to plan practical supports and access.',
  ],
  treatHeading: 'How we assess & treat',
  approaches: [
    { title: 'Goal-based occupational therapy', text: 'Building confidence in the real-world tasks that matter to you.', href: `${NIT}/occupational-therapy` },
    { title: 'Environmental & access planning', text: 'Identifying and reducing barriers at home and in the community.', href: `${NIT}/home-care` },
    { title: 'Work & education liaison', text: 'Graded return plans with employer or education support.', href: `${NIT}/occupational-therapy` },
    { title: 'Community & peer links', text: 'Connections that help sustain momentum beyond therapy.', href: `${NIT}/home-care` },
  ],
  help: {
    paragraphs: [
      'Returning to home, work, leisure and social life is where recovery becomes real — and it is supported with practical, goal-based help.',
      'We plan around your goals and barriers, and connect you with supports that sustain momentum beyond formal therapy.',
    ],
    patient: [
      'Share your goals for home, work, driving or leisure, and any practical barriers you’re facing.',
      'Ask for support early when planning a return, especially if fatigue or low mood are limiting you.',
    ],
    clinician: [
      'We provide goal-based occupational therapy, access planning and work/education liaison.',
      'Referrals noting functional status, goals and support needs help us plan reintegration.',
    ],
  },
  citations: [],
};

// Stroke Medicine registry, keyed by live route slug (rehabilitation reuses C1).
export const STROKE_SPECIALITY_BY_SLUG = {
  rehabilitation: strokeRehabData,
  'clinical-and-secondary-prevention-of-stroke': strokePreventionData,
  'feeding-autonomy': feedingAutonomyData,
  'speech-autonomy': speechAutonomyData,
  'cognitive-autonomy': cognitiveAutonomyData,
  'post-stroke-depression-and-mood-disorders': moodDisordersData,
  'medical-complications-post-stroke': medicalComplicationsData,
  'post-stroke-spasticity': spasticityData,
  'complex-regional-pain-syndrome': crpsData,
  'postural-and-motor-control-autonomy': posturalMotorData,
  'community-reintegration': communityReintegrationData,
};
