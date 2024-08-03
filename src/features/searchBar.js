import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Dropdown, InputGroup, FormControl, Card, Row, Form} from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";
import Header from "../features/header";
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPreview, selectAllPreviews, isLoading, selectError } from "../features/searchReducer";
import { AuthButton } from "../features/redditAuth";

export default function SearchBar() {
        const [searchTerm, setSearchTerm] = useState("");
        const dispatch = useDispatch();
        const search = useSelector(selectAllPreviews);
        const isLoadingPreviews = useSelector(isLoading);
        const [accessToken, setAccessToken] = useState("");
        const [filter, setFilter] = useState("best");
        const error = useSelector(selectError);

        useEffect(() => {
            if (searchTerm) {
                dispatch(loadAllPreview(filter));
            }
        }, [dispatch, filter]);

        //update the searchTerm on input change
        const handleInputChange = (e) => {
            setSearchTerm(e.target.value);
        }

        //Dispatch fetchSearchResults when the form is submitted
        const handleSubmit = (e) => {
            e.preventDefault();

            //throw an alert if the searchBar is empty
            if (!searchTerm) {
                alert('Please enter a valid research');
                return;
            }

            //dispatch(loadAllPreview());

            console.log("You tried to made a search about " + searchTerm);
            dispatch(loadAllPreview({query: searchTerm, accessToken, filter}));
            console.log("request dispatched");
        }

        //Trucate text so just the beginning of the article is appearing. More in Notes
        const truncateText = (text, length) => {
            if (text.length <= length) return text;
            return text.slice(0, length) + '...';
        };

        //filters
        const handleFilterChange = (filter) => {
            setFilter(filter);
            dispatch(loadAllPreview({ accessToken, searchTerm, filter }))
            console.log("Filter clicked")
        };

    return (
        <Container>
            <Header/>
            
            <Form onSubmit={handleSubmit}>
            <InputGroup id="researchbar">
                <FormControl 
                    placeholder="Make a research"
                    type="input"
                    value={searchTerm}
                    onChange={handleInputChange}/>
            <AuthButton/>
            </InputGroup>
            </Form>

            <Container>
                <Row>
                <Dropdown id="filters">
                    <Dropdown.Toggle size="sm" variant="secondary">Filter</Dropdown.Toggle>

                    <Dropdown.Menu size="sm">
                        <Dropdown.Item onClick={() => handleFilterChange()}>Best</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange()}>New</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange()}>Top</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Row>
            </Container>
            <Outlet/>

            {/*Generate as much cards as research needed*/}
            <Container className="pb-3" id="results">
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
