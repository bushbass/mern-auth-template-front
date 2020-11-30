import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

function AddTodo() {
  const [currentTodo, setCurrentTodo] = useState('');
  const { userData, setUserData } = useContext(UserContext);

  const submitForm = async () => {
    //get title from state
    //get token from context
    //send it to backend
    //redirect to showtodos page
    try {
      const newTodo = {
        title: currentTodo,
        token: userData.token,
      };
      await Axios.post(
        'https://mern-auth-template-back.herokuapp.com/todos',
        newTodo,
        { headers: { 'x-auth-token': userData.token } }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {console.log(userData)}
      <h1>Add new todo page</h1>
      <form onSubmit={submitForm}>
        <input
          type='text'
          onChange={(e) => setCurrentTodo(e.target.value)}
          value={currentTodo}
        />
      </form>
    </div>
  );
}

export default AddTodo;
