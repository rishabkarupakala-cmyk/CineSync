import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Settings from "./pages/Settings";
import AccountSettings from "./pages/AccountSettings";
import ChangePassword from "./pages/ChangePassword";
import ProfileSettings from "./pages/EditProfileSettings";
import PrivacySettings from "./pages/PrivacySettings";
import FriendRequestSettings from "./pages/FriendRequestSettings";
import BlockedUsersSettings from "./pages/BlockedUsersSettings";
import NotificationSettings from "./pages/NotificationSettings";
import AppearanceSettings from "./pages/AppearanceSettings";
import SecuritySettings from "./pages/SecuritySettings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
<Route path="/settings/account" element={<AccountSettings />} />
<Route path="/settings/account/edit-profile" element={<ProfileSettings />} />
<Route path="/settings/account/password" element={<ChangePassword />} />
<Route path="/settings/privacy"element={<PrivacySettings />}/>
<Route path="/settings/privacy/friend-requests"element={<FriendRequestSettings />}/>
<Route path="/settings/privacy/blocked-users"element={<BlockedUsersSettings />}/>
<Route path="/settings/notifications"element={<NotificationSettings />}/>
<Route path="/settings/appearance"element={<AppearanceSettings />}/>


        {/* Protected Routes */}
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/followers"
          element={
            <ProtectedRoute>
              <Followers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/following"
          element={
            <ProtectedRoute>
              <Following />
            </ProtectedRoute>
          }
        />

        <Route
  path="/settings/security"
  element={
    <ProtectedRoute>
      <SecuritySettings />
    </ProtectedRoute>
  }
/>

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;