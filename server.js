const express = require("express");
const app = express();
const PORT = 12000;
app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const agendamentos = []

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/template.html");
});

app.post("/dados", (req, res) => {
    const agendamento = req.body;
   
    
    if (!agendamento.nome || !agendamento.telefone || typeof agendamento.nome !== 'string') {
    return res.json({ mensagem: "Dados inválidos" });
}

    agendamentos.push(agendamento)
    res.json({ mensagem: "Agendamento confirmado!", agendamento });
});


app.get("/agendamentos", (req, res) => {
    res.json(agendamentos); // devolve todos os agendamentos
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
