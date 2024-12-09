document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city-input');
  const btn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameEl = document.getElementById('city-name');
  const temperatureEl = document.getElementById('temperature');
  const descriptionEl = document.getElementById('description');
  const errMsg = document.getElementById('error-message');
  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";
  btn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchData(city);
      displayWeather(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not Found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeather(data) {
    console.log(data);
    const { name, main, weather } = data; 

    cityNameEl.textContent = `City: ${name}`; 
    temperatureEl.textContent = `Temperature: ${main.temp}°C`;
    descriptionEl.textContent = `Description: ${weather[0].description}`;

    weatherInfo.classList.remove('hidden'); 
    errMsg.classList.add('hidden'); 
  }

  function showError() {
    weatherInfo.classList.add('hidden'); 
    errMsg.classList.remove('hidden');
  }
});
