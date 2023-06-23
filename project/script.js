// Obtendo referência para o elemento <h2> com a classe "temperature-viewer"
const temperatureViewer = document.querySelector('.temperature-viewer');

// Função para buscar a temperatura atual usando a API OpenWeatherMap
function getTemperatureByLocation(latitude, longitude) {
  const apiKey = 'ffc0aeb94a875c839c1cb189e680be76'; // Substitua com sua chave de API do OpenWeatherMap
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      temperatureViewer.textContent = `Current Temperature: ${temperature}°C`;
    })
    .catch(error => {
      console.log('Error:', error);
      temperatureViewer.textContent = 'Failed to fetch temperature';
    });
}

// Função para obter as coordenadas geográficas
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getTemperatureByLocation(latitude, longitude);
      },
      error => {
        console.log('Error:', error);
        temperatureViewer.textContent = 'Failed to fetch temperature';
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
    temperatureViewer.textContent = 'Geolocation is not supported';
  }
}

// Chamada da função para obter a temperatura atual pela localização
getLocation();
