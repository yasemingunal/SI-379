
import React, {useRef} from 'react';
import './App.css';

//let keys = ['C', 'C#', 'D', 'D#', 'E', "X", 'F','F#', 'G', 'G#', 'A', 'A#', 'B', 'X'];
let whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
let blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];


function App() {
  const [keyClickColor, setKeyClickColor] = React.useState(0);

  const keyRef = React.useRef();
  
  const keyClicked = () => { 
    setKeyClickColor("lightgray");
    setTimeout(() => { 
      setKeyClickColor(0);
    }, 1000);
    console.log("clicked");
  }


  return (

    <div className="piano">
      {keys.map((currKey) => (<div key = {currKey.id} className='key' onClick={keyClicked} style={{backgroundColor:keyClickColor}}></div>))}
      {/* {keys.map((key, idx) => (<div key={idx} className='key' onClick={() =>keyClicked(key)} style={{ backgroundColor: keyClickColor[key] }}></div>))}  */}
      {/* {keys.map(key => (<div className='key' onClick={keyClicked} style={{ backgroundColor: keyClickColor }}></div>))}  */}
{/* map works similar to for loops in plain JS */}
        </div>
  );
}

export default App;


