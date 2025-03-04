import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus } from 'react-icons/fa';

const AddItemDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  predefinedItems, 
  onAddPredefined, 
  onAddCustom,
  filters,
  selectedFilters,
  onFilterChange,
  customFields 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          {/* Filtros */}
          {filters && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Filtros</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([category, filterList]) => (
                  <div key={category} className="w-full">
                    <h4 className="text-sm text-gray-600 mb-1 capitalize">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {filterList.map(filter => (
                        <button
                          key={filter}
                          onClick={() => onFilterChange(filter)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedFilters.includes(filter)
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Items Predefinidos */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Items Predefinidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predefinedItems.map(item => (
                <motion.div
                  key={item.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.filters?.map(filter => (
                          <span
                            key={filter}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                          >
                            {filter}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => onAddPredefined(item)}
                      className="text-primary hover:text-primary/80"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Formulario Personalizado */}
          <div>
            <h3 className="font-semibold mb-4">Agregar Personalizado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customFields}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddItemDialog;