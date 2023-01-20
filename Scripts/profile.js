const url = "https://randomuser.me/api/?results=1"
const userDetails = [...document.querySelectorAll("#profileName,#profileImage,#profileEmail,#profileRole")]

fetch (url)
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
                el.innerHTML = user.email
                break
            case 3:
                el.innerHTML = user.name.title
        }
    })
    
})
.catch(function(error){
    console.log(error)
})