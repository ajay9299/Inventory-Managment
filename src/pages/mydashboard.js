import ModalBox from "@/components/modals/ModalBox";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

const mydashboard = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div>
      <strong>this is modal body</strong>
    </div>
  );

  const handleSubmit = () => {
    setIsLoading(true);
    setShow(false);
  };

  return (
    <>
      <Container>
        <ModalBox
          disabled={isLoading}
          isOpen={show}
          title="Box Title"
          actionLabel="Submit"
          secondaryActionLabel="Close"
          secondaryAction={() => setShow(false)}
          onClose={() => setShow(false)}
          onSubmit={() => handleSubmit}
          body={bodyContent}
        />
        <Button variant="primary" onClick={() => setShow(true)}>
          Launch demo modal
        </Button>
      </Container>
    </>
  );
};

export default mydashboard;
