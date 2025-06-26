import React from "react";
import { Plus, Search, Filter, CheckCircle, Clock, List } from "lucide-react";
import TaskItem from "../components/TaskItem";

const TaskListPage = ({ tasks, onCreateNew, onDelete, onToggle, onEdit }) => {
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <List className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Task Manager
                </h1>
                <p className="text-gray-600">
                  {tasks.length} total tasks • {pendingTasks.length} pending •{" "}
                  {completedTasks.length} completed
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <Search className="w-4 h-4 mr-2" />
                Search
              </button>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button> */}
              <button
                onClick={onCreateNew}
                className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6">
              <List className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first task. Stay organized and
              productive!
            </p>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {pendingTasks.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    In Progress ({pendingTasks.length})
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pendingTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={onDelete}
                      onToggle={onToggle}
                      onEdit={onEdit}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedTasks.length > 0 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Completed ({completedTasks.length})
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={onDelete}
                      onToggle={onToggle}
                      onEdit={onEdit}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
