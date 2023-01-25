const url = "https://localhost:7214/GetAllMaterias"

fetch(url)
.then ((resp) => resp.json())
.then (function(data){

    data.forEach((el) => {


    })
})
.catch (function(error){
    console.log(error)
    alert(error)
})

let filtersBlock = document.querySelector("#filters")
let filtersButton = document.querySelector("#filtersButton")

filtersButton.addEventListener("click", () => {

    let filtersButtonText = document.querySelector("#filterButtonText")
    
    let filtersDisplay = filtersBlock.style.display

    if (filtersDisplay === "none" || filtersDisplay === "") {
        filtersDisplay = "flex"
        filtersButtonText.innerHTML = "Ocultar"
    } else {
        filtersDisplay = "none"
        filtersButtonText.innerHTML = "Filtros"
    }

    filtersBlock.style.display = filtersDisplay
})