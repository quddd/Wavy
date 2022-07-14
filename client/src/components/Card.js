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
        <Card.Text className="text">by {props.news.by}</Card.Text>
        <Card.Text className="text">Posted on {new Date(props.news.time).toLocaleString("en-US")}</Card.Text>
      </Card.Body>
      <Link to={`/news/${props.news._id}`} className="news-link">
          <Button variant='primary'>read</Button>
    </Link>
    </Card>
  );
}
export default CardComponent;
