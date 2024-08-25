import './App.css'; 
import React, { useState } from 'react';
import Weather from './components/Weather';
import Start from './components/Start';

function App() {
  const [showWeather, setShowWeather] = useState(false);

  return (
    <div>
      {showWeather ? (
        <Weather />
      ) : (
        <Start onGetStarted={() => setShowWeather(true)} />
      )}
    </div>
  );
}

export default App;
