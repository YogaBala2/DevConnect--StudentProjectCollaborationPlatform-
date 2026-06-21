import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProjectBrowse from "../pages/ProjectBrowse";
import ProjectDetail from "../pages/ProjectDetail";
import ProjectCreate from "../pages/ProjectCreate";
import MyRequests from "../pages/MyRequests";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import EditProfile from "../pages/EditProfile";
import Notifications from "../pages/Notifications";
import ProjectEdit from "../pages/ProjectEdit";
import MyProjects from "../pages/MyProjects";
import PublicProfile from "../pages/PublicProfile";
import TeamDashboard from "../pages/TeamDashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProjectRequests from "../pages/ProjectRequests";
import Invitations from "../pages/Invitations";
import ProjectWorkspace from "../pages/ProjectWorkspace";


const AppRoutes = () => {
  return (
    <Routes>
      <Route
  path="/landing"
  element={<Landing />}
/>

      <Route
        path="/login"
        element={<Login />}
      />
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      <Route
        path="/register"
        element={<Register />}
      />
<Route
  path="/invitations"
  element={<Invitations />}
/>
<Route
  path="/workspace/:id"
  element={
    <ProjectWorkspace />
  }
/>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
  path="/projects/:projectId/requests"
  element={<ProjectRequests />}
/>
      <Route
  path="/team-dashboard"
  element={
    <ProtectedRoute>
      <TeamDashboard />
    </ProtectedRoute>
  }
/>
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectBrowse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />
     
<Route
  path="/projects/edit/:id"
  element={
    <ProtectedRoute>
      <ProjectEdit />
    </ProtectedRoute>
  }
/>
      <Route
        path="/create-project"
        element={
          <ProtectedRoute>
            <ProjectCreate />
          </ProtectedRoute>
        }
      />
      <Route
  path="/my-projects"
  element={
    <ProtectedRoute>
      <MyProjects />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>
     
      <Route
        path="/my-requests"
        element={
          <ProtectedRoute>
            <MyRequests />
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
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<NotFound />}
      />
      <Route
  path="/users/:id"
  element={
    <ProtectedRoute>
      <PublicProfile />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;