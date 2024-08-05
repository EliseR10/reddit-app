import React, { useEffect, useState }  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Form, FormText} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllComments, isLoadingComments, loadComment, createComments, postComment } from "../features/userCommentSlice";
import { selectAllPreviews } from "../features/searchReducer";

export default function UserComments() {
        //Display the appropriate comments based on the current article
        const dispatch = useDispatch();
        const article = useSelector(selectAllPreviews);

        //Ensure it is defined from article object
        const articleId = article ? article.id : null;

        //retrieve the comments
        const comments = useSelector((state) => selectAllComments(state)[articleId] || []);

        //check if the comments are loading
        const loadingComments = useSelector(isLoadingComments);
        const createIsPending = useSelector(createComments);
        const [input, setInput] = useState("");
        
        useEffect(() => {
            if (articleId) {
                dispatch(loadComment({articleId}));
            }
        }, [articleId, dispatch]);

        //HandleSubmit for Posting Comments
        const handleSubmit = (e) => { //e for event and  access details like type of event, element that triggered the event, additional data
            e.preventDefault();//avoid the form from refreshing the page
            dispatch(postComment({
                articleId,
                comment: input,
                accessToken
            }))
                setInput('');//clear the comment input after submission
        };

        if (loadingComments) {
            return <div>Loading comments...</div>
        }
    
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <InputGroup id="comments">
                <FormControl 
                    placeholder="Add a comment"
                    type="input"
                    id="inputComments"
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    />
                <Button id="buttonComments" variant="dark" comments={createIsPending}>Comment</Button>
            </InputGroup>
            </Form>

            <Form>
                <FormText><h3>Comments</h3></FormText>
                {comments.map((comment, index) => (
                    <FormText key={index}>{comment.body}</FormText>
                ))}
            </Form>
        </Container>
      );
}
