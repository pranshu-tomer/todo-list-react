import { useEffect, useState } from 'react'
import {TodoProvider} from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  // state me saare todo hai
  const [todos,setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prevTodo) => [{id:Date.now(),todo,completed:false},...prevTodo])
  }

  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((prev) => (prev.id === id ? todo : prev)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    // delete karne ke liye map na use karo to sahi hai
  }

  const completeTodo = (id) => {
    setTodos((prev) => prev.map((prev) => prev.id === id ? {...prev, completed: !prev.completed} : prev))
  }

  useEffect(() => {
    const to = JSON.parse(localStorage.getItem('todos'))
    if(to && to.length > 0){
      setTodos(to)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,completeTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ TodoProvider>
  )
}

export default App










