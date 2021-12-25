const detailsButton = document.querySelector(".more-details");
const clockConatiner = document.querySelector(".clock-container");
const dayIcons = ["assets/desktop/icon-sun.svg", "assets/desktop/icon-moon.svg"];
const quoteURL = "https://programming-quotes-api.herokuapp.com/Quotes/random";
const refreshQuote = document.getElementById("refresh-icon");

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

function setTime () {
    const date = new Date();
    const hour = date.getHours();
    let minute = date.getMinutes();

    if (String (minute).length <= 1) {
        minute = `0${minute}`
    } else {
    }
    
    const timeZone = document.querySelector(".current-time");
    timeZone.innerText = `${hour}:${minute}`
    
        if (hour >= 5 && hour <= 11){
            setStatus("Good morning", dayIcons[0]);
            setBackground("day");
        } else if (hour >= 12 && hour <= 17) {
            setStatus("Good afternoon");
        } else {
            setStatus("Good evening");
            setBackground("night");
        }
    
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

getQuote();


setTime();