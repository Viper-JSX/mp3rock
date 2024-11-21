import React from "react";
import { useNavigate } from "react-router";
 
interface IProps {
    to: string;
    text?: string
};

const GoBackButton: React.FC<IProps> = ({ to, text }) => {
    const navigate = useNavigate();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        navigate(to);
        //use something that does not force page reload instead
    }
    
    return (
        <button onClick={handleClick}>{ text || "Go Back" }</button>
    );
}

export default GoBackButton;