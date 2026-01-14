import React from "react";
import {publicRoutes, withoutHeaderRoutes} from "./router.link";
import {Outlet, Route, Routes, Navigate} from "react-router-dom";
import Header from "../common/header";
import Footer from "../common/footer";
import Loader from "../loader/loader";
import ScrollToTop from "../../components/SrollToTop";
import ResetScroll from "../../components/ResetScroll";

const AllRoutes = () => {
    const HeaderLayout = () => (
        <>
            <Header />
            <Outlet />
            <Footer />

            {/* <Loader/> */}
        </>
    );

    return (
        <>
            <ResetScroll />
            <Routes>
                {/* Redirect root to home */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                <Route path={"/"} element={<HeaderLayout />}>
                    {publicRoutes.map((route, idx) => (
                        <Route path={route.path} element={route.element} key={idx} />
                    ))}
                </Route>
                <Route path={"/"}>
                    {withoutHeaderRoutes.map((route, idx) => (
                        <Route path={route.path} element={route.element} key={idx} />
                    ))}
                </Route>
            </Routes>
            <ScrollToTop />
        </>
    );
};
export default AllRoutes;
