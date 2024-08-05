import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Get the data
export const loadAllPreview = createAsyncThunk('search/loadAllPreview', async ({query, accessToken, filter}, {rejectWithValue}) => {
    
    try {
        const searchParameters = {
            method: 'GET',
            headers: {
                'x-cors-api-key': 'temp_364db55de9fa6817245ada3c11ed4da2',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
          };
            const proxy = `https://proxy.cors.sh/`;
            const endPoint = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=${filter}&limit=25`;
            const url = (proxy + endPoint);
            const response = await fetch(url, searchParameters);
            

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json()
        return data.data.children.map(child => child.data);
        //explanation in Notes
            
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//searchSlice
const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoading: false,
        articles: [],
        error: false,
        filter: ''
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadAllPreview.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        .addCase(loadAllPreview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.articles = action.payload;
        })
        .addCase(loadAllPreview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; //store the error message
            state.articles = [];
        });
    },
});

export default searchSlice.reducer;
export const selectAllPreviews = (state) => state.search.articles;
export const isLoading = (state) => state.search.isLoading;
export const selectError = (state) => state.search.error;
export const selectFilter = (state) => state.search.filter;

export const { setFilter } = searchSlice.actions;
//extract the Action Creator. Update the filter property in the state

