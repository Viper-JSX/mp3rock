import { authorize, signIn, signUp } from '../thunks/authThunk';
import { authInitialState } from './../initialState';
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, action) => {
            state.isLoading = true;
        })

        .addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })

        .addCase(signIn.rejected, (state) => {
            console.log("signIn is rejected")
            state.error = "Error when signing-up";
            state.isLoading = false;
        })


        builder.addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
        })

        .addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })

        .addCase(signUp.rejected, (state) => {
            console.log("signUp is rejected")
            state.error = "Error when signing-up";
            state.isLoading = false;
        })



        builder.addCase(authorize.pending, (state, action) => {
            state.isLoading = true;
        })

        .addCase(authorize.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })

        .addCase(authorize.rejected, (state) => {
            console.log("Authorize is rejected")
            state.error = "Error when authorizing";
            state.isLoading = false;
        })
    }
});


export default authSlice.reducer;