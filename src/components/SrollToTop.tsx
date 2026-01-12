import React, {useEffect, useState} from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    // Détecter le défilement pour afficher/masquer le bouton
    useEffect(() => {
        let scrollTimer: any;

        const toggleVisibility = () => {
            // Afficher le bouton quand l'utilisateur a défilé de 300px
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // Indiquer que le défilement est en cours
            setIsScrolling(true);

            // Réinitialiser le timer et définir un nouveau
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                setIsScrolling(false);
            }, 150); // Attendre 150ms après la fin du défilement
        };

        // Ajouter l'événement d'écoute du défilement
        window.addEventListener("scroll", toggleVisibility);

        // Nettoyer l'événement et le timer lors du démontage du composant
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            clearTimeout(scrollTimer);
        };
    }, []);

    // Fonction pour remonter en haut de la page
    const scrollToTop = () => {
        // Désactiver temporairement le bouton pendant le défilement
        setIsScrolling(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        // Le bouton sera réactivé automatiquement par l'événement de défilement
    };

    return (
        <>
            {isVisible && (
                <div
                    className={`scrolltop ${isVisible ? "active" : ""}`}
                    onClick={scrollToTop}
                    style={{
                        pointerEvents: isScrolling ? "none" : "auto",
                        opacity: isScrolling ? 0.5 : 1,
                    }}
                >
                    <i className="fas fa-arrow-up"></i>
                </div>
            )}
        </>
    );
};

export default ScrollToTop;
