import React, { useEffect } from "react";
import Header from "../features/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, Row} from 'react-bootstrap';
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import HomeButton from "../features/homeButton";
import UserComments from "../features/userComments";
import { selectAllComments, isLoadingComments, loadComment, createComments, postComment, selectCommentsError } from "../features/userCommentSlice";
import { selectAllPreviews } from "../features/searchReducer";

export default function Article({accessToken}) {
        /*More on Notes*/
        const dispatch = useDispatch();
        //const { articleId } = useParams();
        const location = useLocation();
        const article = location.state?.article;
        const comments = useSelector((state) => selectAllComments(state)[article] || []);
        const loadingComments = useSelector(isLoadingComments);
        const error = useSelector(selectCommentsError);

        useEffect(() => {
            if(article) {
                console.log("Dispatching loadComment with articleId: ", article);
                dispatch(loadComment({ article, accessToken }));
            }
        }, [article, dispatch, accessToken]);

        if (!article) {
            return <p>Article not found</p>;
        }

        console.log("You selected the following article: ", article);
        
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
        {/*{error && <div>Failed to load comments: {error.message}</div>}*/}
        <UserComments comments={comments} article={article} accessToken={accessToken}/> {/*props to make it work*/}
        </Container>
    )
}