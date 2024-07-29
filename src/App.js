import React from 'react';
//import { Counter } from './features/counter/Counter';
import './App.css';
import Root from "./features/root";
import SearchBar from "./features/searchBar";
import Article from "./features/article";
import HomeButton from "./features/homeButton";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <>
  /* Wrap this Root Route to create Router here */
  <Route path="/" element={ < SearchBar /> }/>
    <Route path="article" element={<Article/>}/>
    <Route path="homeButton" element={<HomeButton/>}/>
  </>
  
))

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
