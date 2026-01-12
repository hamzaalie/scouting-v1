import React from "react";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";

const Faq = () => {
    const routes = all_routes;
    return (
        <div>
            {/* Breadcrumb */}
            <div className="breadcrumb breadcrumb-list mb-0">
                {/* <span className="primary-right-round" /> */}
                <div className="container">
                    <h1 className="text-white">FAQ</h1>
                    <ul>
                        <li>
                            <Link to={routes.home}>Accueil</Link>
                        </li>
                        <li>Foire Aux Questions</li>
                    </ul>
                </div>
            </div>
            {/* /Breadcrumb */}
            {/* Page Content */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 offset-sm-12 offset-md-1 col-md-10 col-lg-10">
                            <div className="ask-questions">
                                <div className="faq-info">
                                    <div className="accordion" id="accordionExample">
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <Link
                                                    to="#"
                                                    className="accordion-button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Qu&apos;est-ce qu&apos;IDA ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseOne"
                                                className="accordion-collapse collapse show"
                                                aria-labelledby="headingOne"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            IDA (Intelligence Data Analytics) est un
                                                            projet innovant dédié à la collecte,
                                                            l&apos;analyse, et l&apos;exploitation
                                                            des données sportives en Côte
                                                            d&apos;Ivoire, en particulier dans le
                                                            domaine du football. Nous utilisons des
                                                            caméras intelligentes dotées d&apos;IA
                                                            pour capturer des données précises à
                                                            partir des matchs, offrant des analyses
                                                            approfondies pour les clubs, les
                                                            entraîneurs, et les agents.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTwo"
                                                >
                                                    Comment fonctionnent les caméras IA de
                                                    l&apos;IDA ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseTwo"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingTwo"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Les caméras sont des dispositifs
                                                            d&apos;enregistrement vidéo avancés,
                                                            équipés d&apos;intelligence
                                                            artificielle, capables de capturer
                                                            l&apos;intégralité du terrain sans
                                                            nécessiter d&apos;opérateur. <br />
                                                            Elles analysent les mouvements des
                                                            joueurs en temps réel, identifiant
                                                            automatiquement les moments clés du jeu,
                                                            ce qui permet une analyse détaillée par
                                                            la suite.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseThree"
                                                    aria-expanded="false"
                                                    aria-controls="collapseThree"
                                                >
                                                    Quels types de données pouvez-vous collecter ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseThree"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingThree"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Nous collectons une variété de données,
                                                            y compris les statistiques individuelles
                                                            des joueurs, les positions sur le
                                                            terrain, les passes, les tirs, les
                                                            performances ainsi que les données
                                                            stratégiques des équipes. <br />
                                                            Ces informations sont ensuite analysées
                                                            pour fournir des rapports détaillés.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFour">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseFour"
                                                    aria-expanded="false"
                                                    aria-controls="collapseFour"
                                                >
                                                    À qui s&apos;adressent vos services ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseFour"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingFour"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Nos services s&apos;adressent aux clubs
                                                            de football, aux entraîneurs, aux
                                                            agents, aux recruteurs, ainsi qu&apos;à
                                                            tout professionnel du football cherchant
                                                            à exploiter les données pour améliorer
                                                            les performances, identifier les talents
                                                            ou affiner les stratégies de jeu.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingFive">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseFive"
                                                    aria-expanded="false"
                                                    aria-controls="collapseFive"
                                                >
                                                    Comment puis-je accéder aux analyses de match ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseFive"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingFive"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Les analyses de match sont accessibles
                                                            via notre plateforme en ligne. Les clubs
                                                            et autres partenaires peuvent se
                                                            connecter pour visualiser les rapports,
                                                            télécharger les données, et obtenir des
                                                            insights personnalisés en fonction de
                                                            leurs besoins.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}

                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingSix">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseSix"
                                                    aria-expanded="false"
                                                    aria-controls="collapseSix"
                                                >
                                                    Quels sont les avantages d&apos;utiliser IDA
                                                    pour mon club ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseSix"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingSix"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            L&apos;utilisation des services IDA
                                                            permet d&apos;obtenir une vue détaillée
                                                            et objective des performances de votre
                                                            équipe. Vous pouvez identifier les
                                                            forces et faiblesses de vos joueurs,
                                                            ajuster vos stratégies en conséquence,
                                                            et améliorer vos chances de succès sur
                                                            le terrain.
                                                            <br /> De plus, les données collectées
                                                            peuvent également être utilisées pour
                                                            valoriser vos joueurs auprès des
                                                            recruteurs et agents internationaux.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingSeven">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseSeven"
                                                    aria-expanded="false"
                                                    aria-controls="collapseSeven"
                                                >
                                                    Offrez-vous des services personnalisés ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseSeven"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingSeven"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Oui, nous proposons des services sur
                                                            mesure en fonction des besoins
                                                            spécifiques de chaque client. Que vous
                                                            ayez besoin d&apos;une analyse
                                                            spécifique pour un match ou d&apos;un
                                                            suivi continu sur toute la saison, nous
                                                            pouvons adapter nos services à vos
                                                            exigences.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingEight">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseEight"
                                                    aria-expanded="false"
                                                    aria-controls="collapseEight"
                                                >
                                                    Comment puis-je m&apos;inscrire pour utiliser
                                                    vos services ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseEight"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingEight"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Pour vous inscrire à nos services, vous
                                                            pouvez visiter la page
                                                            <Link to={routes.register}>
                                                                Inscription
                                                            </Link>{" "}
                                                            sur notre site web ou nous contacter
                                                            directement via notre page{" "}
                                                            <Link to={routes.contactUs}>
                                                                Contact
                                                            </Link>{" "}
                                                            <br /> Notre équipe vous guidera à
                                                            travers le processus et vous fournira
                                                            toutes les informations nécessaires.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingNine">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseNine"
                                                    aria-expanded="false"
                                                    aria-controls="collapseNine"
                                                >
                                                    Est-ce que vos services couvrent uniquement les
                                                    équipes ivoiriennes ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseNine"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingNine"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Non, bien que notre projet soit centré
                                                            sur le développement du football en Côte
                                                            d&apos;Ivoire, nous sommes ouverts à
                                                            collaborer avec des clubs et
                                                            organisations de football dans
                                                            d&apos;autres pays.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                        {/* FAQ Item */}
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTen">
                                                <Link
                                                    to="#"
                                                    className="accordion-button collapsed"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseTen"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTen"
                                                >
                                                    Comment puis-je vous contacter pour plus
                                                    d&apos;informations ?
                                                </Link>
                                            </h2>
                                            <div
                                                id="collapseTen"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingTen"
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <div className="accordion-content">
                                                        <p>
                                                            Vous pouvez nous contacter via notre
                                                            page{" "}
                                                            <Link to={routes.contactUs}>
                                                                Contact
                                                            </Link>{" "}
                                                            sur le site, ou par email à
                                                            <Link to="mailto:email@example.com">
                                                                email@example.com
                                                            </Link>
                                                            . <br />
                                                            Nous serons ravis de répondre à toutes
                                                            vos questions
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /FAQ Item */}
                                    </div>
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

export default Faq;
