import { useState ,useEffect } from "react"

function AlumnoPage() {
  const[talleres,setTalleres]=useState([])
  const[nombreAlumno,setNombreAlumno]=useState("")
  const[mensaje,setMensaje]=useState("")

  useEffect(()=>{
    fetch("http://localhost:3000/api/talleres")
      .then ((res)=>res.json())
      .then ((data)=>setTalleres(data))
      .catch (()=>setMensaje("Error al carga talleres"))
  },[])

  const inscribirse=(tallerId)=>{
    if(!nombreAlumno.trim()){
      alert("Por favor escribe tu nombre ")
      return
    }
    fetch("http://localhost:3000/api/inscripciones",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({alumno:nombreAlumno,taller_id:tallerId})
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.error){
        setMensaje(data.error)
      }else{
        setMensaje("Incripcion exitoso")

        //Refrescamos la lista
        return fetch("http://localhost:3000/api/talleres")
          .then((r)=>r.json())
          .then((d)=> setTalleres(d))
      }
    })
    .catch(()=> setMensaje("Error al inscribiste"))
  }
  return(
    <div>
        <h2>Inscripciones a talleres</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombreAlumno}
          onChange={(e)=>setNombreAlumno(e.target.value)}/>
          <p style={{color:"lightgreen"}}>{mensaje}</p>
          {talleres.length===0 ? (
            <p>No hay talleres disponibles</p>
          ):(
            <table border="1"
            cellPadding="8"
            style={{marginTop:"1rem"}}>
              <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Expositor</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Lugar</th>
                    <th>Cupo</th>
                    <th>Accion</th>
                  </tr>
              </thead>
              <tbody>
                {talleres.map((t)=>(
                  <tr key={t.id}>
                    <td>{t.nombre}</td>
                    <td>{t.expositor}</td>
                    <td>{t.fecha}</td>
                    <td>{t.hora}</td>
                    <td>{t.lugar}</td>
                    <td>
                      {t.cupo_ocupado}/{t.cupo_total}
                    </td>
                    <td>
                      {t.cupo_ocupado < t.cupo_total ? (
                        <button onClick={()=> inscribirse(t.id)}>Inscribirme</button>
                      ):(
                        <span style={{color:"gray"}}>Lleno</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
    </div>
  )
}
export default AlumnoPage