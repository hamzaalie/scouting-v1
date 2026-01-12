import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {idaSportsUserInterface} from "../../core/data/interface/model";
import {all_routes} from "../router/all_routes";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {backendFunctions} from "../../helpers/backend.helper";
import {tAllClaims, tClaim} from "../../types/claim.type";
import {toast} from "react-toastify";

const UserClaimAdd = () => {
    const routes = all_routes;
    const isUserConnected: idaSportsUserInterface = localStorageFunctions.getUser();

    const defaultValues: tClaim = {
        id: "",
        title: "",
        description: "",
        type: "claim",
        status: "ouvert",
        clientId: isUserConnected.id,
        createdAt: new Date().toISOString(),
        docs: [],
    };

    const [newClaim, setNewClaim] = useState<tClaim>(defaultValues);

    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<any>();

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setNewClaim({
            ...newClaim,
            [name]: value,
        });

        // Effacer l'erreur lorsque l'utilisateur commence à taper
        if (errors[name]) {
            const newErrors = {...errors};
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    const handleFileButtonClick = () => {
        // Déclencher le click sur l'input file caché
        fileInputRef.current.click();
    };

    const handleFileChange = (e: any) => {
        const selectedFiles = Array.from(e.target.files);

        // Vérifier le nombre de fichiers
        if (selectedFiles.length > 2) {
            toast.error("Vous ne pouvez pas télécharger plus de 2 fichiers.");
            return;
        }

        // Vérifier les types de fichiers
        const validTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
        const invalidFiles = selectedFiles.filter((file: any) => !validTypes.includes(file.type));
        if (invalidFiles.length > 0) {
            toast.error("Seulement les fichiers PDF et images sont acceptés.");
            return;
        }

        // Vérifier la taille totale (5MB max)
        const totalSize: any = selectedFiles.reduce((sum, file: any) => sum + file.size, 0);
        if (totalSize > 5 * 1024 * 1024) {
            toast.error("La taille totale des fichiers ne doit pas dépasser 5MB.");
            return;
        }

        setNewClaim({
            ...newClaim,
            docs: selectedFiles,
        });

        // Effacer l'erreur si tout est valide
        if (errors.docs) {
            const newErrors = {...errors};
            delete newErrors.docs;
            setErrors(newErrors);
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        let isValid = true;

        if (!newClaim.title.trim()) {
            newErrors.title = "Le titre est requis";
            toast.error("Le titre est requis");
            isValid = false;
        }

        if (!newClaim.description.trim()) {
            newErrors.description = "La description est requise";
            toast.error("La description est requise");
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleClaim = () => {
        backendFunctions.claims
            .createClaim(newClaim, localStorageFunctions.getToken())
            .then(() => {
                // Optionally handle success (e.g., show a success message, redirect, etc.)
            })
            .catch((error) => {
                // Optionally handle error (e.g., show an error message)
                console.error("Error creating claim:", error);
            })
            .finally();
    };

    const resetForm = () => setNewClaim(defaultValues);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Création d'un FormData pour envoyer des fichiers
            const data = new FormData();
            data.append("title", newClaim.title);
            data.append("description", newClaim.description);

            // Ajout des fichiers
            newClaim.docs.forEach((file) => {
                data.append("docs", file);
            });

            // Afficher un toast de chargement
            const toastId = toast.loading("Envoi de votre réclamation en cours...");

            // Appel API
            backendFunctions.claims
                .createClaim(newClaim, localStorageFunctions.getToken())
                .then(() => {
                    console.log("Réclamation créée avec succès:");
                    // Mettre à jour le toast de chargement en toast de succès
                    toast.update(toastId, {
                        render: "Votre réclamation a été soumise avec succès!",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        window.location.href = routes.userClaim;
                    }, 4000);
                })
                .catch((error) => {
                    // Optionally handle error (e.g., show an error message)
                    console.error("Error creating claim:", error);
                    // Mettre à jour le toast de chargement en toast de succès
                    toast.update(toastId, {
                        render: "Une erreur s'est produite lors de la soumission du formulaire.",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000,
                    });
                })
                .finally(() => {
                    // Réinitialiser le formulaire
                    setNewClaim(defaultValues);
                    setIsSubmitting(false);
                });
        } catch (error: any) {
            console.error("Erreur lors de la soumission:", error);
            toast.error(
                error.message || "Une erreur s'est produite lors de la soumission du formulaire."
            );
        } finally {
            setNewClaim(defaultValues);
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Breadcrumb */}
            <section className="breadcrumb breadcrumb-list mb-0">
                <span className="primary-right-round" />
                <div className="container">
                    <h1 className="text-white">Mes réclamations</h1>
                    <ul>
                        <li>
                            <Link to={routes.userBookings}>Tableau de Bord</Link>
                        </li>
                        <li>Réclamations</li>
                    </ul>
                </div>
            </section>
            {/* /Breadcrumb */}
            {/* Dashboard Menu */}
            <div className="dashboard-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="dashboard-menu">
                                <ul>
                                    <li>
                                        <Link to={routes.userBookings}>
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
                                        <Link to={routes.userClaim} className="active">
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
            {/* /Dashboard Menu */}
            {/* Page Content */}
            <div className="content court-bg">
                <div className="container">
                    {/* Sort By */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="sortby-section court-sortby-section">
                                <div className="sorting-info">
                                    <div className="row d-flex align-items-center">
                                        {/* Filter By Statut */}
                                        <div className="col-xl-12 col-lg-12 col-sm-12 col-12">
                                            <div className="coach-court-list">
                                                <ul className="nav">
                                                    <li>
                                                        <Link to={routes.userClaim}>Tous</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={routes.userClaimTreated}>
                                                            Traités
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={routes.userClaimOpened}>
                                                            En cours
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={routes.userClaimSent}>
                                                            Envoyés
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link to={routes.userClaimRejected}>
                                                            Rejetés
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link
                                                            to={routes.userClaimAdd}
                                                            className=" btn btn-primary active"
                                                        >
                                                            <i className="feather-plus me-1"></i>
                                                            Créer
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Filter By Statut */}
                                        {/* Filter By Dropdown */}

                                        {/* Filter By Dropdown */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sort By */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="profile-detail-group">
                                <div className="card ">
                                    {/*begin::Form */}
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <section className="section">
                                                    <div className="container">
                                                        <h2 className="text-center mb-40">
                                                            Réclamation
                                                        </h2>
                                                        <form
                                                            onSubmit={handleSubmit}
                                                            className="contact-us"
                                                        >
                                                            <div className="row">
                                                                <div className="col mb-3">
                                                                    <label
                                                                        htmlFor="subject"
                                                                        className="form-label"
                                                                    >
                                                                        Objet
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control w-full p-2 border rounded ${errors.title ? "border-red-500" : "border-gray-300"}`}
                                                                        placeholder="Entrez le sujet"
                                                                        id="title"
                                                                        name="title"
                                                                        value={newClaim.title}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor="comments"
                                                                    className="form-label"
                                                                >
                                                                    Description
                                                                </label>
                                                                <textarea
                                                                    id="description"
                                                                    name="description"
                                                                    value={newClaim.description}
                                                                    onChange={handleInputChange}
                                                                    className={`form-control w-full p-2 border rounded ${errors.description ? "border-red-500" : "border-gray-300"}`}
                                                                    rows={3}
                                                                    placeholder="Entrez une description"
                                                                    defaultValue={""}
                                                                />
                                                            </div>
                                                            <div className="mt-4">
                                                                <label
                                                                    htmlFor="docs"
                                                                    className="block mb-1 font-medium"
                                                                >
                                                                    Documents (2 max, 5MB au total)
                                                                </label>
                                                                {/* Input file caché */}
                                                                <input
                                                                    type="file"
                                                                    ref={fileInputRef}
                                                                    onChange={handleFileChange}
                                                                    multiple
                                                                    hidden
                                                                    accept=".pdf,image/*"
                                                                />

                                                                {/* Bouton custom pour ouvrir la fenêtre de sélection */}
                                                                <div className="flex items-center">
                                                                    <button
                                                                        type="button"
                                                                        onClick={
                                                                            handleFileButtonClick
                                                                        }
                                                                        className="px-3 py-2 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 focus:outline-none"
                                                                    >
                                                                        Parcourir...
                                                                    </button>
                                                                    <span className="ml-3 text-gray-600">
                                                                        {newClaim.docs.length === 0
                                                                            ? "Aucun fichier choisi"
                                                                            : newClaim.docs
                                                                                    .length === 1
                                                                              ? newClaim.docs[0]
                                                                                    .name
                                                                              : `${newClaim.docs.length} fichiers sélectionnés`}
                                                                    </span>
                                                                </div>
                                                                {newClaim.docs.length > 0 && (
                                                                    <div className="mt-2">
                                                                        <p className="font-medium">
                                                                            Fichiers sélectionnés:
                                                                        </p>
                                                                        <ul className="mt-1 text-sm">
                                                                            {newClaim.docs.map(
                                                                                (file, index) => (
                                                                                    <li key={index}>
                                                                                        {file.name}{" "}
                                                                                        (
                                                                                        {(
                                                                                            file.size /
                                                                                            1024
                                                                                        ).toFixed(
                                                                                            2
                                                                                        )}{" "}
                                                                                        KB)
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </form>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </form>
                                    {/*end::Form */}
                                </div>
                                <div className="save-changes text-end">
                                    <Link
                                        to="#"
                                        className="btn btn-primary reset-profile"
                                        onClick={resetForm}
                                    >
                                        Annuler
                                    </Link>
                                    <Link
                                        type="submit"
                                        to="#"
                                        className="btn btn-secondary save-profile"
                                        onClick={handleSubmit}
                                    >
                                        {isSubmitting
                                            ? "Envoi en cours..."
                                            : "Soumettre la réclamation"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Deactive Modal */}
            <div className="modal custom-modal fade deactive-modal" id="deactive" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
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
                            {/* Deactive Account */}
                            <div className="account-deactive">
                                <ImageWithBasePath
                                    src="assets/img/icons/deactive-profile.svg"
                                    alt="Icon"
                                />
                                <h3>Are You Sure You Want to Deactive Account</h3>
                                <p>If yes please click “Yes” button</p>
                                <div className="convenient-btns">
                                    <Link
                                        to="#"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary d-inline-flex align-items-center"
                                    >
                                        Yes{" "}
                                        <span>
                                            <i className="feather-arrow-right-circle ms-2" />
                                        </span>
                                    </Link>
                                    <Link
                                        to="#"
                                        data-bs-dismiss="modal"
                                        className="btn btn-secondary d-inline-flex align-items-center"
                                    >
                                        No{" "}
                                        <span>
                                            <i className="feather-arrow-right-circle ms-2" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            {/* /Deactive Account */}
                        </div>
                    </div>
                </div>
            </div>
            {/* /Deactive Modal */}
            {/* Email Success */}
            <div className="modal custom-modal fade deactive-modal" id="success-mail" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
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
                            {/* Deactive Account */}
                            <div className="account-deactive">
                                <ImageWithBasePath
                                    src="assets/img/icons/email-success.svg"
                                    alt="Icon"
                                />
                                <h3>Email Changed Successfully</h3>
                                <p>Check your email on the confirmation</p>
                                <div className="convenient-btns">
                                    <Link
                                        to="#"
                                        className="btn btn-primary d-inline-flex align-items-center me-0"
                                    >
                                        <span>
                                            <i className="feather-arrow-left-circle me-2" />
                                        </span>
                                        Back to Dashboard
                                    </Link>
                                </div>
                            </div>
                            {/* /Email Success */}
                        </div>
                    </div>
                </div>
            </div>
            {/* /Deactive Modal */}
        </>
    );
};

export default UserClaimAdd;
