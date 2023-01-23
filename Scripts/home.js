const urlL = "https://localhost:7214/GetAllMaterias"
const urlT = "https://randomuser.me/api/?results=10" // Para testes 

const userDetails = [...document.querySelectorAll("#profileName,#profileImage,#profileRole")]



fetch(urlL)
.then ((resp) => resp.json())
.then (function(data){

    data.forEach((el) => {

        console.log(el)

        const materiaDiv = document.createElement("div")
        materiaDiv.classList.add("block")
        materiaDiv.classList.add("blockMateria")

            const blockMateriaTitle = document.createElement("div")
            blockMateriaTitle.className = "blockMateriaTitle"

                const materiaNome = document.createElement("h2")
                materiaNome.className = "materiaNome"
                materiaNome.innerHTML = el.nome
                blockMateriaTitle.appendChild(materiaNome)

            materiaDiv.appendChild(blockMateriaTitle)

            const materiaDetailsModule = document.createElement("div")
            materiaDetailsModule.className = "materiaDetailsModule"

                const materiaSemestre = document.createElement("p")
                materiaSemestre.className = "materiaSemestre"
                materiaSemestre.innerHTML = el.periodo
                materiaDetailsModule.appendChild(materiaSemestre)

                const materiaTurno = document.createElement("p")
                materiaTurno.className = "materiaTurno"
                materiaTurno.innerHTML = el.turno
                materiaDetailsModule.appendChild(materiaTurno)
            
            materiaDiv.appendChild(materiaDetailsModule)

            const materiaCurso = document.createElement("p")
            materiaCurso.className = "materiaCurso"
            materiaCurso.innerHTML = el.cursos.nome
            materiaDiv.appendChild(materiaCurso)
            
            const blockMateriaTitleP = document.createElement("div")
            blockMateriaTitleP.classList.add("blockMateriaTitle")
            blockMateriaTitleP.classList.add("professor")

                const professorDetailsModule = document.createElement("div")
                professorDetailsModule.className = "professorDetailsModule"

                    const materiaDia = document.createElement("p")
                    materiaDia.className = "materiaDia"
                    materiaDia.innerHTML = el.dSemana
                    professorDetailsModule.appendChild(materiaDia)

                    const materiaSala = document.createElement("p")
                    materiaSala.className = "materiaSala"
                    materiaSala.innerHTML = el.sala
                    professorDetailsModule.appendChild(materiaSala)
                    
                    blockMateriaTitleP.appendChild(professorDetailsModule)

                const materiaProfessor = document.createElement("h2")
                materiaProfessor.className = "materiaProfessor"
                materiaProfessor.innerHTML = el.applicationUser.userName
                
                blockMateriaTitleP.appendChild(materiaProfessor)

            materiaDiv.appendChild(blockMateriaTitleP)


        const mainDiv = document.getElementById("blockMaterias")
        mainDiv.appendChild(materiaDiv)

    })
})
.catch (function(error){
    console.log(error)
    alert(error)
})

/* ---------------------------- Código para testes -------------------------

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