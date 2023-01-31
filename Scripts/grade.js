const urlMaterias = "https://localhost:7214/Materias/GetAllMaterias"
const urlCursos = "https://localhost:7214/Cursos/GetAllCursos"

const matDiv = document.getElementById("mat")
const notDiv = document.getElementById("not")

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

let allCursos = []
let allSemestres = []
let allMaterias = []

function createCurso (curso) {

    const cursoNome = curso.nome.replace(/\s/g, '')
    const cursoTurno = curso.turno.replace(/\s/g, '')

    const cursoDiv = document.createElement("div")
    cursoDiv.classList.add("curso")
    cursoDiv.id = cursoTurno + cursoNome
    
    const cursoTitle = document.createElement("h1")
    cursoTitle.classList.add("cursoNome")
    cursoTitle.innerHTML = curso.nome
    cursoDiv.appendChild(cursoTitle)

    if (curso.turno === "Matutino") {
        matDiv.appendChild(cursoDiv)
    } else if (curso.turno === "Noturno") {
        notDiv.appendChild(cursoDiv)
    }

    allCursos.push(cursoDiv)

}

function createSemestre (curso) {

    const cursoNome = curso.nome.replace(/\s/g, '')
    const cursoTurno = curso.turno.replace(/\s/g, '')
    const cursoDiv = document.querySelector("#"+cursoTurno+cursoNome)
    
    let periodoDiv = document.createElement("div")
    periodoDiv.classList.add("semestre")
    periodoDiv.id = cursoTurno + cursoNome + curso.periodo

        let semestreInfoDiv = document.createElement("div")
        semestreInfoDiv.classList.add("detail")
        semestreInfoDiv.classList.add("semestreInfo")

            let semestreNomeH2 = document.createElement("h2")
            semestreNomeH2.classList.add("semestreNome")
            semestreNomeH2.innerHTML = curso.periodo + "°<br>Semestre"

            semestreInfoDiv.appendChild(semestreNomeH2)

        periodoDiv.appendChild(semestreInfoDiv)

        let salaInfoDiv = document.createElement("div")
        salaInfoDiv.classList.add("detail")
        salaInfoDiv.classList.add("salaInfo")

            let salaNomeH2 = document.createElement("h2")
            salaNomeH2.classList.add("salaNome")
            salaNomeH2.innerHTML = "Sala<br>"+ curso.sala

            salaInfoDiv.appendChild(salaNomeH2)

        periodoDiv.appendChild(salaInfoDiv)

    cursoDiv.appendChild(periodoDiv)

    allSemestres.push(periodoDiv)

}

function createMateria (curso,materia) {

    const cursoNome = curso.nome.replace(/\s/g, '')
    const cursoTurno = curso.turno.replace(/\s/g, '')
    const periodoDiv = document.querySelector("#"+cursoTurno+cursoNome+curso.periodo)

    let materiaInfoDiv = document.createElement("div")
    materiaInfoDiv.classList.add("detail")
    materiaInfoDiv.classList.add("materiaInfo")
    materiaInfoDiv.id = cursoTurno + cursoNome + curso.periodo + materia.dSemana

        let diaNomeH2 = document.createElement("h2")
        diaNomeH2.classList.add("diaNome")
        diaNomeH2.innerHTML = materia.dSemana

        materiaInfoDiv.appendChild(diaNomeH2)

        let materiaNomeP = document.createElement("p")
        materiaNomeP.classList.add("materiaNome")
        materiaNomeP.innerHTML = materia.nome

        materiaInfoDiv.appendChild(materiaNomeP)

        let professorNomeP = document.createElement("p")
        professorNomeP.classList.add("professorNome")
        professorNomeP.innerHTML = materia.professor

        materiaInfoDiv.appendChild(professorNomeP)
    
    periodoDiv.appendChild(materiaInfoDiv)

    allMaterias.push(materiaInfoDiv)

}

function getDay (el,materias,dia) {
    for (i = 0; i < materias.length; i++) {
        let materia = materias[i]
        if (materia.dSemana === dia) {
            createMateria(el,materia)
        }
    }
}

fetch (urlCursos)
.then ((resp) => resp.json())
.then (function(data) {

    let createdCursos = []

    data.forEach((el) => {

        if (createdCursos.includes(el.nome + " " + el.turno)) {

            console.log("Curso repetido ignorado: " + el.nome + " " + el.turno)

        } else {

            createdCursos.push(el.nome + " " + el.turno)
            createCurso(el)
        }

        createSemestre(el)

        let materias = el.materias

        for (d = 0; d < 7; d++) {
            switch (d) {
                case 0:
                    getDay(el,materias,"Segunda-Feira")
                    break

                case 1:
                    getDay(el,materias,"Terça-Feira")
                    break

                case 2:
                    getDay(el,materias,"Quarta-Feira")
                    break
                    
                case 3:
                    getDay(el,materias,"Quinta-Feira")
                    break
                    
                case 4:
                    getDay(el,materias,"Sexta-Feira")
                    break
                    
                case 5:
                    getDay(el,materias,"Sábado/EAD")
                    break
                    
                case 6:
                    getDay(el,materias,"Extensão/EAD")
                    break
                    
            }
        }
    })
})
.catch (function(error){
    console.log(error)
});



// Filtros:
console.log(allCursos)
console.log(allSemestres)
console.log(allMaterias)

let varFilterCursos = false
let varFilterSemestres = false
let varFilterMaterias = false

function filter (arr,srch) {

    let results = arr.filter((el) => {
        return el.id.includes(srch)
    })
    return results

}

function filterDisplay (originalArray,filteredArray) {

    originalArray.forEach((el) => {
        el.style.display = "none"
      })
    
      filteredArray.forEach((el) => {
        el.style.display = "flex"
      })

}

let filterSemestre1Button = document.querySelector("#button1s")
filterSemestre1Button.addEventListener("click", () => {

    if (varFilterSemestres === true) {
        varFilterSemestres = false
    } else {
        varFilterSemestres = true

        let filteredSemestres = filter(allSemestres,"1")
        filterDisplay (allSemestres,filteredSemestres)
    }

})