const urlMaterias = "https://localhost:7214/Materias/GetAllMaterias"
const urlCursos = "https://localhost:7214/Cursos/GetAllCursos"

const activeColor = "rgba(173, 81, 15, 0.651)"
const inactiveColor = "rgba(87, 43, 11, 0.199)"
const CL = impression => console.log(impression)
const QS = (origin,search) => origin.querySelector(search)
const AEL = (element,type,funct) => element.addEventListener(type, funct)
const convertText = (text) => text.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '')

fetch (urlMaterias)
.then ((resp) => resp.json())
.then ((data) => {

    data.forEach(materia => {

        let temp = QS(document,"#tempMateria")
        clone = temp.content.cloneNode(true)

        QS(clone,".blockMateria").id = convertText(materia.cursos.turno + materia.cursos.nome + materia.cursos.periodo + materia.nome)
        QS(clone,".materiaNome").innerHTML = materia.nome
        QS(clone,".materiaSemestre").innerHTML = materia.cursos.periodo + "°sem."
        QS(clone,".materiaTurno").innerHTML = materia.cursos.turno
        QS(clone,".materiaCurso").innerHTML = materia.cursos.nome
        QS(clone,".materiaDia").innerHTML = materia.dSemana
        QS(clone,".materiaSala").innerHTML = materia.cursos.sala
        QS(clone,".materiaProfessor").innerHTML = materia.professor

        QS(document,".galleryMaterias").appendChild(clone)
    });


})
.catch ((error) => {
    CL(error)
});

fetch(urlCursos)
.then ((resp) => resp.json())
.then ((data) => {

    let allCursos = []

    data.forEach(curso => {

        if (!allCursos.includes(curso.nome)) {

            let temp = QS(document,"#tempCurso")
            clone = temp.content.cloneNode(true)

            QS(clone,".blockCurso").id = convertText(curso.turno + curso.periodo + curso.nome)
            QS(clone,".cursoNome").innerHTML = curso.nome

            QS(document,".galleryCursos").appendChild(clone)
            allCursos.push(curso.nome)

        }
    })

})
.catch ((error)=>{
    CL(error)
})

const showPageElement = el => el.style.display = "flex"
const hidePageElement = el => el.style.display = "none"
const editInner = (el, value) => el.innerHTML = value
const editColor = (el, color) => el.style.backgroundColor = color
const isVisible = el => {return (window.getComputedStyle(el).display === "none") ? false : true}

const cursosBlock = QS(document, ".cursosBlock")
const materiasBlock = QS(document, ".materiasBlock")
const buttonCursos =  QS(document,"#buttonEditCursos")
const buttonMaterias = QS(document, "#buttonEditMaterias")

AEL(buttonCursos,"click",()=>{
    if (isVisible(cursosBlock)){
        hidePageElement(cursosBlock)
        editColor(buttonCursos, inactiveColor)
        editInner(QS(buttonCursos,"p"),"Editar cursos")
    } else {
        showPageElement(cursosBlock)
        editColor(buttonCursos, activeColor)
        editInner(QS(buttonCursos,"p"),"Editando cursos")
    }
})

AEL(buttonMaterias,"click",()=>{
    if (isVisible(materiasBlock)){
        hidePageElement(materiasBlock)
        editColor(buttonMaterias, inactiveColor)
        editInner(QS(buttonMaterias,"p"),"Editar matérias")
    } else {
        showPageElement(materiasBlock)
        editColor(buttonMaterias, activeColor)
        editInner(QS(buttonMaterias,"p"),"Editando matérias")
    }
})

