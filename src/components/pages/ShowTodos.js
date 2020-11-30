import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

function ShowTodos() {
  const [todos, setTodos] = useState([]);
  const { userData } = useContext(UserContext);

  const deleteTodo = (id) => {
    Axios.delete(`https://mern-auth-template-back.herokuapp.com/todos/${id}`, {
      headers: { 'x-auth-token': userData.token },
    });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const todosResponse = await Axios.get(
        'https://mern-auth-template-back.herokuapp.com/todos/all',
        { headers: { 'x-auth-token': userData.token } }
      );

      setTodos(todosResponse.data);
    };

    fetchTodos();
  }, []);
  return (
    <div>
      <h1>show todos page</h1>
      {console.log(todos)}
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo._id}>
              {todo.title} <button onClick={deleteTodo(todo._id)}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ShowTodos;
