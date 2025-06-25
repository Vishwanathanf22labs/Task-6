import React from 'react';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskListPage from './TaskListPage';
import api from '../api';

const STORAGE_KEY = 'softDeletedTaskIds';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'form'
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
      setCurrentView('list');
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

  const handleEdit = (task) => {
    setEditingTask(task);
    setCurrentView('form');
  };

  const handleCreateNew = () => {
    setEditingTask(null);
    setCurrentView('form');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingTask(null);
  };

  const visibleTasks = tasks.filter((task) => !softDeletedIds.includes(task.id));

  if (currentView === 'form') {
    return (
      <TaskForm
        onSubmit={handleCreate}
        editingTask={editingTask}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <TaskListPage
      tasks={visibleTasks}
      onCreateNew={handleCreateNew}
      onDelete={handleSoftDelete}
      onToggle={handleToggle}
      onEdit={handleEdit}
    />
  );
};

export default TaskPage;