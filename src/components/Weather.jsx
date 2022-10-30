import axios from "axios";
import { useEffect, useState } from "react";
import ChangeGrade from "./ChangeGrade";


const Weather = () => {

    const[weather, setWeather] = useState({});
    const [isFahrenheit, setIsFahrenheit] = useState(true);
   
    
    useEffect(()=> {

        const success = (pos) =>{

            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c6ee96c7e0ea5a5101c542857170198d
            `)
            .then(res => setWeather(res.data))
        }

       
        navigator.geolocation.getCurrentPosition(success);
    }, []);

    console.log(weather);

    const kelvin = weather.main?.feels_like;
    
    let gradeF =  Math.round((kelvin - 273.15) * 9/5 + 32); 

    let celsius = Math.round((gradeF - 32) * 5/9);
    

    return (
        <div className="card flex">
            <h1>{weather.name}, {weather.sys?.country}</h1>
            <h2>{weather.weather?.[0].main}</h2>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="`climate" className="img-climate"/>
            <p>{isFahrenheit? gradeF: celsius} {isFahrenheit? "°F": "°C"}</p>
            <ChangeGrade isFahrenheit={isFahrenheit} setIsFahrenheit={setIsFahrenheit}/>
        </div>
    );
};

export default Weather;