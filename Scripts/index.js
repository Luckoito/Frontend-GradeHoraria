const url = "https://localhost:7214/Authorize/UserLogin"
const urlt = "https://localhost:7214/Cursos/GetAllCursos"

let respAuth = ""
let respUser = ""

let defineObj = () => {

    let stringL = document.querySelector("#loginUser").value
    let stringP = document.querySelector("#loginPassword").value

    if (!stringL.includes("@yknh4.onmicrosoft.com")) {
        stringL = stringL + "@yknh4.onmicrosoft.com"
    }

    let user = {

        username: stringL,
        password: stringP

    }    
    
    fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then((data) =>{
        window.localStorage.setItem('auth', JSON.stringify(data))
        respAuth = data.token
    })
    .catch(error => console.log(error))
}



document.querySelector("#submitButton").addEventListener("click", () => {defineObj()})
document.querySelector("#teste").addEventListener("click", () => {
    fetch(urlt, {
        method: 'GET',
        headers: {
            'content-type' : 'application/json',
            'authorization' : 'http, Bearer' + respAuth
        }})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

    console.log(respAuth)
})







