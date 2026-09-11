import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { blogArticles } from '../../pages/resources/Learn/Blog/articles';

const testimonialStories = [
  {
    name: 'Ghislaine Renault',
    initials: 'GR',
    rating: 4.9,
    quote: 'I regained the freedom to move without fear — caring and effective treatment.',
    to: '/resources/testimonials/overcoming-sciatica-pain',
    cta: 'Read full case study',
    date: 'May 12, 2024',
    readMins: 5,
    img: '/assets/images/illustrative/services-home-min-1.webp',
  },
  {
    name: 'Sid Richardson',
    initials: 'SR',
    rating: 4.8,
    quote: 'Professional, empathetic and thorough. The plan worked and I feel like myself again.',
    to: '/resources/testimonials/control-over-spine-degeneration',
    cta: 'Read full case study',
    date: 'May 10, 2024',
    readMins: 7,
    img: '/assets/images/treatment-img/SpinePain.webp',
  },
  {
    name: 'Filomena & Roland',
    initials: 'F·R',
    rating: 5,
    quote: 'Teamwork and guidance made all the difference. We felt heard at every step.',
    to: '/resources/testimonials/recovering-from-sports-injuries',
    cta: 'Read full case study',
    date: 'May 5, 2024',
    readMins: 6,
    img: '/assets/images/medical/DSC06176.webp',
  },
  {
    name: 'Bernard Schack',
    initials: 'BS',
    rating: 4.9,
    quote: 'From being unable to walk to moving freely again — treatment that addressed the real cause.',
    to: '/resources/testimonials/bernard-schack',
    cta: 'Read full case study',
    date: 'Apr 28, 2024',
    readMins: 5,
    img: '/assets/images/medical/DSC01686.webp',
  },
  {
    name: 'Charlotte Klockare',
    initials: 'CK',
    rating: 5,
    quote: 'A renewed sense of freedom and vitality after chronic pain and immobility.',
    to: '/resources/testimonials/charlotte-klockare',
    cta: 'Read full case study',
    date: 'Apr 22, 2024',
    readMins: 5,
    img: '/assets/images/medical/DSC01749.webp',
  },
  {
    name: 'Peter Kruger',
    initials: 'PK',
    rating: 4.8,
    quote: 'Resilience and recovery — regaining strength and confidence after spine surgery.',
    to: '/resources/testimonials/peter-kruger',
    cta: 'Read full case study',
    date: 'Apr 18, 2024',
    readMins: 6,
    img: '/assets/images/medical/DSC01805.webp',
  },
  {
    name: 'Rosa Santos Marques',
    initials: 'RM',
    rating: 5,
    quote: 'Interspinous Spacers gave me my life back — pain-free after spinal stenosis.',
    to: '/resources/testimonials/rosa-marques',
    cta: 'Read full case study',
    date: 'Apr 12, 2024',
    readMins: 6,
    img: '/assets/images/medical/DSC02041.webp',
  },
  {
    name: 'Professional Padel Players',
    initials: 'PP',
    rating: 5,
    quote: 'Competing and staying injury-free with sports medicine support.',
    to: '/resources/testimonials/padel-sports-medicine',
    cta: 'Read full case study',
    date: 'Apr 6, 2024',
    readMins: 4,
    img: '/assets/images/Hero/Physiotherapy.webp',
  },
];

const youTubeUrls = [
  'https://www.youtube.com/watch?v=bkbLgNoKhkY',
  'https://www.youtube.com/watch?v=uK77XrRzGYA',
  'https://www.youtube.com/watch?v=ANY7DTXlMRA',
  'https://www.youtube.com/watch?v=If0qu-Ej8dA',
  'https://www.youtube.com/watch?v=_pRrvN7bUZM',
  'https://www.youtube.com/watch?v=PzaOM_ERL0Q',
  'https://www.youtube.com/watch?v=guuJPhwKCfw',
  'https://www.youtube.com/watch?v=HpG1TxTh7l4',
];

const parseYouTubeId = (url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.endsWith('youtube.com')) {
      return parsed.searchParams.get('v');
    }
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.replace('/', '').trim() || null;
    }
  } catch {
    return null;
  }

  return null;
};

const appendUtm = (url: string, utmContent: string) => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('utm_source', 'algarvepaincentre');
    parsed.searchParams.set('utm_medium', 'referral');
    parsed.searchParams.set('utm_campaign', 'all_testimonials');
    parsed.searchParams.set('utm_content', utmContent);
    return parsed.toString();
  } catch {
    return url;
  }
};

export type TestimonialStory = (typeof testimonialStories)[number];
export type YouTubePreviewCard = {
  id: string;
  href: string;
  thumbnailUrl: string;
  title: string;
  channelName: string;
  durationSec: number | null;
  isMetaLoading: boolean;
};

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getBlogArticles: builder.query({
      queryFn: () => ({ data: blogArticles }),
    }),
    getTestimonialStories: builder.query<TestimonialStory[], void>({
      queryFn: () => ({ data: testimonialStories }),
    }),
    getYouTubePreviewCards: builder.query<YouTubePreviewCard[], void>({
      queryFn: () => {
        const cards = youTubeUrls
          .map((url) => ({ url, id: parseYouTubeId(url) }))
          .filter((entry): entry is { url: string; id: string } => Boolean(entry.id))
          .map(({ url, id }) => ({
            id,
            href: appendUtm(url, 'video_preview'),
            thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
            title: 'Loading…',
            channelName: 'YouTube',
            durationSec: null,
            isMetaLoading: true,
          }));

        return { data: cards };
      },
    }),
  }),
});

export const {
  useGetBlogArticlesQuery,
  useGetTestimonialStoriesQuery,
  useGetYouTubePreviewCardsQuery,
} = contentApi;
