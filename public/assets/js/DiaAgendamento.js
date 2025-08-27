const Barbeiros = document.querySelectorAll(".barbeiro");
const Cortes = document.querySelectorAll(".corte");
const Days = document.querySelectorAll(".days");
const Horarios = document.querySelectorAll(".horario");

// Containers
const ContainerBarbeiros = document.querySelector(".Barbeiros");
const ContainerCortes = document.querySelector(".Cortes");
const ContainerDays = document.querySelector(".DiaAgendamento");
const ContainerHorarios = document.querySelector(".Horarios");
const ContainerNomeTelefone = document.querySelector(".NomeTelefone")

const CampoNome = document.querySelector("#NameField")
const CampoTelefone = document.querySelector("#NumberField")
const BotaoAgendamento = document.querySelector(".btnEnviar")
const dados = []

//Funcao para mostrar display
function toggleDisplay(show, hide) {
    if (hide) hide.style.display = "none";
    if (show) show.style.display = "block";
}

const fluxoAgendamento = (elementos, containerAtual, containerProximo) => {
    elementos.forEach((el) => {
        el.addEventListener("click", () => {
            const valor = el.textContent.trim()
            dados.push(valor)
            toggleDisplay(containerProximo, containerAtual)
        })
    })
}

fluxoAgendamento(Barbeiros, ContainerBarbeiros, ContainerCortes)
fluxoAgendamento(Cortes, ContainerCortes, ContainerDays)
fluxoAgendamento(Days, ContainerDays, ContainerHorarios)
fluxoAgendamento(Horarios, ContainerHorarios, ContainerNomeTelefone)

async function dadosDoAgendamento() {

    const NameCliente = CampoNome.value
    const TelefoneCliente = CampoTelefone.value
    dados.push({ Nome: NameCliente, Telefone: TelefoneCliente })


    try {
        const resposta = await fetch('/dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });

        const data = await resposta.json();
        alert("Agendamento: " + data.dia + data.hora);

    } catch (error) {
        console.error("Erro no fetch:", error);
    }
}


BotaoAgendamento.addEventListener("click", async () => {
    dadosDoAgendamento()

    console.log(dados)
})

