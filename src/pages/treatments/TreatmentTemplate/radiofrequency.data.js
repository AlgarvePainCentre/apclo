/*
 * PILOT content for the canonical treatment template — Radiofrequency.
 * Reused from the live Radiofrequency page (validated). `treats` is the real
 * "What it treats" bridge (inverse index of the specialities' approaches).
 */
export const radiofrequencyData = {
  kind: 'Minimally invasive',
  title: 'Radiofrequency',
  areaLabel: 'radiofrequency',
  category: 'treatment',
  heroImage: '/assets/images/Hero/RadiofrequencyAblation.webp',
  heroSubtitle: 'Targeted radiofrequency reduces pain by calming overactive nerves.',
  duration: 'Relief typically lasts 6–12 months',
  overview: [
    'Radiofrequency ablation (RFA) is an image-guided technique that reduces pain signals from selected nerves. It is commonly used for spine-related facet joint pain after a structured assessment and confirmatory diagnostic blocks.',
    'The pathway often includes a consultation, imaging review, and diagnostic injections to confirm the target. If the test blocks provide meaningful temporary relief, RFA may offer longer-lasting symptom reduction for suitable patients.',
    'After the procedure, most people resume light activities quickly. Rehabilitation focuses on restoring movement capacity and building a plan to reduce flare-ups and improve resilience.',
  ],
  steps: [
    { n: 1, title: 'Preparation', body: 'Imaging tests such as MRI or CT may confirm the target area. Most procedures are day-case, so you can usually go home the same day.' },
    { n: 2, title: 'Anaesthesia', body: 'Local anaesthetic numbs the skin and deeper tissues. Sedation may be offered when appropriate.' },
    { n: 3, title: 'Needle insertion', body: 'Using fluoroscopy (real-time X-ray) or ultrasound guidance, the clinician positions the needle at the target nerve.' },
    { n: 4, title: 'Electrode insertion', body: 'A micro-electrode is introduced through the needle. Test stimulation helps confirm correct placement and safety.' },
    { n: 5, title: 'RF current', body: 'Once confirmed, radiofrequency current creates a controlled lesion to reduce pain signalling from the target nerve.' },
    { n: 6, title: 'Duration', body: 'The procedure typically takes 30–60 minutes, depending on how many levels or nerves are treated.' },
  ],
  // "What it treats" bridge — real links inverted from the specialities' approaches.
  treats: [
    { name: 'Cervical spine pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/cervical-spine-pain', img: '/assets/images/Hero/CervicalPain.webp' },
    { name: 'Hand and elbow pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/hand-and-elbow-pain', img: '/assets/images/Hero/HandandElbowPain.webp' },
    { name: 'Foot and ankle pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/foot-and-ankle-pain', img: '/assets/images/Hero/FootandAnklePain.webp' },
    { name: 'Hip and groin pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/hip-and-groin-pain', img: '/assets/images/Hero/HipandGroinPain.webp' },
    { name: 'Knee pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/knee-pain', img: '/assets/images/Hero/KneePain.webp' },
    { name: 'Lumbar spine pain', discipline: 'Pain Medicine', to: '/specialities/pain-medicine/lumbar-spine-pain', img: '/assets/images/Hero/LumbarSpinePain.webp' },
    { name: 'Sports injuries', discipline: 'Sports Medicine', to: '/specialities/sports-medicine/injuries', img: '/assets/images/Hero/Exercise.webp' },
  ],
  benefits: [
    { title: 'Long-lasting pain relief', body: 'Relief can last 6–12 months in selected patients and may be useful for facet or sacroiliac pain patterns.' },
    { title: 'Minimally invasive', body: 'Image-guided and performed as a day-case procedure, supporting quicker recovery than open surgery.' },
    { title: 'Reduced medication dependence', body: 'For some people, better pain control can reduce reliance on long-term pain medicines and their side effects.' },
    { title: 'Improved quality of life', body: 'When pain improves, it can be easier to walk, sit, sleep and follow a rehabilitation plan to build resilience.' },
    { title: 'Safety', body: 'Complications are uncommon. Your clinician will explain suitability, risks and aftercare based on your health profile.' },
  ],
  expect: [
    { title: 'Immediate effects', body: 'Some people feel relief quickly, while for others it can take a few days to notice the full effect.' },
    { title: 'Recovery', body: 'Most people return to normal activities within 24–48 hours. Avoid strenuous activity for a few days if advised.' },
    { title: 'Follow-up', body: 'Follow-up appointments help monitor progress, optimise rehabilitation, and address any questions.' },
  ],
  risks: [
    { title: 'Common, mild effects', body: 'Soreness or bruising at the needle site — usually mild and temporary.' },
    { title: 'Less common', body: 'Occasionally numbness, tingling or a short-term pain flare. Your clinician reviews risks based on your health profile.' },
  ],
  faqs: [
    { q: 'What is Radiofrequency Ablation (RFA)?', a: 'A minimally invasive procedure that uses radiofrequency energy to heat and modulate specific nerves to reduce pain signals. It is commonly used for chronic neck, back and arthritic facet joint pain.' },
    { q: 'How does RFA work?', a: 'It targets nerves that carry pain signals. Using image guidance, a clinician positions a needle next to the target nerve and applies controlled radiofrequency energy, reducing the nerve’s ability to transmit pain for a period of time.' },
    { q: 'Who is a good candidate for RFA?', a: 'People with persistent spine-related pain that hasn’t improved with conservative care, typically selected after a clinical assessment and diagnostic injections that suggest the target nerve is contributing to the pain.' },
    { q: 'How long does it take to recover?', a: 'Most people return to light activities within 24–48 hours. Some temporary soreness is common; improvement can be immediate for some, or build over several days to a few weeks.' },
    { q: 'How long does pain relief last?', a: 'Relief commonly lasts months and varies by condition, technique and individual factors. Nerves can regenerate over time, so the effect is not permanent, but the procedure may be repeated in selected cases.' },
    { q: 'Is RFA a permanent solution?', a: 'Not typically, because nerves can recover over time. It is best viewed as one part of a broader plan that may include rehabilitation, lifestyle strategies and other treatments tailored to your diagnosis.' },
  ],
  citations: [],
};
