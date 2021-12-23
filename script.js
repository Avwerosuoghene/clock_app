const detailsButton = document.querySelector(".more-details");
const clockConatiner = document.querySelector(".clock-container")


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
})