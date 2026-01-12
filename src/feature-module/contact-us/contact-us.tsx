import React from "react";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";

const ContactUs = () => {
    const route = all_routes;
    return (
        <div>
            <div className="main-wrapper contact-us-page">
                {/* Breadcrumb */}
                <div className="breadcrumb breadcrumb-list mb-0">
                    <span className="primary-right-round" />
                    <div className="container">
                        <h1 className="text-white">Nous contacter</h1>
                        <ul>
                            <li>
                                <Link to={route.home}>Accueil</Link>
                            </li>
                            <li>Nous contacter</li>
                        </ul>
                    </div>
                </div>
                {/* /Breadcrumb */}
                {/* Page Content */}
                <div className="content blog-details contact-group">
                    <div className="container">
                        <h2 className="text-center mb-40">Information de contact</h2>
                        <div className="row mb-40">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="d-flex justify-content-start align-items-center details">
                                    <i className="feather-mail d-flex justify-content-center align-items-center" />
                                    <div className="info">
                                        <h4>Adresse e-mail</h4>
                                        <p>
                                            <Link to="mailto:support@brainci.org">
                                                support@brainci.org
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="d-flex justify-content-start align-items-center details">
                                    <i className="feather-phone-call d-flex justify-content-center align-items-center" />
                                    <div className="info">
                                        <h4>Téléphone</h4>
                                        <p>+225 07 00 00 00 00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="d-flex justify-content-start align-items-center details">
                                    <i className="feather-map-pin d-flex justify-content-center align-items-center" />
                                    <div className="info">
                                        <h4>Localisation</h4>
                                        <p>Abidjan, Côte d&apos;Ivoire</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="google-maps">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8862835683544!2d-73.98256668525309!3d41.93829486962529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0ee3286615b7%3A0x42bfa96cc2ce4381!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2sin!4v1670922579281!5m2!1sen!2sin"
                                        height={445}
                                        style={{border: 0}}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="section dull-bg">
                        <div className="container">
                            <h2 className="text-center mb-40">
                                Vous pouvez également nous envoyer un message directement en
                                remplissant le formulaire ci-dessous
                            </h2>
                            <form className="contact-us">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-6 mb-3">
                                        <label htmlFor="first-name" className="form-label">
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="first-name"
                                            placeholder="Entrez votre prénom"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 mb-3">
                                        <label htmlFor="last-name" className="form-label">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="last-name"
                                            placeholder="Entrez votre nom"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 mb-3">
                                        <label htmlFor="e-mail" className="form-label">
                                            Adresse e-mail
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="e-mail"
                                            placeholder="Entrez votre adresse e-mail"
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-6 mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Numéro de téléphone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Entrez votre numéro de téléphone"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <label htmlFor="subject" className="form-label">
                                            Objet
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            placeholder="Entrez le sujet"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="comments" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="comments"
                                        rows={3}
                                        placeholder="Entrez une description"
                                        defaultValue={""}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary d-flex align-items-center"
                                >
                                    Valider
                                    <i className="feather-arrow-right-circle ms-2" />
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
                {/* /Page Content */}
            </div>
        </div>
    );
};

export default ContactUs;
