import { Link } from 'react-router-dom';
import { FaHeartbeat, FaCheckSquare, FaDumbbell, FaAppleAlt, FaUser, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <FaHeartbeat className="text-2xl" />
            KBSalud
          </Link>
          <div className="flex items-center space-x-4">
            <NavLink to="/habits" icon={<FaCheckSquare />} text="Hábitos" />
            <NavLink to="/exercise" icon={<FaDumbbell />} text="Ejercicio" />
            <NavLink to="/nutrition" icon={<FaAppleAlt />} text="Nutrición" />
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <img
                    src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F46E5&color=fff`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={login}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <FaSignInAlt />
                  Ingresar
                </button>
                <button
                  onClick={() => {}} // Implementar registro
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;