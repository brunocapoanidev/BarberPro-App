import { buscarAgendametos } from "./BuscarAgendametos.js";

const Barbeiros = document.querySelectorAll(".barbeiro");
const Cortes = document.querySelectorAll(".corte");
const Days = document.querySelectorAll(".days");
const Horarios = document.querySelectorAll(".horario");

const ContainerBarbeiros = document.querySelector(".Barbeiros");
const ContainerCortes = document.querySelector(".Cortes");
const ContainerDays = document.querySelector(".DiaAgendamento");
const ContainerHorarios = document.querySelector(".Horarios");
const ContainerNomeTelefone = document.querySelector(".NomeTelefone");
const Agradecimento = document.querySelector("#Agradecimento")

const CampoNome = document.querySelector("#NameField");
const CampoTelefone = document.querySelector("#NumberField");
const BotaoAgendamento = document.querySelector(".btnEnviar");
const BotaoVoltar = document.querySelector("#Botao-Voltar")



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

//Enviar   Agendamentos
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

        if (resposta.ok) {
            buscarAgendametos();
            toggleDisplay(Agradecimento, ContainerNomeTelefone)
        } else {
            alert(data.mensagem || "Erro no agendamento"); // mostra msg de erro
        }




    } catch (error) {
        console.error("Erro no fetch:", error);
    }


}

BotaoVoltar.addEventListener("click", () => {
    toggleDisplay(ContainerBarbeiros, Agradecimento)
})

BotaoAgendamento.addEventListener("click", async (event) => {
    event.preventDefault();
    dadosDoAgendamento();
    CampoNome.value = ""
    CampoTelefone.value = ""


});



