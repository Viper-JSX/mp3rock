import React from "react";

interface IProps {
    img: string;
    name: string;
};

const ProfileImg: React.FC<IProps> = ({ img, name }) => {
    return (
        <div className="profile-img">
            <img className="profile-img__image" src={img} alt="User Image" width={100} />
            <p className="profile-img__name">{name}</p>
        </div>
    );
}

export default ProfileImg;