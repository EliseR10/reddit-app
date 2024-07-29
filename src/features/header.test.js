import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Header } from "../features/header.js";

it ("Check if the header is rendering", () => {
    render("World News");
    const Header = screen.getByText("World News");
    expect(Header).toBeInTheDocument();
});