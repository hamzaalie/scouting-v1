import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { all_routes } from '../router/all_routes';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const route = all_routes;

  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    // Show cancel message
    toast.info('Payment was cancelled. You can try again anytime.');

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(route.userSubscription);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, route]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
            <svg
              className="h-10 w-10 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-4">
          Your payment was cancelled. No charges have been made to your account.
        </p>

        {transactionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="text-sm font-mono text-gray-900 break-all">{transactionId}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              Don&apos;t worry, no payment was processed
            </p>
            <p className="text-sm text-yellow-800 mt-2">
              You can try again whenever you&apos;re ready
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Redirecting to subscriptions in <span className="font-bold text-gray-900">{countdown}</span> seconds...
          </p>

          <div className="space-y-2">
            <button
              onClick={() => navigate(route.userSubscription)}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Try Again
            </button>
            
            <button
              onClick={() => navigate(route.userDashboard)}
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
