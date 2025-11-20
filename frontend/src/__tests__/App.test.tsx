import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

// Mock all external dependencies
vi.mock('@apollo/client', () => ({
  ApolloProvider: ({ children }: any) => children,
  useQuery: () => ({ data: null, loading: false, error: null }),
  useMutation: () => [vi.fn(), { loading: false }],
  gql: (strings: any) => strings[0]
}));

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: any) => children,
  Routes: ({ children }: any) => children,
  Route: () => null,
  Link: ({ children }: any) => children,
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => vi.fn()
}));

vi.mock('@tanstack/react-query', () => ({
  QueryClient: vi.fn(),
  QueryClientProvider: ({ children }: any) => children
}));

vi.mock('@/context/AuthContext', () => ({
  AuthProvider: ({ children }: any) => children,
  useAuth: () => ({ token: null, login: vi.fn(), logout: vi.fn(), isAuthenticated: false })
}));

vi.mock('@/components/ui/toaster', () => ({
  Toaster: () => null
}));

vi.mock('@/components/ui/sonner', () => ({
  Toaster: () => null
}));

vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: any) => children
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>Test App</div>);
    expect(container).toBeTruthy();
  });
});
