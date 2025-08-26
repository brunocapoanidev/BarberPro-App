const Barbeiros = document.querySelectorAll(".barbeiro");
const Cortes = document.querySelectorAll(".corte");
const Days = document.querySelectorAll(".days");
const Horarios = document.querySelectorAll(".horario"); 

// Containers
const ContainerBarbeiros = document.querySelector(".Barbeiros");
const ContainerCortes = document.querySelector(".Cortes");
const ContainerDays = document.querySelector(".DiaAgendamento");
const ContainerHorarios = document.querySelector(".horarios");





//Funcao para mostrar display
function toggleDisplay(show, hide) {
    if (hide) hide.style.display = "none";
    if (show) show.style.display = "block";
}

Barbeiros.forEach((barbers) =>{
    barbers.addEventListener("click" , ()=>{
        const Barber = barbers.textContent
        dados.push(Barber)
        toggleDisplay(ContainerCortes, ContainerBarbeiros);
   
    })
})


Cortes.forEach((c) =>{
   c.addEventListener("click" , ()=>{
         const corte= c.textContent
        dados.push(corte)
        toggleDisplay(ContainerDays, ContainerCortes);
   
    })
})

Days.forEach((day) => {
    day.addEventListener("click", () => {
        const ValueDay = day.textContent
        dados.push(ValueDay)
        toggleDisplay(ContainerHorarios, ContainerDays);
       
    })
})






async function dadosDoAgendamento(day, hora) {

    try {
        const resposta = await fetch('/dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dia: day, hora: hora })
        });

        const data = await resposta.json();


        alert("Agendamento: " + data.dia + data.hora);
    } catch (error) {
        console.error("Erro no fetch:", error);
    }
}
