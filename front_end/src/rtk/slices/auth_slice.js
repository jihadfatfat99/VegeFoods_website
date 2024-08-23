import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        accessToken : localStorage.getItem("accessToken") || null,
        refreshToken : localStorage.getItem("refreshToken") || null,
        user: localStorage.getItem("user") || null,
        id: localStorage.getItem("id") || null,
        type: localStorage.getItem("type") || null,
        isLogged: localStorage.getItem("accessToken") ? true : false,
    },

    reducers:{
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            state.type = null;
            state.id = null;
            state.isLogged = false;
            // localStorage.removeItem("accessToken");
            // localStorage.removeItem("refreshToken");
            // localStorage.removeItem("user");
            // localStorage.removeItem("type");
            // localStorage.removeItem("id");
            localStorage.clear();
        },

        setAccessToken: (state, action) => {
           state.accessToken = action.payload; 
        },

        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },

        setType: (state, action) => {
            state.type = action.payload;
        },

        setIsLogged: (state, action) => {
            state.isLogged = action.payload;
        },

        setId: (state, action) => {
            state.id = action.payload;
        }
    },
});

export const {logout, setAccessToken, setRefreshToken, setUser, setType, setIsLogged, setId} = authSlice.actions;
export default authSlice.reducer;