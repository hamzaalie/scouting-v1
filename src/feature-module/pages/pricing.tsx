import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {all_routes} from "../router/all_routes";
import {InputSwitch} from "primereact/inputswitch";
import {backendFunctions} from "../../helpers/backend.helper";
import {tPack} from "../../types/pack.type";
import {toast} from "react-toastify";
import {formatPrice} from "../../helpers/input.helper";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {paymentService} from "../../helpers/payment.service";

const Pricing = () => {
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

    const handleChoicePack = (chosenPack: tPack) => {
        // Prevent multiple clicks
        if (loading) return;
        setLoading(true);

        // Use our payment service to handle the flow
        //! TODO : Change price to real one after all test period
        const redirectUrl = paymentService.initiatePaymentProcess({...chosenPack, price: 100});

        if (localStorageFunctions.isUserLoggedIn()) {
            // User is logged in, show success toast and redirect to payment
            toast.success("Vous serez redirigé(e) vers la page de paiement...", {
                toastId: "redirectToast",
                theme: "colored",
            });
            setTimeout(() => {
                //! TODO : Change price to real one after all test period
                navigate(redirectUrl, {state: {...chosenPack, price: 100}});
                setLoading(false);
            }, 1500);
        } else {
            // User is not logged in, redirect to login page
            // The toast is already shown by the paymentService
            setTimeout(() => {
                navigate(redirectUrl);
                setLoading(false);
            }, 1000);
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
                                    Nous avons de <span>super Packs pour vous</span>
                                </h2>
                                <p className="sub-title">
                                    Nous proposons des services sur mesure en fonction de vos
                                    besoins spécifiques.
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
                                    Mensuel{" "}
                                    <InputSwitch
                                        key={"packPeriod"}
                                        style={{margin: "0 10px"}}
                                        checked={periodChecked.checked}
                                        onChange={() => handleSwitchPeriod()}
                                    />
                                    Annuel
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
                                                                    {formatPrice(
                                                                        pack.currency === "XOF"
                                                                            ? "fr-FR"
                                                                            : "en-US",
                                                                        pack.price,
                                                                        pack.currency
                                                                    )}
                                                                </span>

                                                                {pack.currency === "EUR" ? (
                                                                    <sup>&euro;</sup>
                                                                ) : pack.currency === "USD" ? (
                                                                    <sup>&dollar;</sup>
                                                                ) : (
                                                                    <sup>FCFA</sup>
                                                                )}
                                                            </h2>
                                                            <span>
                                                                Par{" "}
                                                                {pack.period.replace(
                                                                    pack.period[0],
                                                                    pack.period[0].toUpperCase()
                                                                )}{" "}
                                                                HT
                                                            </span>
                                                        </div>
                                                        <div className="features-price-list">
                                                            <h5>Options</h5>
                                                            <p>Vidéos</p>
                                                            <ul>
                                                                <li className="active">
                                                                    <i className="feather-check-circle" />
                                                                    Inclus : Championnat de U20
                                                                </li>
                                                                <li className="active">
                                                                    <i className="feather-check-circle" />
                                                                    Inclus : Analyse Data (Données){" "}
                                                                </li>
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
                                                                        Traitement...
                                                                    </>
                                                                ) : (
                                                                    "Choisissez votre pack"
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
