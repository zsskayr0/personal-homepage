const temperatureViewer = document.querySelector('.temperature-viewer');
const greetingElement = document.querySelector('.greeting');
const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results-list');
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

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

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredWebsites = websites.filter(website =>
    website.name.toLowerCase().includes(searchTerm)
  );

  displayResults(filteredWebsites);

  if (searchTerm.trim() !== '') {
    overlay.classList.add('active');
  } else {
    overlay.classList.remove('active');
  }
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

// Função para aplicar a classe 'active' aos elementos, exceto #search-container, quando o campo de pesquisa recebe o foco
function handleSearchFocus() {
  const elements = document.querySelectorAll(`#${overlay.id} > :not(#search-container)`);
  elements.forEach(element => {
    element.classList.add('active'); // Adiciona a classe 'active' aos elementos
  });
}

// Função para remover a classe 'active' dos elementos, exceto #search-container, quando o campo de pesquisa perde o foco
function handleSearchBlur() {
  const elements = document.querySelectorAll(`#${overlay.id} > :not(#search-container)`);
  elements.forEach(element => {
    element.classList.remove('active'); // Remove a classe 'active' dos elementos
  });
}

// Adiciona os event listeners para os eventos de input, focus e blur no campo de pesquisa
searchInput.addEventListener('input', handleSearch);
searchInput.addEventListener('focus', handleSearchFocus);
searchInput.addEventListener('blur', handleSearchBlur);
