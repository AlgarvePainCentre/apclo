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
  title: 'Head pain',
  heroImage: '/assets/images/Hero/HeadPain.webp',
  heroSubtitle:
    'Headache and facial pain syndromes can be disabling — but many respond well to targeted diagnosis and treatment.',
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
  treatments: [
    { name: 'Botulinum toxin injection', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/botulin-toxin-injection', img: '/assets/images/Hero/BotulinToxinInjection.webp' },
    { name: 'Peripheral nerve block', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/peripheral-nerve-block', img: '/assets/images/Hero/PeripheralNerveBlocks.webp' },
    { name: 'Radiofrequency', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/radiofrequency', img: '/assets/images/Hero/RadiofrequencyAblation.webp' },
    { name: 'Pharmacological pain management', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/pharmacological-pain-management', img: '/assets/images/Hero/PharmacologicalPainManagement.webp' },
    { name: 'Physiotherapy', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/physiotherapy', img: '/assets/images/Hero/Physiotherapy.webp' },
    { name: 'Psychology', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/psychology', img: '/assets/images/Hero/Psychology.webp' },
  ],
  guidance: [
    'Keep a simple headache diary for 2–4 weeks (frequency, duration, triggers and medication use). This improves diagnostic accuracy and treatment selection.',
    'Seek urgent medical attention for a “worst-ever” or sudden thunderclap headache, new neurological symptoms, or headache with fever and neck stiffness.',
  ],
  story: {
    quote: 'After years of frequent migraines, a clear plan finally gave me control back. I know what to do and the attacks are far less frequent.',
    name: 'Patient story',
    detail: 'Chronic migraine · Pain Medicine',
  },
  citations: [
    { label: 'IHS — International Classification of Headache Disorders (ICHD-3)', url: 'https://ichd-3.org/' },
    { label: 'NICE — Headaches in over 12s (CG150)', url: 'https://www.nice.org.uk/guidance/cg150' },
  ],
};

export const lumbarSpineData = {
  discipline: 'Pain Medicine',
  title: 'Lumbar spine pain',
  heroImage: '/assets/images/Hero/LumbarSpinePain.webp',
  heroSubtitle:
    'Low back pain is one of the most common pain syndromes — a structured, personalised plan helps most people return to daily life.',
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
  // Content-rich: a longer intervention list — the grid simply scales.
  treatments: [
    { name: 'Radiofrequency', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/radiofrequency', img: '/assets/images/Hero/RadiofrequencyAblation.webp' },
    { name: 'Nucleoplasty', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/nucleoplasty', img: '/assets/images/Hero/Nucleoplasty.webp' },
    { name: 'Interspinous spacers', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/interspinous-spacers', img: '/assets/images/Hero/InterspinousSpacersTreatment.webp' },
    { name: 'Vertebroplasty', kind: 'Minimally invasive', to: '/treatments/minimally-invasive-treatments/vertebroplasty', img: '/assets/images/Hero/Vertebroplasty.webp' },
    { name: 'Spinal fusion', kind: 'Surgical', to: '/treatments/surgical-treatments/spinal-fusion', img: '/assets/images/Hero/LumbarDeformitySurgery.webp' },
    { name: 'Tubular microsurgery', kind: 'Surgical', to: '/treatments/surgical-treatments/tubular-microsurgery', img: '/assets/images/Hero/TubularMicrosurgery.webp' },
    { name: 'Physiotherapy', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/physiotherapy', img: '/assets/images/Hero/Physiotherapy.webp' },
    { name: 'Pharmacological pain management', kind: 'Non-invasive', to: '/treatments/non-invasive-treatments/pharmacological-pain-management', img: '/assets/images/Hero/PharmacologicalPainManagement.webp' },
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
  citations: [
    { label: 'NICE — Low back pain and sciatica in over 16s (NG59)', url: 'https://www.nice.org.uk/guidance/ng59' },
  ],
};
