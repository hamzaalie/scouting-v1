import React, {KeyboardEventHandler, useEffect, useState} from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import {backendFunctions} from "../../helpers/backend.helper";
import {EMAIL_REGEX} from "../../helpers/input.helper";
import {LoginResponseInterface} from "../../core/data/interface/auth/login.response";
import {localStorageFunctions} from "../../helpers/localStorage.helper";
import {urlEndpoint} from "../../helpers/url.helper";
import {LoginDto} from "../../core/data/interface/auth/login";
import {toast} from "react-toastify";
import {paymentService} from "../../helpers/payment.service";
import {useTranslation} from "react-i18next";

export const handleExternalAuthLogin = (extAuthProvider: "GOOGLE" | "FACEBOOK") => {
    const windowFeatures = "left=100,top=100,width=780,height=320";
    let handle = null;

    handle = window.open(urlEndpoint.auth[extAuthProvider], "_self", windowFeatures);
    if (!handle) {
        alert("Please allow popup to be displayed.");
    } else {
        handle.focus();
        return;
    }
};
const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const route = all_routes;
    const { t } = useTranslation();

    useEffect(() => {
        //console.log("🚀 ~ Login ~ location:", location);
        if (location.search) {
            const search: any = location.search;
            const stringifiedUser = search?.split("?").join("").split("&");
            let userDetails: any = {};
            stringifiedUser.map((key: string) => {
                const keyEqValue = key.split("=");
                userDetails = {
                    ...userDetails,
                    [keyEqValue[0]]: keyEqValue[1],
                };
            });
            //console.log("🚀 ~ useEffect ~ userDetails:", userDetails);

            localStorageFunctions.setToken(userDetails?.access_token);
            delete userDetails?.access_token;
            localStorageFunctions.setUser(userDetails);

            // Check if we should redirect to payment
            if (paymentService.shouldRedirectAfterAuth()) {
                toast.success(
                    t('auth.loginSuccessPayment'),
                    {
                        toastId: "successToast",
                        theme: "colored",
                    }
                );

                // Clear the redirect flag
                paymentService.clearRedirectFlag();

                resetState();
                location.search = "";

                setTimeout(() => {
                    window.location.href = route.userBookings;
                }, 3000);
            } else {
                toast.success(
                    t('auth.loginSuccess'),
                    {
                        toastId: "successToast",
                        theme: "colored",
                    }
                );

                resetState();
                location.search = "";

                setTimeout(() => {
                    window.location.href = route.userDashboard;
                }, 3000);
            }
        }
    }, []);

    const initialValues: LoginDto = {
        email: "",
        password: "",
    };
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(initialValues);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const resetState = () => setState(initialValues);
    const handleChange = ({target: {name, value}}: any) =>
        setState((previousState) => ({
            ...previousState,
            [name]: name === "email" ? value?.trim?.() : value,
        }));

    const handleLogin = (e: any) => {
        e?.preventDefault?.();
        const windowFeatures = "left=100,top=100,width=780,height=320";
        let handle = null;

        if (e === "Google") {
            handle = window.open(urlEndpoint.auth.GOOGLE, "_self", windowFeatures);
            if (!handle) {
                toast.info(t('auth.allowPopup'), {
                    toastId: "defaultToast",
                    theme: "colored",
                });
            } else {
                handle.focus();
                return;
            }
        }
        if (e === "Facebook") {
            handle = window.open(urlEndpoint.auth.FACEBOOK, "_self", windowFeatures);
            if (!handle) {
                toast.info(t('auth.allowPopup'), {
                    toastId: "defaultToast",
                    theme: "colored",
                });
            } else {
                handle.focus();
                return;
            }
        }

        if (state.email.trim().length === 0 || state.password.trim().length === 0) {
            toast.warn(t('auth.fillAllFields'), {
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
        state.email = state.email.trim();
        //console.log("🚀 ~ handleLogin ~ state.email:", state.email);

        setLoading(true);
        backendFunctions.auth
            .logIn(state, window.navigator.userAgent)
            .then((response: LoginResponseInterface) => {
                setLoading(false);
                localStorageFunctions.setToken(response?.access_token ?? "");
                delete response?.access_token;
                localStorageFunctions.setUser(response);

                // Check if we need to redirect to payment after login
                if (paymentService.shouldRedirectAfterAuth()) {
                    toast.success(
                        t('auth.loginSuccessPayment'),
                        {
                            toastId: "defaultToast",
                            theme: "colored",
                        }
                    );
                    // Clear redirect flag
                    paymentService.clearRedirectFlag();

                    resetState();
                    setTimeout(() => {
                        navigate(route.userBookings);
                    }, 3000);
                } else {
                    toast.success(
                        t('auth.loginSuccess'),
                        {
                            toastId: "defaultToast",
                            theme: "colored",
                        }
                    );
                    resetState();
                    setTimeout(() => {
                        navigate(route.userBookings);
                    }, 3000);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.message || error?.message || String(error);
                
                console.log("🚀 ~ handleLogin ~ error:", error);
                console.log("🚀 ~ handleLogin ~ errorMessage:", errorMessage);
                
                // Show specific error messages based on backend response
                if (errorMessage.toLowerCase().includes('email not found')) {
                    toast.error("Email introuvable. Veuillez vérifier votre email ou créer un nouveau compte.", {
                        toastId: "defaultToast",
                        theme: "colored",
                    });
                } else if (errorMessage.toLowerCase().includes('incorrect password')) {
                    toast.error("Mot de passe incorrect. Veuillez réessayer.", {
                        toastId: "defaultToast",
                        theme: "colored",
                    });
                } else if (errorMessage.toLowerCase().includes('not verified') || errorMessage.toLowerCase().includes('verify your email')) {
                    toast.error("Email non vérifié. Veuillez vérifier votre boîte mail et valider votre compte.", {
                        toastId: "defaultToast",
                        theme: "colored",
                        autoClose: 5000,
                    });
                } else if (errorMessage.toLowerCase().includes('credentials') || errorMessage.toLowerCase().includes('unauthorized')) {
                    toast.error("Email ou mot de passe incorrects.", {
                        toastId: "defaultToast",
                        theme: "colored",
                    });
                } else {
                    toast.error(errorMessage || "Une erreur est survenue", {
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
            handleLogin(event);
        }
    };

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
                                                    <button
                                                        type="button"
                                                        className="btn btn-limegreen text-capitalize"
                                                    >
                                                        <i className="fa-solid fa-thumbs-up me-3" />
                                                        {t('auth.signIn')}
                                                    </button>
                                                    <p>
                                                        {t('auth.loginSubtitle')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12  col-lg-6 no-padding">
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
                                                <h2>{t('auth.welcomeBack')}</h2>
                                                <p>{t('auth.loginSubtitle')}</p>

                                                <div className="tab-content" id="myTabContent">
                                                    <div
                                                        className="tab-pane fade show active"
                                                        id="user"
                                                        role="tabpanel"
                                                        aria-labelledby="user-tab"
                                                    >
                                                        {/* Login Form */}
                                                        {/* TODO Faire l'integration de default-login ✅*/}
                                                        <form>
                                                            <div className="form-group">
                                                                <div className="group-img">
                                                                    <i className="feather-user" />
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder={t('auth.enterEmail')}
                                                                        name="email"
                                                                        value={state.email}
                                                                        onChange={handleChange}
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
                                                                        type={
                                                                            passwordVisible
                                                                                ? "text"
                                                                                : "password"
                                                                        }
                                                                        className="form-control pass-input"
                                                                        placeholder={t('auth.enterPassword')}
                                                                        value={state.password}
                                                                        name="password"
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group d-sm-flex align-items-center justify-content-between">
                                                                <span>
                                                                    <Link
                                                                        to={route.forgotPasssword}
                                                                        className="forgot-pass"
                                                                    >
                                                                        {t('auth.forgotPassword')}
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                            <Link
                                                                to={"#"}
                                                                onClick={handleLogin}
                                                                className="btn btn-secondary register-btn d-inline-flex justify-content-center align-items-center w-100 btn-block"
                                                                onKeyDown={(event) =>
                                                                    handleKeyPress(event)
                                                                }
                                                            >
                                                                {loading
                                                                    ? t('common.loading')
                                                                    : t('auth.signIn')}
                                                                <i
                                                                    className={
                                                                        loading
                                                                            ? "feather-loader"
                                                                            : "feather-arrow-right-circle ms-2"
                                                                    }
                                                                />
                                                            </Link>
                                                            <div className="form-group">
                                                                <div className="login-options text-center">
                                                                    <span className="text">
                                                                        {t('auth.orLoginWith')}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="form-group mb-0">
                                                                <ul className="social-login d-flex justify-content-center align-items-center">
                                                                    <li className="text-center">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleLogin(
                                                                                    "Google"
                                                                                )
                                                                            }
                                                                            className="btn btn-social d-flex align-items-center justify-content-center"
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
                                                                            onClick={() =>
                                                                                handleLogin(
                                                                                    "Facebook"
                                                                                )
                                                                            }
                                                                            className="btn btn-social d-flex align-items-center justify-content-center"
                                                                        >
                                                                            <ImageWithBasePath
                                                                                src="assets/img/icons/facebook.svg"
                                                                                className="img-fluid"
                                                                                alt="Facebook"
                                                                            />
                                                                            <span>Facebook</span>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </form>
                                                        {/* /Login Form */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bottom-text text-center">
                                                <p>
                                                    {t('auth.noAccount')}{" "}
                                                    <Link to={route.register}>
                                                        {t('auth.signUp')}
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
    );
};

export default Login;
