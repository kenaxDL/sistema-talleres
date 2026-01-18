import { useEffect, useState } from "react";

export default function TallerForm({ onTallerAgregado, tallerEditando, onCancelEdit }) {
    const [formData, setFormData] = useState({
        nombre: "",
        expositor: "",
        fecha: "",
        hora: "",
        lugar: "",
        cupo_total: ""
    })

    const [mensaje, setMensaje] = useState("")

    useEffect(() => {                    //
        if (tallerEditando) {
            setFormData(tallerEditando)
            setMensaje("")
        }
    }, [tallerEditando])


    const handlerCHange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMensaje("")

        const url = tallerEditando
            ? `http://localhost:3000/api/talleres/${tallerEditando.id}`
            : `http://localhost:3000/api/talleres`

        const metodo = tallerEditando ? "PUT" : "POST"

        fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al agregar talleres")
                return res.json()
            })
            .then((data) => {
                setMensaje(
                    tallerEditando 
                 ? "Taller actualizado correctamente" 
                 : "Taller agregado correctamente" 
                )
                setFormData({
                    nombre: "",
                    expositor: "",
                    fecha: "",
                    hora: "",
                    lugar: "",
                    cupo_total: ""
                })
                onTallerAgregado()
                if (tallerEditando) onCancelEdit()
            })
            .catch((err) => setMensaje("Error: " + err.message))
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <h3>{tallerEditando ? "Editar Taller" : "Agregar nuevo Taller"}</h3>

            <input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handlerCHange}
                required
            />
            <br />
            <input
                name="expositor"
                placeholder="Expositor"
                value={formData.expositor}
                onChange={handlerCHange}
                required
            />
            <br />
            <input
                type="date"
                name="fecha"
                placeholder="Fecha"
                value={formData.fecha}
                onChange={handlerCHange}
            />
            <br />
            <input
                type="time"
                name="hora"
                placeholder="Hora"
                value={formData.hora}
                onChange={handlerCHange}
            />
            <br />
            <input
                name="lugar"
                placeholder="Lugar"
                value={formData.lugar}
                onChange={handlerCHange}
            />
            <br />
            <input
                type="number"
                name="cupo_total"
                placeholder="Cupo total"
                value={formData.cupo_total}
                onChange={handlerCHange}
            />
            <br />
            <button type="submit">{tallerEditando ? "Actualizar" : "Guardar"}</button>
            {tallerEditando && (
                <button type="button" onClick={onCancelEdit} style={{ marginLeft: "1rem" }}>Cancelar</button>
            )}
            {mensaje && <p>{mensaje}</p>}
        </form>
    )

}



