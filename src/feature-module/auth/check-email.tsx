import React from "react";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";

const CheckEmail = () => {
    const route = all_routes;
    const location = useLocation();
    const email = location.state?.email || "votre email";

    return (
        <>
            {/* Main Wrapper */}
            <div className="main-wrapper authendication-pages">
                {/* Page Content */}
                <div className="content">
                    <div className="container wrapper no-padding">
                        <div className="row no-margin vph-100">
                            <div className="col-12 col-sm-12 col-lg-6 no-padding">
                                <div className="banner-bg login">
                                    <div className="row no-margin h-100">
                                        <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                                            <div className="h-100 d-flex justify-content-center align-items-center">
                                                <div className="text-bg register text-center">
                                                    <ImageWithBasePath
                                                        src="assets/img/icons/email-icon.svg"
                                                        className="img-fluid"
                                                        alt="Email Icon"
                                                        style={{ maxWidth: "200px" }}
                                                    />
                                                    <h2 className="text-white">Vérifiez Votre Email</h2>
                                                    <p>Un email de vérification a été envoyé à votre adresse.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-lg-6 no-padding">
                                <div className="dull-pg">
                                    <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                                        <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                                            <header className="text-center mb-4">
                                                <ImageWithBasePath
                                                    src="assets/img/logo.svg"
                                                    className="img-fluid"
                                                    alt="Logo"
                                                />
                                            </header>
                                            <div className="shadow-card">
                                                <div className="text-center">
                                                    {/* Email Icon */}
                                                    <div className="mb-4">
                                                        <div className="d-inline-flex align-items-center justify-content-center" 
                                                             style={{
                                                                 width: "80px",
                                                                 height: "80px",
                                                                 borderRadius: "50%",
                                                                 backgroundColor: "#3B82F6",
                                                                 color: "white"
                                                             }}>
                                                            <i className="fa fa-envelope" style={{ fontSize: "36px" }}></i>
                                                        </div>
                                                    </div>

                                                    {/* Title */}
                                                    <h2 className="mb-3">Vérifiez Votre Email</h2>

                                                    {/* Description */}
                                                    <p className="text-muted mb-4" style={{ fontSize: "16px" }}>
                                                        Nous avons envoyé un email de vérification à :
                                                    </p>
                                                    <p className="font-weight-bold mb-4" style={{ fontSize: "18px", color: "#3B82F6" }}>
                                                        {email}
                                                    </p>

                                                    {/* Instructions */}
                                                    <div className="alert alert-info text-left mb-4">
                                                        <h5 className="mb-3">
                                                            <i className="fa fa-info-circle mr-2"></i>
                                                            Étapes suivantes :
                                                        </h5>
                                                        <ol className="mb-0 pl-4">
                                                            <li className="mb-2">Ouvrez votre boîte de réception email</li>
                                                            <li className="mb-2">Recherchez l&apos;email de vérification de Scouting Platform</li>
                                                            <li className="mb-2">Cliquez sur le lien de vérification dans l&apos;email</li>
                                                            <li>Vous serez redirigé vers la page de connexion</li>
                                                        </ol>
                                                    </div>

                                                    {/* Tips */}
                                                    <div className="alert alert-warning text-left mb-4">
                                                        <h6 className="mb-2">
                                                            <i className="fa fa-exclamation-triangle mr-2"></i>
                                                            Email non reçu?
                                                        </h6>
                                                        <ul className="mb-0 pl-4" style={{ fontSize: "14px" }}>
                                                            <li>Vérifiez votre dossier spam ou courrier indésirable</li>
                                                            <li>Vérifiez que l&apos;adresse email est correcte</li>
                                                            <li>L&apos;email peut prendre quelques minutes à arriver</li>
                                                        </ul>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                                                        <Link 
                                                            to={route.login}
                                                            className="btn btn-primary btn-lg px-4"
                                                        >
                                                            <i className="fa fa-sign-in mr-2"></i>
                                                            Aller à la Connexion
                                                        </Link>
                                                        
                                                        <Link 
                                                            to={route.register}
                                                            className="btn btn-outline-secondary btn-lg px-4"
                                                        >
                                                            <i className="fa fa-arrow-left mr-2"></i>
                                                            Retour à l&apos;Inscription
                                                        </Link>
                                                    </div>

                                                    {/* Support Link */}
                                                    <div className="mt-4 pt-4 border-top">
                                                        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                                                            Besoin d&apos;aide? {" "}
                                                            <a href="mailto:support@scoutingplatform.com" className="text-primary">
                                                                Contactez le support
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
            </div>
            {/* /Main Wrapper */}
        </>
    );
};

export default CheckEmail;
