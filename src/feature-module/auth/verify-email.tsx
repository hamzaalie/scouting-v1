import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { all_routes } from "../router/all_routes";
import { backendFunctions } from "../../helpers/backend.helper";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const route = all_routes;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [alreadyVerified, setAlreadyVerified] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");
        
        if (!token) {
            setError("Token de vérification manquant");
            setLoading(false);
            return;
        }

        // Verify email with backend
        backendFunctions.auth
            .verifyEmail(token)
            .then((response) => {
                setLoading(false);
                
                // Check if already verified
                if (response.message && response.message.toLowerCase().includes('already verified')) {
                    setAlreadyVerified(true);
                    toast.info("Email déjà vérifié! Vous pouvez vous connecter.", {
                        toastId: "infoToast",
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate(route.login);
                    }, 3000);
                } else {
                    setSuccess(true);
                    toast.success("Email vérifié avec succès! Redirection vers la page de connexion...", {
                        toastId: "successToast",
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate(route.login);
                    }, 3000);
                }
            })
            .catch((err) => {
                setLoading(false);
                const errorMessage = err?.response?.data?.message || "Token de vérification invalide ou expiré";
                setError(errorMessage);
                toast.error(errorMessage, {
                    toastId: "errorToast",
                    theme: "colored",
                });
            });
    }, [searchParams, navigate, route.login]);

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
                                                        src="assets/img/icons/success-icon.svg"
                                                        className="img-fluid"
                                                        alt="Logo"
                                                    />
                                                    <h2 className="text-white">Vérification d&apos;Email</h2>
                                                    <p>Validation de votre compte en cours...</p>
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
                                            <header className="text-center">
                                                <ImageWithBasePath
                                                    src="assets/img/logo.svg"
                                                    className="img-fluid"
                                                    alt="Logo"
                                                />
                                            </header>
                                            <div className="shadow-card">
                                                <div className="text-center mb-4">
                                                    {loading && (
                                                        <>
                                                            <div className="spinner-border text-primary mb-3" role="status">
                                                                <span className="visually-hidden">Chargement...</span>
                                                            </div>
                                                            <h3>Vérification en cours...</h3>
                                                            <p className="text-muted">
                                                                Veuillez patienter pendant que nous vérifions votre email.
                                                            </p>
                                                        </>
                                                    )}
                                                    
                                                    {!loading && success && (
                                                        <>
                                                            <div className="mb-3">
                                                                <i className="fa fa-check-circle text-success" style={{ fontSize: "64px" }}></i>
                                                            </div>
                                                            <h3 className="text-success">Email Vérifié!</h3>
                                                            <p className="text-muted">
                                                                Votre email a été vérifié avec succès. Vous allez être redirigé vers la page de connexion...
                                                            </p>
                                                        </>
                                                    )}
                                                    
                                                    {!loading && alreadyVerified && (
                                                        <>
                                                            <div className="mb-3">
                                                                <i className="fa fa-check-circle text-info" style={{ fontSize: "64px" }}></i>
                                                            </div>
                                                            <h3 className="text-info">Déjà Vérifié!</h3>
                                                            <p className="text-muted">
                                                                Votre email est déjà vérifié. Vous allez être redirigé vers la page de connexion...
                                                            </p>
                                                        </>
                                                    )}
                                                    
                                                    {!loading && error && (
                                                        <>
                                                            <div className="mb-3">
                                                                <i className="fa fa-times-circle text-danger" style={{ fontSize: "64px" }}></i>
                                                            </div>
                                                            <h3 className="text-danger">Échec de la Vérification</h3>
                                                            <p className="text-muted mb-4">{error}</p>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-lg"
                                                                onClick={() => navigate(route.login)}
                                                            >
                                                                Retour à la Connexion
                                                            </button>
                                                        </>
                                                    )}
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

export default VerifyEmail;
