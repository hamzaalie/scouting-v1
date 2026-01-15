import React from "react";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";

const PrivacyPolicy = () => {
    const routes = all_routes;
    return (
        <div>
            <>
                {/* Breadcrumb */}
                <div className="breadcrumb breadcrumb-list mb-0">
                    <span className="primary-right-round" />
                    <div className="container">
                        <h1 className="text-white">Politique de Confidentialité</h1>
                        <ul>
                            <li>
                                <Link to={routes.home}>Accueil</Link>
                            </li>
                            <li>Politique de Confidentialité</li>
                            <li>Politique de protection des données personnelles</li>
                        </ul>
                    </div>
                </div>
                {/* /Breadcrumb */}
                {/* Page Content */}
                <div className="content">
                    <div className="container">
                        <h2>Protection des données personnelles</h2>
                        <div className="condition-details">
                            <br />
                            <p>
                                LES ÉLÉMENTS ESSENTIELS ET NÉCESSAIRES D&apos;UNE DEMANDE
                                D&apos;EXERCICE DES DROITS DE LA PERSONNE CONCERNÉE DANS LE DOMAINE
                                DU TRAITEMENT ET DE LA PROTECTION DES DONNÉES PERSONNELLES
                            </p>
                            <p>
                                Conformément au règlement (UE) 2016/679 du Parlement européen et du
                                Conseil du 27 avril 2016 Données générales Règlement de protection
                                (ci-après dénommé le « Règlement » ou « RGPD »), loi n° 110/2019
                                Coll., sur le traitement des données personnelles (ci-après dénommée
                                « Loi »), et l&apos;article 35 de la loi n° 2013-450 du 19 juin 2013
                                relative à la protection des données à caractère personnel de
                                l&apos;Autorité de Régulation des Télécommunications/TIC de Côte
                                d&apos;Ivoire (ci-après dénommé « ARTCI »)
                            </p>
                            <br />
                            <span className="fs-4 text-primary fw-bold">
                                I. Responsable du traitement des données personnelles
                            </span>
                            <br />
                            <p>
                                Brainci SARL, dont le siège social est situé, , numéro
                                d&apos;identification : , ID de boîte de données : 9y9r5s5, (la «
                                Société » ou le « Contrôleur »).
                            </p>
                            <br />
                            <span className="fs-4 text-primary fw-bold">
                                II. Détails du contact
                            </span>
                            <br />
                            <p>
                                La fonction de délégué à la protection des données du responsable du
                                traitement est exercée par Manuel Ahouzi avec email :
                                <a href="mailto:braincisarl@gmail.com">braincisarl@gmail.com</a>
                            </p>

                            <br />
                            <span className="fs-4 text-primary fw-bold">
                                III. Droits des personnes concernées
                            </span>
                            <br />
                            <p>
                                Conformément à l&apos;article 35 de la loi n° 2013-450 du 19 juin
                                2013 de l&apos;ARTCI, les personnes concernées disposent des droits
                                suivants :
                            </p>
                            <ol style={{listStyleType: "square"}}>
                                <li>Le droit de retirer son consentement </li>
                                <li>Le droit d&apos;accès du sujet aux données </li>
                                <li>Le droit à la rectification </li>
                                <li>Le droit à l&apos;effacement (droit « à l&apos;oubli ») </li>
                                <li>Le droit à la limitation du traitement </li>
                                <li>
                                    Le droit à l&apos;obligation de notification concernant les
                                    modifications des données personnelles ou les restrictions de
                                    traitement{" "}
                                </li>
                                <li>Le droit à la portabilité des données </li>
                                <li>
                                    Le droit de s&apos;opposer, sauf exemption prévue par la loi ou
                                    le RGPD{" "}
                                </li>
                                <li>
                                    Le droit à une prise de décision individuelle automatisée, y
                                    compris le profilage{" "}
                                </li>
                                <li>
                                    Le droit d&apos;être informé de l&apos;origine et de
                                    l&apos;acquisition des données personnelles lorsque les données
                                    personnelles n&apos;ont pas été fournies par la personne
                                    concernée au responsable du traitement.{" "}
                                </li>
                                <li>
                                    Les formulaires d&apos;exercice des droits : opposition au
                                    traitement des données personnelles, exercice du droit à la
                                    portabilité des données, retrait du consentement, rectification,
                                    limitation du traitement, effacement et accès aux données
                                    personnelles sont disponibles auprès de notre responsable du
                                    traitement.
                                </li>
                            </ol>

                            <br />
                            <span className="fs-4 text-primary fw-bold">
                                V. Détails de la demande
                            </span>
                            <br />

                            <ol type="1" style={{paddingTop: "10px"}}>
                                <li>
                                    Une personne qui souhaite exercer ses droits concernant les
                                    données personnelles doit indiquer dans une demande écrite les
                                    motifs pertinents et les faits auxquels elle s&apos;oppose et
                                    souhaite faire valoir.
                                </li>
                                <li>
                                    Chaque candidature doit contenir les exigences légales pour la
                                    soumission de la candidature et le candidat doit prouver son
                                    identité, par exemple par une signature certifiée pour une
                                    candidature papier ou une signature électronique reconnue pour
                                    une candidature électronique, ou par une soumission via une
                                    boîte de données.{" "}
                                </li>
                                <li>
                                    Si la demande ne répond pas aux exigences légales, le demandeur
                                    sera invité par écrit à remédier à la situation ; en cas de
                                    non-respect du délai imparti, la demande sera rejetée.
                                </li>
                            </ol>

                            <br />
                            <span className="fs-4 text-primary fw-bold">VII. Remèdes</span>
                            <br />

                            <ol style={{paddingTop: "10px", listStyleType: "square"}}>
                                <li>
                                    Si la demande de la personne concernée conformément au
                                    paragraphe 1 s&apos;avère justifiée, le responsable du
                                    traitement remédie sans délai à la situation défectueuse,
                                </li>
                                <li>
                                    Si le responsable du traitement ne donne pas suite à la demande
                                    de la personne concernée conformément au paragraphe 1, la
                                    personne concernée a le droit de s&apos;adresser directement à
                                    l&apos;autorité de contrôle, c&apos;est-à-dire en République
                                    tchèque, à l&apos;Office pour la protection des données
                                    personnelles, Pplk. Sochora 27, 170 00 Praha 7 ou
                                    l&apos;autorité de contrôle du pays de résidence ou
                                    d&apos;établissement de la personne concernée dans l&apos;UE,
                                    notamment de la manière spécifiée par le responsable du
                                    traitement dans le document de décision.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* /Page Content */}
            </>
        </div>
    );
};

export default PrivacyPolicy;
