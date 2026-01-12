import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { subscriptionsAPI, paymentsAPI } from '../../services/api.service';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
}

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await subscriptionsAPI.getPlans();
      setPlans(response.plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load subscription plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      setProcessingPayment(true);
      setSelectedPlan(plan.id);

      // Initiate payment
      await paymentsAPI.initiate(plan.id, plan.price);

      // Redirect to CinetPay payment page
      toast.info('Redirecting to payment gateway...');
      
      // Navigate to subscription page which handles CinetPay
      navigate('/user/user-subscription');

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initiation failed');
    } finally {
      setProcessingPayment(false);
      setSelectedPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Get access to our football scouting platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 ${
                plan.id === 'annual' ? 'border-4 border-blue-500' : ''
              }`}
            >
              {plan.id === 'annual' && (
                <div className="bg-blue-500 text-white text-center py-2 font-semibold">
                  BEST VALUE
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    / {plan.duration} days
                  </span>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={processingPayment}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                    plan.id === 'annual'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-900 text-white'
                  } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {processingPayment && selectedPlan === plan.id
                    ? 'Processing...'
                    : 'Subscribe Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Already have a subscription?{' '}
            <button
              onClick={() => navigate('/user/user-dashboard')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Go to Dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
