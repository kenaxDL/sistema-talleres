const express = require("express")
const db = require("./database")
const router = express.Router()

//Obtener todas las inscripciones
router.get("/", (req, res) => {
    db.all("SELECT * FROM inscripciones", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(rows)
    })
})

//Registrar inscripcion {controlando cupo}
router.post("/", (req, res) => {
    const { alumno, taller_id } = req.body

    if (!alumno || !taller_id)
        return res.status(400).json({ erro: "Faltan datos" })

    db.serialize(() => {
        db.run(
            `UPDATE talleres
            SET cupo_ocupado=cupo_ocupado + 1
            WHERE id = ? AND cupo_ocupado < cupo_total`,
            [taller_id],
            function (err) {
                if (err)
                    return res.status(500).json({ error: err.message })
                if (this.changes === 0)
                    return res.status(400).json({ erro: "Error lleno o inexistente" })

            }
        )
        db.run(
            `INSERT INTO inscripciones (alumno,taller_id) VALUES(?,?)`,
            [alumno, taller_id],
            function (err2) {
                if (err2) {
                    db.run(
                        `UPDATE talleres
                        SET cupo_ocupado=cupo_ocupado - 1
                        WHERE id = ? AND cupo_ocupado < cupo_total`,
                        [taller_id],
                        function (err) {
                            if (err)
                                return res.status(500).json({ error: err.message })
                            if (this.changes === 0)
                                return res.status(400).json({ erro: "Error lleno o inexistente" })

                        }
                    )
                    if (err2.message.includes("UNIQUE")){
                        return res.status(400).json({ erro: "YA ESTAS INSCRITO" })    
                    }
                    return res.status(500).json({ erro: err2.message })
                }
                res.json({ message: "INSCRIPCION REGISTRADO" })
            }
        )
    })
})
module.exports = router;