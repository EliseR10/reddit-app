import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function HomeButton() {
  return (
        <Container>
            <Link to="/"><Button variant="outline-dark" id="homeButton">Home</Button></Link>
        </Container>
  );
}