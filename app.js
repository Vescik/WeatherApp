let key = '6ad27e4a9c5d4f20a4b55d4c4eb7db7e';
let url = `https://api.weatherbit.io/v2.0/forecast/daily?city_id=756135&key=${key}&lang=pl`;

let temperature = document. querySelectorAll('.celsius');


const forecast = document.querySelectorAll('.dateWeek');
const date = document.querySelector('.date');
const place = document.querySelector('.place');
const degree = document.querySelector('.degree');
const weather = document.querySelector('.description');
const img = document.querySelectorAll('.img');
const btn = document.querySelector('.getLocation');
const container = document.querySelector('.container');
const loadingCircle = document.querySelector('.lds-dual-ring');

window.onload = function () {
setTimeout(function () {
loadingCircle.style.display = 'none';
container.style.display = 'flex'
},3000 )};

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

    let urlGeo = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${long}&key=${key}&lang=pl`;
    fetch(urlGeo)
        .then(response => response.json())
        .then(data =>{
            setForecastData(data)
        })
};

btn.addEventListener('click', getLocation);

const setForecast = () =>{
    fetch(url)
        .then(response => response.json())
        .then(data => {
            setForecastData(data)
        })
};

function setForecastData(data) {
    for(let i = 0; i<=5; i++){
        if(i > temperature.length -1 ){
            continue
        }
        temperature[i].innerHTML = data.data[i].temp + '°';;
        let icon = data.data[i].weather.icon;
        img[i].src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

        degree.innerHTML=data.data[0].temp + '°';

        date.innerHTML = data.city_name;
        weather.innerHTML=data.data[i].weather.description   ;
    }
}

function setDaysOfWeek() {
    const dayOfWeek = ['Niedz','Pon','Wt','Śr','Czw','Pt','Sob',];
    let now = new Date();
    let numericDay = now.getDay();
    let g = numericDay;
    let j = 0;
    //add +1 cuz forecast length === 3
    for(let i = 0; i < forecast.length ; i++){
            // let loop set different value for each li `
            if(j > forecast.length+1){continue}
            console.log(dayOfWeek[i]);
            console.log(numericDay);
            forecast[j].innerHTML = dayOfWeek[g];
            // if array ends start counting from the beginning
        !(g >= 6) ? g++ :g = 0;
            console.log(j);
            j++;
    }
}

function setTime() {place.innerHTML= moment().format('MMMM Do YYYY, h:mm:ss a');}
setInterval(setTime,1000);
setDaysOfWeek();
setForecast();





