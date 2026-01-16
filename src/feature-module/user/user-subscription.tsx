import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { subscriptionsAPI, paymentsAPI, authAPI } from '../../services/api.service';
import { all_routes } from '../router/all_routes';
import { useTranslation } from 'react-i18next';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: number;
  features: string[];
}

interface AccountDetails {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    roles: string[];
    createdAt: string;
  };
  subscription: {
    status: string;
    isActive: boolean;
    startsAt: string | null;
    expiresAt: string | null;
    renewalDate: string | null;
    autoRenew: boolean;
    daysRemaining: number | null;
  };
  payments: Array<{
    id: string;
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    completedAt: string | null;
  }>;
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    amount: number;
    issuedAt: string;
    paidAt: string | null;
    pdfUrl: string | null;
    paymentStatus: string;
  }>;
  stats: {
    totalPayments: number;
    totalSpent: number;
    activeSince: string | null;
    lastPaymentDate: string | null;
  };
}

const UserSubscription = () => {
  const { t } = useTranslation();
  const route = all_routes;
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<{ status: string; expires_at: string } | null>(null);
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [showAccountSection, setShowAccountSection] = useState(true);

  useEffect(() => {
    fetchPlans();
    fetchCurrentSubscription();
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
    try {
      const details = await authAPI.getAccountDetails();
      setAccountDetails(details);
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

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

  const fetchCurrentSubscription = async () => {
    try {
      const response = await subscriptionsAPI.getStatus();
      setCurrentSubscription(response);
    } catch (error) {
      console.log('No current subscription');
    }
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      setProcessingPayment(true);
      setSelectedPlan(plan.id);

      // Initiate payment
      const paymentData = await paymentsAPI.initiate(plan.id, plan.price);

      toast.success('Redirecting to payment gateway...');
      
      // Redirect to CinetPay checkout
      redirectToCinetPay(paymentData);

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initiation failed');
      setProcessingPayment(false);
      setSelectedPlan(null);
    }
  };

  const handleTestModeSubscribe = async (plan: SubscriptionPlan) => {
    try {
      setProcessingPayment(true);
      setSelectedPlan(plan.id);

      // Initiate payment
      const paymentData = await paymentsAPI.initiate(plan.id, plan.price);

      toast.info('🧪 TEST MODE: Simulating successful payment...', { autoClose: 2000 });
      
      // Call test webhook to complete payment
      setTimeout(async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/webhooks/test-payment-success?transaction_id=${paymentData.transactionId}`
          );
          const result = await response.json();
          
          if (result.success) {
            toast.success('✅ Test payment completed! Redirecting...');
            setTimeout(() => {
              window.location.href = '/payment/success?transaction_id=' + paymentData.transactionId;
            }, 1500);
          } else {
            throw new Error(result.error || 'Test payment failed');
          }
        } catch (error) {
          console.error('Test payment error:', error);
          toast.error('Test payment failed');
          setProcessingPayment(false);
          setSelectedPlan(null);
        }
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment initiation failed');
      setProcessingPayment(false);
      setSelectedPlan(null);
    }
  };

  const redirectToCinetPay = (paymentData: {
    transactionId: string;
    amount: number;
    plan: string;
    user: { email: string; id: string };
    cinetpayConfig: {
      apikey: string;
      site_id: string;
      notify_url: string;
      return_url: string;
      cancel_url: string;
    };
  }) => {
    const { transactionId, amount, plan, user, cinetpayConfig } = paymentData;

    // CinetPay Seamless Integration
    const win = window as Window & { CinetPay?: { setConfig: (config: Record<string, string>) => void; getCheckout: (data: Record<string, unknown>) => void; waitResponse: (callback: (data: { status: string }) => void) => void; onError: (callback: (data: { message?: string }) => void) => void } };
    if (typeof win.CinetPay !== 'undefined') {
      win.CinetPay.setConfig({
        apikey: cinetpayConfig.apikey,
        site_id: cinetpayConfig.site_id,
        notify_url: cinetpayConfig.notify_url,
        mode: 'PRODUCTION'
      });

      win.CinetPay.getCheckout({
        transaction_id: transactionId,
        amount: amount,
        currency: 'XOF',
        channels: 'ALL',
        description: `Subscription ${plan}`,
        customer_name: user.email.split('@')[0],
        customer_surname: user.email.split('@')[0],
        customer_email: user.email,
        customer_phone_number: '0000000000',
        customer_address: 'N/A',
        customer_city: 'Abidjan',
        customer_country: 'CI',
        customer_state: 'CI',
        customer_zip_code: '00000',
      });

      win.CinetPay.waitResponse((data) => {
        if (data.status === 'REFUSED') {
          toast.error('Payment was refused');
          setProcessingPayment(false);
          setSelectedPlan(null);
        } else if (data.status === 'ACCEPTED') {
          toast.success('Payment successful!');
          window.location.href = cinetpayConfig.return_url + '?transaction_id=' + transactionId;
        }
      });

      win.CinetPay.onError((data) => {
        console.error('CinetPay Error:', data);
        toast.error('Payment error: ' + (data.message || 'Unknown error'));
        setProcessingPayment(false);
        setSelectedPlan(null);
      });
    } else {
      toast.error('Payment system not loaded. Please refresh the page.');
      setProcessingPayment(false);
      setSelectedPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="main-wrapper">
        <div className="content">
          <div className="container">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-3">Loading subscription plans...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      {/* Breadcrumb */}
      <div className="breadcrumb breadcrumb-list mb-0">
        <span className="primary-right-round" />
        <div className="container">
          <h1 className="text-white">Subscription Plans</h1>
          <ul>
            <li>
              <a href={route.home}>Home</a>
            </li>
            <li>Subscription Plans</li>
          </ul>
        </div>
      </div>
      {/* /Breadcrumb */}

      {/* Page Content */}
      <div className="content py-5">
        <div className="container">
          
          {/* Account Details Section */}
          {accountDetails && showAccountSection && (
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">My Account</h4>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowAccountSection(!showAccountSection)}
                >
                  {showAccountSection ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="card-body">
                
                {/* Subscription Status */}
                <div className="row mb-4">
                  <div className="col-md-12">
                    <h5 className="mb-3">Subscription Status</h5>
                    <div className="row">
                      <div className="col-md-3 col-sm-6 mb-3">
                        <div className="d-flex align-items-center">
                          <i className={`feather-${accountDetails.subscription.isActive ? 'check-circle text-success' : 'x-circle text-danger'} me-2`} style={{ fontSize: '24px' }}></i>
                          <div>
                            <small className="text-muted d-block">Status</small>
                            <strong className={`text-${accountDetails.subscription.isActive ? 'success' : 'danger'}`}>
                              {accountDetails.subscription.status.toUpperCase()}
                            </strong>
                          </div>
                        </div>
                      </div>
                      
                      {accountDetails.subscription.expiresAt && (
                        <div className="col-md-3 col-sm-6 mb-3">
                          <div className="d-flex align-items-center">
                            <i className="feather-calendar me-2 text-primary" style={{ fontSize: '24px' }}></i>
                            <div>
                              <small className="text-muted d-block">Expires On</small>
                              <strong>{new Date(accountDetails.subscription.expiresAt).toLocaleDateString()}</strong>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {accountDetails.subscription.daysRemaining !== null && (
                        <div className="col-md-3 col-sm-6 mb-3">
                          <div className="d-flex align-items-center">
                            <i className="feather-clock me-2 text-warning" style={{ fontSize: '24px' }}></i>
                            <div>
                              <small className="text-muted d-block">Days Remaining</small>
                              <strong>{accountDetails.subscription.daysRemaining} days</strong>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="col-md-3 col-sm-6 mb-3">
                        <div className="d-flex align-items-center">
                          <i className={`feather-${accountDetails.subscription.autoRenew ? 'repeat' : 'pause-circle'} me-2 text-info`} style={{ fontSize: '24px' }}></i>
                          <div>
                            <small className="text-muted d-block">Auto-Renew</small>
                            <strong>{accountDetails.subscription.autoRenew ? 'Enabled' : 'Disabled'}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Account Stats */}
                <div className="row mb-4">
                  <div className="col-md-12">
                    <h5 className="mb-3">Account Statistics</h5>
                    <div className="row">
                      <div className="col-md-3 col-sm-6 mb-3">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h3 className="text-primary mb-0">{accountDetails.stats.totalPayments}</h3>
                            <small className="text-muted">Total Payments</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-6 mb-3">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h3 className="text-success mb-0">${accountDetails.stats.totalSpent.toFixed(2)}</h3>
                            <small className="text-muted">Total Spent</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-6 mb-3">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h3 className="text-info mb-0">
                              {accountDetails.stats.activeSince 
                                ? new Date(accountDetails.stats.activeSince).toLocaleDateString()
                                : 'N/A'}
                            </h3>
                            <small className="text-muted">Member Since</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-6 mb-3">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h3 className="text-warning mb-0">
                              {accountDetails.stats.lastPaymentDate 
                                ? new Date(accountDetails.stats.lastPaymentDate).toLocaleDateString()
                                : 'N/A'}
                            </h3>
                            <small className="text-muted">Last Payment</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Payment History */}
                {accountDetails.payments.length > 0 && (
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h5 className="mb-3">Recent Payments</h5>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Transaction ID</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountDetails.payments.slice(0, 5).map((payment) => (
                              <tr key={payment.id}>
                                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                <td><code className="small">{payment.transactionId}</code></td>
                                <td>${payment.amount.toFixed(2)}</td>
                                <td>
                                  <span className={`badge bg-${
                                    payment.status === 'completed' ? 'success' :
                                    payment.status === 'pending' ? 'warning' :
                                    payment.status === 'failed' ? 'danger' : 'secondary'
                                  }`}>
                                    {payment.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                <hr />

                {/* Invoices */}
                {accountDetails.invoices.length > 0 && (
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="mb-3">Invoices</h5>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Invoice #</th>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountDetails.invoices.slice(0, 5).map((invoice) => (
                              <tr key={invoice.id}>
                                <td><strong>{invoice.invoiceNumber}</strong></td>
                                <td>{new Date(invoice.issuedAt).toLocaleDateString()}</td>
                                <td>${invoice.amount.toFixed(2)}</td>
                                <td>
                                  <span className={`badge bg-${
                                    invoice.paymentStatus === 'completed' ? 'success' :
                                    invoice.paymentStatus === 'pending' ? 'warning' : 'danger'
                                  }`}>
                                    {invoice.paidAt ? 'Paid' : 'Unpaid'}
                                  </span>
                                </td>
                                <td>
                                  {invoice.pdfUrl ? (
                                    <a 
                                      href={invoice.pdfUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="btn btn-sm btn-outline-primary"
                                    >
                                      <i className="feather-download me-1"></i>
                                      Download
                                    </a>
                                  ) : (
                                    <span className="text-muted small">Processing...</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* TEST MODE NOTICE */}
          <div className="alert alert-warning mb-4">
            <div className="d-flex align-items-start">
              <i className="feather-alert-circle me-3" style={{ fontSize: '24px' }}></i>
              <div>
                <h5 className="alert-heading mb-2">⚠️ CinetPay Account Activation Required</h5>
                <p className="mb-2">
                  <strong>Payment processing is currently unavailable</strong> because the CinetPay merchant account needs to be activated.
                </p>
                <p className="mb-2 small">
                  <strong>What to do:</strong> Contact CinetPay support at <a href="mailto:support@cinetpay.com">support@cinetpay.com</a> with Site ID: <strong>5875998</strong>
                </p>
                <p className="mb-0 small">
                  <strong>For testing:</strong> Use the &ldquo;🧪 Test Mode&rdquo; button below to simulate successful payments and test the subscription flow.
                </p>
              </div>
            </div>
          </div>

          {/* Current Subscription Status */}
          {currentSubscription && currentSubscription.status === 'active' && (
            <div className="alert alert-success mb-4">
              <h5>✅ Active Subscription</h5>
              <p className="mb-0">
                Your subscription is active until{' '}
                {new Date(currentSubscription.expires_at).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Pricing Section */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-8 text-center">
              <h2 className="mb-3">Choose Your Plan</h2>
              <p className="text-muted">
                Get full access to our football scouting platform with any of our subscription plans
              </p>
            </div>
          </div>

          <div className="row">
            {plans.map((plan) => (
              <div key={plan.id} className="col-lg-4 col-md-6 mb-4">
                <div className={`card pricing-card h-100 ${plan.id === 'annual' ? 'featured-plan' : ''}`}>
                  {plan.id === 'annual' && (
                    <div className="badge-ribbon">
                      <span className="badge bg-primary">BEST VALUE</span>
                    </div>
                  )}
                  
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title text-center mb-4">{plan.name}</h3>
                    
                    <div className="text-center mb-4">
                      <h2 className="display-4 mb-0">
                        <span className="currency">€</span>
                        {plan.price}
                      </h2>
                      <small className="text-muted">per {plan.duration} days</small>
                    </div>

                    <ul className="list-unstyled mb-4 flex-grow-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="mb-3">
                          <i className="feather-check-circle text-success me-2"></i>
                          {t(feature)}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSubscribe(plan)}
                      disabled={processingPayment || (currentSubscription?.status === 'active')}
                      className={`btn w-100 mb-2 ${
                        plan.id === 'annual'
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                    >
                      {processingPayment && selectedPlan === plan.id ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        <>Subscribe with CinetPay</>
                      )}
                    </button>

                    {/* TEST MODE BUTTON - Remove in production */}
                    <button
                      onClick={() => handleTestModeSubscribe(plan)}
                      disabled={processingPayment || (currentSubscription?.status === 'active')}
                      className="btn btn-warning w-100 btn-sm"
                      style={{ fontSize: '0.85rem' }}
                    >
                      {processingPayment && selectedPlan === plan.id ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Testing...
                        </>
                      ) : (
                        <>🧪 Test Mode (Skip Payment)</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <p className="text-muted">
                Already subscribed?{' '}
                <a href={route.userDashboard} className="text-primary">
                  Go to Dashboard
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubscription;
