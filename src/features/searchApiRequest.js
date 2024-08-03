import { createAsyncThunk } from '@reduxjs/toolkit';
import React, { useState } from 'react';

//Fetching data from the API based on the search query
export const fetchSearchResults = createAsyncThunk('search/fetchResults', async(searchTerm, { rejectWithValue }) => {
    
    try {
        if(isAuthenticated && accessToken){
            const endPoint = `https://www.reddit.com/search.json?q=${searchTerm}`;
            const response = await fetch(endPoint);
            const data = await response.json()
            return data;
        } else {
            alert('Please login in to Reddit first');
        }

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        return rejectWithValue(error.message);
    }
    }

);

