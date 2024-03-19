export default function Greeting(props){
    const {name} = props;
    return <span>Hello, <strong>{name}</strong>!</span>;
}