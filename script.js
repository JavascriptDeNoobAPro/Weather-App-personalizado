let container = document.getElementById("container");
let searchForm = document.getElementById("search__submit");
const searchInput = document.getElementById("search__input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

const displayBackgroundImage = (obj) => {
  let dateSpanish = new Date(obj.list[4].dt * 1000).toLocaleString("es-Es", {
    timeStyle: "short",
    dateStyle: "long",
  });
  date.textContent = ` Actualización
                     ${dateSpanish}
                     `;
  const dayHour = new Date(obj.list[4].dt * 1000).getHours();
  if (dayHour > 6 && dayHour < 18) {
    container.classList.remove("night");
    container.classList.add("day");
  } else {
    container.classList.remove("day");
    container.classList.add("night");
  }
};

const displayData = (obj) => {
  console.log(obj);
  temperatureDegrees.textContent = Math.floor(obj.list[0].main.temp);
  timeZone.textContent = obj.list[0].name;
  temperatureDescription.textContent =
    obj.list[0].weather[0].description.charAt(0).toUpperCase() +
    obj.list[0].weather[0].description.slice(1);
  const icon = obj.list[0].weather[0].icon;
  weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`;
  min.textContent = Math.floor(obj.list[0].main.temp_min);
  max.textContent = Math.floor(obj.list[0].main.temp_max);
};

const getWeatherData = async (city) => {
  const res = await fetch(
    `https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  displayBackgroundImage(data);
  displayData(data);
};

const submitCity = (e) => {
  e.preventDefault();
  getWeatherData(searchInput.value);
};

window.onload = () => {
  getWeatherData("Barcelona");
};

searchForm.addEventListener("submit", submitCity);
