import React from "react";
import {Link} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {all_routes} from "../router/all_routes";

const UserDashboardProfiles = () => {
    const routes = all_routes;
    return (
        <div>
            {/* Breadcrumb */}
            <section className="breadcrumb breadcrumb-list mb-0">
                <span className="primary-right-round" />
                <div className="container">
                    <h1 className="text-white">Profile</h1>
                    <ul>
                        <li>
                            <Link to={routes.home}>Home</Link>
                        </li>
                        <li>Profile</li>
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
                                        <Link to={routes.userWallet}>
                                            <ImageWithBasePath
                                                src="assets/img/icons/wallet-icon.svg"
                                                alt="Icon"
                                            />
                                            <span>Finance</span>
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="my-profile-box">
                                <h3>My Profile</h3>
                                <div className="card profile-user-view">
                                    <div className="profile-groups">
                                        <div className="profile-detail-box">
                                            <div className="profile-img">
                                                <ImageWithBasePath
                                                    className="rounded-circle"
                                                    src="assets/img/profiles/avatar-03.jpg"
                                                    alt="User"
                                                />
                                            </div>
                                            <div className="user-profile-detail">
                                                <h4>Henriques</h4>
                                                <p>Dreamsports Badminton Since 05/05/2023</p>
                                                <ul>
                                                    <li>
                                                        <ImageWithBasePath
                                                            src="assets/img/icons/profile-icon-01.svg"
                                                            alt="Icon"
                                                        />
                                                        Rank : Expert
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="convenient-btns">
                                            <Link
                                                to="#"
                                                className="btn btn-secondary d-inline-flex align-items-center"
                                            >
                                                <span>
                                                    <i className="feather-edit" />
                                                </span>
                                                Edit Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card profile-user-view mb-0">
                                <div className="profile-info-box">
                                    <h4>Contact Information</h4>
                                    <div className="profile-contact-info">
                                        <div className="contact-information">
                                            <h6>Email Address</h6>
                                            <span>contact@example.com</span>
                                        </div>
                                        <div className="contact-information">
                                            <h6>Phone Number</h6>
                                            <span>+1 56565 556558</span>
                                        </div>
                                        <div className="contact-information">
                                            <h6>Address</h6>
                                            <span>1653 Davisson Street,Indianapolis, IN 46225</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-info-box">
                                    <h4>Short Bio</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Varius consectetur a at est diam ultricies. Egestas eros leo
                                        dapibus tellus neque turpis. Nec in morbi adipiscing pretium
                                        accumsan urna ac,Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Varius consectetur a at est diam ultricies.
                                        Egestas eros leo dapibus tellus neque turpis. Nec in morbi
                                        adipiscing pretium accumsan urna ac,Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Varius consectetur a at
                                        est diam ultricies. Egestas eros leo dapibus tellus neque
                                        turpis. Nec in morbi adipiscing pretium accumsan urna ac,
                                    </p>
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

export default UserDashboardProfiles;
