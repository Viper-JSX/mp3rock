import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import Cookies from "js-cookie";

import "./css/main.scss";
import { authorize, signIn, signUp } from "./redux/thunks/authThunk";

function App() {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        //sign-in using token
        console.log(Cookies.get("jwt"))
        dispatch(authorize());
    }, [])

    useAppSelector((state) => console.log(state.user.user))

    const { user, isLoading, error } = useAppSelector((state) => state.user);

    const textToDisplay = user ? "Signed-in" : (isLoading ? "Loading" : (error ? "Error" : "Not singed-in")) 

    return (
        <div>
            { textToDisplay }
        </div>
    )
}

export default App
