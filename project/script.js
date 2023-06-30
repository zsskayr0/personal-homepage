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

// Obtendo referência para o elemento <h1> com a classe "greeting"
const greetingElement = document.querySelector('.greeting');

// Função para obter o horário atual em Brasília
function getCurrentTime() {
  const date = new Date();
  const options = { timeZone: 'America/Sao_Paulo', hour: 'numeric' };
  return date.toLocaleTimeString('en-US', options);
}

// Função para exibir a saudação apropriada com base no horário
function displayGreeting() {
  const currentTime = getCurrentTime();

  if (currentTime >= 6 && currentTime < 12) {
    greetingElement.textContent = 'Good morning Diogo,';
  } else if (currentTime >= 12 && currentTime < 18) {
    greetingElement.textContent = 'Good afternoon Diogo,';
  } else {
    greetingElement.textContent = 'Good evening Diogo,';
  }
}

// Chamada da função para exibir a saudação atual
displayGreeting();

const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');
const websites = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  // Adicione mais sites ao array conforme necessário
];

searchInput.addEventListener('input', handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredWebsites = websites.filter(website =>
    website.name.toLowerCase().includes(searchTerm)
  );

  displayResults(filteredWebsites);
}

function displayResults(filteredWebsites) {
  resultsList.innerHTML = '';

  filteredWebsites.forEach(website => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = website.url;
    a.textContent = website.name;
    li.appendChild(a);
    resultsList.appendChild(li);
  });
}
