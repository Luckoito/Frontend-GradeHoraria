const urlL = "https://localhost:7214/api/Materias"
const urlT = "https://randomuser.me/api/?results=10"
const userDetails = [...document.querySelectorAll("#profileName,#profileImage,#profileRole")]

const materiaDetails = [...document.querySelectorAll(".materiaNome id0, .materiaSemestre id0, .materiaTurno id0, .materiaCurso id0, .materiaDia id0, .materiaSala id0, .materiaProfessor id0")]


fetch(urlL)
.then ((resp) => resp.json())
.then (function(data){
    console.log(data)
})
.catch (function(error){
    console.log(error)
})

/*
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
*/