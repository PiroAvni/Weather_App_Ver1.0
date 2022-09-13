const key = 'uv75vl5tESmKDA95VNldIyaZPOpl5esT';


// get weather information
const getWeather = async (id)=>{
    const baseUrl ='http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();

    return data[0];
}

// get city information
const getCity = async(city)=>{
    const baseUrl ='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query =`?apikey=${key}&q=${city}`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();

    return data[0];
};
// test the api
// getCity('London').then(data => {
//     return getWeather(data.Key);
// }).then(data =>{
//     console.log(data)
// }).catch(err => console.log(err))

