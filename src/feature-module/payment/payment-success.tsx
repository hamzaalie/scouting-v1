import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { all_routes } from '../router/all_routes';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [showContent, setShowContent] = useState(false);
  const route = all_routes;

  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setShowContent(true), 100);

    // Show success message
    toast.success('Payment completed successfully! Your subscription is now active.');

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(route.userDashboard);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, route]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <style>
        {`
          @keyframes checkmark {
            0% {
              stroke-dashoffset: 100;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }

          @keyframes scaleIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-checkmark {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: checkmark 0.8s ease-out 0.3s forwards;
          }

          .animate-scale-in {
            animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .animate-slide-up {
            animation: slideUp 0.6s ease-out;
          }

          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #ffd700;
            animation: confetti-fall 3s ease-out forwards;
          }

          @keyframes confetti-fall {
            to {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>

      <div className={`max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 pt-12 pb-8 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

          {/* Success Icon */}
          <div className="relative animate-scale-in">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-white shadow-lg mb-6">
              <svg
                className="h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  className="animate-checkmark"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 animate-slide-up">
            Payment Successful!
          </h1>
          
          <p className="text-green-50 text-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            🎉 Welcome to Premium
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <p className="text-gray-700 text-center mb-6 text-lg">
            Thank you for your subscription! Your payment has been processed successfully.
          </p>

          {transactionId && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 mb-6 border border-gray-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Transaction ID</p>
                  <p className="text-sm font-mono text-gray-900 break-all">{transactionId}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(transactionId);
                    toast.success('Transaction ID copied!');
                  }}
                  className="ml-3 p-2 hover:bg-white rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Benefits List */}
          <div className="space-y-3 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: '🎯', text: 'Your subscription is now active', color: 'from-green-500 to-emerald-500' },
              { icon: '🚀', text: 'Full access to all premium features', color: 'from-blue-500 to-cyan-500' },
              { icon: '📧', text: 'Confirmation email has been sent', color: 'from-purple-500 to-pink-500' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-md"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                  {item.icon}
                </div>
                <p className="ml-4 text-gray-800 font-medium">{item.text}</p>
                <svg className="ml-auto h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>

          {/* Countdown Badge */}
          <div className="flex items-center justify-center mb-6 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-full px-6 py-3 flex items-center space-x-2">
              <svg className="h-5 w-5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm font-semibold text-blue-900">
                Redirecting in <span className="text-2xl font-bold text-blue-600 mx-1">{countdown}</span> seconds
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => navigate(route.userDashboard)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-xl transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go to Dashboard Now
            </button>
            
            <button
              onClick={() => navigate(route.userSubscription)}
              className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 rounded-xl transition-all font-medium hover:shadow-md"
            >
              View Subscription Details
            </button>

            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Login to M3 Dashboard</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@scoutung.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@scoutung.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
