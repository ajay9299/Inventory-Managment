"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalBox = ({
  isOpen,
  onClose,
  title,
  body,
  buttonColor,
  actionLabel,
  secondaryActionLabel,
  secondaryAction,
  disabled,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {secondaryAction && secondaryActionLabel && (
          <Button
            className="btn btn-secondary"
            disabled={disabled}
            onClick={handleSecondaryAction}
          >
            {secondaryActionLabel}
          </Button>
        )}
        {secondaryAction && secondaryActionLabel && (
          <Button
            disabled={disabled}
            className={buttonColor}
            onClick={handleSubmit}
          >
            {actionLabel}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
