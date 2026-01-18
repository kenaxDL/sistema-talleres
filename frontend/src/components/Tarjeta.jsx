// importar App.css si es necesario     
import '../App.css'

export default function Tarjeta({ titulo, subtitulo }) {
  return (
    <article className="card">
      <h2>{titulo}</h2>
      <p>{subtitulo}</p>
    </article>
  )
}