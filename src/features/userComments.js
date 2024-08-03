import React, { useEffect, useState }  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Form, FormText} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllComments, isLoadingComments, loadComment, createComments } from "../features/userCommentSlice";
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

        //See Notes for Comments - the last || [] ensures that an empty array is returned instead of undefined
        //const commentsForArticle = article ? comments[article.id] || [] : [];
        
        const [input, setInput] = useState("");

        const createIsPending = useSelector(createComments);

        useEffect(() => {
            if (article) {
                dispatch(loadComment(article.I));
            }
        }, [articleId, dispatch]);

        if(loadingComments) {
            return <div>Loading...</div>;
        }
        if (!articleId) return null;

        const handleSubmit = () => {
            e.preventDefault();//avoid the form from refreshing the page
            dispatch(postComment({
                articleId,
                comment: input}))
                setInput('');//clear the comment input after submission
        };
    
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
                <Button id="buttonComments" variant="dark" comments={createComments}>Comment</Button>
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
