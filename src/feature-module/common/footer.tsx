import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {all_routes} from "../router/all_routes";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const routes = all_routes;
    const isUserConnected = localStorageFunctions.getUser();
    const { t } = useTranslation();

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
                            <h2>{t('footer.accelerateSuccess')}</h2>
                            <p className="sub-title">
                                {t('footer.discoverPower')}
                            </p>
                            <Link to={routes.register} className="btn btn-primary">
                                <i className="feather-user-plus" /> {t('footer.joinUs')}
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
                                <h4 className="footer-title">{t('footer.contactUs')}</h4>
                                <div className="footer-address-blk">
                                    <div className="footer-call">
                                        <span>{t('footer.idaSupport')}</span>
                                        <p>07 00 00 00 00</p>
                                    </div>
                                    <div className="footer-call">
                                        <span>{t('footer.email')}</span>
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
                                <h4 className="footer-title">{t('footer.links')}</h4>
                                <ul>
                                    <li>
                                        <Link to={routes.home}>{t('footer.home')}</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.aboutUs}>{t('footer.aboutUs')}</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.pricing}>{t('footer.buyPacks')}</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* /Footer Widget */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Footer Widget */}
                            <div className="footer-widget footer-menu">
                                <h4 className="footer-title">{t('footer.support')}</h4>
                                <ul>
                                    <li>
                                        <Link to={routes.contactUs}>{t('footer.contactUs')}</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.faq}>{t('footer.faq')}</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.privacyPolicy}>
                                            {t('footer.privacyPolicy')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={routes.termsCondition}>
                                            {t('footer.termsConditions')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={routes.cookiesPolicy}>{t('footer.cookiesPolicy')}</Link>
                                    </li>
                                </ul>
                            </div>
                            {/* /Footer Widget */}
                        </div>
                        <div className="col-lg-3 col-md-6">
                            {/* Footer Widget */}
                            <div className="footer-widget footer-menu">
                                <h4 className="footer-title">{t('footer.dashboard')}</h4>
                                <ul>
                                    <li>
                                        <Link to={routes.login}>{t('footer.login')}</Link>
                                    </li>
                                    <li>
                                        <Link to={routes.register}>{t('footer.register')}</Link>
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
                                        Analytics - {t('footer.allRightsReserved')}
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
