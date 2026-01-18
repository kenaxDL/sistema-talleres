const express =require("express");
const cors =require("cors");
const db=require("./database");
const inscripcionesRouter=require("./inscripcionesRoutes")

const app=express()
app.use(cors());
app.use(express.json());

// routers
const talleresRouter = require("./talleresRouter");

app.use("/api/talleres", talleresRouter);
app.use("/api/inscripciones",inscripcionesRouter)

app.get("/", (req, res) =>{
    res.send("Servidor Node.js funcionando correctamente")
})

app.listen(3000, () =>{
    console.log("Servidor backend en puerto 3000")
})