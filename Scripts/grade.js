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

}

fetch (urlCursos)
.then ((resp) => resp.json())
.then (function(data) {

    console.log(data)

    let createdCursos = []

    data.forEach((el) => {

        if (createdCursos.includes(el.nome + " " + el.turno)) {
            console.log("O elemento " + el.nome + " " + el.turno + " já existe")
        } else {
            createdCursos.push(el.nome + " " + el.turno)
            createCurso(el)
        }

        createSemestre(el)

    });

    console.log(createdCursos)

})
.catch (function(error){
    console.log(error)
})

/* <div class="curso" id = "(Turno) + (nome do curso)">

<h1 class="cursoNome">Nome do curso</h1>

<div class="semestre" id="(turno) + (nome do curso) + (semestre do curso)">

    <div class="detail semestreInfo">
        <h2 class="semestreNome">
            X°<br>Semestre
        </h2>
    </div>

    <div class="detail salaInfo">
        <h2 class="salaNome">
            Sala <br> X.X
        </h2>
    </div>

    <div class="detail materiaInfo" id="(turno) + (nome do curso) + (semestre do curso) + (dia da semana)">

        <h2 class="diaNome">Segunda-Feira</h2>
        <p class="materiaNome">Nome da matéria</p>
        <p class="professorNome">Nome do professor</p>
        
    </div>

</div>

</div> */