import Greeting from './Greeting';

export default function App(){
  const name = 'Yasemin';

  return <div>
    {/* <Greeting name = "Yasemin" department='UMSI'/>
    This is my first React application! */}
    <button onClick = {() => console.log("Clicked")}>Click me</button>
    </div>;
}