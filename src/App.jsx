import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Instruction from './Instruction'
const App = () => {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isClick, setClick] = useState(false);
  const [cont, setCont] = useState()
  const [show, setShow] = useState(false)
  const URL = import.meta.env.VITE_SERVER_URL;

  const handleAddTodo = () => {
    axios.post(`${URL}/todos/`, { text: newTodo }).then((res) => {
      setTodos([...todos, res.data.todo]);
      setNewTodo('');
    }).catch((e) => {
      console.log("Error add todo:", e);
    })
  };

  const fetchTodos = () => {
    axios.get(`${URL}/todos`)
      .then((res) => {
        setTodos(res.data.todos);
        setClick(false);
        setNewTodo('')
        setShow(false) 
      })
      .catch((error) => {
        console.log("Error fetching todos:", error);
      });
  };

  const handleStatus = (key_id) => {
    axios.put(`${URL}/todos/${key_id}`)
      .then((res) => {
        console.log(res.data.todo.completed);
        fetchTodos()

      })
      .catch((e) => {
        console.log("Error updating status:", e);
      });
  };

  const handleDelete = (key_id) => {
    axios.delete(`${URL}/todos/${key_id}`).then((res) => {
      fetchTodos()
    })
      .catch((e) => {
        console.log("Error deleting todo:", e);
      });
  };

  const handleUpdate = (todo) => {
    setNewTodo(todo.text);
    setCont(todo._id);
    setClick(true);
  }

  const handleUpdateOnDb = () => {
    axios.put(`${URL}/todos/update/${cont}`, { text: newTodo }).then((res) => {
      fetchTodos();

    })
      .catch((e) => {
        console.log("Error deleting todo:", e);
      });
  }


  useEffect(() => {
    fetchTodos();
  }, []);



  return (

    <div className='bg-red-400 flex flex-col pt-3 items-center relative h-screen'>
      <div>
        {show ? (
          <Instruction text= "double click for update value"></Instruction>
        ) : (<div></div>)
        }
      </div>
      <h1 className='text-center text-4xl'>MERN Todo <span className='text-6xl font-bold '>A</span>pp</h1>
      <div className='flex justify-center w-[100%] items-center max-md:flex-wrap  mt-4'>
        <input className='m-2 md:m-5  max-md:w-full text-2xl outline-none p-2'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        {isClick ?
          (
            <button title='Update Value' className='bg-green-600 relative hover:bg-blue-500 active:animate-bounce text-white p-2 h-fit m-4 rounded-xl' onClick={handleUpdateOnDb} >
              <span className='absolute right-0 top-[-10px]'>
                <span className="relative flex  h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </span>
              Update
            </button>) :
          (
            <button title='Add Value' className='bg-green-600 relative hover:bg-blue-500 active:animate-bounce text-white p-2 h-fit m-4 rounded-xl' onClick={handleAddTodo} >
              <span className='absolute right-0 top-[-10px]'>
                <span className="relative flex  h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </span>
              Add Todo
            </button>
          )
        }
      </div>




      <ul className='bg-black w-[100%]  md:w-11/12 flex-1 overflow-auto'>


        {todos.map((todo) => (

          <li key={todo._id} onMouseEnter={() => { setShow(true) }} onMouseLeave={() => { setShow(false) }} className='bg-gray-400 items-center justify-between flex md:p-2 m-2 text-2xl rounded'>
            <div onDoubleClick={() => handleUpdate(todo)} className='flex-1  p-2' >
              {todo.text}
            </div>
            <div className=' md:flex'>
              <button title='Update Status' onClick={() => handleStatus(todo._id)} className='bg-green-400 active:animate-bounce rounded p-2 m-2 w-[40px]' style={{ background: !todo.completed ? 'green' : 'red' }}>
                {!todo.completed ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}
              </button>

              <button title='Delete Item' onClick={() => handleDelete(todo._id)} className='bg-red-600 active:animate-bounce rounded m-2 p-2'>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>))
        }

      </ul>
    </div>
  );
};

export default App;
