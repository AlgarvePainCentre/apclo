import { Component, Suspense } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  isRouteErrorResponse,
  useLocation,
  useNavigation,
  useRouteError,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import ScrollManager from './app/ScrollManager';
import PrefetchManager from './app/PrefetchManager';
import { RouteShellSkeleton } from './components/LoadingSkeletons';

export function ShellLayout() {
  const location = useLocation();
  return (
    <div className="page">
      <Navbar />
      <div className="page-transition-shell">
        <div className="page-content">
          <AppErrorBoundary resetKey={location.key}>
            <Suspense fallback={<RouteShellSkeleton />}>
              <Outlet />
            </Suspense>
          </AppErrorBoundary>
        </div>
      </div>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export function RedirectTestimonialsTypos() {
  const location = useLocation();
  const pathname = location.pathname
    .replace('/resources/testemunials', '/resources/testimonials')
    .replace('/resources/testemunial', '/resources/testimonials');

  return <Navigate to={`${pathname}${location.search}${location.hash}`} replace />;
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, errorInfo) {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="page-main">
        <section className="page-section" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p style={{ marginTop: '16px' }}>Try refreshing the page or return to the home page.</p>
          <div style={{ marginTop: '24px' }}>
            <Link to="/" className="primary-btn">Go to Home</Link>
          </div>
        </section>
      </main>
    );
  }
}

export function NotFoundPage() {
  return (
    <main className="page-main">
      <section className="page-section" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Page not found</h2>
        <p style={{ marginTop: '16px' }}>Check the URL or return to the home page.</p>
        <div style={{ marginTop: '24px' }}>
          <Link to="/" className="primary-btn">Go to Home</Link>
        </div>
      </section>
    </main>
  );
}

export function RouteErrorBoundary() {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText || 'Request failed'}`
    : 'Something went wrong';

  const message = isRouteErrorResponse(error)
    ? error.data?.message || 'The page could not be loaded.'
    : 'Try refreshing the page or return to the home page.';

  return (
    <main className="page-main">
      <section className="page-section" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>{title}</h2>
        <p style={{ marginTop: '16px' }}>{message}</p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="primary-btn">
            Go to Home
          </Link>
          <button type="button" className="outline-btn" onClick={() => window.location.reload()}>
            Reload site
          </button>
        </div>
      </section>
    </main>
  );
}

function App() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';

  return (
    <div className="App">
      <ScrollManager />
      <PrefetchManager />
      
      <div className={isNavigating ? 'page-transition-overlay is-active' : 'page-transition-overlay'} aria-hidden={isNavigating ? 'false' : 'true'} />
      <div className={isNavigating ? 'page-top-loader is-active' : 'page-top-loader'} aria-hidden="true" />

      <Outlet />
    </div>
  );
}

export default App;
