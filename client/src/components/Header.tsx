import { useAppSelector } from "../redux/hooks";
import React from "react";
import Navbar from "./Navbar";

const Header: React.FC = () => {
    const { user, isLoading, error } = useAppSelector((state) => state.user);
    const textToDisplay = user ? "Signed-in" : (isLoading ? "Loading" : (error ? "Error" : "Not singed-in")) 

    return (
        <header>
            <Navbar />

            { textToDisplay }
        </header>
    );
}

export default Header;