import React from "react";
import Header from "../features/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, Row} from 'react-bootstrap';
import { useLocation, useParams } from "react-router-dom";
import HomeButton from "../features/homeButton";
import UserComments from "../features/userComments";

export default function article() {
        /*More on Notes*/
        const location = useLocation();
        const article = location.state?.article;

        if (!article) {
            return <p>Article not found</p>;
        }
    

    return (
        <Container>
        
        <Header/>
        <HomeButton/>

        <Row>
            <Card id="article">
                <Card.Body id="cardBody">
                    <Card.Title id="cardTitle">{article.title}</Card.Title>
                    <Card.Text id="text">{article.selftext}</Card.Text>
                </Card.Body>
            </Card>
        </Row>
        
        {/*Add user comments here */}
        <UserComments/>
        </Container>
    )
}