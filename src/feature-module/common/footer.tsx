import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {all_routes} from "../router/all_routes";
import {localStorageFunctions} from "../../helpers/localStorage.helper";

const Footer = () => {
    const routes = all_routes;
    const isUserConnected = localStorageFunctions.getUser();

    useEffect(() => {
        AOS.init({duration: 1000, once: true});
    }, []);
    return (
        <footer className="footer">
            {/* Footer Container */}
            <div className="container">
                {!isUserConnected?.firstName && (
                    <>
                        {/* Footer Join */}
                        <div className="footer-join aos" data-aos="fade-up">
                            <h2>Accélérez votre Succès</h2>
                            <p className="sub-title">
                                Découvrez comment la puissance des données peut transformer le
                                football ivoirien.
                            </p>
                            <Link to={routes.register} className="btn btn-primary">
                                <i className="feather-user-plus" /> Rejoignez-nous
                            </Link>
                        </div>
                        {/* /Footer Join */}
                    </>
                )}
                {/* Footer Top */}
                <div className="footer-top">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            {/* Footer Widget */}
                            <div className="footer-widget footer-menu">
                                <h4 className="footer-title">Nous contacter</h4>
                                <div className="footer-address-blk">
                                    <div className="footer-call">
                                        <span>Support IDA</span>
                                        <p>07 00 00 00 00</p>
                                    </div>
                                    <div className="footer-call">
                                        <span>Email</span>
                                        <p>ida@example.com</p>
                                    </div>
                                </div>
                                <div className="social-icon">
                                    <ul>
                                        <li>
                                            <Link to="#" className="facebook">
                                                <i className="fab fa-facebook-f" />{" "}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="twitter">
                                                <i className="fab fa-twitter" />{" "}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="instagram">
                                                <i className="fab fa-instagram" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="linked-in">
                                                <i className="fab fa-linkedin-in" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* /Footer Widget */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Footer Widget */}
                            <div className="footer-widget footer-menu">
                                <h4 className="footer-title">Liens</h4>
                                <ul>
                                    <li>
                                        <Link to={routes.home}>Accueil</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.aboutUs}>À propos de nous</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.pricing}>Achat de Packs</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* /Footer Widget */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Footer Widget */}
                            <div className="footer-widget footer-menu">
                                <h4 className="footer-title">Support</h4>
                                <ul>
                                    <li>
                                        <Link to={routes.contactUs}>Nous contacter</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.faq}>Foire aux questions</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.privacyPolicy}>
                                            Politique de Confidentialité
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={routes.termsCondition}>
                                            Termes &amp; Conditions
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={routes.cookiesPolicy}>Politique des cookies</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* /Footer Widget */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Footer Widget */}
                            <div className="footer-widget footer-menu">
                                <h4 className="footer-title">Dashboard</h4>
                                <ul>
                                    <li>
                                        <Link to={routes.login}>Se connecter</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.register}>S&apos;inscrire</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* /Footer Widget */}
                        </div>
                    </div>
                </div>
                {/* /Footer Top */}
            </div>
            {/* /Footer Container */}
            {/* Footer Bottom */}
            <div className="footer-bottom">
                {/* /Footer Container */}
                <div className="container">
                    {/* Copyright */}
                    <div className="copyright">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <div className="copyright-text">
                                    <p className="mb-0">
                                        &copy; {new Date().getFullYear()} Intelligence Data
                                        Analytics - Tous droits reservés.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Copyright */}
                </div>
                {/* /Footer Container */}
            </div>
            {/* /Footer Bottom */}
        </footer>
    );
};

export default Footer;
