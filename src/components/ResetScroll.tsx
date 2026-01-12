import {useEffect} from "react";
import {useLocation} from "react-router-dom";

// Ce composant réinitialise la position de défilement lors des changements de route
const ResetScroll = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null; // Ce composant ne rend rien
};

export default ResetScroll;
