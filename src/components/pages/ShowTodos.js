import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

function ShowTodos() {
  const { userData, setUserData } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const deleteTodo = async (id) => {
    await Axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: { 'x-auth-token': userData.token },
    });
    fetchTodos();
    //refresh page or update state force refresh
  };

  const fetchTodos = async () => {
    const todosResponse = await Axios.get('http://localhost:5000/todos/all', {
      headers: { 'x-auth-token': userData.token },
    });
    setTodos(todosResponse.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      show todos
      {todos.map((todo) => {
        return (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>X</button>
          </li>
        );
      })}
    </div>
  );
}

export default ShowTodos;
