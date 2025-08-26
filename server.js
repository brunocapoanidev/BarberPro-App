const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//function agendamento(day , corte , horario){
   // const dados = {
     //   dia: day,
       // corte: corte,
        //horario: horario,
    //}
//}
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/template.html");
});

app.post("/dados", (req, res) => {
  try {
    const { dia , hora} = req.body;
    res.json({ dia  , hora});
  } catch (err) {
    console.error("Erro no /dados:", err);
    res.status(500).json({ erro: "Deu ruim no servidor" });
  }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
