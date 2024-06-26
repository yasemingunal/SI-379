import React, {useEffect, useState, useRef} from 'react';

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
    setTimerRunning(false);
    clearInterval(timerId);
    setTasks(tasks.filter((task, index) => index !== idx));
    storeState(tasks);
  }

  function startTimer(idx){
    setTimerRunning(true);
    setBreakTimerRunning(false);
    clearInterval(timerId);
    const inputTime = parseInt(workTimerRef.current.value) * 60;
    setWorkTimer(inputTime);

    const id = setInterval(() => {
      setWorkTimer((previousTimeLeft) => {
        if (previousTimeLeft <= 0){
          alert("Great work, now enjoy a break!");
          clearInterval(id);
          startBreak(idx);
          setTimerRunning(false);
          return 0;
        } else {
          return previousTimeLeft - 1;
      }});
    }, 1000);
    setTimerId(id);
    setFocus(idx);
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; //learned how to add trailing/leading 0s from stack overflow
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  function startBreak(idx) {
    setTimerRunning(false);
    clearInterval(timerId);
    setBreakTimerRunning(true);
    setBreakTimer(parseInt(breakTimeRef.current.value) * 60);
    const id = setInterval(() => {
      setBreakTimer(prevTimeleft => {
        if (prevTimeleft <= 0) {
          setBreakTimerRunning(false);
          clearInterval(id);
          setTasks(tasks.map((task, index) => index === idx ? {...task, number: task.number + 1} : task)); //learned this concept from Stack Overflow 
          return 0;//{faFaceSmileWink};//<FontAwesomeIcon icon= />;
        } else {
          return prevTimeleft - 1;
        }
      });
    }, 1000);
    setTimerId(id);
    setOnBreak(idx);
    storeState(tasks);
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
                    {(!timerRunning && !breakTimerRunning) && <button class="startButton" onClick={() => startTimer(idx)}>Start Task</button>}
                    {(timerRunning || breakTimerRunning) && (<button onClick={resetTimer}>Cancel</button>)}
                    {(focus === idx) && (<div> <div class="timeMessage">Work for: {formatTime(workTimer)} seconds</div></div>)}
                    {(onBreak === idx) && (<div><div class="timeMessage">Break for: {formatTime(breakTimer)} seconds</div></div>)}
                  <div>Completed: {newTask.number} times 
                 </div>
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