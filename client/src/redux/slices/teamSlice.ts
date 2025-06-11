import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import $api from '../../services/axios.instance';

export interface Lawyer {
    id: number;
    name: string;
    lastName: string;
    email: string;
    image: string;
    phoneNumber: string;
    position: string,
    area: string;
    address: string;
    specialization: string[],
    experience: string;
    education: string;
}

interface TeamState {
    team: Lawyer[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TeamState = {
    team: [],
    isLoading: false,
    error: null,
};

export const fetchTeam = createAsyncThunk(
    'team/fetchTeam',
    async () => {
        try {
            const response = await $api.get('/team');
            console.log('RESPONSE', response)
            console.log('RES DATA', response.data)
            return response.data;
        } catch (err) {
            console.log('Ошибка с бэка team', err);
            return []
        }
    }
);


const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Register
            .addCase(fetchTeam.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTeam.fulfilled, (state, action: PayloadAction<Lawyer[]>) => {
                state.isLoading = false;
                state.team = action.payload;
            })
            .addCase(fetchTeam.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'An error occurred while fetching the team.';
            })
    },
});

export default teamSlice.reducer;