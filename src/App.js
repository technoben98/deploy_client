import {useState, useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const [weather,setWeather] = useState({})
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const send = () => {
   if(name){
    fetch(`${BASE_URL}/api/${name}`)
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setData(data.message);
      })
      .catch((e) => console.log(e));
    }
  }

  useEffect(()=>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=c707f05e6ee4c6a3af2dc3255a317531')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setWeather(data);
    })
    .catch(e=>{
      console.log('eeeeee=>',e);
    })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "write your name..." : data}</p>
        <input onChange={(e)=>setName(e.target.value)}/>
        <button onClick={()=>send()}>Send</button>
      </header>
    </div>
  );
}

export default App;
