const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// update the UI function

const updateUI = (data) =>{

     console.log(data)
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructure properties - replaces the above code
    const {cityDetails, weather} = data;

    // update details template
    details.innerHTML= `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/dat icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    // let timeSrc = null;
    // if(weather.IsDayTime){
    //   timeSrc = 'img/day.svg';
    // } else {
    //   timeSrc = 'img/night.svg';
    // }
    // time.setAttribute('src', timeSrc);
  

    // remove d-none class if present
     if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
     }
};

const updateCity = async (city)=>{

    //console.log(city)
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather }; // Object shorthand Notation

        // return {
        // cityDetails: cityDetails,
        // weather: weather
        // }
 
};

cityForm.addEventListener('submit', e =>{
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});