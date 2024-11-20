import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { Outlet, RouterProvider } from "react-router-dom";

import "./css/main.scss";
import { authorize, signIn, signUp } from "./redux/thunks/authThunk";
import Header from "./components/Header.tsx";

function App() {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        //dispatch(signIn({ email: "yuramcpecs@gmail.com", password: "yuramcpecs" }));
        //sign-in using token
        dispatch(authorize());
    }, [])

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default App
