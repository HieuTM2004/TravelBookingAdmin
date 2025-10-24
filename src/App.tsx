import { BrowserRouter as Router, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import SignIn from "./pages/AuthPages/SignIn";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import User from "./pages/UserManagerment/User";
import ContentModeration from "./pages/UserManagerment/ContentModeration";
import Analytics from "./pages/Analytics";
import PaymentAndLogs from "./pages/PaymentAndLogs";
import { AuthProvider } from "./components/auth/AuthContext";
import Accommodations from "./pages/AccommodationManagement/Accommodations";
import AccommodationDetail from "./pages/AccommodationManagement/AccommodationDetail";
import AccomTypes from "./pages/AccommodationManagement/AccomTypes";
import RoomCategories from "./pages/RoomManagement/RoomCategories";
import Rooms from "./pages/RoomManagement/Rooms";
import RoomDetail from "./pages/RoomManagement/RoomDetail";
import BedTypes from "./pages/bedTypes/BedTypes";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            <Route path="/accommodations" element={<Accommodations />} />
            <Route
              path="/accommodations/viewDetail/:id"
              element={<AccommodationDetail />}
            />

            <Route path="/accomtypes" element={<AccomTypes />} />

            <Route path="/roomcategories" element={<RoomCategories />} />

            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />

            <Route path="/bedtypes" element={<BedTypes />} />

            <Route path="/users" element={<User />} />
            <Route path="/content-moderation" element={<ContentModeration />} />

            <Route path="/analytics" element={<Analytics />} />
            <Route path="/payment-and-logs" element={<PaymentAndLogs />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
