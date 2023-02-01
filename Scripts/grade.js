const urlMaterias = "https://localhost:7214/Materias/GetAllMaterias"
const urlCursos = "https://localhost:7214/Cursos/GetAllCursos"

const matDiv = document.getElementById("mat")
const notDiv = document.getElementById("not")

const colorActive = "rgba(173, 81, 15, 0.651)"
const colorButton = "rgba(87, 43, 11, 0.199)"

let filtersBlock = document.querySelector("#filters")
let filtersButton = document.querySelector("#filtersButton")

filtersButton.addEventListener("click", () => {

    let filtersButtonText = document.querySelector("#filterButtonText")
    
    let filtersDisplay = filtersBlock.style.display

    if (filtersDisplay === "none" || filtersDisplay === "") {
        filtersDisplay = "flex"
        filtersButtonText.innerHTML = "Ocultar"
        filtersButton.style.backgroundColor = colorActive
    } else {
        filtersDisplay = "none"
        filtersButtonText.innerHTML = "Filtros"
        filtersButton.style.backgroundColor = colorButton
    }

    filtersBlock.style.display = filtersDisplay
})

let allCursos = []
let allSemestres = []
let allMaterias = []

// Funções de preenchimento -----------------------------------

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


// Fetch de dados ----------------------------

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



// Filtros -----------------------------------

function convertString (string){
    let normalized = string.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalized.replace(/\s/g, '')
  }

    // Filtros de semestre -------------------

let FS = []
let FSvalues = []

function defineSemestreFilter (semestre,button) {

    if (FS[semestre] === true) {
        FS [semestre] = false
    } else {
        FS [semestre] = true
    }

    updateFSvalues()
    updateGrade()

    if (FS [semestre] === true) {
        button.style.backgroundColor = colorActive
    } else if (FS [semestre] === false) {
        button.style.backgroundColor = colorButton
    }
}

let buttonFS1 = document.querySelector("#button1s")
buttonFS1.addEventListener("click", () => {

    defineSemestreFilter(1,buttonFS1)
    
})

let buttonFS2 = document.querySelector("#button2s")
buttonFS2.addEventListener("click", () => {

    defineSemestreFilter(2,buttonFS2)
    
})

let buttonFS3 = document.querySelector("#button3s")
buttonFS3.addEventListener("click", () => {

    defineSemestreFilter(3,buttonFS3)
    
})

let buttonFS4 = document.querySelector("#button4s")
buttonFS4.addEventListener("click", () => {

    defineSemestreFilter(4,buttonFS4)
    
})

function updateFSvalues () {

    FSvalues = []
    FS.forEach((el, index) => {
        if (el === true) {
            FSvalues.push(index)
        }
    })
}

    // Filtros de turno ----------------------

let FT = {
    mat: false,
    not: false
}

function defineTurnoFilter (turno,button) {

    if (FT[turno] === true) {
        FT[turno] = false
        button.style.backgroundColor = colorButton
    } else if (FT[turno] === false) {
        FT[turno] = true
        button.style.backgroundColor = colorActive
    }

    updateGrade()

}

let buttonFTM = document.querySelector("#buttonMat")
buttonFTM.addEventListener("click", () => {
    
    defineTurnoFilter("mat",buttonFTM)

})


let buttonFTN = document.querySelector("#buttonNot")
buttonFTN.addEventListener("click", () => {
    
    defineTurnoFilter("not",buttonFTN)

})

    // Filtros de curso e matéria ----------------------

let FCMbox = document.querySelector("#inputFilterMat")
FCMbox.addEventListener("input", () => {

    let search = convertString(FCMbox.value)
    defineCMfilter(search)

})

function defineCMfilter (search) {

    let FCM = document.querySelectorAll()
    console.log(FCM)

}

    // Atualização final ---------------------
function updateGrade () {
    
    //Filtrar semestre::::::::::::::::::::::
    if (FSvalues.length !== 0) {
        
        let resultSemestre = []

        FSvalues.forEach((value)=>{
            allSemestres.forEach((semestre)=>{
                
                if (semestre.id.includes(value)){
                    resultSemestre.push(semestre)
                }

                semestre.style.display = "none"
            })
        })

        resultSemestre.forEach((semestre)=>{
            semestre.style.display = "flex"
        })

    } else {
        allSemestres.forEach((semestre)=>{
            semestre.style.display = "flex"
        })
    }

    //Filtrar turno:::::::::::::::::::::::::
    if (FT.mat === FT.not) {
        
        matDiv.style.display = "flex"
        notDiv.style.display = "flex"
    } else {

        if (FT.mat === true) {
            notDiv.style.display = "none"
        } else if (FT.not === true) {
            matDiv.style.display = "none"
        }
    }
}