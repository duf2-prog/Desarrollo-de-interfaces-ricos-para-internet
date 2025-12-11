import React, { useEffect, useState } from "react";

const Reloj: React.FC = () =>  {
    const [hora, setHora] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {

            const now = new Date();
            const horas = now.getHours().toString().padStart(2, '0');
            const minutos = now.getMinutes().toString().padStart(2, '0');
            const segundos = now.getSeconds().toString().padStart(2, '0');
            setHora(horas + ":" + minutos + ":" + segundos);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <h1>{hora}</h1>;
};
export default Reloj;