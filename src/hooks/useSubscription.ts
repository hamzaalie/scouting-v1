import { useState, useEffect } from 'react';
import { subscriptionsAPI } from '../services/api.service';

interface SubscriptionStatus {
  status: 'active' | 'expired' | 'cancelled' | 'none';
  expiresAt: string | null;
  isActive: boolean;
}

export const useSubscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      const response = await subscriptionsAPI.getStatus();
      setSubscriptionStatus(response);
      setError(null);
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch subscription status');
      setSubscriptionStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchStatus();
    } else {
      setIsLoading(false);
    }
  }, []);

  const cancelSubscription = async () => {
    try {
      await subscriptionsAPI.cancel();
      await fetchStatus(); // Refresh status after cancellation
      return { success: true };
    } catch (err: unknown) {
      throw new Error((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to cancel subscription');
    }
  };

  const hasActiveSubscription = subscriptionStatus?.isActive || false;

  return {
    subscriptionStatus,
    isLoading,
    error,
    hasActiveSubscription,
    cancelSubscription,
    refetch: fetchStatus,
  };
};
