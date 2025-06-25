import React from 'react';
import { CheckCircle2, Circle, Edit, Trash2, Clock, Calendar } from 'lucide-react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
    
      <div className="p-6">
       
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <button
              onClick={() => onToggle(task)}
              className="flex-shrink-0 mt-1 transition-all duration-200"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 hover:text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-semibold leading-tight transition-all duration-200 ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900 group-hover:text-blue-900'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-2 text-sm leading-relaxed ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>

   
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Edit task"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

 
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Created {task.createdAt ? formatDate(task.createdAt) : 'Recently'}</span>
            </div>
            {task.completed && (
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-green-600">Completed</span>
              </div>
            )}
          </div>

      
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            task.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {task.completed ? 'Done' : 'In Progress'}
          </div>
        </div>
      </div>

    
      {task.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
      )}
    </div>
  );
};

export default TaskItem;