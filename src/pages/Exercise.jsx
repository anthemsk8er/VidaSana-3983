import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { predefinedExercises, categories } from '../data/predefinedData';

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customExercise, setCustomExercise] = useState({
    name: '',
    duration: '',
    calories: '',
    difficulty: 'Principiante'
  });

  const addPredefinedExercise = () => {
    if (selectedExercise) {
      const exerciseToAdd = predefinedExercises.find(e => e.name === selectedExercise);
      if (exerciseToAdd) {
        setExercises([
          ...exercises,
          {
            id: Date.now(),
            ...exerciseToAdd,
            completed: false
          }
        ]);
        setSelectedExercise('');
      }
    }
  };

  const addCustomExercise = () => {
    if (customExercise.name && customExercise.duration && customExercise.calories) {
      setExercises([
        ...exercises,
        {
          id: Date.now(),
          ...customExercise,
          completed: false,
          filters: [customExercise.difficulty]
        }
      ]);
      setCustomExercise({
        name: '',
        duration: '',
        calories: '',
        difficulty: 'Principiante'
      });
      setShowCustomForm(false);
    }
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const toggleExercise = (id) => {
    setExercises(exercises.map(exercise =>
      exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise
    ));
  };

  return (
    <div className="space-y-8">
      <motion.h1 
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Ejercicios
      </motion.h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Seleccionar ejercicio predefinido...</option>
              {predefinedExercises.map(exercise => (
                <option key={exercise.id} value={exercise.name}>
                  {exercise.name} ({exercise.duration} - {exercise.calories} cal)
                </option>
              ))}
            </select>
            <button
              onClick={addPredefinedExercise}
              disabled={!selectedExercise}
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
              Agregar ejercicio personalizado
            </button>
          </div>

          {showCustomForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={customExercise.name}
                onChange={(e) => setCustomExercise({...customExercise, name: e.target.value})}
                placeholder="Nombre del ejercicio"
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                value={customExercise.duration}
                onChange={(e) => setCustomExercise({...customExercise, duration: e.target.value})}
                placeholder="Duración (ej: 30 min)"
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={customExercise.calories}
                onChange={(e) => setCustomExercise({...customExercise, calories: e.target.value})}
                placeholder="Calorías"
                className="px-4 py-2 border rounded-lg"
              />
              <select
                value={customExercise.difficulty}
                onChange={(e) => setCustomExercise({...customExercise, difficulty: e.target.value})}
                className="px-4 py-2 border rounded-lg"
              >
                {categories.exercises.difficulty.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
              <button
                onClick={addCustomExercise}
                disabled={!customExercise.name || !customExercise.duration || !customExercise.calories}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 col-span-2"
              >
                <FaPlus /> Agregar Ejercicio
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {exercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              className="flex items-center justify-between p-4 border rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleExercise(exercise.id)}
                  className={`p-2 rounded-full ${exercise.completed ? 'bg-green-100' : 'bg-gray-100'}`}
                >
                  {exercise.completed ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-gray-400" />
                  )}
                </button>
                <div>
                  <span className="text-lg text-gray-700">{exercise.name}</span>
                  <div className="flex gap-4 text-gray-600 mt-1">
                    <span>{exercise.duration}</span>
                    <span>{exercise.calories} cal</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exercise.filters?.map(filter => (
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
                onClick={() => removeExercise(exercise.id)}
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

export default Exercise;