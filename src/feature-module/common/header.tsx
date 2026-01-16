import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {toast} from "react-toastify";
import {idaSportsUserInterface} from "../../core/data/interface/model";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const routes = all_routes;
    const location = useLocation();
    const { isAuthenticated, logout: authLogout } = useAuth();
    const isUserConnected: idaSportsUserInterface = localStorageFunctions.getUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        // Fermer le menu mobile lors du changement de route
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const header = [
        {
            tittle: t('nav.home'),
            showAsTab: false,
            separateRoute: true,
            routes: routes.home,
            hasSubRoute: false,
            showSubRoute: false,
            menuId: "homePage",
        },
        {
            tittle: t('nav.about'),
            showAsTab: false,
            separateRoute: true,
            routes: routes.aboutUs,
            hasSubRoute: false,
            showSubRoute: false,
            menuId: "aboutPage",
        },
        {
            tittle: t('nav.packs'),
            showAsTab: false,
            separateRoute: true,
            routes: routes.pricing,
            hasSubRoute: false,
            showSubRoute: false,
            menuId: "packsPage",
        },
        {
            tittle: t('nav.faq'),
            showAsTab: false,
            separateRoute: true,
            routes: routes.faq,
            hasSubRoute: false,
            showSubRoute: false,
            menuId: "faqPage",
        },
        {
            tittle: t('nav.contact'),
            showAsTab: false,
            separateRoute: true,
            routes: routes.contactUs,
            hasSubRoute: false,
            showSubRoute: false,
            menuId: "contactUsPage",
        },
    ];

    const customStyle = {
        background: location.pathname.includes(routes.home) ? "#61bfce" : "#74aef5",
    };

    async function handleLogout(event: React.MouseEvent<HTMLElement>): Promise<void> {
        event.preventDefault();
        if (isAuthenticated) {
            try {
                await authLogout();
                window.location.href = routes.login;
            } catch (error) {
                toast.error("Erreur lors de la déconnexion", {
                    toastId: "logoutError",
                    theme: "colored",
                });
            }
        } else {
            toast.info("Veuillez vous connecter.", {
                toastId: "defaultToast",
                theme: "colored",
            });
        }
    }

    // Gestion de l'ouverture/fermeture du menu mobile
    const toggleMobileMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Ajouter/supprimer la classe à body pour éviter le défilement
        if (!isMobileMenuOpen) {
            document.body.classList.add("menu-opened");
        } else {
            document.body.classList.remove("menu-opened");
        }
    };

    // Fermeture du menu mobile
    const closeMobileMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        document.body.classList.remove("menu-opened");
    };

    // Gestion du scroll vers le haut
    const handleScroll = (e: React.MouseEvent<HTMLElement>) => {
        // e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // //HandleScrollToTop
    // const handleScroll = () => {

    //     window.location.href
    //     if (window.scrollY > 0) {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: "smooth",
    //         });

    //     } else {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: "smooth",
    //         });
    //     }
    // };

    return (
        <header
            className={
                location.pathname.includes(routes.home)
                    ? "header header-trans"
                    : "header header-sticky"
            }
            style={customStyle}
        >
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg header-nav">
                    <div className="navbar-header">
                        <Link id="mobile_btn" to="#" onClick={toggleMobileMenu}>
                            <span className="bar-icon">
                                <span />
                                <span />
                                <span />
                            </span>
                        </Link>
                        <Link to={routes.home} className="navbar-brand logo">
                            {/* <ImageWithBasePath src="assets/img/logos/white-blue-ida-logo.png" className="img-fluid" alt="Logo" /> */}

                            {location.pathname.includes(routes.home) ? (
                                <ImageWithBasePath
                                    src="assets/img/logos/white-logo.png"
                                    className="img-fluid"
                                    alt="Logo blue"
                                    height={"auto"}
                                    width={210}
                                />
                            ) : (
                                <ImageWithBasePath
                                    src="assets/img/logos/white-ida-logo.png"
                                    className="img-fluid"
                                    alt="Logo white"
                                    height={"auto"}
                                    width={210}
                                />
                            )}
                        </Link>
                    </div>
                    <div className={`main-menu-wrapper ${isMobileMenuOpen ? "active" : ""}`}>
                        <div className="menu-header">
                            <Link to={routes.home} className="menu-logo">
                                <ImageWithBasePath
                                    src="assets/img/logos/white-logo.png"
                                    className="img-fluid"
                                    alt="Logo"
                                />
                            </Link>
                            <Link
                                id="menu_close"
                                className="menu-close"
                                to="#"
                                onClick={closeMobileMenu}
                            >
                                <i className="fas fa-times" />
                            </Link>
                        </div>
                        <ul className="main-nav">
                            {header.map((mainMenus, mainIndex) => (
                                <React.Fragment key={mainIndex}>
                                    {mainMenus.separateRoute ? (
                                        <li
                                            key={mainIndex}
                                            className={
                                                location.pathname.includes(mainMenus.routes)
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            <Link
                                                to={mainMenus.routes}
                                                id={mainMenus.menuId}
                                                onClick={handleScroll}
                                            >
                                                {mainMenus.tittle}
                                            </Link>
                                        </li>
                                    ) : (
                                        <>{/* TODO: Add nonSeparateRoute code here if needed */}</>
                                    )}
                                </React.Fragment>
                            ))}

                            {isAuthenticated && (
                                <div style={!isMobileMenuOpen ? {display: "none"} : {}}>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link btn-sm btn-secondary"
                                            to={routes.userDashboard}
                                        >
                                            <span>
                                                <i className="feather-menu" />
                                            </span>
                                            {t('nav.dashboard')}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link btn-sm btn-white log-register">
                                            <Link to="" onClick={handleLogout}>
                                                <span>
                                                    <i className="feather-log-out" />
                                                </span>
                                                {t('nav.logout')}
                                            </Link>{" "}
                                        </div>
                                    </li>
                                </div>
                            )}
                            {!isAuthenticated && (
                                <div style={!isMobileMenuOpen ? {display: "none"} : {}}>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link btn-sm btn-secondary"
                                            to={routes.login}
                                        >
                                            <span>
                                                <i className="feather-users" />
                                            </span>
                                            {t('nav.login')}
                                        </Link>{" "}
                                    </li>
                                </div>
                            )}
                        </ul>
                    </div>
                    <ul
                        className="nav header-navbar-rht"
                        style={isMobileMenuOpen ? {display: "none"} : {}}
                    >
                        {/* Language Switcher */}
                        <li className="nav-item" style={{ marginRight: '15px' }}>
                            <LanguageSwitcher />
                        </li>
                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link btn btn-secondary"
                                        to={routes.userDashboard}
                                    >
                                        <span>
                                            <i className="feather-menu" />
                                        </span>
                                        {t('nav.dashboard')}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link btn btn-white log-register">
                                        <Link to="" onClick={handleLogout}>
                                            <span>
                                                <i className="feather-log-out" />
                                            </span>
                                            {t('nav.logout')}
                                        </Link>{" "}
                                    </div>
                                </li>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-secondary" to={routes.login}>
                                        <span>
                                            <i className="feather-users" />
                                        </span>
                                        {t('nav.login')}
                                    </Link>{" "}
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
