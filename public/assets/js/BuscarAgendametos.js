function botaoDelete(){
    const createBotao = document.createElement("button")
    createBotao.textContent = 'delete'
    createBotao.id = 'btnDelete'

     createBotao.addEventListener("click", () => {
        alert("olá mundo");
    });

    return createBotao
    
}



export async function buscarAgendametos() {
    const Tdata = document.querySelector("#Tdates")
   
    const resposta = await fetch('/Agendamentosalvos');
    const dados = await resposta.json();

    if (dados.length === 0) {
        Tdata.innerHTML = "<tr><td colspan='6'>Nenhum agendamento encontrado</td></tr>";
        return;
    }

    Tdata.innerHTML = "";

    dados.forEach(element => {
        const tr = document.createElement("tr")

        const Tdbarbeiros = document.createElement("td")

        Tdbarbeiros.textContent = element.barbeiro

        const Tdcorte = document.createElement("td")
        Tdcorte.textContent = element.corte

        const Tddia = document.createElement("td")
        Tddia.textContent = element.dia

        const Tdhorario = document.createElement("td")
        Tdhorario.textContent = element.horario

        const Tdnome = document.createElement("td")
        Tdnome.style.fontWeight = 'bold'
        Tdnome.style.color = 'red'
        Tdnome.textContent = element.nome

        const Tdtelefone = document.createElement("td")
        Tdtelefone.textContent = element.telefone

        tr.appendChild(Tdbarbeiros)
        tr.appendChild(Tdcorte)
        tr.appendChild(Tddia)
        tr.appendChild(Tdhorario)
        tr.appendChild(Tdnome)
        tr.appendChild(Tdtelefone)
        tr.appendChild(botaoDelete())
        
        Tdata.prepend(tr)
    });
}

