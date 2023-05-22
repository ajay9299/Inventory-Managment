import Link from "next/link";
import React from "react";
import { Button, Card } from "react-bootstrap";

const CardElem = ({ buttonLabel, buttonLink }) => {
  return (
    <Card style={{ width: "12rem" }}>
      <Card.Body className="mh-20 d-flex justify-content-center align-items-center">
        <Link href={buttonLink}>
          <Button className="btn btn-light">{buttonLabel}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardElem;
