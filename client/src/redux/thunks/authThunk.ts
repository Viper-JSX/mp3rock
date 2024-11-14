import { SignInPayload } from './../types/payload';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/data";
import { SignUpPayload } from "../types/payload";
import axiosClient from '../../axios/axiosClient';

const signIn = createAsyncThunk<User, SignInPayload>(
    "/auth/sign-in",

    async(data) => {
        //maybe wrap with try/catch
        const user: User = (await axiosClient.post("/auth/sign-in", data)).data.user;
        return user;
    }
);


const signUp = createAsyncThunk<User, SignUpPayload>(
    "/auth/sign-up",

    async(data) => {
        //maybe wrap with try/catch
        const user = (await (axiosClient.post("/auth/sign-up", data))).data.user;

        return user;
})


const authorize = createAsyncThunk<User, undefined>(
    "/auth/authorize",

    async () => {
        //maybe wrap with try/catch
        const user: User = (await (axiosClient.post("/auth/authorize"))).data.user;
        return user;
    }
);


export { signIn, signUp, authorize };

/*<+ createAsyncThunk<T, E, [G]> +>
    - T: The type of data you're going to return from the thunk (it then this data will get to "thunk.fulfilled" you can get it from "action.payload") 
    - E: Is the type of first parameter that is passed to the async function of given thunk "async function (firstParam, apiConfigObj)"
    - G (Optional): The type of thunk API config
<+ +> */