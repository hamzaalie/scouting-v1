import React from "react";
import {all_routes} from "../router/all_routes";
import {Link} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

const ChangePassword = () => {
    const routes = all_routes;
    return (
        <div className="main-wrapper authendication-pages">
            {/* Page Content */}
            <div className="content blur-ellipses login-password">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-7 mx-auto vph-100 d-flex align-items-center">
                            <div className="change-password w-100">
                                <header className="text-center">
                                    <Link to={routes.home}>
                                        <ImageWithBasePath
                                            src="assets/img/logos/blue-logo.png"
                                            className="img-fluid"
                                            alt="Logo"
                                            height={"auto"}
                                            width={225}
                                        />
                                    </Link>
                                </header>
                                <div className="shadow-card">
                                    <h3>Modifier votre mot de passe</h3>
                                    <p>Créez votrer nouveau mot de passe</p>
                                    {/* Login Form */}
                                    <form>
                                        <div className="form-group">
                                            <div className="pass-group group-img">
                                                <i className="toggle-password feather-eye" />
                                                <input
                                                    type="password"
                                                    className="form-control pass-input"
                                                    placeholder="Nouveau mot de passe"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="pass-group group-img">
                                                <i className="toggle-password-confirm feather-eye" />
                                                <input
                                                    type="password"
                                                    className="form-control pass-confirm"
                                                    placeholder="Confirmez le mot de passe"
                                                />
                                            </div>
                                        </div>
                                        <Link
                                            to={routes.login}
                                            className="btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center"
                                        >
                                            Modifier
                                            <i className="feather-arrow-right-circle ms-2" />
                                        </Link>
                                    </form>
                                    {/* /Login Form */}
                                </div>
                                <div className="bottom-text text-center">
                                    <p>
                                        Vous avez un compte ?{" "}
                                        <Link to={routes.login}>Connectez-vous !</Link>
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

export default ChangePassword;
