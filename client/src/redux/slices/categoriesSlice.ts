import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import $api from '../../services/axios.instance';

export interface Project {
    id: number;
    title: string;
    description: string;
    urlVideo: string | null;
    urlImage: string | null;
    data: string;
    categoryId: number;
}

export interface Category {
    id: number;
    title: string;
    categories: Project[];
}

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    isLoading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        try {
            const response = await $api.get('/categories');
            return response.data;
        } catch (err) {
            console.log('Ошибка с бэка categories', err);
        }
    }
);


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Register
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'An error occurred while fetching the team.';
            })
    },
});

export default categoriesSlice.reducer;