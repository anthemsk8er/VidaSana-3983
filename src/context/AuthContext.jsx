import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
  USER: 'user'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['manage_users', 'manage_content', 'view_analytics', 'manage_trainers'],
  [ROLES.TRAINER]: ['view_clients', 'manage_workouts', 'manage_nutrition'],
  [ROLES.USER]: ['view_profile', 'track_progress', 'log_activities']
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: ROLES.USER,
    permissions: ROLE_PERMISSIONS[ROLES.USER],
    avatarUrl: null,
    age: 28,
    height: 175,
    weight: 75,
    goalWeight: 70,
    startDate: '2024-01-15',
    achievements: ['🏃 Primera semana completada', '💪 10 ejercicios realizados', '🥗 5 días de dieta saludable'],
    stats: {
      daysActive: 45,
      habitsCompleted: 127,
      exercisesLogged: 38,
      mealsTracked: 156
    }
  });

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission);
  };

  const updateUserRole = (newRole) => {
    setUser(prev => ({
      ...prev,
      role: newRole,
      permissions: ROLE_PERMISSIONS[newRole]
    }));
  };

  const login = () => {
    // Simulación de login
    setUser({
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: ROLES.USER,
      permissions: ROLE_PERMISSIONS[ROLES.USER],
      avatarUrl: null,
      age: 28,
      height: 175,
      weight: 75,
      goalWeight: 70,
      startDate: '2024-01-15',
      achievements: ['🏃 Primera semana completada', '💪 10 ejercicios realizados', '🥗 5 días de dieta saludable'],
      stats: {
        daysActive: 45,
        habitsCompleted: 127,
        exercisesLogged: 38,
        mealsTracked: 156
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      hasPermission, 
      updateUserRole,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};