import * as React from 'react';


export default function App(){
  const [present, setPresent] = React.useState([]);
  const [absent, setAbsent] = React.useState([]);

  const inputRef = React.useRef();

  function addToPresent(){
    const name = inputRef.current.value;
    setPresent(present.concat(name));
    inputRef.current.value = "";

  }

  function addToAbsent(){
    const name = inputRef.current.value;
    setAbsent(absent.concat(name));
    inputRef.current.value = "";
  }

  function onKeyDown(ev){
    if (ev.key === 'Enter'){
      addToPresent();
    }
  }
  return (<div>
        <strong>Present:</strong>
        <ul>
            {present.map(name => <li key={name}>{name}</li>)}
        </ul>
        <strong>Absent:</strong>
        <ul>
            {absent.map(name => <li key={name}>{name}</li>)}
        </ul>
        <input ref={inputRef}
            onKeyDown={onKeyDown} // ADDED
            type="text" />
        <button onClick={addToPresent}>Add to present</button>
        <button onClick={addToAbsent}>Add to absent</button>
    </div>);
}


// export default function App(){
//   const [name, setName] = React.useState('World');
//   const inputRef = React.useRef();

//   function onChange() {
//     setName(inputRef.current.value);

//   }

//   return (<div>
//     <div>Hello, <strong>{name}</strong>!</div>
//     <input ref={inputRef}
//     type="text"
//     value={name}
//     onChange={onChange} />
//     </div>);
// }



// export default function ToggleButton() {
//   const [visible, setVisible] = React.useState(true);
//   function toggleVisibility() {
//     setVisible(!visible);
// }
//   return (<div>
//     <button onClick={toggleVisibility}>Toggle</button>
//     {visible && <span>Visible</span>}
//     </div>);
// }


// export default function App(){
//   return <div> <ToggleBlock/></div>
// }

// function ToggleBlock() {
//   const [color, setColor] = React.useState('red');


//   function toggleColor() { 
//     console.log('clicked');
//     if (color === 'red') {
//       setColor('blue')
//     } else{
//       setColor('red');
//     }
//   }

//   return <div style={{backgroundColor:'red', width:250, height:250}}
//   onClick={toggleColor}></div>
// }
