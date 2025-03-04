import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { predefinedHabits, categories } from '../data/predefinedData';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Salud');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customHabit, setCustomHabit] = useState('');

  const addPredefinedHabit = () => {
    if (selectedHabit) {
      const habitToAdd = predefinedHabits.find(h => h.name === selectedHabit);
      if (habitToAdd) {
        setHabits([
          ...habits,
          {
            id: Date.now(),
            name: habitToAdd.name,
            completed: false,
            category: habitToAdd.category,
            tags: habitToAdd.tags
          }
        ]);
        setSelectedHabit('');
      }
    }
  };

  const addCustomHabit = () => {
    if (customHabit.trim()) {
      setHabits([
        ...habits,
        {
          id: Date.now(),
          name: customHabit,
          completed: false,
          category: selectedCategory,
          tags: [selectedCategory]
        }
      ]);
      setCustomHabit('');
      setShowCustomForm(false);
    }
  };

  const removeHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Seguimiento de Hábitos
      </motion.h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <select
              value={selectedHabit}
              onChange={(e) => setSelectedHabit(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Seleccionar hábito predefinido...</option>
              {predefinedHabits.map(habit => (
                <option key={habit.id} value={habit.name}>
                  {habit.name} ({habit.category})
                </option>
              ))}
            </select>
            <button
              onClick={addPredefinedHabit}
              disabled={!selectedHabit}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <FaPlus /> Agregar
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-600">o</span>
            <button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="text-primary hover:text-primary/80 underline"
            >
              Agregar hábito personalizado
            </button>
          </div>

          {showCustomForm && (
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={customHabit}
                onChange={(e) => setCustomHabit(e.target.value)}
                placeholder="Nuevo hábito personalizado..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.habits.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button
                onClick={addCustomHabit}
                disabled={!customHabit.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <FaPlus /> Agregar
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              className="flex items-center justify-between p-4 border rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`p-2 rounded-full ${habit.completed ? 'bg-green-100' : 'bg-gray-100'}`}
                >
                  {habit.completed ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-gray-400" />
                  )}
                </button>
                <div>
                  <span className="text-lg text-gray-700">{habit.name}</span>
                  <span className="ml-2 text-sm text-gray-500">({habit.category})</span>
                  {habit.tags && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {habit.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeHabit(habit.id)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Habits;