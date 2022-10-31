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
    
    let gradeF =  ((kelvin - 273.15) * 9/5 + 32).toFixed(2); 

    let celsius = ((gradeF - 32) * 5/9).toFixed(2);
    

    return (
        <div className="card flex">
            <h1>
                <i className="fa-solid fa-location-dot"></i>
                {weather.name}, {weather.sys?.country}
                </h1>
            <h2>{weather.weather?.[0].main}</h2>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="`climate" className="img-climate"/>

            <div className="container-info">
            <p className="flex-i">
                <i className="fa-solid fa-temperature-three-quarters i"></i>
               <span>temp:</span> {isFahrenheit? gradeF: celsius} {isFahrenheit? "°F": "°C"}
            </p>
            <p className="flex-i">
            <i className="fa-solid fa-droplet i"></i>
            <span>humidity:</span> {weather.main?.humidity}%
            </p>
            <p className="flex-i">
                <i className="fa-solid fa-wind i"></i>
                <span>wind speed:</span> {(weather.wind?.speed * 3.6).toFixed(2)} kph
            </p>
            </div>

            <ChangeGrade isFahrenheit={isFahrenheit} setIsFahrenheit={setIsFahrenheit}/>
        </div>
    );
};

export default Weather;