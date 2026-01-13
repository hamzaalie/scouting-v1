import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {v4 as uuidv4} from "uuid";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {backendFunctions} from "../../helpers/backend.helper";
import {paymentService} from "../../helpers/payment.service";
import {paymentStatusMap, tPaymentStatusDetail} from "../../types/transaction.type";
import {useTranslation} from "react-i18next";

const PaymentResultPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const routes = all_routes;
    const { t } = useTranslation();
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const [paymentDetails, setPaymentDetails] = useState<tPaymentStatusDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            try {
                // Get the message and transaction ID from URL parameters
                const queryParams = new URLSearchParams(location.search);
                const messageStatus = queryParams.get("message");

                // If we have a message code, find the corresponding status
                if (messageStatus) {
                    setPaymentStatus(messageStatus);

                    // Get payment details for this code
                    const details = paymentStatusMap[messageStatus] || {
                        status: "UNKNOWN_ERROR",
                        reason: "Une erreur inconnue s'est produite",
                    };

                    setPaymentDetails(details);

                    // If the payment was successful, update the user subscription status
                    if (messageStatus === "SUCCES") {
                        // You might want to call an API to update user status
                        // For example: await backendFunctions.payment.verifyPayment(txId);
                    }
                } else {
                    setPaymentStatus("UNKNOWN");
                    setPaymentDetails({
                        status: "UNKNOWN_ERROR",
                        reason: "Aucune information de paiement disponible",
                    });
                }
            } catch (error) {
                console.error("Error processing payment result:", error);
                setPaymentStatus("ERROR");
                setPaymentDetails({
                    status: "PROCESSING_ERROR",
                    reason: "Erreur lors du traitement du résultat du paiement",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentStatus();
    }, [location.search]);

    const navigateToDashboard = () => {
        if (paymentService.getSelectedPack() !== null) paymentService.clearSelectedPack();
        navigate(routes.userBookings);
    };

    const retryPayment = () => {
        navigate(routes.userSubscription);
    };

    // Helper function to determine if payment was successful
    const isSuccessful = (): boolean => {
        return paymentStatus === "SUCCES";
    };

    // Helper function to determine if payment is pending
    const isPending = (): boolean => {
        return (
            paymentStatus === "CREATED" ||
            paymentStatus === "WAITING_CUSTOMER_TO_VALIDATE" ||
            paymentStatus === "WAITING_CUSTOMER_PAYMENT" ||
            paymentStatus === "WAITING_CUSTOMER_OTP_CODE"
        );
    };

    if (loading) {
        return (
            <div
                className="payment-result-loading d-flex justify-content-center align-items-center"
                style={{minHeight: "60vh"}}
            >
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <h5>Traitement du résultat du paiement...</h5>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-result-page">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div
                            className={`card shadow border-0 ${isSuccessful() ? "border-success" : isPending() ? "border-warning" : "border-danger"}`}
                        >
                            <div
                                className={`card-header ${isSuccessful() ? "bg-success" : isPending() ? "bg-warning" : "bg-danger"} text-white`}
                            >
                                <h4 className="mb-0">
                                    {isSuccessful() ? (
                                        <i className="feather-check-circle me-2"></i>
                                    ) : isPending() ? (
                                        <i className="feather-clock me-2"></i>
                                    ) : (
                                        <i className="feather-x-circle me-2"></i>
                                    )}
                                    Résultat du paiement
                                </h4>
                            </div>

                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    {isSuccessful() ? (
                                        <i
                                            className="feather-check-circle me-2 mb-3"
                                            style={{
                                                fontSize: "105px",
                                                color: "#28a745",
                                            }}
                                        ></i>
                                    ) : isPending() ? (
                                        <ImageWithBasePath
                                            src="assets/img/icons/payment-pending.svg"
                                            alt="Paiement en attente"
                                            className="img-fluid mb-3"
                                            width={120}
                                            height={120}
                                            style={{
                                                margin: "auto",
                                            }}
                                        />
                                    ) : (
                                        <i
                                            className="feather-x-circle me-2"
                                            style={{
                                                fontSize: "105px",
                                                color: "#dc3545",
                                            }}
                                        ></i>
                                    )}

                                    <h3
                                        className={`mb-2 mt-3 ${isSuccessful() ? "text-success" : isPending() ? "text-warning" : "text-danger"}`}
                                    >
                                        {isSuccessful()
                                            ? "Paiement réussi !"
                                            : isPending()
                                              ? "Paiement en attente"
                                              : "Paiement échoué"}
                                    </h3>

                                    <p className="lead">{paymentDetails?.reason}</p>
                                </div>

                                {!isSuccessful() && !isPending() && (
                                    <div className="error-details bg-light p-3 rounded mb-4">
                                        <h5 className="text-dark mb-3">Détails de l&apos;erreur</h5>
                                        <p>
                                            {/* Code: <strong>{paymentStatus}</strong>
                                            <br /> */}
                                            Statut: <strong>{paymentDetails?.status}</strong>
                                        </p>
                                        <div className="mt-3">
                                            <h6>Que pouvez-vous faire ?</h6>
                                            <ul className="mb-0">
                                                <li>Vérifiez que votre solde est suffisant</li>
                                                <li>
                                                    Assurez-vous que les informations saisies sont
                                                    correctes
                                                </li>
                                                <li>Essayez un autre moyen de paiement</li>
                                                <li>
                                                    Contactez notre service client si le problème
                                                    persiste
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {isPending() && (
                                    <div className="pending-info bg-light p-3 rounded mb-4">
                                        <h5 className="text-dark mb-3">Informations importantes</h5>
                                        <p>
                                            Votre paiement est en cours de traitement. Cela peut
                                            prendre quelques minutes.
                                        </p>
                                        <div className="mt-3">
                                            <h6>Prochaines étapes:</h6>
                                            <ul className="mb-0">
                                                <li>
                                                    Ne fermez pas cette page si vous êtes en attente
                                                    de confirmation
                                                </li>
                                                <li>
                                                    Vérifiez votre téléphone pour toute demande de
                                                    confirmation
                                                </li>
                                                <li>
                                                    Vous recevrez une notification une fois le
                                                    paiement confirmé
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                <div className="payment-actions d-flex flex-column flex-md-row justify-content-between">
                                    <button
                                        className="btn btn-outline-secondary mb-2 mb-md-0"
                                        onClick={navigateToDashboard}
                                    >
                                        <i className="feather-home me-2"></i>
                                        Retour au tableau de bord
                                    </button>

                                    {!isSuccessful() && (
                                        <button
                                            hidden
                                            className="btn btn-primary"
                                            onClick={retryPayment}
                                        >
                                            <i className="feather-refresh-cw me-2"></i>
                                            {isPending()
                                                ? "Vérifier statut"
                                                : "Réessayer le paiement"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentResultPage;
