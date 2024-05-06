

let search = document.querySelector("#search-input");

let city = document.querySelector("#city-name")
let temp = document.querySelectorAll("#temp")
let wind = document.querySelectorAll("#wind")
let humidity = document.querySelectorAll("#humidity")
let climate = document.querySelectorAll(".climate-icon")
let forecast = document.querySelector(".forecast")

let searchbtn = document.querySelector("#search-btn")
let weatherIcon = document.querySelector(".weather-icon")
let weatherName = document.querySelector("#weather-name")
let selectCity = document.querySelector("#selectcity")

weatherIcon.src = "./images/clear.png";

async function checkweather(search) {

    try {

        // Fetching Weather Data from the Server
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=6f741caebe69043710b750f87020a3e1`)

        // Data Response Validation
        if (response.status == 404) {
            temp.innerHTML = 0 + "°C";
            humidity.innerHTML = 0 + "%"
            wind.innerHTML = 0 + " km/h"
            city.innerHTML = "No Record Found"
        }

        const data = await response.json()

        // Validation if Input field is empty or not
        if (search == "") {
            temp.innerHTML = 0 + "°C";
            humidity.innerHTML = 0 + "%"
            wind.innerHTML = 0 + " km/h"
            alert("Please Enter a City Name")
        } else {

            // Making future weather forecast div to display after search
            forecast.style.display = "block"

            // Adding serch value in LocalStorage
            // Localstorage Validation
            if (sessionStorage.getItem("city") == null) {
                sessionStorage.setItem("city", "[]")
            }

            // Get Local Storage Data and then Pushing new value into the array
            var city = JSON.parse(sessionStorage.getItem("city"));
            city.push(search);

            // Setting new modified data into the localstorage
            sessionStorage.setItem("city", JSON.stringify(city))

        }



        // Display Weather icon on the basis of weather condition
        if (data.list[0] == "Clouds" || "haze") {
            weatherIcon.src = "images/clouds.png"
            weatherName.innerHTML = "Clouds"
        } else if (data.list[0] == "Clear") {
            weatherIcon.src = "images/clear.png"
            weatherName.innerHTML = "Clear"
        } else if (data.list[0] == "Rain") {
            weatherIcon.src = "images/rain.png"
            weatherName.innerHTML = "Rain"
        } else if (data.list[0] == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
            weatherName.innerHTML = "Drizzy"
        } else if (data.list[0] == "Mist") {
            weatherIcon.src = "images/mist.png"
            weatherName.innerHTML = "Mist"
        }

        // Displaying city name after api call
        document.querySelector("#city-name").innerHTML = data.city.name

        var num = 0

        // Using For loop to display temperature,wind speed and humidity of 5 days
        for (let i = 0; i < 6; i++) {
            temp[i].innerHTML = "Temperature : " + Math.round(data.list[num].main.temp - 273) + "°C";
            wind[i].innerHTML = "Wind : " + Math.round(data.list[num].wind.speed) + " km/h"
            humidity[i].innerHTML = "Humidity : " + data.list[num].main.humidity + "%"

            // Display Weather icon on the basis of next 5Days weather condition
            if (data.list[num] == "Clouds" || "haze") {
                climate[i].src = "./images/clouds.png"
            } else if (data.list[num] == "Clear") {
                climate[i].src = "./images/clear.png"
            } else if (data.list[num] == "Rain") {
                climate[i].src = "./images/rain.png"
            } else if (data.list[num] == "Drizzle") {
                climate[i].src = "./images/drizzle.png"
            } else if (data.list[num] == "Mist") {
                climate[i].src = "./images/mist.png"
            }

            num += 6;
        }

    } catch (error) {
        console.log(error)

    }

}

search.addEventListener("focus", () => {

    // Select  Box Display when focus  on input box
    if (sessionStorage.getItem("city") == null) {
        selectCity.style.display = "none";
    }
    else {
        selectCity.style.display = "block"
        // Getting localstorage data ana displaying it on the Browser

        let city = JSON.parse(sessionStorage.getItem("city"))

        // Using for loop to display city name on select box
        var html = "";
        for (let i = 0; i < city.length; i++) {
            html += "<option>" + city[i] + "</option>"
            document.querySelector("#selectcity").innerHTML = html;
        }


    }
})

// Using dropdown for quick search
function getselectedValue() {
    var selectedvalue = document.getElementById("selectcity").value;
    search.value = selectedvalue
}


// Adding Event Listner on Search button to call the Api
searchbtn.addEventListener("click", () => {
    checkweather(search.value)
    search.value = "";
    selectCity.style.display = "none"
})

// Current Weather Data

function currentWeather() {

    selectCity.style.display = "none"

    // Getting the access to the location data of the Device
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition);
    } else {
        city.innerHTML = "No Data Found"
    }

    function showposition(data) {

        // Latitude and Longitude of the Device of the User
        let lat = data.coords.latitude
        let lon = data.coords.longitude

        // Fetching Current Weather Data 
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}4&lon=${lon}&appid=6f741caebe69043710b750f87020a3e1`)
            .then((data) => data.json())
            .then((res) => {

                console.log(res)

                forecast.style.display = "block"

                // Api Data Validation if data didn't responds
                if (res.status == 404) {
                    document.querySelector(".temp").innerHTML = 0 + "°C";
                    document.querySelector(".humidity").innerHTML = 0 + "%"
                    document.querySelector(".wind").innerHTML = 0 + " km/h"
                }

                // Display Weather icon on the basis of weather condition
                city.innerHTML = res.city.name
                if (res.list[0] == "Clouds" || "haze") {
                    weatherIcon.src = "images/clouds.png"
                    weatherName.innerHTML = "Clouds"
                } else if (res.list[0] == "Clear") {
                    weatherIcon.src = "images/clear.png"
                    weatherName.innerHTML = "Clear"
                } else if (res.list[0] == "Rain") {
                    weatherIcon.src = "images/rain.png"
                    weatherName.innerHTML = "Rain"
                } else if (res.list[0] == "Drizzle") {
                    weatherIcon.src = "images/drizzle.png"
                    weatherName.innerHTML = "Drizzy"
                } else if (res.list[0] == "Mist") {
                    weatherIcon.src = "images/mist.png"
                    weatherName.innerHTML = "Mist"
                }

                var num = 0

                // Using For loop to display temperature,wind speed and humidity of 5 days fo the Current Position
                for (let i = 0; i < 6; i++) {

                    temp[i].innerHTML = "Temperature : " + Math.round(res.list[num].main.temp - 273) + "°C";
                    wind[i].innerHTML = "Wind : " + Math.round(res.list[num].wind.speed) + " km/h"
                    humidity[i].innerHTML = "Humidity : " + res.list[num].main.humidity + "%"

                    // Display Weather icon on the basis of next 5Days weather condition
                    if (res.list[num] == "Clouds" || "haze") {
                        climate[i].src = "./images/clouds.png"
                    } else if (res.list[num] == "Clear") {
                        climate[i].src = "./images/clear.png"
                    } else if (res.list[num] == "Rain") {
                        climate[i].src = "./images/rain.png"
                    } else if (res.list[num] == "Drizzle") {
                        climate[i].src = "./images/drizzle.png"
                    } else if (res.list[num] == "Mist") {
                        climate[i].src = "./images/mist.png"
                    }

                    num += 6;
                }

            })
    }

}