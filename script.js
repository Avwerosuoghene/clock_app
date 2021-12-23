const detailsButton = document.querySelector(".more-details");


detailsButton.addEventListener ("click", (e) => {
    const iconArray = ["assets/desktop/icon-arrow-down.png", "assets/desktop/icon-arrow-up.png"]
    
    window.onload = function () {
        const imagePath = e.target.querySelector("img");
        const imageSource = imagePath.getAttribute("src");

        const buttonText = e.target.querySelector("p").innerText;
        console.log(buttonText);

    if (imageSource == iconArray[0]) {
        imagePath.setAttribute ("src", iconArray[1]) ;
        buttonText.innerText = "LESS";
    } else {
        imagePath.setAttribute ("src", iconArray[0]) ;
        buttonText.innerText = "MORE";
    } 
    }

    window.onload()
    
})