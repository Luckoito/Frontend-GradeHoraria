const urlMaterias = "https://localhost:7214/Materias/GetAllMaterias"

const QS = (origin,search) => origin.querySelector(""+search+"")
const CL = (impression) => console.log(impression)
const convertText = (text) => text.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '')

fetch (urlMaterias)
.then ((resp) => resp.json())
.then (function(data) {

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


        CL(clone)
        CL(materia)
        /* CL(QS(clone,".blockMateria").id) */
    });


})
.catch (function(error){
    console.log(error)
});
