/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link, useNavigate} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import {subscriptionsAPI, paymentsAPI} from "../../services/api.service";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    currency: string;
    duration: number;
    features: string[];
}

const Home = () => {
    const routes = all_routes;
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(false);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [currentSubscription, setCurrentSubscription] = useState<{ status: string; expires_at: string } | null>(null);

    // Subscription plans
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [displayedPlans, setDisplayedPlans] = useState<SubscriptionPlan[]>([]);

    useEffect(() => {
        // Fetch subscription plans
        const fetchPlans = async () => {
            try {
                setLoading(true);
                const response = await subscriptionsAPI.getPlans();
                setPlans(response.plans);
                setDisplayedPlans(response.plans);
            } catch (error) {
                console.error('Error fetching plans:', error);
                toast.error('Failed to load subscription plans');
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
        fetchCurrentSubscription();
    }, []);

    const fetchCurrentSubscription = async () => {
        try {
            const response = await subscriptionsAPI.getStatus();
            setCurrentSubscription(response);
        } catch (error) {
            console.log('No current subscription');
        }
    };

    const handleSubscribe = async (plan: SubscriptionPlan) => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            toast.info(t('common.pleaseLoginFirst') || 'Please login first to subscribe');
            navigate(routes.login);
            return;
        }

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
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            toast.info(t('common.pleaseLoginFirst') || 'Please login first to subscribe');
            navigate(routes.login);
            return;
        }

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

    //console.log("🚀 ~ Pricing ~ packsToDisplay:", packsToDisplay);

    useEffect(() => {
        AOS.init({duration: 1200, once: true});
    }, []);

    return (
        <>
            <section className="hero-section">
                <div className="banner-shapes">
                    <div className="banner-dot-one">
                        <span />
                    </div>
                    <div className="banner-dot-two">
                        <span />
                    </div>
                </div>
                <div className="container">
                    <div className="home-banner">
                        <div className="row align-items-center w-100">
                            <div className="col-lg-7 col-md-10 mx-auto">
                                <div className="section-search aos" data-aos="fade-up">
                                    <h1>
                                        Bienvenue{" "}
                                        <span style={{textTransform: "lowercase", color: "#fff"}}>
                                            sur
                                        </span>{" "}
                                        <span>IDA</span>, Intelligence Data Analytics
                                    </h1>
                                    <p className="sub-info">
                                        Nous redéfinissons l&apos;avenir du football en Côte
                                        d&apos;Ivoire grâce à l&apos;exploitation des données
                                        sportives avancées.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="banner-imgs text-center aos" data-aos="fade-up">
                                    <ImageWithBasePath
                                        style={{borderRadius: "5% 50%"}}
                                        className="img-fluid"
                                        src="assets/img/bg/black-football-player.jpg"
                                        alt="Banner"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section work-section">
                <div className="container">
                    <div className="section-heading aos" data-aos="fade-up">
                        <h2>
                            En <span>bref...</span>
                        </h2>
                        <p className="sub-title">
                            Notre projet se concentre sur la collecte et l&apos;analyse de données
                            précises et détaillées, directement issues des matchs.
                        </p>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-lg-4 col-md-6 d-flex">
                            <div className="work-grid w-100 aos" data-aos="fade-up">
                                <div className="work-icon">
                                    <div className="work-icon-inner">
                                        <ImageWithBasePath
                                            src="assets/img/icons/work-icon1.svg"
                                            alt="Icon"
                                        />
                                    </div>
                                </div>
                                <div className="work-content">
                                    <h5>
                                        <Link to={"#"}>Une technologie puissante</Link>
                                    </h5>
                                    <p>
                                        Nous utilisons les dernières technologies de caméras IA pour
                                        capturer chaque instant du jeu, permettant une analyse
                                        approfondie des performances des joueurs et des équipes.{" "}
                                        <br />
                                        Ces outils innovants offrent une vue d&apos;ensemble unique,
                                        capturant des angles impossibles à obtenir par les moyens
                                        traditionnels.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex">
                            <div className="work-grid w-100 aos" data-aos="fade-up">
                                <div className="work-icon">
                                    <div className="work-icon-inner">
                                        <ImageWithBasePath
                                            src="assets/img/icons/work-icon2.svg"
                                            alt="Icon"
                                        />
                                    </div>
                                </div>
                                <div className="work-content">
                                    <h5>
                                        <Link to={"#"}> Des performances optimales obtenues</Link>
                                    </h5>
                                    <p>
                                        Nos équipes d&apos;experts transforment ces données en
                                        informations exploitables, offrant aux clubs, entraîneurs,
                                        et agents des insights précis pour améliorer les stratégies
                                        de jeu, optimiser les performances des joueurs, et
                                        identifier les talents prometteurs.
                                        <br />
                                        <span style={{color: "#74aef5"}} className="fw-bold">
                                            Avec IDA, chaque détail compte.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex">
                            <div className="work-grid w-100 aos" data-aos="fade-up">
                                <div className="work-icon">
                                    <div className="work-icon-inner">
                                        <ImageWithBasePath
                                            src="assets/img/icons/work-icon3.svg"
                                            alt="Icon"
                                        />
                                    </div>
                                </div>
                                <div className="work-content">
                                    <h5>
                                        <Link to={"#"}>Un succès accéléré</Link>
                                    </h5>
                                    <p>
                                        Que vous soyez un club à la recherche d&apos;un avantage
                                        compétitif, un agent souhaitant repérer le prochain grand
                                        talent, ou un passionné du football désireux de comprendre
                                        le jeu sous un nouvel angle, <br />
                                        <span style={{color: "#74aef5"}} className="fw-bold">
                                            IDA est votre partenaire idéal.
                                        </span>{" "}
                                        <br />
                                        Découvrez comment la puissance des données peut transformer
                                        le football ivoirien.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section journey-section">
                <div className="container">
                    <div className="section-heading aos" data-aos="fade-up">
                        <h2>
                            Qu&apos;est-ce-que <span>IDA</span> ?
                        </h2>
                        <p className="sub-title">
                            IDA est un projet innovant dédié à la collecte, l&apos;analyse, et
                            l&apos;exploitation des données sportives en Côte d&apos;Ivoire,
                            principalement dans le football
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 d-flex">
                            <div className="service-grid w-100 aos" data-aos="fade-up">
                                <div className="service-img">
                                    <Link to={routes.expertise}>
                                        <ImageWithBasePath
                                            src="assets/img/services/experts-pana.png"
                                            className="img-fluid"
                                            alt="Service"
                                        />
                                    </Link>
                                </div>
                                <div className="service-content">
                                    <h4>
                                        <Link to={routes.expertise}>Notre Expertise</Link>
                                    </h4>
                                    <Link to={routes.expertise}>Voir plus</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 d-flex">
                            <div className="service-grid w-100 aos" data-aos="fade-up">
                                <div className="service-img">
                                    <Link to={routes.mission}>
                                        <ImageWithBasePath
                                            src="assets/img/services/mission-amico.png"
                                            className="img-fluid"
                                            alt="Service"
                                        />
                                    </Link>
                                </div>
                                <div className="service-content">
                                    <h4>
                                        <Link to={routes.mission}>Notre Mission</Link>
                                    </h4>
                                    <Link to={routes.mission}>Voir plus</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 d-flex">
                            <div className="service-grid w-100 aos" data-aos="fade-up">
                                <div className="service-img">
                                    <Link to={routes.whyIDA}>
                                        <ImageWithBasePath
                                            src="assets/img/services/questions-amico.png"
                                            className="img-fluid"
                                            alt="Service"
                                        />
                                    </Link>
                                </div>
                                <div className="service-content">
                                    <h4>
                                        <Link to={routes.whyIDA}>Pourquoi IDA ?</Link>
                                    </h4>
                                    <Link to={routes.whyIDA}>Voir plus</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 d-flex">
                            <div className="service-grid w-100 aos" data-aos="fade-up">
                                <div className="service-img">
                                    <Link to={routes.team}>
                                        <ImageWithBasePath
                                            src="assets/img/services/team-pana.png"
                                            className="img-fluid"
                                            alt="Service"
                                        />
                                    </Link>
                                </div>
                                <div className="service-content">
                                    <h4>
                                        <Link to={routes.team}>Notre Équipe</Link>
                                    </h4>
                                    <Link to={routes.team}>Voir plus</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-all text-center aos" data-aos="fade-up">
                        <Link
                            to={routes.aboutUs}
                            className="btn btn-secondary d-inline-flex align-items-center"
                        >
                            Qui sommes-nous ?{" "}
                            <span className="lh-1">
                                <i className="feather-arrow-right-circle ms-2" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
            {/* /Services */}

            {/* Convenient */}
            <section className="section convenient-section">
                <div className="container">
                    <div className="convenient-content aos" data-aos="fade-up">
                        <h2>Une Vision pour Transformer le Football en Côte d&apos;Ivoire</h2>
                        <p>
                            Ensemble, nous partageons une vision commune : élever le football en
                            Côte d&apos;Ivoire à un nouveau niveau grâce à l&apos;innovation et aux
                            données.
                        </p>
                    </div>
                    <div className="convenient-btns aos" data-aos="fade-up">
                        <Link
                            to={routes.register}
                            className="btn btn-primary d-inline-flex align-items-center"
                        >
                            Rejoignez-nous{" "}
                            <span className="lh-1">
                                <i className="feather-arrow-right-circle ms-2" />
                            </span>
                        </Link>
                        <Link
                            to={routes.pricing}
                            className="btn btn-secondary d-inline-flex align-items-center"
                        >
                            Plans des packs{" "}
                            <span className="lh-1">
                                <i className="feather-arrow-right-circle ms-2" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
            {/* /Convenient */}

            {/* Journey */}
            <section className="section journey-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="start-your-journey aos" data-aos="fade-up">
                                <h2>
                                    Rejoignez-nous dans cette aventure{" "}
                                    <span className="active-sport">IDA</span> aujourd&apos;hui.
                                </h2>
                                <p>
                                    Explorez notre site pour en savoir plus sur nos services, nos
                                    solutions technologiques, et comment nous pouvons collaborer
                                    pour élever le football en Côte d&apos;Ivoire à un niveau
                                    supérieur
                                </p>
                                <p>
                                    Ensemble, nous pouvons créer un écosystème où les données et la
                                    technologie permettent de repousser les limites du possible dans
                                    le football ivoirien.
                                </p>
                                <span className="stay-approach">Nous invitons les : </span>
                                <div className="journey-list">
                                    <ul>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Clubs
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Entraîneurs
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Agents
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Spécialistes en technologie
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Professionnels de l&apos;analyse de données
                                        </li>
                                        <li>
                                            <i className="fa-solid fa-circle-check" />
                                            Passionnés de football
                                        </li>
                                    </ul>
                                </div>
                                <div className="convenient-btns">
                                    <Link
                                        to={routes.register}
                                        className="btn btn-primary d-inline-flex align-items-center"
                                    >
                                        <span>
                                            <i className="feather-user-plus me-2" />
                                        </span>
                                        Rejoignez-nous
                                    </Link>
                                    <Link
                                        to={routes.aboutUs}
                                        className="btn btn-secondary d-inline-flex align-items-center"
                                    >
                                        <span>
                                            <i className="feather-align-justify me-2" />
                                        </span>
                                        À propos de nous
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="journey-img aos" data-aos="fade-up">
                                <ImageWithBasePath
                                    src="assets/img/soccer-team-playing.webp"
                                    className="img-fluid"
                                    alt="User"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Journey */}

            {/* Featured Plans */}
            <section className="section featured-plan">
                <div className="work-img ">
                    <div className="work-img-right">
                        <ImageWithBasePath
                            src="assets/img/bg/soccer-player-alone-wbg.png"
                            alt="Icon"
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="section-heading aos" data-aos="fade-up">
                        <h2 dangerouslySetInnerHTML={{ __html: t('pricing.greatPacksTitle') }} />
                        <p className="sub-title">
                            {t('pricing.customServices')}
                        </p>
                    </div>

                    {/* Active Subscription Alert with M3 Login */}
                    {currentSubscription && currentSubscription.status === 'active' && (
                        <div className="alert alert-success mb-4 d-flex justify-content-between align-items-center" data-aos="fade-up">
                            <div>
                                <h5 className="mb-1">✅ Active Subscription</h5>
                                <p className="mb-0">
                                    Your subscription is active until{' '}
                                    {new Date(currentSubscription.expires_at).toLocaleDateString()}
                                </p>
                            </div>
                            <a
                                href="http://localhost:5173"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <i className="feather-external-link me-2"></i>
                                Login to M3 Platform
                            </a>
                        </div>
                    )}

                    <div className="price-wrap aos" data-aos="fade-up">
                        <div className="row justify-content-center">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Loading subscription plans...</p>
                                </div>
                            ) : displayedPlans.length <= 0 ? (
                                <div className="text-center">
                                    <ImageWithBasePath
                                        src={"assets/img/no-data.svg"}
                                        alt="No plans found"
                                        style={{
                                            height: "22.5rem",
                                        }}
                                    />
                                    <p className="mt-3">
                                        No subscription plans available
                                    </p>
                                </div>
                            ) : (
                                displayedPlans.map((plan, index) => (
                                    <div
                                        className="col-lg-4 d-flex col-md-6"
                                        key={plan.id || index}
                                    >
                                        <div className="price-card flex-fill">
                                            <div
                                                className={
                                                    plan.id === "annual"
                                                        ? "price-head expert-price"
                                                        : "price-head"
                                                }
                                            >
                                                <ImageWithBasePath
                                                    src={
                                                        plan.id === "annual"
                                                            ? "assets/img/icons/price-02.svg"
                                                            : "assets/img/icons/price-01.svg"
                                                    }
                                                    alt="Price"
                                                />

                                                <h3>{plan.name}</h3>
                                                <span hidden={plan.id !== "annual"}>
                                                    {t('common.recommended')}
                                                </span>
                                            </div>
                                            <div className="price-body">
                                                <div className="per-month">
                                                    <h2>
                                                        <span>
                                                            ${plan.price}
                                                        </span>
                                                        <sup>&dollar;</sup>
                                                    </h2>
                                                    <span>
                                                        per {plan.duration} days
                                                    </span>
                                                </div>
                                                <div className="features-price-list">
                                                    <h5>{t('common.features')}</h5>
                                                    <ul>
                                                        {plan.features.map((feature, idx) => (
                                                            <li key={idx} className="active">
                                                                <i className="feather-check-circle" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="price-choose">
                                                    <button
                                                        onClick={() => handleSubscribe(plan)}
                                                        disabled={processingPayment || (currentSubscription?.status === 'active')}
                                                        className="btn viewdetails-btn w-100 mb-2"
                                                    >
                                                        {processingPayment && selectedPlan === plan.id ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                Processing...
                                                            </>
                                                        ) : currentSubscription?.status === 'active' ? (
                                                            'Already Subscribed'
                                                        ) : (
                                                            t('pricing.choose')
                                                        )}
                                                    </button>

                                                    {/* TEST MODE BUTTON */}
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
                                                            '🧪 Test Mode (Skip Payment)'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* Featured Plans */}
        </>
    );
};

export default Home;
