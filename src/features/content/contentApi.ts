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
];

const youTubeUrls = [
  'https://www.youtube.com/watch?v=bkbLgNoKhkY',
  'https://www.youtube.com/watch?v=uK77XrRzGYA',
  'https://www.youtube.com/watch?v=ANY7DTXlMRA',
  'https://www.youtube.com/watch?v=If0qu-Ej8dA',
  'https://www.youtube.com/watch?v=_pRrvN7bUZM',
  'https://www.youtube.com/watch?v=PzaOM_ERL0Q',
  'https://www.youtube.com/watch?v=guuJPhwKCfw',
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
      queryFn: async () => {
        await new Promise((resolve) => window.setTimeout(resolve, 120));
        return { data: testimonialStories };
      },
    }),
    getYouTubePreviewCards: builder.query<YouTubePreviewCard[], void>({
      queryFn: async () => {
        await new Promise((resolve) => window.setTimeout(resolve, 160));

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
