import { botaoDelete } from "./DeleteAgendametos.js";


export async function buscarAgendametos() {
    const Tdata = document.querySelector("#Tdates")

    const resposta = await fetch('/Agendamentosalvos');
    const dados = await resposta.json();

    if (dados.length === 0) {
        Tdata.innerHTML = "<tr><td colspan='7'>Nenhum agendamento encontrado</td></tr>";
        return;
    }

    Tdata.innerHTML = "";

    dados.forEach(element => {
        const tr = document.createElement("tr");

        const Tdbarbeiros = document.createElement("td");
        Tdbarbeiros.textContent = element.barbeiro;

        const Tdcorte = document.createElement("td");
        Tdcorte.textContent = element.corte;

        const Tddia = document.createElement("td");
        Tddia.textContent = element.dia;

        const Tdhorario = document.createElement("td");
        Tdhorario.textContent = element.horario;

        const Tdnome = document.createElement("td");
        Tdnome.style.fontWeight = '400';
        Tdnome.style.color = 'red';
        Tdnome.style.textTransform = 'uppercase';
        Tdnome.textContent = element.nome;

        const Tdtelefone = document.createElement("td");
        Tdtelefone.textContent = element.telefone;

        const TdDelete = document.createElement("td");
        TdDelete.appendChild(botaoDelete(element.telefone));

        tr.appendChild(Tdbarbeiros);
        tr.appendChild(Tdcorte);
        tr.appendChild(Tddia);
        tr.appendChild(Tdhorario);
        tr.appendChild(Tdnome);
        tr.appendChild(Tdtelefone);
        tr.appendChild(TdDelete);

        Tdata.prepend(tr);
    });
}
