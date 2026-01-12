import React, {useState} from "react";
import {all_routes} from "../router/all_routes";
import {Link} from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {backendFunctions} from "../../helpers/backend.helper";
import {EMAIL_REGEX} from "../../helpers/input.helper";

const ForgotPassword = () => {
    const routes = all_routes;
    const initialValues: any = {
        email: "",
        code: "",
    };
    const [state, setState] = useState(initialValues);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState({
        new: false,
        confirm: false,
    });
    const togglePasswordVisibility = (passwordType: "new" | "confirm") => {
        setPasswordVisible((prev) => ({
            ...prev,
            [passwordType]: !prev[passwordType],
        }));
    };

    const handleChange = ({target: {name, value}}: any) =>
        setState((previousState: any) => ({
            ...previousState,
            [name]: name === "email" || name === "code" ? value?.trim?.() : value,
        }));

    const sendResetCode = (e: any = undefined) => {
        e?.preventDefault?.();
        backendFunctions.auth.forgotPassword
            .sendResetCode({
                email: state.email,
            })
            .then((resp: any) => {
                setTimeout(() => {
                    setLoading(false);
                    setIsCodeSent(true);
                }, 2000);

                //console.log("🚀 ~ handleForgotPassword ~ resp:", resp);
            })
            .catch((err: any) => {
                setLoading(false);
                err.includes("inex")
                    ? alert("Impossible de continuer avec cette adresse email.")
                    : "";
                //console.log("🚀 ~ handleForgotPassword ~ err:", err);
            });
    };

    const handleForgotPassword = (e: any) => {
        e?.preventDefault?.();

        if (!isCodeSent) {
            if (state.email?.trim?.()?.length === 0 || !EMAIL_REGEX.test(state?.email)) {
                alert("Renseignez l'adresse mail s'il vous plaît.");
                return;
            }
            setLoading(true);
            sendResetCode();
        } else {
            //console.log("🚀 ~ handleForgotPassword ~ state:", state);
            if (state?.newPassword !== state?.confirmPassword) {
                alert("Veuillez faire correspondre les mots de passe s'il vous plaît.");
                return;
            }
            delete state?.confirmPassword;
            backendFunctions.auth
                .resetPassword(state)
                .then((resp: any) => {
                    //console.log("🚀 ~ .then ~ resp:", resp);
                    alert(resp?.message);
                    setTimeout(() => {
                        document.getElementById("returnLoginLink")?.click();
                    }, 5000);
                })
                .catch((error: any) => {
                    //console.log("🚀 ~ .then ~ error:", error);
                    alert(error);
                });
        }
    };

    return (
        <div className="main-wrapper authendication-pages">
            <div className="content blur-ellipses">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 mx-auto vph-100 d-flex align-items-center">
                            <div className="forgot-password w-100">
                                <header className="text-center forgot-head-title">
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
                                    <h2>Mot de passe oublié ?</h2>
                                    <p>
                                        {isCodeSent
                                            ? "Renseignez le code reçu par mail"
                                            : "Renseignez votre adresse e-mail"}
                                    </p>
                                    {/* Login Form */}
                                    <form action="login">
                                        <div className="form-group">
                                            <div className="group-img">
                                                <i className="feather-mail" />
                                                <input
                                                    type="text"
                                                    name="email"
                                                    disabled={isCodeSent}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Adresse e-mail"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="group-img" hidden={!isCodeSent}>
                                                <i className="feather-mail" />
                                                <input
                                                    type="text"
                                                    name="code"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Entrez le code"
                                                    value={state?.code}
                                                />
                                            </div>

                                            <div
                                                className="pass-group group-img"
                                                hidden={!isCodeSent}
                                            >
                                                <i
                                                    className={`toggle-password ${passwordVisible["new"] ? "feather-eye" : "feather-eye-off"}`}
                                                    onClick={() => togglePasswordVisibility("new")}
                                                />
                                                <input
                                                    type={
                                                        passwordVisible["new"] ? "text" : "password"
                                                    }
                                                    className="mt-5 form-control pass-input"
                                                    placeholder="Entrez le nouveau mot de passe"
                                                    value={state?.newPassword}
                                                    name="newPassword"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div
                                                className="mt-5 pass-group group-img"
                                                hidden={!isCodeSent}
                                            >
                                                <i
                                                    className={`toggle-password ${passwordVisible["confirm"] ? "feather-eye" : "feather-eye-off"}`}
                                                    onClick={() =>
                                                        togglePasswordVisibility("confirm")
                                                    }
                                                />
                                                <input
                                                    type={
                                                        passwordVisible["confirm"]
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    className="form-control pass-input"
                                                    placeholder="Confirmez votre mot de passe"
                                                    value={state?.confirmPassword}
                                                    name="confirmPassword"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <Link
                                            to={"#"}
                                            onClick={handleForgotPassword}
                                            className="btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center"
                                        >
                                            {loading
                                                ? "Envoi en cours..."
                                                : isCodeSent
                                                  ? "Réinitialiser mon mot de passe"
                                                  : "Recevoir le code "}
                                            <i className="feather-arrow-right-circle ms-2" />
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            to={"#"}
                                            onClick={sendResetCode}
                                            className={
                                                !isCodeSent
                                                    ? "d-none btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center"
                                                    : " btn btn-secondary w-100 d-inline-flex justify-content-center align-items-center"
                                            }
                                        >
                                            Renvoyer le code
                                            <i className="feather-arrow-right-circle ms-2" />
                                        </Link>
                                    </form>
                                    {/* /Login Form */}
                                </div>
                                <div className="bottom-text text-center">
                                    <p>
                                        Vous n&apos;avez pas oublié votre mot de passe ?{" "}
                                        <Link id="returnLoginLink" to={routes.login}>
                                            Connectez-vous !
                                        </Link>
                                    </p>
                                </div>
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
