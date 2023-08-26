// src/components/TodoApp.js
import React, { useState ,useEffect} from 'react';
import './TodoApp.css'
function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'complete') {
      return task.completed;
    }
    return true;
  });
  
  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  return (
    <div className="todo-app">
    <h1>Todo App</h1>
    <div>
    <button onClick={() => setFilter('all')}>All</button>
    <button onClick={() => setFilter('active')}>Active</button>
    <button onClick={() => setFilter('complete')}>Complete</button>
    </div>
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
      />
      <button onClick={addTask} className="todo-button">
        Add Task
      </button>
    </div>
    <div className="todo-list">
      {/* Display tasks */}
      {filteredTasks.map((task, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {
             const updatedTasks = [...tasks];
              updatedTasks[index].completed = !updatedTasks[index].completed;
              setTasks(updatedTasks);
            }}
          />
          <span>{task.text}</span>
          <button onClick={() => removeTask(index)}  className="clear-button">Del</button>
        </div>
      ))}
       </div>
       <button onClick={() => setTasks([])} className="clear-button">
        Clear All
        </button>
    </div>
  );
}
export default TodoApp;