import React, {useState} from "react";
import {Link} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {all_routes} from "../router/all_routes";
import {Dropdown} from "primereact/dropdown";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {idaSportsUserInterface} from "../../core/data/interface/model";
import {backendFunctions} from "../../helpers/backend.helper";
import {toast} from "react-toastify";

const UserProfile = () => {
    const routes = all_routes;
    // const [selectedCountry, setSelectedCountry] = useState();
    // const countryList = [{name: "Country"}, {name: "Texas"}];

    const isUserConnected: idaSportsUserInterface = localStorageFunctions.getUser();
    const [firstName, setFirstName] = useState<string>(isUserConnected.firstName || "");
    const [lastName, setLastName] = useState<string>(isUserConnected.lastName || "");
    const [email, setEmail] = useState<string>(isUserConnected.email || "");
    const [loading, setLoading] = useState(false);

    const handleUpdateUser = (e: any) => {
        e?.preventDefault?.();
        setLoading(true);

        // localStorageFunctions.setToken(""); // Clear token as we are updating user info
        const updatedClient = {
            // ...isUserConnected,
            firstName,
            lastName,
            email,
        };
        backendFunctions.clients
            .updateClient(isUserConnected.id, updatedClient, localStorageFunctions.getToken())
            .then((response) => {
                setLoading(false);

                //console.log("Client updated successfully:", response);
                localStorageFunctions.setUser(response);
                toast.success("Profil mis à jour avec succès.", {
                    toastId: "defaultToast",
                    theme: "colored",
                });
                // setTimeout(() => {
                //     window.location.href = routes.userBookings;
                // }, 3000);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error updating client:", error);
                toast.error("Une erreur est survenue lors de la mise à jour du profil.", {
                    toastId: "defaultToast",
                    theme: "colored",
                });
            });
    };

    const resetUser = () => {
        setFirstName(isUserConnected.firstName || "");
        setLastName(isUserConnected.lastName || "");
        setEmail(isUserConnected.email || "");
        toast.info("Votre profil a bien été réinitialisé !", {
            toastId: "resetToast",
            theme: "colored",
        });
    };

    return (
        <div>
            <>
                {/* Breadcrumb */}
                <section className="breadcrumb breadcrumb-list mb-0">
                    <span className="primary-right-round" />
                    <div className="container">
                        <h1 className="text-white">Profil</h1>
                        <ul>
                            <li>
                                <Link to={routes.home}>Tableau de Bord</Link>
                            </li>
                            <li>Profil</li>
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
                                            <Link to={routes.userProfile} className="active">
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
                        <div className="coach-court-list profile-court-list">
                            <ul className="nav">
                                <li>
                                    <Link className="active" to={routes.userProfile}>
                                        Profil
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link to={routes.userSettingPassword}>Change Password</Link>
                                </li>
                                <li>
                                    <Link to={routes.userProfileOtherSetting}>Other Settings</Link>
                                </li> */}
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="profile-detail-group">
                                    <div className="card ">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {/* <div className="file-upload-text">
                                                        <div className="file-upload">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/img-icon.svg"
                                                                className="img-fluid"
                                                                alt="Upload"
                                                            />
                                                            <p>Upload Photo</p>
                                                            <span>
                                                                <i className="feather-edit-3" />
                                                                <input
                                                                    type="file"
                                                                    id="file-input"
                                                                />
                                                            </span>
                                                        </div>
                                                        <h5>
                                                            Upload a logo with a minimum size of 150
                                                            * 150 pixels (JPG, PNG, SVG).
                                                        </h5>
                                                    </div> */}
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="input-space">
                                                        <label className="form-label">
                                                            Prénom(s)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="firstName"
                                                            placeholder="Prénom(s)"
                                                            value={firstName}
                                                            onChange={(e) =>
                                                                setFirstName(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="input-space">
                                                        <label className="form-label">Nom</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="lastName"
                                                            placeholder="Nom"
                                                            value={lastName}
                                                            onChange={(e) =>
                                                                setLastName(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="input-space">
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="email"
                                                            placeholder="Enter Email Address"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-lg-4 col-md-6">
                                                    <div className="input-space">
                                                        <label className="form-label">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="phone"
                                                            placeholder="Enter Phone Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="info-about">
                                                        <label
                                                            htmlFor="comments"
                                                            className="form-label"
                                                        >
                                                            Information about You
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            id="comments"
                                                            rows={3}
                                                            placeholder="About"
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                </div> */}
                                                {/* <div className="address-form-head">
                                                    <h4>Address</h4>
                                                </div>
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="input-space">
                                                        <label className="form-label">
                                                            Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="address"
                                                            placeholder="Enter Address"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="input-space">
                                                        <label className="form-label">State</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="state"
                                                            placeholder="Enter State"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="input-space">
                                                        <label className="form-label">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="city"
                                                            placeholder="Enter City"
                                                        />
                                                    </div>
                                                </div> */}
                                                {/* <div className="col-lg-4 col-md-4">
                                                    <div className="input-space">
                                                        <label className="form-label">
                                                            Country
                                                        </label>

                                                        <Dropdown
                                                            value={selectedCountry}
                                                            onChange={(e) =>
                                                                setSelectedCountry(e.value)
                                                            }
                                                            options={countryList}
                                                            optionLabel="name"
                                                            placeholder="Select"
                                                            className="select-bg w-100"
                                                        />
                                                    </div>
                                                </div> */}
                                                {/* <div className="col-lg-4 col-md-6">
                                                    <div className="input-space mb-0">
                                                        <label className="form-label">
                                                            Zipcode
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="zipcode"
                                                            placeholder="Enter Zipcode"
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="save-changes text-end">
                                        <Link
                                            to="#"
                                            className="btn btn-primary reset-profile"
                                            onClick={resetUser}
                                        >
                                            Annuler
                                        </Link>
                                        <Link
                                            to="#"
                                            className="btn btn-secondary save-profile"
                                            onClick={handleUpdateUser}
                                        >
                                            {loading
                                                ? "Chargement..."
                                                : "Valider les modifications"}{" "}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
            </>
        </div>
    );
};

export default UserProfile;
