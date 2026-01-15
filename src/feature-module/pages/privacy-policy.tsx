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
                        </ul>
                    </div>
                </div>
                {/* /Breadcrumb */}
                {/* Page Content */}
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="condition-details">
                                    {/* Header */}
                                    <div className="text-center mb-5">
                                        <h2 className="text-primary mb-3">{t('privacyPolicy.title')}</h2>
                                        <h4 className="text-secondary mb-2">{t('privacyPolicy.subtitle')}</h4>
                                        <p className="text-muted"><em>{t('privacyPolicy.updateDate')}</em></p>
                                    </div>

                                    {/* Introduction */}
                                    <div className="mb-5">
                                        <p className="lead">
                                            {t('privacyPolicy.intro')}
                                        </p>
                                    </div>

                                    {/* Section 1 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section1Title')}</h3>
                                        <p>{t('privacyPolicy.section1Text')}</p>
                                    </div>

                                    {/* Section 2 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section2Title')}</h3>
                                        <p>{t('privacyPolicy.section2Intro')}</p>
                                        <p className="fw-bold mt-3">{t('privacyPolicy.section2Subtitle')}</p>
                                        <ul className="list-unstyled ps-4">
                                            <li className="mb-2"><i className="feather-check-circle text-success me-2"></i>{t('privacyPolicy.section2Item1')}</li>
                                            <li className="mb-2"><i className="feather-check-circle text-success me-2"></i>{t('privacyPolicy.section2Item2')}</li>
                                            <li className="mb-2"><i className="feather-check-circle text-success me-2"></i>{t('privacyPolicy.section2Item3')}</li>
                                            <li className="mb-2"><i className="feather-check-circle text-success me-2"></i>{t('privacyPolicy.section2Item4')}</li>
                                        </ul>
                                    </div>

                                    {/* Section 3 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section3Title')}</h3>
                                        <p>{t('privacyPolicy.section3Intro')}</p>
                                        <ul className="list-unstyled ps-4">
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section3Item1')}</li>
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section3Item2')}</li>
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section3Item3')}</li>
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section3Item4')}</li>
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section3Item5')}</li>
                                        </ul>
                                    </div>

                                    {/* Section 4 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section4Title')}</h3>
                                        <p>{t('privacyPolicy.section4Intro')}</p>
                                        <ul className="list-unstyled ps-4">
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section4Item1')}</li>
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section4Item2')}</li>
                                            <li className="mb-2"><i className="feather-arrow-right text-primary me-2"></i>{t('privacyPolicy.section4Item3')}</li>
                                        </ul>
                                    </div>

                                    {/* Section 5 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section5Title')}</h3>
                                        <p>{t('privacyPolicy.section5Text')}</p>
                                    </div>

                                    {/* Section 6 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section6Title')}</h3>
                                        <p>{t('privacyPolicy.section6Text')}</p>
                                    </div>

                                    {/* Section 7 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section7Title')}</h3>
                                        <p>{t('privacyPolicy.section7Intro')}</p>
                                        <ul className="list-unstyled ps-4">
                                            <li className="mb-2"><i className="feather-clock text-info me-2"></i>{t('privacyPolicy.section7Item1')}</li>
                                            <li className="mb-2"><i className="feather-clock text-info me-2"></i>{t('privacyPolicy.section7Item2')}</li>
                                            <li className="mb-2"><i className="feather-clock text-info me-2"></i>{t('privacyPolicy.section7Item3')}</li>
                                        </ul>
                                    </div>

                                    {/* Section 8 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section8Title')}</h3>
                                        <p>{t('privacyPolicy.section8Intro')}</p>
                                        <ul className="list-unstyled ps-4">
                                            <li className="mb-2"><i className="feather-shield text-warning me-2"></i>{t('privacyPolicy.section8Item1')}</li>
                                            <li className="mb-2"><i className="feather-shield text-warning me-2"></i>{t('privacyPolicy.section8Item2')}</li>
                                            <li className="mb-2"><i className="feather-shield text-warning me-2"></i>{t('privacyPolicy.section8Item3')}</li>
                                            <li className="mb-2"><i className="feather-shield text-warning me-2"></i>{t('privacyPolicy.section8Item4')}</li>
                                            <li className="mb-2"><i className="feather-shield text-warning me-2"></i>{t('privacyPolicy.section8Item5')}</li>
                                        </ul>
                                        <p className="mt-3 text-muted"><em>{t('privacyPolicy.section8Footer')}</em></p>
                                    </div>

                                    {/* Section 9 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section9Title')}</h3>
                                        <p>{t('privacyPolicy.section9Text')}</p>
                                    </div>

                                    {/* Section 10 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section10Title')}</h3>
                                        <p>{t('privacyPolicy.section10Text')}</p>
                                    </div>

                                    {/* Section 11 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section11Title')}</h3>
                                        <p>{t('privacyPolicy.section11Text')}</p>
                                    </div>

                                    {/* Section 12 */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section12Title')}</h3>
                                        <p>{t('privacyPolicy.section12Text')}</p>
                                    </div>

                                    {/* Section 13 - Contact */}
                                    <div className="mb-4">
                                        <h3 className="text-primary mb-3">{t('privacyPolicy.section13Title')}</h3>
                                        <p className="mb-3">{t('privacyPolicy.section13Intro')}</p>
                                        <div className="bg-light p-4 rounded">
                                            <p className="fw-bold mb-3">{t('privacyPolicy.section13Company')}</p>
                                            <p className="mb-2">
                                                <i className="feather-mail text-primary me-2"></i>
                                                <strong>{t('privacyPolicy.section13Email')}</strong> <a href="mailto:braincisarl@gmail.com">braincisarl@gmail.com</a>
                                            </p>
                                            <p className="mb-2">
                                                <i className="feather-map-pin text-primary me-2"></i>
                                                <strong>{t('privacyPolicy.section13Address')}</strong>
                                            </p>
                                            <p className="mb-0">
                                                <i className="feather-phone text-primary me-2"></i>
                                                <strong>{t('privacyPolicy.section13Phone')}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
            </>
        </div>
    );
};

export default PrivacyPolicy;
