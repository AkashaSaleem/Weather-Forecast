import React, { useRef, useState } from 'react';
import search from '../Assets/search.png';
import humidity from '../Assets/humidity.png';
import wind from '../Assets/wind.png';
import spinner from '../Assets/Spinner.gif';
// import weather from '../Assets/Weather Icon.jpg'
import weather2 from '../Assets/weather-icon-png-2.png'

const Weather = () => {
  const api_key = '64d7a3257b552929019d1f3b2e27a045';
  const [datas, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const refs = useRef();
  const weather_search = async (city) => {
    if (city === '') {
      alert("Enter City name");
      return;
    }
    setLoading(true);
    try {
      const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      const response = await fetch(link);

      if (!response.ok) {
        alert("City not found");
      } else {
        const weather_data = await response.json();
        setData({
          icon: weather_data.weather[0].icon,
          city: weather_data.name,
          temperature: weather_data.main.temp,
          humidity: weather_data.main.humidity,
          wind_speed: weather_data.wind.speed,
          feels_like: weather_data.main.feels_like,
          temp_max: weather_data.main.temp_max,
          temp_min: weather_data.main.temp_min,
        });
      }
    } catch (error) {
      setData(null);
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen bg-purple-300">
        <div >
          <h1 className="text-4xl font-bold mt-10 animate-blink underline">Weather App</h1>
          
        </div>
        <div className="weather flex items-center flex-col my-4 border-solid border-4 border-yellow-500 shadow-lg
         shadow-cyan-900 bg-purple-500 rounded-2xl">
        <img className='sm:mt-4 h-[80px] w-[80px] mt-4 sm:items-center' src={weather2} alt="" />
          <div className="flex wrap mt-1">
            <input ref={refs} className="px-3 py-2 ml-4 mb-8 mt-4 items-center rounded-full outline-none"
              type="text" placeholder="Enter City name..."/>
            <img
              className="items-center w-[30px] mt-5 mr-4 ml-1 h-[30px] p-[3px] rounded-full bg-white cursor-pointer"
              src={search} alt="Search Icon" onClick={() => weather_search(refs.current.value)}/>
              
          </div>

          {loading ? (
            <img className="w-[100px] h-[100px] my-[50px]" src={spinner} alt="Loading" /> 
          ) : (
            datas && (
              <>
                <img
                  className="w-[150px] my-[10px] mx-0"
                  src={`http://openweathermap.org/img/wn/${datas.icon}@2x.png`}
                  alt="Weather Icon"
                />
                <p className="text-4xl text-white">{datas.temperature}°C</p>
                <p className="text-2xl mb-6 text-white">{datas.city}</p>
                <p className="text-1xl my-2 text-white">Feels like: {datas.feels_like}°C</p>
                <div className="text-white text-1xl flex justify-between w-full px-8">
                  <span>Max: {datas.temp_max}°C</span>
                  <span>Min: {datas.temp_min}°C</span>
                </div>

                <div className="weather-data flex mb-[30px] justify-start w-full mt-[30px] text-white">
                  <div className="col flex items-center gap-[12px]">
                    <img className="ml-5 w-[26px]" src={humidity} alt="Humidity" />
                    <div className="flex flex-col items-start">
                      <div className="text-1xl">{datas.humidity}%</div>
                      <span className="block text-1xl">Humidity</span>
                    </div>
                  </div>
                  <div className="col flex items-center gap-[12px]">
                    <img className="w-[26px] ml-4" src={wind} alt="Wind" />
                    <div className="flex flex-col items-start">
                      <div className="text-1xl">{datas.wind_speed}km/h</div>
                      <span className="block text-1xl">Wind</span>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
