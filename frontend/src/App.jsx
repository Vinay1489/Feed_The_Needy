import { lazy, Suspense } from "react";
import {Routes,Route} from "react-router-dom";

// import Home from "./components/HomeComponent/Home"
// import ForgotPassword from "./components/NGOForgot/ForgotPassword";
// import Section from "./components/VolunteerSignUp/Section";
// import VolunteerLogin from "./components/VolunteerLogin/VolunteerLogin";
// import DonorLogin from "./components/DonorLogin/DonorLogin";
// import DonorSignup from "./components/DonorSignUp/DonorSignup";
// import ForgotPasswordDonor from "./components/DonorForgot/ForgotPasswordDonor";
// import DonorResetPassword from "./components/DonorReset/DonorResetPassword";
// import DonorDashboard from "./components/DonorDashboard/DonorDashboard";
// import VolunteerDashboard from "./components/VolunteerDashboard/VolunteerDashboard";
// import NGOLogin from "./components/NGoPortal/NGoLogin";
// import NGOSignup from "./components/NGoPortal/NGOSignup";
// import NGODashboard from "./components/NGODashboard/NGODashboard";
// import HomeEstimatorSection from "./components/HomeComponent/HomeEstimatorSection";

import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import FullPageAnimation from "./fallbacks/FullPageAnimation";
import Loadable from "./Loadable.jsx";
import RouteTransitionWrapper from "./RouteTransitionWrapper.jsx";




function delayImport(factory, delay = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      factory().then(resolve);
    }, delay);
  });
}
const Home = Loadable(lazy(() => delayImport(() => import("./components/HomeComponent/Home"))));
const ForgotPassword = Loadable(lazy(() => delayImport(() => import("./components/NGOForgot/ForgotPassword"))));
const VolunteerForm = Loadable(lazy(() => delayImport(() => import("./components/VolunteerSignUp/VolunteerForm.jsx"))));
const VolunteerLogin = Loadable(lazy(() => delayImport(() => import("./components/VolunteerLogin/VolunteerLogin"))));
const DonorLogin = Loadable(lazy(() => delayImport(() => import("./components/DonorLogin/DonorLogin"))));
const DonorSignup = Loadable(lazy(() => delayImport(() => import("./components/DonorSignUp/DonorSignup"))));
const ForgotPasswordDonor = Loadable(lazy(() => delayImport(() => import("./components/DonorForgot/ForgotPasswordDonor"))));
const DonorResetPassword = Loadable(lazy(() => delayImport(() => import("./components/DonorReset/DonorResetPassword"))));
const DonorDashboard = Loadable(lazy(() => delayImport(() => import("./components/DonorDashboard/DonorDashboard"))));
const VolunteerDashboard = Loadable(lazy(() => delayImport(() => import("./components/VolunteerDashboard/VolunteerDashboard"))));
const NGOAdminLogin = Loadable(
  lazy(() => delayImport(() => import("./components/NGoPortal/NGOAdminLogin.jsx")))
);
const NGOAdminRegister = Loadable(
  lazy(() => delayImport(() => import("./components/NGORegister/NGOAdminRegister.jsx")))
);
const NGODashboard = Loadable(lazy(() => delayImport(() => import("./components/NGODashboard/NGODashboard"))));
const ForgotPasswordVolunteer = Loadable(lazy(()=> delayImport(()=> import("./components/VolunteerForgot/ForgotPasswordVolunteer"))));
const VolunteerResetPassword = Loadable(
  lazy(() =>
    delayImport(() =>
      import("./components/VolunteerForgot/VolunteerResetPassword.jsx")
    )
  )
);
export default function App(){
  return (
    <AuthProvider>
      <RouteTransitionWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ngologin" element={<NGOAdminLogin/>} />
          <Route path="/ngologinforgot" element={<ForgotPassword />} />
          <Route path="/ngoregister" element={<NGOAdminRegister />} />
          <Route path="/ngologin/dashboard" element={<NGODashboard />} />
          <Route path="/volunteersignup" element={<VolunteerForm />} />
          <Route path="/volunteerlogin" element={<VolunteerLogin />} />
          <Route path="/donorlogin" element={<DonorLogin />} />
          <Route path="/donorsignup" element={<DonorSignup />} />
          <Route path="/donorforgot" element={<ForgotPasswordDonor />} />
          <Route path="/donorforgot/reset" element={<DonorResetPassword />} />
          <Route
            path="/volunteerlogin/forgot"
            element={<ForgotPasswordVolunteer />}
          />
          <Route
            path="/volunteerlogin/reset"
            element={<VolunteerResetPassword />}
          />
          <Route
            path="/donorlogin/dashboard"
            element={
              // <ProtectedRoute>
              //     <DonorDashboard />
              // </ProtectedRoute>
              <DonorDashboard />
            }
          />
          <Route
            path="/volunteerlogin/dashboard"
            element={
              // <ProtectedRoute>
              // </ProtectedRoute>
              <VolunteerDashboard />
            }
          />
          {/* <Route path="*" element={<SmartExpiryEstimator />} /> */}
        </Routes>
      </RouteTransitionWrapper>
    </AuthProvider>
  );
}