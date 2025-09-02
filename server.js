const express = require("express");
const app = express();
const PORT = 27000;
app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const agendamentosData = []
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/template.html");
});

app.post("/dados", (req, res) => {
    const agendamento = req.body;

    if (
        !agendamento.nome ||
        !agendamento.telefone ||
        typeof agendamento.nome !== "string" ||
        agendamento.nome.trim().length < 3 ||
        !/^\d{8,15}$/.test(agendamento.telefone)
    ) {
        return res.status(400).json({ mensagem: "Dados inválidos" });
    }


    agendamentosData.push(agendamento)
    res.status(200).json({ mensagem: "Agendamento confirmado!", agendamento });
});



app.get("/Agendamentosalvos", (req, res) => {
    res.json(agendamentosData)
})



app.delete("/agendamento/:telefone", (req, res) => {
    const telefone = req.params.telefone;

    const index = agendamentosData.findIndex(a => a.telefone === telefone);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Agendamento não encontrado" });
    }


    agendamentosData.splice(index, 1);
    res.status(200).json({ mensagem: "Agendamento deletado!" });
});



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
