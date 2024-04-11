import React, {useState, useRef} from 'react';

function App() {
  const [tasks, setTasks] = useState([])
  const [focus, setFocus] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [breakTimerRunning, setBreakTimerRunning] = useState(false);

  const [workTimer, setWorkTimer] = useState(25);
  const [breakTimer, setBreakTimer] = useState(5);
  const [timerId, setTimerId] = useState(null)

  const taskInpRef = useRef();
  const workTimerRef = useRef();
  const breakTimeRef = useRef();

  function storeState(newTasks){
    localStorage.setItem("todos", JSON.stringify(newTasks));
  }

  function addNewTask() {
    const newTask = {
      description: taskInpRef.current.value,
      number:0,
    };

    setTasks(tasks.concat(newTask));
    taskInpRef.current.value = "";
    storeState(tasks);
  } 

  function handleRemove(idx){
    setTasks(tasks.filter((task, index) => index !== idx));
  }

  function startTimer(idx){
    setTimerRunning(true);
    setBreakTimerRunning(false);
    clearInterval(timerId);
    const inputTime = parseInt(workTimerRef.current.value);
    const minutes = Math.floor(inputTime / 60);
    const seconds = inputTime % 60;
    setWorkTimer(`${minutes} : ${seconds}`);

    const id = setInterval(() => {
      setWorkTimer((previousTimeLeft) => {
        if (previousTimeLeft <= 0){
          clearInterval(id);
          startBreak(idx);
          setTimerRunning(false);
          return 0;
        } else {
          if (seconds === 0 && minutes > 0) {
            return (minutes - 1) * 60 + 59;
          } else {
            return previousTimeLeft - 1;
          }
        }
      });
    }, 1000);
    setTimerId(id);
    setFocus(idx);
  }

  function startBreak(idx) {
    setTimerRunning(false);
    clearInterval(timerId);
    setBreakTimerRunning(true);
    setBreakTimer(parseInt(breakTimeRef.current.value));
    const id = setInterval(() => {
      setBreakTimer(prevTimeleft => {
        if (prevTimeleft <= 0) {
          setBreakTimerRunning(false);
          clearInterval(id);
          setTasks(tasks.map((task, index) => index === idx ? {...task, number: task.number + 1} : task)); //learned this concept from Stack Overflow & ChatGPT 
          return 0;
        } else {
          return prevTimeleft - 1;
        }
      });
    }, 1000);
    setTimerId(id);
    setOnBreak(idx);
  }
  
  function resetTimer() { 
    setTimerRunning(false);
    setBreakTimerRunning(false);
    clearInterval(timerId);

  }

  return (
    <div class="taskList">
      <h1>What do you want to do?</h1>
     
      <ul>{tasks.map((newTask, idx) => 
              (<li key={idx}>
                <input type='text' 
                value={newTask.description} 
                number={newTask.number}
                style = {{color:'darkblue'}} 
                onChange={(e) => {
                  const updatedTaskList = [...tasks];
                  updatedTaskList[idx] = e.target.value
                  setTasks(updatedTaskList);
                  storeState(updatedTaskList);
                }}/>
                  
                    <button onClick={() => handleRemove(idx)}>Remove</button>
                    {(!timerRunning && !breakTimerRunning) && <button onClick={() => startTimer(idx)}>Start Task</button>}
                    {(timerRunning || breakTimerRunning) && (<button onClick={resetTimer}>Cancel</button>)}
                    {(focus === idx) && (<div> <div>Work for: {workTimer}</div></div>)}
                    {(onBreak === idx) && (<div><div>Break for: {breakTimer}</div></div>)}
                  <div>Completed: {newTask.number} times</div>
                </li>))}
        </ul>

        <input type="text" defaultValue="Task Description" ref={taskInpRef} onKeyDown={(e) => e.key==='Enter' && addNewTask(e.target.value)} ></input>

    <button class="addTask" onClick={addNewTask}>Add Task</button>

    <div class="timers"> 
    <div class='workTimerSetup'>
      <p>Work Time (in min)</p> 
      <input ref={workTimerRef} defaultValue="25" min="1" type="number"></input>
    </div>
    <div class='breakTimerSetup'>
      <p> Break Time (in min)</p>
      <input ref={breakTimeRef} defaultValue="5" min="1" type='number'></input>
    </div>

    </div>
    
    </div>
    
  );
}

export default App;
