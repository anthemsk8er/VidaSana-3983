import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { predefinedMeals, categories } from '../data/predefinedData';

const Nutrition = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customMeal, setCustomMeal] = useState({
    name: '',
    calories: '',
    portion: '',
    type: 'Proteínas'
  });

  const addPredefinedMeal = () => {
    if (selectedMeal) {
      const mealToAdd = predefinedMeals.find(m => m.name === selectedMeal);
      if (mealToAdd) {
        setMeals([
          ...meals,
          {
            id: Date.now(),
            ...mealToAdd,
            completed: false
          }
        ]);
        setSelectedMeal('');
      }
    }
  };

  const addCustomMeal = () => {
    if (customMeal.name && customMeal.calories && customMeal.portion) {
      setMeals([
        ...meals,
        {
          id: Date.now(),
          ...customMeal,
          completed: false,
          filters: [customMeal.type]
        }
      ]);
      setCustomMeal({
        name: '',
        calories: '',
        portion: '',
        type: 'Proteínas'
      });
      setShowCustomForm(false);
    }
  };

  const removeMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const toggleMeal = (id) => {
    setMeals(meals.map(meal =>
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Nutrición
      </motion.h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Seleccionar comida predefinida...</option>
              {predefinedMeals.map(meal => (
                <option key={meal.id} value={meal.name}>
                  {meal.name} ({meal.portion} - {meal.calories} cal)
                </option>
              ))}
            </select>
            <button
              onClick={addPredefinedMeal}
              disabled={!selectedMeal}
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
              Agregar comida personalizada
            </button>
          </div>

          {showCustomForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={customMeal.name}
                onChange={(e) => setCustomMeal({...customMeal, name: e.target.value})}
                placeholder="Nombre de la comida"
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                value={customMeal.portion}
                onChange={(e) => setCustomMeal({...customMeal, portion: e.target.value})}
                placeholder="Porción (ej: 100g)"
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={customMeal.calories}
                onChange={(e) => setCustomMeal({...customMeal, calories: e.target.value})}
                placeholder="Calorías"
                className="px-4 py-2 border rounded-lg"
              />
              <select
                value={customMeal.type}
                onChange={(e) => setCustomMeal({...customMeal, type: e.target.value})}
                className="px-4 py-2 border rounded-lg"
              >
                {categories.meals.type.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                onClick={addCustomMeal}
                disabled={!customMeal.name || !customMeal.calories || !customMeal.portion}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 col-span-2"
              >
                <FaPlus /> Agregar Comida
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {meals.map((meal) => (
            <motion.div
              key={meal.id}
              className="flex items-center justify-between p-4 border rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleMeal(meal.id)}
                  className={`p-2 rounded-full ${meal.completed ? 'bg-green-100' : 'bg-gray-100'}`}
                >
                  {meal.completed ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-gray-400" />
                  )}
                </button>
                <div>
                  <span className="text-lg text-gray-700">{meal.name}</span>
                  <div className="flex gap-4 text-gray-600 mt-1">
                    <span>{meal.portion}</span>
                    <span>{meal.calories} cal</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {meal.filters?.map(filter => (
                      <span
                        key={filter}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeMeal(meal.id)}
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

export default Nutrition;