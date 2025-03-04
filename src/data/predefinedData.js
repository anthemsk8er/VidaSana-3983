// Lista predefinida de hábitos
export const predefinedHabits = [
  {
    id: 'h1',
    name: 'Beber 2L de agua',
    category: 'Salud',
    tags: ['Hidratación', 'Diario', 'Básico']
  },
  {
    id: 'h2',
    name: 'Meditar 10 minutos',
    category: 'Mindfulness',
    tags: ['Mental', 'Mañana', 'Bienestar']
  },
  {
    id: 'h3',
    name: 'Dormir 8 horas',
    category: 'Sueño',
    tags: ['Descanso', 'Nocturno', 'Básico']
  },
  {
    id: 'h4',
    name: 'Estiramientos matutinos',
    category: 'Ejercicio',
    tags: ['Flexibilidad', 'Mañana', 'Básico']
  },
  {
    id: 'h5',
    name: 'Comer 5 porciones de frutas/verduras',
    category: 'Nutrición',
    tags: ['Alimentación', 'Diario', 'Salud']
  }
];

// Lista predefinida de ejercicios
export const predefinedExercises = [
  {
    id: 'e1',
    name: 'Caminata suave',
    duration: '30 min',
    calories: 150,
    difficulty: 'Principiante',
    filters: ['Cardio', 'Lesión en brazos', 'Lesión en hombros', 'Ejercicio simple']
  },
  {
    id: 'e2',
    name: 'Sentadillas con peso corporal',
    duration: '15 min',
    calories: 120,
    difficulty: 'Principiante',
    filters: ['Fuerza', 'Tren inferior', 'Lesión en brazos', 'Ejercicio simple']
  },
  {
    id: 'e3',
    name: 'Yoga para principiantes',
    duration: '45 min',
    calories: 200,
    difficulty: 'Principiante',
    filters: ['Flexibilidad', 'Cuerpo completo', 'Ejercicio simple']
  },
  {
    id: 'e4',
    name: 'Ejercicios de core',
    duration: '20 min',
    calories: 180,
    difficulty: 'Intermedio',
    filters: ['Core', 'Lesión en piernas', 'Fuerza']
  },
  {
    id: 'e5',
    name: 'Natación suave',
    duration: '45 min',
    calories: 300,
    difficulty: 'Intermedio',
    filters: ['Cardio', 'Bajo impacto', 'Cuerpo completo']
  }
];

// Lista predefinida de alimentos/comidas
export const predefinedMeals = [
  {
    id: 'm1',
    name: 'Avena con frutas',
    calories: 300,
    portion: '1 tazón',
    filters: ['Desayuno', 'Carbohidratos', 'Vegetariano', 'Sin Gluten']
  },
  {
    id: 'm2',
    name: 'Ensalada de quinoa',
    calories: 400,
    portion: '1 plato',
    filters: ['Almuerzo', 'Proteínas', 'Vegetariano', 'Sin Gluten']
  },
  {
    id: 'm3',
    name: 'Batido de proteínas',
    calories: 200,
    portion: '1 vaso',
    filters: ['Snack', 'Proteínas', 'Sin Gluten', 'Sin Lactosa']
  },
  {
    id: 'm4',
    name: 'Pechuga de pollo a la plancha',
    calories: 250,
    portion: '150g',
    filters: ['Almuerzo', 'Cena', 'Proteínas', 'Sin Gluten']
  },
  {
    id: 'm5',
    name: 'Yogur griego con miel',
    calories: 180,
    portion: '1 tazón',
    filters: ['Desayuno', 'Snack', 'Proteínas', 'Lácteos']
  }
];

// Categorías y filtros
export const categories = {
  habits: ['Salud', 'Ejercicio', 'Nutrición', 'Sueño', 'Mindfulness', 'Productividad'],
  exercises: {
    difficulty: ['Principiante', 'Intermedio', 'Avanzado'],
    type: ['Cardio', 'Fuerza', 'Flexibilidad', 'Equilibrio'],
    bodyPart: ['Tren superior', 'Tren inferior', 'Core', 'Cuerpo completo'],
    conditions: [
      'Lesión en brazos',
      'Lesión en manos',
      'Lesión en piernas',
      'Lesión en pies',
      'Lesión en cadera',
      'Lesión en hombros'
    ]
  },
  meals: {
    type: ['Proteínas', 'Carbohidratos', 'Grasas Saludables', 'Vegetales', 'Frutas', 'Lácteos'],
    timing: ['Desayuno', 'Almuerzo', 'Merienda', 'Cena', 'Snack'],
    restrictions: [
      'Sin Gluten',
      'Vegetariano',
      'Vegano',
      'Sin Lactosa',
      'Bajo en Sodio',
      'Bajo en Azúcar'
    ]
  }
};