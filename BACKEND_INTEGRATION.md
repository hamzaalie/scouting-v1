# V1 Frontend Integration with Central Backend

## Overview
This guide explains how to integrate the V1 frontend with the central authentication backend.

## Files Created

### 1. API Service (`src/services/api.service.ts`)
- Centralized API client with axios
- Automatic JWT token injection in requests
- Automatic token refresh on 401 errors
- API methods for auth, subscriptions, and validation

### 2. Auth Hook (`src/hooks/useAuth.ts`)
- React hook for authentication management
- Methods: `login`, `register`, `logout`, `verifyEmail`, `forgotPassword`, `resetPassword`
- Auto-checks authentication state on mount

### 3. Subscription Hook (`src/hooks/useSubscription.ts`)
- React hook for subscription management
- Methods: `fetchStatus`, `cancelSubscription`, `refetch`
- Returns: `subscriptionStatus`, `isLoading`, `hasActiveSubscription`

## Integration Steps

### Step 1: Update Login Component

Replace the existing login logic in `src/feature-module/auth/login.tsx`:

```tsx
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await login(email, password);
      
      if (!response.user.email_verified) {
        toast.warning('Please verify your email before logging in.');
        return;
      }
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    // Your existing JSX with form submission calling handleLogin
  );
};
```

### Step 2: Update Register Component

In `src/feature-module/auth/register.tsx`:

```tsx
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await register(email, password);
      toast.success(response.message || 'Registration successful! Please check your email.');
      navigate('/auth/login');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  // Your form JSX
};
```

### Step 3: Protect Routes with Subscription Check

Create a ProtectedRoute component:

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';

export const ProtectedRoute = ({ children, requireSubscription = false }: { 
  children: React.ReactNode;
  requireSubscription?: boolean;
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { hasActiveSubscription, isLoading: subLoading } = useSubscription();

  if (authLoading || subLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (requireSubscription && !hasActiveSubscription) {
    return <Navigate to="/pricing" />;
  }

  return <>{children}</>;
};
```

Use in router:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute requireSubscription={true}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Step 4: Email Verification

Create a verification page:

```tsx
// src/feature-module/auth/verify-email.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmail(token)
        .then(() => {
          setStatus('success');
          setTimeout(() => navigate('/auth/login'), 3000);
        })
        .catch(() => setStatus('error'));
    }
  }, []);

  return (
    <div>
      {status === 'loading' && <p>Verifying your email...</p>}
      {status === 'success' && <p>Email verified! Redirecting to login...</p>}
      {status === 'error' && <p>Verification failed. Invalid or expired token.</p>}
    </div>
  );
};
```

### Step 5: Configure CORS in Backend

Make sure your backend `.env` has the correct V1 URL:

```env
V1_URL=http://localhost:3000
```

The backend already has CORS configured in `main.ts`.

### Step 6: Display Subscription Status

In dashboard or user profile:

```tsx
import { useSubscription } from '../../hooks/useSubscription';

const Dashboard = () => {
  const { subscriptionStatus, hasActiveSubscription, isLoading } = useSubscription();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Subscription Status</h2>
      {hasActiveSubscription ? (
        <div>
          <p className="text-success">✓ Active</p>
          <p>Expires: {new Date(subscriptionStatus.expiresAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <div>
          <p className="text-danger">No active subscription</p>
          <Link to="/pricing">Subscribe Now</Link>
        </div>
      )}
    </div>
  );
};
```

## Testing

1. **Start Backend**: Already running on http://localhost:3000
2. **Start V1 Frontend**: `npm start` (should run on port 3001 or different from backend)
3. **Test Registration**: Go to `/auth/register`, create account
4. **Check Email Logs**: Backend console will show verification email (if SMTP not configured)
5. **Test Login**: Use credentials after email verification
6. **Check Token Storage**: DevTools > Application > LocalStorage should show `access_token`, `refresh_token`, `user`

## API Endpoints Available

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-email` - Verify email with token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/users/me` - Get current user
- `GET /api/subscriptions/status` - Get subscription status
- `POST /api/subscriptions/cancel` - Cancel subscription

## Environment Variables

Add to `.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:3000/api
```

## Next Steps

1. Update all auth-related components to use the new hooks
2. Add subscription checks to premium features
3. Implement payment flow integration with CinetPay
4. Add error boundaries for API errors
5. Implement loading states across the app
