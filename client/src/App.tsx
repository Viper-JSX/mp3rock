import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { Outlet, RouterProvider } from "react-router-dom";

import "./css/main.scss";
import { authorize, signIn, signUp } from "./redux/thunks/authThunk";
import Header from "./components/Header.tsx";

function App() {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        //sign-in using token
        dispatch(authorize());
    }, [])

    const { user, isLoading, error } = useAppSelector((state) => state.user);

    const textToDisplay = user ? "Signed-in" : (isLoading ? "Loading" : (error ? "Error" : "Not singed-in")) 

    return (
        <div>
            <Header />
            <Outlet />
            { textToDisplay }
        </div>
    )
}

export default App
