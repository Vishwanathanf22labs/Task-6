import React from 'react';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import api from '../api';

const STORAGE_KEY = 'softDeletedTaskIds';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [softDeletedIds, setSoftDeletedIds] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get('/');
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateSoftDeletedStorage = (updatedIds) => {
    setSoftDeletedIds(updatedIds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));
  };

  const handleCreate = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/${editingTask.id}`, taskData);
        setEditingTask(null);
      } else {
        const createdTask = await api.post('/', taskData);
     
        updateSoftDeletedStorage(
          softDeletedIds.filter((id) => id !== createdTask.data.id)
        );
      }
      fetchTasks();
    } catch (error) {
      console.error('Failed to create/update task:', error);
    }
  };

  const handleSoftDelete = (id) => {
    const updated = [...softDeletedIds, id];
    updateSoftDeletedStorage(updated);
  };

  const handleToggle = async (task) => {
    try {
      await api.put(`/${task.id}`, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const visibleTasks = tasks.filter((task) => !softDeletedIds.includes(task.id));

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Task Manager</h1>
      <TaskForm onSubmit={handleCreate} editingTask={editingTask} />
      <div className="space-y-4">
        {visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleSoftDelete}
            onToggle={handleToggle}
            onEdit={(task) => setEditingTask(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
