import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userAPI } from '../../services/fetchUser'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await userAPI()

    return response[0]?.name
})
interface Users{
    users:string[],
    status: 'idle' | 'loading' | 'completed'
}
const initialState:Users = {
    users:[],
    status: 'idle'
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'completed'
            state.users = action.payload
        })
    }
})

// export const selectUserName = state => state.users.user
// export const selectUserFetchStatus = state => state.users.status

export default userSlice.reducer