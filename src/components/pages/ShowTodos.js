import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

function ShowTodos() {
  const { userData } = useContext(UserContext);
  const [todos, setTodos] = useState([]);

  const fetchTodos = async (token) => {
    const todosResponse = await Axios.get('http://localhost:5000/todos/all', {
      headers: { 'x-auth-token': token },
    });
    setTodos(todosResponse.data);
  };

  useEffect(() => {
    fetchTodos(userData.token);
  }, [userData.token]);

  const deleteTodo = async (id) => {
    await Axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: { 'x-auth-token': userData.token },
    });
    fetchTodos(userData.token);
  };

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
