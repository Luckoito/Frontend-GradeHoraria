const urlL = "https://localhost:7214/api/Materias"
const urlT = "https://randomuser.me/api/?results=10"
const userDetails = [...document.querySelectorAll("#profileName,#profileImage,#profileRole")]

/*
fetch(urlL)
.then ((resp))
.then (function(data){
    console.log(data.results)
})
.catch (function(error){
    console.log(error)
})
*/

fetch (urlT)
.then ((resp) => resp.json())
.then (function(data){
    console.log(data.results)
    let user = data.results[0]
    userDetails.map((el,i) => {
        switch (i) {
            case 0:
                el.innerHTML = (user.name.first + " " +user.name.last)
                break
            case 1:
                el.src = user.picture.large
                break
            case 2:
                el.innerHTML = user.name.title
                break
        }
    })
})
.catch(function(error){
    console.log(error)
}) 
