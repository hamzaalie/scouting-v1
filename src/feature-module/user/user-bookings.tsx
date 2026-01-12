import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {idaSportsUserInterface} from "../../core/data/interface/model";
import {all_routes} from "../router/all_routes";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {backendFunctions} from "../../helpers/backend.helper";
import {tAllAbonnements, tAbonnement} from "../../types/abonnement.type";
import {options} from "../../helpers/input.helper";
import {LoadingIcon} from "yet-another-react-lightbox";
import {tPack, tPaymentPack} from "../../types/pack.type";
import {toast} from "react-toastify";
import {paymentService} from "../../helpers/payment.service";

const UserBookings = () => {
    const routes = all_routes;
    const location = useLocation();
    const navigate = useNavigate();

    const defaultPackValues: tPack = {
        id: "",
        title: "",
        shortDesc: "",
        description: "",
        currency: "XOF",
        period: "mois",
        roleId: "",
        price: 0,
        option: "local",
    };

    const [chosenPack, setChosenPack] = useState<tPack | null>(null);
    const [searchInput, setSearchInput] = useState("");
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [loadingPayment, setLoadingPayment] = useState<boolean>(false);

    const isUserConnected: idaSportsUserInterface = localStorageFunctions.getUser();

    // All Abonnements fetched
    const [allAbonnements, setAllAbonnements] = useState<tAllAbonnements>([]);
    const [abonnementsToDisplay, setAbonnementsToDisplay] = useState<tAllAbonnements>([]);

    // For Payment
    const [packPayment, setPackPayment] = useState<tPaymentPack | null>(null);

    useEffect(() => {
        // Check if there's a pack in location state
        if (location.state && location.state.id) {
            setChosenPack(location.state);

            // Set up payment details
            if (isUserConnected?.id) {
                setPackPayment({
                    amount: location.state.price?.toString() || "0",
                    description: "Paiement - " + location.state.title,
                    clientId: isUserConnected.id,
                    period: location.state.period,
                    packId: location.state.id,
                });
            }
        } else {
            // Check if there's a stored pack from previous navigation
            const savedPack = paymentService.getSelectedPack();
            if (savedPack) {
                setChosenPack(savedPack);

                if (isUserConnected?.id) {
                    setPackPayment({
                        amount: savedPack.price?.toString() || "0",
                        description: "Paiement - " + savedPack.title,
                        period: savedPack.period,
                        clientId: isUserConnected.id,
                        packId: savedPack.id || "",
                    });
                }

                // Clear the stored pack
                paymentService.clearSelectedPack();
            }
        }

        // Load abonnements
        loadAbonnements();
    }, [location.state]);

    const loadAbonnements = () => {
        if (!localStorageFunctions.getToken()) {
            setLoadingData(false);
            setAllAbonnements([]);
            setAbonnementsToDisplay([]);
            return;
        }

        backendFunctions.abonnement
            .getAllAbonnements(localStorageFunctions.getToken())
            .then((response: tAllAbonnements) => {
                setAllAbonnements(response);
                setLoadingData(false);

                if (isUserConnected && isUserConnected.id) {
                    setAbonnementsToDisplay(
                        response.filter(
                            (abonnement: tAbonnement) => abonnement.clientId === isUserConnected.id
                        )
                    );
                } else {
                    setAbonnementsToDisplay([]);
                }
            })
            .catch((error) => {
                setLoadingData(false);
                setAllAbonnements([]);
                setAbonnementsToDisplay([]);
            });
    };

    const filteredData = abonnementsToDisplay.filter((datas) => {
        const values = Object.values(datas).map((value) => value?.toString().toLowerCase());
        return values.some((value) => value?.includes(searchInput.toLowerCase()));
    });

    const courtNameRender = (res: tAbonnement) => {
        return (
            <h2 className="table-avatar">
                <span className="table-head-name flex-grow-1">
                    {res.pack?.title || `Pack ${res.packId?.substring(20, 25)}...`}
                </span>
            </h2>
        );
    };

    const descriptionPackRender = (res: tAbonnement) => {
        return (
            <h2 className="table-avatar">
                <span className="table-head-name flex-grow-1">
                    {res.pack?.shortDesc || `Description pack ${res.packId?.substring(20, 25)}...`}
                </span>
            </h2>
        );
    };

    const dateTimeRender = (res: tAbonnement) => {
        return (
            <h4>
                {new Date(res.createdAt).toLocaleDateString("fr-FR", options)}{" "}
                <span>{new Date(res.createdAt).toLocaleTimeString("fr-FR")}</span>
            </h4>
        );
    };

    const statusRender = (res: tAbonnement) => {
        return (
            <td className="table-accept-btn text-end">
                <Link
                    to="#"
                    className={res.status === "actifs" ? "badge bg-success-custom" : "badge bg-danger-custom"}
                >
                    <i
                        className={
                            res.status === "actifs"
                                ? "feather-check-circle me-1"
                                : "feather-x-circle me-1"
                        }
                    ></i>
                    {res.status === "actifs" ? "Actif" : "Inactif"}
                </Link>
            </td>
        );
    };

    const handlePackPayment = async () => {
        if (!chosenPack?.id || !packPayment) {
            toast.error("Informations de paiement incomplètes", {
                toastId: "errorToast",
                theme: "colored",
            });
            return;
        }

        setLoadingPayment(true);
        const response = backendFunctions.payment.createPayment(packPayment);

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
                toastId: "paymentToast",
                theme: "colored",
            }
        );

        try {
            const result = await response;
            setTimeout(() => {
                window.location.href = result?.paymentUrl;
            }, 2000);
        } catch (error) {
            console.error("Payment error:", error);
            setLoadingPayment(false);
        }
    };

    const handleCancelPayment = () => {
        setChosenPack(null);
        setPackPayment(null);
    };

    return (
        <>
            {!chosenPack ? (
                // Dashboard view
                <>
                    {/* Breadcrumb */}
                    <section className="breadcrumb breadcrumb-list mb-0">
                        <span className="primary-right-round" />
                        <div className="container">
                            <h1 className="text-white">
                                Bienvenue, {isUserConnected?.firstName || "Utilisateur"} !
                            </h1>
                            <ul>
                                <li>
                                    <Link to={routes.userBookings}>Tableau de bord</Link>
                                </li>
                                <li>Packs</li>
                            </ul>
                        </div>
                    </section>

                    {/* Dashboard Menu */}
                    <div className="dashboard-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="dashboard-menu">
                                        <ul>
                                            <li>
                                                <Link to={routes.userBookings} className="active">
                                                    <ImageWithBasePath
                                                        src="assets/img/icons/booking-icon.svg"
                                                        alt="Icon"
                                                    />
                                                    <span>Packs</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={routes.userInvoice}>
                                                    <ImageWithBasePath
                                                        src="assets/img/icons/invoice-icon.svg"
                                                        alt="Icon"
                                                    />
                                                    <span>Factures</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={routes.userProfile}>
                                                    <ImageWithBasePath
                                                        src="assets/img/icons/profile-icon.svg"
                                                        alt="Icon"
                                                    />
                                                    <span>Paramètres</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={routes.userClaim}>
                                                    <span>
                                                        <i className="fs-3 feather-help-circle" />
                                                    </span>
                                                    <span>Réclamations</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page Content */}
                    <div className="content court-bg">
                        <div className="container">
                            {/* Sort By */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="sortby-section court-sortby-section">
                                        <div className="sorting-info">
                                            <div className="row d-flex align-items-center">
                                                {/* Filter By Status */}
                                                <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                                                    <div className="coach-court-list">
                                                        <ul className="nav">
                                                            <li>
                                                                <Link
                                                                    to={routes.userBookings}
                                                                    className="active"
                                                                >
                                                                    Tous
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to={routes.userComplete}>
                                                                    Actifs
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to={routes.userCancelled}>
                                                                    Inactifs
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Table */}
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="court-tab-content">
                                        <div className="card card-tableset">
                                            <div className="card-body">
                                                <div className="coache-head-blk">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-5">
                                                            <div className="court-table-head">
                                                                <h4>Mes Packs</h4>
                                                                <p>Suivez et gérer vos packs</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <div className="table-search-top">
                                                                <div className="dataTables_filter">
                                                                    <label>
                                                                        <input
                                                                            type="text"
                                                                            value={searchInput}
                                                                            onChange={(e) =>
                                                                                setSearchInput(
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            placeholder="Rechercher..."
                                                                            className="form-control"
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-content">
                                                    <div
                                                        className="tab-pane fade show active"
                                                        id="nav-Recent"
                                                        role="tabpanel"
                                                        aria-labelledby="nav-Recent-tab"
                                                        tabIndex={0}
                                                    >
                                                        <div className="table-responsive table-datatble">
                                                            <DataTable
                                                                className="table datatable"
                                                                value={filteredData}
                                                                paginator
                                                                rows={10}
                                                                loading={loadingData}
                                                                loadingIcon={<LoadingIcon />}
                                                                rowsPerPageOptions={[5, 10, 25, 50]}
                                                                currentPageReportTemplate="{first}"
                                                                emptyMessage="Aucune donnée"
                                                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                                                dataKey="id"
                                                                rowHover
                                                            >
                                                                <Column
                                                                    sortable
                                                                    field="packId"
                                                                    body={courtNameRender}
                                                                    header="Intitulé du Pack"
                                                                ></Column>
                                                                <Column
                                                                    sortable
                                                                    field="shortDesc"
                                                                    body={descriptionPackRender}
                                                                    header="Description du Pack"
                                                                ></Column>
                                                                <Column
                                                                    sortable
                                                                    field="state"
                                                                    header="État"
                                                                ></Column>
                                                                <Column
                                                                    sortable
                                                                    field="createdAt"
                                                                    className="table-date-time"
                                                                    body={dateTimeRender}
                                                                    header="Acheté le"
                                                                ></Column>
                                                                <Column
                                                                    sortable
                                                                    field="status"
                                                                    header="Statut"
                                                                    body={statusRender}
                                                                    className="table-inset-btn"
                                                                ></Column>
                                                            </DataTable>
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
                </>
            ) : (
                // Payment view
                <div className="payment-section py-5">
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
                                                    <i className="feather-package fs-1 text-primary"></i>
                                                </div>
                                                <div>
                                                    <h5 className="mb-0">{chosenPack.title}</h5>
                                                    <p className="text-muted mb-0">
                                                        {chosenPack.shortDesc}
                                                    </p>
                                                </div>
                                            </div>
                                            {chosenPack.description && (
                                                <div className="pack-description">
                                                    <p>{chosenPack.description}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="payment-details">
                                            <div className="border-top pt-3 mb-3">
                                                <div className="row mb-2">
                                                    <div className="col-7">
                                                        <span className="text-muted">
                                                            Prix du pack
                                                        </span>
                                                    </div>
                                                    <div className="col-5 text-end">
                                                        <span>
                                                            {chosenPack.price} {chosenPack.currency}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-7">
                                                        <span className="text-muted">Période</span>
                                                    </div>
                                                    <div className="col-5 text-end">
                                                        <span>{chosenPack.period || "N/A"}</span>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-7">
                                                        <span className="text-muted">Option</span>
                                                    </div>
                                                    <div className="col-5 text-end">
                                                        <span>
                                                            {chosenPack.option || "Standard"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-top pt-3 mb-4">
                                                <div className="row">
                                                    <div className="col-7">
                                                        <h5>Total</h5>
                                                    </div>
                                                    <div className="col-5 text-end">
                                                        <h5 className="text-primary">
                                                            {chosenPack.price} {chosenPack.currency}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="payment-actions d-flex justify-content-between">
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={handleCancelPayment}
                                                disabled={loadingPayment}
                                            >
                                                <i className="feather-arrow-left me-2"></i>
                                                Retour
                                            </button>
                                            <div>
                                                <button
                                                    className="btn btn-outline-info me-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#pack-detail-modal"
                                                    disabled={loadingPayment}
                                                >
                                                    <i className="feather-info me-2"></i>
                                                    Détails
                                                </button>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={handlePackPayment}
                                                    disabled={loadingPayment}
                                                >
                                                    {loadingPayment ? (
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
                </div>
            )}

            {/* Pack Detail Modal */}
            {chosenPack && (
                <div
                    className="modal custom-modal fade request-modal"
                    id="pack-detail-modal"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="form-header modal-header-title">
                                    <h4 className="mb-0">
                                        Détails du Pack
                                        <span className="badge bg-primary ms-2">Information</span>
                                    </h4>
                                </div>
                                <Link
                                    to="#"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span className="align-center" aria-hidden="true">
                                        <i className="feather-x" />
                                    </span>
                                </Link>
                            </div>
                            <div className="modal-body">
                                {/* Pack Information */}
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card dashboard-card pack-information">
                                            <div className="card-header d-flex justify-content-between align-items-center">
                                                <h4>Information du Pack</h4>
                                                <span className="badge bg-success">
                                                    {chosenPack.option || "Standard"}
                                                </span>
                                            </div>
                                            <div className="appointment-info">
                                                <ul className="appointmentset">
                                                    <li>
                                                        <div className="appointment-item">
                                                            <div className="appointment-img">
                                                                <i className="feather-package fs-1 text-primary"></i>
                                                            </div>
                                                            <div className="appointment-content">
                                                                <h6>
                                                                    {chosenPack.title || "Pack"}
                                                                </h6>
                                                                <p className="color-green">
                                                                    {chosenPack.shortDesc ||
                                                                        "Description non disponible"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <h6>Prix</h6>
                                                        <p className="fw-bold text-primary">
                                                            {chosenPack.price || 0}{" "}
                                                            {chosenPack.currency || "XOF"}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <h6>Période</h6>
                                                        <p>{chosenPack.period || "N/A"}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="card dashboard-card pack-information">
                                            <div className="card-header">
                                                <h4>Description Complète</h4>
                                            </div>
                                            <div className="appointment-info appoin-border">
                                                <div className="pack-description p-3">
                                                    <p>
                                                        {chosenPack.description ||
                                                            "Aucune description détaillée disponible pour ce pack."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card dashboard-card pack-information mb-0">
                                            <div className="card-header">
                                                <h4>Détails de Paiement</h4>
                                            </div>
                                            <div className="appointment-info appoin-border">
                                                <ul className="appointmentset">
                                                    <li>
                                                        <h6>Méthode de Paiement</h6>
                                                        <p>CinetPay</p>
                                                    </li>
                                                    <li>
                                                        <h6>Options de Paiement</h6>
                                                        <p>Mobile Money, Carte Bancaire</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Pack Information */}
                            </div>
                            <div className="modal-footer">
                                <div className="table-accept-btn d-flex gap-2">
                                    <Link
                                        to="#"
                                        data-bs-dismiss="modal"
                                        className="btn btn-outline-secondary"
                                    >
                                        Fermer
                                    </Link>
                                    <button
                                        onClick={() => {
                                            // Close modal using data-bs-dismiss attribute
                                            document
                                                .querySelector('[data-bs-dismiss="modal"]')
                                                ?.click();
                                            // Then proceed with payment
                                            setTimeout(() => {
                                                handlePackPayment();
                                            }, 300);
                                        }}
                                        className="btn btn-primary"
                                        disabled={loadingPayment}
                                    >
                                        Procéder au Paiement
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* /Pack Detail Modal */}
        </>
    );
};

export default UserBookings;
