import { buscarAgendametos } from "./BuscarAgendametos.js";

export function botaoDelete(telefone) {
    const createBotao = document.createElement("button");
    createBotao.textContent = 'delete';
    createBotao.id = 'btnDelete';

    createBotao.addEventListener("click", async () => {
        try {
            const resposta = await fetch(`/agendamento/${telefone}`, {
                method: 'DELETE'
            });

            const data = await resposta.json();

            if (resposta.ok) {
                buscarAgendametos();
            } else {
                alert(data.mensagem || "Erro ao deletar");
            }
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    });

    return createBotao;
}