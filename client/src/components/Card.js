import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cardImage from "../cardimage.svg";

function CardComponent(props) {
  return (
    <Card style={{ width: "30rem" , margin: "2rem"}}>
      <Card.Img variant='top' src={cardImage} />
      <Card.Body>
        <Card.Title className="text">
          {props.news.title}
        </Card.Title>
        <Card.Text className="text"><Link to ={`/users/${props.news.by}`}>by <em>{props.news.by}</em></Link></Card.Text>
        <Card.Text className="text">Posted on {new Date(props.news.time * 1000).toLocaleString("en-US")}</Card.Text>
        <Card.Text className="text">comments: {!props.news.descendants ? props.news.kids.length : props.news.descendants }</Card.Text>
      </Card.Body>
      <Link to={`/news/${props.news._id}`} className="news-link react-dom-link">
          read story
    </Link>
    </Card>
  );
}
export default CardComponent;
