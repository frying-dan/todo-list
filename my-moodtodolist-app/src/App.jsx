import { useState } from 'react'
import './App.css'

function App() {
  const [mood, setMood] = useState('')
  const [task, setTask] = useState('')
  const [todos, setTodos] = useState([])

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (task.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: task, mood, completed: false }])
      setTask('')
    }
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="App">
      <h1>Mood-based To-Do List</h1>
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="energetic">Energetic</option>
        <option value="calm">Calm</option>
      </select>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <h2>Todos for {mood} mood:</h2>
      <ul>
        {todos
          .filter(todo => todo.mood === mood)
          .map(todo => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              <button onClick={() => handleToggleComplete(todo.id)}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default App
