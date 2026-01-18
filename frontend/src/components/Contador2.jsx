import { useState } from "react";

export default function Contador2() {
    const [contador, setContador] = useState(0);

    function handler() {
        setContador(contador + 1);
    }
    return (

        <div>
            <p>Has hecho click {contador} veces</p>
            <button onClick={handler}>Incrementar</button>
            <button onClick={() => contador == 0 ? null : setContador(contador - 1)}>Decrementar</button>
        </div>
    );
}