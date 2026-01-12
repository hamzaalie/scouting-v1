import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {tPack, tPaymentPack} from "../types/pack.type";
import {backendFunctions} from "../helpers/backend.helper";
import {localStorageFunctions} from "../helpers/localStorage.helper";
import ImageWithBasePath from "../core/data/img/ImageWithBasePath";
import {all_routes} from "../feature-module/router/all_routes";

interface PaymentSectionProps {
    chosenPack: tPack;
    onCancel: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({chosenPack, onCancel}) => {
    const navigate = useNavigate();
    const routes = all_routes;
    const [loading, setLoading] = useState<boolean>(false);
    const [paymentDetails, setPaymentDetails] = useState<tPaymentPack>({
        amount: chosenPack?.price?.toString() || "0",
        description: `Paiement - ${chosenPack?.title || "Pack"}`,
        clientId: localStorageFunctions.getUser()?.id || "",
        period: chosenPack?.period,
        packId: chosenPack?.id || "",
    });

    useEffect(() => {
        // Update payment details when chosen pack changes
        if (chosenPack) {
            setPaymentDetails({
                amount: chosenPack.price?.toString() || "0",
                description: `Paiement - ${chosenPack.title || "Pack"}`,
                clientId: localStorageFunctions.getUser()?.id || "",
                period: chosenPack?.period,

                packId: chosenPack.id || "",
            });
        }
    }, [chosenPack]);

    const handlePackPayment = async () => {
        if (!chosenPack?.id) {
            toast.error("Aucun pack sélectionné", {
                toastId: "defaultToast",
                theme: "colored",
            });
            return;
        }

        setLoading(true);
        const response = backendFunctions.payment.createPayment(paymentDetails);

        toast.promise(
            response,
            {
                pending: "Initialisation du paiement en cours",
                success: {
                    render() {
                        return "Paiement initialisé. Vous serez redirigé(e) vers la page de confirmation...";
                    },
                },
                error: "Erreur lors de l'initialisation du paiement",
            },
            {
                toastId: "defaultToast",
                theme: "colored",
            }
        );

        try {
            const result = await response;
            setTimeout(() => {
                window.location.href = result?.paymentUrl;
            }, 3000);
        } catch (error) {
            console.error("Payment error:", error);
            setLoading(false);
        }
    };

    return (
        <div className="payment-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Récapitulatif de paiement</h4>
                            </div>
                            <div className="card-body">
                                <div className="pack-details mb-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="pack-icon me-3">
                                            <ImageWithBasePath
                                                src="assets/img/icons/payment-icon.svg"
                                                alt="Payment"
                                                className="img-fluid"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div>
                                            <h5 className="mb-0">{chosenPack?.title}</h5>
                                            <p className="text-muted mb-0">
                                                {chosenPack?.shortDesc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pack-description">
                                        <p>{chosenPack?.description}</p>
                                    </div>
                                </div>

                                <div className="payment-details">
                                    <div className="border-top pt-3 mb-3">
                                        <div className="row mb-2">
                                            <div className="col-7">
                                                <span className="text-muted">Prix du pack</span>
                                            </div>
                                            <div className="col-5 text-end">
                                                <span>
                                                    {chosenPack?.price} {chosenPack?.currency}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-7">
                                                <span className="text-muted">Période</span>
                                            </div>
                                            <div className="col-5 text-end">
                                                <span>{chosenPack?.period || "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-7">
                                                <span className="text-muted">Option</span>
                                            </div>
                                            <div className="col-5 text-end">
                                                <span>{chosenPack?.option || "Standard"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-top pt-3 mb-3">
                                        <div className="row">
                                            <div className="col-7">
                                                <h5>Total</h5>
                                            </div>
                                            <div className="col-5 text-end">
                                                <h5 className="text-primary">
                                                    {chosenPack?.price} {chosenPack?.currency}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-actions d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={onCancel}
                                        disabled={loading}
                                    >
                                        Retour
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePackPayment}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <i className="feather-loader me-2"></i>
                                                Traitement en cours...
                                            </>
                                        ) : (
                                            <>
                                                <i className="feather-credit-card me-2"></i>
                                                Procéder au paiement
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
