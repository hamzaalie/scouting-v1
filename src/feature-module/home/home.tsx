/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link, useNavigate} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import {tPack} from "../../types/pack.type";
import {backendFunctions} from "../../helpers/backend.helper";
import {InputSwitch} from "primereact/inputswitch";
import {formatPrice} from "../../helpers/input.helper";
import {paymentService} from "../../helpers/payment.service";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

interface CinetPayConfig {
  apikey: string;
  site_id: string;
  notify_url: string;
  return_url: string;
  cancel_url: string;
}

interface PaymentData {
  transactionId: string;
  amount: number;
  plan: string;
  user: { email: string; id: string };
  cinetpayConfig: CinetPayConfig;
}

interface CinetPayResponse {
  status: string;
}

interface CinetPayError {
  message?: string;
}

const Home = () => {
    const {t} = useTranslation();
    const routes = all_routes;
    const navigate = useNavigate();

    //Handle Switch
    const [countryModechecked, setCountryModeChecked] = useState({
        checked: false,
        mode: "local",
    });
    const [periodChecked, setPeriodChecked] = useState({
        checked: false,
        mode: "mois",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleSwitchCountry = () => {
        setCountryModeChecked((prev) => ({
            ...prev,
            checked: !prev.checked,
            mode: prev.mode === "local" ? "international" : "local",
        }));
    };

    const handleSwitchPeriod = () => {
        setPeriodChecked((prev) => ({
            ...prev,
            checked: !prev.checked,
            mode: prev.mode === "mois" ? "année" : "mois",
        }));
    };

    const handleChoicePack = async (chosenPack: tPack) => {
        // Prevent multiple clicks
        if (loading) return;

        // Check if user is logged in
        if (!localStorageFunctions.isUserLoggedIn()) {
            toast.warning("Please login to subscribe to a plan", {
                toastId: "loginRequired",
                theme: "colored",
            });
            setTimeout(() => {
                navigate(routes.login);
            }, 1000);
            return;
        }

        try {
            setLoading(true);

            // Call payments API to initiate payment
            const response = await fetch('http://localhost:3000/api/payments/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorageFunctions.getToken()}`
                },
                body: JSON.stringify({
                    planId: chosenPack.id,
                    amount: chosenPack.price
                })
            });

            if (!response.ok) {
                throw new Error('Failed to initiate payment');
            }

            const paymentData = await response.json();
            
            toast.success('Redirecting to payment gateway...');
            
            // Redirect to CinetPay
            redirectToCinetPay(paymentData);

        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment initiation failed. Please try again.');
            setLoading(false);
        }
    };

    const redirectToCinetPay = (paymentData: PaymentData) => {
        const { transactionId, amount, plan, user, cinetpayConfig } = paymentData;

        // CinetPay Seamless Integration
        const win = window as typeof window & { CinetPay: any };
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
            });

            win.CinetPay.waitResponse((data: CinetPayResponse) => {
                if (data.status === 'REFUSED') {
                    toast.error('Payment was cancelled');
                    setLoading(false);
                } else if (data.status === 'ACCEPTED') {
                    toast.success('Payment successful! Redirecting...');
                    window.location.href = cinetpayConfig.return_url;
                }
            });

            win.CinetPay.onError((data: CinetPayError) => {
                toast.error(data.message || 'Payment error occurred');
                setLoading(false);
            });
        } else {
            toast.error('Payment system not loaded. Please refresh the page.');
            setLoading(false);
        }
    };

    //All Packs fetched
    const [allPacks, setAllPacks] = useState<Array<tPack>>([]);
    const [packsToDisplay, setPacksToDisplay] = useState<Array<tPack>>([]);

    useEffect(() => {
        //Query
        backendFunctions.packs
            .getAllPacks()
            .then((response) => {
                //console.log("🚀 ~ .then ~ response:", response);
                setAllPacks(response);
                setPacksToDisplay(
                    response.filter(
                        (pack: tPack) =>
                            pack.option === countryModechecked.mode &&
                            pack.period === periodChecked.mode
                    )
                );
            })
            .catch((error) => {
                //console.log("🚀 ~ Pricing ~ error:", error);
                setAllPacks([]);
            });
    }, []);

    useEffect(() => {
        setPacksToDisplay(
            allPacks
                .sort((a, b) => a.price - b.price)
                .filter(
                    (pack) =>
                        pack.option === countryModechecked.mode &&
                        pack.period === periodChecked.mode
                )
        );
        //console.log("🚀 ~ Pricing in useEffect ~ packsToDisplay:", packsToDisplay);
    }, [countryModechecked, periodChecked]);

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
                                        {t('home.heroTitle').split(',')[0]}{" "}
                                        <span style={{textTransform: "lowercase", color: "#fff"}}>
                                            {t('home.heroTitle').split(' ')[1]}
                                        </span>{" "}
                                        <span>IDA</span>, {t('home.heroTitle').split(', ')[1]}
                                    </h1>
                                    <p className="sub-info">
                                        {t('home.heroSubtitle')}
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
                            {t('home.briefTitle').split('...')[0]} <span>...</span>
                        </h2>
                        <p className="sub-title">
                            {t('home.briefSubtitle')}
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
                                        <Link to={"#"}>{t('home.tech1Title')}</Link>
                                    </h5>
                                    <p>
                                        {t('home.tech1Content')}
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
                                        <Link to={"#"}>{t('home.tech2Title')}</Link>
                                    </h5>
                                    <p>
                                        {t('home.tech2Content')}
                                        <br />
                                        <span style={{color: "#74aef5"}} className="fw-bold">
                                            {t('home.tech2Highlight')}
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
                                        <Link to={"#"}>{t('home.tech3Title')}</Link>
                                    </h5>
                                    <p>
                                        {t('home.tech3Content')} <br />
                                        <span style={{color: "#74aef5"}} className="fw-bold">
                                            {t('home.tech3Highlight')}
                                        </span>{" "}
                                        <br />
                                        {t('home.tech3Footer')}
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
                            {t('home.whatIsTitle').split('IDA')[0]} <span>IDA</span> ?
                        </h2>
                        <p className="sub-title">
                            {t('home.whatIsSubtitle')}
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
                                        <Link to={routes.expertise}>{t('home.ourExpertise')}</Link>
                                    </h4>
                                    <Link to={routes.expertise}>{t('home.seeMore')}</Link>
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
                                        <Link to={routes.mission}>{t('home.ourMission')}</Link>
                                    </h4>
                                    <Link to={routes.mission}>{t('home.seeMore')}</Link>
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
                                        <Link to={routes.whyIDA}>{t('home.whyIDA')}</Link>
                                    </h4>
                                    <Link to={routes.whyIDA}>{t('home.seeMore')}</Link>
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
                                        <Link to={routes.team}>{t('home.ourTeam')}</Link>
                                    </h4>
                                    <Link to={routes.team}>{t('home.seeMore')}</Link>
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
                        <h2>{t('home.visionTitle')}</h2>
                        <p>
                            {t('home.visionSubtitle')}
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
                        <h2>
                            {t('home.title').split('super')[0]} <span>super {t('home.title').split('super')[1]}</span>
                        </h2>
                        <p className="sub-title">
                            {t('home.subtitle')}
                        </p>
                    </div>
                    <div hidden className="interset-btn aos" data-aos="fade-up">
                        <div className="status-toggle d-inline-flex align-items-center">
                            {t('home.local')}
                            <InputSwitch
                                key={"packCountryMode"}
                                style={{margin: "0 10px"}}
                                checked={countryModechecked.checked}
                                onChange={() => handleSwitchCountry()}
                            />
                            {t('home.international')}
                        </div>
                    </div>
                    <div className="interset-btn aos" data-aos="fade-up">
                        <div className="status-toggle d-inline-flex align-items-center">
                            {t('home.monthly')}{" "}
                            <InputSwitch
                                key={"packPeriod"}
                                style={{margin: "0 10px"}}
                                checked={periodChecked.checked}
                                onChange={() => handleSwitchPeriod()}
                            />
                            {t('home.annual')}
                        </div>
                    </div>
                    <div className="price-wrap aos" data-aos="fade-up">
                        <div className="row justify-content-center">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">{t('home.loading')}</p>
                                </div>
                            ) : packsToDisplay.length <= 0 ? (
                                <div className="text-center">
                                    <ImageWithBasePath
                                        src={"assets/img/no-data.svg"}
                                        alt="No pack found"
                                        style={{
                                            height: "22.5rem",
                                        }}
                                    />
                                    <p className="mt-3">
                                        Aucun pack disponible pour cette sélection
                                    </p>
                                </div>
                            ) : (
                                packsToDisplay.map((pack, index) => (
                                    <div
                                        className="col-lg-4 d-flex col-md-6"
                                        key={pack.id || index}
                                    >
                                        <div className="price-card flex-fill">
                                            <div
                                                className={
                                                    pack.title.includes("Or")
                                                        ? "price-head expert-price"
                                                        : "price-head"
                                                }
                                            >
                                                <ImageWithBasePath
                                                    src={
                                                        pack.title.includes("Or")
                                                            ? "assets/img/icons/price-02.svg"
                                                            : "assets/img/icons/price-01.svg"
                                                    }
                                                    alt="Price"
                                                />

                                                <h3>{pack.title}</h3>
                                                <span hidden={!pack.title.includes("Or")}>
                                                    {t('home.recommended')}
                                                </span>
                                            </div>
                                            <div className="price-body">
                                                <div className="per-month">
                                                    <h2>
                                                        <span>
                                                            {pack.price}
                                                        </span>
                                                        <sup>{pack.currency}</sup>
                                                    </h2>
                                                    <span>
                                                        {t('home.per')}{" "}
                                                        {pack.period.replace(
                                                            pack.period[0],
                                                            pack.period[0].toUpperCase()
                                                        )}{" "}
                                                        {t('home.beforeTax')}
                                                    </span>
                                                </div>
                                                <div className="features-price-list">
                                                    <h6 className="text-muted mb-3">{pack.target ? t(pack.target) : ''}</h6>
                                                    <ul>
                                                        {pack.features && pack.features.map((feature: string, idx: number) => (
                                                            <li key={idx} className="active">
                                                                <i className="feather-check-circle text-success" />
                                                                {t(feature)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="price-choose">
                                                    <button
                                                        onClick={() => handleChoicePack(pack)}
                                                        className="btn viewdetails-btn"
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <i className="feather-loader me-2"></i>
                                                                {t('home.processing')}
                                                            </>
                                                        ) : (
                                                            t('home.choosePack')
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
