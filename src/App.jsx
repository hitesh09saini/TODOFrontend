import React, { useState, useEffect } from 'react';
import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json', // You can set your desired content type here
  },
};

const App = () => {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const URL = import.meta.env.VITE_SERVER_URL;
  console.log(URL);

  const handleAddTodo = () => {
    axios.post(`${URL}/todos/`, { text: newTodo }).then((res) => {
      setTodos([...todos, res.data.todo]);
      setNewTodo('');
    }).catch((e) => {
      console.log("Error add todo:", e);
    })
  };

  const handleStatus = (key_id) => {
    axios.put(`${URL}/todos/${key_id}`).then((res) => {
      console.log(res.data.todo.completed);
    }).catch((e) => {
      console.log("Error update to status:", e);
    })
  }

  const handleDelete = (key_id) => {
    axios.delete(`${URL}/todos/${key_id}`).then((res) => {

    }).catch((e) => {
      console.log("Error Delete todo:", e);
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${URL}/todos`);
        console.log(res);
        setTodos(res.data.todos);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 900);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

  return (
    <div className='bg-red-400 flex flex-col items-center  h-screen'>
         <h1 className='text-center text-4xl'>MERN Todo <span className='text-6xl font-bold '>A</span>pp</h1>
      <div className='flex justify-center w-[100%] items-center max-md:flex-wrap  mt-4'>
        <input className='m-2 md:m-5  max-md:w-full text-2xl outline-none p-2'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <button className='bg-green-600 relative hover:bg-blue-500 active:animate-bounce text-white p-2 h-fit m-4 rounded-xl' onClick={handleAddTodo}>
          <span className='absolute right-0 top-[-10px]'>
            <span className="relative flex  h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </span>
          Add Todo</button>
      </div>

      <ul className='bg-black  w-[100%]  md:w-11/12 flex-1 overflow-auto'>

        {todos.map((todo) => (
          <li key={todo._id} className='bg-gray-400  m-2 items-center justify-between flex md:p-2 text-2xl rounded'>
            <div onDoubleClick={() => handleUpdate(todo._id)} className='relative w-11/12 pl-2 pr-2' title='double click for edit'>
              {todo.text}
            </div>
            <div className='w-[100px] md:flex'>
              <button onClick={() => handleStatus(todo._id)} className='bg-green-400 active:animate-bounce rounded p-2 m-2 w-[40px]' style={{ background: !todo.completed ? 'green' : 'red' }}>
                {!todo.completed ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}
              </button>

              <button onClick={() => handleDelete(todo._id)} className='bg-red-600 active:animate-bounce rounded m-2 p-2'>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>))}

      </ul>
    </div>
  );
};

export default App;
