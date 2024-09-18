import app  from "./src/services/ExpressApp";

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
  console.log()
  console.log("Escutando na porta", PORT);
  console.log(`CTRL + Clique em http://localhost:${PORT}`)
});


