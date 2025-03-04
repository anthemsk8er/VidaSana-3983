import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaWeight, FaRuler, 
  FaBirthdayCake, FaEdit, FaSave, FaTimes, FaTrophy,
  FaCalendarAlt, FaChartLine
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(user);

  const handleSave = () => {
    // Aquí iría la lógica para guardar en backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(user);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Mi Perfil
      </motion.h1>

      {/* Cabecera del Perfil */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F46E5&color=fff`}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-primary"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Miembro desde {user.startDate}</p>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<FaCalendarAlt />} label="Días Activos" value={user.stats.daysActive} />
          <StatCard icon={<FaCheckSquare />} label="Hábitos Completados" value={user.stats.habitsCompleted} />
          <StatCard icon={<FaDumbbell />} label="Ejercicios Registrados" value={user.stats.exercisesLogged} />
          <StatCard icon={<FaAppleAlt />} label="Comidas Registradas" value={user.stats.mealsTracked} />
        </div>

        {/* Logros */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" />
            Logros
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.achievements.map((achievement, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {achievement}
              </span>
            ))}
          </div>
        </div>

        {/* Información Personal */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Información Personal</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FaEdit /> Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaSave /> Guardar
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FaTimes /> Cancelar
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField
              icon={<FaUser />}
              label="Nombre"
              value={tempProfile.name}
              isEditing={isEditing}
              onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
            />
            <ProfileField
              icon={<FaBirthdayCake />}
              label="Edad"
              value={tempProfile.age}
              isEditing={isEditing}
              onChange={(e) => setTempProfile({...tempProfile, age: e.target.value})}
            />
            <ProfileField
              icon={<FaRuler />}
              label="Altura (cm)"
              value={tempProfile.height}
              isEditing={isEditing}
              onChange={(e) => setTempProfile({...tempProfile, height: e.target.value})}
            />
            <ProfileField
              icon={<FaWeight />}
              label="Peso Actual (kg)"
              value={tempProfile.weight}
              isEditing={isEditing}
              onChange={(e) => setTempProfile({...tempProfile, weight: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center gap-2 text-gray-600 mb-1">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const ProfileField = ({ icon, label, value, isEditing, onChange }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
      {icon} {label}
    </label>
    {isEditing ? (
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    ) : (
      <p className="text-gray-800">{value}</p>
    )}
  </div>
);

export default Profile;