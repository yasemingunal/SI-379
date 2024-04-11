import React, {useState, useRef} from 'react';

function App() {
  //set up constants:
  const [tasks, setTasks] = useState([])
  const [focus, setFocus] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [numTimesStarted, setNumTimesStarted] = useState(0);

  const [workTimer, setWorkTimer] = useState(25);
  const [breakTimer, setBreakTimer] = useState(5);
  const [timerId, setTimerId] = useState(null)

  const taskInpRef = useRef();
  const workTimerRef = useRef();
  const breakTimeRef = useRef();

  //set up functions:
  function storeState(newTasks){
    localStorage.setItem("todos", JSON.stringify(newTasks));
  }

  function addNewTask() {
    const newTask = {
      description: taskInpRef.current.value,
      number:0
    };

    setTasks(tasks.concat(newTask));
    taskInpRef.current.value = "";
    storeState(tasks);
  } 

  function handleRemove(idx){
    setTasks(tasks.filter((task, index) => index !== idx));
  }

  function startTimer(idx){
    clearInterval(timerId);
    setWorkTimer(parseInt(workTimerRef.current.value) *10);

    const id = setInterval(() => {
      setWorkTimer((previousTimeLeft) => {
        if (previousTimeLeft <= 0){
          clearInterval(id);
          startBreak();
          return 0;
        } else {
          return previousTimeLeft - 1;
        }
      });
    }, 1000);
    setTimerRunning(true);
    setTimerId(id);
    setFocus(idx);
    

    setTasks(tasks.map((task, index) => index === idx ? {...task, number: task.number + 1} : task));

  }

  function startBreak() {
    clearInterval(timerId);
    setBreakTimer(parseInt(breakTimeRef.current.value) * 10);
    const id = setInterval(() => {
      setBreakTimer(prevTimeleft => {
        if (prevTimeleft <= 0) {
          clearInterval(id);
          return 0;
        } else {
          return prevTimeleft - 1;
        }
      });
    }, 1000);
    setTimerId(id);
  }
  
  function resetTimer() { 
    setTimerRunning(false);
    clearInterval(timerId);
  }

  return (
    <div class="taskList">
      <h1>Set up your to do list and timer below!</h1>
     
      <ul>{tasks.map((newTask, idx) => 
              (<li key={idx}>
                <input type='text' 
                value={newTask.description}  
                onChange={(e) => {
                  const updatedTaskList = [...tasks];
                  updatedTaskList[idx] = e.target.value
                  setTasks(updatedTaskList);
                  storeState(updatedTaskList);
                }}/>
                  
                    <button onClick={() => handleRemove(idx)}>Remove</button>
                    {!timerRunning && <button onClick={() => startTimer(idx)}>Start Task</button>}
                    {timerRunning && (<button onClick={resetTimer}>Cancel</button>)}
                    {focus === idx && (<div>
                <div>Work for: {workTimer} seconds</div>
                
                
              
              </div>)}
              
              <div>Break for: {breakTimer} seconds</div>
              <div>Started: {tasks.number} times</div>
                </li>))}
        </ul>

        <input type="text" ref={taskInpRef} onKeyDown={(e) => e.key==='Enter' && addNewTask(e.target.value)} ></input>

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
