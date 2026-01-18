import { useEffect, useState } from "react"
import TallerForm from "../components/TallerForm";

function AdminPage() {

  const [talleres, setTalleres] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState ("");
  const [tallerEditando,setTallerEditando]=useState(null);

  const cargarTalleres=()=>{
      fetch ("http://localhost:3000/api/talleres")
      .then ((res)=> {
        if (!res.ok) throw new Error ("Error al obtener los talleres");
        return res.json();
      })
      .then((data) => setTalleres (data))
      .catch((err) => setError (err.message))
      .finally(() => setLoading (false));
  };
  
  useEffect(()=>{
    cargarTalleres()
  },[])

  const eliminarTaller=(id)=>{
    const confirmar=window.confirm("Seguro?")
    if(!confirmar)return

    fetch (`http://localhost:3000/api/talleres/${id}`,{method:"DELETE"})
    .then((res)=>{
        if (!res.ok) throw new Error ("Error al obtener los talleres");
        return res.json();
    })
    .then(()=>cargarTalleres())
    .catch((err)=>alert("Error:"+err.message))
  }

  const seleccionarParaEditar=(taller)=>{
    setTallerEditando(taller)
  }
  const limpiarEdicion=()=>{
    setTallerEditando(null)
  }
  
  if (loading) return <p>Cargando talleres...</p>;
  if (error) return <p>Error: {error}</p>;
    

  return (
    <div>
      <h1>Administrador de Talleres</h1>
      <TallerForm
       onTallerAgregado={cargarTalleres}
       tallerEditando={tallerEditando}
       onCancelEdit={limpiarEdicion}
       ></TallerForm>

      {
        talleres.length === 0 ? (
          <p>No hay talleres disponibles.</p>
        ) : (
          <table 
          border="1"
          cellPadding="8"
          style={{marginTop:"1rem"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Expositor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Lugar</th>
              <th>Cupo Total</th>
              <th>Cupo Ocupado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              talleres.map((t)=>(
                 <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.nombre}</td>
                    <td>{t.expositor}</td>
                    <td>{t.fecha}</td>
                    <td>{t.hora}</td>
                    <td>{t.lugar}</td>
                    <td>{t.cupo_total}</td>
                    <td>{t.cupo_ocupado}</td>
                    <td>
                      <button
                      onClick={()=>seleccionarParaEditar(t)}>
                        Editar
                      </button>
                      <button
                      onClick={()=>eliminarTaller(t.id)}>
                        Eliminar
                      </button>
                      </td>
                 </tr>
              ))
            }
          </tbody>
          </table>
        )
      }
    </div>  
  )
}
export default AdminPage