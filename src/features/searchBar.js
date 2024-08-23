import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Dropdown, InputGroup, FormControl, Card, Row, Form} from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";
import Header from "../features/header";
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPreview, selectAllPreviews, isLoading, selectError, setFilter, selectFilter } from "../features/searchReducer";
import { AuthButton } from "../features/redditAuth";

export default function SearchBar() {
        const [searchTerm, setSearchTerm] = useState("");
        const dispatch = useDispatch();
        const search = useSelector(selectAllPreviews);
        const isLoadingPreviews = useSelector(isLoading);
        const [accessToken, setAccessToken] = useState("");
        const error = useSelector(selectError);
        const filter = useSelector(selectFilter); //get the current filter

        useEffect(() => {
            if (searchTerm) {
                dispatch(loadAllPreview({query: searchTerm, filter, accessToken}));
            }
        }, [dispatch, searchTerm, accessToken, filter]);

        //update the searchTerm on input change
        const handleInputChange = (e) => {
            setSearchTerm(e.target.value); //link with handleInputChange to get the value updated
        }

        //Dispatch fetchSearchResults when the form is submitted
        const handleSubmit = (e) => {
            e.preventDefault(); //prevent the default action to be executed

            //throw an alert if the searchBar is empty
            if (!searchTerm) {
                alert('Please enter a valid research');
                return;
            }

            //dispatch(loadAllPreview());

            console.log("You tried to made a search about " + searchTerm);
            dispatch(loadAllPreview({searchTerm, accessToken, filter}));
            console.log("request dispatched");
        }

        //Trucate text so just the beginning of the article is appearing. More in Notes
        const truncateText = (text, length) => {
            if (text.length <= length) return text;
            return text.slice(0, length) + '...';
        };

        //filters
        const handleFilterChange = (filterValue) => {
            dispatch(setFilter(filterValue)); //Set the filter in the Redux State
            console.log("You clicked on filter " + filterValue)
        };

    return (
        <Container>
            <Header/>
            
            <Form onSubmit={handleSubmit}>
            <InputGroup>
                <FormControl 
                    id="researchbar-container"
                    placeholder="Make a research"
                    type="input"
                    value={searchTerm}
                    onChange={handleInputChange}/>
                
                <Row id="searchArea">
                <Dropdown id="filters">
                    <Dropdown.Toggle size="sm" variant="secondary">Select your filter</Dropdown.Toggle>

                    <Dropdown.Menu size="sm" id="selectFilter">
                        <Form.Check type="radio" name="filter" label="New" value="new" onChange={() => handleFilterChange('new')}></Form.Check>
                        <Form.Check type="radio" name="filter" label="Top" value="top" onChange={() => handleFilterChange('top')}></Form.Check>
                        <Form.Check type="radio" name="filter" label="Hot" value="hot" onChange={() => handleFilterChange('hot')}></Form.Check>
                    </Dropdown.Menu>
                </Dropdown>
                </Row>
            
                <AuthButton/>
            
            </InputGroup>
            </Form>

            <Outlet/>

            {/*Generate as much cards as research needed*/}
            <Container className="pb-3" id="results" style={{ backgroundColor: search.length > 0 ? '#F7F0F0' : '#FFFFFF'}}> {/*To apply background only when the results are rendred*/}
                <Row className="mx-2 row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {isLoadingPreviews && <p>Loading...</p>}
                {error &&
                <div id="error">
                    Sorry, we cannot execute your request at the moment due to the rate limit. Please try again later.
                </div>}
                {search.map((article) => (
                    <Card key={article.id} className="mb-2 text-center">
                        <Card.Body>
                            <Card.Title id="cardTitle">{article.title}</Card.Title>
                            <Card.Text id="articleText">{truncateText(article.selftext,100)}</Card.Text>
                        </Card.Body>
                        <Link to={"./article/"} state={{article}}>Read More...</Link>
                    </Card>
                ))}
            </Row>
            </Container>
            
            </Container>
    )
}
