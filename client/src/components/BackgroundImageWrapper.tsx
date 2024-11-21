import React from "react";

interface IProps {
    imgUrl: string;
    children: React.ReactNode;
};

const BackgroundImageWrapper: React.FC<IProps> = ({ imgUrl, children }) => {
    const style = { 
        backgroundImage: `url(${imgUrl})`, 
        backgroundSize: "100%",
        boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.2)"
    };
    
    return (
        <div className="background-image-wrapper" style={style}>
            { children }
        </div>
    );
}

export default BackgroundImageWrapper;