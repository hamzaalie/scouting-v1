import React from "react";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import {useTranslation} from "react-i18next";

const PrivacyPolicy = () => {
    const routes = all_routes;
    const {t} = useTranslation();
    return (
        <div>
            <>
                {/* Breadcrumb */}
                <div className="breadcrumb breadcrumb-list mb-0">
                    <span className="primary-right-round" />
                    <div className="container">
                        <h1 className="text-white">{t('privacyPolicy.title')}</h1>
                        <ul>
                            <li>
                                <Link to={routes.home}>{t('privacyPolicy.breadcrumbHome')}</Link>
                            </li>
                            <li>{t('privacyPolicy.breadcrumb')}</li>
                            <li>{t('privacyPolicy.breadcrumbDataProtection')}</li>
                        </ul>
                    </div>
                </div>
                {/* /Breadcrumb */}
                {/* Page Content */}
                <div className="content">
                    <div className="container">
                        <h2>{t('privacyPolicy.mainTitle')}</h2>
                        <div className="condition-details">
                            <br />
                            <p>
                                {t('privacyPolicy.intro')}
                            </p>
                            <p>
                                {t('privacyPolicy.introText')}
                            </p>
                            <br />
                            <span className="fs-4 text-primary fw-bold">
                                {t('privacyPolicy.section1Title')}
                            </span>
                            <br />
                            <p>
                                {t('privacyPolicy.section1Text')}
                            </p>
                            <br />
                            <span className="fs-4 text-primary fw-bold">
                                {t('privacyPolicy.section2Title')}
                            </span>
                            <br />
                            <p>
                                {t('privacyPolicy.section2Text')}
                                <a href="mailto:braincisarl@gmail.com">braincisarl@gmail.com</a>
                            </p>

                            <br />
                            <span className="fs-4 text-primary fw-bold">
                                {t('privacyPolicy.section3Title')}
                            </span>
                            <br />
                            <p>
                                {t('privacyPolicy.section3Text')}
                            </p>
                            <ol style={{listStyleType: "square"}}>
                                <li>{t('privacyPolicy.right1')} </li>
                                <li>{t('privacyPolicy.right2')} </li>
                                <li>{t('privacyPolicy.right3')} </li>
                                <li>{t('privacyPolicy.right4')} </li>
                                <li>{t('privacyPolicy.right5')} </li>
                                <li>
                                    {t('privacyPolicy.right6')}{" "}
                                </li>
                                <li>{t('privacyPolicy.right7')} </li>
                                <li>
                                    {t('privacyPolicy.right8')}{" "}
                                </li>
                                <li>
                                    {t('privacyPolicy.right9')}{" "}
                                </li>
                                <li>
                                    {t('privacyPolicy.right10')}{" "}
                                </li>
                                <li>
                                    {t('privacyPolicy.right11')}
                                </li>
                            </ol>

                            <br />
                            <span className="fs-4 text-primary fw-bold">{t('privacyPolicy.section5Title')}</span>
                            <br />

                            <ol type="1" style={{paddingTop: "10px"}}>
                                <li>
                                    {t('privacyPolicy.section5Item1')}
                                </li>
                                <li>
                                    {t('privacyPolicy.section5Item2')}{" "}
                                </li>
                                <li>
                                    {t('privacyPolicy.section5Item3')}
                                </li>
                            </ol>

                            <br />
                            <span className="fs-4 text-primary fw-bold">{t('privacyPolicy.section7Title')}</span>
                            <br />

                            <ol style={{paddingTop: "10px", listStyleType: "square"}}>
                                <li>
                                    {t('privacyPolicy.section7Item1')}
                                </li>
                                <li>
                                    {t('privacyPolicy.section7Item2')}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
            </>
        </div>
    );
};

export default PrivacyPolicy;
