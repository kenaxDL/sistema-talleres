const express = require("express");
const db = require("./database");
const router = express.Router();

// Obtener todos los talleres
router.get("/", (req, res) => { // Ruta: /talleres
    db.all("SELECT * FROM talleres", (err, rows) => {
        if (err) {
            console.error("Error al obtener los talleres", err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }   
    });
});

//Crear un nuevo taller
router.post("/", (req, res) => { // Ruta: /talleres
    const {nombre, expositor , fecha, hora, lugar, cupo_total} = req.body;
    if (!nombre || !expositor || !fecha || !hora || !lugar || !cupo_total){
        return  res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    db.run(
        `INSERT INTO talleres (nombre, expositor, fecha, hora, lugar, cupo_total ,cupo_ocupado) 
        VALUES (?, ?, ?, ?, ?, ?, 0)`,  
        [nombre, expositor, fecha, hora, lugar, cupo_total],
        function (err) {
            if (err) {
                console.error("Error al crear el taller", err.message);
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, message: "Taller creado exitosamente" });// Devuelve el ID del nuevo taller
            }
        }
    );
});


//Actualizar un taller existente
router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {nombre, expositor , fecha, hora, lugar, cupo_total} = req.body 
    
    ;
    
    if (!nombre || !expositor){
        return  res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    db.run(
        `UPDATE talleres SET nombre = ?, expositor = ?, fecha = ?, hora = ?, lugar = ?, cupo_total = ? WHERE id = ?`,
        [nombre, expositor, fecha, hora, lugar, cupo_total, id],
        function (err) {
            if (err) {
                console.error("Error al actualizar el taller", err.message);
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Taller actualizado exitosamente" });
            }
        }
    );
});

//Eliminar un taller
router.delete("/:id",(req,res)=>{
    const {id} = req.params;

    db.run(`DELETE FROM talleres WHERE id = ?`, id, function (err) {
        if (err) {
            console.error("Error al eliminar el taller", err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.json({ changes: this.changes, message: "Taller eliminado exitosamente" });
        }
    });
});

module.exports = router;