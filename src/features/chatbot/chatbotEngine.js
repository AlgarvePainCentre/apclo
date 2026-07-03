import {
  buildServiceIndex,
  chatbotCategorySummaries,
  chatbotContact,
  chatbotStarterPrompts,
  chatbotSymptomGuides,
  chatbotTopicGroups,
} from './knowledgeBase';

const serviceIndex = buildServiceIndex();

const defaultQuickReplies = ['Specialities', 'Treatments', 'Contact', 'Location'];
const comparisonTerms = ['difference', 'compare', 'versus', 'vs'];
const followUpTerms = ['more', 'more options', 'show more', 'what else', 'similar', 'related', 'tell me more'];
const bookingTerms = ['book', 'booking', 'appointment', 'schedule'];
const diagnosisTerms = ['which should i choose', 'what do i need', 'what is best', 'recommend', 'diagnose', 'diagnosis'];

function createContext(overrides = {}) {
  return {
    lastIntent: null,
    lastGroupId: null,
    lastCategoryTitle: null,
    lastMatchedServiceLabel: null,
    lastSymptomGuideId: null,
    ...overrides,
  };
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(query, terms) {
  return terms.some((term) => query.includes(term));
}

function createActions(items) {
  return items.filter(Boolean);
}

function createReply({
  text,
  actions = [],
  quickReplies = defaultQuickReplies,
  context = createContext(),
}) {
  return {
    text,
    actions,
    quickReplies,
    context,
  };
}

function findGroup(groupId) {
  return chatbotTopicGroups.find((entry) => entry.id === groupId) || null;
}

function findCategory(categoryTitle, groupId) {
  const group = findGroup(groupId);
  if (!group) return { group: null, category: null };
  const category = group.categories.find((entry) => normalize(entry.title) === normalize(categoryTitle)) || null;
  return { group, category };
}

function buildOverviewReply(groupId) {
  const group = chatbotTopicGroups.find((entry) => entry.id === groupId);
  if (!group) return null;

  const previewItems = group.categories.flatMap((category) => category.items).slice(0, 6);

  return createReply({
    text: `${group.description} You can start with ${group.categories
      .map((category) => category.title)
      .join(', ')}.`,
    actions: createActions([
      { label: `Browse ${group.title}`, to: group.path, kind: 'internal' },
      ...previewItems.map((item) => ({ label: item.label, to: item.path, kind: 'internal' })),
    ]),
    quickReplies:
      groupId === 'specialities'
        ? ['Pain Medicine', 'Sports Medicine', 'Stroke Medicine', 'Contact']
        : groupId === 'treatments'
          ? ['Surgical Treatments', 'Minimally Invasive Treatments', 'Non-Invasive Treatments', 'Contact']
          : ['Testimonials', 'Contact', 'Location'],
    context: createContext({
      lastIntent: 'group-overview',
      lastGroupId: groupId,
    }),
  });
}

function buildCategoryReply(categoryTitle, groupId) {
  const { group, category } = findCategory(categoryTitle, groupId);

  if (!group || !category) return null;

  return createReply({
    text: `${chatbotCategorySummaries[category.title] || `${category.title} is available on the website.`} Here are the main pages in this section.`,
    actions: createActions([
      { label: `Browse ${group.title}`, to: group.path, kind: 'internal' },
      ...category.items.slice(0, 8).map((item) => ({ label: item.label, to: item.path, kind: 'internal' })),
      { label: 'Contact the clinic', to: chatbotContact.contactPage, kind: 'internal' },
    ]),
    quickReplies: ['Contact', 'WhatsApp', 'Phone', 'Email'],
    context: createContext({
      lastIntent: 'category',
      lastGroupId: groupId,
      lastCategoryTitle: category.title,
    }),
  });
}

function scoreService(query, service) {
  const normalizedLabel = normalize(service.label);
  if (query === normalizedLabel) return 100;
  if (normalizedLabel.includes(query) || query.includes(normalizedLabel)) return 80;

  return service.aliases.reduce((score, alias) => {
    const normalizedAlias = normalize(alias);
    if (!normalizedAlias) return score;
    if (query === normalizedAlias) return score + 60;
    if (query.includes(normalizedAlias) || normalizedAlias.includes(query)) return score + 25;
    return score;
  }, 0);
}

function buildServiceReply(query) {
  const matches = serviceIndex
    .map((service) => ({ service, score: scoreService(query, service) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (!matches.length) return null;

  const top = matches[0].service;
  const text =
    matches.length === 1
      ? `I found a relevant ${top.type} page on the website: ${top.label}. You can open it below, and if you want tailored guidance, contact Algarve Pain Centre for more details.`
      : `I found a few website pages related to your question. The closest match is ${top.label} in ${top.categoryTitle}.`;

  return createReply({
    text,
    actions: createActions([
      ...matches.map(({ service }) => ({
        label: service.label,
        to: service.path,
        kind: 'internal',
      })),
      { label: 'Contact Algarve Pain Centre', to: chatbotContact.contactPage, kind: 'internal' },
    ]),
    quickReplies: ['WhatsApp', 'Phone', 'Email', 'Location'],
    context: createContext({
      lastIntent: 'service',
      lastGroupId: top.groupId,
      lastCategoryTitle: top.categoryTitle,
      lastMatchedServiceLabel: top.label,
    }),
  });
}

function buildContactReply(focus = 'general') {
  const intro =
    focus === 'whatsapp'
      ? 'You can contact Algarve Pain Centre directly on WhatsApp for more details.'
      : focus === 'phone'
        ? 'You can call Algarve Pain Centre directly for more details.'
        : focus === 'email'
          ? 'You can email Algarve Pain Centre if you prefer written contact.'
          : focus === 'location'
            ? 'You can visit Algarve Pain Centre in person at the clinic address below.'
            : 'For detailed advice or to plan the next step, the best option is to contact Algarve Pain Centre directly.';

  return createReply({
    text: `${intro} You can also use the contact page if you prefer.`,
    actions: createActions([
      { label: 'WhatsApp', href: chatbotContact.whatsappHref, kind: 'external' },
      { label: chatbotContact.phone, href: chatbotContact.phoneHref, kind: 'external' },
      { label: chatbotContact.email, href: chatbotContact.emailHref, kind: 'external' },
      { label: chatbotContact.address, href: chatbotContact.mapsHref, kind: 'external' },
      { label: 'Open contact page', to: chatbotContact.contactPage, kind: 'internal' },
    ]),
    quickReplies: ['WhatsApp', 'Phone', 'Email', 'Location'],
    context: createContext({
      lastIntent: 'contact',
    }),
  });
}

export function getInitialChatbotMessage() {
  return createReply({
    text:
      'Hello. I can help you explore specialities, treatments, resources, and the best way to contact Algarve Pain Centre. Ask about a condition, a treatment, or how to get in touch.',
    actions: [
      { label: 'Browse Specialities', to: '/specialities', kind: 'internal' },
      { label: 'Browse Treatments', to: '/treatments', kind: 'internal' },
      { label: 'Open Contact Page', to: chatbotContact.contactPage, kind: 'internal' },
    ],
    quickReplies: chatbotStarterPrompts,
    context: createContext({
      lastIntent: 'welcome',
    }),
  });
}

function buildBookingReply() {
  return createReply({
    text:
      'If you want to book or discuss the next step, the safest path is to contact Algarve Pain Centre directly. I can guide you to WhatsApp, phone, email, the contact page, or the clinic location.',
    actions: [
      { label: 'WhatsApp', href: chatbotContact.whatsappHref, kind: 'external' },
      { label: chatbotContact.phone, href: chatbotContact.phoneHref, kind: 'external' },
      { label: chatbotContact.email, href: chatbotContact.emailHref, kind: 'external' },
      { label: 'Open contact page', to: chatbotContact.contactPage, kind: 'internal' },
    ],
    quickReplies: ['WhatsApp', 'Phone', 'Email', 'Location'],
    context: createContext({
      lastIntent: 'booking',
    }),
  });
}

function buildDifferenceReply() {
  return createReply({
    text:
      'On this website, specialities describe the medical areas and conditions the clinic works with, while treatments describe the intervention or care options that may be explored. You can browse either side depending on whether you are starting from a symptom/condition or from a treatment type.',
    actions: [
      { label: 'Browse Specialities', to: '/specialities', kind: 'internal' },
      { label: 'Browse Treatments', to: '/treatments', kind: 'internal' },
      { label: 'Contact Algarve Pain Centre', to: chatbotContact.contactPage, kind: 'internal' },
    ],
    quickReplies: ['Pain Medicine', 'Minimally Invasive Treatments', 'Contact'],
    context: createContext({
      lastIntent: 'comparison',
    }),
  });
}

function buildDiagnosisSafetyReply() {
  return createReply({
    text:
      'I can help you find the most relevant pages on the website, but I cannot diagnose or choose the best treatment for you. For tailored advice, the best next step is to contact Algarve Pain Centre directly so the team can guide you in more detail.',
    actions: [
      { label: 'Browse Specialities', to: '/specialities', kind: 'internal' },
      { label: 'Browse Treatments', to: '/treatments', kind: 'internal' },
      { label: 'WhatsApp', href: chatbotContact.whatsappHref, kind: 'external' },
      { label: 'Open contact page', to: chatbotContact.contactPage, kind: 'internal' },
    ],
    quickReplies: ['Knee pain', 'Back pain', 'Contact', 'Location'],
    context: createContext({
      lastIntent: 'safety-guidance',
    }),
  });
}

function buildSymptomReply(query) {
  const match = chatbotSymptomGuides.find((guide) => guide.match.some((term) => query.includes(normalize(term))));
  if (!match) return null;

  const actions = match.relatedPages
    .map((path) => serviceIndex.find((service) => service.path === path))
    .filter(Boolean)
    .map((service) => ({
      label: service.label,
      to: service.path,
      kind: 'internal',
    }));

  return createReply({
    text: `${match.summary} I can point you to the most relevant website pages below, and if you want case-specific advice, it is best to contact the clinic directly.`,
    actions: [
      ...actions,
      { label: 'Contact Algarve Pain Centre', to: chatbotContact.contactPage, kind: 'internal' },
    ],
    quickReplies: ['Contact', 'WhatsApp', 'Treatments', 'Specialities'],
    context: createContext({
      lastIntent: 'symptom',
      lastSymptomGuideId: match.id,
    }),
  });
}

function buildFollowUpReply(context) {
  if (context?.lastMatchedServiceLabel) {
    const service = serviceIndex.find((entry) => entry.label === context.lastMatchedServiceLabel);
    if (service) {
      const siblingItems = serviceIndex
        .filter(
          (entry) =>
            entry.categoryTitle === service.categoryTitle &&
            entry.label !== service.label,
        )
        .slice(0, 5);

      return createReply({
        text: `If you want more options related to ${service.label}, it also helps to explore other pages in ${service.categoryTitle}.`,
        actions: [
          { label: service.label, to: service.path, kind: 'internal' },
          ...siblingItems.map((entry) => ({ label: entry.label, to: entry.path, kind: 'internal' })),
          { label: 'Contact Algarve Pain Centre', to: chatbotContact.contactPage, kind: 'internal' },
        ],
        quickReplies: ['Contact', 'WhatsApp', 'Phone', 'Email'],
        context: createContext({
          lastIntent: 'follow-up',
          lastGroupId: service.groupId,
          lastCategoryTitle: service.categoryTitle,
          lastMatchedServiceLabel: service.label,
        }),
      });
    }
  }

  if (context?.lastCategoryTitle && context?.lastGroupId) {
    return buildCategoryReply(context.lastCategoryTitle, context.lastGroupId);
  }

  if (context?.lastGroupId) {
    return buildOverviewReply(context.lastGroupId);
  }

  return null;
}

export function getChatbotReply(input, context = createContext()) {
  const query = normalize(input || '');

  if (!query) {
    return createReply({
      text:
        'Please ask about a speciality, treatment, resource, or contact option. I can also guide you to WhatsApp, phone, email, or the clinic address.',
      quickReplies: chatbotStarterPrompts,
      context,
    });
  }

  if (hasAny(query, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
    return getInitialChatbotMessage();
  }

  if (hasAny(query, comparisonTerms) && hasAny(query, ['specialities', 'treatments'])) {
    return buildDifferenceReply();
  }

  if (hasAny(query, bookingTerms)) {
    return buildBookingReply();
  }

  if (hasAny(query, diagnosisTerms)) {
    return buildDiagnosisSafetyReply();
  }

  if (hasAny(query, ['whatsapp'])) {
    return buildContactReply('whatsapp');
  }

  if (hasAny(query, ['phone', 'call', 'telephone'])) {
    return buildContactReply('phone');
  }

  if (hasAny(query, ['email', 'mail'])) {
    return buildContactReply('email');
  }

  if (hasAny(query, ['location', 'address', 'where', 'visit', 'center', 'centre'])) {
    return buildContactReply('location');
  }

  if (hasAny(query, ['contact', 'book', 'appointment', 'talk', 'details'])) {
    return buildContactReply('general');
  }

  if (hasAny(query, ['specialities', 'specialties'])) {
    return buildOverviewReply('specialities');
  }

  if (hasAny(query, ['treatments', 'treatment'])) {
    return buildOverviewReply('treatments');
  }

  if (hasAny(query, ['resources', 'testimonials', 'testimonial', 'learn', 'blog'])) {
    return buildOverviewReply('resources');
  }

  const symptomReply = buildSymptomReply(query);
  if (symptomReply) {
    return symptomReply;
  }

  const categoryMatchers = [
    ['Pain Medicine', 'specialities'],
    ['Sports Medicine', 'specialities'],
    ['Stroke Medicine', 'specialities'],
    ['Surgical Treatments', 'treatments'],
    ['Minimally Invasive Treatments', 'treatments'],
    ['Non-Invasive Treatments', 'treatments'],
    ['Testimonials', 'resources'],
  ];

  for (const [categoryTitle, groupId] of categoryMatchers) {
    if (query.includes(normalize(categoryTitle))) {
      return buildCategoryReply(categoryTitle, groupId);
    }
  }

  if (hasAny(query, followUpTerms)) {
    const followUpReply = buildFollowUpReply(context);
    if (followUpReply) {
      return followUpReply;
    }
  }

  const serviceReply = buildServiceReply(query);
  if (serviceReply) {
    return serviceReply;
  }

  return createReply({
    text:
      'I could not find an exact page from that question, but I can still guide you. Try asking about a speciality, a treatment, a symptom like back pain or knee pain, or ask for contact details.',
    actions: [
      { label: 'Browse Specialities', to: '/specialities', kind: 'internal' },
      { label: 'Browse Treatments', to: '/treatments', kind: 'internal' },
      { label: 'Contact Algarve Pain Centre', to: chatbotContact.contactPage, kind: 'internal' },
    ],
    quickReplies: chatbotStarterPrompts,
    context: createContext({
      lastIntent: 'fallback',
    }),
  });
}
