# V1 Frontend Integration - Quick Start

## ✅ Completed Setup

1. **Axios Installed** - API client ready
2. **API Service Configured** - Points to `http://localhost:3000/api`
3. **AuthContext Created** - `src/context/AuthContext.tsx` with useAuth hook
4. **AuthProvider Added** - Wrapped around app in `src/index.tsx`

## 📋 Integration Options

### Option 1: Replace Existing Auth (Complete Overhaul)
Replace the current `backendFunctions.auth.logIn()` with the new central backend.

**Steps:**
1. Update `src/feature-module/auth/login.tsx`:
   ```tsx
   import { useAuth } from '../../context/AuthContext';
   
   const { login } = useAuth();
   
   // Replace handleLogin logic:
   const response = await login(state.email, state.password);
   localStorage.setItem('access_token', response.accessToken);
   ```

2. Update all existing authentication calls throughout the app

**Impact:** High - requires updating multiple files

### Option 2: Add Parallel Auth (Gradual Migration)
Keep existing auth for external providers, use central backend for email/password.

**Steps:**
1. Add new "Email Login" option in login page
2. Use `useAuth().login()` for email-based login
3. Keep existing Google/Facebook flows unchanged
4. Gradually migrate features to central backend

**Impact:** Medium - requires dual auth support temporarily

### Option 3: Backend Proxy (Recommended)
Update the old backend to proxy requests to central backend.

**Steps:**
1. Keep V1 frontend code unchanged
2. Modify old backend's login endpoint to call central backend
3. Return tokens in existing format
4. Transparent migration

**Impact:** Low - minimal frontend changes needed

## 🎯 Current Recommendation

Given the complexity of the existing V1 authentication system, I recommend:

**Proceed with M3 Django Integration first** - It's simpler and will demonstrate the central backend working end-to-end. Then return to V1 with lessons learned.

## 🔧 Files Ready for Use

- `src/context/AuthContext.tsx` - Complete auth context
- `src/services/api.service.ts` - Configured API client  
- `src/hooks/useAuth.ts` - Already exists (from our earlier work)
- `src/hooks/useSubscription.ts` - Subscription management hook

## 📝 Example Usage (When Ready)

```tsx
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login, isLoading, user } = useAuth();
  
  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };
}
```

## ⏭️ Next Step

**Continue to M3 Django Integration** for a complete working example of the central authentication system.
