import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Dropdown, InputGroup, FormControl, Button, Card, Row} from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";
import Header from "../features/header";

export default function searchBar() {
    return (
        <Container>
            <Header/>

            <InputGroup id="researchbar">
                <FormControl 
                    placeholder="Make a research"
                    type="input"/>
                <Button id="searchButton" variant="outline-dark">Search</Button>
            </InputGroup>
        
            <Container>
                <Row>
                <Dropdown id="filters">
                    <Dropdown.Toggle size="sm" variant="secondary">Filter</Dropdown.Toggle>

                    <Dropdown.Menu size="sm">
                        <Dropdown.Item href="#">Best</Dropdown.Item>
                        <Dropdown.Item href="#">New</Dropdown.Item>
                        <Dropdown.Item href="#">Top</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </Row>
            </Container>
        
            <Outlet/>

{/*Generate as much cards as research needed*/}
            <Container className="pb-3" id="results">
                <Row className="mx-2 row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <Card className="mb-2 text-center">
                        <Link to="./article"><Card.Img src="https://onedrive.live.com/embed?resid=3B321C3E3EB27E40%213991&authkey=%21AGu_y2jKHT63G-Y&width=1280&height=720"  className="mt-2"></Card.Img></Link>
                        <Card.Body>
                            <Card.Title id="cardTitle">Article's title here</Card.Title>
                            <Card.Text id="articleText">Include here the beginning of article</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            </Container>
    )
}
