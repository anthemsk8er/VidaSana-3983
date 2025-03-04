import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { format } from 'date-fns';
import { FaWeight, FaRuler, FaBullseye, FaTrophy, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const weeklyProgress = {
    habits: 85,
    exercise: 70,
    nutrition: 90
  };

  const userStats = {
    currentWeight: 75,
    startingWeight: 82,
    goalWeight: 70,
    height: 175,
    age: 28,
    bmi: ((75 / (1.75 * 1.75))).toFixed(1),
    weightLost: 82 - 75,
    daysActive: 45
  };

  const weightChartOptions = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return format(date, 'EEE');
      })
    },
    yAxis: {
      type: 'value',
      name: 'Peso (kg)',
      min: 65,
      max: 85
    },
    series: [{
      data: [82, 81, 80, 78, 77, 76, 75],
      type: 'line',
      smooth: true,
      name: 'Peso',
      color: '#4F46E5'
    }]
  };

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard
      </motion.h1>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<FaWeight />}
          title="Peso Actual"
          value={`${userStats.currentWeight} kg`}
          subtitle={`-${userStats.weightLost} kg desde el inicio`}
          color="primary"
        />
        <StatsCard
          icon={<FaBullseye />}
          title="Objetivo"
          value={`${userStats.goalWeight} kg`}
          subtitle={`Faltan ${(userStats.currentWeight - userStats.goalWeight).toFixed(1)} kg`}
          color="secondary"
        />
        <StatsCard
          icon={<FaChartLine />}
          title="IMC"
          value={userStats.bmi}
          subtitle="Normal"
          color="accent"
        />
        <StatsCard
          icon={<FaTrophy />}
          title="Días Activos"
          value={userStats.daysActive}
          subtitle="¡Sigue así!"
          color="green"
        />
      </div>

      {/* Gráfico de Progreso */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Progreso de Peso</h2>
        <ReactECharts option={weightChartOptions} style={{ height: '300px' }} />
      </div>

      {/* Progreso Semanal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressCard title="Hábitos" percentage={weeklyProgress.habits} color="primary" />
        <ProgressCard title="Ejercicio" percentage={weeklyProgress.exercise} color="secondary" />
        <ProgressCard title="Nutrición" percentage={weeklyProgress.nutrition} color="accent" />
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, subtitle, color }) => (
  <motion.div 
    className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <span className={`text-2xl text-${color}`}>{icon}</span>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </motion.div>
);

const ProgressCard = ({ title, percentage, color }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-md"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`bg-${color} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="mt-2 text-right font-medium text-gray-600">{percentage}%</p>
    </div>
  </motion.div>
);

export default Dashboard;