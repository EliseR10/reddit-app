import React, { useState }  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllComments, isLoadingComments } from "../features/userCommentSlice";

export default function UserComments({ article, accessToken}) {
        //Display the appropriate comments based on the current article
        const dispatch = useDispatch();
        //const createIsPending = useSelector(createComments);
        const [input, setInput] = useState("");
        const fetchedComments = useSelector((state) => selectAllComments(state)[article] || []);
        const [comments, setComments] = useState(fetchedComments);

        const loadingComments = useSelector(isLoadingComments);
        const createIsPending = useSelector((state) => state.comments.createCommentIsPending);
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const newComment = {
                data: {
                    body: input,
                    id: Date.now().toString(), //unique id for each new comment
                },
            };

            // update local state with the new comment
            setComments((prevComments) => [...prevComments, newComment]);
            setInput(''); 
                    
        };
        console.log("You're trying to post: ", input);

        //reverse the array of comments so the newest one is on top
        //[...comments] not to mutate the array - create a new instead
        let reverseComments = [...comments].reverse(); 

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <InputGroup id="comments">
                <FormControl 
                    placeholder="Add a comment"
                    type="input"
                    id="inputComments"
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)} //similar to e.target.value. See Notes
                    />
                <Button id="buttonComments" variant="dark" type="submit" disabled={createIsPending}>Comment</Button>
            </InputGroup>
            </Form>

            <Form>
                {comments.length > 0 ? (
                reverseComments.map((comment, index) => (
                    <div className="postedComments" key={index}>{comment.data.body}</div>
                ))
                ) : (
                    <div>No comments available.</div>
                )
                }
            </Form>
        </Container>
      );
}
