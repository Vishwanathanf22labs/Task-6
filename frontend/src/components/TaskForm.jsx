import React from 'react';
import { useState, useEffect } from 'react';
import { Save, ArrowLeft, Plus, Edit3 } from 'lucide-react';

const TaskForm = ({ onSubmit, editingTask, onBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tasks
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {editingTask ? (
                    <Edit3 className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
       
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-2xl font-bold text-white mb-2">
              {editingTask ? 'Update Your Task' : 'What needs to be done?'}
            </h2>
            <p className="text-blue-100">
              {editingTask 
                ? 'Make changes to your task details below.' 
                : 'Create a new task and stay organized.'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
       
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-900">
                Task Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter a clear, descriptive title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                required
              />
            </div>

        
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
                Description
                <span className="text-gray-500 font-normal ml-1">(Optional)</span>
              </label>
              <textarea
                id="description"
                placeholder="Add more details about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none placeholder-gray-400"
              />
            </div>

      
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingTask ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>


        <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">💡 Tips for better task management</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Keep titles clear and actionable</li>
            <li>• Use descriptions for additional context or requirements</li>
            <li>• Break down large tasks into smaller, manageable ones</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;