import React from "react";

interface IProps {
    backgroundUrl: string;
    children: React.ReactNode;
};

const DynamicBackground: React.FC<IProps> = ({ 
    backgroundUrl, 
    children 
}) => {
    return (
        <div className="dynamic-background">
            <div className="dark-overlay">
                <video src={backgroundUrl} autoPlay muted loop />
                {
                    children
                }
            </div>
        </div>
    );
}

export default DynamicBackground;