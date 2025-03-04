import { motion } from 'framer-motion';
import { useAuth, ROLES } from '../context/AuthContext';

const RoleSelector = () => {
  const { user, updateUserRole } = useAuth();

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Cambiar Rol (Demo)</h3>
      <div className="flex gap-4">
        {Object.values(ROLES).map((role) => (
          <motion.button
            key={role}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateUserRole(role)}
            className={`px-4 py-2 rounded-lg capitalize ${
              user.role === role
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {role}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;