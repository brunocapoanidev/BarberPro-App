const Barbeiros = document.querySelectorAll(".barbeiro");
const Cortes = document.querySelectorAll(".corte");
const Days = document.querySelectorAll(".days");
const Horarios = document.querySelectorAll(".horario");

// Containers
const ContainerBarbeiros = document.querySelector(".Barbeiros");
const ContainerCortes = document.querySelector(".Cortes");
const ContainerDays = document.querySelector(".DiaAgendamento");
const ContainerHorarios = document.querySelector(".Horarios");
const ContainerNomeTelefone = document.querySelector(".NomeTelefone");

const CampoNome = document.querySelector("#NameField");
const CampoTelefone = document.querySelector("#NumberField");
const BotaoAgendamento = document.querySelector(".btnEnviar");

// Objeto que vai guardar os dados
const agendamento = {};

// Função para mostrar display
function toggleDisplay(show, hide) {
    if (hide) hide.style.display = "none";
    if (show) show.style.display = "block";
}

// Função para fluxo de agendamento
const fluxoAgendamento = (elementos, containerAtual, containerProximo, chave) => {
    elementos.forEach((el) => {
        el.addEventListener("click", () => {
            const valor = el.textContent.trim();
            agendamento[chave] = valor; // salva no objeto pelo nome da chave
            toggleDisplay(containerProximo, containerAtual);
        });
    });
}

// Fluxo usando objetos
fluxoAgendamento(Barbeiros, ContainerBarbeiros, ContainerCortes, "barbeiro");
fluxoAgendamento(Cortes, ContainerCortes, ContainerDays, "corte");
fluxoAgendamento(Days, ContainerDays, ContainerHorarios, "dia");
fluxoAgendamento(Horarios, ContainerHorarios, ContainerNomeTelefone, "horario");

// Função para enviar dados pro backend
async function dadosDoAgendamento() {
    // adiciona nome e telefone ao objeto
    agendamento.nome = CampoNome.value;
    agendamento.telefone = CampoTelefone.value;

    try {
        const resposta = await fetch('/dados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agendamento) // envia objeto JSON
        });

        const data = await resposta.json();
        alert(JSON.stringify(data)); // mostra a resposta de forma legível

    } catch (error) {
        console.error("Erro no fetch:", error);
    }
}

// Botão de envio
BotaoAgendamento.addEventListener("click", async (event) => {
    event.preventDefault(); // impede reload/redirect
    dadosDoAgendamento();
});
