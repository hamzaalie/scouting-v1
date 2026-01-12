import React, {useEffect, useState} from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {all_routes} from "../router/all_routes";
import {Link} from "react-router-dom";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {usercancelleddata} from "../../core/data/json/user_cancelledata";
import {Dropdown} from "primereact/dropdown";
import {idaSportsUserInterface, userCancelledInterface} from "../../core/data/interface/model";
import {backendFunctions} from "../../helpers/backend.helper";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {tAbonnement, tAllAbonnements} from "../../types/abonnement.type";
import {options} from "../../helpers/input.helper";
import {LoadingIcon} from "yet-another-react-lightbox";

const UserCancelled = () => {
    const routes = all_routes;
    const [searchInput, setSearchInput] = useState("");
    const [days, setDays] = useState();
    const [price, setPrice] = useState();
    //console.log( "location");
    const isUserConnected: idaSportsUserInterface = localStorageFunctions.getUser();
    //console.log("🚀 ~ UserDashboard ~ isUserConnected:", isUserConnected);

    const day = [{name: "This Week"}, {name: "One Day"}];
    const sortby = [{name: "Relevance"}, {name: "Price"}];

    //All Abonnements fetched
    const [allAbonnements, setAllAbonnements] = useState<tAllAbonnements>([]);
    const [abonnementsToDisplay, setAbonnementsToDisplay] = useState<tAllAbonnements>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);

    useEffect(() => {
        //Query
        backendFunctions.abonnement
            .getAllAbonnements(localStorageFunctions.getToken())
            .then((response: tAllAbonnements) => {
                //console.log("🚀 ~ .then ~ response:", response);
                setAllAbonnements(response);
                setLoadingData(false);
                setAbonnementsToDisplay(
                    response.filter(
                        (abonnement: tAbonnement) =>
                            abonnement.clientId === isUserConnected.id &&
                            abonnement.status === "inactifs"
                    )
                );
            })
            .catch((error) => {
                //console.log("🚀 ~ Pricing ~ error:", error);
                setLoadingData(false);
                setAllAbonnements([]);
            });
    }, []);

    const filteredData = abonnementsToDisplay.filter((datas) => {
        const values = Object.values(datas).map((value) => value?.toString().toLowerCase());
        return values.some((value) => value?.includes(searchInput.toLowerCase()));
    });
    const courtNameRender = (res: tAbonnement) => {
        //console.log("🚀 ~ courtNameRender ~ res:", res);
        return (
            <h2 className="table-avatar">
                {/* <Link to="#" className="avatar avatar-sm  flex-shrink-0">
                    <img className="avatar-img" src="https://picsum.photos/200" alt="User" />
                </Link> */}
                <span className="table-head-name flex-grow-1">
                    {res.pack?.title || `Pack ${res.packId?.substring(20, 25)}...`}
                    {/* <span>{res.packId}</span> */}
                </span>
            </h2>
        );
    };

    const descriptionPackRender = (res: tAbonnement) => {
        return (
            <h2 className="table-avatar">
                {/* <Link to="#" className="avatar avatar-sm  flex-shrink-0">
                    <img className="avatar-img" src="https://picsum.photos/200" alt="User" />
                </Link> */}
                <span className="table-head-name flex-grow-1">
                    {res.pack?.shortDesc || `Description pack ${res.packId?.substring(20, 25)}...`}
                </span>
            </h2>
        );
    };

    const statusRender = (res: tAbonnement) => {
        return (
            <td className="table-accept-btn text-end">
                <Link
                    to="#"
                    className={
                        res.status === "actifs"
                            ? "badge bg-success-custom"
                            : "badge bg-danger-custom"
                    }
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

    const actionRender = () => {
        return (
            <div className="dropdown dropdown-action table-drop-action">
                <Link
                    to="#"
                    className="action-icon dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="fas fa-ellipsis-h" />
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                    <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#cancel-court"
                    >
                        <i className="feather-briefcase"></i>Refund
                    </Link>
                    <Link className="dropdown-item" to="#">
                        <i className="feather-trash" />
                        Delete
                    </Link>
                </div>
            </div>
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

    return (
        <>
            {/* Breadcrumb */}
            <section className="breadcrumb breadcrumb-list mb-0">
                <span className="primary-right-round" />
                <div className="container">
                    <h1 className="text-white">Bienvenue, {isUserConnected?.firstName} !</h1>
                    <ul>
                        <li>
                            <Link to={routes.userBookings}>Tableau de bord</Link>
                        </li>
                        <li>Packs</li>
                    </ul>
                </div>
            </section>
            {/* /Breadcrumb */}
            {/* Dashboard Menu */}
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
                                                        <Link to={routes.userBookings}>Tous</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={routes.userComplete}>Actifs</Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link to={routes.userOngoing}>
                                                            En cours
                                                        </Link>
                                                    </li> */}
                                                    <li>
                                                        <Link
                                                            to={routes.userCancelled}
                                                            className="active"
                                                        >
                                                            Inactifs
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
                            <div className="court-tab-content">
                                <div className="card card-tableset">
                                    <div className="card-body">
                                        <div className="coache-head-blk">
                                            <div className="row align-items-center">
                                                <div className="col-md-5">
                                                    <div className="court-table-head">
                                                        <h4>Mes Packs</h4>
                                                        <p>
                                                            Suivez et gérez vos achats de packs
                                                            Inactifs
                                                        </p>
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
                                                        {/* <div className="request-coach-list">
                                                            <div className="card-header-btns">
                                                                <nav>
                                                                    <div
                                                                        className="nav nav-tabs"
                                                                        role="tablist"
                                                                    >
                                                                        <button
                                                                            className="nav-link active"
                                                                            id="nav-Recent-tab"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#nav-Recent"
                                                                            type="button"
                                                                            role="tab"
                                                                            aria-controls="nav-Recent"
                                                                            aria-selected="true"
                                                                        >
                                                                            Courts
                                                                        </button>
                                                                        <button
                                                                            className="nav-link"
                                                                            id="nav-RecentCoaching-tab"
                                                                            data-bs-toggle="tab"
                                                                            data-bs-target="#nav-RecentCoaching"
                                                                            type="button"
                                                                            role="tab"
                                                                            aria-controls="nav-RecentCoaching"
                                                                            aria-selected="false"
                                                                        >
                                                                            Coaches
                                                                        </button>
                                                                    </div>
                                                                </nav>
                                                            </div>
                                                        </div> */}
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
                                                        emptyMessage="Aucune donnée"
                                                        rowsPerPageOptions={[10, 25, 50]}
                                                        currentPageReportTemplate="{first}"
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
                                                        {/* <Column
                                                            body={actionRender}
                                                            header="Actions"
                                                        ></Column> */}
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="nav-RecentCoaching"
                                                role="tabpanel"
                                                aria-labelledby="nav-RecentCoaching-tab"
                                                tabIndex={0}
                                            >
                                                <div className="table-responsive table-datatble">
                                                    <table className="table  datatable">
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th>Coach Name</th>
                                                                <th>Booking Type</th>
                                                                <th>Date &amp; Time</th>
                                                                <th>Montant</th>
                                                                <th>Statut</th>
                                                                <th />
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <h2 className="table-avatar">
                                                                        <Link
                                                                            to="#"
                                                                            className="avatar avatar-sm flex-shrink-0"
                                                                        >
                                                                            <ImageWithBasePath
                                                                                className="avatar-img"
                                                                                src="assets/img/featured/featured-05.jpg"
                                                                                alt="User"
                                                                            />
                                                                        </Link>
                                                                        <span className="table-head-name flex-grow-1">
                                                                            <Link
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#cancel-coach"
                                                                            >
                                                                                Kevin Anderson
                                                                            </Link>
                                                                            <span className="book-active">
                                                                                Booked on : 25 May
                                                                                2023
                                                                            </span>
                                                                        </span>
                                                                    </h2>
                                                                </td>
                                                                <td>Onetime</td>
                                                                <td className="table-date-time">
                                                                    <h4>
                                                                        Mon, Jul 11
                                                                        <span>
                                                                            06:00 PM - 08:00 PM
                                                                        </span>
                                                                    </h4>
                                                                </td>
                                                                <td>
                                                                    <span className="pay-dark fs-16">
                                                                        $150
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-danger">
                                                                        <ImageWithBasePath
                                                                            src="assets/img/icons/delete.svg"
                                                                            alt="Icon"
                                                                            className="me-1"
                                                                        />
                                                                        Annulé
                                                                    </span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <div className="dropdown dropdown-action table-drop-action">
                                                                        <Link
                                                                            to="#"
                                                                            className="action-icon dropdown-toggle"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                        >
                                                                            <i className="fas fa-ellipsis-h" />
                                                                        </Link>
                                                                        <div className="dropdown-menu dropdown-menu-end">
                                                                            <Link
                                                                                className="dropdown-item"
                                                                                to="#"
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#cancel-coach-modal"
                                                                            >
                                                                                <i className="feather-briefcase" />
                                                                                Refund
                                                                            </Link>
                                                                            <Link
                                                                                className="dropdown-item"
                                                                                to="#"
                                                                            >
                                                                                <i className="feather-trash" />
                                                                                Delete
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  <div className="tab-footer">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div id="tablelength" />
                                        </div>
                                        <div className="col-md-6">
                                            <div id="tablepage" />
                                        </div>
                                    </div>
                                </div>  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
        </>
    );
};

export default UserCancelled;
