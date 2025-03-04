import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import Exercise from './pages/Exercise';
import Nutrition from './pages/Nutrition';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import RoleSelector from './components/RoleSelector';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <RoleSelector />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/habits"
            element={
              <ProtectedRoute requiredPermissions={['track_progress']}>
                <Habits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <ProtectedRoute requiredPermissions={['track_progress']}>
                <Exercise />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nutrition"
            element={
              <ProtectedRoute requiredPermissions={['track_progress']}>
                <Nutrition />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredPermissions={['view_profile']}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;