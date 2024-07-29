import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';



export default function Header() {
  return (
        <Container fluid className="header">
            <h2 id="title">World News</h2>
        </Container>
  );
}

