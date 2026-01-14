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
                        <ol type="I" className="fs-4 text-primary fw-bold">
                            <li>{t('termsConditions.section1Title')}</li>
                        </ol>
                        <p>
                            {t('termsConditions.placeholder')}
                        </p>
                        <p>
                            {t('termsConditions.placeholder')}
                        </p>
                        <p>
                            {t('termsConditions.placeholder')}
                        </p>
                        {/* <h3>Policy Name</h3>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="condition-details">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit
                                        voluptatem accusantium doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                        enim ipsam voluptatem quia voluptas
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <div className="condition-details">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est{" "}
                                    </p>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit
                                        voluptatem accusantium doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                        enim ipsam voluptatem quia voluptas
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                {/* /Page Content */}
            </div>
        </>
    );
};

export default TermsCondition;
