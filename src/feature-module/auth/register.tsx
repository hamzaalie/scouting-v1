import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {CreateClientInitialValues} from "../../core/data/json/create_client_init";
import {cleanData, EMAIL_REGEX} from "../../helpers/input.helper";
import {backendFunctions} from "../../helpers/backend.helper";
import {toast} from "react-toastify";
import {handleExternalAuthLogin} from "./login";
import {paymentService} from "../../helpers/payment.service";
import {useTranslation} from "react-i18next";

const Signin = () => {
    const route = all_routes;
    const navigate = useNavigate();
    const { t } = useTranslation();

    //Toggle Password
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");

    // State
    const [state, setState] = useState(CreateClientInitialValues);

    useEffect(() => {
        cleanData(state);
    }, [state]);

    // Terms conditions check state
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    //ToggleConfirmPassword
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const resetState = () => {
        setState(CreateClientInitialValues);
        setPassword("");
        setConfirmPassword("");
    };

    const handleChange = ({target: {name, value}}: any) =>
        setState((previousState: any) => ({
            ...previousState,
            [name]: name === "email" ? value?.trim?.() : value,
        }));

    const handleRegister = (e: any) => {
        //console.log("🚀 ~ handleRegister ~ state:", state);
        e?.preventDefault?.();

        if (state.email.trim().length === 0 && state.pwd.trim().length === 0) {
            toast.warn(t('auth.allFieldsRequired'), {
                toastId: "defaultToast",
                theme: "colored",
            });
            return;
        }
        if (!EMAIL_REGEX.test(state.email)) {
            toast.warn(t('auth.invalidEmail'), {
                toastId: "defaultToast",
                theme: "colored",
            });
            return;
        }
        if (password !== confirmPassword) {
            toast.warn(t('auth.passwordMismatch'), {
                toastId: "defaultToast",
                theme: "colored",
            });
            return;
        }
        state.email = state.email.trim();
        state.externalAuthProvider = null;

        console.log("=== REGISTRATION DEBUG ===");
        console.log("Full state object:", state);
        console.log("Email:", state.email);
        console.log("Password field (pwd):", state.pwd);
        console.log("Password variable:", password);
        console.log("Confirm password:", confirmPassword);
        console.log("=========================");

        setLoading(true);
        backendFunctions.auth
            .register(state)
            .then((response: any) => {
                setLoading(false);

                // Check if we need to redirect to payment after registration
                if (paymentService.shouldRedirectAfterAuth()) {
                    toast.success(
                        t('auth.registerSuccessPayment'),
                        {
                            toastId: "defaultToast",
                            theme: "colored",
                        }
                    );
                    resetState();
                    setTimeout(() => {
                        navigate(route.checkEmail, { state: { email: state.email } });
                    }, 1500);
                } else {
                    toast.success(
                        t('auth.registerSuccess'),
                        {
                            toastId: "defaultToast",
                            theme: "colored",
                        }
                    );
                    resetState();
                    setTimeout(() => {
                        navigate(route.checkEmail, { state: { email: state.email } });
                    }, 1500);
                }
            })
            .catch((error) => {
                console.log("=== REGISTRATION ERROR DEBUG ===");
                console.log("Error object:", error);
                console.log("Error response:", error?.response);
                console.log("Error data:", error?.response?.data);
                console.log("Error message:", error?.response?.data?.message);
                console.log("===================================");
                
                // Show specific error messages if available
                const errorMessage = error?.response?.data?.message;
                if (Array.isArray(errorMessage)) {
                    toast.error(errorMessage.join(", "), {
                        toastId: "defaultToast",
                        theme: "colored",
                    });
                } else if (typeof errorMessage === 'string') {
                    toast.error(errorMessage, {
                        toastId: "defaultToast",
                        theme: "colored",
                    });
                } else {
                    toast.error("Une erreur est survenue", {
                        toastId: "defaultToast",
                        theme: "colored",
                    });
                }
                resetState();
                setLoading(false);
            });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        //console.log("🚀 ~ handleKeyPress ~ event:", event);
        if (event.key === "Enter") {
            // Soumettre le formulaire lors de l'appui sur la touche Entrée
            handleRegister(event);
        }
    };

    return (
        <div>
            <>
                {/* Main Wrapper */}
                <div className="main-wrapper authendication-pages">
                    {/* Page Content */}
                    <div className="content">
                        <div className="container wrapper no-padding">
                            <div className="row no-margin vph-100">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
                                    <div className="banner-bg register">
                                        <div className="row no-margin h-100">
                                            <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                                                <div className="h-100 d-flex justify-content-center align-items-center">
                                                    <div className="text-bg register text-center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-limegreen text-capitalize"
                                                        >
                                                            <i className="fa-solid fa-thumbs-up me-3" />
                                                            {t('auth.signUp')}
                                                        </button>
                                                        <p>
                                                            {t('auth.registerSubtitle')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-6 no-padding">
                                    <div className="dull-pg">
                                        <div className="row no-margin vph-100 d-flex align-items-center justify-content-center">
                                            <div className="col-sm-10 col-md-10 col-lg-10 mx-auto">
                                                <header className="text-center">
                                                    <Link to={route.home}>
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
                                                    <h2>{t('auth.createAccount')}</h2>
                                                    <p>
                                                        {t('auth.fillAllFields')}
                                                    </p>

                                                    <div className="tab-content" id="myTabContent">
                                                        <div
                                                            className="tab-pane fade show active"
                                                            id="user"
                                                            role="tabpanel"
                                                            aria-labelledby="user-tab"
                                                        >
                                                            {/* Register Form */}
                                                            <form>
                                                                <div className="form-group">
                                                                    <div className="group-img">
                                                                        <i className="feather-user" />
                                                                        <input
                                                                            name="firstName"
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder={t('auth.enterFirstName')}
                                                                            onChange={handleChange}
                                                                            value={state.firstName}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="group-img">
                                                                        <i className="feather-user" />
                                                                        <input
                                                                            name="lastName"
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder={t('auth.enterLastName')}
                                                                            onChange={handleChange}
                                                                            value={state.lastName}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="group-img">
                                                                        <i className="feather-mail" />
                                                                        <input
                                                                            name="email"
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder={t('auth.enterEmail')}
                                                                            onChange={handleChange}
                                                                            value={state.email}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="pass-group group-img">
                                                                        <i
                                                                            className={`toggle-password ${passwordVisible ? "feather-eye" : "feather-eye-off"}`}
                                                                            onClick={
                                                                                togglePasswordVisibility
                                                                            }
                                                                        />
                                                                        <input
                                                                            name="pwd"
                                                                            type={
                                                                                passwordVisible
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            className="form-control pass-input"
                                                                            placeholder={t('auth.enterPassword')}
                                                                            value={password}
                                                                            onChange={(e) => {
                                                                                setPassword(
                                                                                    e.target.value
                                                                                );
                                                                                handleChange(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="pass-group group-img">
                                                                        <i
                                                                            className={`toggle-password ${confirmPasswordVisible ? "feather-eye" : "feather-eye-off"}`}
                                                                            onClick={
                                                                                toggleConfirmPasswordVisibility
                                                                            }
                                                                        />
                                                                        <input
                                                                            type={
                                                                                confirmPasswordVisible
                                                                                    ? "text"
                                                                                    : "password"
                                                                            }
                                                                            className="form-control pass-input"
                                                                            placeholder={t('auth.confirmPassword')}
                                                                            value={confirmPassword}
                                                                            onChange={(e) =>
                                                                                setConfirmPassword(
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-check d-flex justify-content-start align-items-center policy">
                                                                    <div className="d-inline-block">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            defaultValue={
                                                                                checked
                                                                                    ? "true"
                                                                                    : "false"
                                                                            }
                                                                            id="policy"
                                                                            onClick={() =>
                                                                                setChecked(
                                                                                    (prevState) =>
                                                                                        !prevState
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="policy"
                                                                    >
                                                                        En cochant cette case, je
                                                                        reconnais avoir pris
                                                                        connaissance des{" "}
                                                                        <Link
                                                                            to={
                                                                                route.termsCondition
                                                                            }
                                                                        >
                                                                            Conditions Générales
                                                                            d&apos;Utilisation
                                                                        </Link>{" "}
                                                                        du site ainsi que de la{" "}
                                                                        <Link
                                                                            to={route.privacyPolicy}
                                                                        >
                                                                            Politique de
                                                                            Confidentialité
                                                                        </Link>{" "}
                                                                        et je les accepte.
                                                                    </label>
                                                                </div>
                                                                <Link
                                                                    to={"#"}
                                                                    className={
                                                                        checked &&
                                                                        Object.keys(state)
                                                                            .length === 4 &&
                                                                        password === confirmPassword
                                                                            ? "btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                                                            : "disabled btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                                                    }
                                                                    type="submit"
                                                                    onClick={handleRegister}
                                                                    onKeyDown={(event) =>
                                                                        handleKeyPress(event)
                                                                    }
                                                                >
                                                                    {loading
                                                                        ? t('common.loading')
                                                                        : t('auth.signUp')}
                                                                    <i className="feather-arrow-right-circle ms-2" />
                                                                </Link>
                                                                <div className="form-group">
                                                                    <div className="login-options text-center">
                                                                        <span className="text">
                                                                            {t('auth.orSignUpWith')}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group mb-0">
                                                                    <ul className="social-login d-flex justify-content-center align-items-center">
                                                                        <li className="text-center">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-social d-flex align-items-center justify-content-center"
                                                                                onClick={() =>
                                                                                    handleExternalAuthLogin(
                                                                                        "GOOGLE"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <ImageWithBasePath
                                                                                    src="assets/img/icons/google.svg"
                                                                                    className="img-fluid"
                                                                                    alt="Google"
                                                                                />
                                                                                <span>Google</span>
                                                                            </button>
                                                                        </li>
                                                                        <li className="text-center">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-social d-flex align-items-center justify-content-center"
                                                                                onClick={() =>
                                                                                    handleExternalAuthLogin(
                                                                                        "FACEBOOK"
                                                                                    )
                                                                                }
                                                                            >
                                                                                <ImageWithBasePath
                                                                                    src="assets/img/icons/facebook.svg"
                                                                                    className="img-fluid"
                                                                                    alt="Facebook"
                                                                                />
                                                                                <span>
                                                                                    Facebook
                                                                                </span>
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </form>
                                                            {/* /Register Form */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bottom-text text-center">
                                                    <p>
                                                        {t('auth.hasAccount')}{" "}
                                                        <Link to={route.login}>
                                                            {t('auth.signIn')}
                                                        </Link>
                                                    </p>
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
        </div>
    );
};

export default Signin;
