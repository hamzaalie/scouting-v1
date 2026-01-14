import React from "react";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import {useTranslation} from "react-i18next";

const Faq = () => {
    const routes = all_routes;
    const {t} = useTranslation();
    return (
        <div>
            {/* Breadcrumb */}
            <div className="breadcrumb breadcrumb-list mb-0">
                {/* <span className="primary-right-round" /> */}
                <div className="container">
                    <h1 className="text-white">{t('faq.title')}</h1>
                    <ul>
                        <li>
                            <Link to={routes.home}>{t('faq.breadcrumbHome')}</Link>
                        </li>
                        <li>{t('faq.breadcrumbFAQ')}</li>
                    </ul>
                </div>
            </div>
            {/* /Breadcrumb */}
            {/* Page Content */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 offset-sm-12 offset-md-1 col-md-10 col-lg-10">
                            <div className="ask-questions">
                                <div className="faq-info">
                                    <div className="accordion" id="accordionExample">
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <Link
                                                    to="#"
                                                    className="accordion-button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    {t('faq.q1')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseOne"
                                                className="accordion-collapse collapse show"
                                                aria-labelledby="headingOne"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a1')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTwo"
                                                >
                                                    {t('faq.q2')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseTwo"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingTwo"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a2part1')} <br />
                                                            {t('faq.a2part2')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseThree"
                                                    aria-expanded="false"
                                                    aria-controls="collapseThree"
                                                >
                                                    {t('faq.q3')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseThree"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingThree"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a3part1')} <br />
                                                            {t('faq.a3part2')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFour">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseFour"
                                                    aria-expanded="false"
                                                    aria-controls="collapseFour"
                                                >
                                                    {t('faq.q4')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseFour"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingFour"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a4')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFive">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseFive"
                                                    aria-expanded="false"
                                                    aria-controls="collapseFive"
                                                >
                                                    {t('faq.q5')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseFive"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingFive"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a5')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}

                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingSix">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseSix"
                                                    aria-expanded="false"
                                                    aria-controls="collapseSix"
                                                >
                                                    {t('faq.q6')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseSix"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingSix"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a6part1')}
                                                            <br /> {t('faq.a6part2')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingSeven">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseSeven"
                                                    aria-expanded="false"
                                                    aria-controls="collapseSeven"
                                                >
                                                    {t('faq.q7')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseSeven"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingSeven"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a7')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingEight">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseEight"
                                                    aria-expanded="false"
                                                    aria-controls="collapseEight"
                                                >
                                                    {t('faq.q8')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseEight"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingEight"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a8part1')}
                                                            <Link to={routes.register}>
                                                                {t('faq.a8Registration')}
                                                            </Link>{" "}
                                                            {t('faq.a8part2')}{" "}
                                                            <Link to={routes.contactUs}>
                                                                {t('faq.a8Contact')}
                                                            </Link>{" "}
                                                            <br /> {t('faq.a8part3')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingNine">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseNine"
                                                    aria-expanded="false"
                                                    aria-controls="collapseNine"
                                                >
                                                    {t('faq.q9')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseNine"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingNine"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a9')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTen">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseTen"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTen"
                                                >
                                                    {t('faq.q10')}
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseTen"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingTen"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            {t('faq.a10part1')}{" "}
                                                            <Link to={routes.contactUs}>
                                                                {t('faq.a10Contact')}
                                                            </Link>{" "}
                                                            {t('faq.a10part2')}
                                                            <Link to="mailto:email@example.com">
                                                                email@example.com
                                                            </Link>
                                                            . <br />
                                                            {t('faq.a10part3')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
        </div>
    );
};

export default Faq;
