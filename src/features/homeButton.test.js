import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeButton } from "../features/homeButton.js";
import { Route, Routes } from "react-router-dom";
import { SearchBar } from "../features/searchBar.js";
import Article from "../features/article";



