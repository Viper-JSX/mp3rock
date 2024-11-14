import React from "react";
import { IJanre } from "../types/data";

interface IProps {
    janres: IJanre[];
    changeJanre: (janre: IJanre) => void;
};

const JanresList: React.FC<IProps> = ({ 
    janres,
    changeJanre
}) => {
    return (
        <div>
            <button onClick={ () => changeJanre({ _id: "", name: "" }) }>All</button>
            {
                janres.map((janre) => (
                    <button onClick={ () => changeJanre(janre) } key={janre._id}>{ janre.name }</button>
                ))
            }
        </div>
    );
}

export default JanresList;