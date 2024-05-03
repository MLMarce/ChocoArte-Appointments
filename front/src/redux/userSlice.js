import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userData: {},
    isLogged: false,
    userAppointments: []
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.userData = action.payload
        },

        setUserAppointments: (state, action) => {
            state.userAppointments = action.payload
        },

        setIsLogged: (state, action) => {
            state.isLogged = action.payload
        }

    }
})

export const { setUser, setUserAppointments, setIsLogged } = userSlice.actions;

export default userSlice.reducer;
