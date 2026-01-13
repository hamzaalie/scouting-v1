import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import {BrowserRouter} from "react-router-dom";
import Feature from "./feature-module/feature";
import "aos/dist/aos.css";
import {Provider} from "react-redux";
import store from "./core/data/redux/store";
import "../src/style/scss/main.scss";
import "../src/style/css/feather.css";
import "../src/style/css/scrolltop.css";
import "../src/style/css/custom-badge.css";
// import "../src/style/css/style.css";
import "./index.scss";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {base_path} from "./environment";
import {AuthProvider} from "./context/AuthContext";

import {Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import i18n configuration
import "./i18n/config";

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <>
            <React.StrictMode>
                <Provider store={store}>
                    <AuthProvider>
                        <BrowserRouter basename={base_path}>
                            <Feature />
                        </BrowserRouter>
                    </AuthProvider>
                </Provider>
            </React.StrictMode>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                limit={1}
            />
        </>
    );
} else {
    console.error("Element with id 'root' not found.");
}
