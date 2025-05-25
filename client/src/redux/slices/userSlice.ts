import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import $api from '../../services/axios.instance';
import type { ServerError } from '../../Pages/SignUp'

interface name {
  name: string;
}

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface SignUpUser {
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

interface LoginUser {
    email: string;
    password: string;
}   

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
};

export const fetchLoginUser = createAsyncThunk(
    'user/fetchLoginUser',
    async (obj:LoginUser, {rejectWithValue}) => {
        try {
            const response = await $api.post('auth/login', obj);
        $api.setAccessToken(response.data.accessToken)
        return response.data.user;
        } catch (err) {
            const error = err as ServerError
            console.log('Ошибка с бэка Login:', error.response?.data);
            return rejectWithValue(error.response?.data || "Ошибка входа: проверьте почту или пароль!")
        }
    
    }
);

export const fetchSignUpUser = createAsyncThunk(
    'user/fetchSignUpUser',
    async (obj:SignUpUser, {rejectWithValue}) => {
        try {
            const response = await $api.post('auth/signup', obj);
            $api.setAccessToken(response.data.accessToken)
            return response.data.user;
        } catch (err) {
            const error = err as ServerError
            console.log('Ошибка с бэка:', error.response?.data);
            return rejectWithValue(error.response?.data)
        }

    }
);

export const fetchLogoutUser = createAsyncThunk(
    'user/fetchLogoutUser',
    async () => {
        const response = await $api.get('auth/logout');
        $api.setAccessToken('')
        return response.data.user;

    }
);
export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    async () => {
        const response = await $api.get('auth/current');
        return response.data.user;
    }
);
export const fetchChangeUser = createAsyncThunk(
    'user/fetchChangeUser',
    async (obj: name) => {
        const response = await $api.post('/auth/profile', obj);
        return response.data;

    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Register
            .addCase(fetchSignUpUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSignUpUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchSignUpUser.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload && typeof action.payload === 'object') {
                    state.error = (action.payload as { error: string }).error;
                } else {
                    state.error = action.error.message || 'An error occurred while fetching the user.';
                }
            })
            //Login
            .addCase(fetchLoginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLoginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchLoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка входа';
            })
            //Logout
            .addCase(fetchLogoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchLogoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(fetchLogoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'An error occurred while fetching the user.';
            })
            //Current
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'An error occurred while fetching the user.';
            })


             //Change
             .addCase(fetchChangeUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchChangeUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchChangeUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'An error occurred while fetching the user.';
            })
    },
});

export default userSlice.reducer;