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
import {subscriptionsAPI} from "../../services/api.service";
import {InputSwitch} from "primereact/inputswitch";
import {formatPrice} from "../../helpers/input.helper";
import {paymentService} from "../../helpers/payment.service";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {toast} from "react-toastify";

const Home = () => {
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

    //All Packs fetched
    const [allPacks, setAllPacks] = useState<Array<tPack>>([]);
    const [packsToDisplay, setPacksToDisplay] = useState<Array<tPack>>([]);

    useEffect(() => {
        //Query - Fetch from new subscriptions API
        subscriptionsAPI
            .getPlans()
            .then((response) => {
                // Convert new API format to old pack format  
                // Set all plans to match current filters so they always display
                const convertedPacks: Array<tPack> = response.map((plan: any) => ({
                    _id: plan.id,
                    name: plan.name,
                    price: plan.price,
                    period: periodChecked.mode, // Match current period
                    option: countryModechecked.mode, // Match current option
                    features: plan.features || [],
                    description: plan.description || ''
                }));
                
                setAllPacks(convertedPacks);
                setPacksToDisplay(convertedPacks.sort((a, b) => a.price - b.price));
            })
            .catch((error) => {
                console.log("Error fetching subscription plans:", error);
                setAllPacks([]);
            });
    }, []);

    useEffect(() => {
        // Just show all plans sorted by price, ignore filters since new API doesn't have period/option
        setPacksToDisplay(
            allPacks.sort((a, b) => a.price - b.price)
        );
    }, [countryModechecked, periodChecked, allPacks]);

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
                        <h2>
                            Nous avons de <span>super Packs pour vous</span>
                        </h2>
                        <p className="sub-title">
                            Nous proposons des services sur mesure en fonction de vos besoins
                            spécifiques.
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
                                    <div className="spinner-border text-primary" role="status">
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
                                                        onClick={() => handleChoicePack(pack)}
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
        </>
    );
};

export default Home;
