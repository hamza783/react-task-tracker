import './App.css';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }

  //add task
  const addTask = async (task) => {
  //  const id = Math.floor(Math.random() * 10000)
  //  task.id= id
    const res = await fetch("http://localhost:5000/tasks/", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([ ...tasks, data])
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    console.log("delete")
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    taskToToggle.reminder = !taskToToggle.reminder

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(taskToToggle)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, reminder: data.reminder } 
        : task
      )
    )
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route path='/'
            exact
            element={
              <>
                { showAddTask && <AddTask addTask={addTask}/> }
                {tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> 
                : <p>No Tasks to Show</p>}
              </>
          } />
          <Route path='/about' element={<About />} />
        </Routes >
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
