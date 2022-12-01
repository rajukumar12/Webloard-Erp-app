import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AUTH_DATA, AUTH_TOKEN } from 'constants/AuthConstant';
import FirebaseService from 'services/FirebaseService';

console.log(process.env.REACT_APP_BASEURL);

export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN) || null,
	error:false,
	errMessage:"",
	profile:{}
}


// export const signIn = createAsyncThunk('auth/signIn',async (data, { rejectWithValue }) => {
// 	const { email, password } = data
// 	try {
// 		// const response = await FirebaseService.signInEmailRequest(email, password)
// 		const response= await axios.post(`${process.env.BaseUrl}/login`)
// 		if (response.user) {
// 			const token = response.user.refreshToken;
// 			localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
// 			return token;
// 		} else {
// 			return rejectWithValue(response.message?.replace('Firebase: ', ''));
// 		}
// 	} catch (err) {
// 		return rejectWithValue(err.message || 'Error')
// 	}
// }) 

export const signIn = createAsyncThunk('auth/signIn',async (data, { rejectWithValue }) => {
	const { email, password } = data
	try {
	
		const response= await axios.post(`${process.env.REACT_APP_BASEURL}/login`, {email, password})
		if (response.data) {
			const token = response.data.data.token; 
			localStorage.setItem(AUTH_TOKEN, response.data.data.token);
			localStorage.setItem(AUTH_DATA, JSON.stringify({name: response.data.data?.name}));
			return response.data.data;
		} else {
			return rejectWithValue(response.data.message);
		}
	} catch (err) {
		 

		return rejectWithValue(err.message || 'Error')
	}
})

export const signUp = createAsyncThunk('auth/signUp',async (data, { rejectWithValue }) => {
	const { email, password , c_password, name} = data
	try {
		// const response = await FirebaseService.signUpEmailRequest(email, password)
		const response= await axios.post(`${process.env.REACT_APP_BASEURL}/register`, {email, password, c_password, name})
		if (response.data) {
			const token = response.data.data.token; 
			localStorage.setItem(AUTH_TOKEN, response.data.data.token);
			localStorage.setItem(AUTH_DATA, JSON.stringify({name: response.data.data?.name}));
			return response.data.data;
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})

export const signOut = createAsyncThunk('auth/signOut',async () => {
    const response = await FirebaseService.signOutRequest()
	localStorage.removeItem(AUTH_TOKEN);
    return response.data
})

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async (_, { rejectWithValue }) => {
    const response = await FirebaseService.signInGoogleRequest()
	if (response.user) {
		const token = response.user.refreshToken;
		localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
		return token;
	} else {
		return rejectWithValue(response.message?.replace('Firebase: ', ''));
	}
})

export const signInWithFacebook = createAsyncThunk('auth/signInWithFacebook', async (_, { rejectWithValue }) => {
    const response = await FirebaseService.signInFacebookRequest()
	if (response.user) {
		const token = response.user.refreshToken;
		localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
		return token;
	} else {
		return rejectWithValue(response.message?.replace('Firebase: ', ''));
	}
})


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload
			state.showMessage = true
			state.loading = false
		},
		hideAuthMessage: (state) => {
			state.message = ''
			state.showMessage = false
		},
		signOutSuccess: (state) => {
			state.loading = false
			state.token = null
			state.redirect = '/'
		},
		showLoading: (state) => {
			state.loading = true
		},
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload.token
				state.profile = {name: action.payload?.name}
			})
			.addCase(signIn.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signOut.fulfilled, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signOut.rejected, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signUp.pending, (state) => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signUp.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithFacebook.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithFacebook.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithFacebook.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
	},
})

export const { 
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess
} = authSlice.actions

export default authSlice.reducer