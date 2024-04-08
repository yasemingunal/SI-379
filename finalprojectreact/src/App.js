

import './App.css';

let keys = ['C', 'C#', 'D', 'D#', 'E', 'F','F#', 'G', 'G#', 'A', 'A#', 'B', 'C'];
// let keys2 = ['C#', 'D#', 'F#', 'G#', 'A#']

function App() {
  return (
    <div className="piano">
      {keys.map(key => (<div className='key'></div>))} 
      {/* map works similar to for loops in plain JS */}
        </div>
  );
}

export default App;


