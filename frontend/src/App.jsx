import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/FakeAuthContext";
import RouteTransitionWrapper from "./RouteTransitionWrapper.jsx";
import { AppStateProvider } from "./AppState.jsx";
import Loadable from "./Loadable.jsx";
import Layout from "./components/VolunteerDashboard/Layout.jsx";

// Utility to simulate delay (optional)
function delayImport(factory, delay = 1500) {
  return new Promise((resolve) => {
    setTimeout(() => factory().then(resolve), delay);
  });
}

// Lazy-loaded components
const Home = Loadable(
  lazy(() => delayImport(() => import("./components/HomeComponent/Home")))
);
const NGOAdminLogin = Loadable(
  lazy(() =>
    delayImport(() => import("./components/NGoPortal/NGOAdminLogin.jsx"))
  )
);
const NGOAdminRegister = Loadable(
  lazy(() =>
    delayImport(() => import("./components/NGORegister/NGOAdminRegister.jsx"))
  )
);
const NGOResetPassword = Loadable(
  lazy(() =>
    delayImport(() => import("./components/NGOForgot/NGOResetPassword.jsx"))
  )
);
const NGOReset = Loadable(
  lazy(() => delayImport(() => import("./components/NGOForgot/NGOReset.jsx")))
);
const NGODashboard = Loadable(
  lazy(() =>
    delayImport(() => import("./components/NGODashboard/NGODashboard.jsx"))
  )
);

const DonorLogin = Loadable(
  lazy(() => delayImport(() => import("./components/DonorLogin/DonorLogin")))
);
const DonorSignup = Loadable(
  lazy(() => delayImport(() => import("./components/DonorSignUp/DonorSignup")))
);
const ForgotPasswordDonor = Loadable(
  lazy(() =>
    delayImport(() => import("./components/DonorForgot/ForgotPasswordDonor"))
  )
);
const DonorResetPassword = Loadable(
  lazy(() =>
    delayImport(() => import("./components/DonorReset/DonorResetPassword"))
  )
);
const DonorDashboard = Loadable(
  lazy(() =>
    delayImport(() => import("./components/DonorDashboard/DonorDashboard"))
  )
);

const VolunteerForm = Loadable(
  lazy(() =>
    delayImport(() => import("./components/VolunteerSignUp/VolunteerForm.jsx"))
  )
);
const VolunteerLogin = Loadable(
  lazy(() =>
    delayImport(() => import("./components/VolunteerLogin/VolunteerLogin"))
  )
);
const ForgotPasswordVolunteer = Loadable(
  lazy(() =>
    delayImport(() =>
      import("./components/VolunteerForgot/ForgotPasswordVolunteer")
    )
  )
);
const VolunteerResetPassword = Loadable(
  lazy(() =>
    delayImport(() =>
      import("./components/VolunteerForgot/VolunteerResetPassword.jsx")
    )
  )
);

// Volunteer Dashboard + subroutes (lazy-loaded)
const VolunteerDashboard = Loadable(
  lazy(() =>
      import("./components/VolunteerDashboard/VolunteerDashboard")

  )
);
const Pickups = Loadable(
  lazy(() => import("./components/VolunteerDashboard/Pickups.jsx")
  )
);
const Deliveries = Loadable(
  lazy(() =>import("./components/VolunteerDashboard/Deliveries.jsx"))
);
const Calendar = Loadable(
  lazy(() => import("./components/VolunteerDashboard/Calendar.jsx"))
  
);
const Profile = Loadable(
  lazy(() => import("./components/VolunteerDashboard/Profile.jsx"))
  
);
const Support = Loadable(
  lazy(() =>import("./components/VolunteerDashboard/Support.jsx"))
  
);

export default function App() {
  return (
    <AuthProvider>
      <RouteTransitionWrapper>
        <AppStateProvider>
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/ngologin" element={<NGOAdminLogin />} />
            <Route path="/ngoreset" element={<NGOResetPassword />} />
            <Route path="/ngoregister" element={<NGOAdminRegister />} />
            <Route path="/ngologinforgot" element={<NGOReset />} />
            <Route path="/ngologin/dashboard" element={<NGODashboard />} />

            <Route path="/donorlogin" element={<DonorLogin />} />
            <Route path="/donorsignup" element={<DonorSignup />} />
            <Route path="/donorforgot" element={<ForgotPasswordDonor />} />
            <Route path="/donorforgot/reset" element={<DonorResetPassword />} />
            <Route path="/donorlogin/dashboard" element={<DonorDashboard />} />

            <Route path="/volunteersignup" element={<VolunteerForm />} />
            <Route path="/volunteerlogin" element={<VolunteerLogin />} />
            <Route
              path="/volunteerlogin/forgot"
              element={<ForgotPasswordVolunteer />}
            />
            <Route
              path="/volunteerlogin/reset"
              element={<VolunteerResetPassword />}
            />

            {/* --- VOLUNTEER DASHBOARD (Nested Layout) --- */}
            <Route path="/volunteerlogin/dashboard" element={<Layout />}>
              {/* index route → Dashboard main */}
              <Route index element={<VolunteerDashboard />} />
              {/* child routes */}
              <Route path="pickups" element={<Pickups />} />
              <Route path="deliveries" element={<Deliveries />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="profile" element={<Profile />} />
              <Route path="support" element={<Support />} />
            </Route>
          </Routes>
        </AppStateProvider>
      </RouteTransitionWrapper>
    </AuthProvider>
  );
}
