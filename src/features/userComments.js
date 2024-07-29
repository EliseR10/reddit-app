import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button} from 'react-bootstrap';

export default function userComments() {
    return (
        <Container>
            <InputGroup id="comments">
                <FormControl 
                    placeholder="Add a comment"
                    type="input"
                    id="inputComments"/>
                <Button id="buttonComments" variant="dark">Comment</Button>
            </InputGroup>
        </Container>
      );
}
