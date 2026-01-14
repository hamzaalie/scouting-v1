import React from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import {useTranslation} from "react-i18next";

const AboutUs = () => {
    const routes = all_routes;
    const { t } = useTranslation();

    return (
        <div>
            {/* Breadcrumb */}
            <div className="breadcrumb breadcrumb-list mb-0">
                <span className="primary-right-round" />
                <div className="container">
                    <h1 className="text-white">{t('aboutUs.title')}</h1>
                    <ul>
                        <li>
                            <Link to={routes.home}>{t('common.home')}</Link>
                        </li>
                        <li>{t('aboutUs.breadcrumb')}</li>
                    </ul>
                </div>
            </div>
            {/* /Breadcrumb */}
            {/* Page Content */}
            <div className="aboutUs-content">
                {/* About Us Info */}
                <section className="aboutus-info" id="our-mission">
                    <div className="container">
                        {/* Banners */}
                        <div className="row d-flex align-items-center">
                            <div className=" col-12 col-sm-3 col-md-3 col-lg-3">
                                <div className="banner text-center">
                                    <ImageWithBasePath
                                        src="assets/img/aboutus/soccer-ball.webp"
                                        className="img-fluid corner-radius-10"
                                        alt="Banner-01"
                                    />
                                </div>
                            </div>
                            <div className=" col-12 col-sm-6 col-md-6 col-lg-6">
                                <div className="banner text-center">
                                    <ImageWithBasePath
                                        src="assets/img/aboutus/soccer-terrain.webp"
                                        className="img-fluid corner-radius-10"
                                        alt="Banner-02"
                                    />
                                </div>
                            </div>
                            <div className=" col-12 col-sm-3 col-md-3 col-lg-3">
                                <div className="banner text-center">
                                    <ImageWithBasePath
                                        src="assets/img/aboutus/soccer-player-alone.webp"
                                        className="img-fluid corner-radius-10"
                                        alt="Banner-03"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* /Banners */}
                        {/* Vision-Mission */}
                        <div className="vision-mission">
                            <div className="row">
                                <div className=" col-12 col-sm-12 col-md-12 col-lg-8">
                                    <h2>{t('aboutUs.ourVision')}</h2>
                                    <p>
                                        {t('aboutUs.visionText1')}
                                    </p>
                                    <p>
                                        {t('aboutUs.visionText2')}
                                    </p>
                                </div>
                                <div className=" col-12 col-sm-12 col-md-12 col-lg-4">
                                    <div className="mission-bg">
                                        <h2>{t('aboutUs.ourMission')}</h2>
                                        <p>
                                            Notre mission est de rendre le football plus accessible,
                                            plus transparent, et plus compétitif grâce à
                                            l&apos;exploitation des données. Nous croyons fermement
                                            que chaque joueur, chaque équipe, et chaque match a une
                                            histoire à raconter, une histoire que nous aidons à
                                            révéler à travers nos analyses détaillées.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /Vision-Mission */}
                    </div>
                </section>
                {/* /About Us Info */}

                {/* Journey */}
                <section className="section journey-section" id="our-expertise">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 d-flex align-items-center">
                                <div className="start-your-journey aos" data-aos="fade-up">
                                    <h2>
                                        Notre <span className="active-sport">Expertise</span>
                                    </h2>
                                    <p>
                                        Nous combinons une expertise approfondie en intelligence
                                        artificielle, en analyse de données, et en sport pour offrir
                                        des solutions innovantes. Nos caméras IA capturent chaque
                                        action sur le terrain avec une précision inégalée, tandis
                                        que nos analystes transforment ces données en insights
                                        exploitables.
                                    </p>
                                    <p>
                                        Que ce soit pour ajuster les stratégies de jeu, évaluer les
                                        performances des joueurs, ou attirer l&apos;attention des
                                        recruteurs,{" "}
                                        <span style={{color: "#74aef5"}} className="fw-bold">
                                            IDA est votre partenaire clé.
                                        </span>{" "}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="journey-img aos" data-aos="fade-up">
                                    <ImageWithBasePath
                                        src="assets/img/bg/login-background-2.webp"
                                        className="img-fluid"
                                        alt="User"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /Journey */}

                {/* WhyIDA */}
                <section className="section ourteam white-bg" id="whyIDA">
                    <div className="container">
                        <div className="section-heading">
                            <h2>
                                Pourquoi <span>IDA</span> ?
                            </h2>
                            <p className="sub-title">
                                Ce qui nous distingue, c&apos;est notre engagement à utiliser la
                                technologie pour donner aux clubs ivoiriens et africains un avantage
                                compétitif. <br />
                                <br />
                                Nous nous investissons pleinement pour fournir des données précises,
                                des analyses complètes, et des solutions personnalisées adaptées aux
                                besoins spécifiques de nos clients.
                                <br />
                                <br />
                                Chez IDA, nous sommes bien plus qu&apos;un simple fournisseur de
                                services, nous sommes un partenaire engagé dans la réussite de nos
                                clients.
                            </p>
                        </div>
                    </div>
                </section>
                {/* /WhyIDA */}

                {/* Journey */}
                <section className="section journey-section" id="our-team">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="journey-img aos" data-aos="fade-up">
                                    <ImageWithBasePath
                                        src="assets/img/teamwork.png"
                                        className="img-fluid"
                                        alt="User"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex align-items-center">
                                <div className="start-your-journey aos" data-aos="fade-up">
                                    <h2>
                                        Notre <span className="active-sport">Équipe</span>
                                    </h2>
                                    <p>
                                        IDA est constitué d&apos;une équipe de passionnés de
                                        football, de spécialistes en technologie, et de
                                        professionnels de l&apos;analyse de données. Chaque membre
                                        de notre équipe apporte une expertise unique, ce qui nous
                                        permet d&apos;offrir un service de haute qualité et des
                                        résultats concrets.
                                    </p>
                                    <p>
                                        Ensemble, nous partageons une vision commune :{" "}
                                        <span style={{color: "#74aef5"}} className="fw-bold">
                                            élever le football en Côte d&apos;Ivoire à un nouveau
                                            niveau grâce à l&apos;innovation et aux données.
                                        </span>{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /Journey */}

                {/* Featured Plans */}

                {/* /Featured Plans */}
            </div>
            {/* /Page Content */}
        </div>
    );
};

export default AboutUs;
