import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default function CreatePostButton() {
    return(
        <Link to="./userPost"><Button id="createpost" variant="outline-info">Create a post</Button></Link>
    )
}