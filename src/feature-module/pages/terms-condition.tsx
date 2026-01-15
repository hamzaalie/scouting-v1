import React from "react";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import {useTranslation} from "react-i18next";

const TermsCondition = () => {
    const route = all_routes;
    const {t} = useTranslation();
    return (
        <>
            <div className="main-wrapper terms-page innerpagebg">
                {/* Breadcrumb */}
                <div className="breadcrumb breadcrumb-list mb-0">
                    <span className="primary-right-round" />
                    <div className="container">
                        <h1 className="text-white">{t('termsConditions.title')}</h1>
                        <ul>
                            <li>
                                <Link to={route.home}>{t('termsConditions.breadcrumbHome')}</Link>
                            </li>
                            <li>{t('termsConditions.breadcrumb')}</li>
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
                                        <h2 className="text-primary mb-3">{t('termsConditions.title')}</h2>
                                        <h4 className="text-secondary mb-2">{t('termsConditions.subtitle')}</h4>
                                        <p className="text-muted mb-1">{t('termsConditions.publishedBy')}</p>
                                        <p className="text-muted"><em>{t('termsConditions.version')}</em></p>
                                    </div>

                                    {/* Legal Information */}
                                    <div className="mb-5 bg-light p-4 rounded">
                                        <h3 className="text-primary mb-4">{t('termsConditions.legalTitle')}</h3>
                                        
                                        <h5 className="fw-bold mb-3">{t('termsConditions.editorTitle')}</h5>
                                        <p className="mb-4">{t('termsConditions.editorText')}</p>
                                        
                                        <h6 className="fw-bold text-secondary mb-3">{t('termsConditions.identificationTitle')}</h6>
                                        <ul className="list-unstyled ps-3">
                                            <li className="mb-2"><i className="feather-chevron-right text-primary me-2"></i>{t('termsConditions.companyName')}</li>
                                            <li className="mb-2"><i className="feather-chevron-right text-primary me-2"></i>{t('termsConditions.headquarters')}</li>
                                            <li className="mb-2"><i className="feather-chevron-right text-primary me-2"></i>{t('termsConditions.postalAddress')}</li>
                                            <li className="mb-2"><i className="feather-chevron-right text-primary me-2"></i>{t('termsConditions.phone')}</li>
                                            <li className="mb-2"><i className="feather-chevron-right text-primary me-2"></i>{t('termsConditions.taxInfo')}</li>
                                            <li className="mb-2"><i className="feather-chevron-right text-primary me-2"></i>{t('termsConditions.rccm')}</li>
                                        </ul>
                                        
                                        <p className="text-muted fst-italic mb-3"><small>{t('termsConditions.additionalRefs')}</small></p>
                                        <div className="alert alert-warning mb-4">
                                            <i className="feather-alert-triangle me-2"></i>{t('termsConditions.importantNote')}
                                        </div>
                                        
                                        <p className="mb-4">{t('termsConditions.publicationDirector')}</p>
                                        
                                        <h6 className="fw-bold text-secondary mb-3">{t('termsConditions.contactTitle')}</h6>
                                        <p className="mb-2">{t('termsConditions.supportClaims')}</p>
                                        <p className="mb-4">{t('termsConditions.websiteApp')}</p>
                                        
                                        <h6 className="fw-bold text-secondary mb-3">{t('termsConditions.hostingTitle')}</h6>
                                        <p className="mb-2">{t('termsConditions.hostingText')}</p>
                                        <p className="text-muted"><small>{t('termsConditions.hostingNote')}</small></p>
                                    </div>

                                    {/* Section 1 */}
                                    <div className="mb-4">
                                        <h4 className="text-primary mb-3">{t('termsConditions.section1Title')}</h4>
                                        <p>{t('termsConditions.section1Text')}</p>
                                    </div>

                                    {/* Section 2 - Definitions */}
                                    <div className="mb-4">
                                        <h4 className="text-primary mb-3">{t('termsConditions.section2Title')}</h4>
                                        <ul className="list-unstyled ps-3">
                                            <li className="mb-2">• {t('termsConditions.section2Service')}</li>
                                            <li className="mb-2">• {t('termsConditions.section2User')}</li>
                                            <li className="mb-2">• {t('termsConditions.section2Account')}</li>
                                            <li className="mb-2">• {t('termsConditions.section2Content')}</li>
                                            <li className="mb-2">• {t('termsConditions.section2SportsData')}</li>
                                            <li className="mb-2">• {t('termsConditions.section2Videos')}</li>
                                            <li className="mb-2">• {t('termsConditions.section2Offer')}</li>
                                        </ul>
                                    </div>

                                    {/* Section 3 - Service Description */}
                                    <div className="mb-4">
                                        <h4 className="text-primary mb-3">{t('termsConditions.section3Title')}</h4>
                                        <p className="mb-3">{t('termsConditions.section3Intro')}</p>
                                        <ul className="list-unstyled ps-3">
                                            <li className="mb-2">{t('termsConditions.section3Item1')}</li>
                                            <li className="mb-2">{t('termsConditions.section3Item2')}</li>
                                            <li className="mb-2">{t('termsConditions.section3Item3')}</li>
                                            <li className="mb-2">{t('termsConditions.section3Item4')}</li>
                                            <li className="mb-2">{t('termsConditions.section3Item5')}</li>
                                        </ul>
                                        <p className="text-muted mt-3"><em>{t('termsConditions.section3Note')}</em></p>
                                    </div>

                                    {/* Section 4 - Account Access */}
                                    <div className="mb-4">
                                        <h4 className="text-primary mb-3">{t('termsConditions.section4Title')}</h4>
                                        <p className="fw-bold mb-2">{t('termsConditions.section4_1Title')}</p>
                                        <p className="mb-3">{t('termsConditions.section4_1Text')}</p>
                                        <p className="fw-bold mb-2">{t('termsConditions.section4_2Title')}</p>
                                        <p className="mb-3">{t('termsConditions.section4_2Text')}</p>
                                        <p className="fw-bold mb-2">{t('termsConditions.section4_3Title')}</p>
                                        <p className="mb-3">{t('termsConditions.section4_3Text')}</p>
                                        <p className="fw-bold mb-2">{t('termsConditions.section4_4Title')}</p>
                                        <p>{t('termsConditions.section4_4Text')}</p>
                                    </div>

                                    {/* Section 5 - B2B/B2C Conditions */}
                                    <div className="mb-4">
                                        <h4 className="text-primary mb-3">{t('termsConditions.section5Title')}</h4>
                                        <p className="fw-bold mb-2">{t('termsConditions.section5_1Title')}</p>
                                        <p className="mb-3">{t('termsConditions.section5_1Text')}</p>
                                        <p className="fw-bold mb-2">{t('termsConditions.section5_2Title')}</p>
                                        <p className="mb-3">{t('termsConditions.section5_2Text')}</p>
                                        <p className="fw-bold mb-2">{t('termsConditions.section5_3Title')}</p>
                                        <p>{t('termsConditions.section5_3Text')}</p>
                                    </div>

                                    {/* Continue with remaining sections... */}
                                    {/* I'll create a pattern for the remaining sections */}
                                    
                                    {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((num) => (
                                        <div key={num} className="mb-4">
                                            <h4 className="text-primary mb-3">{t(`termsConditions.section${num}Title`)}</h4>
                                            {/* Section 6 subsections */}
                                            {num === 6 && (
                                                <>
                                                    <p className="fw-bold mb-2">{t('termsConditions.section6_1Title')}</p>
                                                    <p className="mb-3">{t('termsConditions.section6_1Text')}</p>
                                                    <p className="fw-bold mb-2">{t('termsConditions.section6_2Title')}</p>
                                                    <p className="mb-3">{t('termsConditions.section6_2Text')}</p>
                                                    <p className="fw-bold mb-2">{t('termsConditions.section6_3Title')}</p>
                                                    <p className="mb-3">{t('termsConditions.section6_3Text')}</p>
                                                    <p className="fw-bold mb-2">{t('termsConditions.section6_4Title')}</p>
                                                    <p>{t('termsConditions.section6_4Text')}</p>
                                                </>
                                            )}
                                            {/* Section 7 */}
                                            {num === 7 && <p>{t('termsConditions.section7Text')}</p>}
                                            {/* Section 8 */}
                                            {num === 8 && (
                                                <>
                                                    <p className="mb-3">{t('termsConditions.section8Intro')}</p>
                                                    <ul className="list-unstyled ps-3">
                                                        <li className="mb-2">{t('termsConditions.section8Item1')}</li>
                                                        <li className="mb-2">{t('termsConditions.section8Item2')}</li>
                                                        <li className="mb-2">{t('termsConditions.section8Item3')}</li>
                                                        <li className="mb-2">{t('termsConditions.section8Item4')}</li>
                                                        <li className="mb-2">{t('termsConditions.section8Item5')}</li>
                                                    </ul>
                                                    <p className="text-muted mt-3"><em>{t('termsConditions.section8Note')}</em></p>
                                                </>
                                            )}
                                            {/* Sections 9, 10, 11, 13, 17, 18, 20 with subsections */}
                                            {[9, 10, 11, 13, 17, 18, 20].includes(num) && (
                                                <>
                                                    {[1, 2, 3].map(sub => {
                                                        const titleKey = `termsConditions.section${num}_${sub}Title`;
                                                        const textKey = `termsConditions.section${num}_${sub}Text`;
                                                        return (
                                                            <div key={sub}>
                                                                <p className="fw-bold mb-2">{t(titleKey)}</p>
                                                                <p className="mb-3">{t(textKey)}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </>
                                            )}
                                            {/* Sections 15 with subsections */}
                                            {num === 15 && (
                                                <>
                                                    <p className="fw-bold mb-2">{t('termsConditions.section15_1Title')}</p>
                                                    <p className="mb-3">{t('termsConditions.section15_1Text')}</p>
                                                    <p className="fw-bold mb-2">{t('termsConditions.section15_2Title')}</p>
                                                    <p className="mb-3">{t('termsConditions.section15_2Text')}</p>
                                                    <p className="fw-bold mb-2">{t('termsConditions.section15_3Title')}</p>
                                                    <p>{t('termsConditions.section15_3Text')}</p>
                                                </>
                                            )}
                                            {/* Simple text sections */}
                                            {[12, 14, 16, 19, 21, 22, 23].includes(num) && <p>{t(`termsConditions.section${num}Text`)}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
            </div>
        </>
    );
};

export default TermsCondition;
