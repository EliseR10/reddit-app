import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent} from '@testing-library/react';
import { Route, Routes, BrowserRouter } from "react-router-dom";

//Make sure to import is without curly brackets as it is a default export
//Otherwise if it is a named export, import it with brackets
import HomeButton from "../features/homeButton.js";

test('navigate to new page on button click', () => {
    render(
        <BrowserRouter>
            <HomeButton/>
        </BrowserRouter>
    );

    //find the button element
    const button = screen.getByText("Home");

    //simulate a click event
    fireEvent.click(button);

    //check if the URL changed to '/';
    expect(window.location.pathname).toBe('/');
});

