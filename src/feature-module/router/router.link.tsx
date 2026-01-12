import React from "react";
import {Navigate, Route} from "react-router";
import {all_routes} from "./all_routes";
import Home from "../home/home";
import BlogGrid from "../blog/blog-grid";
import BlogGridSidebarLeft from "../blog/blog-grid-sidebar-left";
import BlogGridSidebarRight from "../blog/blog-grid-sidebar-right";
import BlogList from "../blog/blog-list";
import BlogListSidebarRight from "../blog/blog-list-sidebar-right";
import BlogListSidebarLeft from "../blog/blog-list-sidebar-left";
import AboutUs from "../pages/about-us";
import BookingCancelled from "../coaches/booking-cancelled";
import BookingCompleted from "../coaches/booking-completed";
import AddCourt from "../coaches/add-court";
import AllCourt from "../coaches/all-court";
import AppointmentDetails from "../coaches/appointment-details";
import BlogCarousel from "../blog/blog-carousel";
import BlogDetails from "../blog/blog-details";
import BlogDetailsSidebarLeft from "../blog/blog-details-sidebar-left";
import BlogDetailsSidebarRight from "../blog/blog-details-sidebar-right";
import CoachDetail from "../coaches/coach-detail";
import CoachDetails from "../coaches/coach-details";
import CoachEarning from "../coaches/coach-earning";
import CoachesGrid from "../coaches/coaches-grid";
import CoachesGridSidebar from "../coaches/coaches-grid-sidebar";
import CoachesList from "../coaches/coaches-list";
import CoachesListSidebar from "../coaches/coaches-list-sidebar";
import CoachesMap from "../coaches/coaches-map";
import CoachRequest from "../coaches/coach-request";
import CoachWallet from "../coaches/coach-wallet";
import CoachTimeDate from "../coaches/coach-timedate";
import CoachProfile from "../coaches/coach-profile";
import CoachPersonalInfo from "../coaches/coach-personalinfo";
import CoachPayment from "../coaches/coach-payment";
import CoachOrederConfirm from "../coaches/coach-order-confirm";
import CoachMapSideBar from "../coaches/coach-map-sidebar";
import ComingSoon from "../pages/coming-soon";
import ContactUs from "../contact-us/contact-us";
import ActiveCourt from "../coaches/court-active";
import InactiveCourt from "../coaches/court-inactive";
import Error404 from "../pages/error-404";
import Events from "../pages/events";
import EventDetails from "../pages/event-details";
import CageCheckout from "../coaches/cage-checkout";
import CageDetails from "../coaches/cage-details";
import CageOrderConfirm from "../coaches/cage-order-confirm";
import CagePersonalInfo from "../coaches/cagepersonalinfo";
import EarningCoaching from "../coaches/earning-coaching";
import LessonTimedate from "../coaches/lesson-timedate";
import LessonType from "../coaches/lesson-type";
import ListingGridSidebar from "../listing/listing-grid-sidebar";
import ListingGrid from "../listing/listing-grid";
import ListingListSidebar from "../listing/listing-list-sidebar";
import ListingMapSidebar from "../listing/listing-map-sidebar";
import UserComplete from "../user/user-complete";
import UserDashboardProfiles from "../user/user-dashboard-profiles";
import UserDashboard from "../user/user-dashboard";
import UserInvoice from "../user/user-invoice";
import UserInvoiceComplete from "../user/user-invoice-complete";
import UserInvoiceCancelled from "../user/user-invoice-cancelled";
import CoachDashboard from "../coaches/coach-dashboard";
import ServiceDetail from "../pages/service-detail";
import Services from "../pages/services";
import SettingLesson from "../coaches/setting-lesson";
import SettingPassword from "../coaches/setting-password";
import SettingAvailability from "../coaches/setting-availability";
import TermsCondition from "../pages/terms-condition";
import ProfileOtherSetting from "../coaches/profile-othersetting";
import PrivacyPolicy from "../pages/privacy-policy";
import Pricing from "../pages/pricing";
import OurTeams from "../pages/our-teams";
import MyProfile from "../pages/my-profile";
import ListingList from "../listing/listing-list";
import ListingMap from "../listing/listing-map";
import Testimonials from "../pages/testimonials";
import TestimonialsCarousel from "../pages/testimonials-carousel";
import UserBookings from "../user/user-bookings";
import CoachBooking from "../coaches/coach-booking";
import CoachChat from "../coaches/coaches-chat";
import Faq from "../pages/faq";
import ForgotPassword from "../auth/forgot-password";
import Gallery from "../pages/gallery";
import Invoice from "../coaches/invoice";
import LessonOrderConfirm from "../coaches/lessonOrderconfirm";
import LessonPayment from "../coaches/lesson-payment";
import LessonPersonalinfo from "../coaches/lessonPersonalinfo";
import UserChat from "../user/user-chat";
import UserCoaches from "../user/user-coaches";
import Signin from "../auth/register";
import CheckEmail from "../auth/check-email";
import UserWallet from "../user/user-wallet";
import VenueDetails from "../coaches/venue-details";
import Login from "../auth/login";
import VerifyEmail from "../auth/verify-email";
import UserProfile from "../user/user-profile";
import UserSettingPassword from "../user/user-setting-password";
import UserProfileOtherSetting from "../user/user-profile-othersetting";
import UserCancelled from "../user/user-cancelled";
import UserOngoing from "../user/user-ongoing";
import ChangePassword from "../auth/change-password";
import Maintenance from "../pages/maintenance";
import UserClaim from "../user/user-claim";
import UserClaimOpened from "../user/user-claim-opened";
import UserClaimTreated from "../user/user-claim-treated";
import UserClaimSent from "../user/user-claim-sent";
import UserClaimRejected from "../user/user-claim-rejected";
import UserClaimAdd from "../user/user-claim-add";
import PaymentResultPage from "../user/user-payment";
import UserSubscription from "../user/user-subscription";
import PaymentSuccess from "../payment/payment-success";
import PaymentCancel from "../payment/payment-cancel";

const routes = all_routes;

const publicRoutes = [
    {
        path: routes.home,
        element: <Home />,
        route: Route,
    },
    {
        path: routes.blogGrid,
        element: <BlogGrid />,
        route: Route,
    },
    {
        path: routes.blogGridSidebarRight,
        element: <BlogGridSidebarRight />,
        route: Route,
    },
    {
        path: routes.blogGridSidebarLeft,
        element: <BlogGridSidebarLeft />,
        route: Route,
    },
    {
        path: routes.blogList,
        element: <BlogList />,
        route: Route,
    },
    {
        path: routes.blogListSidebarRight,
        element: <BlogListSidebarRight />,
        route: Route,
    },
    {
        path: routes.blogListSidebarLeft,
        element: <BlogListSidebarLeft />,
        route: Route,
    },
    {
        path: routes.aboutUs,
        element: <AboutUs />,
        route: Route,
    },

    {
        path: routes.bookingCancelled,
        element: <BookingCancelled />,
        route: Route,
    },
    {
        path: routes.bookingCompleted,
        element: <BookingCompleted />,
        route: Route,
    },
    {
        path: routes.addCourt,
        element: <AddCourt />,
        route: Route,
    },
    {
        path: routes.allCourt,
        element: <AllCourt />,
        route: Route,
    },
    {
        path: routes.appointmentDetails,
        element: <AppointmentDetails />,
        route: Route,
    },
    {
        path: routes.blogCarousel,
        element: <BlogCarousel />,
        route: Route,
    },
    {
        path: routes.blogDetails,
        element: <BlogDetails />,
        route: Route,
    },
    {
        path: routes.blogDetailsSidebarLeft,
        element: <BlogDetailsSidebarLeft />,
        route: Route,
    },
    {
        path: routes.blogDetailsSidebarRight,
        element: <BlogDetailsSidebarRight />,
        route: Route,
    },
    {
        path: routes.coachDetail,
        element: <CoachDetail />,
        route: Route,
    },
    {
        path: routes.coachDetails,
        element: <CoachDetails />,
        route: Route,
    },
    {
        path: routes.coachEarning,
        element: <CoachEarning />,
        route: Route,
    },
    {
        path: routes.coachesGrid,
        element: <CoachesGrid />,
        route: Route,
    },
    {
        path: routes.coachesGridSidebar,
        element: <CoachesGridSidebar />,
        route: Route,
    },
    {
        path: routes.coachesList,
        element: <CoachesList />,
        route: Route,
    },
    {
        path: routes.coachesListSidebar,
        element: <CoachesListSidebar />,
        route: Route,
    },
    {
        path: routes.coachesMap,
        element: <CoachesMap />,
        route: Route,
    },
    {
        path: routes.coachRequest,
        element: <CoachRequest />,
        route: Route,
    },
    {
        path: routes.coachWallet,
        element: <CoachWallet />,
        route: Route,
    },
    {
        path: routes.coachTimeDate,
        element: <CoachTimeDate />,
        route: Route,
    },
    {
        path: routes.coachProfile,
        element: <CoachProfile />,
        route: Route,
    },
    {
        path: routes.coachPersonalInfo,
        element: <CoachPersonalInfo />,
        route: Route,
    },
    {
        path: routes.coachPayment,
        element: <CoachPayment />,
        route: Route,
    },
    {
        path: routes.coachOrederConfirm,
        element: <CoachOrederConfirm />,
        route: Route,
    },
    {
        path: routes.coachesMapSidebar,
        element: <CoachMapSideBar />,
        route: Route,
    },
    {
        path: routes.contactUs,
        element: <ContactUs />,
        route: Route,
    },
    {
        path: routes.activeCourt,
        element: <ActiveCourt />,
        route: Route,
    },

    {
        path: routes.cagecheckout,
        element: <CageCheckout />,
        route: Route,
    },
    {
        path: routes.cagedetails,
        element: <CageDetails />,
        route: Route,
    },
    {
        path: routes.cageordeconfirm,
        element: <CageOrderConfirm />,
        route: Route,
    },
    {
        path: routes.cagepersonalinfo,
        element: <CagePersonalInfo />,
        route: Route,
    },

    {
        path: routes.inactiveCourt,
        element: <InactiveCourt />,
        route: Route,
    },
    {
        path: routes.events,
        element: <Events />,
        route: Route,
    },
    {
        path: routes.eventdetails,
        element: <EventDetails />,
        route: Route,
    },
    {
        path: routes.inactiveCourt,
        element: <InactiveCourt />,
        route: Route,
    },
    {
        path: routes.earningCoaching,
        element: <EarningCoaching />,
        route: Route,
    },
    {
        path: routes.lessonTimeDate,
        element: <LessonTimedate />,
        route: Route,
    },
    {
        path: routes.lessonType,
        element: <LessonType />,
        route: Route,
    },
    {
        path: routes.listingGridSidebar,
        element: <ListingGridSidebar />,
        route: Route,
    },
    {
        path: routes.listingGrid,
        element: <ListingGrid />,
        route: Route,
    },
    {
        path: routes.listingList,
        element: <ListingList />,
        route: Route,
    },
    {
        path: routes.listingListSidebar,
        element: <ListingListSidebar />,
        route: Route,
    },
    {
        path: routes.listingMap,
        element: <ListingMap />,
        route: Route,
    },
    {
        path: routes.listingMapSidebar,
        element: <ListingMapSidebar />,
        route: Route,
    },
    {
        path: routes.userComplete,
        element: <UserComplete />,
        route: Route,
    },
    {
        path: routes.userDashboardProfiles,
        element: <UserDashboardProfiles />,
        route: Route,
    },
    {
        path: routes.userDashboard,
        element: <UserDashboard />,
        route: Route,
    },
    {
        path: routes.userSubscription,
        element: <UserSubscription />,
        route: Route,
    },
    {
        path: routes.paymentSuccess,
        element: <PaymentSuccess />,
        route: Route,
    },
    {
        path: routes.paymentCancel,
        element: <PaymentCancel />,
        route: Route,
    },
    {
        path: routes.userClaim,
        element: <UserClaim />,
        route: Route,
    },
    {
        path: routes.userClaimOpened,
        element: <UserClaimOpened />,
        route: Route,
    },
    {
        path: routes.userClaimTreated,
        element: <UserClaimTreated />,
        route: Route,
    },
    {
        path: routes.userClaimSent,
        element: <UserClaimSent />,
        route: Route,
    },
    {
        path: routes.userClaimRejected,
        element: <UserClaimRejected />,
        route: Route,
    },
    {
        path: routes.userClaimAdd,
        element: <UserClaimAdd />,
        route: Route,
    },
    {
        path: routes.userPayment,
        element: <PaymentResultPage />,
        route: Route,
    },
    {
        path: routes.userInvoice,
        element: <UserInvoice />,
        route: Route,
    },
    {
        path: routes.userInvoiceComplete,
        element: <UserInvoiceComplete />,
        route: Route,
    },
    {
        path: routes.userInvoiceCancelled,
        element: <UserInvoiceCancelled />,
        route: Route,
    },

    {
        path: routes.coachDashboard,
        element: <CoachDashboard />,
        route: Route,
    },
    {
        path: routes.serviceDetail,
        element: <ServiceDetail />,
        route: Route,
    },
    {
        path: routes.services,
        element: <Services />,
        route: Route,
    },
    {
        path: routes.settingLesson,
        element: <SettingLesson />,
        route: Route,
    },
    {
        path: routes.settingPassword,
        element: <SettingPassword />,
        route: Route,
    },
    {
        path: routes.settingAvalibilty,
        element: <SettingAvailability />,
        route: Route,
    },
    {
        path: routes.termsCondition,
        element: <TermsCondition />,
        route: Route,
    },
    {
        path: routes.profileOtherSetting,
        element: <ProfileOtherSetting />,
        route: Route,
    },
    {
        path: routes.privacyPolicy,
        element: <PrivacyPolicy />,
        route: Route,
    },
    {
        path: routes.pricing,
        element: <Pricing />,
        route: Route,
    },
    {
        path: routes.ourTeams,
        element: <OurTeams />,
        route: Route,
    },
    {
        path: routes.myProfile,
        element: <MyProfile />,
        route: Route,
    },
    {
        path: routes.testimonials,
        element: <Testimonials />,
        route: Route,
    },
    {
        path: routes.testimonialsCarousel,
        element: <TestimonialsCarousel />,
        route: Route,
    },
    {
        path: routes.userBookings,
        element: <UserBookings />,
        route: Route,
    },
    {
        path: routes.coachBooking,
        element: <CoachBooking />,
        route: Route,
    },
    {
        path: routes.coachChat,
        element: <CoachChat />,
        route: Route,
    },
    {
        path: routes.faq,
        element: <Faq />,
        route: Route,
    },

    {
        path: routes.gallery,
        element: <Gallery />,
        route: Route,
    },
    {
        path: routes.invoice,
        element: <Invoice />,
        route: Route,
    },
    {
        path: routes.lessonOrderConfirm,
        element: <LessonOrderConfirm />,
        route: Route,
    },
    {
        path: routes.lessonPayment,
        element: <LessonPayment />,
        route: Route,
    },
    {
        path: routes.lessonPersonalinfo,
        element: <LessonPersonalinfo />,
        route: Route,
    },
    {
        path: routes.userChat,
        element: <UserChat />,
        route: Route,
    },
    {
        path: routes.userCoaches,
        element: <UserCoaches />,
        route: Route,
    },
    {
        path: routes.userProfile,
        element: <UserProfile />,
        route: Route,
    },
    {
        path: routes.userSettingPassword,
        element: <UserSettingPassword />,
        route: Route,
    },
    {
        path: routes.userProfileOtherSetting,
        element: <UserProfileOtherSetting />,
        route: Route,
    },
    {
        path: routes.userCancelled,
        element: <UserCancelled />,
        route: Route,
    },
    {
        path: routes.userWallet,
        element: <UserWallet />,
        route: Route,
    },
    {
        path: routes.venueDetails,
        element: <VenueDetails />,
        route: Route,
    },
    {
        path: routes.userOngoing,
        element: <UserOngoing />,
        route: Route,
    },
    {
        path: "/",
        name: "Root",
        element: <Navigate to="/home" />,
        route: Route,
    },
    {
        path: "*",
        name: "NotFound",
        element: <Navigate to={routes.error404} />,
        route: Route,
    },
];

const withoutHeaderRoutes = [
    {
        path: routes.comingSoon,
        element: <ComingSoon />,
        route: Route,
    },
    {
        path: routes.error404,
        element: <Error404 />,
        route: Route,
    },
    {
        path: routes.register,
        element: <Signin />,
        route: Route,
    },
    {
        path: routes.login,
        element: <Login />,
        route: Route,
    },
    {
        path: routes.verifyEmail,
        element: <VerifyEmail />,
        route: Route,
    },
    {
        path: routes.checkEmail,
        element: <CheckEmail />,
        route: Route,
    },
    {
        path: routes.maintenance,
        element: <Maintenance />,
        route: Route,
    },
    {
        path: routes.forgotPasssword,
        element: <ForgotPassword />,
        route: Route,
    },
    {
        path: routes.changePassword,
        element: <ChangePassword />,
        route: Route,
    },
];
export {publicRoutes, withoutHeaderRoutes};
