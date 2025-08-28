const Barbeiros = document.querySelectorAll(".barbeiro");
const Cortes = document.querySelectorAll(".corte");
const Days = document.querySelectorAll(".days");
const Horarios = document.querySelectorAll(".horario");


const ContainerBarbeiros = document.querySelector(".Barbeiros");
const ContainerCortes = document.querySelector(".Cortes");
const ContainerDays = document.querySelector(".DiaAgendamento");
const ContainerHorarios = document.querySelector(".Horarios");
const ContainerNomeTelefone = document.querySelector(".NomeTelefone");

const CampoNome = document.querySelector("#NameField");
const CampoTelefone = document.querySelector("#NumberField");
const BotaoAgendamento = document.querySelector(".btnEnviar");

const agendamento = {};

function toggleDisplay(show, hide) {
    if (hide) hide.style.display = "none";
    if (show) show.style.display = "block";
}


const fluxoAgendamento = (elementos, containerAtual, containerProximo, chave) => {
    elementos.forEach((el) => {
        el.addEventListener("click", () => {
            const valor = el.textContent.trim();
            agendamento[chave] = valor;
            toggleDisplay(containerProximo, containerAtual);
        });
    });
}


fluxoAgendamento(Barbeiros, ContainerBarbeiros, ContainerCortes, "barbeiro");
fluxoAgendamento(Cortes, ContainerCortes, ContainerDays, "corte");
fluxoAgendamento(Days, ContainerDays, ContainerHorarios, "dia");
fluxoAgendamento(Horarios, ContainerHorarios, ContainerNomeTelefone, "horario");


async function dadosDoAgendamento() {

    agendamento.nome = CampoNome.value;
    agendamento.telefone = CampoTelefone.value;

    try {
        const resposta = await fetch('/dados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agendamento)
        });

        const data = await resposta.json();
        alert(JSON.stringify(data));

    } catch (error) {
        console.error("Erro no fetch:", error);
    }
}


BotaoAgendamento.addEventListener("click", async (event) => {
    event.preventDefault();
    dadosDoAgendamento();
});

async function pegarAgendamentos() {
    const resposta = await fetch('/Agendamentosalvos');
    const data = await resposta.json();

    const container = document.getElementById("agendamentos");
    container.innerHTML = ""; // limpa antes

    data.forEach(agendamento => {
        const item = document.createElement("p");
        item.textContent = `${agendamento.nome} - ${agendamento.horario}`;
        container.appendChild(item);
    });
}

// ⚡ Se não tiver isso, nada acontece
pegarAgendamentos();
