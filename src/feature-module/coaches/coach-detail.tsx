import React, {useState} from "react";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import {Dropdown} from "primereact/dropdown";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {all_routes} from "../router/all_routes";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const CoachDetail = () => {
    const [open, setOpen] = React.useState(false);
    const routes = all_routes;
    const [selectedItems, setSelectedItems] = useState(Array(4).fill(false));

    const handleItemClick = (index: number) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = !updatedSelectedItems[index];
            return updatedSelectedItems;
        });
    };

    const [selectedCity, setSelectedCity] = useState();

    const cityOptions = [{name: "Select City"}, {name: "Toronto"}, {name: "Texas"}];

    const gallerySlider = {
        dots: false,
        autoplay: false,
        slidesToShow: 3,
        margin: 20,
        speed: 500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 776,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const featuredVenuesSlider = {
        dots: false,
        autoplay: false,
        slidesToShow: 3,
        margin: 20,
        speed: 500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 776,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    const scrollContent = (id) => {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    return (
        <div>
            {/* Banner */}
            <div className="banner">
                <ImageWithBasePath src="assets/img/bg/coach-detail-bg.jpg" alt="Banner" />
            </div>
            {/* Page Content */}
            <div className="content">
                <div className="container">
                    {/* Row */}
                    <div className="row move-top">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                            <div className="dull-bg corner-radius-10 coach-info d-md-flex justify-content-start align-items-start">
                                <div className="profile-pic">
                                    <Link to="#;">
                                        <ImageWithBasePath
                                            alt="User"
                                            className="corner-radius-10"
                                            src="assets/img/profiles/avatar-coach-detail.jpg"
                                        />
                                    </Link>
                                </div>
                                <div className="info w-100">
                                    <div className="d-sm-flex justify-content-between align-items-start">
                                        <h3 className="d-flex align-items-center justify-content-start mb-0">
                                            Kevin Anderson
                                            <span className="d-flex justify-content-center align-items-center">
                                                <i className="fas fa-check-double" />
                                            </span>
                                        </h3>
                                        <Link to="#">
                                            <span className="favourite fav-icon">
                                                <i className="feather-star" />
                                                Favourite
                                            </span>
                                        </Link>
                                    </div>
                                    <p>
                                        Coach Kevin provides Badminton lessons in Santa Monica at
                                        Penmar Park
                                    </p>
                                    <ul className="d-sm-flex align-items-center">
                                        <li className="d-flex align-items-center">
                                            <div className="white-bg d-flex align-items-center review">
                                                <span className="white-bg dark-yellow-bg d-flex align-items-center">
                                                    4.5
                                                </span>
                                                <span>300 Reviews</span>
                                            </div>
                                        </li>
                                        <li>
                                            <ImageWithBasePath
                                                src="assets/img/icons/flag-01.png"
                                                alt="Icon"
                                            />
                                            Santamanica, United States
                                        </li>
                                    </ul>
                                    <hr />
                                    <ul className="d-xl-flex">
                                        <li className="d-flex align-items-center">
                                            <ImageWithBasePath
                                                src="assets/img/icons/expert.svg"
                                                alt="Icon"
                                            />
                                            Rank : Expert
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <ImageWithBasePath
                                                src="assets/img/icons/sessions.svg"
                                                alt="Icon"
                                            />
                                            Sessions Terminé : 25
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <ImageWithBasePath
                                                src="assets/img/icons/since.svg"
                                                alt="Icon"
                                            />
                                            With Dreamsports Since Apr 5, 2023
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="venue-options white-bg mb-4">
                                <ul className="clearfix">
                                    <li className="active">
                                        <Link onClick={() => scrollContent("short-bio")}>
                                            Short Bio
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => scrollContent("basic-info")}>
                                            Lesson With Me
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => scrollContent("coaching")}>
                                            Coaching
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => scrollContent("gallery")}>
                                            Gallery
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => scrollContent("reviews")}>
                                            Reviews
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => scrollContent("location")}>
                                            Locations
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* Accordian Contents */}
                            <div className="accordion" id="accordionPanel">
                                <div className="accordion-item mb-4" id="short-bio">
                                    <h4 className="accordion-header" id="panelsStayOpen-short-bio">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseOne"
                                            aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseOne"
                                        >
                                            Short Bio
                                        </button>
                                    </h4>
                                    <div
                                        id="panelsStayOpen-collapseOne"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="panelsStayOpen-short-bio"
                                    >
                                        <div className="accordion-body">
                                            <div className="text show-more-height">
                                                <p className="mb-0">Name: Kevin Anderson</p>
                                                <p className="mb-4">
                                                    Experience: 10 years of experience coaching
                                                    badminton at various skill levels.
                                                </p>
                                                <p>
                                                    Credentials: Certified Badminton Coach with a
                                                    deep understanding of the sport&apos;s
                                                    techniques and strategies. Coaching Style:
                                                    Patient and detail-oriented approach, focusing
                                                    on technique refinement and strategic gameplay.
                                                    Achievements: Successfully guided players to
                                                    notable achievements in regional and national
                                                    competitions. Passion: An avid badminton
                                                    enthusiast,Kevin is dedicated to nurturing
                                                    talent and fostering a love for the sport. Join
                                                    Kevin’s coaching sessions to enhance your
                                                    badminton skills and unleash your full
                                                    potential.
                                                </p>
                                            </div>
                                            <div className="show-more d align-items-center primary-text">
                                                <i className="feather-plus-circle" />
                                                Voir plus
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="lesson-with-me">
                                    <h4
                                        className="accordion-header"
                                        id="panelsStayOpen-lesson-with-me"
                                    >
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseTwo"
                                        >
                                            Lesson With Me
                                        </button>
                                    </h4>
                                    <div
                                        id="panelsStayOpen-collapseTwo"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="panelsStayOpen-lesson-with-me"
                                    >
                                        <div className="accordion-body">
                                            <p>
                                                Join me for personalized lessons tailored to your
                                                needs. Choose from individual, 2-player, or group
                                                lessons for a customized badminton
                                                experience.Heighten your skills and relish the
                                                process of getting better.
                                            </p>
                                            <ul className="clearfix">
                                                <li>
                                                    <i className="feather-check-square" />
                                                    Single Lesson
                                                </li>
                                                <li>
                                                    <i className="feather-check-square" />2 Player
                                                    Lesson
                                                </li>
                                                <li>
                                                    <i className="feather-check-square" />
                                                    Small Group Lesson
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="coaching">
                                    <h4 className="accordion-header" id="panelsStayOpen-coaching">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseThree"
                                        >
                                            Coaching
                                        </button>
                                    </h4>
                                    <div
                                        id="panelsStayOpen-collapseThree"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="panelsStayOpen-coaching"
                                    >
                                        <div className="accordion-body">
                                            <p>
                                                Experience transformative coaching tailored to your
                                                needs. Whether individual, partner, or small group
                                                sessions, unlock your potential with personalized
                                                instruction for success.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="gallery">
                                    <h4 className="accordion-header" id="panelsStayOpen-gallery">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseFive"
                                            aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseFive"
                                        >
                                            Gallery
                                        </button>
                                    </h4>
                                    <div
                                        id="panelsStayOpen-collapseFive"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="panelsStayOpen-gallery"
                                    >
                                        <div className="accordion-body">
                                            <div className="gallery-slider owl-theme">
                                                <Slider {...gallerySlider}>
                                                    <div className="gallery-widget-item">
                                                        <Link
                                                            className="corner-radius-10"
                                                            to="assets/img/gallery/gallery3/gallery-01.jpg"
                                                            data-fancybox="gallery2"
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            <ImageWithBasePath
                                                                className="img-fluid corner-radius-10"
                                                                alt="Image"
                                                                src="assets/img/gallery/gallery3/gallery-01.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="gallery-widget-item">
                                                        <Link
                                                            className="corner-radius-10"
                                                            to="assets/img/gallery/gallery3/gallery-02.jpg"
                                                            data-fancybox="gallery2"
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            <ImageWithBasePath
                                                                className="img-fluid corner-radius-10"
                                                                alt="Image"
                                                                src="assets/img/gallery/gallery3/gallery-02.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="gallery-widget-item">
                                                        <Link
                                                            className="corner-radius-10"
                                                            to="assets/img/gallery/gallery3/gallery-03.jpg"
                                                            data-fancybox="gallery2"
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            <ImageWithBasePath
                                                                className="img-fluid corner-radius-10"
                                                                alt="Image"
                                                                src="assets/img/gallery/gallery3/gallery-03.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="gallery-widget-item">
                                                        <Link
                                                            className="corner-radius-10"
                                                            to="assets/img/gallery/gallery3/gallery-01.jpg"
                                                            data-fancybox="gallery2"
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            <ImageWithBasePath
                                                                className="img-fluid corner-radius-10"
                                                                alt="Image"
                                                                src="assets/img/gallery/gallery3/gallery-01.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="gallery-widget-item">
                                                        <Link
                                                            className="corner-radius-10"
                                                            to="assets/img/gallery/gallery3/gallery-02.jpg"
                                                            data-fancybox="gallery2"
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            <ImageWithBasePath
                                                                className="img-fluid corner-radius-10"
                                                                alt="Image"
                                                                src="assets/img/gallery/gallery3/gallery-02.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="gallery-widget-item">
                                                        <Link
                                                            className="corner-radius-10"
                                                            to="assets/img/gallery/gallery3/gallery-03.jpg"
                                                            data-fancybox="gallery3"
                                                            onClick={() => setOpen(true)}
                                                        >
                                                            <ImageWithBasePath
                                                                className="img-fluid corner-radius-10"
                                                                alt="Image"
                                                                src="assets/img/gallery/gallery3/gallery-03.jpg"
                                                            />
                                                        </Link>
                                                    </div>
                                                </Slider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4" id="reviews">
                                    <div className="accordion-header" id="panelsStayOpen-reviews">
                                        <div
                                            className="accordion-button d-flex justify-content-between align-items-center"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseSix"
                                            aria-controls="panelsStayOpen-collapseSix"
                                        >
                                            <span className="w-75 mb-0">Reviews</span>
                                        </div>
                                        <Link
                                            to="#;"
                                            className="btn btn-gradient pull-right write-review add-review"
                                            data-bs-toggle="modal"
                                            data-bs-target="#add-review"
                                        >
                                            Write a review
                                        </Link>
                                    </div>
                                    <div
                                        id="panelsStayOpen-collapseSix"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="panelsStayOpen-reviews"
                                    >
                                        <div className="accordion-body">
                                            <div className="row review-wrapper">
                                                <div className="col-lg-3">
                                                    <div className="ratings-info corner-radius-10 text-center">
                                                        <h3>4.8</h3>
                                                        <span>out of 5.0</span>
                                                        <div className="rating">
                                                            <i className="fas fa-star filled" />
                                                            <i className="fas fa-star filled" />
                                                            <i className="fas fa-star filled" />
                                                            <i className="fas fa-star filled" />
                                                            <i className="fas fa-star filled" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="recommended">
                                                        <h5>Recommended by 97% of Players</h5>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                                                <p className="mb-0">
                                                                    Quality of service
                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <span>5.0</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                                                <p className="mb-0">
                                                                    Quality of service
                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <span>5.0</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3">
                                                                <p className="mb-0">
                                                                    Quality of service
                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <span>5.0</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                                                <p className="mb-0">
                                                                    Quality of service
                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <span>5.0</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                                                <p className="mb-0">
                                                                    Quality of service
                                                                </p>
                                                                <ul>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <i />
                                                                    </li>
                                                                    <li>
                                                                        <span>5.0</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Review Box */}
                                            <div className="review-box d-md-flex">
                                                <div className="review-profile">
                                                    <ImageWithBasePath
                                                        src="assets/img/profiles/avatar-01.jpg"
                                                        className="img-fluid"
                                                        alt="User"
                                                    />
                                                </div>
                                                <div className="review-info">
                                                    <h6 className="mb-2 tittle">
                                                        Amanda Booked on 06/04/2023
                                                    </h6>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <span className>5.0</span>
                                                    </div>
                                                    <span className="success-text">
                                                        <i className="feather-check" />
                                                        Yes, I would book again.
                                                    </span>
                                                    <h6>Absolutely Perfect</h6>
                                                    <p>
                                                        If you are looking for a perfect place for
                                                        friendly matches with your friends or a
                                                        competitive match, It is the best place.
                                                    </p>
                                                    <ul className="d-flex">
                                                        <Lightbox
                                                            open={open}
                                                            close={() => setOpen(false)}
                                                            slides={[
                                                                {
                                                                    src: "/assets/img/gallery/gallery-01.jpg",
                                                                },
                                                                {
                                                                    src: "/assets/img/gallery/gallery-02.jpg",
                                                                },
                                                                {
                                                                    src: "/assets/img/gallery/gallery-03.jpg",
                                                                },
                                                                {
                                                                    src: "/assets/img/gallery/gallery-04.jpg",
                                                                },
                                                                {
                                                                    src: "/assets/img/gallery/gallery-05.jpg",
                                                                },
                                                            ]}
                                                        />
                                                        <li>
                                                            <Link
                                                                to="assets/img/gallery/gallery-thumb-01.jpg"
                                                                data-fancybox="gallery"
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                <ImageWithBasePath
                                                                    className="img-fluid"
                                                                    alt="Image"
                                                                    src="assets/img/gallery/gallery-01.jpg"
                                                                />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="assets/img/gallery/gallery-thumb-02.jpg"
                                                                data-fancybox="gallery"
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                <ImageWithBasePath
                                                                    className="img-fluid"
                                                                    alt="Image"
                                                                    src="assets/img/gallery/gallery-02.jpg"
                                                                />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="assets/img/gallery/gallery-thumb-03.jpg"
                                                                data-fancybox="gallery"
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                <ImageWithBasePath
                                                                    className="img-fluid"
                                                                    alt="Image"
                                                                    src="assets/img/gallery/gallery-03.jpg"
                                                                />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="assets/img/gallery/gallery-thumb-04.jpg"
                                                                data-fancybox="gallery"
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                <ImageWithBasePath
                                                                    className="img-fluid"
                                                                    alt="Image"
                                                                    src="assets/img/gallery/gallery-04.jpg"
                                                                />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="assets/img/gallery/gallery-thumb-05.jpg"
                                                                data-fancybox="gallery"
                                                                onClick={() => setOpen(true)}
                                                            >
                                                                <ImageWithBasePath
                                                                    className="img-fluid"
                                                                    alt="Image"
                                                                    src="assets/img/gallery/gallery-05.jpg"
                                                                />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                    <span className="post-date">
                                                        Sent on 11/03/2023
                                                    </span>
                                                </div>
                                            </div>
                                            {/* /Review Box */}
                                            {/* Review Box */}
                                            <div className="review-box d-md-flex">
                                                <div className="review-profile">
                                                    <ImageWithBasePath
                                                        src="assets/img/profiles/avatar-06.jpg"
                                                        className="img-fluid"
                                                        alt="User"
                                                    />
                                                </div>
                                                <div className="review-info">
                                                    <h6 className="mb-2 tittle">
                                                        Amanda Booked on 06/04/2023
                                                    </h6>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <span className>5.0</span>
                                                    </div>
                                                    <span className="warning-text">
                                                        <i className="feather-x" />
                                                        No, I dont want to book again.
                                                    </span>
                                                    <h6>Awesome. Its very convenient to play.</h6>
                                                    <p>
                                                        If you are looking for a perfect place for
                                                        friendly matches with your friends or a
                                                        competitive match, It is the best place.
                                                    </p>
                                                    <div className="dull-bg">
                                                        <p>
                                                            Experience badminton excellence at
                                                            Badminton Academy. Top-notch facilities,
                                                            well-maintained courts, and a friendly
                                                            atmosphere. Highly recommended for an
                                                            exceptional playing experience
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /Review Box */}
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-load-more d-flex justify-content-center align-items-center"
                                                >
                                                    Load More
                                                    <i className="feather-plus-square" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-0" id="location">
                                    <h4 className="accordion-header" id="panelsStayOpen-location">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseSeven"
                                            aria-expanded="false"
                                            aria-controls="panelsStayOpen-collapseSeven"
                                        >
                                            Location
                                        </button>
                                    </h4>
                                    <div
                                        id="panelsStayOpen-collapseSeven"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="panelsStayOpen-location"
                                    >
                                        <div className="accordion-body">
                                            <div className="google-maps">
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8862835683544!2d-73.98256668525309!3d41.93829486962529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0ee3286615b7%3A0x42bfa96cc2ce4381!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2sin!4v1670922579281!5m2!1sen!2sin"
                                                    height={445}
                                                    style={{border: 0}}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                />
                                            </div>
                                            <div className="dull-bg d-flex justify-content-start align-items-center mb-0">
                                                <div className="white-bg me-2">
                                                    <i className="fas fa-location-arrow" />
                                                </div>
                                                <div className>
                                                    <h6>Our Venue Location</h6>
                                                    <p>70 Bright St New York, USA</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Accordian Contents */}
                        </div>
                        <aside className="col-12 col-sm-12 col-md-12 col-lg-4 theiaStickySidebar">
                            <div className="stickybar">
                                <div className="white-bg book-coach">
                                    <h4 className="border-bottom">Book A Coach</h4>
                                    <p>
                                        <strong>Kevin Anderson</strong> Available Now{" "}
                                    </p>
                                    <div className="dull-bg text-center">
                                        <p className="mb-1">Start’s From</p>
                                        <h4 className="d-inline-block primary-text mb-0">$250</h4>
                                        <span>/hr</span>
                                    </div>
                                    <div className="d-grid btn-block mt-3">
                                        <Link
                                            to={routes.coachDetails}
                                            className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                                        >
                                            <i className="feather-calendar" />
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                                <div className="white-bg next-availability">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <span className="icon-bg-40 d-flex justify-content-center align-items-center">
                                            <ImageWithBasePath
                                                className="img-fluid"
                                                alt="Icon"
                                                src="assets/img/icons/head-calendar.svg"
                                            />
                                        </span>
                                        <h4 className="mb-0">Next Availability</h4>
                                    </div>
                                    <ul className="clearfix">
                                        <li>Thu, Sept 24 @ 3 PM</li>
                                        <li>Fri, Sept 25 @ 3 PM</li>
                                        <li>Sat, Sept 26 @ 3 PM</li>
                                        <li>Sun, Sept 27 @ 3 PM</li>
                                    </ul>
                                </div>
                                <div className="white-bg">
                                    <h4 className="border-bottom">Request for Availability</h4>
                                    <form>
                                        <div className="mb-10">
                                            <label htmlFor="name" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                        <div className="mb-10">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter Email Address"
                                            />
                                        </div>
                                        <div className="mb-10">
                                            <label htmlFor="name" className="form-label">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phonenumber"
                                                placeholder="Enter Phone Number"
                                            />
                                        </div>
                                        <div className="mb-10">
                                            <label htmlFor="court" className="form-label">
                                                Court
                                            </label>
                                            <Dropdown
                                                value={selectedCity}
                                                onChange={(e) => setSelectedCity(e.value)}
                                                options={cityOptions}
                                                optionLabel="name"
                                                placeholder="Select City"
                                                className="select city-select"
                                            />
                                        </div>
                                        <div className="mb-10">
                                            <label htmlFor="comments" className="form-label">
                                                Détails
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="comments"
                                                rows={3}
                                                placeholder="Enter Comments"
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="form-check d-flex justify-content-start align-items-center policy">
                                            <div className="d-inline-block">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultValue={true}
                                                    id="policy"
                                                    defaultChecked
                                                />
                                            </div>
                                            <label className="form-check-label" htmlFor="policy">
                                                By clicking &apos;Send Request&apos;, I agree to
                                                Dreamsport Privacy Policy and Terms of Use
                                            </label>
                                        </div>
                                        <div className="d-grid btn-block">
                                            <Link
                                                to="#"
                                                className="btn btn-secondary d-inline-flex justify-content-center align-items-center"
                                            >
                                                Send Request
                                                <i className="feather-arrow-right-circle ms-1" />
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="white-bg listing-owner">
                                    <h4 className="border-bottom">Listing By Owner</h4>
                                    <ul>
                                        <li className="d-flex justify-content-start align-items-center">
                                            <div className>
                                                <Link to={routes.blogDetails}>
                                                    <ImageWithBasePath
                                                        className="img-fluid"
                                                        alt="Post"
                                                        src="assets/img/listing-by-owner-01.jpg"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="owner-info">
                                                <h5>
                                                    <Link to={routes.blogDetails}>
                                                        Manchester Academy
                                                    </Link>
                                                </h5>
                                                <p>
                                                    <i className="feather-map-pin" />
                                                    <span>Sacramento, CA</span>
                                                </p>
                                                <p className="mb-0">
                                                    <i className="feather-calendar" />
                                                    <span>Next availablity : </span>
                                                    <span className="primary-text">
                                                        15 May 2023
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                        <li className="d-flex justify-content-start align-items-center">
                                            <div className>
                                                <Link to={routes.blogDetails}>
                                                    <ImageWithBasePath
                                                        className="img-fluid"
                                                        alt="Post"
                                                        src="assets/img/listing-by-owner-02.jpg"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="owner-info">
                                                <h5>
                                                    <Link to={routes.blogDetails}>
                                                        Sarah Sports Academy
                                                    </Link>
                                                </h5>
                                                <p>
                                                    <i className="feather-map-pin" />
                                                    <span>Sacramento, CA</span>
                                                </p>
                                                <p className="mb-0">
                                                    <i className="feather-calendar" />
                                                    <span>Next availablity : </span>
                                                    <span className="primary-text">
                                                        15 May 2023
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="white-bg">
                                    <h4 className="border-bottom">Share Venue</h4>
                                    <ul className="social-medias d-flex">
                                        <li className="facebook">
                                            <Link to="#;">
                                                <i className="fa-brands fa-facebook-f" />
                                            </Link>
                                        </li>
                                        <li className="instagram">
                                            <Link to="#;">
                                                <i className="fa-brands fa-instagram" />
                                            </Link>
                                        </li>
                                        <li className="behance">
                                            <Link to="#;">
                                                <i className="fa-brands fa-behance" />
                                            </Link>
                                        </li>
                                        <li className="twitter">
                                            <Link to="#;">
                                                <i className="fa-brands fa-twitter" />
                                            </Link>
                                        </li>
                                        <li className="pinterest">
                                            <Link to="#;">
                                                <i className="fa-brands fa-pinterest" />
                                            </Link>
                                        </li>
                                        <li className="linkedin">
                                            <Link to="#;">
                                                <i className="fa-brands fa-linkedin" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                    </div>
                    {/* /Row */}
                </div>
                {/* /container */}
                <section className="section innerpagebg">
                    <div className="container">
                        <div className="featured-slider-group">
                            <h3 className="mb-40">Similar Coaches</h3>
                            <div className="featured-venues-slider owl-theme">
                                <Slider {...featuredVenuesSlider}>
                                    {/* Featured Item */}
                                    <div className="featured-venues-item">
                                        <div className="listing-item listing-item-grid">
                                            <div className="listing-img">
                                                <Link to={routes.coachDetail}>
                                                    <ImageWithBasePath
                                                        src="assets/img/featured/featured-05.jpg"
                                                        alt="Coaches"
                                                    />
                                                </Link>
                                                <div
                                                    className="fav-item-venues"
                                                    key={1}
                                                    onClick={() => handleItemClick(1)}
                                                >
                                                    <span className="tag tag-blue">
                                                        Professional
                                                    </span>
                                                    <div className="list-reviews coche-star">
                                                        <div
                                                            className={`fav-icon ${selectedItems[1] ? "selected" : ""}`}
                                                        >
                                                            <i className="feather-heart" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hour-list">
                                                    <h5 className="tag tag-primary">
                                                        From $350 <span>/hr</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="listing-content">
                                                <h3 className="listing-title">
                                                    <Link to={routes.coachDetail}>
                                                        Kevin Anderson
                                                    </Link>
                                                </h3>
                                                <ul className="mb-2">
                                                    <li>
                                                        <span>
                                                            <i className="feather-map-pin me-2" />
                                                            Port Alsworth, AK
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div className="listing-details-group">
                                                    <p>
                                                        Certified Badminton Coach with a deep
                                                        understanding of the sport&apos;s and
                                                        strategies game.
                                                    </p>
                                                </div>
                                                <div className="coach-btn">
                                                    <ul>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetail}
                                                                className="btn btn-primary w-100"
                                                            >
                                                                <i className="feather-eye me-2" />
                                                                View Profile
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetail}
                                                                className="btn btn-secondary w-100"
                                                            >
                                                                <i className="feather-calendar me-2" />
                                                                Book Now
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="avalbity-review">
                                                    <ul>
                                                        <li>
                                                            <div className="avalibity-date">
                                                                <span>
                                                                    <i className="feather-calendar" />
                                                                </span>
                                                                <div className="avalibity-datecontent">
                                                                    <h6>Next Availabilty</h6>
                                                                    <h5>20 May 2023</h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="list-reviews mb-0">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="rating-bg">
                                                                        4.5
                                                                    </span>
                                                                    <span>80 Reviews</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Featured Item */}
                                    {/* Featured Item */}
                                    <div className="featured-venues-item">
                                        <div className="listing-item listing-item-grid">
                                            <div className="listing-img">
                                                <Link to={routes.coachDetail}>
                                                    <ImageWithBasePath
                                                        src="assets/img/featured/featured-06.jpg"
                                                        alt="Coaches"
                                                    />
                                                </Link>
                                                <div
                                                    className="fav-item-venues"
                                                    key={2}
                                                    onClick={() => handleItemClick(2)}
                                                >
                                                    <span className="tag tag-blue">Rookie</span>
                                                    <div className="list-reviews coche-star">
                                                        <Link
                                                            to="#"
                                                            className={`fav-icon ${selectedItems[2] ? "selected" : ""}`}
                                                        >
                                                            <i className="feather-heart" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="hour-list">
                                                    <h5 className="tag tag-primary">
                                                        From $120 <span>/hr</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="listing-content">
                                                <h3 className="listing-title">
                                                    <Link to={routes.coachDetail}>
                                                        Angela Roudrigez
                                                    </Link>
                                                </h3>
                                                <ul className="mb-2">
                                                    <li>
                                                        <span>
                                                            <i className="feather-map-pin me-2" />
                                                            Guysville, OH
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div className="listing-details-group">
                                                    <p>
                                                        Experienced coach dedicated to enhancing
                                                        your badminton skills and unlocking your
                                                        full potential
                                                    </p>
                                                </div>
                                                <div className="coach-btn">
                                                    <ul>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetail}
                                                                className="btn btn-primary w-100"
                                                            >
                                                                <i className="feather-eye me-2" />
                                                                View Profile
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetail}
                                                                className="btn btn-secondary w-100"
                                                            >
                                                                <i className="feather-calendar me-2" />
                                                                Book Now
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="avalbity-review">
                                                    <ul>
                                                        <li>
                                                            <div className="avalibity-date">
                                                                <span>
                                                                    <i className="feather-calendar" />
                                                                </span>
                                                                <div className="avalibity-datecontent">
                                                                    <h6>Next Availabilty</h6>
                                                                    <h5>21 May 2023</h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="list-reviews mb-0">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="rating-bg">
                                                                        4.5
                                                                    </span>
                                                                    <span>80 Reviews</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Featured Item */}
                                    {/* Featured Item */}
                                    <div className="featured-venues-item">
                                        <div className="listing-item listing-item-grid">
                                            <div className="listing-img">
                                                <Link to={routes.coachDetail}>
                                                    <ImageWithBasePath
                                                        src="assets/img/featured/featured-07.jpg"
                                                        alt="Coaches"
                                                    />
                                                </Link>
                                                <div
                                                    className="fav-item-venues"
                                                    key={3}
                                                    onClick={() => handleItemClick(3)}
                                                >
                                                    <span className="tag tag-blue">
                                                        Professional
                                                    </span>
                                                    <div className="list-reviews coche-star">
                                                        <Link
                                                            to="#"
                                                            className={`fav-icon ${selectedItems[3] ? "selected" : ""}`}
                                                        >
                                                            <i className="feather-heart" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="hour-list">
                                                    <h5 className="tag tag-primary">
                                                        From $750 <span>/hr</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="listing-content">
                                                <h3 className="listing-title">
                                                    <Link to={routes.coachDetail}>
                                                        Evon Raddick
                                                    </Link>
                                                </h3>
                                                <ul className="mb-2">
                                                    <li>
                                                        <span>
                                                            <i className="feather-map-pin me-2" />
                                                            Little Rock, AR
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div className="listing-details-group">
                                                    <p>
                                                        Passionate Badminton Coach unlocking
                                                        players&apos; potential through strategic
                                                        gameplay
                                                    </p>
                                                </div>
                                                <div className="coach-btn">
                                                    <ul>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetail}
                                                                className="btn btn-primary w-100"
                                                            >
                                                                <i className="feather-eye me-2" />
                                                                View Profile
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetail}
                                                                className="btn btn-secondary w-100"
                                                            >
                                                                <i className="feather-calendar me-2" />
                                                                Book Now
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="avalbity-review">
                                                    <ul>
                                                        <li>
                                                            <div className="avalibity-date">
                                                                <span>
                                                                    <i className="feather-calendar" />
                                                                </span>
                                                                <div className="avalibity-datecontent">
                                                                    <h6>Next Availabilty</h6>
                                                                    <h5>22 May 2023</h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="list-reviews mb-0">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="rating-bg">
                                                                        4.5
                                                                    </span>
                                                                    <span>470 Reviews </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Featured Item */}
                                    {/* Featured Item */}
                                    <div className="featured-venues-item">
                                        <div className="listing-item listing-item-grid">
                                            <div className="listing-img">
                                                <Link to={routes.coachDetail}>
                                                    <ImageWithBasePath
                                                        src="assets/img/featured/featured-08.jpg"
                                                        alt="Coaches"
                                                    />
                                                </Link>
                                                <div
                                                    className="fav-item-venues"
                                                    key={4}
                                                    onClick={() => handleItemClick(4)}
                                                >
                                                    <span className="tag tag-blue">
                                                        Intermediate
                                                    </span>
                                                    <div className="list-reviews coche-star">
                                                        <Link
                                                            to="#"
                                                            className={`fav-icon ${selectedItems[4] ? "selected" : ""}`}
                                                        >
                                                            <i className="feather-heart" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="hour-list">
                                                    <h5 className="tag tag-primary">
                                                        From $550 <span>/hr</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="listing-content">
                                                <h3 className="listing-title">
                                                    <Link to={routes.coachDetail}>
                                                        Harry Richardson
                                                    </Link>
                                                </h3>
                                                <ul className="mb-2">
                                                    <li>
                                                        <span>
                                                            <i className="feather-map-pin me-2" />
                                                            Roanoke, VA
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div className="listing-details-group">
                                                    <p>
                                                        Lorem Ipsum is simply dummy text of the
                                                        printing and typesetting
                                                        industry.industry&apos;s standard
                                                    </p>
                                                </div>
                                                <div className="coach-btn">
                                                    <ul>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetail}
                                                                className="btn btn-primary w-100"
                                                            >
                                                                <i className="feather-eye me-2" />
                                                                View Profile
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to={routes.coachDetails}
                                                                className="btn btn-secondary w-100"
                                                            >
                                                                <i className="feather-calendar me-2" />
                                                                Book Now
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="avalbity-review">
                                                    <ul>
                                                        <li>
                                                            <div className="avalibity-date">
                                                                <span>
                                                                    <i className="feather-calendar" />
                                                                </span>
                                                                <div className="avalibity-datecontent">
                                                                    <h6>Next Availabilty</h6>
                                                                    <h5>27 May 2023</h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="list-reviews mb-0">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="rating-bg">
                                                                        4.5
                                                                    </span>
                                                                    <span>180 Reviews</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Featured Item */}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* /Page Content */}
            {/* Add Review Modal */}
            <div className="modal custom-modal fade payment-modal" id="add-review" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header modal-header-title">
                                <h4 className="mb-0">Write a Review</h4>
                            </div>
                            <Link className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span className="align-center" aria-hidden="true">
                                    <i className="feather-x" />
                                </span>
                            </Link>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="input-space">
                                            <label className="form-label">
                                                Your Name <span>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="reviewer-name"
                                                placeholder="Enter Your Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-space">
                                            <label className="form-label">
                                                Title of your review
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                placeholder="If you could say it in one sentence, what would you say?"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-space">
                                            <label className="form-label">
                                                Your Review <span>*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="review"
                                                rows={3}
                                                placeholder="Enter Your Review"
                                                defaultValue={""}
                                            />
                                            <small className="text-muted">
                                                <span id="chars">100</span> characters remaining
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-space review">
                                            <label className="form-label">
                                                Rating <span>*</span>
                                            </label>
                                            <div className="star-rating">
                                                <input
                                                    id="star-5"
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue="star-5"
                                                />
                                                <label htmlFor="star-5" title="5 stars">
                                                    <i className="active fa fa-star" />
                                                </label>
                                                <input
                                                    id="star-4"
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue="star-4"
                                                />
                                                <label htmlFor="star-4" title="4 stars">
                                                    <i className="active fa fa-star" />
                                                </label>
                                                <input
                                                    id="star-3"
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue="star-3"
                                                />
                                                <label htmlFor="star-3" title="3 stars">
                                                    <i className="active fa fa-star" />
                                                </label>
                                                <input
                                                    id="star-2"
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue="star-2"
                                                />
                                                <label htmlFor="star-2" title="2 stars">
                                                    <i className="active fa fa-star" />
                                                </label>
                                                <input
                                                    id="star-1"
                                                    type="radio"
                                                    name="rating"
                                                    defaultValue="star-1"
                                                />
                                                <label htmlFor="star-1" title="1 star">
                                                    <i className="active fa fa-star" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="terms-accept">
                                            <div className="d-flex align-items-center form-check">
                                                <input
                                                    type="checkbox"
                                                    id="terms_accept"
                                                    className="form-check-input"
                                                />
                                                <label htmlFor="terms_accept">
                                                    I have read and accept{" "}
                                                    <Link to={routes.termsCondition}>
                                                        Terms &amp; Conditions
                                                    </Link>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div className="table-accept-btn">
                                <Link
                                    to="#"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    Add Review
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Review Modal */}
        </div>
    );
};

export default CoachDetail;
