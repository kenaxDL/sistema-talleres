/* hacer semaforo con react */
import { useState } from "react";
export default function Semaforo() {
    const [color, setColor] = useState ("red");

    function handler(){
        if(color === "red"){
            setColor ("green");
        } else if (color === "green"){
            setColor ("yellow");
        } else {
            setColor ("red");
        }
    }
 
    return (
        <div>
            <button style={{backgroundColor: color ,
                 border: "none", 
                 color: (color==="yellow" ? "black": "white"), 
                 padding: "10px 20px", 
                 cursor: "pointer"}} onClick={handler}>Cambiar color</button>
        </div>
    );
}