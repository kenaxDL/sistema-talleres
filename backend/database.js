const sqlite3=require("sqlite3").verbose();

const db=new sqlite3.Database("./talleres.db", (err)=>{
    if(err){
        console.error("Error al abrir la base de datos", err.message);
    }else{
        console.log("base de datos conectada correctamente");
    }
});

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS talleres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        expositor TEXT NOT NULL,
        fecha TEXT,
        hora TEXT,
        lugar TEXT,
        cupo_total INTEGER,
        cupo_ocupado INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS inscripciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alumno TEXT NOT NULL,
        taller_id INTEGER NOT NULL,
        UNIQUE(alumno, taller_id),
        FOREIGN KEY(taller_id) REFERENCES talleres(id)
    )`);

});
    module.exports=db; 