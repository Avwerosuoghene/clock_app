const detailsButton = document.querySelector(".more-details");
const clockConatiner = document.querySelector(".clock-container");
const dayIcons = ["assets/desktop/icon-sun.svg", "assets/desktop/icon-moon.svg"];
const quoteURL = "https://programming-quotes-api.herokuapp.com/Quotes/random";
const countriesURL = "https://api.timezonedb.com/v2.1/list-time-zone?key=D7K6G69S5O7E&format=json";
const timeSetURL = "http://worldtimeapi.org/api/timezone/";
const countriesList = [];
const countryObjectsArray = [];
const refreshQuote = document.getElementById("refresh-icon");
const countrySelect = document.querySelector(".country-select");
const searchCountry = document.querySelector(".search-country");
const countriesContainer = document.querySelector(".countries-container");
let count = 0;


detailsButton.addEventListener ("click", (e) => {
    
    const detailIcon = document.querySelector (".detail-icon");
    const detailText = document.querySelector(".detail-text");
    const iconArray = ["assets/desktop/icon-arrow-down.png", "assets/desktop/icon-arrow-up.png"]
    const detailIconSRC = detailIcon.getAttribute("src");

    if (detailIconSRC == iconArray[0]) {
        detailIcon.setAttribute("src", iconArray[1]);

        setTimeout(() => {detailText.innerText = "LESS"}, 1000);
        
        clockConatiner.style.transform = "translateY(-50vh)"
        
    } else {
        detailIcon.setAttribute("src", iconArray[0]);
        setTimeout(() => {detailText.innerText = "MORE"}, 1000);
        clockConatiner.style.transform = "translateY(0vh)"
    }
});

refreshQuote.addEventListener ("click", () => {
    getQuote();
})

async function getQuote () {
    const quote = document.getElementById("quote");
    const author = document.getElementById("author");

    try {
        const { data } = await axios(quoteURL);
        quote.innerText = data.en;
        author.innerText = data.author;
    } catch (err) {
        console.log(err)
    }
}

countrySelect.addEventListener("click", () => {
    countriesContainer.classList.toggle("full");

});

searchCountry.addEventListener("input", (e) => searchConfirm(e.target.value));

function setParams (data, countryname) {
    
    const regex = /([\d-]*)T(\d{2}):(\d{2}):(\d{2})/;
    const dateArr = regex.exec(data.datetime);
    const hour = dateArr[2];
    const minute = dateArr[3]

    if (String (minute).length <= 1) {
        minute = `0${minute}`
    } else {
    }
    
    const timeZone = document.querySelector(".current-time");
    timeZone.innerText = `${hour}:${minute}`

    const zoneAbbrev = document.querySelector(".zone_abbv");
    zoneAbbrev.innerHTML = data.abbreviation;

    const location = document.querySelector(".location");
    location.innerHTML = `IN ${countryname}`

    const timeZoneText = document.querySelector("#time-zone");
    timeZoneText.innerText = data.timezone;

    const DOY = document.getElementById("doy");
    const DOW = document.getElementById("dow");
    const WeekNo = document.getElementById("week-no");

    DOY.innerText = data.day_of_year;
    DOW.innerText = data.day_of_week;
    WeekNo.innerText = data.week_number;
    
        if (hour >= 5 && hour <= 11){
            setStatus("Good morning", dayIcons[0]);
            setBackground("day");
        } else if (hour >= 12 && hour <= 17) {
            setStatus("Good afternoon");
            setBackground("day");
        } else {
            setStatus("Good evening");
            setBackground("night");
        }
    
}


function searchConfirm (searchTerm) {
    countriesList.forEach((country) => {
        if(country.innerHTML.toLowerCase().includes(searchTerm.toLowerCase())){
            country.classList.remove("hide");
        } else {
            country.classList.add ("hide");
        }
    })
}

function setStatus(greet) {
    const greeting = document.getElementById("greeting");
    greeting.innerText = `${greet}, It's Currently` ;
}

function setBackground (day) {
    const mezanineSection = document.querySelector(".mezanine-section");
    const backGround = document.querySelector(".background");

    switch (day) {
        case "day": 
        backGround.classList.remove ("night");
        mezanineSection.classList.remove ("night");
        break;

        case "night":
            backGround.classList.add ("night");
            mezanineSection.classList.add ("night");
            break;
    }
}

async function getCountries() {
    const countries = document.querySelector(".countries");

    try {
        const {data} = await axios(countriesURL);
        countries.innerHTML = ""
        const zones = data.zones;
        zones.forEach(zone => {
            const country = document.createElement("li");
            country.classList.add("country");
            country.innerText = zone.countryName;
            const countryObj = {
                name:zone.countryName,
                timezone:zone.zoneName
            }
            countryObjectsArray.push(countryObj);
            countriesList.push(country);
            countries.appendChild(country);
        })
        pickCountry()
    } catch (err) {
        console.log(err);
    }   
}

function pickCountry () {
    countriesList.forEach(country => {
        if (country.innerText == "Nigeria" && count == 0) {
            console.log(country.innerText)
            count = 1;
            countryObjectsArray.forEach((countObj) => {
            if(country.innerText === countObj.name){
                setZone(countObj.timezone, country.innerText)
            } else {
                
            }
        })
            
        }

        country.addEventListener("click", (e) => {
            countryObjectsArray.forEach((countObj) => {
                if(e.target.innerHTML === countObj.name){
                    countriesContainer.classList.toggle("full");
                    setZone(countObj.timezone, e.target.innerHTML)
                } else {
                    
                }
            })
        })
    }) 
    
}

async function setZone (selectedZone, countryname) {
        try{
            const {data} = await axios.get(timeSetURL + selectedZone);
            setParams(data, countryname)
        } catch (err) {
            console.log(err)
        }
}


getCountries();

getQuote();


// setTime();