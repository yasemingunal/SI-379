import React, {useState, useRef} from 'react';

function App() {
  //set up constants:
  const [tasks, setTasks] = useState([]);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const taskInpRef = useRef();
  const workTimeRef = useRef();
  const breakTimeRef = useRef();

  //set up functions:
  function storeState(newTasks){
    localStorage.setItem("todos", JSON.stringify(newTasks));
  }

  function addNewTask() {
    const newTask = taskInpRef.current.value;
    setTasks(tasks.concat(newTask));
    taskInpRef.current.value = "";
  } 

  function onKeyDown(ev) {
    if (ev.key === 'Enter'){
      addNewTask();
    }
  }

  function startTimer(task){
    const workTime = parseInt(workTimeRef.current.value);
    const breakTime = parseInt(breakTimeRef.current.value);
  }


  return (
    <div class="taskList">
      <ul>{tasks.map(newTask => <li key={newTask}>{newTask}
                    <button onClick={startTimer}>Start Task</button></li>)}</ul>
    <input type="text" ref={taskInpRef} onkeyDown={onKeyDown}></input>

    <button class="addTask" onClick={addNewTask}>Add Task</button>

    <div class="timers"> 
    <p>Break Time (in min)  &nbsp;&nbsp;   &nbsp;    Work Time (in min)</p>
    
    <input defaultValue="25" min="1" type="number"></input> <input defaultValue="5" min="1" type='number'></input>
    </div>
    
    </div>
    
  );
}

export default App;
