import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import extraReducers from "./searchReducer";


//Test reducers and check that the result state matches expectations
test('should return the initial state', () => {
    expect(extraReducers(undefined, {type: 'unknown'})).toEqual(
      {isLoading: false,
      articles: [],
      error: false,
      filter: ''
      }
    )
})


