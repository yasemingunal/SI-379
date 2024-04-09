import React, {useState, useRef} from 'react';

function App() {
  //set up constants:
  const [tasks, setTasks] = useState([]);
  //const [timer, setTimer] = useState(null);

  const [workTimer, setWorkTimer] = useState(25);
  const [breakTime, setBreakTime] = useState(0);

  const taskInpRef = useRef();
  const workTimerRef = useRef();
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

  function handleRemove(idx){
    const newTasks = tasks.filter((task, taskIdx) => taskIdx !== idx);
    setTasks(newTasks);
    storeState(newTasks)
    //setTasks(tasks.filter((task, taskIdx) => taskIdx !=== idx)) //remove task at that idx
  }

  function onKeyDown(ev) {
    if (ev.key === 'Enter'){
      addNewTask();
    }
  }

  function startTimer(){
    setWorkTimer(workTimerRef.current.value);
    clearInterval(workTimerRef);

    workTimerRef.current = setInterval(() => {
      setWorkTimer((previousTimeLeft) => {
        if (previousTimeLeft <= 0){
          clearInterval(workTimerRef.current);
          return 0;
        } else {
          return previousTimeLeft - 1
        }
      });
    }, 1000);
  }


  return (
    <div class="taskList">
      <ul>{tasks.map(newTask => <li key={newTask}>{newTask}
                    <button onClick={() => handleRemove(newTask)}>Remove</button>
                    <div>{workTimer} <button onClick={startTimer}>Start</button> </div>
                    </li>)}</ul>
    <input type="text" ref={taskInpRef} onkeyDown={onKeyDown}></input>

    <button class="addTask" onClick={addNewTask}>Add Task</button>

    <div class="timers"> 
    <p>Work Time (in min)  &nbsp;&nbsp;   &nbsp;    Break Time (in min)</p>
    
    <input ref={workTimerRef} defaultValue="25" min="1" type="number"></input> <input defaultValue="5" min="1" type='number'></input>
    </div>
    
    </div>
    
  );
}

export default App;
