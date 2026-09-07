import { createBrowserRouter, Navigate } from 'react-router-dom';
import App, {
  NotFoundPage,
  RedirectTestimonialsTypos,
  RouteErrorBoundary,
  ShellLayout,
} from '../App';
import { RouteShellSkeleton } from '../components/LoadingSkeletons';
import { appChildRoutes } from '../routes';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: App,
      errorElement: <RouteErrorBoundary />,
      children: [
        { path: 'resources/testemunial/*', Component: RedirectTestimonialsTypos },
        { path: 'resources/testemunials/*', Component: RedirectTestimonialsTypos },
        { path: 'resources/testimonials', element: <Navigate to="/resources#all-testimonials" replace /> },
        { path: 'resources/learn/blog', element: <Navigate to="/blog" replace /> },
        {
          Component: ShellLayout,
          children: [
            ...appChildRoutes,
            { path: '*', element: <NotFoundPage /> },
          ],
        },
      ],
    },
  ]
);

export const routerFallbackElement = <RouteShellSkeleton />;
