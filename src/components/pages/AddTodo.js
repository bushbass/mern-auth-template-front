import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddTodo() {
  const { userData } = useContext(UserContext);
  const [todoTitle, setTodoTitle] = useState('');
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    //get title from state
    //get token for headers from context
    //submit it to backend
    //redirect to showtodos page
    try {
      await Axios.post(
        'http://localhost:5000/todos/',
        { title: todoTitle },
        { headers: { 'x-auth-token': userData.token } }
      );
      history.push('/showTodos');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Add new todo</h1>
      <form onSubmit={submitForm}>
        <label htmlFor='todo-title'>New todo</label>
        <input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          id='todo-title'
          type='text'
        />
        <button>Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodo;
