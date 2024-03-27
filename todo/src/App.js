import './App.css';
import React from 'react';


function App(props) {
  const [todos, setTodos] = React.useState(['Buy milk', 'Buy eggs']);
  const todoElements = todos.map((todo, idx) => <li key={idx}>{todo}</li>);
  const inputRef = React.useRef();
  const handleClick = () => { 
    const inputElement = inputRef.current;
    console.log(inputElement.value);
  }
  return <div>
    <ul>{todoElements}</ul>
    <input type='text' ref={inputRef}/>
    <button onClick={handleClick}>Add</button>
  </div>
}

export default App;
