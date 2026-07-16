import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const activeTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-black text-white">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between py-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-3xl">
              ✅
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tighter">FlowList</h1>
              <p className="text-zinc-400 text-sm">Stay organized • Get things done</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-light text-violet-400">{activeTasksCount}</p>
            <p className="text-xs text-zinc-500">tasks left</p>
          </div>
        </div>

        {/* Add New Task */}
        <form onSubmit={addTask} className="mb-10">
          <div className="relative">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-violet-500 rounded-3xl px-7 py-5 text-lg placeholder-zinc-500 focus:outline-none transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-500 px-8 py-3 rounded-2xl font-medium transition-all active:scale-95"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex gap-2 mb-6 text-sm">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-2xl capitalize transition-all ${
                filter === f 
                  ? 'bg-white text-black font-medium' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400'
              }`}
            >
              {f}
            </button>
          ))}
          
          {tasks.some(t => t.completed) && (
            <button
              onClick={clearCompleted}
              className="ml-auto text-red-400 hover:text-red-500 transition-colors text-sm font-medium"
            >
              Clear Completed
            </button>
          )}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-3xl p-5 flex items-center gap-4 transition-all duration-200 ${task.completed ? 'opacity-75' : ''}`}
              >
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0
                    ${task.completed 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-zinc-600 hover:border-violet-400'}`}
                >
                  {task.completed && <span className="text-white text-xl leading-none">✓</span>}
                </button>

                <span 
                  className={`flex-1 text-lg transition-all ${task.completed ? 'line-through text-zinc-500' : 'text-white'}`}
                >
                  {task.text}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all p-2"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-zinc-500">
              <div className="text-6xl mb-4">📭</div>
              <p>No tasks found</p>
              <p className="text-sm mt-2">Add a new task above</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center text-xs text-zinc-500 mt-16">
          {tasks.length} total tasks • Built with React Hooks
        </div>
      </div>
    </div>
  );
}

export default App;