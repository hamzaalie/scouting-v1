import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { all_routes } from '../router/all_routes';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const [showContent, setShowContent] = useState(false);
  const route = all_routes;

  const transactionId = searchParams.get('transaction_id');

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setShowContent(true), 100);

    // Show success message (only once on mount)
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
  }, []); // Empty dependency array - runs only on mount

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 50%, #f3e5f5 100%)',
      padding: '20px'
    }}>
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

          .payment-success-checkmark {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: checkmark 0.8s ease-out 0.3s forwards;
          }

          .payment-success-scale-in {
            animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .payment-success-slide-up {
            animation: slideUp 0.6s ease-out;
          }

          .payment-success-container {
            opacity: ${showContent ? '1' : '0'};
            transform: ${showContent ? 'scale(1)' : 'scale(0.95)'};
            transition: all 0.5s ease;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .payment-success-spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>

      <div className="payment-success-container" style={{
        maxWidth: '600px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        overflow: 'hidden'
      }}>
        {/* Header with gradient */}
        <div style={{
          background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
          padding: '48px 32px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '160px',
            height: '160px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            marginRight: '-80px',
            marginTop: '-80px'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '128px',
            height: '128px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            marginLeft: '-64px',
            marginBottom: '-64px'
          }}></div>

          {/* Success Icon */}
          <div style={{ position: 'relative' }} className="payment-success-scale-in">
            <div style={{
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '96px',
              width: '96px',
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <svg
                style={{ height: '64px', width: '64px', color: '#10b981' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  className="payment-success-checkmark"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="payment-success-slide-up" style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '8px'
          }}>
            Payment Successful!
          </h1>
          
          <p className="payment-success-slide-up" style={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: '1.125rem',
            animationDelay: '0.1s'
          }}>
            🎉 Welcome to Premium
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          <p style={{
            color: '#374151',
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '1.125rem'
          }}>
            Thank you for your subscription! Your payment has been processed successfully.
          </p>

          {transactionId && (
            <div className="payment-success-slide-up" style={{
              background: 'linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid #e5e7eb',
              animationDelay: '0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px'
                  }}>Transaction ID</p>
                  <p style={{
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    color: '#111827',
                    wordBreak: 'break-all'
                  }}>{transactionId}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(transactionId);
                    toast.success('Transaction ID copied!');
                  }}
                  style={{
                    marginLeft: '12px',
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  title="Copy to clipboard"
                >
                  <svg style={{ height: '20px', width: '20px', color: '#4b5563' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Benefits List */}
          <div className="payment-success-slide-up" style={{
            marginBottom: '24px',
            animationDelay: '0.3s'
          }}>
            {[
              { icon: '🎯', text: 'Your subscription is now active', color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
              { icon: '🚀', text: 'Full access to M3 Dashboard and all premium features', color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
              { icon: '📧', text: 'Confirmation email has been sent', color: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }
            ].map((item, index) => (
              <div 
                key={index} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                  border: '2px solid #f3f4f6',
                  marginBottom: '12px',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#f3f4f6';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  {item.icon}
                </div>
                <p style={{
                  marginLeft: '16px',
                  marginRight: 'auto',
                  color: '#1f2937',
                  fontWeight: '500',
                  marginBottom: 0
                }}>{item.text}</p>
                <svg style={{ height: '20px', width: '20px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>

          {/* Countdown Badge */}
          <div className="payment-success-slide-up" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            animationDelay: '0.7s'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #dbeafe 0%, #e0e7ff 100%)',
              border: '2px solid #93c5fd',
              borderRadius: '9999px',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg className="payment-success-spinner" style={{ height: '20px', width: '20px', color: '#2563eb' }} fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1e3a8a',
                marginBottom: 0
              }}>
                Redirecting in <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  margin: '0 4px'
                }}>{countdown}</span> seconds
              </p>
            </div>
          </div>

          {/* M3 Dashboard Access Notice */}
          <div className="payment-success-slide-up" style={{
            background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 50%, #e0f2fe 100%)',
            border: '2px solid #7dd3fc',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            animationDelay: '0.7s'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <svg style={{ height: '32px', width: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '8px'
                }}>🎉 You Now Have Access to M3 Dashboard!</h3>
                <p style={{
                  color: '#374151',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  marginBottom: 0
                }}>
                  Your premium subscription includes full access to our advanced M3 Dashboard. Please login there to unlock powerful analytics, advanced features, and enhanced management tools.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="payment-success-slide-up" style={{
            animationDelay: '0.8s'
          }}>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                width: '100%',
                background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 100%)',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1.125rem',
                boxShadow: '0 10px 15px rgba(37, 99, 235, 0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                textDecoration: 'none',
                marginBottom: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 25px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(37, 99, 235, 0.3)';
              }}
            >
              <svg style={{ height: '24px', width: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Access M3 Dashboard Now</span>
            </a>

            <button
              onClick={() => navigate(route.userDashboard)}
              style={{
                display: 'block',
                width: '100%',
                background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(16, 185, 129, 0.3)';
              }}
            >
              Go to V1 Dashboard
            </button>
            
            <button
              onClick={() => navigate(route.userSubscription)}
              style={{
                display: 'block',
                width: '100%',
                background: 'white',
                border: '2px solid #d1d5db',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9ca3af';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              View Subscription Details
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: '#f9fafb',
          padding: '16px 32px',
          textAlign: 'center',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            marginBottom: 0
          }}>
            Need help? Contact our support team at{' '}
            <a href="mailto:support@scoutung.com" style={{
              color: '#2563eb',
              fontWeight: '500',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
            >
              support@scoutung.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
