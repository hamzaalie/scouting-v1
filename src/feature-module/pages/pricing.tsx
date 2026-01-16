import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {all_routes} from "../router/all_routes";
import {InputSwitch} from "primereact/inputswitch";
import {backendFunctions} from "../../helpers/backend.helper";
import {tPack} from "../../types/pack.type";
import {toast} from "react-toastify";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
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

const Pricing = () => {
    const {t} = useTranslation();
    const routes = all_routes;
    const navigate = useNavigate();

    // Handle Switch
    const [countryModechecked, setCountryModeChecked] = useState({
        checked: false,
        mode: "local",
    });
    const [periodChecked, setPeriodChecked] = useState({
        checked: false,
        mode: "mois",
    });

    // All Packs fetched
    const [allPacks, setAllPacks] = useState<Array<tPack>>([]);
    const [packsToDisplay, setPacksToDisplay] = useState<Array<tPack>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSwitchCountry = () => {
        setCountryModeChecked((prev) => ({
            ...prev,
            checked: !prev.checked,
        }));
    };

    const handleSwitchPeriod = () => {
        setPeriodChecked((prev) => ({
            ...prev,
            checked: !prev.checked,
            mode: prev.mode === "mois" ? "année" : "mois",
        }));
    };

    useEffect(() => {
        // Load all packs
        loadPacks();
    }, []);

    const loadPacks = () => {
        setLoading(true);
        backendFunctions.packs
            .getAllPacks()
            .then((response) => {
                setAllPacks(response);
                setPacksToDisplay(
                    response.filter(
                        (pack: tPack) =>
                            pack.option === countryModechecked.mode &&
                            pack.period === periodChecked.mode
                    )
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading packs:", error);
                setAllPacks([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        // Update displayed packs when filters change
        setPacksToDisplay(
            allPacks
                .sort((a, b) => a.price - b.price)
                .filter(
                    (pack) =>
                        pack.option === countryModechecked.mode &&
                        pack.period === periodChecked.mode
                )
        );
    }, [countryModechecked, periodChecked, allPacks]);

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

            const paymentData = await response.json() as PaymentData;
            
            toast.success('Redirecting to payment gateway...');
            
            // Redirect to CinetPay
            redirectToCinetPay(paymentData);

        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            console.error('Payment error:', err);
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

    return (
        <div>
            <>
                {/* Breadcrumb */}
                <div className="breadcrumb breadcrumb-list mb-0">
                    <span className="primary-right-round" />
                    <div className="container">
                        <h1 className="text-white">Achat de Packs</h1>
                        <ul>
                            <li>
                                <Link to={routes.home}>Accueil</Link>
                            </li>
                            <li>Packs</li>
                        </ul>
                    </div>
                </div>
                {/* /Breadcrumb */}
                {/* Page Content */}
                <div className="content">
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
                                    National{" "}
                                    <InputSwitch
                                        key={"packCountryMode"}
                                        style={{margin: "0 10px"}}
                                        checked={countryModechecked.checked}
                                        onChange={() => handleSwitchCountry()}
                                    />
                                    International
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
                                            <div
                                                className="spinner-border text-primary"
                                                role="status"
                                            >
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Chargement des packs...</p>
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
                                                            Recommandé
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
                                                                onClick={() =>
                                                                    handleChoicePack(pack)
                                                                }
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
                </div>
                {/* /Page Content */}
            </>
        </div>
    );
};

export default Pricing;
