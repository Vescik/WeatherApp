let key = '6ad27e4a9c5d4f20a4b55d4c4eb7db7e';
let url = `https://api.weatherbit.io/v2.0/current?city=Warsaw,NC&key=${key}`;
let url2 = `https://api.weatherbit.io/v2.0/forecast/daily?city=Warsaw,NC&key=${key}`;
let temperature = document. querySelectorAll('.celsius');




const date = document.querySelector('.date');
const place = document.querySelector('.place');
const degree = document.querySelector('.degree');
const weather = document.querySelector('.description');
const img = document.querySelectorAll('.img');
const btn = document.querySelector('.getLocation');




const getLocation = () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation);
        console.log('success');
    }else {
        console.log('error')
    }
};

const showLocation = (position) =>{
    console.log(position.coords.latitude);
   let lat = position.coords.latitude.toFixed(3);
    let long = position.coords.longitude.toFixed(3);

    let urlGeo = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${long}&key=${key}&lang=pl`;
    fetch(urlGeo)
        .then(response => response.json())
        .then(data =>{
            setCoords(data)
        })
};

btn.addEventListener('click', getLocation);

const todayForecast = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            setCoords(data)

        });
};

const nextWeekForecast = () =>{
    fetch(url2)
        .then(response => response.json())
        .then(data => {
            setCoords(data)

        })
};

function setCoords(data) {
    for(let i = 0; i<=16;i++){
        if(i > temperature.length - 1){
            continue
        }
        temperature[i].innerHTML = data.data[i].temp + '°';;
        let icon = data.data[i].weather.icon;
        img[i].src = `https://www.weatherbit.io/static/img/icons/${icon}.png`



        date.innerHTML = data.data[i].city_name;
        place.innerHTML=data.data[i].ob_time;
        degree.innerHTML=data.data[i].temp + '°';
        weather.innerHTML=data.data[i].weather.description   ;
    }
}


todayForecast();
nextWeekForecast();

