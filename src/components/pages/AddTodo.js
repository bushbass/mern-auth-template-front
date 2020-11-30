import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';
import UserContext from '../../context/UserContext';

function AddTodo() {
  const [currentTodo, setCurrentTodo] = useState('');
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await Axios.post(
        'https://mern-auth-template-back.herokuapp.com/todos',
        { title: currentTodo },
        { headers: { 'x-auth-token': userData.token } }
      );
    } catch (error) {
      console.log(error);
    }
    history.push('/showTodos');
  };
  return (
    <div>
      <h1>Add new todo page</h1>
      <form onSubmit={submitForm}>
        <input
          type='text'
          onChange={(e) => setCurrentTodo(e.target.value)}
          value={currentTodo}
        />
        <input type='submit' value='Add new todo' />
      </form>
    </div>
  );
}

export default AddTodo;
