import React from "react";
import Header from "../features/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Dropdown, InputGroup, FormControl, Button, Card, Row} from 'react-bootstrap';
//import { Link } from "react-router-dom";
import HomeButton from "../features/homeButton";
import UserComments from "../features/userComments";

export default function article() {
    return (
        <Container>
        
        <Header/>
        <HomeButton/>

        <Row>
            <Card id="article">
                <Card.Body id="cardBody">
                    <Card.Title id="cardTitle">A lack of professionalism in recent times?</Card.Title>
                    <Card.Img src="https://onedrive.live.com/embed?resid=3B321C3E3EB27E40%213991&authkey=%21AGu_y2jKHT63G-Y&width=1280&height=720" className="mt-2" alt="No pictures available"></Card.Img>
                    <Card.Text id="text">TL;DR: Is it just me, or are professional workers, be they joiners, doctors, supermarket delivery, BT engineers, and so on, less reliable than they used to be?
I've noticed over the last couple of years, there's been a string of no-shows, cancellations without warning and many times without explanations, late deliveries and so on.
Here's a few examples so you can get the idea of what I mean. A few months ago, I wanted a new living room door fitting because the one currently in use isn't in a good shape. Two joiners came out, measured up, and told me they'd email me a quote for the price over the next few days. One emailed me back two weeks later. The other didn't bother at all.
I get my groceries delivered by ASDA. A few weeks ago, they cancelled the delivery (two hours after the delivery slot) and told me to reorder. Then two weeks later, they were an hour late. This used to be a rare thing.
A while back, I upgraded my BT package from broadband to fibre, they cancelled on me three times before finally coming out. One of those times, the cancellation was 20 minutes before the END of five hour appointment slot. That's three days I had to clear everything, so I could be home all day for the engineer.
There's so many more examples like this over the last few years that I have been noticing. People saying they'll have something sorted in a week, only it's been three weeks and you have to call them to remind them again.
I know public services are under stress from lack of funding, etc, but this doesn't explain a lot of my experiences. It just feels like a lot of people can't be arsed being courteous any more, I'm pretty sure this never used to happen. But you would think, if anything, with modern tech, this sort of thing would happen less often.
I'm a reasonable guy, I know things are unpredictable, but the majority of the time, there's definitely a lack of courtesy going on. No warnings, apologies, or explanations etc. That's what's pissing me off.
Has anyone else noticed this?</Card.Text>
                </Card.Body>
            </Card>
        </Row>
        
        {/*Add user comments here */}
        <UserComments/>
        </Container>
    )
}