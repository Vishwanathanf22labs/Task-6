import React from 'react';
const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
      <div className="flex-1">
        <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        {task.description && <p className="text-gray-600">{task.description}</p>}
      </div>
      <div className="flex space-x-2 ml-4">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={() => onToggle(task)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;